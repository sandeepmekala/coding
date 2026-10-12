# Multithreading and Concurrency

## Part 6 | Thread Pools in Java | ThreadPoolExecutor Framework

Thread creation is **expensive**, especially in applications requiring frequent task execution. Instead of creating a new thread each time, we use **Thread Pools**, which manage a fixed number of reusable threads.

---

1\. What is a Thread Pool?

A **Thread Pool** is a pool of pre-instantiated, reusable threads that execute tasks, improving **performance** and **resource management**.

🔹 **Advantages of Thread Pools:**  
 ✔ Reduces overhead of creating/destroying threads.  
 ✔ Optimizes CPU utilization.  
 ✔ Prevents system resource exhaustion.  
 ✔ Efficient task execution by managing concurrent threads.

---

2\. Creating Thread Pools in Java

Java provides the `ExecutorService` interface and `ThreadPoolExecutor` class to manage thread pools.

2.1 Creating a Thread Pool using `Executors`

Java provides a factory class `Executors` to create different types of thread pools.

java

CopyEdit

`import java.util.concurrent.*;`

`public class FixedThreadPoolExample {`

    `public static void main(String[] args) {`

        `ExecutorService executor = Executors.newFixedThreadPool(3); // Pool of 3 threads`

        `for (int i = 1; i <= 5; i++) {`

            `final int taskId = i;`

            `executor.submit(() -> {`

                `System.out.println("Executing Task " + taskId + " by " + Thread.currentThread().getName());`

                `try { Thread.sleep(1000); } catch (InterruptedException e) { e.printStackTrace(); }`

            `});`

        `}`

        `executor.shutdown(); // Shutdown the pool after task execution`

    `}`

`}`

Output Example  
arduino

CopyEdit

`Executing Task 1 by pool-1-thread-1`

`Executing Task 2 by pool-1-thread-2`

`Executing Task 3 by pool-1-thread-3`

`Executing Task 4 by pool-1-thread-1`

`Executing Task 5 by pool-1-thread-2`

🔹 **How it works?**

* **Creates a thread pool of size 3\.**  
* **Executes 5 tasks using available threads.**  
* **Reuses threads when a task is completed.**

---

3\. Types of Thread Pools in Java (`Executors` Factory Methods)

| Method | Description |
| ----- | ----- |
| `Executors.newFixedThreadPool(n)` | Fixed-size thread pool with `n` threads. |
| `Executors.newCachedThreadPool()` | Creates threads dynamically as needed but reuses idle threads. |
| `Executors.newSingleThreadExecutor()` | Single-threaded executor (executes tasks sequentially). |
| `Executors.newScheduledThreadPool(n)` | Fixed-size pool for scheduled tasks (like `cron` jobs). |

3.1 `newCachedThreadPool()` Example (Dynamic Thread Management)  
java

CopyEdit

`ExecutorService executor = Executors.newCachedThreadPool();`

✔ Creates threads as needed, but **reuses idle threads** for new tasks.  
 ✔ Suitable for **short-lived, high-volume tasks**.

---

4\. ThreadPoolExecutor \- Custom Thread Pool

For **fine-grained control**, use `ThreadPoolExecutor` instead of `Executors`.

java

CopyEdit

`import java.util.concurrent.*;`

`public class CustomThreadPool {`

    `public static void main(String[] args) {`

        `ThreadPoolExecutor executor = new ThreadPoolExecutor(`

            `2,  // Core pool size`

            `4,  // Maximum pool size`

            `60, // Time before excess idle threads are terminated`

            `TimeUnit.SECONDS,`

            `new LinkedBlockingQueue<>(2) // Task queue (capacity 2)`

        `);`

        `for (int i = 1; i <= 6; i++) {`

            `final int taskId = i;`

            `executor.execute(() -> {`

                `System.out.println("Executing Task " + taskId + " by " + Thread.currentThread().getName());`

                `try { Thread.sleep(2000); } catch (InterruptedException e) { e.printStackTrace(); }`

            `});`

        `}`

        `executor.shutdown();`

    `}`

