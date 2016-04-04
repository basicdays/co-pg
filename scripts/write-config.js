#!/usr/bin/env node
'use strict';
let fs = require('fs');
let program = require('commander');


program
	.option('-c, --connection-string <connString>', 'set connection string', '/run/postgresql')
	.parse(process.argv);


let config = {
	connectionStrings: {
		main: {
			database: 'co_pg',
			host: program.connectionString,
		},
	},
};
let configJson = JSON.stringify(config, null, '\t');
fs.writeFile('config.json', configJson, 'utf8', function(err) {
	if (err) { throw (err); }
});
