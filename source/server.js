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

app.configure('development', function() {
	app.use(express.logger('dev'));
});

app.configure('test', function() {
	app.use(express.errorHandler());
});

app.configure('staging', function() {
	app.use(express.logger('short'));
	app.use(express.compress());
});

app.configure('production', function() {
	app.use(express.logger('short'));
	app.use(express.compress());
});

http.createServer(app).listen(app.get('port'), function() {
	var env = process.env.NODE_ENV || 'development';
	logger.info('analytics app listening on port ' + app.get('port') + ' ' + env + ' mongo: ' + config.connection);
});
