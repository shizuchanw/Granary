# Generated by Django 4.1.7 on 2023-03-11 08:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("comments", "0011_comment_parent"),
    ]

    operations = [
        migrations.AlterField(
            model_name="comment",
            name="creator",
            field=models.ForeignKey(
                db_column="creator_id",
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]