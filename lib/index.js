'use strict';
var util = require('util'),
    thunk = require('thunkify'),
    clientFactory = require('./client-factory');


exports = module.exports = function(pg) {
	var pgProto = Object.getPrototypeOf(pg);

	function CoPG() {
		CoPG.super_.apply(this, arguments);
	}
	util.inherits(CoPG, pgProto.constructor);

	CoPG.prototype.connect_ = thunk(pgProto.connect);
	CoPG.prototype.connectPromise = function() {
		var args = Array.prototype.slice.call(arguments);
		var self = this;
		return new Promise(function(resolve, reject) {
			args.push(function(err, client, done) {
				if (err) {
					return reject(err);
				} else {
					resolve([client, done]);
				}
			});
			self.connect.apply(self, args);
		});
	};

	var CoClient = clientFactory(pg);
	return new CoPG(CoClient);
};
