
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render, get_list_or_404, get_object_or_404
import json
from django.http import JsonResponse
from random import randint

from .models import Products, ProductMenus, ProductTypes
from cart.models import Carts
from django.template import loader
from functions.load_cart_info import mobile_cart, generate_id, convert_price

# ФУНКЦИИ ДЛЯ МОБИЛЬНОЙ КОРЗИНЫ
def generate_id():
    letters = 'abcdefghijklmnopqrst1234567890'
    id = ''
    for _ in range(15):
        id += letters[randint(0, 29)]
    return id

def check_id(carts):
    id = generate_id()
    for cart in carts:
        if cart.user_id == id:
            id = False
    return id

def create_cart(Carts, carts):
    new_id = check_id(carts)
    while new_id == False:
        new_id = check_id(carts)
    new_cart = Carts(user_id = new_id)
    new_cart.save()
    return new_id

def get_menu(type, active):
    product =  get_object_or_404(ProductTypes, id=type)
    menu_items = get_list_or_404(ProductMenus, product_type = product)
    items = []
    for menu in menu_items:
        if str(menu.application) == active:
            items.append({'name': str(menu.application), 'link': menu.link, 'active': True})
        else:
            items.append({'name': str(menu.application), 'link': menu.link, 'active': False})
    return items

# ОБЩИЙ ВИД VIEW
def shop_view_product_type(request, type_id, application, product_type):
    template = loader.get_template('shop.html')
    context, cart_name = mobile_cart(request)
    
    kek = get_list_or_404(Products, product_type = type_id)
    if application:
        menu = get_menu(type_id, application)
    else: 
        menu = False
    context.update({'kek': kek, 'menu': menu, 'product_type': product_type})
    rendered_template =  HttpResponse(template.render(context, request))
    rendered_template.set_cookie('cart_info', cart_name)

    return rendered_template

def shop_view_application(request, type_id, application_id, application, product_type):
    template = loader.get_template('shop.html')
    context, cart_name = mobile_cart(request)
    
    kek = get_list_or_404(Products, application = application_id)
    menu = get_menu(type_id, application)
    context.update({'kek': kek, 'menu': menu, 'product_type': product_type})
    rendered_template =  HttpResponse(template.render(context, request))
    rendered_template.set_cookie('cart_info', cart_name)

    return rendered_template

# ПЕНОПОЛИСТЕРОЛ

def shop_penopolistirol_all(request):
    return shop_view_product_type(request, 1, 'Все марки', 'ПЕНОПОЛИСТИРОЛ')

def shop_penopolistirol_fundament(request):
    return shop_view_application(request, 1, 2, 'Фундамент и цоколь', 'ПЕНОПОЛИСТИРОЛ')

def shop_penopolistirol_fasad(request):
    return shop_view_application(request, 1, 3, 'Фасад', 'ПЕНОПОЛИСТИРОЛ')

def shop_penopolistirol_roof(request):
    return shop_view_application(request, 1, 5, 'Кровля и разуклонка', 'ПЕНОПОЛИСТИРОЛ')

def shop_penopolistirol_partition(request):
    return shop_view_application(request, 1, 7, 'Перегородки', 'ПЕНОПОЛИСТИРОЛ')

# ОПАЛУБКА
def shop_opalubka(request):
    return shop_view_product_type(request, 2, 'Все', 'НЕСЪЕМНАЯ ОПАЛУБКА')

def shop_opalubka_25(request):
    return shop_view_application(request, 2, 9, 'Серия 25', 'НЕСЪЕМНАЯ ОПАЛУБКА')

def shop_opalubka_30(request):
    return shop_view_application(request, 2, 10, 'Серия 30', 'НЕСЪЕМНАЯ ОПАЛУБКА')

def shop_opalubka_35(request):
    return shop_view_application(request, 2, 13, 'Серия 35', 'НЕСЪЕМНАЯ ОПАЛУБКА')

def shop_opalubka_50(request):
    return shop_view_application(request, 2, 14, 'Серия 50', 'НЕСЪЕМНАЯ ОПАЛУБКА')

# гранулы
def granula(request):
    return shop_view_product_type(request, 3, False, 'ГРАНУЛЫ ПЕНОПОЛИСТИРОЛА')

# политерм
def politerm(request):
    return shop_view_product_type(request, 4, False, 'ПОЛИТЕРМ')

# подложка для теплого пола
def floor_backing(request):
    return shop_view_product_type(request, 7, False, 'ПОДЛОЖКА ДЛЯ ПОЛА')

# сендвич-панели
def sandwitch_panels(request):
    # установка мини-корзины
    template = loader.get_template('sandwitch.html')
    context, cart_name = mobile_cart(request)
    colors = [{'name':'Signal White', 'color': '#FFFFFF'}, {'name':'Zinc Yellow', 'color': '#F6DB42'}, {'name':'Ruby Red', 'color': '#A03535'}, {'name':'Wine Red', 'color': '#6F3430'}, {'name':'Oxide Red', 'color': '#864034'}, {'name':'Brown Red', 'color': '#933931'}, {'name':'Chocolate Brown', 'color': '#584235'}, {'name':'Leaf Green', 'color': '#446838'}, {'name':'Moss Green', 'color': '#344D3A'}, {'name':'Pastell Blue', 'color': '#6F8EA3'}, {'name':'Ultramarine Blue', 'color': '#4C3D7E'}, {'name':'Signal Blue', 'color': '#3C578C'}, {'name':'Grey White', 'color': '#ECE7D9'}, {'name':'White Aluminum', 'color': '#BEB5AE'}, {'name':'Signal Grey', 'color': '#B7AEA9'}, {'name':'Ivory', 'color': '#ECD6A4'}, {'name':'Light Ivory', 'color': '#F4E5C4'}]
    context.update({'palets': colors})
    rendered_template =  HttpResponse(template.render(context, request))
    rendered_template.set_cookie('cart_info', cart_name)

    return rendered_template


