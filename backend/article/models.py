from django.conf import settings
from django.db import models
import uuid
import re

class Tag(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
       return self.name
    class Meta:
        abstract = True

class Fandom(Tag):
    pass

class CP(Tag):
    pass

class Character(Tag):
    pass

class Grading(Tag):
    pass

class OtherTag(Tag):
    pass

class Article(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField()
    createdTime = models.DateTimeField()
    lastEditTime = models.DateTimeField()

    fandoms = models.ManyToManyField(Fandom)
    cps = models.ManyToManyField(CP)
    characters = models.ManyToManyField(Character)
    grading = models.ForeignKey(Grading, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(OtherTag, blank=True)

    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


    @property
    def word_count(self):
        text = re.sub(r"]*>", " ", self.content)
        return len(text.split())

    @property
    def like_count(self):
        return self.like_set.all().count()

    @property
    def bookmark_count(self):
        return self.bookmark_set.all().count()

    class Meta:
        ordering = ["-createdTime"]
