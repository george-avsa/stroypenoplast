from django.template import loader
from django.shortcuts import get_list_or_404
from django.http import HttpResponse
from cart.models import Carts
from random import randint

def mobile_cart(request):
    cart_info = request.COOKIES.get('cart_info', 'default')
    carts = get_list_or_404(Carts)
    cart_empty = True
    items = []
    total_price = 0
    total_amount = 0
    for cart in carts:
        # if cart.user_id == cart_info and cart_info != 'default':
        if cart.user_id == cart_info and cart_info != 'default':
            total_price += int(cart.cart_product.price) * int(cart.amount)
            total_amount += int(cart.amount)
            cart_empty = False
            items.append({
                'product_name': cart.cart_product.product_name, 
                'image': cart.cart_product.image, 
                'price' : cart.cart_product.price,    
                'amount': cart.amount,
                'id': cart.cart_product.id
            })

    if cart_empty:
        context = {
            'cart_empty': True,
            'amount': 0,
            'price': 0
        }
        return (context, 'default')
    else:
        context = {
            'cart_empty': False,
            'cart_items': items,
            'total_price': total_price,
            'total_amount': total_amount,
        }
        return (context, request.COOKIES.get('cart_info'))

    
def generate_id():
    letters = 'abcdefghijklmnopqrst1234567890'
    id = ''
    for _ in range(15):
        id += letters[randint(0, 29)]
    return id

# def create_cart(request):
#     cart_info = request.COOKIES.get('cart_info')
#     if cart_info == 'default':
#         test_response.set_cookie('cart_info', generate_id())
#         return HttpResponse()

def convert_price(price):
    integ_str = str(price)
    total_str = ''

    count = 0
    for i in integ_str[::-1]:
        if count == 3:
            total_str += '.'
            count = 0
        total_str += i
        count += 1
    return total_str[::-1]