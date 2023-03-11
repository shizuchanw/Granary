from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithGuestStatusView, CustomUserCreate, HelloWorldView

urlpatterns = [
    path('token/obtain/', ObtainTokenPairWithGuestStatusView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
]