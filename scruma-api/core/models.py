from django.db import models


class Announcement(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    is_active = models.BooleanField(default=True)
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

    # ✅ Замена: URLField -> CharField, + verbose_name, max_length=250
    maps_embed_url = models.CharField(
        "Уграђена мапа (URL)",
        max_length=250,
        blank=True,
        default="",
    )

    footer_text = models.CharField(max_length=200, blank=True, default="")
    footer_logo = models.ImageField(upload_to="site/", blank=True, null=True)
    footer_bottom_text = models.CharField(max_length=220, blank=True, default="")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "SiteSettings"


# ✅ Нови модели испод SiteSettings
class FooterColumn(models.Model):
    site_settings = models.ForeignKey(
        SiteSettings,
        on_delete=models.CASCADE,
        related_name="footer_columns",
        verbose_name="Подешавања сајта",
    )
    title = models.CharField("Наслов колоне", max_length=80)
    order = models.PositiveIntegerField("Редослед", default=0)

    class Meta:
        verbose_name = "Колона футера"
        verbose_name_plural = "Колоне футера"
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.title


class FooterLink(models.Model):
    column = models.ForeignKey(
        FooterColumn,
        on_delete=models.CASCADE,
        related_name="links",
        verbose_name="Колона",
    )
    label = models.CharField("Текст", max_length=80)
    url = models.URLField("Линк", max_length=300)
    order = models.PositiveIntegerField("Редослед", default=0)

    class Meta:
        verbose_name = "Линк у футеру"
        verbose_name_plural = "Линкови у футеру"
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.label


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


class Page(models.Model):
    slug = models.CharField("Slug (путања)", max_length=200, unique=True)
    title = models.CharField("Наслов", max_length=200, blank=True, default="")
    subtitle = models.TextField("Поднаслов", blank=True, default="")
    body = models.TextField("Садржај", blank=True, default="")

    hero_image = models.ImageField("Херо слика", upload_to="pages/", blank=True, null=True)

    seo_title = models.CharField("SEO наслов", max_length=200, blank=True, default="")
    seo_description = models.CharField("SEO опис", max_length=260, blank=True, default="")

    show_in_nav = models.BooleanField("Прикажи у навигацији", default=True)
    nav_order = models.PositiveIntegerField("Редослед у навигацији", default=0)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["nav_order", "id"]

    def __str__(self) -> str:
        return self.slug
