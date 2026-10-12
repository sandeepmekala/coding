# 

[**Java Interface in Depth	1**](#java-interface-in-depth)

[**Default, Static & Private Methods in Interface \- Java 8 & Java 9 Features	13**](#default,-static-&-private-methods-in-interface---java-8-&-java-9-features)

[**Functional Interface and Lambda Expression \- Java 8 Features	21**](#functional-interface-and-lambda-expression---java-8-features)

[**Java Reflection in Depth (With Examples)	27**](#java-reflection-in-depth-\(with-examples\))

[**Java Annotations \- Complete Guide with Examples	35**](#java-annotations---complete-guide-with-examples)

# 

# Java Interface in Depth {#java-interface-in-depth}

1\. What is an Interface and How to Define It?

An **interface** in Java is a **blueprint** for a class that defines a **set of methods** without providing their implementations. It is used to achieve **abstraction** and **multiple inheritance** in Java.

Syntax of an Interface

java

CopyEdit

`interface Animal {`

    `void makeSound();  // Abstract method (no implementation)`

`}`

✔ **All methods in an interface are abstract by default (until Java 8).**  
 ✔ **An interface cannot have a constructor (cannot create objects).**

---

2\. Why Do We Need an Interface?

Interfaces help in **decoupling** code, **achieving abstraction**, and **supporting multiple inheritance** in Java.

Key Benefits of Interfaces:

✔ **Achieves Abstraction**: Hides implementation details.  
 ✔ **Supports Multiple Inheritance**: A class can implement multiple interfaces.  
 ✔ **Promotes Loose Coupling**: Helps in designing flexible applications.  
 ✔ **Defines a Contract**: Ensures that implementing classes follow a common structure.

Example of Loose Coupling

java

CopyEdit

`interface Vehicle {`

    `void start();`

`}`

`class Car implements Vehicle {`

    `public void start() {`

        `System.out.println("Car is starting...");`

    `}`

`}`

`class Bike implements Vehicle {`

    `public void start() {`

        `System.out.println("Bike is starting...");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Vehicle v = new Car();  // Loose coupling`

        `v.start();  // Output: Car is starting...`

    `}`

`}`

✔ The `Vehicle` interface allows us to create flexible, reusable code.

---

3\. Methods in an Interface

Before Java 8, **all methods** in an interface were **abstract**. Java 8 introduced **default and static methods**, and Java 9 introduced **private methods**.

Types of Methods in an Interface

| Method Type | Modifier | Implementation | Since |
| ----- | ----- | ----- | ----- |
| **Abstract Method** | `public abstract` (default) | No implementation | Java 1.0 |
| **Default Method** | `default` | Has implementation | Java 8 |
| **Static Method** | `static` | Has implementation | Java 8 |
| **Private Method** | `private` | Used inside the interface | Java 9 |

---

3.1 Abstract Methods (Default)

java

CopyEdit

`interface Animal {`

    `void eat();  // Abstract method (No body)`

`}`

✔ **All interface methods are `public` and `abstract` by default.**

---

3.2 Default Methods (Introduced in Java 8\)

Allows adding new methods **without breaking existing implementations**.

java

CopyEdit

`interface Animal {`

    `void eat();`

    `default void sleep() {`

        `System.out.println("Sleeping...");`

    `}`

`}`

`class Dog implements Animal {`

    `public void eat() {`

        `System.out.println("Dog is eating...");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Dog d = new Dog();`

        `d.eat();   // Output: Dog is eating...`

        `d.sleep(); // Output: Sleeping...`

    `}`

`}`

✔ **`default` methods can be overridden in implementing classes.**

---

3.3 Static Methods (Introduced in Java 8\)

Static methods belong to the interface and **cannot be overridden**.

java

CopyEdit

`interface MathOperations {`

    `static int square(int x) {`

        `return x * x;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `System.out.println(MathOperations.square(5)); // Output: 25`

    `}`

`}`

✔ **`static` methods are accessed using `InterfaceName.method()`.**

---

3.4 Private Methods (Introduced in Java 9\)

Used **only inside the interface** to avoid code duplication.

java

CopyEdit

`interface Logger {`

    `default void logInfo(String message) {`

        `log("INFO: " + message);`

    `}`

    `private void log(String message) {  // Private method`

        `System.out.println(message);`

    `}`

`}`

`class App implements Logger { }`

`public class Main {`

    `public static void main(String[] args) {`

        `App app = new App();`

        `app.logInfo("Application started!");`  

        `// Output: INFO: Application started!`

    `}`

`}`

✔ **`private` methods are useful for code reuse inside the interface.**

---

4\. Fields in an Interface

* All fields in an interface are **public, static, and final** by default.  
* They **must be initialized** at declaration.

java

CopyEdit

`interface Config {`

    `int MAX_USERS = 100;  // Public, static, and final by default`

`}`

✔ **Cannot modify `MAX_USERS` because it is `final`.**

---

5\. Interface Implementation

A class uses the `implements` keyword to implement an interface.

java

CopyEdit

`interface Animal {`

    `void makeSound();`

`}`

`class Dog implements Animal {`

    `public void makeSound() {`

        `System.out.println("Woof Woof!");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Animal dog = new Dog();`

        `dog.makeSound();  // Output: Woof Woof!`

    `}`

`}`

✔ **A class must implement all abstract methods of an interface.**

---

6\. Nested Interfaces

A **nested interface** is an interface inside another interface or class.

6.1 Nested Interface Inside Another Interface

java

CopyEdit

`interface Outer {`

    `interface Inner {`

        `void show();`

    `}`

`}`

`class Test implements Outer.Inner {`

    `public void show() {`

        `System.out.println("Nested Interface Implemented!");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Outer.Inner obj = new Test();`

        `obj.show();  // Output: Nested Interface Implemented!`

    `}`

`}`

✔ **Used in frameworks and API design.**

---

7\. Difference Between Interface and Abstract Class

| Feature | Interface | Abstract Class |
| ----- | ----- | ----- |
| **Definition** | Blueprint with abstract methods | Can have both abstract and concrete methods |
| **Methods** | Abstract, default, static, and private methods | Abstract and concrete methods |
| **Fields** | Only `public static final` fields | Can have `static`, `final`, and instance fields |
| **Constructors** | No constructors | Can have constructors |
| **Access Modifiers** | Methods are `public` by default | Methods can have any access modifier |
| **Multiple Inheritance** | A class can implement multiple interfaces | A class can extend only one abstract class |
| **Performance** | Slower due to method lookup | Faster than interfaces |

---

# Default, Static & Private Methods in Interface \- Java 8 & Java 9 Features {#default,-static-&-private-methods-in-interface---java-8-&-java-9-features}

(📌 *Java Interfaces \- Part 2*)

1\. Introduction

Before **Java 8**, interfaces in Java could only have **abstract methods** (methods without a body). Java 8 introduced **default and static methods**, and Java 9 introduced **private methods**. These enhancements made interfaces more powerful while ensuring backward compatibility.

Why Were These Features Introduced?

✔ To **add new methods** to interfaces **without breaking existing implementations**.  
 ✔ To **avoid duplicate code** across multiple implementing classes.  
 ✔ To provide **utility methods** inside interfaces using **static methods**.

---

2\. Default Methods in Interface (Java 8\)

A **default method** is a method with a body inside an interface. It provides a **default implementation** for implementing classes.

Syntax:  
java

CopyEdit

`interface InterfaceName {`

    `default void methodName() {`

        `// method implementation`

    `}`

`}`

Example: Default Method in Interface  
java

CopyEdit

`interface Vehicle {`

    `void start(); // Abstract method`

    `default void stop() {  // Default method`

        `System.out.println("Vehicle is stopping...");`

    `}`

`}`

`class Car implements Vehicle {`

    `public void start() {`

        `System.out.println("Car is starting...");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Car car = new Car();`

        `car.start(); // Output: Car is starting...`

        `car.stop();  // Output: Vehicle is stopping...`

    `}`

`}`

✔ The `stop()` method **does not need to be implemented** in `Car` because it has a **default** implementation.

---

2.1 Overriding a Default Method

If a class needs a **custom implementation**, it can **override** the default method.

java

CopyEdit

`class Bike implements Vehicle {`

    `public void start() {`

        `System.out.println("Bike is starting...");`

    `}`

    `@Override`

    `public void stop() {`

        `System.out.println("Bike is stopping...");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Bike bike = new Bike();`

        `bike.start(); // Output: Bike is starting...`

        `bike.stop();  // Output: Bike is stopping... (Overridden method)`

    `}`

`}`

✔ **A default method can be overridden** in the implementing class.

---

2.2 Default Methods with Multiple Interfaces (Diamond Problem)

If a class implements **two interfaces** with the **same default method**, it **must override** the method to avoid ambiguity.

java

CopyEdit

`interface InterfaceA {`

    `default void show() {`

        `System.out.println("InterfaceA show()");`

    `}`

`}`

`interface InterfaceB {`

    `default void show() {`

        `System.out.println("InterfaceB show()");`

    `}`

`}`

`class MyClass implements InterfaceA, InterfaceB {`

    `@Override`

    `public void show() {`

        `System.out.println("MyClass show() - Resolving conflict");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `MyClass obj = new MyClass();`

        `obj.show(); // Output: MyClass show() - Resolving conflict`

    `}`

`}`

✔ The implementing class must **override the method** to resolve the conflict.

---

3\. Static Methods in Interface (Java 8\)

A **static method** inside an interface **belongs to the interface itself** and **cannot be overridden** by implementing classes.

Syntax:  
java

CopyEdit

`interface InterfaceName {`

    `static void methodName() {`

        `// method implementation`

    `}`

`}`

Example: Static Method in Interface  
java

CopyEdit

`interface Utility {`

    `static int square(int x) {`

        `return x * x;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `System.out.println(Utility.square(5)); // Output: 25`

    `}`

`}`

✔ **Static methods are accessed using `InterfaceName.method()`.**  
 ✔ **They are not inherited by implementing classes.**

---

3.1 Static Methods Cannot Be Overridden  
java

CopyEdit

`interface Helper {`

    `static void display() {`

        `System.out.println("Helper Interface - Static Method");`

    `}`

`}`

`class Test implements Helper {`

    `// Cannot override static methods from an interface`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Test obj = new Test();`

        `// obj.display(); // ❌ Error: Cannot access static method from an instance`

        `Helper.display(); // ✅ Correct way to call it`

    `}`

`}`

✔ **Static methods belong to the interface, not the class implementing it.**

---

4\. Private Methods in Interface (Java 9\)

Java 9 introduced **private methods** in interfaces to **avoid code duplication** inside default and static methods.

Syntax:  
java

CopyEdit

`interface InterfaceName {`

    `private void methodName() {`

        `// method implementation`

    `}`

`}`

---

4.1 Example: Private Method Inside an Interface  
java

CopyEdit

`interface Logger {`

    `default void logInfo(String message) {`

        `log("INFO: " + message);`

    `}`

    `default void logError(String message) {`

        `log("ERROR: " + message);`

    `}`

    `private void log(String message) {  // Private method`

        `System.out.println(message);`

    `}`

`}`

`class App implements Logger { }`

`public class Main {`

    `public static void main(String[] args) {`

        `App app = new App();`

        `app.logInfo("Application started!");`  

        `// Output: INFO: Application started!`

        

        `app.logError("Something went wrong!");`  

        `// Output: ERROR: Something went wrong!`

    `}`

`}`

✔ The `log()` method is used by both `logInfo()` and `logError()` **without being exposed** to the implementing class.  
 ✔ **Private methods in an interface cannot be accessed outside the interface.**

---

5\. Summary of Java 8 & Java 9 Interface Features

| Feature | Java Version | Access Modifier | Purpose |
| ----- | ----- | ----- | ----- |
| **Default Method** | Java 8 | `default` | Allows adding new methods to interfaces without breaking existing implementations |
| **Static Method** | Java 8 | `static` | Provides utility methods inside interfaces |
| **Private Method** | Java 9 | `private` | Helps in code reuse inside default and static methods |

---

6\. Key Takeaways

✔ **Default methods** allow interfaces to have method implementations.  
 ✔ **Static methods** belong to the interface and cannot be overridden.  
 ✔ **Private methods** help in **code reuse** inside the interface.  
 ✔ **Default methods solve the problem of API evolution** without breaking existing implementations.  
 ✔ **Diamond problem can arise with default methods** if two interfaces have the same method, requiring explicit overriding.

---

# Functional Interface and Lambda Expression \- Java 8 Features {#functional-interface-and-lambda-expression---java-8-features}

(📌 *Java Interfaces \- Part 3*)

1\. What is a Functional Interface?

A **functional interface** in Java is an interface that contains **exactly one abstract method**. It can have **multiple default and static methods** but must have **only one abstract method**.

Key Points:

✔ Functional interfaces are introduced in **Java 8**.  
 ✔ They are used for **Lambda Expressions** and **method references**.  
 ✔ Annotated with `@FunctionalInterface` (optional but recommended).

Example of a Functional Interface  
java

CopyEdit

`@FunctionalInterface`

`interface Greeting {`

    `void sayHello();  // Only one abstract method`

`}`

✔ This interface qualifies as a **Functional Interface** because it has exactly **one abstract method**.

---

2\. What is a Lambda Expression?

A **lambda expression** is a concise way to write **anonymous functions** in Java. It allows you to pass behavior as a parameter.

Syntax of Lambda Expression:  
java

CopyEdit

`(parameters) -> { body }`

---

3\. How to Use Functional Interfaces with Lambda Expressions?

A **lambda expression** can be used to implement a **functional interface** directly.

Example: Using a Lambda Expression with a Functional Interface  
java

CopyEdit

`@FunctionalInterface`

`interface Greeting {`

    `void sayHello();`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `// Using Lambda Expression`

        `Greeting greet = () -> System.out.println("Hello, World!");`

        `greet.sayHello(); // Output: Hello, World!`

    `}`

`}`

✔ The lambda expression `() -> System.out.println("Hello, World!")` replaces the need for a traditional class implementation.

---

4\. Advantage of Functional Interfaces

| Feature | Benefit |
| ----- | ----- |
| **Less Boilerplate Code** | Eliminates anonymous class syntax |
| **More Readable Code** | Simplifies function definitions |
| **Used in Streams & Parallel Processing** | Enhances Java functional programming |
| **Supports Method References** | Allows passing behavior as a parameter |

---

5\. Types of Functional Interfaces

Java provides four main functional interfaces in the `java.util.function` package:

5.1 Consumer (Accepts a value, returns nothing)

A **Consumer** takes **one input parameter** but **does not return** a value.

java

CopyEdit

`import java.util.function.Consumer;`

`public class Main {`

    `public static void main(String[] args) {`

        `Consumer<String> print = message -> System.out.println("Message: " + message);`

        `print.accept("Hello Java 8!"); // Output: Message: Hello Java 8!`

    `}`

`}`

✔ **Use Case:** Logging, performing actions without returning values.

---

5.2 Supplier (Returns a value, takes nothing)

A **Supplier** does **not take any input** but **returns a value**.

java

CopyEdit

`import java.util.function.Supplier;`

`public class Main {`

    `public static void main(String[] args) {`

        `Supplier<Double> getRandom = () -> Math.random();`

        `System.out.println(getRandom.get()); // Output: Random number`

    `}`

`}`

✔ **Use Case:** Generating values (random numbers, timestamps).

---

5.3 Function (Takes input, returns output)

A **Function** takes **one input** and **returns one output**.

java

CopyEdit

`import java.util.function.Function;`

`public class Main {`

    `public static void main(String[] args) {`

        `Function<Integer, Integer> square = x -> x * x;`

        `System.out.println(square.apply(5)); // Output: 25`

    `}`

`}`

✔ **Use Case:** Data transformation, mapping.

---

5.4 Predicate (Takes input, returns boolean)

A **Predicate** takes **one input** and **returns a boolean value**.

java

CopyEdit

`import java.util.function.Predicate;`

`public class Main {`

    `public static void main(String[] args) {`

        `Predicate<Integer> isEven = num -> num % 2 == 0;`

        `System.out.println(isEven.test(10)); // Output: true`

    `}`

`}`

✔ **Use Case:** Filtering, conditional checks.

---

6\. How to Handle Functional Interface Extending Another Interface?

A functional interface **can extend another interface**, but it must still have **only one abstract method**.

Case 1: Extending a Functional Interface  
java

CopyEdit

`@FunctionalInterface`

`interface A {`

    `void methodA();`

`}`

`@FunctionalInterface`

`interface B extends A { // Extends A, no new abstract method`

`}`

✔ `B` is still a **valid functional interface** because it inherits `methodA()`.

---

Case 2: Adding a New Abstract Method (Invalid Case)  
java

CopyEdit

`@FunctionalInterface`

`interface A {`

    `void methodA();`

`}`

`@FunctionalInterface`

`interface B extends A {`

    `void methodB(); // ❌ Error: More than one abstract method`

`}`

❌ This will cause a **compilation error** because `B` now has **two abstract methods**.

---

Case 3: Extending a Non-Functional Interface

If an interface **extends a non-functional interface**, it can **still be functional** if it introduces only **one abstract method**.

java

CopyEdit

`interface A {`

    `default void defaultMethod() {`

        `System.out.println("Default method in A");`

    `}`

`}`

`@FunctionalInterface`

`interface B extends A {`

    `void methodB(); // Only one abstract method`

`}`

✔ `B` is still a **valid functional interface** because it has **only one abstract method**.

---

7\. Summary

| Feature | Explanation |
| ----- | ----- |
| **Functional Interface** | An interface with **only one abstract method** |
| **Lambda Expression** | A concise way to write function implementations |
| **Consumer** | Takes an input, **returns nothing** |
| **Supplier** | Takes **no input**, returns a **value** |
| **Function** | Takes an input, returns **a transformed value** |
| **Predicate** | Takes an input, returns **a boolean result** |
| **Extending Functional Interfaces** | The child interface must still have **only one abstract method** |

---

# Java Reflection in Depth (With Examples) {#java-reflection-in-depth-(with-examples)}

1\. Introduction to Java Reflection

Java **Reflection** is a powerful feature that allows us to **inspect and manipulate classes, methods, fields, and constructors at runtime**. It is part of the **`java.lang.reflect`** package.

Why Use Reflection?

✔ Used in **frameworks** (Spring, Hibernate, JUnit, etc.)  
 ✔ Helps in **analyzing classes, methods, and fields** dynamically  
 ✔ Useful for **dependency injection and debugging**  
 ✔ Allows accessing **private fields and methods**

---

2\. Getting Class Object Using Reflection

Before using Reflection, we need to get the `Class` object of a class.

Ways to Get `Class` Object  
java

CopyEdit

`class Example { }`

`public class Main {`

    `public static void main(String[] args) throws ClassNotFoundException {`

        `// 1. Using Class.forName()`

        `Class<?> c1 = Class.forName("Example");`

        

        `// 2. Using .class`

        `Class<?> c2 = Example.class;`

        `// 3. Using getClass() method on an object`

        `Example obj = new Example();`

        `Class<?> c3 = obj.getClass();`

        `System.out.println(c1 == c2); // true`

        `System.out.println(c2 == c3); // true`

    `}`

`}`

✔ **All three approaches return the same `Class` object.**

---

3\. Getting All Methods of a Class

We can use `getDeclaredMethods()` or `getMethods()` to retrieve methods of a class.

Example: Get All Methods of a Class  
java

CopyEdit

`import java.lang.reflect.Method;`

`class Example {`

    `public void method1() {}`

    `private void method2() {}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Class<?> clazz = Example.class;`

        `Method[] methods = clazz.getDeclaredMethods(); // Gets all methods (public + private)`

        `System.out.println("Methods in Example class:");`

        `for (Method method : methods) {`

            `System.out.println(method.getName());`

        `}`

    `}`

`}`

✔ `getDeclaredMethods()` gets **all methods** (including private ones).  
 ✔ `getMethods()` gets **only public methods**, including inherited ones.

---

4\. Getting All Fields of a Class

We can inspect all fields (variables) of a class using `getDeclaredFields()`.

Example: Get All Fields  
java

CopyEdit

`import java.lang.reflect.Field;`

`class Example {`

    `public int publicField;`

    `private String privateField;`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Class<?> clazz = Example.class;`

        `Field[] fields = clazz.getDeclaredFields();`

        `System.out.println("Fields in Example class:");`

        `for (Field field : fields) {`

            `System.out.println(field.getName());`

        `}`

    `}`

`}`

✔ `getDeclaredFields()` returns **all fields**, including private ones.  
 ✔ `getFields()` returns **only public fields**.

---

5\. Getting Return Type of a Method

The return type of a method can be determined using `getReturnType()`.

Example: Get Return Type  
java

CopyEdit

`import java.lang.reflect.Method;`

`class Example {`

    `public String getMessage() { return "Hello"; }`

`}`

`public class Main {`

    `public static void main(String[] args) throws Exception {`

        `Class<?> clazz = Example.class;`

        `Method method = clazz.getDeclaredMethod("getMessage");`

        

        `System.out.println("Return Type: " + method.getReturnType().getName());`

    `}`

`}`

✔ The `getReturnType()` method returns the **return type** of the method.

---

6\. Getting Modifiers of a Class

The **modifiers** (public, private, abstract, final, etc.) of a class can be determined using `getModifiers()`.

Example: Get Class Modifiers  
java

CopyEdit

`import java.lang.reflect.Modifier;`

`abstract class Example { }`

`public class Main {`

    `public static void main(String[] args) {`

        `Class<?> clazz = Example.class;`

        `int modifiers = clazz.getModifiers();`

        `System.out.println("Is Abstract? " + Modifier.isAbstract(modifiers));`

        `System.out.println("Is Public? " + Modifier.isPublic(modifiers));`

    `}`

`}`

✔ `Modifier.isAbstract(modifiers)` checks if the class is **abstract**.  
 ✔ `Modifier.isPublic(modifiers)` checks if the class is **public**.

---

7\. Getting Implemented Interfaces

We can get the list of interfaces implemented by a class using `getInterfaces()`.

Example: Get Implemented Interfaces  
java

CopyEdit

`interface A { }`

`interface B { }`

`class Example implements A, B { }`

`public class Main {`

    `public static void main(String[] args) {`

        `Class<?> clazz = Example.class;`

        `Class<?>[] interfaces = clazz.getInterfaces();`

        `System.out.println("Implemented Interfaces:");`

        `for (Class<?> i : interfaces) {`

            `System.out.println(i.getName());`

        `}`

    `}`

`}`

✔ `getInterfaces()` returns an array of **interfaces implemented by the class**.

---

8\. Changing Private and Public Field Values

We can **modify public and private fields** using `setAccessible(true)`.

Example: Changing Field Value  
java

CopyEdit

`import java.lang.reflect.Field;`

`class Example {`

    `private String secret = "Initial Value";`

`}`

`public class Main {`

    `public static void main(String[] args) throws Exception {`

        `Example obj = new Example();`

        `Class<?> clazz = obj.getClass();`

        

        `Field field = clazz.getDeclaredField("secret");`

        `field.setAccessible(true);  // Allow access to private field`

        `System.out.println("Before: " + field.get(obj));`

        `field.set(obj, "New Value"); // Changing value`

        `System.out.println("After: " + field.get(obj));`

    `}`

`}`

✔ **`setAccessible(true)` allows access to private fields.**  
 ✔ This technique is commonly used in **unit testing** and **serialization frameworks**.

---

9\. Calling Private Methods Using Reflection

We can invoke private methods using `setAccessible(true)`.

Example: Invoke a Private Method  
java

CopyEdit

`import java.lang.reflect.Method;`

`class Example {`

    `private void displaySecret() {`

        `System.out.println("Private Method Invoked!");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) throws Exception {`

        `Example obj = new Example();`

        `Class<?> clazz = obj.getClass();`

        

        `Method method = clazz.getDeclaredMethod("displaySecret");`

        `method.setAccessible(true); // Allow access to private method`

        `method.invoke(obj); // Call method`

    `}`

`}`

✔ This allows **private methods to be accessed dynamically**.

---

10\. Summary

| Feature | Reflection Method |
| ----- | ----- |
| Get class object | `Class.forName("ClassName")`, `.class`, `obj.getClass()` |
| Get methods | `getDeclaredMethods()`, `getMethods()` |
| Get fields | `getDeclaredFields()`, `getFields()` |
| Get return type of method | `method.getReturnType()` |
| Get class modifiers | `Modifier.isPublic(modifiers)`, `Modifier.isAbstract(modifiers)` |
| Get interfaces | `getInterfaces()` |
| Change field value | `field.setAccessible(true)`, `field.set(obj, value)` |
| Call private method | `method.setAccessible(true)`, `method.invoke(obj)` |

---

11\. When to Use Reflection (And When Not To)

✔ **When to Use:**  
 ✅ **Frameworks** (Spring, Hibernate)  
 ✅ **Unit Testing** (Mocking private fields)  
 ✅ **Serialization/Deserialization**

❌ **When to Avoid:**  
 🚫 Performance overhead (Reflection is **slower** than direct method calls)  
 🚫 Breaks encapsulation (Accessing **private fields/methods**)  
 🚫 Security risks (Bypassing access control)

---

# Java Annotations \- Complete Guide with Examples {#java-annotations---complete-guide-with-examples}

1\. What are Java Annotations?

Annotations in Java provide **metadata** about the code but **do not change its behavior**. They are used by compilers, frameworks, and runtime environments to perform different operations.

Why Use Annotations?

✔ Reduce boilerplate code  
 ✔ Provide additional information to the compiler  
 ✔ Enable **dependency injection, serialization, testing**, and more  
 ✔ Used in **frameworks like Spring, Hibernate, JUnit**

---

2\. Built-in Java Annotations

Java provides several built-in annotations categorized into three types:

A. Compiler Annotations (Checked at Compile Time)

| Annotation | Description |
| ----- | ----- |
| `@Override` | Ensures that a method overrides a superclass method |
| `@Deprecated` | Marks a method or class as outdated |
| `@SuppressWarnings` | Suppresses compiler warnings |

Example of `@Override`

java

CopyEdit

`class Parent {`

    `void show() {`

        `System.out.println("Parent class method");`

    `}`

`}`

`class Child extends Parent {`

    `@Override`

    `void show() {`

        `System.out.println("Overridden method in Child");`

    `}`

`}`

✔ Ensures that `show()` correctly **overrides** the parent class method.

---

Example of `@Deprecated`

java

CopyEdit

`class Example {`

    `@Deprecated`

    `void oldMethod() {`

        `System.out.println("This method is deprecated.");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Example obj = new Example();`

        `obj.oldMethod();  // Compiler will warn about usage`

    `}`

`}`

✔ Marks `oldMethod()` as **deprecated**.  
 ✔ The compiler warns against its usage.

---

Example of `@SuppressWarnings`

java

CopyEdit

`public class Main {`

    `@SuppressWarnings("unchecked")`

    `public static void main(String[] args) {`

        `java.util.List rawList = new java.util.ArrayList(); // Warning suppressed`

        `rawList.add("Hello");`

    `}`

`}`

✔ Suppresses **unchecked type warnings**.

---

B. Runtime Annotations (Available at Runtime)

| Annotation | Description |
| ----- | ----- |
| `@Retention` | Specifies how long the annotation is retained |
| `@Target` | Specifies where the annotation can be applied |
| `@Inherited` | Allows an annotation to be inherited by subclasses |
| `@Documented` | Includes annotation in the JavaDoc |

---

3\. Creating Custom Annotations

We can define our own annotations using the `@interface` keyword.

Example: Custom Annotation  
java

CopyEdit

`import java.lang.annotation.*;`

`@Retention(RetentionPolicy.RUNTIME) // Available at runtime`

`@Target(ElementType.METHOD) // Used on methods only`

`@interface MyAnnotation {`

    `String value();`

    `int count() default 1;`

`}`

`class Example {`

    `@MyAnnotation(value = "Hello", count = 3)`

    `public void testMethod() {`

        `System.out.println("Executing testMethod...");`

    `}`

`}`

✔ `@Retention(RetentionPolicy.RUNTIME)`: Keeps annotation available at **runtime**.  
 ✔ `@Target(ElementType.METHOD)`: Can be applied **only on methods**.

---

4\. Retrieving Annotations Using Reflection

We can **access annotation values at runtime** using Reflection.

Example: Reading Custom Annotation at Runtime  
java

CopyEdit

`import java.lang.reflect.Method;`

`public class Main {`

    `public static void main(String[] args) throws Exception {`

        `Class<?> clazz = Example.class;`

        `Method method = clazz.getMethod("testMethod");`

        `// Check if annotation is present`

        `if (method.isAnnotationPresent(MyAnnotation.class)) {`

            `MyAnnotation annotation = method.getAnnotation(MyAnnotation.class);`

            `System.out.println("Value: " + annotation.value());`

            `System.out.println("Count: " + annotation.count());`

        `}`

    `}`

`}`

✔ **Reflection** allows accessing annotation values dynamically.

---

5\. Meta-Annotations in Java

Meta-annotations are **annotations that define other annotations**.

| Meta-Annotation | Description |
| ----- | ----- |
| `@Retention` | Specifies how long an annotation is retained |
| `@Target` | Specifies where an annotation can be applied |
| `@Inherited` | Allows a subclass to inherit an annotation |
| `@Documented` | Includes annotation in JavaDocs |

Example: Using Meta-Annotations  
java

CopyEdit

`import java.lang.annotation.*;`

`@Retention(RetentionPolicy.RUNTIME) // Available at runtime`

`@Target({ElementType.METHOD, ElementType.TYPE}) // Can be applied to classes and methods`

`@interface MyMetaAnnotation { }`

✔ `@Target(ElementType.TYPE)`: Can be used on **classes**.  
 ✔ `@Target(ElementType.METHOD)`: Can be used on **methods**.

---

6\. Built-in Java 8+ Annotations

Java 8 introduced **repeatable annotations** and **type annotations**.

A. `@Repeatable` Annotation (Multiple Instances of Same Annotation)  
java

CopyEdit

`import java.lang.annotation.*;`

`@Retention(RetentionPolicy.RUNTIME)`

`@Target(ElementType.METHOD)`

`@Repeatable(MyAnnotations.class) // Allows multiple annotations`

`@interface MyAnnotation {`

    `String value();`

`}`

`// Container annotation`

`@Retention(RetentionPolicy.RUNTIME)`

`@Target(ElementType.METHOD)`

`@interface MyAnnotations {`

    `MyAnnotation[] value();`

`}`

`class Example {`

    `@MyAnnotation("First")`

    `@MyAnnotation("Second")`

    `public void testMethod() {`

    `}`

`}`

✔ `@Repeatable(MyAnnotations.class)`: Allows multiple instances of `@MyAnnotation`.

---

B. Java 8 Type Annotations (`@Target(ElementType.TYPE_USE)`)  
java

CopyEdit

`import java.lang.annotation.*;`

`@Retention(RetentionPolicy.RUNTIME)`

`@Target(ElementType.TYPE_USE)`

`@interface NonNull { }`

`class Example {`

    `public void display(@NonNull String message) {`

        `System.out.println(message);`

    `}`

`}`

✔ **`ElementType.TYPE_USE`** allows annotations to be used **on variables, return types, and parameters**.

---

7\. Real-World Applications of Annotations

A. Annotations in JUnit

JUnit uses annotations for testing.

java

CopyEdit

`import org.junit.jupiter.api.*;`

`public class TestExample {`

    `@BeforeEach`

    `void setup() {`

        `System.out.println("Setup before each test");`

    `}`

    `@Test`

    `void testMethod() {`

        `System.out.println("Running test");`

    `}`

`}`

✔ `@BeforeEach` runs **before every test method**.  
 ✔ `@Test` marks a method as a **test case**.

---

B. Annotations in Spring (Dependency Injection)

Spring uses annotations like `@Autowired` to **inject dependencies**.

java

CopyEdit

`import org.springframework.beans.factory.annotation.Autowired;`

`import org.springframework.stereotype.Component;`

`@Component`

`class Car {`

    `void drive() { System.out.println("Driving a car..."); }`

`}`

`@Component`

`class Person {`

    `@Autowired`

    `private Car car;`

    `void startJourney() { car.drive(); }`

`}`

✔ **`@Autowired`** injects `Car` into `Person`.  
 ✔ **`@Component`** marks classes as Spring components.

---

8\. Summary

| Feature | Description |
| ----- | ----- |
| **Built-in Annotations** | `@Override`, `@Deprecated`, `@SuppressWarnings` |
| **Runtime Annotations** | `@Retention`, `@Target`, `@Inherited`, `@Documented` |
| **Custom Annotations** | `@interface MyAnnotation {}` |
| **Accessing Annotations** | `method.getAnnotation(MyAnnotation.class)` |
| **Java 8+ Features** | `@Repeatable`, `@Target(ElementType.TYPE_USE)` |
| **Used In** | **JUnit, Spring, Hibernate, Logging, ORM frameworks** |

---

