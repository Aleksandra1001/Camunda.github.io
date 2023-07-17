$(document).ready(function () {
    $("a[href]").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
    top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
    });
}); 

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu'),
    menuItem = document.querySelectorAll('.header__item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__menu_active');
        })
    })
})

