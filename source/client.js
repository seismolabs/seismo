var request = require('request');

module.exports = function (app, server) {
	if (!app) {
		throw 'application id is required';
	}

	server = server || 'http://localhost:3005';

	var client = function client(event, data, callback) {
		var url = server + '/api/events/' + app;

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
		var url = server + '/api/events/' + app;

		if (typeof query === 'function') {
			callback = query;
		} else {
			url += createQuery(query);
		}

		request.get({url: url, json: true}, function (err, resp) {
			if (err) {
				return callback({message: 'error occured during getting events', err: err});
			}

			if (resp.statusCode !== 200) {
				return callback({message: 'server error', code: resp.statusCode});
			}

			callback(null, resp.body);
		});

		function createQuery(q) {
			if (typeof q === 'string') {
				return '?event=' + q;
			}

			if (typeof q === 'object' && q.id && q.date) {
				return '?id=' + q.id + '&date=' + q.date;
			}

			if (typeof q === 'object' && q.id) {
				return '?id=' + q.id;
			}

			if (typeof q === 'object' && q.date && q.event) {
				return '?date=' + q.date + '&event=' + q.event;
			}

			if (typeof q === 'object' && q.date) {
				return '?date=' + q.date;
			}
		}
	};

	client.report = function(query, callback) {
		if (!query.report) {
			return callback('missing report option');
		}

		var url = server + '/api/reports/' + query.report + '/' + app;
		url += createQuery(query);

		request.get({url: url, json: true}, function (err, resp) {
			if (err) {
				return callback({message: 'error occured during getting events', err: err});
			}

			if (resp.statusCode !== 200) {
				return callback({message: 'server error', code: resp.statusCode});
			}

			callback(null, resp.body);
		});

		function createQuery(query) {
			if (query.report === 'hour') {
				return '?hour=' + query.hour + '&date=' + query.date;
			}
		}
	};

	return client;
};