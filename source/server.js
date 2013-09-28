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
	var event = req.body.event;

	var parsed = parseEvent(event);
	if (!parsed) {
		return res.send(400, 'bad event format');
	}

	var record = {id: parsed.id, app: app, event: parsed.event, timestampt: moment().toDate()};
	db.events.save(record, function (err, doc) {
		if (err) {
			return res.send(500, 'failed to store incoming event');
		}

		res.json(201, doc);
	});
});

function parseEvent(event) {
	if (typeof event === 'string') {
		var id = event.toLowerCase().replace(/\s/g, '-');
		return {
			id: id,
			event: event
		};
	}

	if (typeof event === 'object') {
		return event;
	}
}

// app.get('/api/events/:app', function (req, res) {
// 	var app = req.params.app;

// 	ensureCollection(app, function (err, doc) {
// 		if (err) {
// 			return res.send(500, 'failed to connect to db');
// 		}

// 		res.json(doc.events);
// 	});
// });

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
