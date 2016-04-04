'use strict';
let util = require('util');
let promissory = require('promissory');
let clientFactory = require('./client-factory');


exports = module.exports = function(pg) {
	let pgProto = Object.getPrototypeOf(pg);

	function CoPG() {
		CoPG.super_.apply(this, arguments);
	}
	util.inherits(CoPG, pgProto.constructor);

	CoPG.prototype.connectAsync = promissory(pgProto.connect);
	// for backwards compatibility
	CoPG.prototype.connectPromise = CoPG.prototype.connectAsync;

	let CoClient = clientFactory(pg);
	return new CoPG(CoClient);
};
