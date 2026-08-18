from django.urls import reverse
from rest_framework.test import APITestCase
from .models import Category, Product


class ProductAPITest(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Rings")
        Product.objects.create(
            name="Gold Ring",
            description="Classic gold ring",
            category=self.category,
            price=5000,
            discount=10,
            base_metal="Gold",
            polish="Glossy",
            rating=4.5,
        )

    def test_product_list(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_price_filter(self):
        response = self.client.get("/api/products/?min_price=1000&max_price=6000")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_category_products(self):
        response = self.client.get(f"/api/categories/{self.category.id}/products/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
