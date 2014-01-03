'use strict';
var co = require('co'),
    pg = require('../'),
    testHelper = require('../test/test-helper');

co(function *poolExample() {
	try {
		var config = yield testHelper.getConfig();

		var connectResults = yield pg.connect_(config.connectionStrings.main);
		var client = connectResults[0];
		var done = connectResults[1];

		var result = yield client.query_('select now() as "theTime"');
		//call `done()` to release the client back to the pool
		done();

		console.log(result.rows[0].theTime);
	} catch(ex) {
		console.error(ex.toString());
	}
})();
