from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.views import View

from .models import Page, Post, SiteSettings


class HomeStatusView(View):
    def get(self, request):
        return HttpResponse(
            """
            <!DOCTYPE html>
            <html lang="sr">
                <head>
                    <meta charset="UTF-8">
                    <title>Scruma API</title>
                    <style>
                        body {
                            background-color: #0d1117;
                            color: #ffffff;
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding-top: 120px;
                        }
                        .status { font-size: 32px; margin-bottom: 20px; }
                        .dev { font-size: 20px; color: #58a6ff; }
                    </style>
                </head>
                <body>
                    <div class="status">Status: 🟢</div>
                    <div class="dev">Razvoj i izrada: Darko Tošić</div>
                </body>
            </html>
            """,
            content_type="text/html",
        )


class HealthView(View):
    def get(self, request):
        return JsonResponse(
            {
                "status": "ok",
                "service": "scruma-api",
                "time": timezone.now().isoformat(),
            }
        )


class DeprecatedEndpointView(View):
    def get(self, request):
        return JsonResponse(
            {
                "detail": "Ова рута је депрецатирана. Користите /api/v1/* руте.",
            },
            status=410,
        )


def _abs_media(request, path: str) -> str:
    if not path:
        return ""
    return request.build_absolute_uri(path)


class V1PostsView(View):
    def get(self, request):
        qs = Post.objects.filter(is_published=True).order_by("-published_at")
        ptype = (request.GET.get("type") or "").strip()
        try:
            limit = int(request.GET.get("limit") or 100)
        except (TypeError, ValueError):
            limit = 100
        limit = max(1, min(limit, 100))
        if ptype:
            qs = qs.filter(type=ptype)

        items = [
            {
                "id": p.id,
                "type": p.type,
                "title": p.title,
                "excerpt": p.excerpt,
                "body": p.body,
                "body_html": p.body,
                "image": _abs_media(request, p.image.url) if p.image else "",
                "published_at": p.published_at.isoformat() if p.published_at else "",
                "event_start": p.event_start.isoformat() if getattr(p, "event_start", None) else "",
                "event_end": p.event_end.isoformat() if getattr(p, "event_end", None) else "",
                "location_name": getattr(p, "location_name", "") or "",
                "ticket_url": getattr(p, "ticket_url", "") or "",
                "opponent": getattr(p, "opponent", "") or "",
            }
            for p in qs[:limit]
        ]
        return JsonResponse({"items": items})


class V1PostDetailView(View):
    def get(self, request, post_id: int):
        try:
            post = Post.objects.get(
                id=post_id,
                is_published=True,
                type__in=[Post.TYPE_NOTICE, Post.TYPE_SPORT, Post.TYPE_NEWS],
            )
        except Post.DoesNotExist:
            return JsonResponse({"detail": "Пост није пронађен."}, status=404)

        return JsonResponse(
            {
                "id": post.id,
                "type": post.type,
                "title": post.title,
                "excerpt": post.excerpt,
                "body": post.body,
                "body_html": post.body,
                "image": _abs_media(request, post.image.url) if post.image else "",
                "published_at": post.published_at.isoformat() if post.published_at else "",
                "event_start": post.event_start.isoformat() if getattr(post, "event_start", None) else "",
                "event_end": post.event_end.isoformat() if getattr(post, "event_end", None) else "",
                "location_name": getattr(post, "location_name", "") or "",
                "ticket_url": getattr(post, "ticket_url", "") or "",
                "opponent": getattr(post, "opponent", "") or "",
            }
        )


class V1AnnouncementsView(View):
    def get(self, request):
        qs = Post.objects.filter(is_published=True, type=Post.TYPE_NOTICE).order_by("-published_at")[:100]
        return JsonResponse(
            {
                "items": [
                    {
                        "id": p.id,
                        "type": p.type,
                        "title": p.title,
                        "excerpt": p.excerpt,
                        "body": p.body,
                        "body_html": p.body,
                        "image": _abs_media(request, p.image.url) if p.image else "",
                        "published_at": p.published_at.isoformat() if p.published_at else "",
                    }
                    for p in qs
                ]
            }
        )


class V1SiteView(View):
    def get(self, request):
        s = SiteSettings.objects.first()
        if not s:
            return JsonResponse({"settings": None})

        footer_columns = [
            {
                "title": col.title,
                "links": [{"label": l.label, "url": l.url} for l in col.links.all()],
            }
            for col in s.footer_columns.all()
        ]

        return JsonResponse(
            {
                "settings": {
                    "site_name": s.site_name,
                    "logo": _abs_media(request, s.logo.url) if s.logo else "",
                    "favicon": _abs_media(request, s.favicon.url) if s.favicon else "",
                    "social_facebook_icon": _abs_media(request, s.social_facebook_icon.url) if s.social_facebook_icon else "",
                    "hero_title": s.hero_title,
                    "hero_subtitle": s.hero_subtitle,
                    "hero_image": _abs_media(request, s.hero_image.url) if s.hero_image else "",
                    "address": getattr(s, "address", ""),
                    "maps_embed_url": s.maps_embed_url,
                    "footer_text": s.footer_text,
                    "footer_logo": _abs_media(request, s.footer_logo.url) if getattr(s, "footer_logo", None) else "",
                    "footer_bottom_text": getattr(s, "footer_bottom_text", ""),
                    "footer_columns": footer_columns,
                }
            }
        )


class V1NavView(View):
    def get(self, request):
        qs = Page.objects.filter(show_in_nav=True).order_by("nav_order", "id")
        items = [{"href": "/" + p.slug.strip("/"), "label": p.title or p.slug} for p in qs]
        return JsonResponse({"items": items})


class V1PageView(View):
    def get(self, request, slug: str):
        slug = (slug or "").strip("/")
        try:
            p = Page.objects.get(slug=slug)
        except Page.DoesNotExist:
            return JsonResponse({"page": None, "missing": True, "slug": slug}, status=404)

        return JsonResponse(
            {
                "page": {
                    "slug": p.slug,
                    "title": p.title,
                    "subtitle": p.subtitle,
                    "body": p.body,
                    "body_html": p.body,
                    "hero_image": _abs_media(request, p.hero_image.url) if p.hero_image else "",
                    "seo_title": p.seo_title,
                    "seo_description": p.seo_description,
                    "updated_at": p.updated_at.isoformat(),
                }
            }
        )
