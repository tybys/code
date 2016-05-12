$.fn.typo = function (options) {
    'use strict';
    var Div = $(this);
    if (Div.attr("tpr") == 1) return true;
    var Input = Div.find("input[type],textarea");
    Div.css("font-family", Input.css("font-family"));
    Div.css("font-size", Input.css("font-size"));
    Div.css("font-weight", Input.css("font-weight"));
    if (Input.css("color") != "rgb(0, 0, 0)") {
        Div.css("color", Input.css("color"));
    }
    else {
        Div.css("color", "rgb(117, 117, 117)");
    }
    Div.css("margin-top", Input.css("margin-top"));
    Div.css("margin-bottom", Input.css("margin-bottom"));
    Div.css("margin-left", Input.css("margin-left"));
    Div.css("margin-right", Input.css("margin-right"));
    Input.css("margin", 0);
    var sValue = Div.attr("dval");
    var sSmallValue = sValue;
    if (Div.hasAttr("sval")) sSmallValue = Div.attr("sval");
    Input.attr("dValue", sValue);
    var Span1 = $("<span class='small'/>");
    var Span2 = $("<span class='big'/>");
    Span2.css("padding-left", Input.css("padding-left"));
    Span2.css("padding-right", Input.css("padding-right"));
    Span2.css("padding-top", Input.css("padding-top"));
    Span2.css("padding-bottom", Input.css("padding-bottom"));


    var DivInner = $("<div class='wrapBig'/>");
    DivInner.height(Input.outerHeight());

    Div.css({ position: "relative" });

    Span2.text(sValue);
    Span1.text(sSmallValue);
    DivInner.append(Span2);
    Div.append(Span1);
    Div.append(DivInner);
    Div.click(function () {
        Input.focus();
    });
    Input.focus(function () {
        if ($(this).val() == "") {
            Div.removeClass("typing");
            Div.addClass("pre_typing");
        }
    });
    Input.keydown(function (e) {
        if (obPlaceHolder.checksCode(e.keyCode)) {
            Div.removeClass("pre_typing");
            Div.addClass("typing");
        }
    });
    Input.keyup(function (e) {
        if (obPlaceHolder.checksCode(e.keyCode)) {
            if ($(this).val() == "") {
                if (A || !$(this).is(":focus")) {
                    Div.removeClass("typing").removeClass("pre_typing");
                    return;
                }
                Div.removeClass("typing");
                Div.addClass("pre_typing");
            }
            else {
                Div.removeClass("pre_typing");
                Div.addClass("typing");
            }
        }
    });
    Input.blur(function () {
        if ($(this).val() == "") {
            Div.removeClass("typing");
            Div.removeClass("pre_typing");
        }
    });
    var A = true;
    setInterval(function () {
        if (Input.prop("value")) {
            Div.removeClass("pre_typing");
            Div.addClass("typing");
        }

    }, 250);
    Input.keyup();
    A = false;
    Input.oneTime("50ms", function () {
        if (Input.val() != "") Input.keyup();
    });

    Div.attr("tpr", 1);
    return true;
};

var obPlaceHolder = {
    bind: function () {
        $("input[placeholder], textarea[placeholder]").each(function () {
            if ($(this).hasAttr("data-no-replace")) return;
            var placeholderText = $(this).attr("placeholder");
            $(this).wrap('<div class="dTypo" dval="' + placeholderText + '"><div></div></div>');
            $(this).removeAttr("placeholder");
            $(this).parent().parent().typo({});

        });
    },

    checksCode: function (sCode) {

        var valid =
            (sCode > 47 && sCode < 58) || // number keys
                sCode == 32 || sCode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
                sCode == 8 || sCode == 46 || // BackSpace & Delete
                (sCode > 64 && sCode < 91) || // letter keys
                (sCode > 95 && sCode < 112) || // numpad keys
                (sCode > 185 && sCode < 193) || // ;=,-./` (in order)
                (sCode > 218 && sCode < 223);   // [\]' (in order)

        return valid;
    },

    init: (function () {
        $(function () {
            obPlaceHolder.bind();
        });
    })()
};