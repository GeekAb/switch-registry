[![Build Status](https://travis-ci.org/GeekAb/switch-registry.svg?branch=master)](https://travis-ci.org/GeekAb/switch-registry)

Simple utility to setup and switch between npm registries.

**Install**

```
npm install switch-registry -g
```
We can use *npmrs* in place of *switch-registry*

**Run programm with**
```
switch-registry {command} {args}
```

**Check program usage with**
```
switch-registry or switch-registry usage
```

**Possible commands**
----------------------------------------------
- init ( Initialize required files and entries )
- usage ( Display this help )
- ls ( Display list of added registries )
- list ( Same as ls )
- add ( Add a new registry )
- remove ( Remove an existing registry )
- use ( Change an existing registry )
- change ( Same as use )

**List all npm registries**
```
switch-registry ls
```

**Add new npm registry to list**
```
switch-registry add <name> <url>
```

**Remove existing npm registry from list**
```
switch-registry remove <name>
```

**Change to another npm registry from list**
```
switch-registry use <name>
```


**Task List**

- [x] Create base setup, file and folder structure
- [x] Show usage information
- [x] Show list of existing entries
- [x] Adding new entries to list
- [ ] Addition should happen for unique url
- [x] Addition should happen for unique keys
- [ ] Addition should happen for valid urls
- [x] Removing entries from list
- [x] Changing existing entries
- [ ] Change registry should look for invalid entries and respond with proper message
- [x] Changing/Setting up registry
- [ ] Add unit test cases
- [ ] Add default support for popular npm repos
        npm -----  https://registry.npmjs.org/
        cnpm ----  http://r.cnpmjs.org/
        taobao --  https://registry.npm.taobao.org/
        skimdb --  https://skimdb.npmjs.com/registry
        yarn ----  https://registry.yarnpkg.com
- [ ] Add testing function to test current entries and response time
- [ ] Add short commands
- [ ] Auto switch
    - [ ] Enable Auto switch
    - [ ] Disable Auto switch
    - [ ] Setup Auto switch for project/folder
    - [ ] Remove Auto switch for project/folder
- [ ] Update to ES6

**Updates**

**Version 1.2.0**
* Support for yarn registry update
* By default following will change registry for both npm and yarn
```
switch-registry use <name>
```
* We need to pass another parameter npm or yarn to switch registry for that.
For example, to change registry for yarn only
```
switch-registry use <name> yarn
```

**Version 1.1.9**
* Bug fixes

**Version 1.1.8**
* Upgraded versions of all dependecies.
