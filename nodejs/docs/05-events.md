# Events in Node.js

## The Events Module

An **event** is a signal that something has happened in your application. Many of Node's core classes are built on events — for example, an HTTP server raises an event each time it receives a request.

Node provides the `events` module with the `EventEmitter` class as its core building block.

```js
const EventEmitter = require('events');
```

> Convention: class names use **PascalCase** (first letter of each word capitalized).

---

## Basic Usage

### 1. Create an instance

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

`EventEmitter` is the class (the blueprint). `emitter` is the object (the instance you use).

### 2. Register a listener

```js
emitter.on('messageLogged', () => {
  console.log('Listener called');
});
```

`on()` is an alias for `addListener()`. It takes the event name and a callback.

### 3. Raise (emit) an event

```js
emitter.emit('messageLogged');
```

**Order matters**: register listeners *before* calling `emit()`. When `emit()` is called, it synchronously calls all registered listeners for that event.

---

## Event Arguments

Pass data about an event by including extra arguments in `emit()`. Best practice is to wrap them in a single object:

```js
emitter.emit('messageLogged', { id: 1, url: 'http://...' });
```

Receive the data in the listener:

```js
emitter.on('messageLogged', (arg) => {
  console.log(arg); // { id: 1, url: 'http://...' }
});
```

The parameter name (`arg`, `e`, `event`) doesn't matter — by convention people use `arg` or `e`.

### Arrow function syntax (ES6)

```js
// Traditional function
emitter.on('messageLogged', function(arg) { ... });

// Arrow function — same behavior, cleaner syntax
emitter.on('messageLogged', (arg) => { ... });
```

---

## Extending EventEmitter

In real applications you rarely use `EventEmitter` directly. Instead, create a **class that extends it**, combining your own functionality with event-emitting capability.

### Why not just use a bare EventEmitter?

If `logger.js` creates its own `emitter` and `app.js` creates a separate one, they are **different objects** — a listener registered on one won't fire when the other emits.

```
logger.js → emitter A → emits 'messageLogged'
app.js    → emitter B → listens for 'messageLogged'  ← never called!
```

### Solution: a class that IS an EventEmitter

**logger.js**

```js
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit('messageLogged', { id: 1, url: 'http://...' });
    // 'this' refers to the Logger instance — which IS an EventEmitter
  }
}

module.exports = Logger;
```

**app.js**

```js
const Logger = require('./logger');

const logger = new Logger();

// Register listener on the same object that will emit
logger.on('messageLogged', (arg) => {
  console.log('Listener called:', arg);
});

logger.log('message');
// Output:
// message
// Listener called: { id: 1, url: 'http://...' }
```

By using a single `logger` object for both emitting and listening, the events wire up correctly.

### Key pattern

```
class MyClass extends EventEmitter
  → inside methods, use: this.emit('eventName', data)
  → consumers use: myInstance.on('eventName', callback)
```

---

## HTTP Module

The `http` module lets you create a web server that listens for HTTP requests. The server object is itself an `EventEmitter` (it inherits from `net.Server`, which extends `EventEmitter`).

### Creating a server

```js
const http = require('http');

const server = http.createServer();

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### Handling requests with a callback

Rather than listening for low-level `connection` events, pass a callback to `createServer()` to handle each request/response:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

| Route | Response |
|-------|----------|
| `http://localhost:3000/` | `Hello World` |
| `http://localhost:3000/api/courses` | `[1,2,3]` |

`JSON.stringify()` converts a JavaScript object/array into a JSON string for the response body.

### Why not build production APIs this way?

As routes grow, this linear `if/else` structure becomes unwieldy. In practice, use **Express** — a framework built on top of the `http` module that gives your app a clean, structured way to handle routes.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| `EventEmitter` | Core class; all event-driven code is built on it |
| `emitter.on(event, fn)` | Register a listener |
| `emitter.emit(event, data)` | Raise an event |
| Order matters | Listeners must be registered before `emit()` is called |
| Event arguments | Pass an object as the second arg to `emit()` |
| Extend EventEmitter | Preferred pattern — combine custom logic with event capability |
| `this.emit()` | How a class raises events on itself |
| `http.createServer()` | Creates an HTTP server; callback receives `(req, res)` |
| Use Express in production | `http` alone gets unwieldy; Express wraps it cleanly |
