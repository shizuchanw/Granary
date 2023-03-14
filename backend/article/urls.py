from django.urls import path, include
from . import views
from .router import router

urlpatterns = [
    path('all-tags/', views.all_tags),
    path('tag/<str:tag_type>/<str:tag_name>', views.TagResultView.as_view()),
    path('author/<str:author_id>', views.AuthorResultView.as_view()),
    path('search', views.SearchResultView.as_view()),
    path('liked', views.LikeResultView.as_view()),
    path('bookmarked', views.BookmarkResultView.as_view()),
    path('', include(router.urls)),
]