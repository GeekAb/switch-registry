#!/usr/bin/env node
'use strict';
var fs = require('fs');

var switcher = require('../index.js');

//We will store all registry links at user level in .npmregistry file
var RPATH = process.env.HOME + '/.npmregistry';
var FILENAME = '.registryInfo';

var possibleActions = ['usage', 'init', 'ls', 'list', 'add', 'remove', 'change', 'use'];

// Delete the 0 and 1 argument (node and switch.js)
var args = process.argv.splice(process.execArgv.length + 2);
// Retrieve the first argument as command to be followed
var cmd = switcher.checkArgs(possibleActions, args[0]) >= 0 ? args[0] : "usage";

if (!fs.existsSync(RPATH)) {
    switcher.init();
} else {
    fs.readFile(RPATH + '/' + FILENAME, 'utf8', function readFileCallback(err, data) {
        if (err) {
            switcher.init();
        } else {
            if (!data)
                switcher.init();
        }
    });
}

switcher[cmd](args);