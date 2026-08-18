from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import (
    CategoryListView,
    CategoryProductsView,
    ProductDetailView,
    ProductListCreateView,
    RegisterView,
)

urlpatterns = [
    path("products/", ProductListCreateView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("categories/<int:pk>/products/", CategoryProductsView.as_view(), name="category-products"),
    path("users/register/", RegisterView.as_view(), name="register"),
    path("users/login/", TokenObtainPairView.as_view(), name="login"),
]
