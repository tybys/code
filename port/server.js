var express = require('express');
var http = require('http');
var path = require('path');
var fauxJax = require('faux-jax');

var app = express();
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(err, req, res) {
	var domain = "adme";
	var offset = 0;
	var postsCount = 0;
	var count = 10;

	//function doRequest() {
		http.request('https://api.vkontakte.ru/method/wall.get', function(res) {
			console.log(res.statusCode); // 200

			var chunks = [];
			res.on('data', function(chunk) {
				chunks.push(chunk);
			});

			res.on('end', function() {
				console.log(Buffer.concat(chunks).toString());
			});
		}).end();
	//}

	//request({
	//	url: 'https://api.vkontakte.ru/method/wall.get',
	//	dataType: "jsonp",
	//	method: 'GET',
	//	data: {
	//		domain: domain,
	//		count: count,
	//		offset: offset
	//	}
	//}, function(err, res, body) {
	//	result.push(body)
	//});

	if (err) throw err;
	//debugger
	res.render('views/index', {


	})

});

app.listen(80);