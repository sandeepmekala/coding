# 

[**Java Memory Management and Garbage Collection in Depth	2**](#java-memory-management-and-garbage-collection-in-depth)

[**Java Classes in Depth \- Part 1: Nested Class, Concrete, Abstract, Object, Super and Sub Class	8**](#java-classes-in-depth---part-1:-nested-class,-concrete,-abstract,-object,-super-and-sub-class)

[**Java Generic Classes | Java Classes in Depth \- Part 2	16**](#java-generic-classes-|-java-classes-in-depth---part-2)

[**Java Enum, POJO, and Final Classes Explained with Examples | Java Classes in Depth \- Part 3	23**](#java-enum,-pojo,-and-final-classes-explained-with-examples-|-java-classes-in-depth---part-3)

[**Java Singleton and Immutable Class Explained with Examples | Java Classes in Depth \- Part 4	31**](#java-singleton-and-immutable-class-explained-with-examples-|-java-classes-in-depth---part-4)

# 

# Java Memory Management and Garbage Collection in Depth {#java-memory-management-and-garbage-collection-in-depth}

1\. Introduction to Java Memory Management

Java handles memory management **automatically** using the **JVM (Java Virtual Machine)**. It manages memory allocation and deallocation efficiently, preventing memory leaks.

Key Memory Areas in Java:

1️⃣ **Heap Memory** \- Stores objects and class instances.  
 2️⃣ **Stack Memory** \- Stores method calls and local variables.  
 3️⃣ **Method Area (MetaSpace in Java 8+)** \- Stores class metadata, method code, and static variables.  
 4️⃣ **PC Register** \- Keeps track of instruction execution.  
 5️⃣ **Native Method Stack** \- Used for native (non-Java) methods.

---

2\. Java Memory Structure (JVM Memory Areas)

🔹 1\. Heap Memory

* **Stores objects** created using `new` keyword.  
* **Shared among all threads.**  
* **Divided into:**  
  * **Young Generation** (Eden \+ Survivor Spaces)  
  * **Old Generation (Tenured Heap)**  
  * **Permanent Generation (Before Java 8, replaced with MetaSpace)**

🔹 2\. Stack Memory

* **Stores method calls and local variables.**  
* **Follows LIFO (Last-In-First-Out) order.**  
* **Each thread has its own stack.**

🔹 3\. Method Area (MetaSpace in Java 8+)

* Stores **class metadata, static variables, method code**.  
* **Shared among all threads.**  
* **MetaSpace (Java 8+) grows dynamically, unlike the fixed-size PermGen in Java 7\.**

🔹 4\. Program Counter (PC) Register

* Stores the **current execution instruction address** of each thread.  
* **Each thread has a separate PC Register.**

🔹 5\. Native Method Stack

* **Used for native (C, C++) method execution.**  
* **Each thread has its own native stack.**

---

3\. Java Heap Memory Structure (Generations in Heap)

The **Heap Memory** is divided into **three main sections**:

(a) Young Generation

* **Newly created objects are stored here.**  
* **Divided into:**  
  * **Eden Space** (where objects are first allocated)  
  * **Survivor Space S0, S1** (objects that survive garbage collection)

(b) Old Generation (Tenured Space)

* **Objects that survive multiple garbage collections move here.**  
* **Larger objects and long-lived objects are stored here.**

(c) Permanent Generation (Java 7 and below) / MetaSpace (Java 8+)

* **Stores class metadata, static methods, and constant pool.**  
* **Java 8 replaced PermGen with MetaSpace, which dynamically resizes.**

---

4\. Memory Allocation in Java

Java follows **automatic memory allocation** and **garbage collection** to manage memory efficiently.

How Objects are Stored in Memory?

1️⃣ **Primitive data types (int, double, char, etc.)** → Stored in **stack memory**.  
 2️⃣ **Objects (created using `new`)** → Stored in **heap memory**.  
 3️⃣ **Static variables** → Stored in **method area (MetaSpace in Java 8+)**.  
 4️⃣ **Local variables and method calls** → Stored in **stack memory**.

Example: Memory Allocation  
java

CopyEdit

`class Employee {`

    `String name; // Stored in heap`

    `int age;     // Stored in heap`

    `Employee(String name, int age) {`

        `this.name = name;`

        `this.age = age;`

    `}`

    `void display() {`

        `String message = "Hello"; // Local variable (stored in stack)`

        `System.out.println(message + ", " + name + " is " + age + " years old.");`

    `}`

    `public static void main(String[] args) {`

        `Employee e1 = new Employee("Alice", 30); // Stored in heap`

        `e1.display();`

    `}`

`}`

✔ **Local variable `message` → Stored in stack**  
 ✔ **Object `e1` → Stored in heap**  
 ✔ **Instance variables `name` & `age` → Stored in heap**

---

5\. Garbage Collection in Java

Java uses **Garbage Collection (GC)** to automatically remove **unused objects** and free memory.

Key Features of Garbage Collection

✔ **Automatic memory management (no manual `free()` like C++)**  
 ✔ **Identifies unused objects and removes them**  
 ✔ **Runs periodically in the background**

---

6\. How Garbage Collection Works?

Garbage collection works by identifying **objects that are no longer reachable** and freeing the memory they occupy.

Objects Become Eligible for GC When:

1️⃣ No **active reference** to the object.  
 2️⃣ **Explicitly set to `null`** (`obj = null;`).  
 3️⃣ **Out of scope** (e.g., local variables after method execution).  
 4️⃣ **Reference is reassigned to another object.**

Example: Eligible for GC  
java

CopyEdit

`class GCExample {`

    `String data;`

    `GCExample(String data) {`

        `this.data = data;`

    `}`

    `public static void main(String[] args) {`

        `GCExample obj1 = new GCExample("Java");`

        `GCExample obj2 = new GCExample("Python");`

        `obj1 = obj2;  // Java object becomes unreachable → Eligible for GC`

        `obj2 = null;  // Python object also becomes unreachable → Eligible for GC`

        `System.gc();  // Request garbage collection`

    `}`

    `@Override`

    `protected void finalize() {`

        `System.out.println("Garbage Collected: " + this.data);`

    `}`

`}`

✔ `finalize()` method is called before garbage collection.  
 ✔ `System.gc()` requests GC (not guaranteed to run immediately).

---

7\. Types of Garbage Collectors in Java

Java provides different **garbage collection algorithms**:

(a) Serial Garbage Collector (Single-Threaded)

* **Use:** Small applications (default in single-threaded apps).  
* **JVM Option:** `-XX:+UseSerialGC`

(b) Parallel Garbage Collector (Multi-Threaded)

* **Use:** Multi-threaded applications, better performance.  
* **JVM Option:** `-XX:+UseParallelGC`

(c) CMS (Concurrent Mark-Sweep) Garbage Collector

* **Use:** Low-latency applications, minimizes pause time.  
* **JVM Option:** `-XX:+UseConcMarkSweepGC`

(d) G1 (Garbage-First) Garbage Collector (Default in Java 9+)

* **Use:** Large applications with real-time performance.  
* **JVM Option:** `-XX:+UseG1GC`

---

8\. Important GC Phases (Mark and Sweep)

1️⃣ **Mark Phase** → Identifies active (reachable) objects.  
 2️⃣ **Sweep Phase** → Removes unused objects and reclaims memory.

---

9\. How to Optimize Memory Management?

✔ **Use `null` to dereference objects (if no longer needed).**  
 ✔ **Use `try-with-resources` for automatic cleanup of resources.**  
 ✔ **Avoid memory leaks (e.g., forgetting to close resources like file streams).**  
 ✔ **Use Weak References (`WeakReference`, `SoftReference`, `PhantomReference`) when needed.**

---

10\. Common Memory Issues in Java

(a) Memory Leaks

* Happens when **objects are unintentionally kept in memory** and not garbage collected.  
* **Example: Static collections holding unused objects.**

(b) OutOfMemoryError (`java.lang.OutOfMemoryError`)

* **Occurs when heap memory is exhausted.**

**Solution:** Increase heap size using JVM options:  
 sh  
CopyEdit  
`java -Xms512m -Xmx2g MyClass`

*  (`-Xms`: Initial heap size, `-Xmx`: Maximum heap size)

---

# Java Classes in Depth \- Part 1: Nested Class, Concrete, Abstract, Object, Super and Sub Class {#java-classes-in-depth---part-1:-nested-class,-concrete,-abstract,-object,-super-and-sub-class}

Java is an **object-oriented programming (OOP) language**, and **classes** are the core building blocks of Java programs. This guide will cover various types of classes in Java, including **nested classes, concrete classes, abstract classes, objects, superclasses, and subclasses.**

---

1\. What is a Class in Java?

A **class** is a blueprint for creating objects. It defines **fields (variables) and methods (functions)** that describe an object’s behavior.

Example: Simple Java Class  
java

CopyEdit

`class Car {`

    `String brand;`

    `int speed;`

    `void accelerate() {`

        `speed += 10;`

        `System.out.println(brand + " is now at " + speed + " km/h");`

    `}`

`}`

✔ **`Car` is a class (blueprint).**  
 ✔ **It has two fields (`brand`, `speed`).**  
 ✔ **It has a method `accelerate()` to modify `speed`.**

---

2\. Objects in Java

An **object** is an instance of a class. It represents **real-world entities**.

Example: Creating an Object  
java

CopyEdit

`public class Main {`

    `public static void main(String[] args) {`

        `Car myCar = new Car();  // Creating an object`

        `myCar.brand = "Tesla";`

        `myCar.speed = 50;`

        `myCar.accelerate();  // Output: Tesla is now at 60 km/h`

    `}`

`}`

✔ **Objects store data and perform operations defined in the class.**  
 ✔ **We use the `new` keyword to create objects.**

---

3\. Concrete Class in Java

A **concrete class** is a class that provides complete implementation for all methods.

Example: Concrete Class  
java

CopyEdit

`class Dog {`

    `void bark() {`

        `System.out.println("Woof! Woof!");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Dog d = new Dog();`

        `d.bark();  // Output: Woof! Woof!`

    `}`

`}`

✔ **`Dog` is a concrete class since it provides full method implementations.**  
 ✔ **Concrete classes can be instantiated (objects can be created).**

---

4\. Abstract Class in Java

An **abstract class** cannot be instantiated and may contain **abstract methods** (methods without implementation).

Example: Abstract Class  
java

CopyEdit

`abstract class Animal {`

    `abstract void makeSound();  // Abstract method (no implementation)`

    `void sleep() {  // Concrete method (with implementation)`

        `System.out.println("Sleeping...");`

    `}`

`}`

`class Cat extends Animal {`

    `void makeSound() {`

        `System.out.println("Meow! Meow!");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Cat c = new Cat();`

        `c.makeSound();  // Output: Meow! Meow!`

        `c.sleep();  // Output: Sleeping...`

    `}`

`}`

✔ **`Animal` is an abstract class (cannot be instantiated).**  
 ✔ **`makeSound()` is an abstract method (subclasses must implement it).**  
 ✔ **`Cat` provides the actual implementation of `makeSound()`.**

---

5\. Super and Sub Classes  
5.1 Superclass (Parent Class)

A **superclass** is a class that is inherited by another class.

5.2 Subclass (Child Class)

A **subclass** is a class that extends a superclass and inherits its properties.

Example: Superclass & Subclass  
java

CopyEdit

`class Animal {  // Superclass`

    `void eat() {`

        `System.out.println("This animal eats food.");`

    `}`

`}`

`class Dog extends Animal {  // Subclass`

    `void bark() {`

        `System.out.println("Barking...");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Dog d = new Dog();`

        `d.eat();  // Output: This animal eats food. (Inherited from superclass)`

        `d.bark();  // Output: Barking...`

    `}`

`}`

✔ **`Animal` is a superclass, `Dog` is a subclass.**  
 ✔ **`Dog` inherits the `eat()` method from `Animal`.**  
 ✔ **It also has its own method `bark()`.**

---

6\. Nested Classes in Java

A **nested class** is a class defined within another class. Java provides four types:

6.1 Static Nested Class

A static nested class is associated with the outer class but does not require an instance of the outer class.

java

CopyEdit

`class Outer {`

    `static class Nested {`

        `void display() {`

            `System.out.println("Static Nested Class");`

        `}`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Outer.Nested obj = new Outer.Nested();`

        `obj.display();  // Output: Static Nested Class`

    `}`

`}`

✔ **Accessed using `Outer.Nested` because it's static.**

---

6.2 Non-Static (Inner) Class

An inner class requires an instance of the outer class.

java

CopyEdit

`class Outer {`

    `class Inner {`

        `void show() {`

            `System.out.println("Inner Class");`

        `}`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Outer outer = new Outer();`

        `Outer.Inner inner = outer.new Inner(); // Creating an instance of inner class`

        `inner.show();  // Output: Inner Class`

    `}`

`}`

✔ **Inner class object is created using an outer class object.**

---

6.3 Local Inner Class

A local inner class is defined inside a method.

java

CopyEdit

`class Outer {`

    `void display() {`

        `class Local {`

            `void show() {`

                `System.out.println("Local Inner Class");`

            `}`

        `}`

        `Local obj = new Local();`

        `obj.show();`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Outer outer = new Outer();`

        `outer.display();  // Output: Local Inner Class`

    `}`

`}`

✔ **Local class exists only inside `display()` method.**

---

6.4 Anonymous Inner Class

An **anonymous inner class** has no name and is defined at object creation.

java

CopyEdit

`abstract class Person {`

    `abstract void speak();`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Person p = new Person() {  // Anonymous class`

            `void speak() {`

                `System.out.println("Speaking...");`

            `}`

        `};`

        `p.speak();  // Output: Speaking...`

    `}`

`}`

✔ **Used for quick, one-time use.**

---

7\. Summary

| Type | Description |
| ----- | ----- |
| **Concrete Class** | Fully implemented class. Objects can be created. |
| **Abstract Class** | Contains abstract and concrete methods. Cannot be instantiated. |
| **Super Class** | A class that is extended by another class. |
| **Sub Class** | A class that inherits from a superclass. |
| **Nested Class** | A class inside another class (Static, Inner, Local, Anonymous). |

---

# Java Generic Classes | Java Classes in Depth \- Part 2 {#java-generic-classes-|-java-classes-in-depth---part-2}

1\. Introduction to Java Generics

Generics in Java allow us to **define classes, interfaces, and methods with type parameters**. This enables **type safety, reusability, and flexibility** while writing code.

Why Use Generics?

✔ **Type Safety** – Avoids `ClassCastException`.  
 ✔ **Code Reusability** – A single generic class can handle multiple data types.  
 ✔ **Compile-time Checking** – Errors are caught at compile time instead of runtime.

---

2\. Generic Classes in Java

A **generic class** allows the use of a placeholder type (`T`, `E`, `K`, `V`, etc.), which gets replaced with an actual type when an object is created.

2.1 Creating a Generic Class  
java

CopyEdit

`// Defining a generic class with type parameter <T>`

`class Box<T> {`

    `private T item;  // Type T acts as a placeholder for any type`

    `void setItem(T item) {`

        `this.item = item;`

    `}`

    `T getItem() {`

        `return item;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Box<String> stringBox = new Box<>();  // Box for Strings`

        `stringBox.setItem("Hello Generics");`

        `System.out.println(stringBox.getItem());  // Output: Hello Generics`

        `Box<Integer> intBox = new Box<>();  // Box for Integers`

        `intBox.setItem(100);`

        `System.out.println(intBox.getItem());  // Output: 100`

    `}`

`}`

✔ **`Box<T>` is a generic class where `T` can be any data type.**  
 ✔ **We created `Box<String>` and `Box<Integer>` without modifying the class.**

---

2.2 Multiple Type Parameters in a Generic Class

You can define a **generic class with multiple type parameters**.

java

CopyEdit

`class Pair<K, V> {`

    `private K key;`

    `private V value;`

    `Pair(K key, V value) {`

        `this.key = key;`

        `this.value = value;`

    `}`

    `K getKey() { return key; }`

    `V getValue() { return value; }`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Pair<String, Integer> student = new Pair<>("Alice", 90);`

        `System.out.println("Name: " + student.getKey() + ", Marks: " + student.getValue());`

        `Pair<Integer, String> data = new Pair<>(101, "Data Science");`

        `System.out.println("ID: " + data.getKey() + ", Course: " + data.getValue());`

    `}`

`}`

✔ **The `Pair<K, V>` class stores two different generic types (`K` and `V`).**  
 ✔ **`Pair<String, Integer>` holds a name and marks.**  
 ✔ **`Pair<Integer, String>` holds an ID and course name.**

---

3\. Generic Methods in Java

A **generic method** allows a method to work with different data types without changing its definition.

3.1 Creating a Generic Method  
java

CopyEdit

`class Utility {`

    `// Generic method with type parameter <T>`

    `public static <T> void printArray(T[] array) {`

        `for (T item : array) {`

            `System.out.print(item + " ");`

        `}`

        `System.out.println();`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Integer[] intArray = {1, 2, 3, 4};`

        `String[] strArray = {"A", "B", "C"};`

        `Utility.printArray(intArray);  // Output: 1 2 3 4`

        `Utility.printArray(strArray);  // Output: A B C`

    `}`

`}`

✔ **`printArray()` is a generic method that prints elements of any type array.**  
 ✔ **It works with `Integer[]` and `String[]` without modification.**

---

4\. Bounded Type Parameters in Generics

Sometimes, we want to **restrict the generic type to specific classes (e.g., only `Number` types)**.

4.1 Using Upper Bounded Wildcards (`extends`)

We can specify that **T must be a subclass of a certain type**.

java

CopyEdit

`class MathUtil<T extends Number> {  // T must be a subclass of Number`

    `private T num;`

    `MathUtil(T num) {`

        `this.num = num;`

    `}`

    `double square() {`

        `return num.doubleValue() * num.doubleValue();`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `MathUtil<Integer> intObj = new MathUtil<>(5);`

        `System.out.println(intObj.square());  // Output: 25.0`

        `MathUtil<Double> doubleObj = new MathUtil<>(5.5);`

        `System.out.println(doubleObj.square());  // Output: 30.25`

    `}`

`}`

✔ **`T extends Number` ensures that `T` is a subclass of `Number`.**  
 ✔ **Allows `Integer`, `Double`, `Float`, but not `String`.**

---

5\. Wildcards in Generics

Wildcards (`?`) make generics **more flexible** by allowing unknown types.

5.1 Unbounded Wildcard (`<?>`)

Useful when we don’t know the type in advance.

java

CopyEdit

`class Printer {`

    ``static void printList(List<?> list) {  // `?` allows any type``

        `for (Object obj : list) {`

            `System.out.print(obj + " ");`

        `}`

        `System.out.println();`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `List<Integer> intList = Arrays.asList(1, 2, 3);`

        `List<String> strList = Arrays.asList("A", "B", "C");`

        `Printer.printList(intList);  // Output: 1 2 3`

        `Printer.printList(strList);  // Output: A B C`

    `}`

`}`

✔ **Wildcard `<?>` allows `List<Integer>`, `List<String>`, etc.**  
 ✔ **This provides flexibility when working with collections of unknown types.**

---

5.2 Upper Bounded Wildcard (`<? extends Type>`)

Restricts the wildcard to accept **only subtypes** of a certain class.

java

CopyEdit

`class SumUtil {`

    `static double sum(List<? extends Number> list) {`

        `double sum = 0.0;`

        `for (Number num : list) {`

            `sum += num.doubleValue();`

        `}`

        `return sum;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `List<Integer> numbers = Arrays.asList(1, 2, 3, 4);`

        `System.out.println("Sum: " + SumUtil.sum(numbers));  // Output: 10.0`

    `}`

`}`

✔ **`List<? extends Number>` allows `Integer`, `Double`, etc.**  
 ✔ **Ensures the list only contains `Number` or its subclasses.**

---

6\. Generic Interfaces

Interfaces can also be **generic**, just like classes.

6.1 Creating a Generic Interface  
java

CopyEdit

`interface Container<T> {`

    `void add(T item);`

    `T retrieve();`

`}`

`class Storage<T> implements Container<T> {`

    `private T item;`

    `public void add(T item) {`

        `this.item = item;`

    `}`

    `public T retrieve() {`

        `return item;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Container<String> stringStorage = new Storage<>();`

        `stringStorage.add("Generic Interface Example");`

        `System.out.println(stringStorage.retrieve());  // Output: Generic Interface Example`

    `}`

`}`

✔ **Interfaces can have generic types (`Container<T>`).**  
 ✔ **Classes implementing the interface define the actual type (`Storage<String>`).**

---

7\. Summary

| Feature | Description |
| ----- | ----- |
| **Generic Class** | A class that takes type parameters (`class Box<T> {}`). |
| **Generic Method** | A method with type parameters (`public <T> void method(T t) {}`). |
| **Bounded Type (`extends`)** | Restricts the type to a certain class/subclass (`T extends Number`). |
| **Wildcards (`?`)** | Allows unknown types (`List<?>`, `List<? extends Number>`). |
| **Generic Interface** | Interfaces that support generics (`interface Container<T> {}`). |

---

# Java Enum, POJO, and Final Classes Explained with Examples | Java Classes in Depth \- Part 3 {#java-enum,-pojo,-and-final-classes-explained-with-examples-|-java-classes-in-depth---part-3}

Java provides different types of classes, including **Enums, POJOs (Plain Old Java Objects), and Final Classes**. This guide will explain each type with **examples**.

---

1\. Java Enum (Enumeration)

An **enum** is a special type in Java used to **define a fixed set of constants**. It is useful when a variable should have only a limited set of possible values.

1.1 Defining an Enum  
java

CopyEdit

`enum Day {`

    `SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY;`

`}`

✔ **Each value inside an enum is a constant (`final` and `static`).**  
 ✔ **By default, enums extend `java.lang.Enum` (cannot extend other classes).**

---

1.2 Using an Enum in Java  
java

CopyEdit

`public class Main {`

    `public static void main(String[] args) {`

        `Day today = Day.FRIDAY;`

        `System.out.println("Today is: " + today);  // Output: Today is: FRIDAY`

        `// Using Enum in Switch`

        `switch (today) {`

            `case MONDAY -> System.out.println("Start of the week!");`

            `case FRIDAY -> System.out.println("Weekend is near!");`

            `default -> System.out.println("A regular day.");`

        `}`

    `}`

`}`

✔ **Enum can be used in `switch` statements.**  
 ✔ **Each enum constant is accessed using `EnumName.CONSTANT`.**

---

1.3 Enum with Custom Fields and Methods

Enums can have **fields, constructors, and methods**.

java

CopyEdit

`enum Size {`

    `SMALL(10), MEDIUM(20), LARGE(30);`

    

    `private final int value;`

    `Size(int value) {  // Constructor`

        `this.value = value;`

    `}`

    `public int getValue() {`

        `return value;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Size s = Size.MEDIUM;`

        `System.out.println("Size: " + s + ", Value: " + s.getValue());`  

        `// Output: Size: MEDIUM, Value: 20`

    `}`

`}`

✔ **Each enum constant can hold values (`SMALL(10), MEDIUM(20)`).**  
 ✔ **`getValue()` returns the assigned value.**

---

2\. POJO (Plain Old Java Object)

A **POJO** is a simple Java class that does not extend or implement special classes/interfaces. It is mainly used to **store and transfer data**.

2.1 Characteristics of a POJO

✔ **Private fields with public getter/setter methods.**  
 ✔ **No business logic, just data storage.**  
 ✔ **No special constraints (unlike JavaBeans which require serialization, default constructor, etc.).**

---

2.2 Example of a POJO  
java

CopyEdit

`class Student {`

    `private String name;`

    `private int age;`

    `// Constructor`

    `public Student(String name, int age) {`

        `this.name = name;`

        `this.age = age;`

    `}`

    `// Getters and Setters`

    `public String getName() { return name; }`

    `public void setName(String name) { this.name = name; }`

    `public int getAge() { return age; }`

    `public void setAge(int age) { this.age = age; }`

    `// toString() method`

    `@Override`

    `public String toString() {`

        `return "Student{name='" + name + "', age=" + age + "}";`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Student s = new Student("Alice", 22);`

        `System.out.println(s);  // Output: Student{name='Alice', age=22}`

    `}`

`}`

✔ **Encapsulation: Fields are private, accessed via getters/setters.**  
 ✔ **No special annotations, interfaces, or extensions (Pure POJO).**

---

2.3 POJO vs JavaBean

| Feature | POJO | JavaBean |
| ----- | ----- | ----- |
| **Getters/Setters** | Optional | Required |
| **Default Constructor** | Optional | Required |
| **Implements Serializable** | No | Yes |
| **Annotations** | No | Sometimes required |

**🔹 JavaBeans are stricter versions of POJOs, often used in frameworks like Spring and Hibernate.**

---

3\. Final Classes in Java

A **final class** is a class that **cannot be inherited (extended)**. It is used when we want to **prevent modification or extension of a class**.

3.1 Declaring a Final Class  
java

CopyEdit

`final class MathUtils {`

    `public static int square(int num) {`

        `return num * num;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `System.out.println(MathUtils.square(5));  // Output: 25`

    `}`

`}`

✔ **`MathUtils` is `final`, so no class can extend it.**  
 ✔ **Useful for utility/helper classes.**

---

3.2 Attempting to Extend a Final Class (Compilation Error)  
java

CopyEdit

`final class Parent {`

    `void display() {`

        `System.out.println("Parent class");`

    `}`

`}`

`// This will cause a compilation error!`

`class Child extends Parent {` 

    `void show() {`

        `System.out.println("Child class");`

    `}`

`}`

🚨 **Error:** `Cannot inherit from final Parent`.

---

3.3 Final Methods (Prevent Method Overriding)

A **final method** prevents subclasses from overriding it.

java

CopyEdit

`class Vehicle {`

    `final void start() {`

        `System.out.println("Vehicle is starting...");`

    `}`

`}`

`class Car extends Vehicle {`

    `// This will cause an error!`

    `// void start() { System.out.println("Car is starting..."); }`

`}`

🚨 **Error:** `Cannot override the final method from Vehicle`.

✔ **Useful for methods that should not be modified in subclasses.**

---

3.4 Final Variables (Constants in Java)

A **final variable** becomes a constant and **cannot be changed after initialization**.

java

CopyEdit

`class Config {`

    `static final double PI = 3.14159;  // Constant value`

    `void show() {`

        `// PI = 3.14;  // Error: Cannot assign a value to final variable 'PI'`

        `System.out.println("Value of PI: " + PI);`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Config c = new Config();`

        `c.show();  // Output: Value of PI: 3.14159`

    `}`

`}`

✔ **`final` variables must be initialized at declaration or in the constructor.**  
 ✔ **Once assigned, they cannot be changed.**

---

4\. Summary

| Feature | Enum | POJO | Final Class |
| ----- | ----- | ----- | ----- |
| **Purpose** | Defines constants | Stores and transfers data | Prevents inheritance |
| **Fields** | Constants | Private variables | Any variables |
| **Methods** | Can have methods | Getters/Setters | Cannot be overridden |
| **Inheritance** | Cannot extend other classes | Can extend classes | Cannot be extended |
| **Example** | `enum Day {MON, TUE}` | `class Student {}` | `final class MathUtils {}` |

---

# Java Singleton and Immutable Class Explained with Examples | Java Classes in Depth \- Part 4 {#java-singleton-and-immutable-class-explained-with-examples-|-java-classes-in-depth---part-4}

In this guide, we will cover **Singleton and Immutable Classes** in Java, their purpose, implementation, and best practices.

---

1\. Singleton Class in Java

A **Singleton class** ensures that **only one instance** of the class is created and provides a **global point of access** to it.

1.1 Key Features of a Singleton Class

✔ **Only one instance is created throughout the application.**  
 ✔ **Provides a global access point using a static method.**  
 ✔ **Constructor is private to prevent external instantiation.**

---

2\. Implementing a Singleton Class

2.1 Eager Initialization (Thread-Safe)

In **Eager Initialization**, the instance is created at the time of class loading.

java

CopyEdit

`class Singleton {`

    `private static final Singleton instance = new Singleton(); // Early creation`

    `private Singleton() { } // Private constructor`

    `public static Singleton getInstance() {`

        `return instance;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Singleton obj1 = Singleton.getInstance();`

        `Singleton obj2 = Singleton.getInstance();`

        `System.out.println(obj1 == obj2); // Output: true (same instance)`

    `}`

`}`

✔ **Simple and thread-safe.**  
 ❌ **Instance is created even if not used (memory waste).**

---

2.2 Lazy Initialization (Not Thread-Safe)

In **Lazy Initialization**, the instance is created only when `getInstance()` is called.

java

CopyEdit

`class Singleton {`

    `private static Singleton instance;  // No instance created initially`

    `private Singleton() { }`

    `public static Singleton getInstance() {`

        `if (instance == null) { // Instance created only when required`

            `instance = new Singleton();`

        `}`

        `return instance;`

    `}`

`}`

✔ **Instance is created only when needed (better memory usage).**  
 ❌ **Not thread-safe in a multi-threaded environment.**

---

2.3 Thread-Safe Singleton Using Synchronized Method

To ensure thread safety, we can use `synchronized` on `getInstance()`.

java

CopyEdit

`class Singleton {`

    `private static Singleton instance;`

    `private Singleton() { }`

    `public static synchronized Singleton getInstance() { // Synchronized method`

        `if (instance == null) {`

            `instance = new Singleton();`

        `}`

        `return instance;`

    `}`

`}`

✔ **Thread-safe but slower due to method synchronization.**  
 ❌ **Every call to `getInstance()` is synchronized, even when unnecessary.**

---

2.4 Best Approach: Double-Checked Locking (Thread-Safe & Efficient)

This improves performance by **synchronizing only when necessary**.

java

CopyEdit

`class Singleton {`

    `private static volatile Singleton instance; // Volatile ensures visibility across threads`

    `private Singleton() { }`

    `public static Singleton getInstance() {`

        `if (instance == null) {  // First check (without synchronization)`

            `synchronized (Singleton.class) {  // Synchronize block`

                `if (instance == null) {  // Second check (inside synchronized block)`

                    `instance = new Singleton();`

                `}`

            `}`

        `}`

        `return instance;`

    `}`

`}`

✔ **Thread-safe and optimized for performance.**

---

2.5 Singleton Using Enum (Best Practice)

Using **enum** ensures Singleton properties with built-in thread safety and serialization support.

java

CopyEdit

`enum Singleton {`

    `INSTANCE; // Single instance`

    `public void showMessage() {`

        `System.out.println("Singleton using Enum!");`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `Singleton.INSTANCE.showMessage();`

    `}`

`}`

✔ **Thread-safe, serialization-safe, and simple to implement.**  
 ✔ **Recommended over other Singleton implementations.**

---

3\. Immutable Class in Java

An **Immutable class** is one whose objects **cannot be modified** after creation.

3.1 Key Features of an Immutable Class

✔ **Fields are declared `final`.**  
 ✔ **No setter methods are provided.**  
 ✔ **Objects are created via constructors only.**  
 ✔ **If the class contains mutable objects, defensive copies are made.**

---

4\. Implementing an Immutable Class

A properly designed **immutable class** in Java:

java

CopyEdit

`final class ImmutablePerson {  // Step 1: Declare class as final`

    `private final String name;  // Step 2: Make fields final`

    `private final int age;`

    `public ImmutablePerson(String name, int age) {  // Step 3: Initialize fields via constructor`

        `this.name = name;`

        `this.age = age;`

    `}`

    `public String getName() {  // Step 4: Only getter methods, no setters`

        `return name;`

    `}`

    `public int getAge() {`

        `return age;`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `ImmutablePerson person = new ImmutablePerson("Alice", 25);`

        `System.out.println(person.getName());  // Output: Alice`

    `}`

`}`

✔ **Class cannot be modified after object creation.**

---

4.1 Handling Mutable Fields (Using Defensive Copies)

If an immutable class contains a mutable field (e.g., `List`), **return a copy instead of the original object**.

java

CopyEdit

`import java.util.*;`

`final class ImmutableStudent {`

    `private final String name;`

    `private final List<String> subjects;`

    `public ImmutableStudent(String name, List<String> subjects) {`

        `this.name = name;`

        `this.subjects = new ArrayList<>(subjects);  // Defensive copy`

    `}`

    `public String getName() {`

        `return name;`

    `}`

    `public List<String> getSubjects() {`

        `return new ArrayList<>(subjects);  // Defensive copy`

    `}`

`}`

`public class Main {`

    `public static void main(String[] args) {`

        `List<String> subjects = new ArrayList<>(Arrays.asList("Math", "Science"));`

        `ImmutableStudent student = new ImmutableStudent("John", subjects);`

        `subjects.add("History");  // Modifying original list`

        `System.out.println(student.getSubjects());  // Output: [Math, Science] (unchanged)`

    `}`

`}`

✔ **`subjects` is protected from external modifications.**  
 ✔ **Returning a new copy prevents mutation.**

---

5\. Singleton vs Immutable Class

| Feature | Singleton Class | Immutable Class |
| ----- | ----- | ----- |
| **Definition** | Only one instance exists | Object state cannot be changed |
| **Instance Creation** | Controlled via `getInstance()` | Created via constructor |
| **Thread Safety** | Can be ensured using `synchronized`, `volatile`, etc. | Naturally thread-safe |
| **Modification** | Can have mutable state | No modifications allowed after creation |
| **Examples** | Logger, ConfigurationManager | `String`, `Integer`, `LocalDate` |

---

