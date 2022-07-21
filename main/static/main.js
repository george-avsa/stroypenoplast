
// for triangle in main (main)
function setPreviewSizes (a, b, c, d) {
    if (d <= c) {
        a.style.borderLeft = c + 'px solid transparent';
        b.style.width = (c / 4) + 'px'
        b.style.bottom = '-' + (c / 21) + 'px'
        } else {
        a.style.borderLeft = c + 'px solid transparent';
        b.style.width = (c / 2) + 'px'
        b.style.bottom = '-' + (c / 10) + 'px'
    }
};
const triangle = document.querySelector('.block');
const triangleImage = document.querySelector('.content_penoplast');

setPreviewSizes(triangle, triangleImage, windowInnerWidth, windowInnerHeight);


// same height for form and advantages block (main)
const formHeight = document.querySelector('.content-form').clientHeight;
document.querySelector('.content_advantages').style.height = formHeight


// form main
const formSelect = document.querySelector('.form_input-select');
const selectDiv = document.querySelector('#select_div');
const selectPlaceholder = document.querySelector('#select_placeholder');
const bodyNotselectPlaceholder = document.querySelector('body:not(#select_placeholder)');
const selectNotDiv = document.querySelector('#select_div:not(.form_input-select)');

let selectOpen = false

selectNotDiv.addEventListener('click', function(){
    if (!selectOpen) {
        formSelect.style.display = 'block';
        setTimeout(function(){formSelect.style.opacity = 1}, 300)
        selectOpen = true
    } else {
        selectOpen = false
    }
})

function chooseSelect(id) {
    if (selectOpen) {
        
        let selectItem = document.querySelector(id);
        if (id == 'call') {
            selectPlaceholder.innerHTML = 'Позвонить'
        } else if (id == 'whats') {
            selectPlaceholder.innerHTML = 'Написать WhatsApp'
        } else if (id = 'mail') {
            selectPlaceholder.innerHTML = 'Связаться по почте'
        }
        formSelect.style.opacity = 0
        setTimeout(function(){formSelect.style.display = 'none'}, 300)
    }

    
}

// what to resize
window.addEventListener('resize', function() {
    windowInnerWidth = window.innerWidth;
    windowInnerHeight = window.innerHeight;
    menuBar.style.display = 'none';
    menuBar.style.opacity = 0;
    menuBarWidth = windowInnerWidth * 0.9;
    newMenuBarWidth(menuBarContent, menuBarWidth);
    setPreviewSizes(triangle, triangleImage, windowInnerWidth, windowInnerHeight);
}, false);