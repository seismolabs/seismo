var moment = require('moment');
var testUtils = require('../utils');
var request = require('request');

describe.only('posting events', function () {
	var app, url, error, response, credentials, token;

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
		app = 'test-posting-app-' + moment().valueOf();
	});

	before(function (done) {
		request.post({url: url + '/auth', body: credentials, json: true}, function (err, res) {
			token = res.body.token;
			done(err);
		});
	});

	describe('with only event name', function () {
		before(function (done) {
			request.post({url: url + '/api/events/' + app, headers: {'x-access-token': token}, body: {event: 'my first event'}, json: true}, function (err, resp) {
				error = err;
				response = resp.body;
				done(err);
			});
		});

		it('should be posted', function () {
			expect(error).to.not.be.ok;
		});

		it('should have id', function () {
			expect(response.id).to.equal('my-first-event');
		});

		it('should have event', function () {
			expect(response.event).to.equal('my first event');
		});

		it('should have timestampt', function () {
			expect(response.timestampt).to.be.ok;
		});

		describe('with data', function () {
			before(function (done) {
				request.post({url: url + '/api/events/' + app, headers: {'x-access-token': token}, body: {event: 'my first event', data: {environment: process.env.NODE_ENV}}, json: true}, function (err, resp) {
					error = err;
					response = resp.body;
					done(err);
				});
			});

			it('should be posted', function () {
				expect(error).to.not.be.ok;
			});

			it('should have data', function () {
				expect(response.data.environment).to.equal(process.env.NODE_ENV);
			});
		});
	});

	describe('with id and event name', function () {
		before(function (done) {
			request.post({url: url + '/api/events/' + app, headers: {'x-access-token': token}, body: {event: {event: 'my second event', id: 'second-event'}}, json: true}, function (err, resp) {
				error = err;
				response = resp.body;
				done(err);
			});
		});

		it('should be posted', function () {
			expect(error).to.not.be.ok;
		});

		it('should have id', function () {
			expect(response.id).to.equal('second-event');
		});

		it('should have event', function () {
			expect(response.event).to.equal('my second event');
		});

		it('should have timestampt', function () {
			expect(response.timestampt).to.be.ok;
		});

		describe('with data', function () {
			before(function (done) {
				request.post({url: url + '/api/events/' + app, headers: {'x-access-token': token}, body: {event: 'my second event', id: 'second-event', data: {environment: process.env.NODE_ENV}}, json: true}, function (err, resp) {
					error = err;
					response = resp.body;
					done(err);
				});
			});

			it('should be posted', function () {
				expect(error).to.not.be.ok;
			});

			it('should have data', function () {
				expect(response.data.environment).to.equal(process.env.NODE_ENV);
			});
		});

	});

	describe('when id is missing', function () {
		before(function (done) {
			request.post({url: url + '/api/events/' + app, headers: {'x-access-token': token}, body: {event: 'my third event', data: {environment: process.env.NODE_ENV}}, json: true}, function (err, resp) {
				error = err;
				response = resp.body;
				done(err);
			});
		});

		it('should be posted', function () {
			expect(error).to.not.be.ok;
		});

		it('should have generated id', function () {
			expect(response.id).to.equal('my-third-event');
		});

		it('should have event', function () {
			expect(response.event).to.equal('my third event');
		});

		it('should have timestampt', function () {
			expect(response.timestampt).to.be.ok;
		});
	});
});
