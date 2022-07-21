const minusProduct = document.querySelectorAll('.item_minus')
const plusProduct = document.querySelectorAll('.item_plus')
const buttonProduct = document.querySelectorAll('.shop_body-item_tocart')

// const shopAddProccess = document.querySelector('.shop_push-proccess')

// setInterval(function(){
// shopAddProccess.style.width = '0%'
// setTimeout(function(){shopAddProccess.style.transition = 'none'; shopAddProccess.style.width = '100%'; shopAddProccess.style.transition = 'all 3s ease-in-out';}, 3000)
// }, 3500)

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    return null;
}

function checkCart(product_name) {
    let cartMobileChildred = document.querySelector('.nav_items').children;
    for (let cartMobileItem of cartMobileChildred) {
        if (cartMobileItem.innerHTML.indexOf(product_name) != -1) {
            return cartMobileItem;
        }
    }
    return false;
}

function addCart(name, amount, price) {
    amount = parseInt(amount)
    flag = checkCart(name)
    if (!flag) {
        let cartMobile = document.querySelector('.nav_items');
        let cartMobileItem = '<div class="nav_cart-inner_item"><div class="nav_cart-inner_name"><p>'+ name +'</p></div><div class="nav_cart-inner_amount">'+ amount +'</div><div class="nav_cart-inner_price">'+ price +'.00 ₽</div></div>'
        cartMobile.innerHTML += cartMobileItem
    } else {
        let amountDiv = flag.querySelector('.nav_cart-inner_amount');
        currentAmount = parseInt(amountDiv.innerHTML) + parseInt(amount)
        amountDiv.innerHTML = currentAmount
    }

    let navPrice = document.querySelector('.nav_price');
    navPrice.innerHTML = (parseInt(navPrice.innerHTML) + price * parseInt(amount)) + " ₽";
    let navItems = document.querySelectorAll('.nav_items_cart');
    currentAmountTotal = parseInt(navItems[0].innerHTML) + parseInt(amount)
    for (let i = 0; i<navItems.length; i++) {
        // alert(items.innerHTML)
        if (currentAmountTotal < 100) {
            navItems[i].innerHTML = currentAmountTotal
        } else {
            navItems[i].innerHTML = 99
        }
    }

} 

async function setRequest(method, url, csrftoken, params = null){
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
            if (getCookie('cart_info') == 'default') {   
                location.reload();
            }
            setCookie('cart_info', data['my_data']['cart_info'], 7);
            addCart(data['my_data']['name'], data['my_data']['amount'], data['my_data']['price'])
        })
    }
}

for (let i = 0; i < minusProduct.length; i++) {    
    minusProduct[i].addEventListener('click', function(){
        let kek = document.getElementById('shop_item-count' + minusProduct[i].getAttribute('id').replace('shop_item-minus', ''))
        if (kek.innerHTML > 0) {
            kek.innerHTML -= 1
        } 
    })
    plusProduct[i].addEventListener('click', function(){
        let kek2 = document.getElementById('shop_item-count' + plusProduct[i].getAttribute('id').replace('shop_item-plus', ''))
        if (kek2.innerHTML < 99) {
            kek2.innerHTML = parseInt(kek2.innerHTML) + 1
        } 
    })
    buttonProduct[i].addEventListener('click', function(){
        let kek3 = document.getElementById('shop_item-count' + buttonProduct[i].getAttribute('id').replace('shop_item-btn', ''))
        product_id = buttonProduct[i].getAttribute('data-product')
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        let link = '/shop/add/'
        response = setRequest('POST', link, csrftoken, {'product_id': product_id, 'amount': kek3.innerHTML})
    })
}


window.addEventListener('resize', function() {
    windowInnerWidth = window.innerWidth;
    windowInnerHeight = window.innerHeight;
    menuBar.style.display = 'none';
    menuBar.style.opacity = 0;
    menuBarWidth = windowInnerWidth * 0.9;
    newMenuBarWidth(menuBarContent, menuBarWidth);
}, false);