`}`

🔹 **Key Parameters:**

* `corePoolSize`: Minimum number of threads in the pool.  
* `maximumPoolSize`: Maximum number of threads.  
* `keepAliveTime`: Time an idle thread waits before termination.  
* `BlockingQueue<Runnable>`: Task queue for holding tasks before execution.

---

5\. Handling Task Rejections (`RejectedExecutionHandler`)

If a thread pool’s task queue is full, tasks **may be rejected**.  
 Java provides `RejectedExecutionHandler` to define custom rejection handling.

5.1 Example: Custom Rejection Policy  
java

CopyEdit

`class CustomRejectionHandler implements RejectedExecutionHandler {`

    `@Override`

    `public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {`

        `System.out.println("Task rejected: " + r.toString());`

    `}`

`}`

`public class RejectedExecutionExample {`

    `public static void main(String[] args) {`

        `ThreadPoolExecutor executor = new ThreadPoolExecutor(`

            `2, 2, 0L, TimeUnit.MILLISECONDS,`

            `new ArrayBlockingQueue<>(2), // Small queue (2 tasks)`

            `new CustomRejectionHandler()`

        `);`

        `for (int i = 1; i <= 5; i++) {`

            `final int taskId = i;`

            `executor.execute(() -> {`

                `System.out.println("Executing Task " + taskId + " by " + Thread.currentThread().getName());`

                `try { Thread.sleep(2000); } catch (InterruptedException e) { e.printStackTrace(); }`

            `});`

        `}`

        `executor.shutdown();`

    `}`

`}`

✔ **Custom handler logs rejected tasks.**

---

6\. Scheduled Thread Pool (`ScheduledThreadPoolExecutor`)

For tasks that need to be **executed periodically**, use `ScheduledThreadPoolExecutor`.

6.1 Example: Scheduling a Task  
java

CopyEdit

`import java.util.concurrent.*;`

`public class ScheduledThreadPoolExample {`

    `public static void main(String[] args) {`

        `ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);`

        `Runnable task = () -> System.out.println("Scheduled Task Executed: " + System.currentTimeMillis());`

        

        `// Execute task after an initial delay of 2 seconds, then every 3 seconds`

        `scheduler.scheduleAtFixedRate(task, 2, 3, TimeUnit.SECONDS);`

        `// Stop after 10 seconds`

        `try { Thread.sleep(10000); } catch (InterruptedException e) { e.printStackTrace(); }`

        `scheduler.shutdown();`

    `}`

`}`

🔹 **Use Cases:**  
 ✔ Running **cron jobs** (e.g., **data backups, log rotation**).  
 ✔ **Polling external APIs** periodically.

---

7\. Summary

| Feature | FixedThreadPool | CachedThreadPool | ScheduledThreadPool | SingleThreadExecutor |
| ----- | ----- | ----- | ----- | ----- |
| **Thread Count** | Fixed (`n` threads) | Dynamic (grows/shrinks as needed) | Fixed (`n` threads) | Single thread |
| **Task Execution** | Handles multiple tasks concurrently | Reuses existing threads | Executes tasks with delay or at fixed rate | One task at a time |
| **Use Case** | Fixed workload | High volume short tasks | Periodic tasks | Sequential execution |

---

8\. Key Takeaways

✅ Use `ExecutorService` instead of manually creating threads.  
 ✅ Choose the right thread pool based on workload:

* **FixedThreadPool**: Constant number of threads.  
* **CachedThreadPool**: Scales dynamically.  
* **ScheduledThreadPool**: Periodic tasks.  
* **SingleThreadExecutor**: One thread execution.  
   ✅ Use `ThreadPoolExecutor` for **fine-grained control**.  
   ✅ Handle **task rejections** using `RejectedExecutionHandler`.

---

## Part 7 | Java 8 CompletableFuture | Future and Callable in Java

---

1\. Introduction to Asynchronous Programming in Java

In Java, when a task takes a long time (e.g., I/O operations, API calls), executing it **synchronously** (blocking the main thread) can degrade performance.

