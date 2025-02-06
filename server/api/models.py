from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.


class ServiceCategory(models.Model):

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    slug = models.SlugField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CategoryImage(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="images", default="", null=True, blank=True)


class Service(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to="images", default="", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
