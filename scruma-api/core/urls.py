from django.urls import path

from .views import (
    AnnouncementListView,
    HealthView,
    HomePageView,
    V1AnnouncementsView,
    V1HomeView,
    V1NavView,
    V1PageView,
    V1PostsView,
    V1SiteView,
)

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("announcements/", AnnouncementListView.as_view(), name="announcements"),
    path("home/", HomePageView.as_view(), name="home"),
    # v1
    path("v1/home/", V1HomeView.as_view(), name="v1-home"),
    path("v1/site/", V1SiteView.as_view(), name="v1-site"),
    path("v1/nav/", V1NavView.as_view(), name="v1-nav"),
    path("v1/pages/<path:slug>/", V1PageView.as_view(), name="v1-page"),
    path("v1/posts/", V1PostsView.as_view(), name="v1-posts"),
    path("v1/announcements/", V1AnnouncementsView.as_view(), name="v1-announcements"),
]