To solve this, Java provides:  
 ✔ **Future and Callable** (Java 5\) – Basic async tasks.  
 ✔ **CompletableFuture** (Java 8\) – Advanced async programming.

---

2\. Future and Callable (Java 5\)

Java introduced **Callable** and **Future** in Java 5 to execute tasks asynchronously and get results.

2.1 Callable Interface

* `Callable<V>` is like `Runnable`, but **returns a result** and **can throw checked exceptions**.  
* Used with `ExecutorService.submit()`, which returns a `Future<V>` object.

java

CopyEdit

`import java.util.concurrent.*;`

`public class CallableExample {`

    `public static void main(String[] args) throws Exception {`

        `ExecutorService executor = Executors.newFixedThreadPool(2);`

        `Callable<Integer> task = () -> {`

            `System.out.println("Task started by " + Thread.currentThread().getName());`

            `Thread.sleep(2000); // Simulate delay`

            `return 42;`

        `};`

        `Future<Integer> future = executor.submit(task); // Submit callable task`

        `System.out.println("Doing other work while waiting...");`

        `Integer result = future.get(); // Blocks until result is available`

        `System.out.println("Result: " + result);`

        `executor.shutdown();`

    `}`

`}`

Output

arduino

CopyEdit

`Doing other work while waiting...`

`Task started by pool-1-thread-1`

`Result: 42`

🔹 **Limitations of Future**  
 ❌ **Blocking** (`future.get()` blocks execution).  
 ❌ No **chaining** (hard to combine multiple tasks).  
 ❌ Cannot **manually complete** a `Future`.

---

3\. CompletableFuture (Java 8\)

Java 8 introduced `CompletableFuture` to **overcome Future's limitations** by providing:  
 ✔ **Non-blocking programming** (`thenApply`, `thenAccept`).  
 ✔ **Chaining multiple tasks** (`thenCompose`, `thenCombine`).  
 ✔ **Combining multiple futures** (`allOf`, `anyOf`).

3.1 Creating a CompletableFuture

java

CopyEdit

`import java.util.concurrent.*;`

`public class CompletableFutureExample {`

    `public static void main(String[] args) throws Exception {`

        `CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {`

            `System.out.println("Task started by " + Thread.currentThread().getName());`

            `try { Thread.sleep(2000); } catch (InterruptedException e) { e.printStackTrace(); }`

            `return 42;`

        `});`

        `System.out.println("Doing other work...");`

        `Integer result = future.get(); // Blocking`

        `System.out.println("Result: " + result);`

    `}`

`}`

Output

vbnet

CopyEdit

`Doing other work...`

`Task started by ForkJoinPool.commonPool-worker-1`

`Result: 42`

🔹 **Key Features:**

* `supplyAsync()` → Runs task asynchronously and returns a `CompletableFuture<V>`.  
* Uses **ForkJoinPool** (default pool) but can be customized.

---

4\. Chaining Async Calls (`thenApply`, `thenAccept`)

Instead of blocking, use **chaining**.

java

CopyEdit

`CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 10)`

        `.thenApply(num -> num * 2) // Transforms result (10 → 20)`

        `.thenApply(num -> num + 5); // 20 → 25`

`System.out.println("Result: " + future.get()); // 25`

🔹 **Methods:**  
 ✔ `thenApply(fn)` → Transforms result.  
 ✔ `thenAccept(consumer)` → Consumes result without returning anything.

---

5\. Combining Multiple Futures

5.1 `thenCompose()` (Dependent Async Calls)

When one async task **depends** on another.

java

CopyEdit

`CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 10)`

        `.thenCompose(num -> CompletableFuture.supplyAsync(() -> num * 2));`

`System.out.println("Result: " + future.get()); // 20`

✔ **Use when the second task depends on the first one.**

---

5.2 `thenCombine()` (Independent Async Calls)

When two independent tasks **need to be combined**.

java

CopyEdit

`CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 10);`

`CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 20);`

`CompletableFuture<Integer> result = future1.thenCombine(future2, Integer::sum);`

`System.out.println("Result: " + result.get()); // 30`

