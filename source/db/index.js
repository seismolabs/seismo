/**
 * Mongodb connector
 */
var config = require('../../config');
var mongo = require('mongojs');

// specify app collections here
var collections = ['events',];

// get db with default collections list
var db = mongo.connect(config.connection, collections);

if (!db) {
	throw new Error('could not connect to ' + config.connection);
}

module.exports = db;