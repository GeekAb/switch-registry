/*jslint node: true */
"use strict";

var fs = require("fs");
var rc = require("rc")("npm");
var npm = require("npm");

var STATIC = require("./constant");

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

function checkArgs(possibleActions, cmd) {
    return possibleActions.indexOf(cmd);
}

/**
 * [usage description]
 * @return {[type]} [description]
 */
function usage(message) {
    if (message === "error") {
        console.log("Oopps there is something wrong. Check your params.");
    }

    console.log(`   
        You can run Switch Registry as 
        ${STATIC.COLORS.FgGreen}
        switch-registry {command} {arguments}
        ${STATIC.COLORS.Reset}
        ----------------------------------------------
        Command         Description
        ----------------------------------------------
        init        |   Initialize base files and entries
        usage       |   Display this help
        ls          |   Display list of added registries
        add         |   Add a new registry
        remove      |   Remove an existing registry
        use         |   Change to other existing registry

        Short Command npmrs
        --------------------
        npmrs {command} {arguments}
    
    `);
    return "";
}

/**
 * [fetchFileData description]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
function fetchFileData(str) {
    var data = "";
    try {
        return JSON.parse(str);
    } catch (e) {
        return {}; //Just return blank if there is any error
        //TODO : Need to check if this failure will case any issue.
    }
}

/**
 * [showFormatedData Function will show all added registries and mark currently active one]
 * @param  {object}  data [will contain single entry of added registry]
 */
function showFormatedData (data) {
    var activeMark = '';

    //Check and mark active registry with > symbol 
    if(data.active === true) {
        activeMark = '>';
    }

    console.log(` ${activeMark} `,`  ${data.name}    `,`${data.url}`);
    return true;
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
                showFormatedData(currData[key]);
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

    /* Proceed only if parameters are all valid */
    if (
        checkRequiredParams(args.length, STATIC.REQ_PARAM_LEN.add) &&
        validateUrl(args[2]) &&
        validateKey(args[1])
    ) {
        fs.readFile(RPATH + "/" + FILENAME, "utf8", function (err, data) {
            if (err) {
                init();
                //TODO: Create file here and call add data function
            } else {
                //Convert file data to Object
                currData = fetchFileData(data);

                if (typeof currData[args[1]] === "undefined") {
                    currData[args[1]] = { name: args[1], active: false, url: args[2] };

                    fs.writeFile(
                        RPATH + "/" + FILENAME,
                        JSON.stringify(currData),
                        function (err) {
                            if (err) throw err;
                            console.log(
                                `New registry entry with key ${args[1]} added successfully.`
                            );
                        }
                    );
                } else {
                    console.log(`${STATIC.COLORS.FgRed}Another entry with key "${
                        args[1]
                        }" already exist, Please use another key to add
                    ${STATIC.COLORS.Reset}`);
                }
            }
        });
    } else {
        console.log("Error. Please check params.");
    }
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
                        var newR = npm.config.get("registry");

                        console.log(`  
    npm registry is set to ${STATIC.COLORS.FgGreen}${newR}${STATIC.COLORS.Reset }
    Updating configurations ....`);

                        //Setting all active to false
                        for(var key in currData) {
                            if (currData.hasOwnProperty(key)) {
                                currData[key].active = false;
                            }
                        }

                        //Setting newly activated registry to active
                        currData[args[1]].active = true;

                        

                        //Update settings with new changes
                        fs.writeFile(RPATH + "/" + FILENAME, JSON.stringify(currData), function (
                            err
                        ) {
                            if (err) throw err;
                            console.log(`    All Done.!!!`);
                        });
                    });
                } else {
                    console.log(` No registry exist with ${args[1]}. Please use switch-registry ls to list all existing entries.`)
                }
            }
        });
    });
}

function showErrors(options) { }

/**
 * Function will validate if required number of parameters are passed
 * @param  number argsLength [length of parameters passed]
 * @param  number requiredLength [length of required parameters]
 * @return boolean
 */
function checkRequiredParams(argsLength, requiredLength) {
    if (argsLength - 1 < requiredLength) {
        return false;
    }

    return true;
}

/**
 * Function will validate given url
 * @param  string url; return boolean
 */
function validateUrl(url) {
    return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(url);
}

function validateKey(key) {
    return /^[a-z0-9]+$/i.test(key);
}
