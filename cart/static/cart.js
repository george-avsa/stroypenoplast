const cartItems = document.querySelectorAll(".cart-item");

let updateItems = []
function showEmptyCart() {
    let cartBlock = document.querySelector('.cart')
    cartBlock.remove();
    let cartEmpty = document.querySelector('.cart-empty')
    cartEmpty.style.display = 'block'
}

function checkItemsAmount() {
    let itemsCart = document.querySelectorAll('.cart-item')
    if (itemsCart.length == 0) {
        showEmptyCart();
    }
}

function changeTotal(where) {
    let productPrice = where.querySelector(".product_price")
    let itemAmount = where.querySelector(".item_amount")
    let totalProductPrice = where.querySelector(".total_product_price")
    totalProduct = parseInt(productPrice.innerHTML) * parseInt(itemAmount.innerHTML)
    totalProductPrice.innerHTML = totalProduct + '.00 ₽'
}

function minusValue(int) {
   if (int == 1) {
        return 1
    } else {
        return int-1
    }
}

function plusValue(int) {
    if (int == 99) {
        return 99
    } else {
        return int+1
    }
}

async function setRequestDelete(method, url, csrftoken, block, params = null){
    if (method == 'POST') {
        return fetch(url, {
            method: method,
            credentials: 'same-origin',
            body: JSON.stringify(params),
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin' 
        }).then(response => {
            return response.json()
        }).then(data => {
            block.remove()
            checkItemsAmount()
        })
    }
}
async function setRequestSend(method, url, csrftoken, params = null){
    if (method == 'POST') {
        return fetch(url, {
            method: method,
            credentials: 'same-origin',
            body: JSON.stringify(params),
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin' 
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data['kek'] == 'test3') {
                document.location.href="/cart/confirmation/self";
            } else {
                document.location.href="/cart/confirmation/delivery";
            }
        }).catch((e) => {
            alert('Внутреняя ошибка сервера :( Для заказа свяжитесь с нами по номеру или WhatsApp')
        })
    }
}

function setClick(where) {
    let itemMinus = where.querySelector('.item_minus');
    let itemPlus = where.querySelector('.item_plus');
    let itemAmount = where.querySelector('.item_amount')
    itemMinus.addEventListener('click', function(){
        itemAmount.innerHTML = minusValue(parseInt(itemAmount.innerHTML))
        changeTotal(where)
    })
    
    itemPlus.addEventListener('click', function(){
        itemAmount.innerHTML = plusValue(parseInt(itemAmount.innerHTML))
        changeTotal(where)
    })
}

function deleteItem(where) {
    let deleteBtn = where.querySelector('.cart-title_delete')

    deleteBtn.addEventListener('click', function(){
        product_id = this.getAttribute('id').replace('delete_item', '')
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        setRequestDelete('POST', '/cart/delete', csrftoken, where, params={'product_id':product_id}) 
    })
}

for (let kek of cartItems) {
    changeTotal(kek)
    setClick(kek)
    deleteItem(kek)
}


let totalAll = document.querySelector('.cart_total');
let totals = document.querySelectorAll('.total_for_one_product');
let count = 0
for (let total of totals) {
    count += parseInt(total.innerHTML)
}
totalAll.innerHTML = count + '.00 ₽'

let countBlocks = document.querySelectorAll('.shop_body-item_amount')

for (let countBlock of countBlocks) {
    countBlock.addEventListener('click', function(){
        count = 0
        for (let total of totals) {
            count += parseInt(total.innerHTML)
        }
        totalAll.innerHTML = count + '.00 ₽'
    })
}


const sendButton = document.querySelector('.cart-delivery_btn')
sendButton.addEventListener('click', function(){
    let radioBtns = document.getElementsByName('radio-group')
    let count = 0
    let radioValue = ''
    for (let radio of radioBtns) {
        if (radio.checked) {
            count++
            if (count != 0) {
                radioValue = radio.getAttribute('id')
            }
        }
    }
    if (count) {
        let itemsCart = []
        const cartItems = document.querySelectorAll('.cart-item')
        for (let item of cartItems) {
            item_props = {
                'id': item.querySelector('.total_for_one_product').getAttribute('id').replace('cart_product_total', ''),
                'amount': item.querySelector('.item_amount').innerHTML
            }
            itemsCart.push(item_props)
        }
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        setRequestSend('POST', '/cart/update', csrftoken, params = {'items': JSON.stringify(itemsCart), 'del_type': radioValue})
    } else {
        const errorField = document.querySelector('.cart_error')
        const labelsRadio = document.querySelectorAll('label')
        errorField.innerHTML = 'Выберете способ доставки'
        for (let label of labelsRadio) {
            label.style.borderBottom = '2px solid #CC0033'
        }
    }
})