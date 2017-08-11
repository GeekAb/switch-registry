'use strict';

var fs = require('fs');
var path = require('path');
var npm = require('npm');

//We will store all registry links at user level in .npmregistry file
var RPATH = process.env.HOME + '/.npmregistry';
var FILENAME = '.registryInfo';

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

/**
 * [fetchFileData description]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
function fetchFileData(str) {
	var data = '';
    try {
        data = JSON.parse(str);
    } catch (e) {
        return [];
    }
    return data;
}

function setup() {
	console.log('checking');
	//Create npmregistry
	if (!fs.existsSync(RPATH)) {
		//Create file
		fs.mkdirSync(RPATH);
	}

	//Fetch current registry
	//TODO: Think of a better way to manage this, we can use exec but
	//TODO: that is also not a very good idea
	var rc = require('rc')('npm');
	var url = ((rc.registry).slice(-1) === '/' )? rc.registry : rc.registry + '/';

	//Save current registry to registry file if its npmjs default registry
	//TODO : Will check for npmjs thing later, right now considering current one as default
	var regEntry = '>|'+url+'|default';

	fs.readFile(RPATH+'/'+FILENAME, 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
    		//TODO: Create file here and call add data function
		} else {
			console.log(data);
			//Convert file data to Object -- At this point it will be blank
			//TODO: Have to check if data is there
			//TODO: If data is there then normal additon will happen only if it's not there
			var currData = fetchFileData(data);
			//Adding default entry
			currData.push({name: 'Default', active: true, url: url});
			//Convert back to JSON string
			var newData = JSON.stringify(currData);
			fs.writeFile(RPATH+'/'+FILENAME, newData, 'utf8', function(err) {
				if (err) console.log(err);
				console.log('complete');
			});
		}});
		console.log('checking');
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
