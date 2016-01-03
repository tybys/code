exports.list = function(req, res) {
	req.getConnection(function (err, connection) {
		//connection.query('SELECT * FROM driver', function (err, results, fields) {
		connection.query('SELECT * FROM driver LEFT JOIN transport ON driver.d_id WHERE transport.driver_binding = driver.d_id', function (err, results, fields) {
			if (err) throw err;
			else {
				//console.log(results[1])
				res.render('pages/drivers', {data: results, title: 'list driver'});
			}
		});
	});
}; // get driver page

exports.edit = function (req, res, err) {
	var id = req.params.id;
	var backURL = req.header('Referer') || '/';
	var data2 = 'driver';

	req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM driver WHERE d_id = ?', [id], function (err, rows) {
			if (err) throw err;
			else{
				//console.log(id, rows)
				res.render('pages/edit', {data: rows, data2: data2, title: 'edit driver'});
			}
		});
	});
}; // edit driver

exports.save = function (req, res, err) {
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	var backURL = req.header('Referer') || '/';
	var data = {
		name: input.name,
		surname: input.surname,
		patronymic: input.patronymic,
		birthdate: input.birthdate,
		open_category: input.open_category,
		license: input.license,
		photo: input.photo,
		phone_number: input.phone_number,
		comment: input.comment,
		status: input.status ,
		bus_binding: input.bus_binding,
		company_id: input.company_id
	};

	req.getConnection(function(err, connection) {
		connection.query("UPDATE driver SET ? WHERE d_id = ?", [data, id], function (err, results, fields) {
			if (err) throw err;
			else {
				res.redirect('/drivers')
			}
		});
	});
}; // update editable driver

exports.delete = function (req, res, err) {
	var id = req.params.id;
	var backURL = req.header('Referer') || '/';

	req.getConnection(function (err, connection) {
		connection.query("DELETE FROM driver WHERE d_id = ? ", [id], function (err, rows) {
			if (err) throw err;
			else {
				res.redirect(backURL);
			}
		});
	});
}; // delete driver

exports.add = function (req, res, next) {
	var backURL = req.header('Referer') || '/';
	var upload  = multer({storage: storage}).single('photo');
	upload(req, res, function (err) {
		if (err) throw err
		else {
			//res.end('f u')
		}
	});

	req.getConnection(function (err, connection) {
		connection.query('INSERT INTO driver (name, surname, patronymic, birthdate, open_category, license, photo, phone_number, comment, status, bus_binding, company_id) values ' +
				'("'+req.body.name+'", "'+req.body.surname+'", "'+req.body.patronymic+'", ' +
				'"'+req.body.birthdate+'", "'+req.body.open_category+'", "'+req.body.license+'", ' +
				'"'+req.body.photo+'", "'+req.body.phone_number+'", "'+req.body.comment+'", ' +
				'"'+req.body.status+'", "'+req.body.bus_binding+'", "'+req.body.company_id+'")', function (err, results, fields) {
			if (err) throw err;
			else {
				res.redirect(backURL);
			}
		});
	});
}; // create driver