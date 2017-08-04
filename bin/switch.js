#!/usr/bin/env node
'use strict';

var switcher = require('../index.js');

// Delete the 0 and 1 argument (node and switch.js)
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument as command to be followed
var cmd = args[0] || 'usage';

switcher[cmd]();
