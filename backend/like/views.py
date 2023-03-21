from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from authentication.models import CustomUser
from authentication.utils import short_uuid
from .models import *

class toggle_like_article(APIView):
    def post(self, request, *args, **kwargs):
        article_id = kwargs.get('article_id')
        user = request.user

        if user.is_anonymous:
            print(request.COOKIES.get('guest_id'))
            if request.COOKIES.get('guest_id')!=None:
                id = request.COOKIES.get('guest_id')
                user = CustomUser.objects.filter(username=f"{id}_guest")[0]
            else:
                id = short_uuid.create()
                request.COOKIES['guest_id'] = id
                user = CustomUser.objects.create(username=f"{id}_guest", is_active=False)

        try:
            article = Article.objects.filter(pk=article_id)[0]
            like, created = Like.objects.get_or_create(liked_by=user, article=article)
            if not created:
                like.delete()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return None
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class toggle_bookmark_article(APIView):
    def post(self, request, *args, **kwargs):
        article_id = kwargs.get('article_id')
        user = request.user
        try:
            article = Article.objects.filter(pk=article_id)[0]
            bookmark, created = Bookmark.objects.get_or_create(bookmarked_by=user, article=article)
            if not created:
                bookmark.delete()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return None
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)