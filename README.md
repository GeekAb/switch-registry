[![Build Status](https://travis-ci.org/GeekAb/switch-registry.svg?branch=master)](https://travis-ci.org/GeekAb/switch-registry)

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
- usage ( Display this help )
- list ( Display list of added registries )
- add ( Add a new registry )
- remove ( Remove an existing registry )
- change ( Change an existing registry )


**Task List**

- [x] Create base setup, file and folder structure
- [x] Show usage information
- [x] Show list of existing entries
- [x] Adding new entries to list
- [ ] Addition should happen for unique url and keys
- [ ] Removing entries from list
- [x] Changing existing entries
- [ ] Change registry should look for invalid entries and respond with proper message
- [x] Changing/Setting up registry