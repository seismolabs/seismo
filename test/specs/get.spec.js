/*
var moment = require('moment');
var client = require('../../source/client');
var testUtils = require('../utils');

describe('quering events', function () {
	var app, events, error, options, results;

	before(function () {
		options = {
			credentials: {
				username: 'seismo',
				password: 'mypass'
			}
		};
	});

	before(function () {
		app = 'test-quering-app-' + moment().valueOf();
	});

	before(function (done) {
		testUtils.createQueringData(app, done);
	});

	before(function () {
		events = client(app, options);
	});

	describe('all events', function () {
		before(function (done) {
			events.query(function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events for app', function () {
			expect(results.length).to.equal(13);
		});
	});

	describe('by event name', function () {
		before(function (done) {
			events.query('application started', function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events by given name', function () {
			expect(results.length).to.equal(5);
		});
	});

	describe('by event id', function () {
		before(function (done) {
			events.query({id: 'app-stopped'}, function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events by given id', function () {
			expect(results.length).to.equal(5);
		});
	});

	describe('by date', function () {
		before(function (done) {
			events.query({date: '2013-01-28'}, function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events by given date', function () {
			expect(results.length).to.equal(2);
		});
	});

	describe('by today', function () {
		before(function (done) {
			events.query({date: 'today'}, function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events by today', function () {
			expect(results.length).to.equal(3);
		});
	});

	describe('by name and date', function () {
		before(function (done) {
			events.query({event: 'application started', date: '2013-01-25'}, function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events by date and event name', function () {
			expect(results.length).to.equal(1);
		});
	});

	describe('by id and date', function () {
		before(function (done) {
			events.query({id: 'app-started', date: '2013-01-25'}, function (err, res) {
				error = err;
				results = res;
				done(err);
			});
		});

		it('should return all events by date and event name', function () {
			expect(results.length).to.equal(1);
		});
	});
});
*/