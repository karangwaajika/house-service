from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        extra_kwargs = {
            "password": {"write_only": True},
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
    uploaded_images = serializers.ImageField(
        max_length=1000000, allow_empty_file=False, use_url=False, write_only=True
    )

    class Meta:
        model = ServiceCategory
        fields = ("id", "name", "description", "images", "uploaded_images")

    def create(self, validated_data):
        # when we can to edit inserting we use this function instead of default
        # we want to remove the uploaded_images file to separate 2 models category and image
        # add them separately.
        uploaded_images = validated_data.pop("uploaded_images")
        category = ServiceCategory.objects.create(**validated_data)
        # handle image model insert on itself, category will use the default insert

        newcategory_image = CategoryImage.objects.create(
            category=category, image=uploaded_images
        )
        return category


class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategory
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = Service
        fields = ("id", "name", "image", "category", "category_name")
        extra_kwargs = {
            "category": {"write_only": True},
        }
