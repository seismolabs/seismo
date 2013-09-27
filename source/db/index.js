/**
 * Mongodb connector
 */
var config = require('../../config');
var mongo = require('mongojs');

// specify app collections here
var collections = ['analytics',];

// get db with default collections list
var db = mongo.connect(config.connection, collections);

if (!db) {
	throw new Error('could not connect to ' + config.connection);
}

/*
 * Overwrite db url or collections if needed
 * @param options {Object} - possible values:
 * url {String}, collection {Array}
 * e.g. { url: username:password@host:port/dbname?params), collections: ['name', 'name2' ...] }
 */
var setDb = function (options) {
	var url = options.url ? options.url : config.connection,
		list = options.collections ? options.collections : collections;

	return mongo.connect(url, list);
};

module.exports = db;