# фасад
def fasad_cornice(request):
    return shop_view_application(request, 6, 15, 'Карнизы', 'ФАСАДНЫЙ ДЕКОР')

def fasad_platbands(request):
    return shop_view_application(request, 6, 16, 'Наличники', 'ФАСАДНЫЙ ДЕКОР')

def fasad_stones(request):
    return shop_view_application(request, 6, 17, 'Камень замковый', 'ФАСАДНЫЙ ДЕКОР')

def fasad_slope(request):
    return shop_view_application(request, 6, 18, 'Откосы', 'ФАСАДНЫЙ ДЕКОР')


def fasad_corner(request):
    return shop_view_application(request, 6, 19, 'Русты', 'ФАСАДНЫЙ ДЕКОР')

def fasad_cap(request):
    return shop_view_application(request, 6, 20, 'Крышки', 'ФАСАДНЫЙ ДЕКОР')

def fasad_pommel(request):
    return shop_view_application(request, 6, 21, 'Навершие', 'ФАСАДНЫЙ ДЕКОР')

def fasad_tympanums(request):
    return shop_view_application(request, 6, 22, 'Тимпаны', 'ФАСАДНЫЙ ДЕКОР')

def fasad_column(request):
    return shop_view_application(request, 6, 23, 'Колонны', 'ФАСАДНЫЙ ДЕКОР')

def fasad_pilasters(request):
    return shop_view_application(request, 6, 24, 'Пилястры', 'ФАСАДНЫЙ ДЕКОР')

def fasad(request):
    # установка мини-корзины
    template = loader.get_template('fasad.html')
    context, cart_name = mobile_cart(request)
    context.update({'decor': [
        {'name': 'Карнизы', 'image': 'images/shop/fasad/carnis.png', 'link': '/shop/decor/cornice'},
        {'name': 'Наличники', 'image': 'images/shop/fasad/nalichniki.png', 'link': '/shop/decor/platbands'},
        {'name': 'Камень замковый', 'image': 'images/shop/fasad/stone.png', 'link': '/shop/decor/stone'},
        {'name': 'Колонны', 'image': 'images/shop/fasad/colonna.png', 'link': '/shop/decor/column'},
        {'name': 'Крышка на столб', 'image': 'images/shop/fasad/roof.png', 'link': '/shop/decor/cap'},
        {'name': 'Навершие', 'image': 'images/shop/fasad/navershia.png', 'link': '/shop/decor/pommel'},
        {'name': 'Откосы', 'image': 'images/shop/fasad/otkosi.png', 'link': '/shop/decor/slope'},
        {'name': 'Пилястры', 'image': 'images/shop/fasad/pilastri.png', 'link': '/shop/decor/pilasters'},
        {'name': 'Русты', 'image': 'images/shop/fasad/rusti.png', 'link': '/shop/decor/corner'},
        {'name': 'Типманы', 'image': 'images/shop/fasad/timpani.png', 'link': '/shop/decor/tympanums'},
    ]})
    rendered_template =  HttpResponse(template.render(context, request))
    rendered_template.set_cookie('cart_info', cart_name)

    return rendered_template

# POST запрос на добавление в корзину
def shop_add(request):
    if request.method == 'POST':
        data_from_post = json.load(request)
        data = {
            'my_data':data_from_post,
        }
        user_cart_id = ''
        price = 0
        name = ''
        cart_info = request.COOKIES.get('cart_info')
        carts = get_list_or_404(Carts, user_id = cart_info)
        for cart in carts:
            # check_product = get_object_or_404(Products, id=data['my_data']['product_id'])
            if cart.cart_product.id == int(data['my_data']['product_id']):
                user_cart_id = cart_info
                cart_user = Carts.objects.filter(user_id = cart_info).filter(cart_product = int(data['my_data']['product_id']))
                cart_user.update(amount = cart_user[0].amount + int(data['my_data']['amount']))
                product = get_object_or_404(Products, id = int(data['my_data']['product_id']))
                price = product.price
                name = product.product_name
                break
        else:
            if cart_info == 'default': 
                user_cart_id = generate_id()
            else:
                user_cart_id = cart_info
            product = get_object_or_404(Products, id = int(data['my_data']['product_id']))
            price = product.price
            name = product.product_name
            new_cart = Carts(user_id = user_cart_id, cart_product = product, amount = int(data['my_data']['amount']))
            new_cart.save()

        price_str = convert_price(price*int(data['my_data']['amount']))
        
        data['my_data']['name'] = name
        data['my_data']['price'] = int(price)
        data['my_data']['str_price'] = price_str
        data['my_data']['cart_info'] = user_cart_id
        return JsonResponse(data)


def getProductInfo(request, product_name):
    if request.method == 'GET':
        product = get_object_or_404(Products, product_name = product_name)
        if ('-' in product.character1):
            character1 = product.character1.split('-')
        else:
            character1 = [False, False]
        if ('-' in product.character2):
            character2 = product.character2.split('-')
        else:
            character2 = [False, False]
        if ('-' in product.character3):
            character3 = product.character3.split('-')
        else:
            character3 = [False, False]
        if ('-' in product.character4):
            character4 = product.character4.split('-')
        else:
            character4 = [False, False]

        result = {
            'name': product.product_name,
            'unit': product.unit,
            'price': product.price,
            'image': '/static/images/'+product.image.split('/')[-1],
            'character1': [character1[0], character1[1]],
            'character2': [character2[0], character2[1]],
            'character3': [character3[0], character3[1]],
        }
        print(result['image'])
        return JsonResponse(result)