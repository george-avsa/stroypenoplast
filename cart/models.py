from email.mime import application
from django.db import models
from shop.models import Products

class Carts(models.Model):
    user_id = models.CharField(max_length=200)
    cart_product = models.ForeignKey(Products, on_delete=models.PROTECT, blank=True)
    amount = models.IntegerField(default=1)

class Applications(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    adress = models.CharField(max_length=200, blank=True, null=True)
    date = models.CharField(max_length=200, blank=True, null=True)
    payment_method = models.CharField(max_length=200)

class ApplicationItems(models.Model):
    application = models.ForeignKey(Applications, on_delete=models.PROTECT)
    cart_product = models.ForeignKey(Products, on_delete=models.PROTECT, blank=True)
    amount = models.IntegerField(default=1)