#!/usr/bin/env node
'use strict';
let fs = require('fs');

let switcher = require('../index.js');

//We will store all registry links at user level in .npmregistry file
const RPATH = process.env.HOME + '/.npmregistry';
const FILENAME = '.registryInfo';

const possibleActions = ['usage','init','ls','list','add','remove','change'];

// Delete the 0 and 1 argument (node and switch.js)
const args = process.argv.splice(process.execArgv.length + 2);
console.log(checkArgs(possibleActions, args[0]));
// Retrieve the first argument as command to be followed
const cmd = checkArgs(possibleActions, args[0]) > 0 ? args[0] : 'usage';

if (!fs.existsSync(RPATH)) {
	switcher.setup();
} else {
	fs.readFile(RPATH+'/'+FILENAME, 'utf8', function readFileCallback(err, data){
		if (err){
			switcher.setup();
		} else {
			if(!data)
				switcher.setup();
		}
	});
}

switcher[cmd](args);
