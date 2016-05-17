(function ($) {
    $.fn.scrollTo = function (speed, easing, callback) {
        $('body, html').animate({
            scrollTop: this.offset().top
        }, speed, easing, callback);

        return this;
    };
}(jQuery));

var url = "https://api.vkontakte.ru/method/wall.get?";
var offset = 0;
postsCount = 0;
var count = 10;
var domain = "adme";
var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
//var result = [];
var old = {};

function newPost() {
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: {
            count: count,
            offset: offset,
            domain: domain
        },
        success: function (data) {
            var posts = data.response;

            postsCount = posts.shift();
            offset += 10;

            parse(posts);
            //$.adaptiveBackground.run();
			createPaging();
        }
    });
}

function pagination (param) {
    $.ajax({
        url: param,
        dataType: "jsonp",
        success: function (data) {
            posts = data.response;

            postsCount = posts.shift();
            pageParse(posts);
        }
    });
}

function createPaging(arrOffset) {
    var pagi = document.getElementsByClassName("pagination")[0];
    var postsShow = 10;
    var limitPosts = postsCount.shift() / postsShow;
    var pagiOffset = 0;
    var pagiUrl = "https://api.vkontakte.ru/method/wall.get?";

    //for (var i = 0; i < limitPosts; i++) {
    for (arrOffset === undefined
             ? arrOffset = 0
             : arrOffset; arrOffset < limitPosts; arrOffset++) {
        //debugger

        //if (arrOffset > 0)
        //    pagiOffset+=10;

        /*
        var pageAnchor = document.createElement("A");

        pageAnchor.setAttribute("href", pagiUrl+"&count="+count+"&offset="+pagiOffset+"&domain="+domain);
        pageAnchor.setAttribute("class", "page");
        pageAnchor.innerHTML = arrOffset+1;
        anchorArr.push(pageAnchor);

        if (arrOffset <= 9)
            pagi.appendChild(pageAnchor);

        */

        var anchor = document.createElement("A");

        anchor.setAttribute("href", pagiUrl+"&count="+count+"&offset="+pagiOffset+"&domain="+domain);
        anchor.setAttribute("class", "page");
        anchor.innerHTML = arrOffset;
        anchorArr.push(anchor);

        pagi.appendChild(anchor);
    }
}

var anchorArr = [];

function pageParse(data) {
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("LI");
        var p = document.createElement("P");

        p.setAttribute("class", "text");
        p.innerHTML = data[i].text;
        li.appendChild(p);

        var src =
            data[i].attachment
            && data[i].attachment.photo
            && data[i].attachment.photo.src
            && data[i].attachment.photo.src_big;

        if (src) {
            var img = document.createElement("IMG");

            img.setAttribute("src", data[i].attachment.photo.src);
            img.setAttribute("data-adaptive-background", "1");

            img.setAttribute("data-src-big", data[i].attachment.photo.src_big);

            li.appendChild(img);
        }

        document.getElementById("resultText").appendChild(li);
    }
}

function parse(data) {
    function date() {
        var iDate = document.createElement("I");
        var udate = data[i].date;
        var gmtDate = new Date(udate * 1000);
        var humanDate = gmtDate.getDay().toString() + " " + months[gmtDate.getMonth().toString()];
        var curDate = gmtDate.getDay();

        iDate.setAttribute("class", "date");
        iDate.innerHTML = humanDate;

        li.appendChild(iDate);
    }

    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;

        if (!old[id]) {
            old[id] = true;

            var li = document.createElement("LI");
            var p = document.createElement("P");

            p.setAttribute("class", "text");
            p.innerHTML = data[i].text;
            li.appendChild(p);

            date();

            var src =
                data[i].attachment
                && data[i].attachment.photo
                && data[i].attachment.photo.src
                && data[i].attachment.photo.src_big;

            if (src) {
                var img = document.createElement("IMG");

                img.setAttribute("src", data[i].attachment.photo.src);
                img.setAttribute("data-adaptive-background", "1");

                img.setAttribute("data-src-big", data[i].attachment.photo.src_big);

                li.appendChild(img);
            }

            document.getElementById("resultText").appendChild(li);
        }
    }

    var liEnd = document.getElementById('resultText').lastElementChild;
    //$.adaptiveBackground.run();
    //liEnd.next Sibling.scrollTo(1000);
}

window.addEventListener("DOMContentLoaded", function () {


    newPost();

    document.getElementById("more").addEventListener("click", function (event) {
        event.preventDefault();

        newPost();
    });

    document.querySelector("body").addEventListener("click", function (event) {
        if (event.target.tagName.toLowerCase() === "li") {
            var catched = event.target;
            var rightSide = document.getElementsByClassName("right")[0];

            rightSide.innerHTML = "";
            rightSide.insertAdjacentHTML("afterBegin", catched.innerHTML);

            var image = rightSide.getElementsByTagName("IMG")[0];
            var data_src_big = image.getAttribute("data-src-big");

            image.setAttribute("src", data_src_big);
        }

        if (event.target.tagName.toLowerCase() === "a" && event.target.attributes[1].value == "page") {
            event.preventDefault();

            /*
            var _thisUrl = event.target.attributes[0].value;
            var left = document.getElementById('resultText');

            left.innerHTML = "";

            pagination(_thisUrl);
            */
        }

        if (event.target.tagName.toLowerCase() === "a" && event.target.attributes[1].value == "page") {
			//var thisPos = event.target.childNodes[0].data;
			//build(thisPos);
        }

    });
});