# Getting Started with Node.js

## Installing Node

Check if Node is already installed:

```bash
node --version
```

Download the **LTS (Long-Term Support)** version from [nodejs.org](https://nodejs.org) — it's the recommended stable version for most users.

After installation, verify:

```bash
node --version
# e.g. v8.9.1
```

---

## Your First Node Program

### 1. Create a project folder and a file

```bash
mkdir first-app
cd first-app
```

Create `app.js`:

```js
function sayHello(name) {
  console.log('Hello ' + name);
}

sayHello('Mosh');
```

### 2. Run it with Node

```bash
node app.js
# Output: Hello Mosh
```

Node takes your file, passes it to the **V8 engine**, and executes it.

### 3. Browser globals don't exist in Node

```js
console.log(window); // ReferenceError: window is not defined
```

Node does not have `window` or `document` — those are browser runtime objects. Node provides its own objects for working with files, the OS, and the network.
