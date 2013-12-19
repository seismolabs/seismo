var async = require('async');
var moment = require('moment');

var config = require('../config');
var db = require('../source/db')(config);

function getRootUrl () {
	return config.applicationUrl;
}

function createQueringData(app, callback) {
	var events = [
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25')},
		{id: 'app-stopped', app: app, event: 'application stopped', timestampt: new Date('2013-01-25')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-26')},
		{id: 'app-stopped', app: app, event: 'application stopped', timestampt: new Date('2013-01-26')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-27')},
		{id: 'app-stopped', app: app, event: 'application stopped', timestampt: new Date('2013-01-27')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-28')},
		{id: 'app-stopped', app: app, event: 'application stopped', timestampt: new Date('2013-01-28')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-29')},
		{id: 'app-stopped', app: app, event: 'application stopped', timestampt: new Date('2013-01-29')},
		{id: 'app-started-today', app: app, event: 'application started today', timestampt: new Date()},
		{id: 'app-started-today', app: app, event: 'application started today', timestampt: new Date()},
		{id: 'app-stopped-today', app: app, event: 'application started today', timestampt: new Date()},
	];

	var saveEventsTasks = events.map(function (e) {
		return function (callback) {
			db.events.save(e, callback);
		};
	});

	async.series(saveEventsTasks, callback);
}

function createReportingData(app, callback) {
	var events = [
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-29 05:12:30').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-29 05:45:00').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-29 06:00:00').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-29 06:15:10').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-29 06:55:50').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-29 07:00:21').toDate()},

		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-30 05:12:30').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-30 05:45:00').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-30 06:00:00').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-30 06:15:09').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-30 06:55:50').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-09-30 07:00:21').toDate()},

		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-10-01 05:12:30').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-10-01 05:45:00').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-10-01 06:00:00').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-10-01 06:15:09').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-10-01 06:55:50').toDate()},
		{id: 'app-started', app: app, event: 'application started', timestampt: moment.utc('2013-10-01 07:00:21').toDate()},
	];

	var saveEventsTasks = events.map(function (e) {
		return function (callback) {
			db.events.save(e, callback);
		};
	});

	async.series(saveEventsTasks, callback);
}

module.exports = {
	getRootUrl: getRootUrl,
	createQueringData: createQueringData,
	createReportingData: createReportingData
};