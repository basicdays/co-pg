'use strict';
var util = require('util'),
    thunk = require('thunkify');


function constructNativeClient(Client) {
	//var ClientRef = Client;
	function CoClient() {
		ClientRef.apply(this, arguments);
		this.connect_ = thunk(this.connect);
		this.query_ = thunk(this.query);
	}
	return CoClient;
}

function constructJsClient(Client) {
	function CoClient() {
		CoClient.super_.apply(this, arguments);
	}
	util.inherits(CoClient, Client);

	CoClient.prototype.connect_ = thunk(Client.prototype.connect);
	CoClient.prototype.query_ = thunk(Client.prototype.query);

	return CoClient;
}

exports = module.exports = function(pg) {
	var Client = pg.Client;
	if (Client.prototype.connect) {
		return constructJsClient(Client);
	} else {
		return constructNativeClient(Client);
	}
};
