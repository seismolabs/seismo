var moment = require('moment');
var testUtils = require('../utils');
var request = require('request');

describe('building reports', function () {
	var app, url, error, summary, credentials, token;

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
		app = 'test-reporting-app-' + moment().valueOf();
	});

	before(function (done) {
		testUtils.createReportingData(app, done);
	});

	before(function (done) {
		request.post({url: url + '/auth', body: credentials, json: true}, function (err, res) {
			token = res.body.token;
			done(err);
		});
	});

	describe('report by hour', function () {
		before(function (done) {
			request.get({url: url + '/api/reports/hour/' + app + '?event=application started&date=2013-09-29&hour=6', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				summary = res.body;
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
			request.get({url: url + '/api/reports/day/' + app + '?event=application started&date=2013-09-29', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				summary = res.body;
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
			request.get({url: url + '/api/reports/week/' + app + '?event=application started&date=2013-09-29', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				summary = res.body;
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
			request.get({url: url + '/api/reports/month/' + app + '?event=application started&date=2013-09-29', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				summary = res.body;
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
			request.get({url: url + '/api/reports/period/' + app + '?event=application started&from=2013-09-29&to=2013-09-30', headers: {'x-access-token': token}, json: true}, function (err, res) {
				error = err;
				summary = res.body;
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