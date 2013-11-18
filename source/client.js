var request = require('request');

module.exports = function (app, options) {
	if (!app) {
		throw new Error('application id is required');
	}

	if (!options || !options.credentials) {
		throw new Error('options or credentials are missing');
	}

	var server = (options && options.server) || 'http://localhost:3005';
	var credentials = options.credentials;

	if (!credentials) {
		throw new Error('options object missing service credentials');
	}

	var accessToken;

	function auth(credentials, callback) {
		request.post({url: server + '/auth', body: credentials, json: true}, function (err, response) {
			if (err) {
				return callback(err);
			}

			callback(null, response.body.token);
		});
	}

	function ensureAccessToken(callback) {
		if (!accessToken) {
			return auth(credentials, function (err, token) {
				if (err) {
					return callback(err);
				}

				accessToken = token;

				return callback(null, token);
			});
		}

		callback(null, accessToken);
	}

	var client = function client(event, data, callback) {
		var url = server + '/api/events/' + app;

		if (typeof data === 'function') {
			callback = data;
		}

		ensureAccessToken(function (err, token) {
			if (err) {
				return callback(err);
			}

			request.post({url: url, body: {event: event, data: data}, headers: {'X-Access-Token': token}, json: true}, function (err, resp) {
				if (err) {
					return callback({message: 'error occured during event posting', err: err});
				}

				if (resp.statusCode !== 201) {
					return callback({message: 'server error', code: resp.statusCode, err: resp.body});
				}

				callback(null, resp.body);
			});
		});
	};

	client.query = function(query, callback) {
		var url = server + '/api/events/' + app;

		if (typeof query === 'function') {
			callback = query;
		} else {
			url += createQuery(query);
		}

		ensureAccessToken(function (err, token) {
			if (err) {
				return callback(err);
			}

			request.get({url: url, headers: {'X-Access-Token': token}, json: true}, function (err, resp) {
				if (err) {
					return callback({message: 'error occured during getting events', err: err});
				}

				if (resp.statusCode !== 200) {
					return callback({message: 'server error', code: resp.statusCode});
				}

				callback(null, resp.body);
			});
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

		ensureAccessToken(function (err, token) {
			if (err) {
				return callback(err);
			}

			request.get({url: url, headers: {'X-Access-Token': token}, json: true}, function (err, resp) {
				if (err) {
					return callback({message: 'error occured during getting events', err: err});
				}

				if (resp.statusCode !== 200) {
					return callback({message: 'server error', code: resp.statusCode});
				}

				callback(null, resp.body);
			});
		});

		function createQuery(query) {
			if (query.report === 'hour') {
				return '?hour=' + query.hour + '&date=' + query.date;
			}

			if (query.report === 'day') {
				return '?date=' + query.date;
			}

			if (query.report === 'week') {
				return '?date=' + query.date;
			}

			if (query.report === 'month') {
				return '?date=' + query.date;
			}

			if (query.report === 'period') {
				return '?from=' + query.from + '&to=' + query.to;
			}
		}
	};

	return client;
};