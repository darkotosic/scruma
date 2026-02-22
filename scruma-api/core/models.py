from django.db import models


class Announcement(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=120, default="СЦ Рума")
    logo = models.ImageField(upload_to="site/", blank=True, null=True)
    favicon = models.ImageField(upload_to="site/", blank=True, null=True)
    hero_title = models.CharField(max_length=160, default="Спортски центар Рума")
    hero_subtitle = models.TextField(blank=True, default="")
    hero_image = models.ImageField(upload_to="site/", blank=True, null=True)
    maps_embed_url = models.URLField(blank=True, default="")
    footer_text = models.CharField(max_length=200, blank=True, default="")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "SiteSettings"


class Post(models.Model):
    TYPE_NEWS = "news"
    TYPE_NOTICE = "notice"
    TYPE_SPORT = "sport"

    TYPE_CHOICES = [
        (TYPE_NEWS, "Вести"),
        (TYPE_NOTICE, "Обавештења"),
        (TYPE_SPORT, "Спортске вести"),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=220)
    excerpt = models.TextField(blank=True, default="")
    body = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="posts/", blank=True, null=True)
    link_url = models.URLField(blank=True, default="")
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self) -> str:
        return f"{self.get_type_display()}: {self.title}"
