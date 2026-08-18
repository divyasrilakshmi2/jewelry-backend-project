from django.core.management.base import BaseCommand
from products.models import Category, Product


class Command(BaseCommand):
    help = "Create sample jewelry categories and products"

    def handle(self, *args, **options):
        data = {
            "Rings": [
                ("Classic Gold Ring", "Elegant everyday gold ring.", 5500, 10, "Gold", "Glossy", 4.6),
                ("Silver Stone Ring", "Silver ring with a decorative stone.", 2200, 5, "Silver", "Matte", 4.2),
            ],
            "Necklaces": [
                ("Gold Chain Necklace", "Traditional lightweight gold chain.", 18000, 8, "Gold", "Glossy", 4.8),
                ("Pearl Necklace", "Elegant pearl necklace for occasions.", 7500, 12, "Silver", "Polished", 4.5),
            ],
            "Bracelets": [
                ("Gold Bracelet", "Simple modern gold bracelet.", 12000, 7, "Gold", "Glossy", 4.7),
                ("Silver Charm Bracelet", "Silver bracelet with charm details.", 3200, 5, "Silver", "Matte", 4.1),
            ],
            "Earrings": [
                ("Gold Stud Earrings", "Minimal gold stud earrings.", 4500, 10, "Gold", "Glossy", 4.4),
                ("Diamond Look Earrings", "Elegant party-wear earrings.", 6800, 15, "Silver", "Polished", 4.3),
            ],
        }

        for category_name, products in data.items():
            category, _ = Category.objects.get_or_create(name=category_name)

            for name, description, price, discount, metal, polish, rating in products:
                Product.objects.get_or_create(
                    name=name,
                    defaults={
                        "description": description,
                        "category": category,
                        "price": price,
                        "discount": discount,
                        "base_metal": metal,
                        "polish": polish,
                        "rating": rating,
                        "image_url": "",
                    },
                )

        self.stdout.write(self.style.SUCCESS("Sample jewelry data created successfully."))
