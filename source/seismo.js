function seismo(config) {
	var express = require('express');
	var _ = require('underscore');
	var logger = require('./utils/logger');
	var moment = require('moment');
	var db = require('./db');
	var package = require('../package');
	var crypto = require('crypto');
	var bcrypt = require('bcrypt-nodejs');

	var app = express();

	var cors = function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-Access-Token, X-Revision, Content-Type');

		next();
	};

	app.configure(function(){
		app.set('port', process.env.PORT || 3005);
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(cors);
		app.use(express.methodOverride());
		app.use(app.router);
	});

	// Healthcheck

	app.get('/', function (req, res) {
		res.json({app: 'seismo', env: process.env.NODE_ENV, version: package.version, apiUrl: '/api'});
	});

	// Auth

	app.post('/auth', function (req, res) {
		var username = req.body.username;
		var password = req.body.password;

		if (!username || !password) {
			return res.send(400, {message: 'username or password missing'});
		}

		var passwordHash = config.users[username];

		if (!passwordHash) {
			return res.send(401, {message: 'user ' + username + ' is not registered'});
		}

		bcrypt.compare(password, passwordHash, function (err, result) {
			if (err) {
				return res.send(500, err);
			}

			if (!result) {
				return res.send(401, {message: 'user ' + username + ' is not authorized due to wrong password'});
			}

			var accessToken = createToken(username);

			res.cookie('token', accessToken, {expires: new Date(Date.now() + config.tokenTtl * 60 * 1000 )});
			res.send(200, {token: accessToken});
		});
	});

	// Events

	app.post('/api/events/:app', function (req, res) {
		var app = req.params.app;
		var payload = req.body;
		var event = payload.event;
		var data = payload.data;

		var parsed = parseEvent(event);
		if (!parsed) {
			logger.error({message: 'failed to parse event information'});
			return res.send(400, 'bad event format');
		}

		var record = {id: parsed.id, app: app, event: parsed.event, timestampt: moment().utc().toDate()};
		if (data) {
			record.data = data;
		}

		db.events.save(record, function (err, doc) {
			if (err) {
				logger.error({message: 'failed to store incoming event', err: err});
				return res.send(500, 'failed to store incoming event');
			}

			logger.info('recieved event from app: ' + app + ' event name: ' + parsed.event);

			res.json(201, doc);
		});
	});

	app.get('/api/events/:app', function (req, res) {
		var app = req.params.app;
		var query = {app: app};

		if (req.query.event) {
			query.event = req.query.event;
		}

		if (req.query.id) {
			query.id = req.query.id;
		}

		if (req.query.date) {
			query.timestampt = req.query.date === 'today' ? dateQuery() : dateQuery(req.query.date);
		}

		db.events.find(query).toArray(function (err, results) {
			if (err) {
				logger.error({message: 'failed to read events', err: err});
				return res.send(500, 'failed to read events');
			}

			logger.info('returned events for app: ' + app + ' event name: ' + query.event || query.id);

			res.json(results);
		});

		function dateQuery(date) {
			var from = date ? moment(date) : moment();

			from.set('hour', 0);
			from.set('minute', 0);
			from.set('second', 0);

			var to = moment(from);
			to.add('days', 1);

			return {
				$gte: from.utc().toDate(),
				$lt: to.utc().toDate()
			};
		}
	});

	// Reports

	app.get('/api/reports/hour/:app', function (req, res) {
		var app = req.params.app;
		var query = {app: app};
		var date = req.query.date;
		var hour = req.query.hour;

		if (!date) {
			return res.send(403, 'missing date parameter');
		}

		if (!hour) {
			return res.send(403, 'missing hour parameter');
		}

		if (req.query.event) {
			query.event = req.query.event;
		}

		if (req.query.id) {
			query.id = req.query.id;
		}

		var from = date === 'today' ? moment.utc() : moment.utc(date);

		from.set('hour', hour);
		from.set('minute', 0);
		from.set('second', 0);

		var to = moment.utc(from);
		to.add('hours', 1);

		report(from, to, query, function (err, report) {
			if (err) {
				logger.error(err);
				res.send(500, err);
			}

			res.json(report);
		});
	});

	app.get('/api/reports/day/:app', function (req, res) {
		var app = req.params.app;
		var query = {app: app};
		var date = req.query.date;

		if (!date) {
			return res.send(403, 'missing hour parameter');
		}

		if (req.query.event) {
			query.event = req.query.event;
		}

		if (req.query.id) {
			query.id = req.query.id;
		}

		var from = date === 'today' ? moment.utc() : moment.utc(date);

		from.set('hour', 0);
		from.set('minute', 0);
		from.set('second', 0);

		var to = moment.utc(from);
		to.add('days', 1);

		report(from, to, query, function (err, report) {
			if (err) {
				logger.error(err);
				res.send(500, err);
			}

			res.json(report);
		});
	});

	app.get('/api/reports/week/:app', function (req, res) {
		var app = req.params.app;
		var query = {app: app};
		var date = req.query.date;

		if (!date) {
			return res.send(403, 'missing hour parameter');
		}

		if (req.query.event) {
			query.event = req.query.event;
		}

		if (req.query.id) {
			query.id = req.query.id;
		}

		var from = date === 'today' ? moment.utc() : moment.utc(date);
		var to = moment.utc(date);

		from.startOf('week');
		to.endOf('week');

		report(from, to, query, function (err, report) {
			if (err) {
				logger.error(err);
				res.send(500, err);
			}

			res.json(report);
		});
	});

	app.get('/api/reports/month/:app', function (req, res) {
		var app = req.params.app;
		var query = {app: app};
		var date = req.query.date;

		if (!date) {
			return res.send(403, 'missing hour parameter');
		}

		if (req.query.event) {
			query.event = req.query.event;
		}

		if (req.query.id) {
			query.id = req.query.id;
		}

		var from = date === 'today' ? moment.utc() : moment.utc(date);
		var to = moment.utc(date);

		from.startOf('month');
		to.endOf('month');

		report(from, to, query, function (err, report) {
			if (err) {
				logger.error(err);
				res.send(500, err);
			}

			res.json(report);
		});
	});

	app.get('/api/reports/period/:app', function (req, res) {
		var app = req.params.app;
		var query = {app: app};
		var from = req.query.from;
		var to = req.query.to;

		if (!from) {
			return res.send(403, 'missing from parameter');
		}

		if (!to) {
			return res.send(403, 'missing to parameter');
		}

		if (req.query.event) {
			query.event = req.query.event;
		}

		if (req.query.id) {
			query.id = req.query.id;
		}

		from = moment.utc(from), to = moment.utc(to).add('days', 1);

		report(from, to, query, function (err, report) {
			if (err) {
				logger.error(err);
				res.send(500, err);
			}

			res.json(report);
		});
	});


	function report(from, to, query, callback) {
		query.timestampt = {$gte: from.toDate() , $lt: to.toDate()};

		logger.info({message: 'prepearing report', query: query});

		db.events.find(query).toArray(function (err, results) {
			if (err || !results) {
				return callback({message: 'failed to read events', err: err});
			}

			var total = results.length;
			var id = total > 0 ? results[0].id : query.id;
			var event = total > 0 ? results[0].event : query.event;

			var report =  {
				id: id,
				event: event,
				total: total
			};

			callback(null, report);
		});
	}

	function parseEvent(event) {
		if (typeof event === 'string') {
			return {
				id: generateIdFromName(event),
				event: event
			};
		}

		if (typeof event === 'object') {
			event.id = event.id || generateIdFromName(event.event);
			return event;
		}
	}

	function generateIdFromName(name) {
		return name.toLowerCase().replace(/\s/g, '-');
	}

	function createToken(username) {
		var timespamp = moment();
		var message = username + ';' + timespamp.valueOf();
		var hmac = crypto.createHmac('sha1', config.authKey).update(message).digest('hex');
		var token = username + ';' + timespamp.valueOf() + ';' + hmac;
		var tokenBase64 = new Buffer(token).toString('base64');

		return tokenBase64;
	}

	function validateToken (token) {
		if (!token) {
			return false;
		}

		var decoded = new Buffer(token, 'base64').toString();
		var parsed = decoded.split(';');

		if (parsed.length !== 3) {
			return false;
		}

		var username = parsed[0], timespamp = parsed[1], recievedHmac = parsed[2];
		var message = username + ';' + timespamp;
		var computedHmac = crypto.createHmac('sha1', config.authKey).update(message).digest('hex');

		if (recievedHmac !== computedHmac) {
			return false;
		}

		var currentTimespamp = moment(), recievedTimespamp = moment(+timespamp);
		if (recievedTimespamp.diff(currentTimespamp, 'minutes') > config.tokenTtl) {
			return false;
		}

		return true;
	}

	function authenticatedAccess () {
		return function (req, res, next) {
			var token = req.headers['x-access-token'] || req.query.access_token || req.cookies.token;

			validateToken(token) ? next() : res.send(401);
		};
	}

	function applyAuthentication(app, routesToSecure) {
		for (var verb in app.routes) {
			var routes = app.routes[verb];
			routes.forEach(patchRoute);
		}

		function patchRoute (route) {
			var apply = _.any(routesToSecure, function (r) {
				return route.path.indexOf(r) === 0;
			});

			var guestAccess = _.any(route.callbacks, function (r) {
				return r.name === '_guest';
			});

			if (apply && !guestAccess) {
				route.callbacks.splice(0, 0, authenticatedAccess());
			}
		}
	}


	applyAuthentication(app, ['/api']);

	return app;
}

module.exports = function (config) {
	config = config || require('../config');
	return seismo(config);
};

