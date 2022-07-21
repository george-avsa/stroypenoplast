// global
let windowInnerWidth = window.innerWidth;
let windowInnerHeight = window.innerHeight;
let menuBarWidth = windowInnerWidth * 0.9;

// for mobile header (header)
const menuBarContent = document.querySelector('.mobile_nav-content');
const menuBarExit = document.querySelector('.nav_mobile-exit');
const menuBurger = document.querySelector('.head_burger');
let menuBar = document.querySelector('.mobile_nav');

function newMenuBarWidth (a, b) {
a.style.left = '-' + b + 'px';
}

newMenuBarWidth(menuBarContent, menuBarWidth);

let left = -menuBarWidth


menuBurger.addEventListener('click', function(){
menuBar.style.display = 'block';
menuBar.style.opacity = 1;
setTimeout(function(){menuBarContent.style.left = 0}, 20);
});

menuBarExit.addEventListener('click', function(){
    menuBarContent.style.left = -menuBarWidth + 'px'
    setTimeout(function(){
    menuBar.style.opacity = 0;
    menuBar.style.display = 'none';
    }, 500);

})

const navSlide = document.getElementById('nav_slide');
const navUl = document.getElementById('nav_dropdown');
const navSlideArrow = document.querySelector('.nav_slide-arrow');

// full list of products mobile (header) 
let navDropdownSlide = true
navSlide.addEventListener('click', function(){
    if (navDropdownSlide) {
        navUl.style.display = 'block';
        navUl.style.height = '205px';
        navSlideArrow.style.rotate = '270deg'
        setTimeout(function(){navUl.style.opacity = 1; navDropdownSlide = false}, 500)
    } else {
        setTimeout(function(){
            navUl.style.opacity = 0
            navSlideArrow.style.rotate = '90deg'
        }, 10)
        setTimeout(function(){navUl.style.height = '0px'}, 200)
        setTimeout(function(){navUl.style.display = 'none'}, 500)
        navDropdownSlide = true
    }
})


const navData = document.querySelector('nav').getAttribute('data-cart')

// on hover dropdown desktop (header)
if (navData != 'empty') {

    const navDivBtn = document.querySelector('.nav-div');
    const navDropDown = document.querySelector('.nav-prodiction_dropdown');
    const cartHoverItem = document.querySelector('.nav_right');
    const navCartDetailed = document.querySelector('.nav_cart-inner');
    let navEmpty = navCartDetailed.getAttribute('data-close')

const cartDetailsHeight = -navCartDetailed.clientHeight
navCartDetailed.style.opacity = 0;
navCartDetailed.style.display = 'none';

function onHoverShowHide (hoverItem, dropdown) {
    if (navEmpty) {
        hoverItem.addEventListener('mouseenter', function(){
            dropdown.style.display = 'block';
            navCartDetailed.style.bottom = (cartDetailsHeight) + 'px';
            setTimeout(function(){dropdown.style.opacity = 1}, 300)
        })
        hoverItem.addEventListener('mouseleave', function(){
            dropdown.style.opacity = 0
            setTimeout(function(){dropdown.style.display = 'none'}, 300)
        })
    }
}

function onClickHide(clickItem, dropdown, div) {
    clickItem.addEventListener('click', function(){
        dropdown.style.display = 'block';
        navCartDetailed.style.bottom = (cartDetailsHeight) + 'px';
        setTimeout(function(){dropdown.style.opacity = 1}, 300)
        clickCount = false
    })
    
    document.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(div);
        if ( ! withinBoundaries ) {
            dropdown.style.opacity = 0
            setTimeout(function(){dropdown.style.display = 'none'}, 300)
        }
        clickCount = true
    })
}

let clickCount = true

cartHoverItem.addEventListener('click', function(){
    document.location = '/cart'
})

if (windowInnerWidth > 1080) {
    onHoverShowHide(navDivBtn, navDropDown)
    onHoverShowHide(cartHoverItem, navCartDetailed)
} else {
    onClickHide(navDivBtn, navDropDown, document.querySelector('.nav_item-div'))
}

// resize for Header


} else {

    const navDivBtn = document.querySelector('.nav-div');
    const navDropDown = document.querySelector('.nav-prodiction_dropdown');

    function onHoverShowHide (hoverItem, dropdown) {
            hoverItem.addEventListener('mouseenter', function(){
                dropdown.style.display = 'block';
                setTimeout(function(){dropdown.style.opacity = 1}, 300)
            })
            hoverItem.addEventListener('mouseleave', function(){
                dropdown.style.opacity = 0
                setTimeout(function(){dropdown.style.display = 'none'}, 300)
            })
    }

    function onClickHide(clickItem, dropdown, div) {
        clickItem.addEventListener('click', function(){
            dropdown.style.display = 'block';
            setTimeout(function(){dropdown.style.opacity = 1}, 300)
            clickCount = false
        })
        
        document.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(div);
            if ( ! withinBoundaries ) {
                dropdown.style.opacity = 0
                setTimeout(function(){dropdown.style.display = 'none'}, 300)
            }
            clickCount = true
        })
    }
    
    let clickCount = true
    
    if (windowInnerWidth > 1080) {
        onHoverShowHide(navDivBtn, navDropDown)
    } else {
        onClickHide(navDivBtn, navDropDown, document.querySelector('.nav_item-div'))
    }
}

const links = document.querySelectorAll('.link_nav')

for (let link of links) {
    link.addEventListener('click', function(){
        menuBarContent.style.left = -menuBarWidth + 'px'
        setTimeout(function(){
        menuBar.style.opacity = 0;
        menuBar.style.display = 'none';
        }, 500);
    })
}