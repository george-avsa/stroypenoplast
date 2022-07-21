from email.mime import application
from black import mypyc_attr
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.template import loader
from functions.load_cart_info import mobile_cart
from django.shortcuts import get_list_or_404
from .models import Carts, Applications, ApplicationItems
import datetime

def cart(request):
    template = loader.get_template('cart.html')
    context, cart_name = mobile_cart(request)
    context.update({'page': 'cart', 'kek': [1, 1, 1, 1], 'page_name': 'Корзина'})
    rendered_template =  HttpResponse(template.render(context, request))
    rendered_template.set_cookie('cart_info', cart_name)
    return rendered_template

def confirmation(request, del_type):
    if del_type == 'delivery' or del_type == 'self':
        template = loader.get_template('confirmation.html')
        context, cart_name = mobile_cart(request)
        total = 0
        for cart_item in context['cart_items']:
            total += int(cart_item['amount']) * int(cart_item['price'])
        context.update({'page': 'cart', 'kek': total, 'del_type': del_type, 'page_name': 'Подтверждение'})
        rendered_template =  HttpResponse(template.render(context, request))
        rendered_template.set_cookie('cart_info', cart_name)
        return rendered_template
    else:
        return HttpResponseRedirect('/cart')

def delete_cart_item(request):
    if request.method == 'POST':
        data_from_post = json.load(request)
        data = {
            'my_data':data_from_post,
        }
        cart_info = request.COOKIES.get('cart_info')
        cartItem = Carts.objects.all().filter(user_id = cart_info).filter(cart_product = int(data['my_data']['product_id']))
        cartItem.delete()
        return JsonResponse(data)

def update_carts(request):
    if request.method == 'POST':
        data_from_post = json.load(request)
        data = {
            'items':json.loads(data_from_post['items']),
            'kek': data_from_post['del_type']
        }
        cart_info = request.COOKIES.get('cart_info')
        for i in data['items']:
            cart = Carts.objects.all().filter(user_id = cart_info).filter(cart_product = int(i['id']))
            cart.update(amount = int(i['amount']))
        return JsonResponse(data)

def create_application(request):
    if request.method == 'POST':
        data_from_post = json.load(request)
        payment_method = ''
        if data_from_post['radioValue'] == 'test2':
            payment_method = 'cash'
        else:
            payment_method = 'card'
        data = {
            'fields': data_from_post['feildsValues'],
        }
        application = Applications(name = data['fields']['name'], phone = data['fields']['phone'], email = data['fields']['email'], adress = data['fields']['delivery'], date = str(datetime.datetime.today())[:10], payment_method = payment_method)
        application.save()
        cart_info = request.COOKIES.get('cart_info')
        user_carts = get_list_or_404(Carts, user_id = cart_info)
        for cart in user_carts:
            application_items = ApplicationItems(application=application, cart_product=cart.cart_product, amount=cart.amount)
            application_items.save()    
            cart.delete()         
        return JsonResponse(data)

def ready(request):
    template = loader.get_template('ready.html')
    rendered_template =  HttpResponse(template.render({'page': 'cart', 'page_name': 'Завершение'}, request))
    return rendered_template