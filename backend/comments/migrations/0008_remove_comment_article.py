# Generated by Django 4.1.7 on 2023-03-11 08:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("comments", "0007_alter_comment_article_alter_comment_creator"),
    ]

    operations = [
        migrations.RemoveField(model_name="comment", name="article",),
    ]
