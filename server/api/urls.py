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
    path("category/image/update/<int:image_id>", CategoryImageUpdate.as_view(), name="update_category_image"),
    path("category/image/add/", CategoryImageAdd.as_view(), name="add_category_image"),
    path("services/", ServiceList.as_view(), name="view_services"),
    path("services/create/", CreateServiceAPIView.as_view(), name="add_service"),
    path("services/<int:service_id>", ServiceDetails.as_view(), name="view_service"),
    path("services/delete/<int:service_id>", ServiceDelete.as_view(), name="delete_service"),
    path("services/update/<int:service_id>", ServiceUpdate.as_view(), name="update_service"),
    path("workers/", WorkerList.as_view(), name="view_workers"),
    path("workers/create/", CreateWorkerAPIView.as_view(), name="add_worker"),
    path("workers/<int:worker_id>", WorkerDetails.as_view(), name="view_worker"),
    path("workers/delete/<int:worker_id>", WorkerDelete.as_view(), name="delete_worker"),
    path("workers/update/<int:worker_id>", WorkerUpdate.as_view(), name="update_worker"),
]
