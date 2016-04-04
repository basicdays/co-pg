'use strict';
let util = require('util');
let thunk = require('thunkify');
let promissory = require('promissory');
let clientFactory = require('./client-factory');


exports = module.exports = function(pg) {
	let pgProto = Object.getPrototypeOf(pg);

	function CoPG() {
		CoPG.super_.apply(this, arguments);
	}
	util.inherits(CoPG, pgProto.constructor);

	CoPG.prototype.connect_ = thunk(pgProto.connect);
	CoPG.prototype.connectPromise = promissory(pgProto.connect);

	let CoClient = clientFactory(pg);
	return new CoPG(CoClient);
};
