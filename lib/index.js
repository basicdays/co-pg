'use strict';
var util = require('util'),
    pg = require('pg'),
    thunk = require('thunkify'),
    CoClient = require('./client');


var pgProto = Object.getPrototypeOf(pg);
function CoPG() {
	CoPG.super_.apply(this, arguments);
}
util.inherits(CoPG, pgProto.constructor);

CoPG.prototype.connect_ = thunk(pgProto.connect);

exports = module.exports = new CoPG(CoClient);
