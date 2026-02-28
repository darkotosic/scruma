from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0009_alter_post_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="type",
            field=models.CharField(
                "Тип",
                choices=[("news", "Вести"), ("notice", "Обавештења"), ("sport", "Догађаји")],
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="post",
            name="event_start",
            field=models.DateTimeField("Почетак догађаја", blank=True, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="event_end",
            field=models.DateTimeField("Крај догађаја", blank=True, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="location_name",
            field=models.CharField("Локација (назив)", max_length=120, blank=True, default=""),
        ),
        migrations.AddField(
            model_name="post",
            name="ticket_url",
            field=models.URLField("Линк за карте", max_length=300, blank=True, default=""),
        ),
        migrations.AddField(
            model_name="post",
            name="opponent",
            field=models.CharField("Противник/учесник", max_length=120, blank=True, default=""),
        ),
    ]
