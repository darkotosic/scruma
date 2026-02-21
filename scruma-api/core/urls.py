from django.urls import path

from .views import AnnouncementListView, HealthView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("announcements/", AnnouncementListView.as_view(), name="announcements"),
]
