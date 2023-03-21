from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authentication.urls')),
    path('fanfic/', include('article.urls')),
    path('comments/', include('comments.urls')),
    path('', include('like.urls')),
]