# django
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# json
import json

# rest_framework
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser


# socialaccount
from allauth.socialaccount.models import SocialToken, SocialAccount

# custom packages (models, serializers, etc..)
from .serializers import *
from .models import *


User = get_user_model()


def home(request):
    return JsonResponse(
        {"message": "Welcome to the house service backend"}, status=status.HTTP_200_OK
    )


class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        # return Response(self.request.user, status=status.HTTP_200_OK)
        return self.request.user


@login_required
def google_login_callback(request):
    user = request.user
    social_accounts = SocialAccount.objects.filter(user=user)
    print("social acc", social_accounts)
    social_account = social_accounts.first()

    if not social_account:
        print("No social acc for user", user)
        return redirect("http://localhost:5173/login/callback/?error=NoSocialAccount")

    token = SocialToken.objects.filter(
        account=social_account, account__provider="google"
    ).first()

    if token:
        print("google token found", token.token)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return redirect(
            f"http://localhost:5173/login/callback/?access_token={access_token}"
        )
    else:
        print("No Token found for user", user)
        return redirect("http://localhost:5173/login/callback/?error=NoGoogleToken")


@csrf_exempt
def validate_google_token(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            google_access_token = data.get("access_token")
            print("google token", google_access_token)

            if not google_access_token:
                return JsonResponse(
                    {"detail": "Access token is missing"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return JsonResponse({"valid": True}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid json"}, status=status.HTTP_400_BAD_REQUEST
            )

    return JsonResponse(
        {"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


class LogoutUserView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("hello")
        refresh_token = json.loads(request.body)
        token = RefreshToken(refresh_token.get("refresh_token"))
        token.blacklist()
        return JsonResponse({"token": "refresh_token"}, status=status.HTTP_200_OK)


class CreateServiceCategoryAPIView(generics.CreateAPIView):
    model = ServiceCategory
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)


class CreateServiceAPIView(generics.CreateAPIView):
    model = Service
    serializer_class = ServiceSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    # for frontend
    # def create(self, request):
    #     name = request.data["name"]
    #     image = request.data["image"]
    #     category_id = request.data["category"]
    #     category = ServiceCategory.objects.get(pk=category_id)

    #     Service.objects.create(category=category, name=name, image=image)

    #     return JsonResponse(
    #         {"message": "added successfuly"}, status=status.HTTP_201_CREATED
    #     )


class CreateWorkerAPIView(generics.CreateAPIView):
    model = Workers
    permission_classes = [AllowAny]
    serializer_class = WorkerSerializer
    parser_classes = (MultiPartParser, FormParser)
