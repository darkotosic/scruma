from django.http import JsonResponse
from django.views import View

from .models import Announcement


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
