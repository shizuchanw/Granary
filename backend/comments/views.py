from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.models import CustomUser
from .models import *
from .serializer import *
from datetime import datetime
from authentication.utils import short_uuid

def _append_username(query_set, Serializer):
    data = list()
    for item in query_set:
        temp = Serializer(item).data
        temp.update({'username': item.creator.get_username()})
        data.append(temp)
    return data

class CommentByArticleView(APIView):
    def get(self, request, *args, **kwargs):
        article_id = kwargs.get('article_id')
        try:
            article = Article.objects.filter(pk=article_id)[0];
            query_set = article.comment_set.all()
            data = _append_username(query_set, CommentSerializer)
        except:
            return None
        return Response(data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'pk'

    def create(self, request, *args, **kwargs):
        data = request.data
        now = datetime.now()
        data['createdTime'] = now
        data['lastEditTime'] = now
        if request.user.is_anonymous:
            if request.session.get('guest_id', None)==None:
                id = request.session.get('guest_id')
                guest = CustomUser.objects.filter(username=f"{id}_guest")[0]
            else:
                id = short_uuid.create()
                request.session['guest_id'] = id
                guest = CustomUser.objects.create(username=f"{id}_guest", is_active=False)
            data['creator'] = guest.id
        else:
            data['creator'] = request.user.id
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def update(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        data = CommentSerializer(comment).data
        data['content'] = request.data['content']
        data['lastEditTime'] = datetime.now()
        serializer = CommentSerializer(comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)