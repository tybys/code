if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}



function IntVal( mixed_var, base ) {
    var tmp;

    if( typeof( mixed_var ) == 'string' ){
        tmp = parseInt(mixed_var);
        if(isNaN(tmp)){
            return 0;
        } else{
            return parseInt(tmp.toString(base || 10));
        }
    } else if( typeof( mixed_var ) == 'number' ){
        return parseInt(Math.floor(mixed_var));
    } else{
        return 0;
    }
}
jQuery.fn.hasAttr = function(attrName) {
    var attr = $(this).attr(attrName);

    // For some browsers, `attr` is undefined; for others,
    // `attr` is false.  Check for both.
    if (typeof attr !== 'undefined' && attr !== false) {
        return true;
    }
    return false;
};
// Плагин, который выравнивает высоту элементов
jQuery.fn.alignHeight = function(iMax){

    if(!!iMax) iMax=IntVal(iMax);
    else iMax=0;
    var max = 0;
    var iCount=0;
    this.each(function() {
        if(iMax && iCount>iMax)
        {
            max=0;
            iCount=0;
        }
        var $this = $(this),
            height = $this.height();
        if( height > max ) max = height;
        iCount++;
    });
    this.height(max);
};
jQuery.fn.fly = function(objTo, options)
{
    if(!objTo.length || !this.length) return;
    var def = {};
    def.duration = 500;
    if(options)
    {
        for(i in options) def[i] = options[i];
    }

    iWidth = Math.abs(this.offset().top-objTo.offset().top);
    iHeight = Math.abs(this.offset().left-objTo.offset().left);

    iDistance = Math.sqrt(iWidth*iWidth+iHeight*iHeight);
    var iDuration = (Math.ceil(iDistance)/400)*def.duration;
    console.log(iDistance,def.duration,iDuration);
    OuterDiv = $("<div class = 'dFlyer'></div>").css({
        "position":"absolute",
        "text-align":"center",
        "border":"1px solid #777",
        "overflow":"hidden",
        "width":this.outerWidth(),
        "height":this.outerHeight(),
        "top":this.offset().top,
        "left":this.offset().left,
        "background":"#FFF",
        "z-index":"1000"
    });
    OuterDiv.append(this.clone().css({"margin":0,"padding":0}));
    $("body").append(OuterDiv);
    OuterDiv.animate({
            "left":objTo.offset().left,
            "top":objTo.offset().top,
            "width":objTo.outerWidth(),
            "height":objTo.outerHeight(),
            "opacity":1
        },
        {
            "easing":"linear",
            "duration":iDuration,
            "step":function()
            {
                Img = $(this).find("img");
                Img.height($(this).height());
            },
            "complete":function()
            {
                $(this).remove()
            }
        });
    return OuterDiv;
};

$.fn.hasOverflow = function() {
    var $this = $(this);
    var $children = $this.find('*');
    var len = $children.length;

    if (len) {
        var maxWidth = 0;
        var maxHeight = 0;
        $children.map(function(){
            maxWidth = Math.max(maxWidth, $(this).outerWidth(true));
            maxHeight = Math.max(maxHeight, $(this).outerHeight(true));
        });

        return maxWidth > $this.width() || maxHeight > $this.height();
    }

    return false;
};

$.fn.inViewCorrect = function() {
    var st = (document.documentElement.scrollTop || document.body.scrollTop),
        ot = $(this).offset().top,
        wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
    return (((st+wh)>ot) && (st<ot));
};
$.fn.inView = function() {
    var st = (document.documentElement.scrollTop || document.body.scrollTop),
        ot = $(this).offset().top,
        wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
    return (((st+2*wh)>ot) && (st-wh/2<ot));
};

function ExtSetCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function stopBubble(e)
{
    if (typeof e.stopPropagation != "undefined") {
        e.stopPropagation();
    } else if (typeof e.cancelBubble != "undefined") {
        e.cancelBubble = true;
    }
}

jQuery.extend(jQuery.fn, {
    removeValidator: function() {
        this.unbind();
        jQuery.removeData(this[0], 'validator');
    }
});

$.extend($.fancybox.defaults.tpl, {
    wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin popup_save"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
    closeBtn: '<a class="clouse_popup" href="javascript:void(0);"></a>'
});

(function($)
{
    jQuery.fn.putCursorAtEnd = function()
    {
        return this.each(function()
        {
            $(this).focus()

            // If this function exists...
            if (this.setSelectionRange)
            {
                // ... then use it
                // (Doesn't work in IE)

                // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
                var len = $(this).val().length * 2;
                this.setSelectionRange(len, len);
            }
            else
            {
                // ... otherwise replace the contents with itself
                // (Doesn't work in Google Chrome)
                $(this).val($(this).val());
            }

            // Scroll to the bottom, in case we're in a tall textarea
            // (Necessary for Firefox and Google Chrome)
            this.scrollTop = 999999;
        });
    };
})(jQuery);
function PluralForm(n, forms) {
    return forms[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
}
jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

$.extend ({
    URLEncode: function (s) {
        s = encodeURIComponent (s);
        s = s.replace (/\~/g, '%7E').replace (/\!/g, '%21').replace (/\(/g, '%28').replace (/\)/g, '%29').replace (/\'/g, '%27');
        s = s.replace (/%20/g, '+');
        return s;
    },
    URLDecode: function (s) {
        s = s.replace (/\+/g, '%20');
        s = decodeURIComponent (s);
        return s;
    }
});

if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

(function(arr,i,name) {
    while(name = arr[i++]) {
        Math["$"+name] = Function("a","b","return Math."+name+"(a*(b=Math.pow(10,b||0)))/b");
    }
})(["floor","ceil","round"],0);


function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	 bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}

function FloatVal(mixed_var) {return (parseFloat(mixed_var) || 0);}

function implode( glue, pieces ) {	// Join array elements with a string
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos

    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}
