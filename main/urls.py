from django.urls import path

from . import views

urlpatterns = [
    path('', views.main_page, name='main'),
    path('send_form', views.send_form, name='main'),
]