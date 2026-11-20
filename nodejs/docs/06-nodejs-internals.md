# Node.js Internals

## Architecture

Node.js is built on two major components:

```
Node.js
├── V8 Engine       — executes JavaScript code (written in C++ and JS)
└── libuv           — provides Event Loop + Thread Pool (written in C)
```

### V8 Engine
- The same engine used inside Chrome
- Compiles and executes JavaScript code
- Written in C++ and JavaScript

### libuv
- A C library that implements two critical things:
  - **Event Loop** — handles asynchronous callbacks
  - **Thread Pool** — handles CPU-intensive tasks off the main thread

---

## How Node.js Executes Code

When you run `node index.js`, Node goes through these steps on the **main thread**:

```
1. Init project
       ↓
2. Run top-level code  ← synchronous, runs immediately
       ↓
3. Require modules
       ↓
4. Register event callbacks
       ↓
5. Start Event Loop    ← handles all async work from here
```

**Top-level code** = any code written directly in the script file, not inside a function or callback.

```js
const fs = require('fs');       // top-level (require)
const x = 42;                   // top-level (variable)

setTimeout(() => { ... }, 0);   // top-level (registers timer — but the callback is NOT top-level)
console.log('hello');           // top-level (runs immediately)
```

Node.js runs on a **single main thread**. All JavaScript code executes on this one thread.

---

## Thread Pool

For CPU-intensive tasks, Node offloads work to a pool of background threads so the main thread is not blocked.

```
Main Thread
│
├── Event Loop (runs your JS callbacks)
│
└── Thread Pool (libuv)
    ├── Thread 1
    ├── Thread 2
    ├── Thread 3
    └── Thread 4   ← 4 threads by default, up to 128
```

### What uses the Thread Pool?

| Task | Example |
|------|---------|
| File system | `fs.readFile`, `fs.writeFile` |
| Crypto | `crypto.pbkdf2`, hashing, encryption |
| Compression | `zlib.gzip` |
| DNS lookups | `dns.lookup` |

### Controlling Thread Pool size

```js
process.env.UV_THREADPOOL_SIZE = 8;  // set before any async work starts
```

Default: **4 threads**. Max: **128 threads**.

---

## Event Loop

The Event Loop is what allows Node to be non-blocking despite running on a single thread. It continuously checks for pending work and processes callbacks in a fixed order.

### Event Loop Phases (in order)

```
┌─────────────────────────────────┐
│  1. Expired Timer Callbacks     │  setTimeout, setInterval
├─────────────────────────────────┤
│  2. I/O Polling                 │  fs, network callbacks
├─────────────────────────────────┤
│  3. setImmediate Callbacks      │  setImmediate
├─────────────────────────────────┤
│  4. Close Callbacks             │  server.close, socket.close
└─────────────────────────────────┘
         ↓
  Any pending tasks?
  ├── Yes → loop again from phase 1
  └── No  → exit process
```

### Phase Details

**Phase 1 — Expired Timer Callbacks**
Runs all `setTimeout` and `setInterval` callbacks whose delay has elapsed.

**Phase 2 — I/O Polling**
Retrieves completed I/O events (file reads, network responses) and runs their callbacks. If nothing is ready, waits briefly here for I/O to complete.

**Phase 3 — setImmediate**
Runs `setImmediate` callbacks. These always run after I/O polling in the current iteration.

**Phase 4 — Close Callbacks**
Runs callbacks for closed resources like `server.on('close', ...)`.

---

## Execution Order — Code Examples

### Example 1: setTimeout vs top-level code

```js
setTimeout(() => {
    console.log('B — timer callback');
}, 0);

console.log('A — top-level code');

// Output:
// A — top-level code
// B — timer callback
```

Top-level code runs before the Event Loop starts, so `A` always prints first.

---

### Example 2: setTimeout vs setImmediate (outside I/O)

```js
setTimeout(() => console.log('timer'), 0);
setImmediate(() => console.log('immediate'));

// Output: NON-DETERMINISTIC
// Could be: timer → immediate
// Could be: immediate → timer
```

When both are registered in top-level code (outside an I/O callback), the order depends on process performance — not guaranteed.

---

### Example 3: setTimeout vs setImmediate (inside I/O) — DETERMINISTIC

```js
const fs = require('fs');

fs.readFile('./sample.txt', 'utf8', () => {
    setTimeout(() => console.log('timer'), 0);
    setImmediate(() => console.log('immediate'));
});

// Output: ALWAYS
// immediate
// timer
```

Inside an I/O callback, `setImmediate` **always** runs before `setTimeout(0)`.
Why: the I/O callback runs in phase 2. After it finishes, the loop moves to phase 3 (setImmediate) before looping back to phase 1 (timers).

---

### Example 4: Full execution order

```js
const fs = require('fs');

console.log('1 — top-level');

setTimeout(() => console.log('3 — timer'), 0);

setImmediate(() => console.log('4 — immediate'));

fs.readFile('./sample.txt', 'utf8', () => {
    console.log('5 — I/O callback');

    setImmediate(() => console.log('6 — immediate inside I/O'));
    setTimeout(() => console.log('7 — timer inside I/O'), 0);
});

console.log('2 — top-level');

// Output:
// 1 — top-level
// 2 — top-level
// 3 — timer
// 4 — immediate
// 5 — I/O callback
// 6 — immediate inside I/O
// 7 — timer inside I/O
```

