from django.urls import path

from . import views

urlpatterns = [
    # path('', views.shop, name='shop'),
    path('penopolistirol', views.shop_penopolistirol_all, name='shop'),
    path('penopolistirol/fundament', views.shop_penopolistirol_fundament, name='shop'),
    path('penopolistirol/fasad', views.shop_penopolistirol_fasad, name='shop'),
    path('penopolistirol/roof', views.shop_penopolistirol_roof, name='shop'),
    path('penopolistirol/partition', views.shop_penopolistirol_partition, name='shop'),

    path('opalubka', views.shop_opalubka, name='shop'),
    path('opalubka/25', views.shop_opalubka_25, name='shop'),
    path('opalubka/30', views.shop_opalubka_30, name='shop'),
    path('opalubka/35', views.shop_opalubka_35, name='shop'),
    path('opalubka/50', views.shop_opalubka_50, name='shop'),

    path('granula', views.granula, name='shop'),

    path('politerm', views.politerm, name='shop'),

    path('floor_backing', views.floor_backing, name='shop'),
    
    path('sandwitch', views.sandwitch_panels, name='shop'),
    
    path('decor', views.fasad, name='shop'),
    
    path('add/', views.shop_add, name='add'),
]