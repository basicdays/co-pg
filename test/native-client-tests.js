'use strict';
let co = require('co');
let should = require('chai').should();
let pg = require('../lib')(require('pg').native);
let testHelper = require('./test-helper');


let query = 'select name from person order by name';

describe('CoClient-Native', function() {
	let connString = null;

	before(function() {
		return co(function*() {
			let config = yield testHelper.getConfig();
			connString = config.connectionStrings.main;
		});
	});

	describe('#connectAsync()', function() {
		it('should connect with a single connection', function() {
			return co(function*() {
				let client = new pg.Client(connString);

				yield client.connectAsync();

				should.exist(client);
			});
		});
	});

	describe('#queryAsync()', function() {
		it('should query with single connection', function() {
			return co(function*() {
				let client = new pg.Client(connString);
				yield client.connectAsync();

				let result = yield client.queryAsync(query);

				should.exist(result);
			});
		});


		it('should query with a pooled connection', function() {
			return co(function*() {
				let connectResults = yield pg.connectAsync(connString);
				let client = connectResults[0];
				let clientDone = connectResults[1];

				let result = yield client.queryAsync(query);
				clientDone();

				should.exist(result);
			});
		});
	});

	describe('#queryPromise()', function() {
		it('should be an alias of #queryAsync', function() {
			return co(function*() {
				let client = new pg.Client(connString);
				client.queryPromise.should.equal(client.queryAsync);
			});
		});
	});
});
