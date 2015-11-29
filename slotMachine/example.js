slotMachineData = {
    "AlfaBank": {
        "img": "img/alfa.png",
        "text": "Альфа-Банк"
    },
    "SberBank": {
        "img": "img/sber.jpg",
        "text": "Сбербанк"
    },
    "Tinkoff": {
        "img": "img/tinkoff.png",
        "text": "Тинькоф"
    },
    "Ocean": {
        "img": "img/ocean.gif",
        "text": "Океан Банк"
    },
    "MoscowBank": {
        "img": "img/moscow.png",
        "text": "Банк Москвы"
    },
    "VTB": {
        "img": "img/vtb.png",
        "text": "ВТБ 24"
    },
    "City": {
        "img": "img/citybank.jpg",
        "text": "Citibank"
    },
    "Raiffeisen": {
        "img": "img/reifeisen.gif",
        "text": "Raiffeisen"
    },
    "Sv": {
        "img": "img/sv.jpg",
        "text": "Связной Банк"
    },
    "PSB": {
        "img": "img/psb.jpg",
        "text": "ПРОМСВЯЗЬБАНК"
    },
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
//    "bank11": {
//        "img": "img/bank62.png",
//        "text": "bank11 text"
//    },
//    "bank12": {
//        "img": "img/money506.png",
//        "text": "bank12 text"
//    },
}

//(function($) {

    options = $.extend({
        drumCount: 1,
        broken: false,
        data: slotMachineData
    });

    var methods = {
        init: function(options) {
            methods.build();
			methods.event();
        },
        build: function() {
            console.log('build method');

            var sm = $('#sm');

			parseData();
			createCols();
			createControl();

            function parseData() {
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
				//debugger
            }

			function createCols() {
				var els = sm.find('.card');
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
							els.slice(start, end).wrapAll('<div class="wrap"><div class="wrap-in"/>');
						}
						start = start+elCol;
						end = end+elCol;
					}
				}
			}

			function createControl() {
				var refresh = $('<a href="#" id="refresh" />').text('refresh').appendTo('body');
			}

        },
		animate: function() {
			var wrap = $('.wrap');
			//var itemHeight = wrap.find('.card').eq(0).height();
			//var topIndent = parseInt(wrap[0].style.top - itemHeight)

			//debugger
			$.each(wrap, function (i, v) {
				var t = $(this);
				var first = t.find('.card').eq(0);
				var last = t.find('.card').eq(-1);

				//first.insertAfter(last);
				//first.after(last);


				//first.insertAfter(last)

				t.animate({
					top: "-=64"
				}, 500, function() {
					var firstDetach = first.detach();
					firstDetach.insertAfter(last)
					t.css('top', 0)
				})

				//debugger

			});
		},
		event: function() {
			var refresh = $('#refresh');
			refresh.on('click', function (e) {
				e.preventDefault();

				methods.animate()
			});
		}
    };

    $.fn.slotMachine = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('method ' + method + 'doesent exist');
        }
    }
//})(jQuery);