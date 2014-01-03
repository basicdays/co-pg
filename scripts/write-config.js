#!/usr/bin/env node
'use strict';
var fs = require('fs'),
    program = require('commander');


program
	.option('-c, --connection-string <connString>', 'set connection string', 'postgres://localhost/node_postgres')
	.parse(process.argv);


var config = {connectionStrings: {main: program.connectionString}};
var configJson = JSON.stringify(config, null, '\t');
fs.writeFile('config.json', configJson, 'utf8', function(err) {
	if (err) { throw (err); }
});
