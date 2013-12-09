var moment = require('moment');
var request = require('request');
var testUtils = require('../utils');

describe('quering events', function () {
	var app, url, error, credentials, token, results;

	before(function () {
		url = testUtils.getRootUrl();
	});

	before(function () {
		credentials = {
			username: 'seismo',
			password: 'mypass'
		};
	});

	before(function () {
		app = 'test-quering-app-' + moment().valueOf();
	});

	before(function (done) {
		testUtils.createQueringData(app, done);
	});


	before(function (done) {
		request.post({url: url + '/auth', body: credentials, json: true}, function (err, res) {
			token = res.body.token;
			done(err);
		});
	});

	describe('all events', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app, headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events for app', function () {
			expect(results.length).to.equal(13);
		});
	});

	describe('by event name', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app + '?event=application started', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events by given name', function () {
			expect(results.length).to.equal(5);
		});
	});

	describe('by event id', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app + '?id=app-stopped', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events by given id', function () {
			expect(results.length).to.equal(5);
		});
	});

	describe('by date', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app + '?date=2013-01-28', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events by given date', function () {
			expect(results.length).to.equal(2);
		});
	});

	describe('by today', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app + '?date=today', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events by today', function () {
			expect(results.length).to.equal(3);
		});
	});

	describe('by name and date', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app + '?date=2013-01-25&event=application started', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events by date and event name', function () {
			expect(results.length).to.equal(1);
		});
	});

	describe('by id and date', function () {
		before(function (done) {
			request.get({url: url + '/api/events/' + app + '?date=2013-01-25&id=app-started', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				results = res.body;
				done(err);
			});
		});

		it('should return all events by date and event name', function () {
			expect(results.length).to.equal(1);
		});
	});
});