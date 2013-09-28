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
			beforeEach(function (done) {
				events('my first event', function (err, resp) {
					error = err;
					response = resp;
					done(err);
				});
			});

			it('should be posted', function () {
				expect(error).to.not.be.ok;
			});
		});

		describe('with id and event name', function () {
			beforeEach(function (done) {
				events({id: 'first-event', event: 'my first event'}, function (err, resp) {
					error = err;
					response = resp;
					done(err);
				});
			});

			it('should be posted', function () {
				expect(error).to.not.be.ok;
			});
		});
	});
});