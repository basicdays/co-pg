'use strict';
var co = require('co'),
    should = require('chai').should(),
    pg = require('../lib')(require('pg')),
    testHelper = require('./test-helper');


var query = 'select name from person order by name';

describe('CoClient', function() {
	var connString = null;

	before(function(done) {
		co(function *() {
			var config = yield testHelper.getConfig();
			connString = config.connectionStrings.main;
		})(done);
	});

	describe('#connect_()', function() {
		it('should connect with a single connection', function(done) {
			co(function *() {
				var client = new pg.Client(connString);

				yield client.connect_();

				should.exist(client);
			})(done);
		});
	});

	describe('#query_()', function() {
		it('should query with single connection', function(done) {
			co(function *() {
				var client = new pg.Client(connString);
				yield client.connect_();

				var result = yield client.query_(query);

				should.exist(result);
			})(done);
		});


		it('should query with a pooled connection', function(done) {
			co(function *() {
				var connectResults = yield pg.connect_(connString);
				var client = connectResults[0];
				var clientDone = connectResults[1];

				var result = yield client.query_(query);
				clientDone();

				should.exist(result);
			})(done);
		});
	});
});
