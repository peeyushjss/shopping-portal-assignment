'use strict';

let mongoose = require('mongoose'),
	config = require('../config/config'),
	db = null;

function connectDatabase() {
	mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
	db = mongoose.connection;
	db.on('error', function callback() {
		console.error.bind(console, 'mongodb connection error');
		console.log("Reconectting database");
		connectDatabase();
	});
	db.once('open', function callback() {
		console.log("Connection with database succeeded.");
	});
}

connectDatabase();

exports.mongoose = mongoose;
exports.db = db;