---

## Thread Pool in Action — crypto.pbkdf2

`crypto.pbkdf2` is a CPU-intensive password hashing function — a perfect way to observe the thread pool.

```js
const crypto = require('crypto');

const start = Date.now();

function hashPassword(label) {
    crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
        console.log(`${label} done: ${Date.now() - start}ms`);
    });
}

hashPassword('password-1');
hashPassword('password-2');
hashPassword('password-3');
hashPassword('password-4');
hashPassword('password-5');  // has to wait — no thread available
hashPassword('password-6');  // has to wait — no thread available
```

**Output with default pool size (4):**
```
password-1 done: ~170ms   ← ran in parallel (had a thread)
password-2 done: ~170ms   ← ran in parallel
password-3 done: ~170ms   ← ran in parallel
password-4 done: ~170ms   ← ran in parallel
password-5 done: ~320ms   ← waited for a thread to free up
password-6 done: ~320ms   ← waited for a thread to free up
```

Tasks 1–4 finish together because each got its own thread. Tasks 5–6 each waited for a thread to free, so they took almost double the time.

### Controlling Thread Pool Size

```js
// Set at the very top, before any async work starts
process.env.UV_THREADPOOL_SIZE = 6;
```

| Pool Size | 6 tasks behaviour |
|-----------|-------------------|
| `1` | All sequential — each task waits for the previous |
| `2` | Batches of 2: ~600ms, ~1200ms, ~1800ms |
| `4` (default) | First 4 parallel, last 2 wait: ~170ms, ~320ms |
| `6` | All 6 parallel — same finish time |
| `128` | Maximum allowed |

---

## Node.js vs Multi-threaded Languages (e.g. PHP)

### How Node.js handles requests

```
Many users → Node.js server
                │
                ├── Single Event Loop (main thread)
                │     handles ALL incoming requests
                │
                └── Thread Pool
                      used only for CPU-intensive tasks
                      (offloaded from main thread)
```

- All requests share one event loop on the main thread
- Event loop resolves requests quickly (non-blocking I/O)
- CPU-intensive work is offloaded to the thread pool
- **Hybrid approach**: efficient for I/O, still capable for CPU work

### How PHP (multi-threaded) handles requests

```
Many users → PHP server
                │
                ├── Thread for user 1
                ├── Thread for user 2
                ├── Thread for user 3
                └── ...
                      ↑ when all threads are busy,
                        new users must WAIT
```

- Each request gets its own thread
- When all threads are busy, new requests queue up
- Thread overhead is higher (memory per thread)

### When to use which

| Use Case | Recommendation |
|----------|----------------|
| REST API, real-time, I/O-heavy | **Node.js** — event loop handles it efficiently |
| CPU-heavy (video processing, ML) | Multi-threaded language (Java, Go, C++) |
| Mixed workload (microservices) | Node.js for APIs + dedicated service for CPU work |

> Node.js is not a programming language — it is a **runtime environment** for JavaScript.

---

## Promise Callbacks and the Event Loop

Promise `.then()` callbacks do not run inside any specific event loop phase. Instead, they run **between phase transitions**.

```
Event Loop phases:

  [Timers] → [I/O Polling] → [setImmediate] → [Close Callbacks]
          ↑               ↑                ↑
     Promise callbacks checked at each of these arrows
```

Whenever the event loop **transitions from one phase to the next**, it checks:
> "Are there any resolved Promises with pending callbacks?"

If yes — those callbacks run **before** the next phase begins.

```js
Promise.resolve().then(() => console.log('promise callback'));
setTimeout(() => console.log('timer'), 0);

// Output:
// promise callback   ← runs before timer (between phases)
// timer
```

This is why Promise callbacks (microtasks) are considered higher priority than regular callbacks — they cut in between phases rather than waiting for a full loop.

---

## Single-threaded vs Multi-threaded

| | Node.js (Single Thread) | Java/C# (Multi-threaded) |
|---|---|---|
| Requests | One thread handles all | New thread per request |
| Concurrency | Via Event Loop + async I/O | Via multiple threads |
| Memory | Low (one thread) | Higher (thread overhead) |
| Risk | Blocking the main thread | Race conditions, deadlocks |
| Best for | I/O-heavy apps (APIs, servers) | CPU-heavy apps |

Node's single-threaded model works well because most web server work is I/O (waiting on databases, files, network) — not heavy computation. The Event Loop keeps the thread busy with other callbacks while waiting.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| V8 | Executes JS; built into Node |
| libuv | Provides Event Loop and Thread Pool |
| Main thread | Single thread where all JS runs |
| Top-level code | Runs synchronously before Event Loop starts |
| Thread Pool | 4 background threads for CPU-intensive tasks (fs, crypto, zip) |
| `UV_THREADPOOL_SIZE` | Env variable to control thread pool size (default 4, max 128) |
| Event Loop | Processes async callbacks in 4 phases: timers → I/O → setImmediate → close |
| setImmediate vs setTimeout outside I/O | Non-deterministic order |
| setImmediate vs setTimeout inside I/O | setImmediate always wins |
| Promise callbacks | Run between phase transitions (higher priority than phase callbacks) |
| Node.js vs PHP | Node: single thread + event loop; PHP: one thread per request |
| Best use for Node.js | REST APIs, I/O-heavy apps — not CPU-intensive servers |
