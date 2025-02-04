from django.urls import path
from .views import *

urlpatterns = [
    path("user/register/", CreateUserAPIView.as_view(), name="user_create"),
    path("auth/user/", UserProfileAPIView.as_view(), name="user_detail"),
    path("google/validate_token/", validate_google_token, name="validate_token"),
]
