from django.contrib import admin

# # Register your models here.
from .models import FormText

class FormAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')

admin.site.register(FormText, FormAdmin)