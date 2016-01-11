arr2 = [
    {
        title: "",
        name: "",
        href: "",
        skillz: "",
        img: ""
    }
]

//parsed = "";
//for (prop in arr) {
//    parsed += prop + ": " + arr[prop].title + "\n";
//}

//var container = document.getElementById("DivA");
//
// for (var i = 0; i < arr.length; i++) {
//     var inner = document.createElement("div");
//
//     inner.setAttribute("class", "inner");
//     container.appendChild(inner);
//
//     inner
//         .innerHTML = "<div>"
//                     +"<h2>"+arr[i].title+"</h2>"
//                     +arr[i].name
//                     +"<img src='"+arr[i].img+"'/>"
//                     +"<span>"+arr[i].skillz+"</span>"
//                     +"</div>"
// }

function jqueryAjax () {
    var url = "https://api.vkontakte.ru/method/wall.get?domain=tabasov";
    var offset = 0;
    var postsCount = 0;
    var result = [];

    function getPosts() {
        return $.ajax({
            url: url,
            dataType: "jsonp",
            data: {
                count: 10,
                offset: offset
            },
            success: function(data) {
                var posts = data.response;

                postsCount = posts.shift();
                result = result.concat(posts);
                offset += 10;

                function test () {
                    return 'dick;';
                }
            }
        }).then(function () {

            //if (postsCount !=  result.length) {
            //    return getPosts();
            //}

            $('#more').click(function () {
                test();
            });
        });


    }

    getPosts().done(function () {
        console.log(result)
    });
}

var url = "https://api.vkontakte.ru/method/wall.get?domain=adme";
var offset = 0;
var postsCount = 0;
var result = [];

function newPost() {
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: {
            count: 10,
            offset: offset
        },
        success: function(data) {
            var posts = data.response;

            postsCount = posts.shift();
            result.push(posts);
            offset += 10;

            parsePostsRaw();
        }
    });
}

function parsePostsRaw() {
    for (var i=0; i < result.length; i++) {
        for (var j = 0; j < result[i].length; j++) {
            var current = result[i][j].id;
            var text = $("<p>", {'class': 'text', text: result[i][j].text})
            var img = result[i][j].attachment.photo.src;
            var id = result[i][j].id;
            var li = $("<li>", {}).html("<p>"+result[i][j].text+"</p>"+"<img src='"+img+"' />"+"<span>"+id+"</span>");

            $('#resultText').append(li);
        }
    }
}

window.addEventListener("DOMContentLoaded", function () {
    newPost();

    $('#more').click(function () {
        newPost();
    });
});