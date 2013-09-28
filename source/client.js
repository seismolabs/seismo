var request = require('request');

module.exports = function (app, server) {
	if (!app) {
		throw 'application id is required';
	}

	server = server || 'http://localhost:3005';
	var url = server + '/api/events/' + app;

	var client = function client(event, data, callback) {
		if (typeof data === 'function') {
			callback = data;
		}

		request.post({url: url, body: {event: event, data: data}, json: true}, function (err, resp) {
			if (err) {
				return callback({message: 'error occured during event posting', err: err});
			}

			if (resp.statusCode !== 201) {
				return callback({message: 'server error', code: resp.statusCode, err: resp.body});
			}

			callback(null, resp.body);
		});
	};

	client.query = function(query, callback) {
		request.get({url: url, json: true}, function (err, resp) {
			if (err) {
				return callback({message: 'error occured during getting events', err: err});
			}

			if (resp.statusCode !== 200) {
				return callback({message: 'server error', code: resp.statusCode});
			}

			callback(null, resp.body);
		});
	};

	return client;
};