from django.http import JsonResponse, HttpResponse
from django.views import View

from .models import Announcement


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
