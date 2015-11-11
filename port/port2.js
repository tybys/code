(function ($) {
    $.fn.scrollTo = function (speed, easing, callback) {
        $('body, html').animate({
            scrollTop: this.offset().top
        }, speed, easing, callback);

        return this;
    };
}(jQuery));

var url = "https://api.vkontakte.ru/method/wall.get?domain=adme";
var offset = 0;
var postsCount = 0;
var months = ["??????", '???????', '????', '??????', '???', 'June', 'July', 'August', 'September', '0October', 'November', 'December'];
//var result = [];
var old = {}

function newPost() {
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: {
            count: 10,
            offset: offset
        },
        success: function (data) {
            var posts = data.response;

            postsCount = posts.shift();
            //result.push(posts);
            offset += 10;

            //parse(posts);
            nativeParse(posts);
            //$.adaptiveBackground.run();
        }
    });
}

function nativeParse(data) {
    data.forEach(function (item, i, arr) {
        var timestamp = item.date;
        var newDate = new Date(timestamp * 1000);
        var gmDate = newDate.getDay().toString();

        console.log(gmDate);
    });

    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;

        if (!old[id]) {
            old[id] = true;

            var udate = data[i].date;
            var gmtDate = new Date(udate * 1000);
            var humanDate = gmtDate.getDay().toString() + " " + months[gmtDate.getMonth().toString()];
            curDate = gmtDate.getDay();

            var li = document.createElement("LI");
            var p = document.createElement("P");
            var iDate = document.createElement("I");

            p.setAttribute("class", "text");
            iDate.setAttribute("class", "date");

            p.innerHTML = data[i].text;
            iDate.innerHTML = humanDate;

            li.appendChild(p);
            li.appendChild(iDate);

            var src =
                data[i].attachment
                && data[i].attachment.photo
                && data[i].attachment.photo.src
                && data[i].attachment.photo.src_big;

            if (src) {
                var img = document.createElement("IMG");

                img.setAttribute("src", data[i].attachment.photo.src);
                img.setAttribute("data-adaptive-background", "1");

                img.setAttribute("data-src-big", data[i].attachment.photo.src_big)

                li.appendChild(img);
            }

            document.getElementById("resultText").appendChild(li);
        }
    }

    var liEnd = document.getElementById('resultText').lastElementChild;
    //$.adaptiveBackground.run();
    //liEnd.next Sibling.scrollTo(1000);
}

function parse(data) {
    var liEnd = $('#resultText li:last');

    $.each(data, function (indx, el) {
        var id = el.id;

        if (!old[id]) {
            old[id] = true;

            var li = $("<li/>");
            var p = $("<p/>", {'class': 'text', html: el.text});

            p.appendTo(li);

            var src = el.attachment && el.attachment.photo && el.attachment.photo.src;

            if (src) {
                var img = $('<img/>', {src: el.attachment.photo.src});

                img.appendTo(li);
            }
            li.appendTo('#resultText')
        }
    });
    liEnd.next().scrollTo(1000);
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
            // debugger
            var image = rightSide.getElementsByTagName("IMG")[0];
            var data_src_big = image.getAttribute("data-src-big");

            image.setAttribute("src", data_src_big);
            //debugger
        }
    });
});