✔ **Use when both tasks run independently but need a combined result.**

---

6\. Running Multiple Futures in Parallel

6.1 `allOf()` (Wait for All Futures)

java

CopyEdit

`CompletableFuture<Void> allFutures = CompletableFuture.allOf(`

    `CompletableFuture.runAsync(() -> System.out.println("Task 1")),`

    `CompletableFuture.runAsync(() -> System.out.println("Task 2"))`

`);`

`allFutures.get(); // Blocks until all tasks finish`

✔ Used when all futures **must complete before proceeding**.

---

6.2 `anyOf()` (Wait for First Completed Future)

java

CopyEdit

`CompletableFuture<Object> firstDone = CompletableFuture.anyOf(`

    `CompletableFuture.supplyAsync(() -> "Task A"),`

    `CompletableFuture.supplyAsync(() -> "Task B")`

`);`

`System.out.println("First completed: " + firstDone.get());`

✔ Returns **result of the first completed future**.

---

7\. Exception Handling in CompletableFuture

Use `exceptionally()` or `handle()` to catch exceptions.

java

CopyEdit

`CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {`

    `if (true) throw new RuntimeException("Error occurred!");`

    `return 10;`

`}).exceptionally(ex -> {`

    `System.out.println("Exception: " + ex.getMessage());`

    `return 0;`

`});`

`System.out.println("Result: " + future.get()); // 0`

✔ `exceptionally()` → Handles exceptions and **provides a fallback value**.

---

8\. Custom Thread Pool in CompletableFuture

By default, `CompletableFuture` uses **ForkJoinPool**.  
 To use a **custom thread pool**, provide an `ExecutorService`.

java

CopyEdit

`ExecutorService executor = Executors.newFixedThreadPool(3);`

`CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {`

    `System.out.println("Running in: " + Thread.currentThread().getName());`

    `return 42;`

`}, executor);`

`System.out.println("Result: " + future.get());`

`executor.shutdown();`

✔ Ensures **better control over threading**.

---

9\. Summary

| Feature | Future & Callable | CompletableFuture |
| ----- | ----- | ----- |
| Async Execution | ✅ Yes | ✅ Yes |
| Blocking | ❌ Yes (`future.get()`) | ✅ Non-blocking (`thenApply`, `thenAccept`) |
| Task Chaining | ❌ No | ✅ Yes (`thenCompose`, `thenCombine`) |
| Multiple Futures | ❌ No | ✅ Yes (`allOf`, `anyOf`) |
| Exception Handling | ❌ No | ✅ Yes (`exceptionally`, `handle`) |

✅ **Use `Future` for basic async tasks.**  
 ✅ **Use `CompletableFuture` for advanced, non-blocking programming.**

---

## Java Thread Pools and ForkJoinPool

1\. Introduction to Thread Pools

Thread pools are used to efficiently manage and reuse a fixed number of worker threads instead of creating and destroying threads manually.

Why Use Thread Pools?

✔ **Improves performance** by reusing threads.  
 ✔ **Reduces resource consumption** by avoiding frequent thread creation/destruction.  
 ✔ **Prevents system overload** by limiting the number of concurrent threads.  
 ✔ **Efficient task scheduling** and management.

---

2\. Types of Thread Pools in Java (`ExecutorService`)

Java provides various thread pools using `Executors` class:

2.1 FixedThreadPool

* **Fixed number of threads** (best for predictable workloads).  
* **If all threads are busy, tasks wait in a queue** until a thread is available.

Example

java

CopyEdit

`import java.util.concurrent.*;`

`public class FixedThreadPoolExample {`

    `public static void main(String[] args) {`

        `ExecutorService executor = Executors.newFixedThreadPool(3); // 3 threads`

        `for (int i = 1; i <= 5; i++) {`

            `final int taskId = i;`

            `executor.submit(() -> {`

                `System.out.println("Task " + taskId + " executed by " + Thread.currentThread().getName());`

            `});`

        `}`

        `executor.shutdown(); // Shutdown the executor`

    `}`

`}`

