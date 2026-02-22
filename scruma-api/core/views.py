from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views import View

from .models import Announcement, Post, SiteSettings


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
