# Introduction to Node.js

## What is Node.js?

Node.js (or Node) is an **open-source, cross-platform runtime environment** for executing JavaScript code **outside of a browser**.

It is commonly used to build **backend services**, also called **APIs (Application Programming Interfaces)** — the services that power client applications like:
- Web apps running in a browser
- Mobile apps running on a device

Client apps are just a surface — they need to talk to services on the server or in the cloud to:
- Store and retrieve data
- Send emails or push notifications
- Kick off workflows

---

## Why Use Node.js?

| Reason | Details |
|--------|---------|
| **Fast prototyping** | Easy to get started; great for Agile development |
| **Highly scalable** | Used in production at PayPal, Uber, Netflix, Walmart |
| **JavaScript everywhere** | Reuse JS skills on frontend and backend; cleaner, consistent codebase |
| **Huge ecosystem** | Largest collection of open-source libraries (npm) |

**PayPal case study:** Rebuilt a Java/Spring app in Node and achieved:
- Built **2x faster** with fewer people
- **33% fewer** lines of code
- **40% fewer** files
- **2x** requests served per second
- **35% lower** average response time

---

## Node Architecture

### JavaScript Engines in Browsers

Every browser has a JavaScript engine that converts JS to machine code:

| Browser | Engine |
|---------|--------|
| Microsoft Edge | Chakra |
| Firefox | SpiderMonkey |
| Chrome | **V8** |

These engine differences explain why JS sometimes behaves differently across browsers.

### How Node Was Born (2009)

Ryan Dahl took **Google's V8 engine** (the fastest JS engine) and embedded it in a **C++ program** — and called it Node.

Like a browser, Node is a runtime environment for JavaScript, but with different built-in objects:

| Browser Runtime | Node Runtime |
|----------------|--------------|
| `window`, `document` | File system, network access |
| DOM manipulation | Listen on ports, read/write files |

> Node is **not** a programming language, and it is **not** a framework like ASP.NET, Rails, or Django. It is a **runtime environment**.

Both Chrome and Node share the V8 engine but provide different runtime environments.

---

## How Node Works

### Non-Blocking (Asynchronous) Architecture

Node applications are **asynchronous by default** — this is the key to their scalability.

**Restaurant metaphor:**
- A **single waiter** (thread) takes orders from multiple tables
- They don't wait at the kitchen — they keep serving other tables while food is being prepared
- When the food is ready, they come back to deliver it

This is **non-blocking** architecture.

### Blocking (Synchronous) Architecture

Frameworks like ASP.NET (by default) use **blocking** architecture:
- Each request gets its own thread
- That thread waits idle while the database processes a query
- With many concurrent clients, you run out of threads
- Solution: add more hardware — inefficient

### Node's Event Queue

```
Client Request → Single Thread → Database Query
                                      ↓
              Event Queue ← Database Result
                  ↓
            Thread picks up result and responds
```

Node continuously monitors the **event queue**. While the database is working, the thread serves other clients. When a result is ready, Node picks it up from the queue.

### When to Use Node (and When Not To)

| Use Node for | Avoid Node for |
|-------------|----------------|
| Data-intensive apps | CPU-intensive apps (video encoding, image processing) |
| Real-time apps | Heavy computation tasks |
| APIs with lots of I/O | Apps requiring parallel CPU calculations |
| Highly scalable services | |

Node is **single-threaded** — CPU-bound work blocks that thread and makes other clients wait.
