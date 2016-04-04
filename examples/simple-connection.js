#!/usr/bin/env node
'use strict';
let co = require('co');
let pg = require('../')(require('pg'));
let testHelper = require('../test/test-helper');

co(function* connectExample() {
	try {
		let config = yield testHelper.getConfig();

		let client = new pg.Client(config.connectionStrings.main);
		yield client.connectPromise();

		let result = yield client.queryPromise('select now() as "theTime"');
		console.log(result.rows[0].theTime);

		client.end();
	} catch (ex) {
		console.error(ex);
	}
});
