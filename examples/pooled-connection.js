#!/usr/bin/env node
'use strict';
let co = require('co');
let pg = require('../')(require('pg'));
let testHelper = require('../test/test-helper');

co(function* poolExample() {
	try {
		let config = yield testHelper.getConfig();

		let connectResults = yield pg.connectPromise(config.connectionStrings.main);
		let client = connectResults[0];
		let done = connectResults[1];

		let result = yield client.queryPromise('select now() as "theTime"');
		//call `done()` to release the client back to the pool
		done();

		console.log(result.rows[0].theTime);
		process.exit();
	} catch (ex) {
		console.error(ex.toString());
	}
});
