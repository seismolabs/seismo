var express = require('express');
var http = require('http');
var util = require('util');

var logger = require('./utils/logger');
var config = require('../config');
var moment = require('moment');
var db = require('./db');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3005);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.post('/api/events/:app', function (req, res) {
	var app = req.params.app;
	var payload = req.body;
	var event = payload.event;
	var data = payload.data;

	var parsed = parseEvent(event);
	if (!parsed) {
		return res.send(400, 'bad event format');
	}

	var record = {id: parsed.id, app: app, event: parsed.event, timestampt: moment().toDate()};
	if (data) {
		record.data = data;
	}

	db.events.save(record, function (err, doc) {
		if (err) {
			return res.send(500, 'failed to store incoming event');
		}

		res.json(201, doc);
	});
});

app.get('/api/events/:app', function (req, res) {
	var app = req.params.app;
	var event = req.query.event;
	var query = {app: app};

	if (event) {
		query.event = event;
	}

	db.events.find(query).toArray(function (err, results) {
		if (err) {
			return res.send(500, 'failed to read events');
		}

		res.json(results);
	});
});

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

// function ensureCollection(app, callback) {
// 	db.analytics.findOne({application: app}, function (err, doc) {
// 		if (err) {
// 			return callback (err);
// 		}

// 		if (!doc) {
// 			return createApplication(app, callback);
// 		}

// 		callback(null, doc);
// 	});
// }

http.createServer(app).listen(app.get('port'), function() {
	var env = process.env.NODE_ENV || 'development';
	logger.info('analytics app listening on port ' + app.get('port') + ' ' + env + ' mongo: ' + config.connection);
});
