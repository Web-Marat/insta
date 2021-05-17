"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));



// wordpress

$(document).ready(function() {
    /*
	  parallax
	*/

    var headerDecorFirst = $('.header .decor.first'),
        headerDecorSecond = $('.header__content-img img'),
        numbersDecor = $('.numbers__content .decor'),
        mapDecorFirst = $('.map .decor.first'),
        mapDecorSecond = $('.map .decor.second'),
        advantagesDecorFirst = $('.advantages__content .decor.first'),
        advantagesDecorSecond = $('.advantages__content .decor.second'),
        left,
        top,
        directAnimation = [headerDecorFirst, mapDecorFirst, advantagesDecorFirst],
        reverseAnimation = [headerDecorSecond, numbersDecor, mapDecorSecond, advantagesDecorSecond],
        move = function move(left, top) {
            for (var i = 0; i < directAnimation.length; i++) {
                directAnimation[i].css({
                    transform: "translate3d(".concat(left, ", ").concat(top, ", ").concat(top, ")")
                });
            }

            for (var _i = 0; _i < reverseAnimation.length; _i++) {
                reverseAnimation[_i].css({
                    transform: "translate3d(-".concat(left, ", -").concat(top, ", -").concat(top, ")")
                });
            }
        },
        setupForWidth = function setupForWidth(mql) {
            if (mql.matches) {
                document.addEventListener('mousemove', function () {
                    left = "".concat(event.clientX * 10 / myWidth, "px");
                    top = "".concat(event.clientY * 10 / myHeight, "px");
                    move(left, top);
                });
            } else {
                left = 0;
                top = 0;
            }
        },
        mql = window.matchMedia('screen and (min-width: 1200px)');

    mql.addListener(setupForWidth);
    setupForWidth(mql);

    /*
      scroll animation
    */

    $('h3, .numbers__content figure, .map__content, .advantages__content-block__text figure p, .order__content form, .services__content').waypoint(function (direction) {
        if (direction === 'down') {
            $(this.element).addClass('animated');
            this.destroy();
        }
    }, {
        offset: function offset() {
            return this.context.innerHeight() * 0.82;
        }
    });

    /*
      burger menu
    */

    var burgerMenu = document.querySelector('.header__top-burger'),
        bodyFilter = document.querySelector('.body-filter'),
        headerMenu = document.querySelector('.header__top-nav'),
        topBurgerLine = document.querySelector('.header__top-burger .line.top'),
        middleBurgerLine = document.querySelector('.header__top-burger .line.middle'),
        bottomBurgerLine = document.querySelector('.header__top-burger .line.bottom');

    var closeBurgerMenu = function closeBurgerMenu() {
        burgerMenu.classList.remove('active');
        document.querySelector('html').style.overflowY = 'scroll';
        bodyFilter.classList.remove('animated');
        middleBurgerLine.classList.remove('hide-line');
        topBurgerLine.classList.remove('rotate-line');
        bottomBurgerLine.classList.remove('rotate-line');
        headerMenu.classList.remove('active-menu');
    };

    var openBurgerMenu = function openBurgerMenu() {
        burgerMenu.classList.add('active');
        document.querySelector('html').style.overflowY = 'hidden';
        bodyFilter.classList.add('animated');
        middleBurgerLine.classList.add('hide-line');
        topBurgerLine.classList.add('rotate-line');
        bottomBurgerLine.classList.add('rotate-line');
        headerMenu.classList.add('active-menu');
    };

    burgerMenu.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            closeBurgerMenu();
        } else {
            openBurgerMenu();
        }
    });
    bodyFilter.addEventListener('click', function () {
        closeBurgerMenu();
    });

    /*
      slow scroll
    */
    var $root = $('html, body'),
        href;
    $('a.to-order, .header__top-nav menu li a').on('click', function () {
        href = $(this).attr('href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, 2000, function () {
            window.location.hash = href;
        });
        closeBurgerMenu();
        return false;
    });
    /*
      map animation
    */

    $('.map__content ul li p').hover(function () {
        var activeCountry = $(this).attr('class');
        $('.flag.' + activeCountry).addClass('active');
    }, function () {
        $('.flag').removeClass('active');
    });
    var thisYear = new Date().getFullYear(),
        yearOfCreation = +document.querySelector('.footer__content-block .vcard p strong').innerHTML;
    document.querySelector('.footer__content-block .vcard p output').innerHTML = " - ".concat(thisYear);

    if (thisYear > yearOfCreation) {
        document.querySelector('.footer__content-block .vcard p output').style.display = 'inline-block';
    }


    var form = $("#wpcf7-f15-o2 form");
    $("input").attr('autocomplete', 'off');

    $(form).submit(function(event) {
        var text;
        // var status = $(form).hasClass('invalid') ? text = "Ошибка" : text = "Отправлено!";

        setTimeout(function(){
            if ($(form).hasClass('invalid')) {
                text = "Ошибка!";
                $(form).find('.wpcf7-submit').removeClass('btn-complete');
                $(form).find('.wpcf7-submit').addClass('btn-error');
                $(form).find('input[type=submit]').val(text);
            } else {
                text = "Отправлено!";
                $(form).find('.wpcf7-submit').removeClass('btn-error');
                $(form).find('.wpcf7-submit').addClass('btn-complete');
                $(form).find('input[type=submit]').val(text);
            }
        }, 950)

    });

    $(form).keyup(function(event) {
        $(form).find('.wpcf7-submit').removeClass('btn-complete');
        $(form).find('.wpcf7-submit').removeClass('btn-error');
        $(form).find('input[type=submit]').val("Отправить");
    });
});