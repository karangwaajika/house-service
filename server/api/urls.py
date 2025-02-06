from django.urls import path
from .views import *

urlpatterns = [
    path("user/register/", CreateUserAPIView.as_view(), name="user_create"),
    path("auth/user/", UserProfileAPIView.as_view(), name="user_detail"),
    path("google/validate_token/", validate_google_token, name="validate_token"),
    path("logout_user/", LogoutUserView.as_view(), name="logout"),
    path("categories/", ServiceCategoryList.as_view(), name="view_categories"),
    path("categories/create/", CreateServiceCategoryAPIView.as_view(), name="add_category"),
    path("categories/<int:category_id>", ServiceCategoryDetails.as_view(), name="view_category"),
    path("categories/delete/<int:category_id>", ServiceCategoryDelete.as_view(), name="delete_category"),
    path("categories/update/<int:category_id>", ServiceCategoryUpdate.as_view(), name="update_category"),
    path("service/create/", CreateServiceAPIView.as_view(), name="add_service"),
    path("worker/create/", CreateWorkerAPIView.as_view(), name="add_worker"),
]
