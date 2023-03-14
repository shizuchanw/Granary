from django.conf import settings
from django.db import models
from article.models import Article

class Comment(models.Model):
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    createdTime = models.DateTimeField()
    lastEditTime = models.DateTimeField()
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='creator_id')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, db_column='article_id')
