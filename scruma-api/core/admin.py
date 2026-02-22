from django.contrib import admin

from .models import Announcement, Post, SiteSettings


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "body")


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "updated_at")


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("type", "title", "is_published", "published_at")
    list_filter = ("type", "is_published")
    search_fields = ("title", "excerpt", "body")
