var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
//var routes = require('./routes');
var driver = require('./routes/driver');
var transport = require('./routes/transport');
var connection  = require('express-myconnection');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/pub'));
app.use(connection(mysql, {
	user: 'root',
	password: '',
	host: 'localhost',
	database: 'taxi'
}, 'request'));
app.set('view engine', 'ejs');
app.locals.title;

app.get('/', function(req, res) {
	res.render('pages/index');
});


// DRIVER
app.get('/drivers', driver.list);
app.get('/drivers/edit/:id', driver.edit);
app.post('/drivers/edit/:id', driver.save);
app.get('/drivers/del/:id', driver.delete);
app.post('/drivers/add_driver', driver.add);
// END DRIVER

// TRANSPORT
app.get('/transport', transport.list);
app.get('/transport/edit/:id', transport.edit);
app.post('/transport/edit/:id', transport.save);
app.get('/transport/del/:id', transport.delete);
app.post('/transport/add_transport', transport.add);
// END TRANSPORT

app.listen(80);
