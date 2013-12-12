var mongo = require('mongojs');

module.exports = function (config) {
	var connection = connection.connection || 'mongodb://localhost:27017/seismodb';
	var db = mongo.connect(config.connection, ['events']);
	if (!db) {
		throw new Error('could not connect to ' + config.connection);
	}

	return db;
};