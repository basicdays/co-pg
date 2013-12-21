'use strict';
var util = require('util'),
		Client = require('pg').Client,
		thunk = require('thunkify');


function CoClient() {
	CoClient.super_.apply(this, arguments);
}
util.inherits(CoClient, Client);

CoClient.prototype.connect_ = thunk(Client.prototype.query);
CoClient.prototype.query_ = thunk(Client.prototype.query);

exports = module.exports = CoClient;
