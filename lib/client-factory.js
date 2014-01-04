'use strict';
var util = require('util'),
    thunk = require('thunkify');


exports = module.exports = function(pg) {
	var Client = pg.Client;
	function CoClient() {
		CoClient.super_.apply(this, arguments);
	}
	util.inherits(CoClient, Client);

	CoClient.prototype.connect_ = thunk(Client.prototype.connect);
	CoClient.prototype.query_ = thunk(Client.prototype.query);

	return CoClient;
};
