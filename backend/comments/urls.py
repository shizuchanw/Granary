from django.urls import path, include

from rest_framework import routers
from .views import CommentViewSet, CommentByArticleView

router = routers.DefaultRouter()
router.register('comment', CommentViewSet, basename='article')


urlpatterns = [
    path('', include(router.urls)),
    path('by-article/<str:article_id>', CommentByArticleView.as_view()),
]