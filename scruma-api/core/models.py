from django.db import models


class Announcement(models.Model):
    title = models.CharField("Наслов", max_length=200)
    body = models.TextField("Садржај")
    is_active = models.BooleanField("Активно", default=True)
    created_at = models.DateTimeField("Креирано", auto_now_add=True)

    class Meta:
        verbose_name = "Обавештење"
        verbose_name_plural = "Обавештења"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class SiteSettings(models.Model):
    site_name = models.CharField("Назив сајта", max_length=120, default="СЦ Рума")
    logo = models.ImageField("Лого", upload_to="site/", blank=True, null=True)
    favicon = models.ImageField("Фавикон", upload_to="site/", blank=True, null=True)
    social_facebook_icon = models.ImageField(
        "Иконица за Фејсбук",
        upload_to="site/",
        blank=True,
        null=True,
    )
    hero_title = models.CharField("Херо наслов", max_length=160, default="Спортски центар Рума")
    hero_subtitle = models.TextField("Херо поднаслов", blank=True, default="")
    hero_image = models.ImageField("Херо слика", upload_to="site/", blank=True, null=True)
    address = models.CharField(
        "Адреса",
        max_length=200,
        blank=True,
        default="Вељка Дугошевића 100, Рума",
    )

    maps_embed_url = models.CharField(
        "Уграђена мапа (УРЛ)",
        max_length=600,
        blank=True,
        default="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2106.4186091167267!2d19.816897856951133!3d45.00865869273741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475babf00502b12f%3A0xa91ad9140edc7e6a!2z0KHQv9C-0YDRgtGB0LrQviDQv9C-0YHQu9C-0LLQvdC4INGG0LXQvdGC0LDRgA!5e1!3m2!1sen!2srs!4v1771758999050!5m2!1sen!2srs",
    )

    footer_text = models.CharField("Текст у футеру", max_length=200, blank=True, default="")
    footer_logo = models.ImageField("Лого у футеру", upload_to="site/", blank=True, null=True)
    footer_bottom_text = models.CharField("Доњи текст у футеру", max_length=220, blank=True, default="")
    updated_at = models.DateTimeField("Ажурирано", auto_now=True)

    class Meta:
        verbose_name = "Подешавања сајта"
        verbose_name_plural = "Подешавања сајта"

    def __str__(self) -> str:
        return "Подешавања сајта"


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
        (TYPE_NOTICE, "Обавештења"),
        (TYPE_SPORT, "Спортске вести"),
    ]

    type = models.CharField("Тип", max_length=20, choices=TYPE_CHOICES)
    title = models.CharField("Наслов", max_length=220)
    excerpt = models.TextField("Сажетак", blank=True, default="")
    body = models.TextField("Садржај", blank=True, default="")
    image = models.ImageField("Слика", upload_to="posts/", blank=True, null=True)
    link_url = models.URLField("Линк", blank=True, default="")
    is_published = models.BooleanField("Објављено", default=True)
    published_at = models.DateTimeField("Датум објаве", auto_now_add=True)

    class Meta:
        verbose_name = "Објава"
        verbose_name_plural = "Објаве"
        ordering = ["-published_at"]

    def __str__(self) -> str:
        return f"{self.get_type_display()}: {self.title}"


class Page(models.Model):
    slug = models.CharField("Слаг (путања)", max_length=200, unique=True)
    title = models.CharField("Наслов", max_length=200, blank=True, default="")
    subtitle = models.TextField("Поднаслов", blank=True, default="")
    body = models.TextField("Садржај", blank=True, default="")

    hero_image = models.ImageField("Херо слика", upload_to="pages/", blank=True, null=True)

    seo_title = models.CharField("СЕО наслов", max_length=200, blank=True, default="")
    seo_description = models.CharField("СЕО опис", max_length=260, blank=True, default="")

    show_in_nav = models.BooleanField("Прикажи у навигацији", default=True)
    nav_order = models.PositiveIntegerField("Редослед у навигацији", default=0)

    updated_at = models.DateTimeField("Ажурирано", auto_now=True)

    class Meta:
        verbose_name = "Страница"
        verbose_name_plural = "Странице"
        ordering = ["nav_order", "id"]

    def __str__(self) -> str:
        return self.slug
