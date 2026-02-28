from __future__ import annotations

from django.utils.cache import patch_cache_control


class MediaCacheControlMiddleware:
    """
    Да PageSpeed не пријављује "None Cache TTL" за /media/* ресурсе.

    Render/Django у овом пројекту сервира media фајлове преко Django view-а,
    па морамо експлицитно да додамо Cache-Control хедере на одговор.

    Политика:
    - public, max-age=2592000 (30 дана)
    - immutable
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if request.path.startswith("/media/") and response.status_code == 200:
            patch_cache_control(
                response,
                public=True,
                max_age=60 * 60 * 24 * 30,
                immutable=True,
            )
        return response
