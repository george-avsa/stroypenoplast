from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from random import randint

from django.template import loader
from cart.models import Carts
from django.shortcuts import get_list_or_404, get_object_or_404

from functions.load_cart_info import mobile_cart
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



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
        message = 'Имя: ' + data['my_data']['name'] + '; Телефон: ' + data['my_data']['phone']  + '; Почта: ' + '; Связаться: ' + data['my_data']['connectType']
        print(message)
        
        to_email = 'goga-tilda@yandex.ru'
        from_email = 'george.avsa@yandex.ru'

        msg = MIMEMultipart()
        msg.attach(MIMEText(message, 'plain'))        

        server = smtplib.SMTP('smtp.yandex.ru:465')
        server.starttls()
        server.login(from_email, 'Alp222ot12yandex')
        server.sendmail(from_email, to_email, msg)
        server.quit()
        return JsonResponse(data['my_data'])