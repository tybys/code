//var http = require('http');
//
//var server = http.createServer(function(req, res) {
//	res.writeHead(200);
//	res.end('Hello Http');
//});
//server.listen('8080');

//var http = require('http');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/pub'));

console.log(__dirname)

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/drivers', function(req, res) {
	res.render('pages/drivers');
});

app.get('transport', function(req, res) {
	res.render('pages/transport');
});

app.post('/drivers_add', function (req, res) {
	res.send('yo')
});

app.listen(8080);