exports.list = function (req, res, err) {
	req.getConnection(function (err, connection) {
		//connection.query('SELECT * FROM transport', function (err, results, fields) {
		connection.query('SELECT * FROM transport LEFT JOIN driver ON transport.t_id WHERE driver.bus_binding = transport.t_id', function (err, results, fields) {
			if (err) throw err;
			else {
				res.render('pages/transport', {data: results, title: 'list transport'});
			}
		});
	});
}; // get transport page

exports.edit = function (req, res, err) {
	var id = req.params.id;
	var backURL = req.header('Referer') || '/';
	var data2 = 'transport';

	req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM transport WHERE t_id = ?', [id], function (err, rows) {
			if (err) throw err;
			res.render('pages/edit', {data: rows, data2: data2, title: 'edit transport'});
		});
	});
}; // edit transport

exports.save = function (req, res, err) {
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	var backURL = req.header('Referer') || '/';
	var data = {
		type: input.type,
		brand: input.brand,
		model: input.model,
		equipment: input.equipment,
		seats: input.seats,
		class: input.class,
		government_number: input.government_number,
		status: input.status,
		driver_binding: input.driver_binding,
		company_id: input.company_id
	};

	req.getConnection(function (err, connection) {
		connection.query("UPDATE transport SET ? WHERE t_id = ?", [data, id], function (err, results, fields) {
			if (err) throw err;
			else {
				res.redirect('/transport')
			}
		});
	});
}; // update editable transport

exports.delete = function (req, res, err) {
	var id = req.params.id;
	var backURL = req.header('Referer') || '/';

	req.getConnection(function (err, connection) {
		connection.query("DELETE FROM transport WHERE t_id = ? ", [id], function (err, rows) {
			if (err) throw err;
			else {
				res.redirect(backURL);
			}
		});
	});
}; // delete transport

exports.add = function (req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var backURL = req.header('Referer') || '/';
	var data = {
		type: input.mtype,
		brand: input.mbrand,
		model: input.mmodel,
		equipment: input.mequipment,
		seats: input.mseats,
		class: input.mclass,
		government_number: input.mgovernment_number,
		status: input.mstatus,
		driver_binding: input.mdriver_binding,
		company_id: input.mcompany_id
	};

	req.getConnection(function (err, connection) {
		connection.query('INSERT INTO transport (type, brand, model, equipment, seats, class, government_number, status, driver_binding, company_id) values' +
			'("'+req.body.mtype+'", "'+req.body.mbrand+'", "'+req.body.mmodel+'", "'+req.body.mequipment+'", "'+req.body.mseats+'", "'+req.body.mclass+'", "'+req.body.mgovernment_number+'", "'+req.body.mstatus+'", "'+req.body.mdriver_binding+'", "'+req.body.mcompany_id+'")', function (err, results, fields) {
			if (err) throw err;
			else {
				res.redirect(backURL);
			}
		});
	});
}; // create transport