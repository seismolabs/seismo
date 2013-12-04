var request = require('request');
var testUtils = require('../utils');

describe('auth.spec.js', function () {
	var url, credentials, response, body;

	beforeEach(function () {
		url = testUtils.getRootUrl() + '/auth';
	});

	describe('when user logins', function (argument) {

		describe('when missing fields', function () {
			// TODO:
		});

		describe('with wrong credentials', function () {
			beforeEach(function () {
				credentials = {
					username: 'seismo',
					password: 'wrongpass'
				};
			});

			beforeEach(function (done) {
				request.post({url: url, body: credentials, json: true}, function (err, res, bod) {
					response = res;
					body = bod;
					done(err);
				});
			});

			it('should return 401 (unauthorized)', function () {
				expect(response.statusCode).to.equal(401);
			});

		});

		describe('with right credentials', function () {
			beforeEach(function () {
				credentials = {
					username: 'seismo',
					password: 'mypass'
				};
			});

			beforeEach(function (done) {
				request.post({url: url, body: credentials, json: true}, function (err, res, bod) {
					response = res;
					body = bod;
					done(err);
				});
			});

			it('should return 200', function () {
				expect(response.statusCode).to.equal(200);
			});

			it ('should get access token', function () {
				expect(body.token).to.be.ok;
			});
		});
	});
});