🔹 **Use Case:** Best for CPU-bound tasks (fixed worker threads).

---

2.2 CachedThreadPool

* **Creates new threads as needed but reuses old ones**.  
* **Unused threads are terminated after 60 seconds**.  
* **Best for short-lived tasks with varying workloads**.

Example

java

CopyEdit

`ExecutorService executor = Executors.newCachedThreadPool();`

`for (int i = 1; i <= 5; i++) {`

    `final int taskId = i;`

    `executor.submit(() -> System.out.println("Task " + taskId + " executed by " + Thread.currentThread().getName()));`

`}`

`executor.shutdown();`

🔹 **Use Case:** Best for **I/O-bound tasks** where task execution time varies.

---

2.3 SingleThreadExecutor

* **Only one thread** to execute tasks sequentially.  
* **Ensures task execution order is maintained**.

Example

java

CopyEdit

`ExecutorService executor = Executors.newSingleThreadExecutor();`

`for (int i = 1; i <= 5; i++) {`

    `final int taskId = i;`

    `executor.submit(() -> System.out.println("Task " + taskId + " executed by " + Thread.currentThread().getName()));`

`}`

`executor.shutdown();`

🔹 **Use Case:** Best for tasks that must be executed sequentially (e.g., logging, database writes).

---

2.4 ScheduledThreadPool

* **Executes tasks after a delay or at fixed intervals**.  
* **Best for scheduling periodic tasks (like Cron jobs)**.

Example

java

CopyEdit

`ScheduledExecutorService executor = Executors.newScheduledThreadPool(2);`

`executor.schedule(() -> System.out.println("Task executed after 3 seconds"), 3, TimeUnit.SECONDS);`

`executor.shutdown();`

🔹 **Use Case:** Best for **periodic and delayed tasks** (e.g., sending reminders, polling services).

---

3\. ForkJoinPool (Work-Stealing Pool)

Java 7 introduced **ForkJoinPool** to efficiently execute **divide-and-conquer** tasks using **work-stealing**.

3.1 How ForkJoinPool Works?

✔ Uses **multiple worker threads (parallelism)**.  
 ✔ **Divides large tasks into smaller sub-tasks**.  
 ✔ **Idle threads "steal" uncompleted tasks** from busy threads.

---

3.2 ForkJoin Example

Example: Sum of an Array using ForkJoinPool

java

CopyEdit

`import java.util.concurrent.*;`

`class SumTask extends RecursiveTask<Integer> {`

    `private final int[] array;`

    `private final int start, end;`

    `public SumTask(int[] array, int start, int end) {`

        `this.array = array;`

        `this.start = start;`

        `this.end = end;`

    `}`

    `@Override`

    `protected Integer compute() {`

        `if (end - start <= 2) { // Base case`

            `int sum = 0;`

            `for (int i = start; i < end; i++) sum += array[i];`

            `return sum;`

        `}`

        

        `int mid = (start + end) / 2;`

        `SumTask leftTask = new SumTask(array, start, mid);`

        `SumTask rightTask = new SumTask(array, mid, end);`

        `leftTask.fork(); // Execute left task asynchronously`

        `int rightResult = rightTask.compute(); // Compute right task synchronously`

        `int leftResult = leftTask.join(); // Wait for left task result`

        `return leftResult + rightResult;`

    `}`

`}`

`public class ForkJoinExample {`

    `public static void main(String[] args) {`

        `ForkJoinPool pool = new ForkJoinPool();`

        `int[] array = {1, 2, 3, 4, 5, 6, 7, 8};`

        `SumTask task = new SumTask(array, 0, array.length);`

        `int result = pool.invoke(task);`

        `System.out.println("Total Sum: " + result);`

    `}`

`}`

🔹 **Output:**

mathematica

CopyEdit

`Total Sum: 36`

✔ ForkJoinPool automatically **distributes work across available processors**.  
 ✔ Uses **RecursiveTask** for returning results and **RecursiveAction** for void tasks.

---

4\. WorkStealingPool

