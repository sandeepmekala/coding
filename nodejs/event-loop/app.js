const fs = require('fs');

// ─────────────────────────────────────────────
// Node.js Execution Order Demo
//
// Node.js Architecture:
//   1. V8 Engine      — executes JS code
//   2. libuv          — provides Event Loop + Thread Pool
//
// Main Thread execution steps:
//   1. Init project
//   2. Run top-level code
//   3. Require modules
//   4. Register event callbacks
//   5. Start Event Loop
//
// Event Loop phases (in order):
//   1. Expired timer callbacks  (setTimeout, setInterval)
//   2. I/O polling              (fs, network callbacks)
//   3. setImmediate callbacks
//   4. Close callbacks          (server.close, socket.close)
//
// Thread Pool (libuv):
//   - 4 threads by default (max 128)
//   - Used for CPU-intensive tasks: fs, crypto, compression
// ─────────────────────────────────────────────

console.log('1. Top-level code — runs first (main thread)');

// Registered as a timer callback — runs in phase 1 of event loop
setTimeout(() => {
    console.log('3. setTimeout (0ms) — expired timer callback');
}, 0);

// Registered as setImmediate callback — runs in phase 3 of event loop
setImmediate(() => {
    console.log('4. setImmediate — runs after I/O polling');
});

// CPU-intensive task — offloaded to Thread Pool
// Its callback runs in phase 2 (I/O polling) of the event loop
fs.readFile('./sample.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('5. fs.readFile callback — I/O polling phase, data:', data.trim());

    // Timers and immediates registered INSIDE an I/O callback
    // have a deterministic order: setTimeout(0) vs setImmediate
    // Inside I/O: setImmediate ALWAYS runs before setTimeout(0)
    setTimeout(() => {
        console.log('7. setTimeout inside I/O callback');
    }, 0);

    setImmediate(() => {
        console.log('6. setImmediate inside I/O callback — always before setTimeout here');
    });
});

console.log('2. Top-level code — still main thread (synchronous)');

// ─────────────────────────────────────────────
// Expected output:
//   1. Top-level code — runs first (main thread)
//   2. Top-level code — still main thread (synchronous)
//   3. setTimeout (0ms) — expired timer callback
//   4. setImmediate — runs after I/O polling
//   5. fs.readFile callback — I/O polling phase
//   6. setImmediate inside I/O callback    ← always before setTimeout inside I/O
//   7. setTimeout inside I/O callback
// ─────────────────────────────────────────────
