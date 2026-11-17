# Built-in Node.js Modules

Node ships with a set of core modules for common tasks. Load them with `require()` using just the module name — no `./` needed.

```js
const path = require('path');  // built-in: no ./ prefix
const fs   = require('fs');
const os   = require('os');
```

If there is no built-in module with that name, Node looks for a file at that path in your project.

Full reference: [nodejs.org/docs](https://nodejs.org/docs)

---

## `path` — Working with File Paths

The `path` module provides utilities for working with file and directory paths, avoiding brittle string manipulation.

```js
const path = require('path');

const pathObj = path.parse(__filename);
console.log(pathObj);
```

Output:

```json
{
  "root": "/",
  "dir": "/Users/you/project",
  "base": "app.js",
  "ext": ".js",
  "name": "app"
}
```

| Property | Value |
|----------|-------|
| `root` | Filesystem root |
| `dir` | Directory containing the file |
| `base` | Full filename including extension |
| `ext` | File extension |
| `name` | Filename without extension |

Use `path.parse()` instead of manually splitting strings when you need parts of a path.

---

## `os` — Operating System Info

```js
const os = require('os');

const totalMemory = os.totalmem();
const freeMemory  = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory:  ${freeMemory}`);
```

> The backtick syntax (`` ` ``) is an **ES6 template string**. Use `${}` to embed expressions — no string concatenation needed.

Useful `os` methods:

| Method | Returns |
|--------|---------|
| `os.totalmem()` | Total RAM in bytes |
| `os.freemem()` | Free RAM in bytes |
| `os.uptime()` | System uptime in seconds |
| `os.userInfo()` | Current user details |

Before Node, JavaScript could not access OS-level information — it was locked inside the browser. Node opens this up by running JS outside the browser.

---

## `fs` — File System

The `fs` module lets you read, write, and manage files and directories.

### Every `fs` method comes in two forms

| Form | Example | Use |
|------|---------|-----|
| Synchronous (blocking) | `fs.readdirSync()` | Simple scripts only |
| Asynchronous (non-blocking) | `fs.readdir()` | Always prefer in real apps |

**Always use the async form** in production. Node is single-threaded — a synchronous file operation blocks the entire thread and prevents other clients from being served.

### Synchronous (for learning only)

```js
const fs = require('fs');

const files = fs.readdirSync('./');
console.log(files); // string array of files in current directory
```

### Asynchronous (preferred)

```js
const fs = require('fs');

fs.readdir('./', (err, files) => {
  if (err) {
    console.log('Error:', err);
    return;
  }
  console.log(files);
});
```

The second argument to async `fs` methods is a **callback** — a function Node calls when the operation completes. The callback always receives `(err, result)`:
- If the operation failed, `err` has the error and `result` is `null`
- If it succeeded, `err` is `null` and `result` has the data

```js
// Simulating an error by using a non-existent path:
fs.readdir('$invalid$', (err, files) => {
  if (err) {
    console.log('Error:', err); // ENOENT: no such file or directory
    return;
  }
  console.log(files);
});
```