* Java 8 introduced `Executors.newWorkStealingPool()`, which internally uses **ForkJoinPool**.  
* **Efficiently balances work** among threads by **stealing** unfinished tasks.  
* Uses **parallelism based on available CPU cores**.

Example

java

CopyEdit

`ExecutorService executor = Executors.newWorkStealingPool();`

`for (int i = 1; i <= 5; i++) {`

    `final int taskId = i;`

    `executor.submit(() -> System.out.println("Task " + taskId + " executed by " + Thread.currentThread().getName()));`

`}`

`executor.shutdown();`

🔹 **Use Case:** Best for **parallel processing of independent tasks**.

---

5\. Comparing Thread Pools

| Pool Type | Thread Management | Best For |
| ----- | ----- | ----- |
| **FixedThreadPool** | Fixed-size threads | CPU-bound tasks |
| **CachedThreadPool** | Creates new threads as needed | I/O-bound tasks |
| **SingleThreadExecutor** | One thread, sequential execution | Tasks that must run in order |
| **ScheduledThreadPool** | Scheduled execution of tasks | Timers, cron jobs |
| **ForkJoinPool** | Work-stealing, divides tasks | Parallel processing |
| **WorkStealingPool** | Work-stealing using ForkJoinPool | Large task distribution |

---

6\. Conclusion

✅ **Use `FixedThreadPool` for predictable workloads**.  
 ✅ **Use `CachedThreadPool` for unpredictable workloads**.  
 ✅ **Use `SingleThreadExecutor` for sequential execution**.  
 ✅ **Use `ScheduledThreadPool` for periodic tasks**.  
 ✅ **Use `ForkJoinPool` for parallel processing**.  
 ✅ **Use `WorkStealingPool` for dynamic task distribution**.

---

## Java ScheduledThreadPoolExecutor and Thread Termination

1\. Introduction to ScheduledThreadPoolExecutor

`ScheduledThreadPoolExecutor` is a specialized thread pool that allows scheduling tasks **at a fixed rate, after a delay, or periodically**.

🔹 **Main Features:**  
 ✔ Executes **one-time** tasks after a delay.  
 ✔ Executes **periodic** tasks at **fixed rate** or **fixed delay**.  
 ✔ Supports **graceful shutdown** with `shutdown()` and `awaitTermination()`.

---

2\. Creating a ScheduledThreadPoolExecutor

Use **`Executors.newScheduledThreadPool()`** to create a pool with a fixed number of threads.

java

CopyEdit

`import java.util.concurrent.*;`

`public class ScheduledThreadPoolExample {`

    `public static void main(String[] args) {`

        `ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);`

        `Runnable task = () -> System.out.println("Executing task at " + System.currentTimeMillis());`

        `// Schedule task to run after 3 seconds`

        `scheduler.schedule(task, 3, TimeUnit.SECONDS);`

        `scheduler.shutdown();`

    `}`

`}`

🔹 **Output:**

scss

CopyEdit

`Executing task at 1710349423000 (timestamp)`

---

3\. Scheduling Periodic Tasks

3.1 scheduleAtFixedRate()

Executes a task **at a fixed rate** (start time is constant).

java

CopyEdit

`scheduler.scheduleAtFixedRate(task, 1, 3, TimeUnit.SECONDS);`

🔹 **Behavior:**

* Executes every **3 seconds** after initial **1-second delay**.  
* If a task takes longer than the interval, **next execution starts immediately**.

---

3.2 scheduleWithFixedDelay()

Executes a task **after a fixed delay** between the **end of one execution and the start of the next**.

java

CopyEdit

`scheduler.scheduleWithFixedDelay(task, 1, 3, TimeUnit.SECONDS);`

🔹 **Behavior:**

* Executes every **3 seconds after previous task completes**.  
* If a task takes longer, **next execution is delayed accordingly**.

---

4\. Shutting Down Thread Pools

4.1 shutdown()

* **Stops accepting new tasks** but allows **running tasks to finish**.  
* Already scheduled tasks **continue executing**.  
* New task submissions throw **RejectedExecutionException**.

java

CopyEdit

