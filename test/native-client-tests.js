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

	describe('#connectPromise()', function() {
		it('should connect with a single connection', function() {
			return co(function*() {
				let client = new pg.Client(connString);

				yield client.connectPromise();

				should.exist(client);
			});
		});
	});

	describe('#queryPromise()', function() {
		it('should query with single connection', function() {
			return co(function*() {
				let client = new pg.Client(connString);
				yield client.connectPromise();

				let result = yield client.queryPromise(query);

				should.exist(result);
			});
		});


		it('should query with a pooled connection', function() {
			return co(function*() {
				let connectResults = yield pg.connectPromise(connString);
				let client = connectResults[0];
				let clientDone = connectResults[1];

				let result = yield client.queryPromise(query);
				clientDone();

				should.exist(result);
			});
		});
	});

	describe('#connect_()', function() {
		it('should connect with a single connection', function() {
			return co(function*() {
				let client = new pg.Client(connString);

				yield client.connect_();

				should.exist(client);
			});
		});
	});

	describe('#query_()', function() {
		it('should query with single connection', function() {
			return co(function*() {
				let client = new pg.Client(connString);
				yield client.connect_();

				let result = yield client.query_(query);

				should.exist(result);
			});
		});


		it('should query with a pooled connection', function() {
			return co(function*() {
				let connectResults = yield pg.connect_(connString);
				let client = connectResults[0];
				let clientDone = connectResults[1];

				let result = yield client.query_(query);
				clientDone();

				should.exist(result);
			});
		});
	});
});
