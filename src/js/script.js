$(document).ready(function () {
    $("a[href]").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
    top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
    });
}); 

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu');
    const menuItem = document.querySelectorAll('.header__item');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__menu_active');

        if (hamburger.classList.contains('hamburger_active')) {
            document.body.style.cssText = 'overflow: hidden'
        } else {
            document.body.style.cssText = 'overflow: auto'
        }
     
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            document.body.style.cssText = 'overflow: auto'
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__menu_active');
        })
    })
})

