var request = require('request');

module.exports = function (app) {

	var client = function client(eventName, callback) {
		request.post({url: url, body: {data: eventName}, json: true}, function (err, resp) {
			if (err) {
				return callback({message: 'error occured during event posting', err: err});
			}

			callback(null, resp.body);
		});
	};

	client.query = function(query) {
		request.get({url: url, json: true}, function (err, resp) {
			if (err) {
				return callback({message: 'error occured during getting events', err: err});
			}

			callback(null, resp.body);
		});
	};

	return client;
};