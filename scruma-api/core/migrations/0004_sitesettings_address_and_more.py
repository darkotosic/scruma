from django.db import migrations, models


MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2106.4186091167267!2d19.816897856951133!3d45.00865869273741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475babf00502b12f%3A0xa91ad9140edc7e6a!2z0KHQv9C-0YDRgtGB0LrQviDQv9C-0YHQu9C-0LLQvdC4INGG0LXQvdGC0LDRgA!5e1!3m2!1sen!2srs!4v1771758999050!5m2!1sen!2srs"
ADDRESS = "Veljka Dugoševića 100, Ruma"


def seed_settings(apps, schema_editor):
    SiteSettings = apps.get_model("core", "SiteSettings")
    s = SiteSettings.objects.first()
    if not s:
        SiteSettings.objects.create(
            site_name="СЦ Рума",
            hero_title="Спортски центар Рума",
            address=ADDRESS,
            maps_embed_url=MAP_URL,
        )
        return

    changed = False
    site_name = (s.site_name or "").strip()
    if site_name and site_name.replace("К ", "Ц ") == "СЦ Рума" and site_name != "СЦ Рума":
        s.site_name = "СЦ Рума"
        changed = True

    if not (getattr(s, "address", "") or "").strip():
        s.address = ADDRESS
        changed = True

    if not (s.maps_embed_url or "").strip():
        s.maps_embed_url = MAP_URL
        changed = True

    if changed:
        s.save(update_fields=["site_name", "address", "maps_embed_url"])


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_page_announcement_is_active_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="address",
            field=models.CharField(
                verbose_name="Адреса",
                max_length=200,
                blank=True,
                default=ADDRESS,
            ),
        ),
        migrations.AlterField(
            model_name="sitesettings",
            name="maps_embed_url",
            field=models.CharField(
                verbose_name="Уграђена мапа (URL)",
                max_length=600,
                blank=True,
                default=MAP_URL,
            ),
        ),
        migrations.RunPython(seed_settings, migrations.RunPython.noop),
    ]
