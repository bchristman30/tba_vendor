var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var pool = mysql.createPool({
	connectionLimit : config.database.connectionLimit,
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database
});
module.exports = pool;