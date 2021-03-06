'use strict';
let EventEmitter = require('events').EventEmitter;
let co = require('co');
let fs = require('co-fs');


let configEmitter = new EventEmitter();
let config = null;
exports.getConfig = function() {
	return function(next) {
		if (config) {
			next(null, config);
		} else {
			configEmitter.on('parse', next);
		}
	};
};

co(function* readConfig() {
	let file = yield fs.readFile('config.json', 'utf8');
	config = JSON.parse(file);
	configEmitter.emit('parse', null, config);
});
