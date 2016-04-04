'use strict';
let util = require('util');
let promissory = require('promissory');


function buildJsClient(Client) {
	function CoClient() {
		CoClient.super_.apply(this, arguments);
	}
	util.inherits(CoClient, Client);

	CoClient.prototype.connectAsync = promissory(Client.prototype.connect);
	CoClient.prototype.queryAsync = promissory(Client.prototype.query);

	//for backwards compatibility
	CoClient.prototype.connectPromise = CoClient.prototype.connectAsync;
	CoClient.prototype.queryPromise = CoClient.prototype.queryAsync;

	return CoClient;
}

/**
 * Wrap the `pg` `clientBuilder` function to add co extensions.
 *
 * Since the exposed `clientBuilder` function from `pg.native` is a simple function that wraps the
 * construction of a native client connection, we don't have easy access to the prototype to inherit
 * prior to construction of the connection. Instead, we call the `pg` `connectionBuilder` to get an instance
 * of the connection and add additional methods directly to the constructed object. The methods are *not*
 * added to the `pg` `Connection` prototype however, as that would alter the prototype in `pg`, and would
 * increase the `co-pg` footprint beyond constructed objects that have been tunneled through this package.
 *
 * @param {function} clientBuilder the native client builder from `pg`
 * @returns {function} the native client builder with co extensions
 */
function buildNativeCoClientBuilder(clientBuilder) {
	return function nativeCoClientBuilder(config) {
		var connection = clientBuilder(config);

		connection.connectAsync = promissory(connection.connect);
		connection.queryAsync = promissory(connection.query);

		// for backwards compatibility
		connection.connectPromise = connection.connectAsync;
		connection.queryPromise = connection.queryAsync;

		return connection;
	};
}

exports = module.exports = function(pg) {
	let Client = pg.Client;

	//determine if `Client` is a Client prototype or a native client builder
	if (Client.prototype.connect) {
		return buildJsClient(Client);
	} else {
		return buildNativeCoClientBuilder(Client);
	}
};
