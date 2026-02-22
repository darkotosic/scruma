from django.contrib import admin

from .models import Announcement, FooterColumn, FooterLink, Page, Post, SiteSettings


class FooterColumnInline(admin.TabularInline):
    model = FooterColumn
    extra = 1
    ordering = ("order", "id")


class FooterLinkInline(admin.TabularInline):
    model = FooterLink
    extra = 1
    ordering = ("order", "id")


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "body")


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "updated_at")
    inlines = [FooterColumnInline]


@admin.register(FooterColumn)
class FooterColumnAdmin(admin.ModelAdmin):
    list_display = ("title", "site_settings", "order")
    list_filter = ("site_settings",)
    search_fields = ("title",)
    inlines = [FooterLinkInline]


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    list_display = ("label", "column", "order")
    list_filter = ("column",)
    search_fields = ("label", "url")


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("type", "title", "is_published", "published_at")
    list_filter = ("type", "is_published")
    search_fields = ("title", "excerpt", "body")


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug", "title", "show_in_nav", "nav_order", "updated_at")
    list_filter = ("show_in_nav",)
    search_fields = ("slug", "title", "subtitle", "body", "seo_title", "seo_description")
    ordering = ("nav_order", "id")
