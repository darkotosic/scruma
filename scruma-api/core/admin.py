from django import forms
from django.contrib import admin
from django.db import models

from .models import Announcement, FooterColumn, FooterLink, Page, Post, SiteSettings


class FooterColumnInline(admin.TabularInline):
    model = FooterColumn
    extra = 1
    ordering = ("order", "id")


class FooterLinkInline(admin.TabularInline):
    model = FooterLink
    extra = 1
    ordering = ("order", "id")


class SCEditorAdminMixin:
    """Додаје SCEditor на сва TextField поља у Django admin-у."""

    formfield_overrides = {
        models.TextField: {
            "widget": forms.Textarea(attrs={"class": "vLargeTextField js-sceditor"})
        }
    }

    class Media:
        css = {
            "all": (
                "https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/default.min.css",
            )
        }
        js = (
            "https://cdn.jsdelivr.net/npm/sceditor@3/minified/sceditor.min.js",
            "https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/xhtml.js",
            "core/admin/sceditor-init.js",
        )


@admin.register(Announcement)
class AnnouncementAdmin(SCEditorAdminMixin, admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "body")


@admin.register(SiteSettings)
class SiteSettingsAdmin(SCEditorAdminMixin, admin.ModelAdmin):
    list_display = ("site_name", "address", "updated_at")
    inlines = [FooterColumnInline]
    fieldsets = (
        ("Основно", {"fields": ("site_name", "address")}),
        ("Брендинг", {"fields": ("logo", "favicon", "social_facebook_icon")}),
        ("Херо", {"fields": ("hero_title", "hero_subtitle", "hero_image")}),
        ("Мапа", {"fields": ("maps_embed_url",)}),
        ("Футер", {"fields": ("footer_text", "footer_logo", "footer_bottom_text")}),
    )


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
class PostAdmin(SCEditorAdminMixin, admin.ModelAdmin):
    list_display = ("type", "title", "is_published", "published_at")
    list_filter = ("type", "is_published")
    search_fields = ("title", "excerpt", "body")


@admin.register(Page)
class PageAdmin(SCEditorAdminMixin, admin.ModelAdmin):
    list_display = ("slug", "title", "show_in_nav", "nav_order", "updated_at")
    list_filter = ("show_in_nav",)
    search_fields = ("slug", "title", "subtitle", "body", "seo_title", "seo_description")
    ordering = ("nav_order", "id")
