from django.urls import path

from . import views

urlpatterns = [
    path('', views.cart, name='main'),
    path('confirmation/<str:del_type>', views.confirmation, name='main'),
    path('delete', views.delete_cart_item, name='main'),
    path('update', views.update_carts, name='main'),
    path('application', views.create_application, name='main'),
    path('ready', views.ready, name='main'),
]