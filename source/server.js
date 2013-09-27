var express = require('express');
var http = require('http');
var logger = require('./utils/logger');
var config = require('../config');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3005);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.post('/api/events/:app', function (req, res) {
	var app = req.params.app;
	var data = req.body;

	ensureCollection(app, function (err, doc) {
		if (err) {
			return res.send(500, 'failed to connect to db');
		}

		var timestampt = moment().toDate();
		var record = {data: data, timestampt: timestampt};

		db.events.update({_id: doc._id}, {$push: {events: record}}, function (err, doc) {
			if (err) {
				return res.send(500, 'failed to store incoming event');
			}

			res.send(201);
		});
	});
});

app.get('/api/events/:app', function (req, res) {
	var app = req.params.app;

	ensureCollection(app, function (err, doc) {
		if (err) {
			return res.send(500, 'failed to connect to db');
		}

		res.json(doc.events);
	});
});

function ensureCollection(app, callback) {
	db.analytics.findOne({application: app}, function (err, doc) {
		if (err) {
			return callback (err);
		}

		if (!doc) {
			return createApplication(app, callback);
		}

		callback(null, doc);
	});
}

http.createServer(app).listen(app.get('port'), function() {
	var env = process.env.NODE_ENV || 'development';
	logger.info('analytics app listening on port ' + app.get('port') + ' ' + env + ' mongo: ' + config.connection);
});
