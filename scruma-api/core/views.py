from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views import View

from .models import Announcement, Page, Post, SiteSettings


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
                        .status {
                            font-size: 32px;
                            margin-bottom: 20px;
                        }
                        .dev {
                            font-size: 20px;
                            color: #58a6ff;
                        }
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
        return JsonResponse({"status": "ok"})


class AnnouncementListView(View):
    def get(self, request):
        payload = [
            {
                "id": item.id,
                "title": item.title,
                "body": item.body,
                "created_at": item.created_at.isoformat(),
            }
            for item in Announcement.objects.all()[:20]
        ]
        return JsonResponse({"results": payload})


def abs_media(request, path: str) -> str:
    if not path:
        return ""
    return request.build_absolute_uri(settings.MEDIA_URL + path)


class HomePageView(View):
    def get(self, request):
        settings_obj = SiteSettings.objects.first()

        def settings_payload():
            if not settings_obj:
                return {
                    "site_name": "СЦ Рума",
                    "logo": "",
                    "favicon": "",
                    "hero_title": "Спортски центар Рума",
                    "hero_subtitle": "",
                    "hero_image": "",
                    "maps_embed_url": "",
                    "footer_text": "",
                }

            return {
                "site_name": settings_obj.site_name,
                "logo": abs_media(request, settings_obj.logo.name) if settings_obj.logo else "",
                "favicon": abs_media(request, settings_obj.favicon.name) if settings_obj.favicon else "",
                "hero_title": settings_obj.hero_title,
                "hero_subtitle": settings_obj.hero_subtitle,
                "hero_image": abs_media(request, settings_obj.hero_image.name)
                if settings_obj.hero_image
                else "",
                "maps_embed_url": settings_obj.maps_embed_url,
                "footer_text": settings_obj.footer_text,
            }

        def posts_payload(post_type: str, limit: int = 6):
            qs = Post.objects.filter(type=post_type, is_published=True)[:limit]
            return [
                {
                    "id": p.id,
                    "title": p.title,
                    "excerpt": p.excerpt,
                    "image": abs_media(request, p.image.name) if p.image else "",
                    "link_url": p.link_url,
                    "published_at": p.published_at.isoformat(),
                }
                for p in qs
            ]

        return JsonResponse(
            {
                "settings": settings_payload(),
                "news": posts_payload(Post.TYPE_NEWS, limit=6),
                "notices": posts_payload(Post.TYPE_NOTICE, limit=6),
                "sports": posts_payload(Post.TYPE_SPORT, limit=6),
            }
        )


def _abs_media(request, path: str) -> str:
    if not path:
        return ""
    return request.build_absolute_uri(path)


class V1HomeView(View):
    def get(self, request):
        settings_obj = SiteSettings.objects.first()

        if not settings_obj:
            return JsonResponse(
                {
                    "settings": None,
                    "announcements": [],
                    "posts": [],
                }
            )

        footer_columns = []
        for col in settings_obj.footer_columns.all():
            footer_columns.append(
                {
                    "title": col.title,
                    "links": [{"label": l.label, "url": l.url} for l in col.links.all()],
                }
            )

        announcements = Announcement.objects.order_by("-created_at")[:20]
        posts = Post.objects.filter(is_published=True).order_by("-published_at")[:50]
        # footer_logo / footer_bottom_text могу да не постоје у старијој шеми
        _footer_logo = getattr(settings_obj, "footer_logo", None)
        _footer_bottom_text = getattr(settings_obj, "footer_bottom_text", "")

        data = {
            "settings": {
                "site_name": settings_obj.site_name,
                "logo": _abs_media(request, settings_obj.logo.url) if settings_obj.logo else "",
                "favicon": _abs_media(request, settings_obj.favicon.url) if settings_obj.favicon else "",
                "hero_title": settings_obj.hero_title,
                "hero_subtitle": settings_obj.hero_subtitle,
                "hero_image": _abs_media(request, settings_obj.hero_image.url) if settings_obj.hero_image else "",
                "maps_embed_url": settings_obj.maps_embed_url,
                "footer_text": settings_obj.footer_text,
                "footer_logo": _abs_media(request, _footer_logo.url) if _footer_logo else "",
                "footer_bottom_text": _footer_bottom_text,
                "footer_columns": footer_columns,
            },
            "announcements": [
                {
                    "id": a.id,
                    "title": a.title,
                    "body": a.body,
                    "created_at": a.created_at.isoformat(),
                }
                for a in announcements
            ],
            "posts": [
                {
                    "id": p.id,
                    "type": p.type,
                    "title": p.title,
                    "excerpt": p.excerpt,
                    "body": p.body,
                    "image": _abs_media(request, p.image.url) if p.image else "",
                    "is_published": p.is_published,
                    "published_at": p.published_at.isoformat() if p.published_at else "",
                }
                for p in posts
            ],
        }
        return JsonResponse(data)


class V1PostsView(View):
    def get(self, request):
        qs = Post.objects.filter(is_published=True).order_by("-published_at")
        ptype = (request.GET.get("type") or "").strip()
        if ptype:
            qs = qs.filter(type=ptype)

        items = [
            {
                "id": p.id,
                "type": p.type,
                "title": p.title,
                "excerpt": p.excerpt,
                "body": p.body,
                "image": _abs_media(request, p.image.url) if p.image else "",
                "published_at": p.published_at.isoformat() if p.published_at else "",
            }
            for p in qs[:100]
        ]
        return JsonResponse({"items": items})


class V1AnnouncementsView(View):
    def get(self, request):
        qs = Announcement.objects.filter(is_active=True).order_by("-created_at")[:100]
        items = [
            {
                "id": a.id,
                "title": a.title,
                "body": a.body,
                "created_at": a.created_at.isoformat(),
                "is_active": a.is_active,
            }
            for a in qs
        ]
        return JsonResponse({"items": items})


class V1SiteView(View):
    def get(self, request):
        s = SiteSettings.objects.first()
        if not s:
            return JsonResponse({"settings": None})

        footer_columns = []
        for col in s.footer_columns.all():
            footer_columns.append(
                {
                    "title": col.title,
                    "links": [{"label": l.label, "url": l.url} for l in col.links.all()],
                }
            )

        data = {
            "settings": {
                "site_name": s.site_name,
                "logo": _abs_media(request, s.logo.url) if s.logo else "",
                "favicon": _abs_media(request, s.favicon.url) if s.favicon else "",
                "hero_title": s.hero_title,
                "hero_subtitle": s.hero_subtitle,
                "hero_image": _abs_media(request, s.hero_image.url) if s.hero_image else "",
                "maps_embed_url": s.maps_embed_url,
                "footer_text": s.footer_text,
                "footer_logo": _abs_media(request, s.footer_logo.url) if getattr(s, "footer_logo", None) else "",
                "footer_bottom_text": getattr(s, "footer_bottom_text", ""),
                "footer_columns": footer_columns,
            }
        }
        return JsonResponse(data)


class V1NavView(View):
    def get(self, request):
        qs = Page.objects.filter(show_in_nav=True).order_by("nav_order", "id")
        items = [{"href": "/" + p.slug.strip("/"), "label": p.title or p.slug} for p in qs]
        for it in items:
            if it["href"] == "/":
                it["href"] = "/"
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
                    "hero_image": _abs_media(request, p.hero_image.url) if p.hero_image else "",
                    "seo_title": p.seo_title,
                    "seo_description": p.seo_description,
                    "updated_at": p.updated_at.isoformat(),
                }
            }
        )
