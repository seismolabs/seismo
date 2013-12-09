/*
var moment = require('moment');
var client = require('../../source/client');
var testUtils = require('../utils');

describe('building reports', function () {
		var app, events, error, options, summary;

		before(function () {
			options = {
				credentials: {
					username: 'seismo',
					password: 'mypass'
				}
			};
		});

		before(function () {
			app = 'test-reporting-app-' + moment().valueOf();
		});

		before(function (done) {
			testUtils.createReportingData(app, done);
		});

		before(function () {
			events = client(app, options);
		});

		describe('report by hour', function () {
			before(function (done) {
				events.report({event: 'application started', report: 'hour', date: '2013-09-29', hour: 6}, function (err, sum) {
					error = err;
					summary = sum;
					done(err);
				});
			});

			it('should have event data', function () {
				expect(summary.id).to.equal('app-started');
				expect(summary.event).to.equal('application started');
			});

			it('should have total', function () {
				expect(summary.total).to.equal(3);
			});
		});

		describe('report by day', function () {
			before(function (done) {
				events.report({event: 'application started', report: 'day', date: '2013-09-29'}, function (err, sum) {
					error = err;
					summary = sum;
					done(err);
				});
			});

			it('should have event data', function () {
				expect(summary.id).to.equal('app-started');
				expect(summary.event).to.equal('application started');
			});

			it('should have total', function () {
				expect(summary.total).to.equal(6);
			});
		});

		describe('report by week', function () {
			before(function (done) {
				events.report({event: 'application started', report: 'week', date: '2013-09-29'}, function (err, sum) {
					error = err;
					summary = sum;
					done(err);
				});
			});

			it('should have event data', function () {
				expect(summary.id).to.equal('app-started');
				expect(summary.event).to.equal('application started');
			});

			it('should have total', function () {
				expect(summary.total).to.equal(18);
			});
		});

		describe('report by month', function () {
			before(function (done) {
				events.report({event: 'application started', report: 'month', date: '2013-09-29'}, function (err, sum) {
					error = err;
					summary = sum;
					done(err);
				});
			});

			it('should have event data', function () {
				expect(summary.id).to.equal('app-started');
				expect(summary.event).to.equal('application started');
			});

			it('should have total', function () {
				expect(summary.total).to.equal(12);
			});
		});

		describe('report by period', function () {
			before(function (done) {
				events.report({event: 'application started', report: 'period', from: '2013-09-29', to: '2013-09-30'}, function (err, sum) {
					error = err;
					summary = sum;
					done(err);
				});
			});

			it('should have event data', function () {
				expect(summary.id).to.equal('app-started');
				expect(summary.event).to.equal('application started');
			});

			it('should have total', function () {
				expect(summary.total).to.equal(12);
			});
		});
});
*/