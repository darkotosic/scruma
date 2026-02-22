from django.urls import path

from .views import AnnouncementListView, HealthView, HomePageView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("announcements/", AnnouncementListView.as_view(), name="announcements"),
    path("home/", HomePageView.as_view(), name="home"),
]
