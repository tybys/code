$(document).ready(function () {
    calcTotalPrice();

    //for map click input
    $("g[id]").click(function () {
        var digit = '',
            id = this.id,
            min = id.length - 1;
        $('g[id]').attr('class', '');
        $(this).attr('class', 'active');
        digit = id.slice(-min);
        $('#a' + digit).click();
    });
    $('label.area').click(function () {
        var digit = '',
            id = $(this).attr('for');
        min = id.length - 1;
        digit = id.slice(-min);
        $('#m' + digit).click();

        $('#notary-info').css('opacity', 1);
        $('#district-name').text($(this).text());
        $('#notary-address').html('');
        $('#notary-address-label').hide();
        $.getJSON('/address?district=' + $(this).attr('for'), function (data) {
            if (data.length > 0) {
                $('#notary-address-label').show();
                $('#num-notary').html('В этом округе работают нотариусов: ' + data.length + ', <br/>готовых помочь Вам.');
                $.each(data, function (key, val) {
                    $('#notary-address').append('<input type="radio" class="area" name="choose" id="c' + val.id + '"><label for="c' + val.id + '" class="choose"><span>' + val.address + '</span> <a href="#" class="mapCall">Покакзать на карте</a></label>')
                    console.log(val);
                });
            }
            else {
                $('#num-notary').text('К сожалению в этом округе не работает ни один нотариус.');
            }
        });
    });

    $('#l1').click(function () {
        document.getElementById('link2').click();
    });
    $('#l2').click(function () {
        document.getElementById('link1').click();
    });
    $('#switch').click(function () {
        $('div.delivery, img.delivery').toggleClass('active');
        var checkbox = $('#switch input:checkbox');
        $('#delivery-price').toggle();
        calcTotalPrice();
        if (checkbox.attr('checked') == 'checked') {
            checkbox.removeAttr('checked');
        }
        else {
            checkbox.attr('checked', 'checked');
        }
    });
    $('#adress').click(function () {
        $(this).next().toggleClass('active');
        return false
    });
    $('p.linked').click(function () {
        $(this).next().slideToggle(200);
        return false
    });
    //map Init
    $('.mapCall').one("click", function () {
        $('#map, .background').fadeIn();
        var coor = $(this).prev().text();
        ymaps.ready(init);
        function init() {
            var myMap = new ymaps.Map('map', {
                center: [55.753994, 37.622093],
                zoom: 9
            });
            // Поиск координат центра Нижнего Новгорода.
            ymaps.geocode(coor, {
                /**
                 * Опции запроса
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
                 */
                // boundedBy: myMap.getBounds(), // Сортировка результатов от центра окна карты
                // strictBounds: true, // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy
                results: 1 // Если нужен только один результат, экономим трафик пользователей
            }).then(function (res) {
                // Выбираем первый результат геокодирования.
                var firstGeoObject = res.geoObjects.get(0),
                // Координаты геообъекта.
                    coords = firstGeoObject.geometry.getCoordinates(),
                // Область видимости геообъекта.
                    bounds = firstGeoObject.properties.get('boundedBy');

                // Добавляем первый найденный геообъект на карту.
                myMap.geoObjects.add(firstGeoObject);
                // Масштабируем карту на область видимости геообъекта.
                myMap.setBounds(bounds, {
                    checkZoomRange: true // проверяем наличие тайлов на данном масштабе.
                });
            });
        }

        return false
    });

    $('.background').click(function () {
        $('.background, #map').fadeOut('100');
    });


    //support block
    $('#supCall').click(function () {
        $('.col-xs-8').fadeOut('100');
        $('#support').fadeIn('100');
        $('#support').animate({
            left: 0
        }, 100);
    });

    $('#hide-feedback').click(function () {
        $('.col-xs-8').fadeIn('100');
        $('#support').fadeOut('100');
        $('#support').animate({
            left: 0
        }, 100);
    });

    function calcTotalPrice() {
        var total = 0;
        $('#service-list .price:visible').each(function() {
            total = total + ($(this).text() - 0);
        });
        $('#total-price').text(total);
    }

//tooltip
    $(function () {
        //$('[data-toggle="tooltip"]').tooltip()
    });
});
