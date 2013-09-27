var request = require('request');

module.exports = function (app, server) {
	if (!app) {
		throw 'application id is required';
	}

	server = server || 'http://localhost:3005';
	var url = server + '/api/events/' + app;

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