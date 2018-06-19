/*jslint node: true */
"use strict";

var fs = require("fs");
var rc = require("rc")("npm");
var npm = require("npm");

//We will store all registry links at user level in .npmregistry file
var RPATH = process.env.HOME + "/.npmregistry";
var FILENAME = ".registryInfo";

/**
 * Module exports.
 * @public
 */

module.exports.usage = usage;
module.exports.init = init;
module.exports.ls = list;
module.exports.list = list;
module.exports.add = add;
module.exports.remove = remove;
module.exports.use = change;
module.exports.change = change;
module.exports.checkArgs = checkArgs;

function checkArgs (possibleActions, cmd) {
    return possibleActions.indexOf(cmd);
}

/**
 * [usage description]
 * @return {[type]} [description]
 */
function usage (message) {

    if (message === "error") {
        console.log("Oopps there is something wrong. Check your params.");
    }

    console.log("");
    console.log("   You can run Switch Registry as ");
    console.log("");
    console.log("   switch-registry {command} {arguments}");
    console.log("");
    console.log("   ----------------------------------------------");
    console.log("   Command       Description                     ");
    console.log("   ----------------------------------------------");
    console.log("   init        | Initialize base files and entries");
    console.log("   usage       | Display this help");
    console.log("   ls          | Display list of added registries");
    console.log("   add         | Add a new registry");
    console.log("   remove      | Remove an existing registry");
    console.log("   use         | Change to other existing registry");
    console.log("");
    console.log("   Short Command npmrs");
    console.log("   --------------------");
    console.log("   npmrs {command} {arguments}");
    console.log("");

    return '';
}

/**
 * [fetchFileData description]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
function fetchFileData (str) {
    var data = "";
    try {
        return JSON.parse(str);
    } catch (e) {
        return {}; //Just return blank if there is any error
        //TODO : Need to check if this failure will case any issue.
    }
}

function showFormatedData(data) {
    var displayStr = "";
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (displayStr !== "") {
                displayStr += " | ";
            }

            if (key === "active" && data[key] === true) {
                displayStr = ">  " + displayStr;
            } else {
                displayStr += data[key];
            }
        }
    }

    return displayStr;
}

function addToFile(data) {
    fs.writeFile(RPATH + "/" + FILENAME, JSON.stringify(data), "utf8", function (
        err
    ) {
        if (err) console.log(err);
    });
}

function getCurrentRegistry() {
    //Fetch current registry
    //TODO: Think of a better way to manage this, we can use exec but
    //TODO: that is also not a very good idea
    try {
        return rc.registry.slice(-1) === "/" ? rc.registry : rc.registry + "/";
    } catch (e) {
        return "https://registry.npmjs.org/";
    }
}

function initRegistryFile(data) {
    //Convert file data to Object -- At this point it will be blank
    //TODO: Have to check if data is there
    //TODO: If data is there then normal additon will happen only if it's not there
    var url = getCurrentRegistry();

    var currData = fetchFileData(data);

    //Adding default entry
    currData.Default = { name: "Default", active: true, url: url };
    //Convert back to JSON string
    addToFile(currData);
}

function init() {
    //Create npmregistry
    if (!fs.existsSync(RPATH)) {
        //Create file
        fs.mkdirSync(RPATH);
    }
    //Save current registry to registry file if its npmjs default registry
    //TODO : Will check for npmjs thing later, right now considering current one as default

    fs.readFile(RPATH + "/" + FILENAME, "utf8", function readFileCallback(
        err,
        data
    ) {
        if (err) {
            fs.open(RPATH + "/" + FILENAME, "w+", function readFileCallback(
                err,
                data
            ) {
                console.log("this is another place");
                initRegistryFile("");
            });
            //TODO: Create file here and call add data function
        } else {
            initRegistryFile(data);
        }
    });
}

/**
 * Function will list down all added registry
 * @param {[type]} args [description]
 */
function list(args) {
    fs.readFile(RPATH + "/" + FILENAME, "utf8", function readFileCallback(
        err,
        data
    ) {
        if (err) {
            init();
            //TODO: Create file here and call add data function
        } else {
            //Convert file data to Object -- At this point it will be blank
            var currData = fetchFileData(data);

            for (var key in currData) {
                console.log(showFormatedData(currData[key]));
            }
        }
    });
}

/**
 * Function will add new custom registry
 * @param {[type]} args [description]
 */
function add(args) {
    var currData = {};

    fs.readFile(RPATH + "/" + FILENAME, "utf8", function (err, data) {
        if (err) {
            init();
            //TODO: Create file here and call add data function
        } else {
            //Convert file data to Object
            currData = fetchFileData(data);

            if (typeof currData[args[1]] === "undefined") {
                currData[args[1]] = { name: args[1], active: false, url: args[2] };

                fs.writeFile(RPATH + "/" + FILENAME, JSON.stringify(currData), function (
                    err
                ) {
                    if (err) throw err;
                    console.log("complete");
                });
            } else {
                console.log(
                    "entry with this key already exist, Please use another key to add"
                );
            }
        }
    });
}

/**
 * Function will remove existing custom registry by name
 * @param  {[type]} args [description]
 */
function remove(args) {
    var currData = {};

    fs.readFile(RPATH + "/" + FILENAME, "utf8", function (err, data) {
        if (err) {
            init();
            //TODO: Create file here and call add data function
        } else {
            //Convert file data to Object
            currData = fetchFileData(data);

            if (currData[args[1]]) {
                delete currData[args[1]];

                fs.writeFile(RPATH + "/" + FILENAME, JSON.stringify(currData), function (
                    err
                ) {
                    if (err) throw err;
                    console.log("complete");
                });
            }
        }
    });
}

/**
 * Function will change any existing custom registry by name
 * @param  {[type]} args [description]
 */
function change(args) {
    npm.load(function (err) {
        if (err) return "";

        fs.readFile(RPATH + "/" + FILENAME, "utf8", function (err, data) {
            if (err) {
                init();
                //TODO: Create file here and call add data function
            } else {
                //Convert file data to Object
                var currData = fetchFileData(data);

                if (currData[args[1]]) {
                    var changeTo = currData[args[1]];

                    npm.commands.config(["set", "registry", changeTo.url], function (
                        err,
                        data
                    ) {
                        if (err) return "";
                        console.log("                        ");
                        var newR = npm.config.get("registry");
                        console.log(["", "   Registry has been set to: " + newR, ""]);
                    });
                }
            }
        });
    });
}
