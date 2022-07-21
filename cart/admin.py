from django.contrib import admin

from shop.models import Products 

from .models import Carts, Applications, ApplicationItems

class CartsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id')

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'email', 'adress', 'date', 'payment_method')

class ApplicationItesmAdmin(admin.ModelAdmin):
    list_display = ('application', 'cart_product', 'amount')

admin.site.register(Carts, CartsAdmin)
admin.site.register(Applications, ApplicationAdmin)
admin.site.register(ApplicationItems, ApplicationItesmAdmin)
# Register your models here.
