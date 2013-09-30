var async = require('async');
var db = require('../source/db');

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
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25 05:12:30')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25 05:45:00')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25 06:00:00')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25 06:15:10')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25 06:55:50')},
		{id: 'app-started', app: app, event: 'application started', timestampt: new Date('2013-01-25 07:00:21')},
	];

	var saveEventsTasks = events.map(function (e) {
		return function (callback) {
			db.events.save(e, callback);
		};
	});

	async.series(saveEventsTasks, callback);
}

module.exports = {
	createQueringData: createQueringData,
	createReportingData: createReportingData
};