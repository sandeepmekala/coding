# Node Module System

## Global Objects

In browsers, global variables and functions live on the `window` object:

```js
window.console.log('hello');  // same as console.log('hello')
window.setTimeout(() => {}, 1000);
```

In Node, the equivalent is the **`global` object**:

```js
global.console.log('hello');
global.setTimeout(() => {}, 1000);
```

### Key difference: variables are NOT added to `global`

In browsers, a variable declared at the top level is added to `window`. In Node, it is **not** added to `global` — it is scoped to its file (module).

```js
var message = 'hello';
console.log(global.message); // undefined
```

This is by design — Node's **module system** ensures variables are private to their file.

---

## Modules

### The Problem with Global Scope

In browser JavaScript, functions declared globally go into `window`:

```js
function sayHello() { ... } // added to window.sayHello
```

If two files define `sayHello`, the second **overwrites** the first — a bug waiting to happen in large applications.

### Node's Solution: Every File is a Module

In Node, **every file is a module**. Variables and functions defined in a file are **scoped to that file** (private by default).

- To use something from another module, you must **explicitly export** it.
- This prevents name collisions and makes code easier to maintain.

Every Node application has at least one file: the **main module** (typically `app.js`).

### The `module` Object

Each file has access to a `module` object:

```js
console.log(module);
```

Output (JSON-like):

```json
{
  "id": ".",
  "exports": {},
  "filename": "/path/to/app.js",
  "loaded": false,
  "children": [],
  "paths": [...]
}
```

The `exports` property is what other modules receive when they `require()` this module.

---

## Creating a Module

Create `logger.js`:

```js
const url = 'http://mylogger.io/log';  // private — not exported

function log(message) {
  // In real code: send HTTP request to url
  console.log(message);
}

module.exports.log = log;
// url is intentionally kept private (implementation detail)
```

Think of it like a DVD player:
- **Public buttons** = exported members (`log`)
- **Internal components** = private implementation (`url`)

### Exporting a Single Function

If a module has only one thing to export, you can export it directly:

```js
module.exports = log;  // export the function itself, not an object
```

---

## Loading a Module

Use the `require()` function to load a module. It returns whatever that module exported.

### Loading a local module (same folder)

```js
const logger = require('./logger');  // .js extension is optional
```

- `./` = current folder
- `../` = parent folder
- `./subfolder/logger` = subfolder

### Using the exported object

```js
// If logger.js exports an object with a log method:
const logger = require('./logger');
logger.log('message');
```

### Using the exported function directly

```js
// If logger.js exports the function directly (module.exports = log):
const log = require('./logger');
log('message');
```

### Use `const`, not `let` or `var`

```js
const logger = require('./logger');  // correct

let logger = require('./logger');    // risky — can be accidentally overwritten
logger = 1;                          // now logger.log() throws at runtime
```

Using `const` causes an error at **compile time** (caught by tools like JSHint) rather than silently failing at runtime.

---

## Module Wrapper Function

You might wonder: how does Node scope variables to a file? The answer is the **Module Wrapper Function**.

Node does **not** execute your file's code directly. Before execution, it wraps every module's code in a function like this:

```js
(function(exports, require, module, __filename, __dirname) {
  // Your module code here
});
```

This is an **IIFE** (Immediately Invoked Function Expression). The wrapper is what makes these values available inside every module:

| Argument | What it is |
|----------|-----------|
| `exports` | Shortcut to `module.exports` |
| `require` | Function to load other modules |
| `module` | The module object itself |
| `__filename` | Full path to this file |
| `__dirname` | Full path to the directory containing this file |

These are **not global** — they look global but are actually parameters injected by the wrapper function into each module.

### `exports` vs `module.exports`

`exports` is a shortcut reference to `module.exports`:

```js
// These two are equivalent:
module.exports.log = log;
exports.log = log;
```

But you **cannot reset** `exports` directly:

```js
exports = log;        // WRONG — breaks the reference, nothing gets exported
module.exports = log; // correct — replaces the exported value
```

### `__filename` and `__dirname`

```js
console.log(__filename); // /Users/you/project/logger.js
console.log(__dirname);  // /Users/you/project
```

---

## Summary

| Concept | Key Point |
|---------|-----------|
| Every file is a module | Variables/functions are private by default |
| `module.exports` | What you expose to the outside world |
| `require('./path')` | Load another module; returns its exports |
| Use `const` for requires | Prevents accidental overwriting |
| Export an object | When you have multiple methods/properties |
| Export a function | When there's a single thing to expose |
| Module Wrapper Function | Node wraps each file in a function — that's why `require`, `module`, `__filename`, `__dirname` exist |
| `exports` shortcut | Same as `module.exports` but cannot be reassigned |
