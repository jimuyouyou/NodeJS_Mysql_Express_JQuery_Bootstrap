var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	database : 'blog',
	user : 'root',
	password : ''
});

exports.add = function(req, res) {
	return res.render('add');
};

exports.create = function(req, res) {
	pool.getConnection(function(err, connection) {
		var sql = 'INSERT INTO blog(title, content) VALUES(?, ?)';
		var inserts = [ req.query.title, req.query.content ];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, data) {
			connection.release();
			return res.json({
				err : err,
				data : JSON.stringify(data)
			});
		});
	});
};

exports.modify = function(req, res) {
	pool.getConnection(function(err, connection) {
		var sql = 'SELECT * FROM blog WHERE id = ?';
		var inserts = [ req.query.id ];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, data) {
			connection.release();
			data = data ? JSON.stringify(data[0]) : {};
			return res.render('modify', {
				err : err,
				data : JSON.stringify(data)
			});
		});
	});
};

exports.update = function(req, res) {
	pool.getConnection(function(err, connection) {
		var sql = 'UPDATE blog SET title = ?, content = ? WHERE id = ?';
		var inserts = [ req.query.title, req.query.content, req.query.id ];
		sql = mysql.format(sql, inserts);
		console.log('sql: ' + sql);
		connection.query(sql, function(err, data) {
			connection.release();
			return res.json({
				err : err,
				data : JSON.stringify(data)
			});
		});
	});
};

exports.list = function(req, res) {
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM blog', function(err, data) {
			connection.release();
			return res.json({
				err : err,
				data : JSON.stringify(data)
			});
		});
	});
};
