/**
 * ????-??????
 * ?????????? img, p
 * callback before init, ??? ??????????
 * ?????????? ??????
 *
 * @author tybys
 * @param {broken} ????????? ??????
 * @param {drumCount} ???-?? ?????????
 */

var slotMachineData = {
    "bank1": {
        "img": "img/bank62.png",
        "text": "bank1 text"
    },
    "bank2": {
        "img": "img/bank80.png",
        "text": "bank2 text"
    },
    "bank3": {
        "img": "img/bank86.png",
        "text": "bank3 text"
    },
    "bank4": {
        "img": "img/credit-card30.png",
        "text": "bank4 text"
    },
    "bank5": {
        "img": "img/creditcard11.png",
        "text": "bank5 text"
    },
    "bank6": {
        "img": "img/debitcard5.png",
        "text": "bank6 text"
    },
    "bank7": {
        "img": "img/debitcard8.png",
        "text": "bank7 text"
    },
    "bank8": {
        "img": "img/discount11.png",
        "text": "bank8 text"
    },
    "bank9": {
        "img": "img/money506.png",
        "text": "bank9 text"
    },
    "bank10": {
        "img": "img/moneycard4_.png",
        "text": "bank10 text"
    },
    "bank11": {
        "img": "img/bank62.png",
        "text": "bank11 text"
    },
    "bank12": {
        "img": "img/money506.png",
        "text": "bank12 text"
    },
}


$.fn.slotMachine = function(options) {
    options = $.extend({
        drumCount: 2,
        broken: false,
        data: slotMachineData
    }, options);

    var init = function () {
        var sm = $('#sm');

        for (var key in slotMachineData) {
            if (slotMachineData.hasOwnProperty(key)) {
                var obj = slotMachineData[key];

                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        //console.log(prop + " = " + obj[prop]);
                        var row = $('<span class="card"></span>');
                        row.html("<p>"+obj.text+"</p>");
                        row.attr("data-name", key);

                        var img = $('<img src="'+obj.img+'" />');
                        row.prepend(img);
                    }
                }
                row.appendTo(sm);
            }
        }

        var els = $(this).find('.card');
        var dimension = els.length;

        if (dimension > 0) {
            var elCol = Math.ceil(dimension / options.drumCount);
            if (elCol < options.drumCount) {
                elCol = options.drumCount;
            }
            var start = 0;
            var end = elCol;

            for (var i = 0; i < options.drumCount; i++) {
                if ((i + 1) == options.columns) {
                    els.slice(start, end).wrapAll('<div class="wrap last" />');
                } else {
                    els.slice(start, end).wrapAll('<div class="wrap" />');
                }
                start = start+elCol;
                end = end+elCol;
            }
        }

        var wrap = $('.wrap')
        $.each(wrap, function (i, v) {
            var cards = $(v).find('.card');
            first = cards.eq(0).addClass('first active');
            last = cards.eq(-1).addClass('last');
        });

        /**
         * refresh/sort
         * @type {*|jQuery}
         */
        var refresh = $('<a href="#" id="refresh" />').text('refresh').appendTo('body');
        refresh.on('click', function(e) {
            e.preventDefault();

            //var _this = this; // shitcode
            //console.log(_this)
            drumRoll();
        });

        var current = 0;

        function drumRoll() {
            var col = $('#sm').find('.wrap');

            var containerOfs = $('#sm')
            var colOfs = col

          //  debugger;

            //var dimension = col.find('.card').length;
            //var firstTop = first.offset().top;
            //var lastBottom = last.offset().top;
            current+=1

            //var el = $('.card')


            if (current < dimension / options.drumCount) {
                $('.card').removeClass('active').next().addClass('active')
                col.css({
                    marginTop: "-=64"
                });
            }

            if (current > dimension / options.drumCount) {
                col.css({
                    marginTop: "+=64"
                });
            }

            console.log(current)


            //col.animate({
            //    marginTop: current > dimension / options.drumCount ? "+=64" : "-=64"
            //})

            /*
             }).on('click', '.new-item', function (e) {
                 var el = $(this);

                 if (el.offset().left + el.outerWidth(true) > $(window).width()) {
                     el.parents('.bx-viewport').next().find('.bx-next').click();
                }
             });
             */





        }
    };

    return this.each(init);
};

$(function () {
    $('#sm').slotMachine({
        drumCount: 2
    });
});