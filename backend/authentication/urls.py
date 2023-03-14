from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *

urlpatterns = [
    path('token/obtain/', ObtainTokenPairWithUserInfoView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create', CreateUserView.as_view(), name="create_user"),
    path('user', CustomUserView.as_view(), name="rud_user"),
    path('user/update-password', ChangePasswordView.as_view(), name="update_password"),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist')
]