`scheduler.shutdown();`

---

4.2 shutdownNow()

* **Attempts to stop all running tasks immediately**.  
* **Returns a list of unexecuted tasks**.  
* **Interrupts worker threads** but does not guarantee instant termination.

java

CopyEdit

`List<Runnable> unexecutedTasks = scheduler.shutdownNow();`

`System.out.println("Unexecuted tasks: " + unexecutedTasks.size());`

---

4.3 awaitTermination()

* **Waits for all tasks to finish execution** before shutting down.  
* If tasks don’t finish within the specified time, it **forcefully terminates the executor**.

java

CopyEdit

`scheduler.shutdown();`

`try {`

    `if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {`

        `scheduler.shutdownNow(); // Force shutdown`

    `}`

`} catch (InterruptedException e) {`

    `scheduler.shutdownNow();`

`}`

---

5\. shutdown() vs shutdownNow() vs awaitTermination()

| Method | What it does? | Can tasks complete? | Accepts new tasks? |
| ----- | ----- | ----- | ----- |
| **shutdown()** | Initiates shutdown, running tasks continue | ✅ Yes | ❌ No |
| **shutdownNow()** | Attempts immediate shutdown, interrupts tasks | ❌ No (may interrupt running tasks) | ❌ No |
| **awaitTermination()** | Waits for termination before proceeding | ✅ Yes (if tasks complete in time) | ❌ No |

---

6\. Complete Example

java

CopyEdit

`import java.util.concurrent.*;`

`public class ScheduledThreadPoolExecutorExample {`

    `public static void main(String[] args) {`

        `ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);`

        `Runnable task = () -> System.out.println("Task executed at " + System.currentTimeMillis());`

        `// Schedule task at fixed rate`

        `scheduler.scheduleAtFixedRate(task, 1, 2, TimeUnit.SECONDS);`

        `// Wait 10 seconds before shutting down`

        `try {`

            `Thread.sleep(10000);`

        `} catch (InterruptedException e) {`

            `e.printStackTrace();`

        `}`

        `scheduler.shutdown();`

        `try {`

            `if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {`

                `scheduler.shutdownNow(); // Force shutdown`

            `}`

        `} catch (InterruptedException e) {`

            `scheduler.shutdownNow();`

        `}`

    `}`

`}`

🔹 **Key Takeaways:**  
 ✅ **Use `scheduleAtFixedRate()` for precise scheduling.**  
 ✅ **Use `scheduleWithFixedDelay()` for flexible delays.**  
 ✅ **Use `shutdown()` for graceful shutdown.**  
 ✅ **Use `shutdownNow()` to cancel tasks immediately.**  
 ✅ **Use `awaitTermination()` to wait for completion.**

---

## Java Virtual Threads vs Normal Threads | ThreadLocal in Java

1\. Introduction to Java Virtual Threads (JDK 19/21)

Java **Virtual Threads** (introduced in Java 19 as a preview and finalized in Java 21\) provide lightweight, high-performance concurrency by decoupling **threads from OS threads**.

🔹 **Why Virtual Threads?**  
 ✔ **Reduce memory footprint** (Lower cost per thread).  
 ✔ **Better scalability** (Can create millions of threads).  
 ✔ **Ideal for I/O-bound tasks** (e.g., network calls, database queries).

---

2\. Normal Threads vs Virtual Threads

2.1 Normal Threads (Platform Threads)

✔ **Each Java thread maps to an OS thread** (heavy).  
 ✔ **Context switching is expensive**.  
 ✔ **Good for CPU-bound tasks** but **poor for high-concurrency I/O-bound workloads**.

Example: Normal Thread Creation

java

CopyEdit

`public class NormalThreadExample {`

    `public static void main(String[] args) {`

        `Runnable task = () -> System.out.println("Executed by " + Thread.currentThread());`

        `Thread thread = new Thread(task);`

        `thread.start();`

    `}`

`}`

🔹 **Issues with Normal Threads:**

* Limited number of OS threads.  
* **Blocking I/O** leads to **thread starvation**.  
* **Context switching is expensive**.

