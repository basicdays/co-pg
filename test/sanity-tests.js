'use strict';
var co = require('co'),
		should = require('chai').should(),
		pg = require('pg').native,
		testHelper = require('./test-helper');


var query = 'select name from person order by name';

describe('Client', function() {
	var connString = null;

	before(function(done) {
		co(function *() {
			var config = yield testHelper.getConfig();
			connString = config.connectionStrings.main;
		})(done);
	});

	describe('#connect()', function() {
		it('should connect with a single connection', function(done) {
			var client = new pg.Client(connString);

			client.connect(function(err) {
				if (err) { throw err; }
				should.exist(client);
				done();
			});
		});
	});

	describe('#query()', function() {
		it('should query with single connection', function(done) {
			var client = new pg.Client(connString);
			client.connect(function(err) {
				if (err) { throw err; }

				client.query(query, function(err, result) {
					if (err) { throw err; }
					should.exist(result);
					done();
				});
			});
		});


		it('should query with a pooled connection', function(done) {
			pg.connect(connString, function(err, client, connectDone) {
				if (err) { throw err; }
				client.query(query, function(err, result) {
					if (err) { throw err; }
					connectDone();
					should.exist(result);
					done();
				});
			});
		});
	});
});
