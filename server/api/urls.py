from django.urls import path
from .views import *

urlpatterns = [
    path("user/register/", CreateUserAPIView.as_view(), name="user_create"),
    path("auth/user/", UserProfileAPIView.as_view(), name="user_detail"),
    path("google/validate_token/", validate_google_token, name="validate_token"),
    path("logout_user/", LogoutUserView.as_view(), name="logout"),
    path("category/add/", CreateServiceCategoryAPIView.as_view(), name="add_category"),
    path("service/add/", CreateServiceAPIView.as_view(), name="add_service"),
    path("worker/add/", CreateWorkerAPIView.as_view(), name="add_worker"),
]
