from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from random import randint

from django.template import loader
from cart.models import Carts
from django.shortcuts import get_list_or_404, get_object_or_404

from functions.load_cart_info import mobile_cart
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from .models import FormText


# def generate_id():
#     letters = 'abcdefghijklmnopqrst1234567890'
#     id = ''
#     for _ in range(15):
#         id += letters[randint(0, 29)]
#     return id

# def check_id(carts):
#     id = generate_id()
#     for cart in carts:
#         if cart.user_id == id:
#             id = False
#     return id

# def create_cart(Carts, carts):
#     new_id = check_id(carts)
#     while new_id == False:
#         new_id = check_id(carts)
#     new_cart = Carts(user_id = new_id)
#     new_cart.save()
#     return new_id


def main_page(request):
    # установка мини-корзины
    template = loader.get_template('main.html')
    context, cart_name = mobile_cart(request)
    rendered_template =  HttpResponse(template.render(context, request))
    rendered_template.set_cookie('cart_info', cart_name)

    return rendered_template

def send_form(request):
    if request.method == 'POST':
        data_from_post = json.load(request)
        data = {
            'my_data': json.loads(data_from_post)
        }
        text = data['my_data']['name'] + '; ' + data['my_data']['phone'] + '; ' + data['my_data']['connectType']
        message = FormText(text = text)
        message.save()
        return JsonResponse(data)