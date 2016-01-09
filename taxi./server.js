var express = require('express')
var	app = express()
var fs = require('fs')
var path = require('path')


var mysql = require('mysql')
var connection  = require('express-myconnection')

var bodyParser = require('body-parser')

var driver = require('./routes/driver')
var transport = require('./routes/transport')

multer = require('multer');
storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname)
	}
});
upload = multer({
	storage: storage
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/pub'));
app.use(express.static(__dirname + '/uploads'));
app.use(connection(mysql, {
	user: 'root',
	password: '',
	host: 'localhost',
	database: 'taxi'
}, 'request'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index', {title: 'main'});
});

// SEARCH
app.get('/search', function (req, res) {
	var search = req.query;
	/**
	 *
	 * 	req.query
	 * 	{name}
	 *
	 */

	console.log(req.query.type)
	var query_type = req.query.type;
	var query_type_id = req.query.search_field;
	var t = query_type == 'driver' ? 'driver WHERE d_id = '+query_type_id+'' : 'transport WHERE t_id = '+query_type_id+'';

	req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM '+t+'', function (err, results, fields) {
			if (err) throw err;
			res.render('pages/search', {data: results, title: 'search'});
		});
	});
});

// DRIVER
app.get('/drivers', driver.list);
app.get('/drivers/edit/:id', driver.edit);
app.post('/drivers/edit/:id', upload.single('photo'), driver.save);
app.get('/drivers/del/:id', driver.delete);
app.post('/drivers/add_driver', upload.single('photo'),  driver.add);
// END DRIVER

// TRANSPORT
app.get('/transport', transport.list);
app.get('/transport/edit/:id', transport.edit);
app.post('/transport/edit/:id', transport.save);
app.get('/transport/del/:id', transport.delete);
app.post('/transport/add_transport', transport.add);
// END TRANSPORT

app.listen(80);
