from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


# =================== token ===================
class ObtainTokenPairWithUserInfoView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh_token"])
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# =================== user ===================
class CreateUserView(APIView):
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    def put(self, request, format='json'):
        try:
            user = request.user
            if user.check_password(request.data['currentPassword']):
                user.set_password(request.data['newPassword'])
                user.save()
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format='json'):
        user = request.user
        try:
            serializer = CustomUserSerializer(user)
            data = serializer.data
            data['id'] = user.id
            data['is_adult'] = user.is_adult
            return Response(data, status=status.HTTP_202_ACCEPTED)
        except:
            None
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format='json'):
        try:
            user = request.user
            user.username = request.data['username']
            user.email = request.data['email']
            user.is_adult = request.data['is_adult']
            user.save()
            serializer = CustomUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            None
        return Response(status=status.HTTP_400_BAD_REQUEST)


