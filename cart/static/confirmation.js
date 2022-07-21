const fieldNames = ['name', 'phone', 'email']

const selfDelivery = document.querySelector('#self-delivery')
if (selfDelivery == null) {
    fieldNames.push('delivery')
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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
            setCookie('cart_info', 'default', 7)
            document.location = "/cart/ready";
        }).catch((e) => {
            alert('Внутреняя ошибка сервера :( Для заказа свяжитесь с нами по номеру или WhatsApp')
        })
    }
}



function getFieldInfo(field) {
    if (!field.value) {
        return false
    } else {
        return field.value
    }
}

function showError(field) {
    field.style.border = '2px solid #CC0033'
    field.style.color = '#CC0033'
}

function checkFields() {
    flag = true
    values = {}
    for (let name of fieldNames) {
        let field = document.getElementsByName(name)
        fieldValue = getFieldInfo(field[0])
        if (!fieldValue) {
            showError(field[0])
            flag = false
        } else {
            // values.push({name: fieldValue})
            values[name] = fieldValue
        }
    }
    if (flag) {
        return values
    } else {
        return flag
    }
}

function checkRadio(){
    const radios = document.querySelectorAll('input[type=radio]')
    let count = 0
    radioValue = ''
    for (let radio of radios) {
        if (radio.checked) {
            count++
            if (count == 1) {
                return radio
            }
        }
    }
    const radioBlocks = document.querySelectorAll('.cart-item_radio')
    for (let radio of radioBlocks) {
        showError(radio)
    }
    return false
}

const confirmBtn = document.querySelector('.confiramtion-btn')
confirmBtn.addEventListener('click', function(){
    radioValue = checkRadio()
    feildsValues = checkFields()
    if (feildsValues && radioValue) {
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        setRequestSend('POST', '/cart/application', csrftoken, params = {'radioValue': radioValue.getAttribute('id'), 'feildsValues': feildsValues})
    }
})