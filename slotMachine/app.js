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

    var make = function () {
        var sm = $('#sm');
        var smCol = $('<div class="sm-col"></div>');

        var elems = Object.keys(slotMachineData).length;
        var cols = options.drumCount;
        var total = elems; // ???-?? ?????????
        var min = Math(floor(total / cols)); // ???. ???-?? ??-?? ? ???????
        var extra = total - min * cols; // ?????? ??-??

        var i = 0;

        // create columns, depenging on the {drumCount}
        //var uniqRow = Math.round(rowCount / options.drumCount);
        function colCreate(colCount) {
            var i = 0;

            while (i !== colCount) {
                smCol.removeClass('col-1').removeClass('col-2');
                $('body').append(smCol.addClass('col-'+ (i+1)).clone());
                i++;
            }
        }
        colCreate(options.drumCount);

        for (var key in slotMachineData) {
            if (slotMachineData.hasOwnProperty(key)) {
                var obj = slotMachineData[key];

                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        //console.log(prop + " = " + obj[prop]);
                        var row = $('<span class="card"></span>');
                        row.text(obj.text);
                        row.addClass(key);

                        var img = $('<img src="'+obj.img+'" />');
                        row.prepend(img);
                    }
                }
                // wrap row's in columns, depending on the {drumCount}
                //row.appendTo($('.sm-col'))

                // DEFAULT STATE WITH TWO DRUMS
                //if (options.drumCount === 2) {
                //    if (i >=rowCount / 2) {
                //        row.appendTo($('.col-2'))
                //    } else {
                //        row.appendTo($('.col-1'))
                //    }
                //}
            }

            i++;
        }


        console.log('rowCount:'+options.drumCount, 'uniqRow:'+uniqRow)

        //debugger
    };

    return this.each(make);
};

$(function () {
    $('#sm').slotMachine({
        drumCount: 2
    });
});