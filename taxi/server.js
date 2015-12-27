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

var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/drivers', function(req, res) {
	var bdRun = bd();
	bdRun.query('SELECT * FROM driver', function (err, results, fields) {
		if (err){
			throw err;
		} else {
			//res.send('success');
			//res.send(results);
			//console.log(results[0].name)
			res.render('pages/drivers', {data: results});
		}
	});
});

app.get('/drivers/del/:id', function (req, res, err) {
	var id = req.params.id;
	var bdRun = bd();
	var backURL = req.header('Referer') || '/';

	console.log(req.params)

	bdRun.query("DELETE FROM driver WHERE id = ? ", [id], function (err, rows) {
		if (err) {
			throw err;
		} else {
			res.redirect(backURL);
		}
	});
});

app.get('transport', function(req, res) {
	res.render('pages/transport');
});




function bd() {
	var connection = mysql.createConnection({
		user: 'root',
		password: '',
		host: 'localhost',
		database: 'taxi'
	});

	return connection;
}


app.post('/drivers/add_driver', function (req, res, next) {
	var bdRun = bd();
	var backURL = req.header('Referer') || '/';

	bdRun.query('INSERT INTO driver (name, surname, patronymic, birthdate, open_category, license, photo, phone_number, comment, status, company_id) values ' +
			'("'+req.body.name+'", "'+req.body.surname+'", "'+req.body.patronymic+'", ' +
			'"'+req.body.birthdate+'", "'+req.body.open_category+'", "'+req.body.license+'", ' +
			'"'+req.body.photo+'", "'+req.body.phone_number+'", "'+req.body.comment+'", ' +
			'"'+req.body.status+'", "'+req.body.company_id+'")', function (err, results, fields) {

		if (err){
			throw err;
		} else {
			//res.send('success');
			res.redirect(backURL);
		}
	});

});

app.listen(80);