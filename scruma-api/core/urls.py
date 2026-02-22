from django.urls import path

from .views import (
    DeprecatedEndpointView,
    V1AnnouncementsView,
    V1NavView,
    V1PageView,
    V1PostDetailView,
    V1PostsView,
    V1SiteView,
)

urlpatterns = [
    path("health/", DeprecatedEndpointView.as_view(), name="legacy-health"),
    path("announcements/", DeprecatedEndpointView.as_view(), name="legacy-announcements"),
    path("home/", DeprecatedEndpointView.as_view(), name="legacy-home"),
    path("v1/site/", V1SiteView.as_view(), name="v1-site"),
    path("v1/nav/", V1NavView.as_view(), name="v1-nav"),
    path("v1/pages/<path:slug>/", V1PageView.as_view(), name="v1-page"),
    path("v1/posts/", V1PostsView.as_view(), name="v1-posts"),
    path("v1/posts/<int:post_id>/", V1PostDetailView.as_view(), name="v1-post-detail"),
    path("v1/announcements/", V1AnnouncementsView.as_view(), name="v1-announcements"),
]
