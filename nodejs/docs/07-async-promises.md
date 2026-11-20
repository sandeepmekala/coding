# Async JavaScript — Callbacks, Promises, Async/Await

## Why Async?

Some operations take time — reading a file, calling an API, querying a database. If you wait for them synchronously, the entire thread freezes.

```js
// SYNC — blocks everything while waiting
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);  // nothing else runs until file is read

// ASYNC — thread stays free while waiting
fs.readFile('file.txt', 'utf8', (err, data) => {
    console.log(data);  // runs when ready
});
console.log('this runs immediately, without waiting');
```

---

## 1. Callbacks

A **callback** is a function you pass to another function, to be called when the work is done.

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    console.log(data);
});
```

The callback always receives `(err, result)`:
- If the operation failed → `err` has the error, `result` is `undefined`
- If it succeeded → `err` is `null`, `result` has the data

### Callback Hell

Nesting callbacks for sequential async operations becomes hard to read:

```js
fs.readFile('a.txt', 'utf8', (err, a) => {
    fs.readFile('b.txt', 'utf8', (err, b) => {
        fs.readFile('c.txt', 'utf8', (err, c) => {
            // deeply nested, hard to maintain
        });
    });
});
```

Promises solve this.

---

## 2. Promises

A **Promise** is an object that represents a value that will be available in the future.

```js
const promise = fs.promises.readFile('file.txt', 'utf8');
console.log(promise);  // Promise { <pending> }
```

### Three States

| State | Meaning |
|-------|---------|
| `pending` | Operation still in progress |
| `fulfilled` | Operation succeeded — has a value |
| `rejected` | Operation failed — has an error |

### Creating a Promise

```js
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: 'Sandeep' });  // success
            } else {
                reject(new Error('Invalid ID'));    // failure
            }
        }, 1000);
    });
}
```

- Call `resolve(value)` when the work succeeds
- Call `reject(error)` when it fails

### Consuming a Promise with `.then()` / `.catch()`

```js
fetchUser(1)
    .then(user => console.log('Got user:', user))
    .catch(err => console.error('Error:', err.message));
```

### Chaining `.then()`

```js
fetchUser(1)
    .then(user => processUser(user))
    .then(result => saveResult(result))
    .then(saved => console.log('Done:', saved))
    .catch(err => console.error(err));  // catches errors from any step
```

---

## 3. Async / Await

`async/await` is **syntactic sugar over Promises** — it makes async code look and read like synchronous code.

### Rules

1. **`async`** marks a function as asynchronous — it always returns a Promise
2. **`await`** pauses execution inside that function until the Promise resolves
3. `await` can only be used **inside** an `async` function

```js
async function main() {
    const user = await fetchUser(1);  // waits here, then continues
    console.log(user);
}
```

### Error Handling with try/catch

```js
async function main() {
    try {
        const user = await fetchUser(1);
        console.log('Got user:', user);
    } catch (err) {
        console.error('Error:', err.message);
    }
}
```

---

## Comparison: Same Thing, 3 Styles

```js
// 1. Callback
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// 2. Promise (.then)
fs.promises.readFile('file.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// 3. Async/Await
async function read() {
    const data = await fs.promises.readFile('file.txt', 'utf8');
    console.log(data);
}
```

All three do the same thing. `async/await` is the modern standard.

---

## Sequential vs Parallel Async

### Sequential (one after the other)

```js
async function sequential() {
    const a = await fetchUser(1);  // waits for 1 to finish
    const b = await fetchUser(2);  // then fetches 2
    // total time = time(1) + time(2)
}
```

### Parallel (both at the same time)

```js
async function parallel() {
    const [a, b] = await Promise.all([fetchUser(1), fetchUser(2)]);
    // total time = max(time(1), time(2))
}
```

Use `Promise.all` when requests don't depend on each other.

---

## `await` Unwraps a Promise

```js
// Without await — you get the Promise object
const promise = fs.promises.readFile('file.txt', 'utf8');
// promise = Promise { <pending> }

// With await — you get the actual resolved value
const data = await fs.promises.readFile('file.txt', 'utf8');
// data = "file contents..."
```

`.then()` and `await` are equivalent — `await` is just cleaner syntax:

```js
// These two are identical
const data = await fs.promises.readFile('file.txt', 'utf8');

fs.promises.readFile('file.txt', 'utf8').then(data => console.log(data));
```

---

## Summary

| | Callbacks | Promises | Async/Await |
|---|---|---|---|
| Style | Function passed in | `.then()` / `.catch()` | `await` / `try-catch` |
| Readability | Poor (nesting) | Medium | Best |
| Error handling | `if (err)` check | `.catch()` | `try/catch` |
| Parallel | Difficult | `Promise.all()` | `Promise.all()` |
| Modern standard | No | Partially | Yes |
