from datetime import datetime

from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from .models import *
from authentication.models import CustomUser
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from .serializer import SearchResultSerializer, ArticleSerializer
from django.db.models import Q



class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'pk'

    def create(self, request, *args, **kwargs):
        # find tags
        fandoms = request.data['fandoms']
        cps = request.data['cps']
        characters = request.data['characters']
        tags = request.data['tags']
        tags_to_create = [[fandoms, Fandom],
                       [cps, CP],
                       [characters, Character],
                       [tags, OtherTag]]
        for tag_pair in tags_to_create:
            for tag in tag_pair[0]:
                ob, created = tag_pair[1].objects.get_or_create(name=tag)
                if created:
                    ob.save()

        # other info
        data = request.data
        now = datetime.now()
        data['createdTime'] = now
        data['lastEditTime'] = now
        data['creator'] = request.user.id
        serializer = ArticleSerializer(data=data)
        if serializer.is_valid():
            id = uuid.uuid4()
            serializer.save(id=id)
            return Response(id, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def retrieve(self, request, pk=None):
        article = get_object_or_404(Article, pk=pk)
        if request.user.is_anonymous or (not request.user.is_adult and article.grading.name !="G"):
            return Response("此内容只开放给成年注册用户。", status=status.HTTP_401_UNAUTHORIZED)
        serializer = ArticleSerializer(article)
        data = serializer.data
        data['username'] = article.creator.get_username()
        data['word_count'] = article.word_count
        data['like_count'] = article.like_count
        data['bookmark_count'] = article.bookmark_count
        data['liked_by_me'] = False
        data['bookmarked_by_me'] = False
        if article.like_set.filter(liked_by=request.user.id).count() > 0:
            data['liked_by_me'] = True
        if article.bookmark_set.filter(bookmarked_by=request.user.id).count() > 0:
            data['bookmarked_by_me'] = True
        return Response(data)

    def update(self, request, pk=None):
        article = get_object_or_404(Article, pk=pk)
        # check whether the current user is the same creator
        if request.user.id is not article.creator.id:
            return Response("只有作者才有权限编辑。", status=status.HTTP_401_UNAUTHORIZED)
        # create tag if not exist
        fandoms = request.data['fandoms']
        cps = request.data['cps']
        characters = request.data['characters']
        tags = request.data['tags']
        tags_to_create = [[fandoms, Fandom],
                          [cps, CP],
                          [characters, Character],
                          [tags, OtherTag]]
        for tag_pair in tags_to_create:
            for tag in tag_pair[0]:
                ob, created = tag_pair[1].objects.get_or_create(name=tag)
                if created:
                    ob.save()

        # other info
        data = request.data
        data['createdTime'] = datetime.now()
        data['lastEditTime'] = article.lastEditTime
        data['creator'] = article.creator.id
        serializer = ArticleSerializer(article, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        article = get_object_or_404(Article, pk=pk)
        if request.user.id is not article.creator.id:
            return Response("只有作者才有权限删除。", status=status.HTTP_401_UNAUTHORIZED)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ================ get all tags ================ #

def all_tags(request):
    if request.method == 'GET':
        data = {}
        data['fandoms'] = _list_tag(Fandom)
        data['cps'] = _list_tag(CP)
        data['characters'] = _list_tag(Character)
        data['gradings'] = _list_tag(Grading)
        data['tags'] = _list_tag(OtherTag)
        return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})

def _list_tag(model):
    return list(model.objects.values_list('name', flat=True))

# ================ TagResultView ================ #

class TagResultView(APIView):
    def get(self, request, *args, **kwargs):
        tag_type = kwargs.get('tag_type')
        tag_name = kwargs.get('tag_name')
        # filter for adult content
        if tag_type=='grading' and tag_name!='G' and (request.user.is_anonymous or not request.user.is_adult):
            return Response("此内容只开放给成年注册用户。。", status=status.HTTP_401_UNAUTHORIZED)

        dic = {'fandom': Fandom, 'cp': CP, 'character': Character, 'grading': Grading, 'othertag': OtherTag}

        try:
            tag = dic[tag_type].objects.filter(name=tag_name)[0];
            query_set = tag.article_set.all()
            data = _append_info(query_set, ArticleSerializer)
        except:
            return None
        return Response(data)

# ================ AuthorResultView ================ #

class AuthorResultView(APIView):
    def get(self, request, *args, **kwargs):
        author_id = kwargs.get('author_id')
        try:
            author = CustomUser.objects.filter(pk=author_id)[0];
            query_set = author.article_set.all()
            query_set = _filter_adult_content(query_set, request.user)
            data = _append_info(query_set, ArticleSerializer)
        except:
            return None
        return Response(data)

# ================ LikeResultView ================ #

class LikeResultView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            likes = user.like_set.all().values_list('article', flat=True)
            articles = Article.objects.filter(pk__in=likes)
            articles = _filter_adult_content(articles, request.user)
            data = _append_info(articles, ArticleSerializer)
        except:
            return None
        return Response(data)

class BookmarkResultView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            bookmarks = user.bookmark_set.all().values_list('article', flat=True)
            articles = Article.objects.filter(pk__in=bookmarks)
            articles = _filter_adult_content(articles, request.user)
            data = _append_info(articles, ArticleSerializer)
        except:
            return None
        return Response(data)


# ================ SearchResultView ================ #

def _check_tags(request, articles, tag_name):
    if tag_name in request.GET and request.GET[tag_name] != "[]":
        tags = request.GET[tag_name]
        tags = tags[1:len(tags) - 1].split(",")
        if len(tags) > 1 :
            articles = articles \
                .filter(**{"%s__name__in" % tag_name : tags}) \
                .annotate(num_tags=Count(tag_name)) \
                .filter(num_tags=len(tags))
        else:
            articles = articles\
                .filter(**{"%s__name__in" % tag_name: tags})
    return articles

def _check_grading(request, articles):
    if "grading" in request.GET and request.GET["grading"] != "":
        grading = request.GET["grading"]
        articles = articles.filter(grading__name=grading)
    return articles

def _check_keywords(request, articles):
    if "keywords" in request.GET and request.GET["keywords"] != "":
        keyword_list = request.GET["keywords"].split('+')
        for keyword in keyword_list:
            articles = articles.filter( Q(title__icontains=keyword) | Q(content__icontains=keyword) | Q(description__icontains=keyword))
    return articles

class SearchResultView(APIView):
    def get(self, request, *args, **kwargs):
        articles = Article.objects.all()
        articles = _filter_adult_content(articles, request.user)
        # filter by tags
        for tag in ['fandoms', 'cps', 'characters', 'tags', 'grading']:
            if tag == 'grading':
                articles = _check_grading(self.request, articles)
            else:
                articles = _check_tags(self.request, articles, tag)
        # filter by keyword
        articles = _check_keywords(self.request, articles)
        data = _append_info(articles, ArticleSerializer)
        return Response(data)

def _append_info(query_set, Serializer):
    data = list()
    for item in query_set:
        temp = Serializer(item).data
        temp.update({'username': item.creator.get_username()})
        temp.update({'word_count': item.word_count})
        temp.update({'like_count': item.like_count})
        temp.update({'bookmark_count': item.bookmark_count})
        data.append(temp)
    return data

def _filter_adult_content(query_set, user):
    if user.is_anonymous or not user.is_adult:
        query_set = query_set.exclude(grading__name__contains="R18")
    return query_set