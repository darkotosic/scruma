from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sitesettings",
            name="maps_embed_url",
            field=models.CharField(
                blank=True,
                default="",
                max_length=250,
                verbose_name="Уграђена мапа (URL)",
            ),
        ),
        migrations.CreateModel(
            name="FooterColumn",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=80, verbose_name="Наслов колоне")),
                (
                    "order",
                    models.PositiveIntegerField(default=0, verbose_name="Редослед"),
                ),
                (
                    "site_settings",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="footer_columns",
                        to="core.sitesettings",
                        verbose_name="Подешавања сајта",
                    ),
                ),
            ],
            options={
                "verbose_name": "Колона футера",
                "verbose_name_plural": "Колоне футера",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="FooterLink",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("label", models.CharField(max_length=80, verbose_name="Текст")),
                ("url", models.URLField(max_length=300, verbose_name="Линк")),
                (
                    "order",
                    models.PositiveIntegerField(default=0, verbose_name="Редослед"),
                ),
                (
                    "column",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="links",
                        to="core.footercolumn",
                        verbose_name="Колона",
                    ),
                ),
            ],
            options={
                "verbose_name": "Линк у футеру",
                "verbose_name_plural": "Линкови у футеру",
                "ordering": ["order", "id"],
            },
        ),
    ]
