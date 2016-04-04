'use strict';
let co = require('co');
let should = require('chai').should();
let pg = require('../lib')(require('pg'));
let testHelper = require('./test-helper');


describe('CoPG', function() {
	let connString = null;

	before(function() {
		return co(function*() {
			let config = yield testHelper.getConfig();
			connString = config.connectionStrings.main;
		});
	});

	describe('#connectPromise()', function() {
		it('should connect a pool', function() {
			return co(function*() {
				let results = yield pg.connectPromise(connString);
				let client = results[0];
				let clientDone = results[1];

				should.exist(client);
				clientDone();
			});
		});
	});

	describe('#connect_()', function() {
		it('should connect a pool', function() {
			return co(function*() {
				let results = yield pg.connect_(connString);
				let client = results[0];
				let clientDone = results[1];

				should.exist(client);
				clientDone();
			});
		});
	});
});
