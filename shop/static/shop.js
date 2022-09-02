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

async function setRequest(method, url, csrftoken='', params = null){
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
    } else {
        return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // alert(data.character3[1])
            // alert(data.name);
            const modalName = document.getElementById('modal_name')
            modalName.innerHTML = data.name
            const modalImage = document.getElementById('modal_image')
            modalImage.setAttribute('src', data.image)
            const modalUnit = document.getElementById('modal_unit')
            modalUnit.innerHTML = 'Цена за ' + data.unit
            const modalPrice = document.getElementById('modal_price')
            modalPrice.innerHTML = data.price + ' руб.'
            const character1 = document.getElementById('character1')
            const character1Value = document.getElementById('character1Value')
            const character1Block = document.getElementById('character1Block')
            if (data.character1[0]) {
                character1Block.style.display = 'flex'
                character1.innerHTML = data.character1[0]
                character1Value.innerHTML = data.character1[1]
            } else {
                character1Block.style.display = 'none'
            }
            const character2 = document.getElementById('character2')
            const character2Value = document.getElementById('character2Value')
            const character2Block = document.getElementById('character2Block')
            let decor = false
            if (data.character2[0]) {
                if (data.character2[0].includes('Тип')) {
                    decor = true
                } 

                character2Block.style.display = 'flex'
                character2.innerHTML = data.character2[0]
                character2Value.innerHTML = data.character2[1]

            } else {
                character2Block.style.display = 'none'
            }
            const character3 = document.getElementById('character3')
            const character3Value = document.getElementById('character3Value')
            const character3Block = document.getElementById('character3Block')
            if (data.character3[0]) {
                if (decor) {
                    modalImage.setAttribute('src', data.character3[1])
                    // modalImage.setAttribute('src', '/static/images/psb-s.png')
                } else {
                    character3Block.style.display = 'flex'
                    character3.innerHTML = data.character3[0]
                    character3Value.innerHTML = data.character3[1]
                }
            } else {
                character3Block.style.display = 'none'
            }
            const preloader = document.querySelector('.modal_preloader')
            preloader.style.display = 'none'
            const modalBody = document.querySelector('.shop_modal')
            modalBody.style.display = 'block'
        });
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

const shopItems = document.querySelectorAll('.shop_body-item')

const modalShop = document.querySelector('.shop_modal-wrapper')
if (shopItems.length != 0) {
    for (let shopItem of shopItems) {
        shopItem.addEventListener('click', (e) => {
            if (e.target.getAttribute('class') != 'shop_body-item_tocart') {
                modalShop.style.display = 'flex'
                modalShop.classList.add('entering')
                setTimeout(() => {
                    modalShop.style.opacity = '1'
                }, 200)
            }
            setRequest('GET', '/shop/getextra/' + shopItem.getAttribute('data-name'))
            // alert(shopItem.getAttribute('data-name'))
        })
    }
}

modalShop.addEventListener('click', (e) =>  {
    let eventClass = e.target.getAttribute('class')
    if (eventClass.includes('shop_modal-wrapper') || eventClass == 'shop_modal-close') {
        modalShop.classList.remove('entering')
        modalShop.classList.add('exiting')
        setTimeout(() => {
            modalShop.classList.remove('exiting')
            modalShop.style.display = 'none'
            modalShop.style.opacity = '0'
        }, 200)
    }
})