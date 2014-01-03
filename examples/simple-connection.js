'use strict';
var co = require('co'),
    pg = require('../'),
    testHelper = require('../test/test-helper');

co(function *connectExample() {
	try {
		var config = yield testHelper.getConfig();

		var client = new pg.Client(config.connectionStrings.main);
		yield client.connect_();

		var result = yield client.query_('select now() as "theTime"');
		console.log(result.rows[0].theTime);

		client.end();
	} catch(ex) {
		console.error(ex);
	}
})();
