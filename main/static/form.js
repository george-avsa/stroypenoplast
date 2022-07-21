const formButton = document.querySelector('.form_button');

function collectInfo() {
    const name = document.querySelector('#form_name')
    const phone = document.querySelector('#form_phone')
    const email = document.querySelector('#form_email')
    const connectType = document.querySelector('#select_placeholder')
    return {
        'name': name.value,
        'phone': phone.value,
        'email': email.value,
        'connectType': connectType.innerHTML
    }
}

function raiseError(id) {
    let field = document.querySelector(id)
    field.style.border = '2px solid #CC0033'
    field.style.color = '#CC0033'
}

function checkFields(){
    errors = [];
    let inputFields = document.querySelectorAll('.input_required')
    for (let inputField of inputFields) {
        if (inputField.value == '') {
            errors.push("#" + inputField.getAttribute('id'))
        }
    }
    let selectType = document.querySelector('#select_placeholder')
    if (selectType.innerHTML == 'Выберите способ связи') {
        errors.push('#select_div')
    }
    let policyCheckbox = document.querySelector('#happy')
    if (!policyCheckbox.checked) {
        errors.push('label')
    }
    return errors
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
            location.href = '/'
        })
    }
}

formButton.addEventListener('click', function(){
    errors = checkFields()
    if (errors.length != 0) {
        for (let error of errors) {
            raiseError(error)
        }
    } else {
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        setRequest('POST', '/send_form', csrftoken, params=JSON.stringify(collectInfo()))
    }
})



const hint = document.querySelector('.content_contacts-background_close')
const backgroundBlock = document.querySelector('.content_contacts-background')

hint.addEventListener('click', function(){
    backgroundBlock.style.opacity = 0
    hint.style.opacity = 0
    setTimeout(function(){
        hint.style.display = 'none'
        backgroundBlock.style.display = 'none'
    }, 500)
})
