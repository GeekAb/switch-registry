'use strict';

var fs = require('fs');
var path = require('path');
var npm = require('npm');

//We will store all registry links at user level in .npmregistry file
var RPATH = process.env.HOME + '/.npmregistry';

/**
 * Module exports.
 * @public
 */

module.exports.usage = usage;
module.exports.setup = setup;
module.exports.list = list;
module.exports.add = add;
module.exports.remove = remove;
module.exports.change = change;

/**
 * [usage description]
 * @return {[type]} [description]
 */
function usage () {
	console.log('You can run Switch Registry as ');
	console.log('switch-registry {command} {arguments}');
	console.log('----------------------------------------------');
	console.log('Command       Description                     ');
	console.log('----------------------------------------------');
	console.log('usage       | Display this help');
	console.log('list        | Display list of added registries');
	console.log('add         | Add a new registry');
	console.log('remove      | Remove an existing registry');
	console.log('change      | Change an existing registry');
};

function setup() {
	//Create npmregistry
	if (!fs.existsSync(RPATH)) {
		//Create file
		fs.mkdirSync(RPATH);

		//Fetch current registry
		//TODO: Think of a better way to manage this, we can use exec but
		//TODO: that is also not a very good idea
		var rc = require('rc')('npm');
		var url = ((c.registry).slice(-1) === '/' )? c.registry : c.registry + '/';

		//Save current registry to registry file if its npmjs default registry
	}
}

/**
 * Function will list down all added registry
 * @param {[type]} args [description]
 */
function list (args) {

};

/**
 * Function will add new custom registry
 * @param {[type]} args [description]
 */
function add (args) {
	console.log('add');
}

/**
 * Function will remove existing custom registry by name
 * @param  {[type]} args [description]
 */
function remove (args) {
	console.log('remove');
}

/**
 * Function will change any existing custom registry by name
 * @param  {[type]} args [description]
 */
function change (args) {
	console.log('change');
}
