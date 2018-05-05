[![Build Status](https://travis-ci.org/GeekAb/switch-registry.svg?branch=master)](https://travis-ci.org/GeekAb/switch-registry)

Simple utility to setup and switch between npm registries.
**Install**

```
npm install switch-registry -g
```

**Run programm with**
```
switch-registry {command} {args}
```

**Check program usage with**
```
switch-registry usage
```

**Possible commands**
----------------------------------------------
- init ( Initialize required files and entries )
- usage ( Display this help )
- ls ( Display list of added registries )
- list ( Same as ls )
- add ( Add a new registry )
- remove ( Remove an existing registry )
- change ( Change an existing registry )

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
switch-registry change <name>
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