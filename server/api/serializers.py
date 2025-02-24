from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email",
            "is_superuser",
            "first_name",
            "last_name",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "is_superuser": {"read_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LogoutUserSerializer(serializers.ModelSerializer):
    refresh_token = serializers.CharField()

    default_error_messages = {"bad_token": ("Token is Invalid")}

    def validate(self, attrs):
        self.token = attrs.get("refresh_token")
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()

        except TokenError:
            return self.fail("bad_token")


class CategoryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryImage
        fields = ("id", "category", "image")


class ServiceCategorySerializer(serializers.ModelSerializer):
    images = CategoryImageSerializer(many=True, read_only=True)
    # uploaded_images = serializers.ImageField(
    #     max_length=1000000, allow_empty_file=False, use_url=False, write_only=True
    # )
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(
            max_length=1000000, allow_empty_file=False, use_url=False
        ),
        write_only=True,
    )

    class Meta:
        model = ServiceCategory
        fields = "__all__"
        # fields = ("id", "name", "description", "images", "uploaded_images", "created_at")

    def create(self, validated_data):
        # when we can to edit inserting we use this function instead of default
        # we want to remove the uploaded_images file to separate 2 models category and image
        # add them separately.
        uploaded_images = validated_data.pop("uploaded_images")
        category = ServiceCategory.objects.create(**validated_data)
        # handle image model insert on itself, category will use the default insert
        for image in uploaded_images:
            newcategory_image = CategoryImage.objects.create(
                category=category, image=image
            )
        return category


class WorkerSerializer(serializers.ModelSerializer):
    service = Service
    service_name = serializers.ReadOnlyField(source="service.name")

    class Meta:
        model = Worker
        fields = (
            "id",
            "name",
            "image",
            "service",
            "service_name",
            "phone",
            "email",
            "address",
            "price",
            "created_at",
        )
        extra_kwargs = {
            "service": {"write_only": True},
            "created_at": {"read_only": True},
        }


class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategory
    category_name = serializers.ReadOnlyField(source="category.name")
    workers = WorkerSerializer(read_only=True, many=True)

    class Meta:
        model = Service
        fields = (
            "id",
            "name",
            "image",
            "category",
            "category_name",
            "created_at",
            "workers",
        )
        extra_kwargs = {
            # "category": {"write_only": True},
            "created_at": {"read_only": True},
        }


class BookingSerializer(serializers.ModelSerializer):
    service = Service
    service_name = serializers.ReadOnlyField(source="service.name")
    worker = Worker
    worker_email = serializers.ReadOnlyField(source="worker.email")
    worker_name = serializers.ReadOnlyField(source="worker.name")
    worker_price = serializers.ReadOnlyField(source="worker.price")
    client = User
    client_email = serializers.ReadOnlyField(source="client.email")
    client_firstname = serializers.ReadOnlyField(source="client.first_name")
    client_lastname = serializers.ReadOnlyField(source="client.last_name")

    class Meta:
        model = Booking
        fields = (
            "id",
            "service",
            "worker",
            "client",
            "date",
            "time",
            "status",
            "created_at",
            "updated_at",
            "service_name",
            "worker_name",
            "worker_email",
            "worker_price",
            "client_email",
            "client_firstname",
            "client_lastname",
        )
        extra_kwargs = {
            "created_at": {"read_only": True},
        }
