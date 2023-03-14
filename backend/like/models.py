from django.conf import settings
from django.db import models
from article.models import Article

class Like(models.Model):
    liked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='creator_id')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, db_column='article_id')

class Bookmark(models.Model):
    bookmarked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='creator_id')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, db_column='article_id')
