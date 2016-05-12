$(function () {
    var bodyClass = $('body').hasClass('about content-wrk');
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;

    if (!$('body').hasClass('about')  && is_iPad || !is_iPad) {
        slides();
    }

    if ($(window).width() < 500) {
        $('body').removeClass('menu-collapsed')
    }
    

    //console.log($('.phone').isOnScreen())

    // shitcode
    // .work-wrap.double - one block 320+10
    // .work-wrap.quadro - four blocks 640+20
    var $double = $('[data-index="4"]').find('.work-wrap.double');
    var $quadro = $('[data-index="4"]').find('.work-wrap.quadro');
    
    $('[data-index="4"]').find('.inner').css('width', 330 * $double.length + 660 * $quadro.length);

    //$('.phone').hover(function () {
    //    $(this).removeClass('collapsed')
    //}, function () {
    //    $(this).addClass('collapsed')
    //});

    $(document).scroll(function () {

    });
    //if (!ymaps.Map) {
    //    ymaps.modules.require('Map, Placemark', function (Map, Placemark) {
    //        var myPlacemark = new ymaps.Placemark([55.8, 37.6], {}, {
    //            // iconImageHref: '/maps/doc/jsapi/2.1/examples/images/myIcon.gif'
    //            preset: 'islands#redIcon'
    //        });
    //    });
    //}

    //$(".content").onepage_scroll({
    //    sectionContainer: ".slide",    
    //    easing: "ease",               
        
    //    animationTime: 1000,    
    //    pagination: true,     
    //    updateURL: false,             
    //    beforeMove: function (index) { },
    //    afterMove: function (index) { }, 
    //    loop: false,                    
    //    keyboard: false,             
    //    responsiveFallback: false,          
    //    direction: "vertical"      
    //});

    $('a[href="#"]').click(function (e) {
        e.preventDefault();
    });

    $('[data-toggle="tooltip"]').tooltip("show", {
        trigger: "focus"
    }).unbind("hover mouseover mouseleave");


    //$('.clients-review').on('init', function (event, slick) {
    //    $(this).find('.slick-current').bind('click', function () {

    //    });
    //});
    //$('.slick-current').find('.left').click(function () {
    //    $('.clients-review').slickPrev();
    //});
    
    if ($('.clients-review').Exists()) {
        $('.clients-review').slick({
            //dots: true,
            arrows: false,
            infinite: true,
            // speed: 300,
            slidesToShow: 1,
            centerMode: true,
            responsive: [{
                breakpoint: 340,
                settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    arrows: false
                }}
            ]
        // variableWidth: true
        });
    }
    
    if ($('.awards').Exists()) {
        $('.awards').slick({
            //dots: true,
            arrows: false,
            infinite: true,
            // speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            centerMode: true,
            variableWidth: true,
            draggable: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }}
            ]
        });
    }
    
    
    //if ($(window).width() > 1000) {
        $('.menu').hover(function () {
            $('body').removeClass('menu-collapsed').removeAttr('style');
            
        }, function () {
            $('body').addClass('menu-collapsed').css('overflow', 'visible');
        });
    //}
    
    // portfolio layout statements
    // $('.toggler').click(function () {
    //     var tParent = $(this).parents('.row');
    //     var tClass = $(this).children().attr('class');
        
    //     var tP2 = tParent.attr('class').split(' ');
    //     tP2.pop();
    //     tP2.push(tClass);
    //     tParent.attr('class', tP2.join(' '))
    // });
});



$.fn.isOnScreen = function () {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

$.fn.Exists = function () {
    return this.length > 0
};

function slides() {
    var portOfSlides = $('.row.portfolio.single').find('.item');
    var numbersOfSlides = $('.slide');
    var topPos = 0;

    if (portOfSlides.Exists()) {
        $.each(portOfSlides, function (i) {
            $(this).css({
                position: "absolute",
                top: topPos + "%"
            }).addClass("ops-section").attr("data-index", i + 1);
            topPos = topPos + 100;
        });
    }

    $.each(numbersOfSlides, function (i) {
        $(this).css({
            position: "absolute",
            top: topPos + "%"
        }).addClass("ops-section").attr("data-index", i + 1);
        topPos = topPos + 100;
    });
};