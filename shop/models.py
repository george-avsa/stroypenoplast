from pyexpat import model
from django.db import models

class ApplicationName(models.Model):
    application_name = models.CharField(max_length=200)
    def __str__(self) -> str:
        return f"{self.application_name}"

class ProductTypes(models.Model):
    product_type_name = models.CharField(max_length=200)
    def __str__(self) -> str:
        return f"{self.product_type_name}"

class Products(models.Model):
    product_type = models.ForeignKey(ProductTypes, on_delete=models.PROTECT)
    application = models.ForeignKey(ApplicationName, on_delete=models.PROTECT)
    product_name = models.CharField(max_length=200)
    image = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=200, blank=True)
    character1 = models.CharField(max_length=200, blank=True)
    character2 = models.CharField(max_length=200, blank=True)
    character3 = models.CharField(max_length=200, blank=True)
    character4 = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    def __str__(self) -> str:
        return f"{self.product_name}, {self.product_type}, {self.application}"

class ProductMenus(models.Model):
    product_type = models.ForeignKey(ProductTypes, on_delete=models.PROTECT)
    application = models.ForeignKey(ApplicationName, on_delete=models.PROTECT, default='')
    link = models.CharField(max_length=200)