---

2.2 Virtual Threads (Java 21\)

✔ **Thousands or millions of Virtual Threads can run on few OS threads**.  
 ✔ **No expensive context switching**.  
 ✔ **Best for I/O-bound applications** (e.g., web servers, microservices).

Example: Creating Virtual Threads

java

CopyEdit

`public class VirtualThreadExample {`

    `public static void main(String[] args) {`

        `Runnable task = () -> System.out.println("Executed by " + Thread.currentThread());`

        `Thread.startVirtualThread(task); // Virtual Thread creation`

    `}`

`}`

✔ Runs **millions of threads without system overhead**.

---

2.3 Benchmark: Creating 100,000 Threads

Using Normal Threads

java

CopyEdit

`public class NormalThreadBenchmark {`

    `public static void main(String[] args) {`

        `for (int i = 0; i < 100000; i++) {`

            `new Thread(() -> {}).start();`

        `}`

    `}`

`}`

🔹 **Issues:**  
 ❌ **High CPU & Memory usage**.  
 ❌ **May crash due to OS thread limits**.

---

Using Virtual Threads

java

CopyEdit

`public class VirtualThreadBenchmark {`

    `public static void main(String[] args) {`

        `for (int i = 0; i < 100000; i++) {`

            `Thread.startVirtualThread(() -> {});`

        `}`

    `}`

`}`

✅ **Runs efficiently with minimal memory usage**.

---

3\. Virtual Threads in ExecutorService

Java 21 introduced **`Executors.newVirtualThreadPerTaskExecutor()`**, which creates an ExecutorService using **virtual threads**.

java

CopyEdit

`ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();`

`for (int i = 0; i < 10000; i++) {`

    `executor.submit(() -> {`

        `System.out.println(Thread.currentThread());`

    `});`

`}`

`executor.shutdown();`

✔ **Perfect for web servers and database calls**.

---

4\. When to Use Normal vs Virtual Threads?

| Feature | Normal Threads | Virtual Threads |
| ----- | ----- | ----- |
| **Best for** | CPU-bound tasks | I/O-bound tasks |
| **Thread per request** | ❌ Not scalable | ✅ Highly scalable |
| **Memory footprint** | High | Low |
| **Context Switching** | Expensive | Cheap |
| **Parallelism** | Uses OS threads | Uses lightweight user-mode threads |

🚀 **Use Virtual Threads for web servers, API calls, microservices, and database queries.**

---

5\. ThreadLocal in Java

`ThreadLocal` is a mechanism that **stores variables per thread**, ensuring **thread safety** without synchronization.

5.1 ThreadLocal Example

java

CopyEdit

`public class ThreadLocalExample {`

    `private static ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);`

    `public static void main(String[] args) {`

        `Runnable task = () -> {`

            `threadLocal.set((int) (Math.random() * 100));`

            `System.out.println(Thread.currentThread().getName() + " -> " + threadLocal.get());`

        `};`

        `Thread t1 = new Thread(task);`

        `Thread t2 = new Thread(task);`

        `t1.start();`

        `t2.start();`

    `}`

`}`

🔹 **Each thread gets its own independent variable.**

---

5.2 ThreadLocal vs Virtual Threads

`ThreadLocal` **stores variables per thread**, but **Virtual Threads don't retain thread affinity**.

* **Using ThreadLocal in Virtual Threads is discouraged** since virtual threads are reused.

🚀 **Use `ScopedValues` (Java 21\) instead of ThreadLocal in Virtual Threads\!**

---

6\. Summary

| Feature | Normal Threads | Virtual Threads |
| ----- | ----- | ----- |
| **Use Cases** | CPU-bound tasks | I/O-bound tasks |
| **Scalability** | Limited | Millions of threads |
| **Memory Overhead** | High | Low |
| **ThreadLocal Support** | ✅ Yes | ❌ No (Use ScopedValues) |

🚀 **Use Virtual Threads for web servers, database calls, and async processing\!**  
 🔥 **Use ThreadLocal only in traditional threads, not Virtual Threads.**

---

