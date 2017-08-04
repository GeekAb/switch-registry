'use strict';

var fs = require('fs');
var path = require('path');
var npm = require('npm');

//We will store all registry links at user level in .npmregistry file
var DIR = process.env.HOME + '/.npmregistry';

/**
 * Module exports.
 * @public
 */

module.exports.usage = usage;
module.exports.list = list;
module.exports.add = add;
module.exports.remove = remove;
module.exports.change = change;

/**
 * [usage description]
 * @return {[type]} [description]
 */
function usage () {
	console.log('usage');
}

/**
 * Function will list down all added registry
 * @param {[type]} args [description]
 */
function list (args) {
	console.log('list');
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
