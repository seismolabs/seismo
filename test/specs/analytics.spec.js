var moment = require('moment');
var client = require('../../source/client');

describe('analytics.spec.js', function () {
	var app, events, error, response;

	before(function () {
		app = 'test-app-' + moment().valueOf();
	});

	describe('create client', function () {
		beforeEach(function () {
			events = client(app);
		});

		it('should be initialized', function () {
			expect(events).to.be.ok;
		});
	});

	describe('posting and quering events', function () {
		beforeEach(function () {
			events = client(app);
		});

		describe('with only event name', function () {
			before(function (done) {
				events('my first event', function (err, resp) {
					error = err;
					response = resp;
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
					events('my first event', {environment: process.env.NODE_ENV}, function (err, resp) {
						error = err;
						response = resp;
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
				events({id: 'second-event', event: 'my second event'}, function (err, resp) {
					error = err;
					response = resp;
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
					events({id: 'second-event', event: 'my second event'}, {environment: process.env.NODE_ENV}, function (err, resp) {
						error = err;
						response = resp;
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
				events({event: 'my third event'}, function (err, resp) {
					error = err;
					response = resp;
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
});