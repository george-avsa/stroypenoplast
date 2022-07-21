from django.contrib import admin

from .models import Products, ProductTypes, ApplicationName, ProductMenus

class ProductsAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'product_type', 'application', 'image')

class ProductTypesAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_type_name')

class ApplicationNameAdmin(admin.ModelAdmin):
    list_display = ('id', 'application_name')

class ProductMenusAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_type',  'application', 'link')

admin.site.register(Products, ProductsAdmin)
admin.site.register(ProductTypes, ProductTypesAdmin)
admin.site.register(ApplicationName, ApplicationNameAdmin)
admin.site.register(ProductMenus, ProductMenusAdmin)
