from django.urls import path, include
from . import views

urlpatterns = [
    path('toggle-like/<str:article_id>', views.toggle_like_article.as_view()),
    path('toggle-bookmark/<str:article_id>', views.toggle_bookmark_article.as_view())
]