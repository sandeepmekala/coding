# 

[**Exception Handling in Java \- Complete Guide with Examples	1**](#exception-handling-in-java---complete-guide-with-examples)

[**Operators in Java \- Complete Guide with Examples	9**](#operators-in-java---complete-guide-with-examples)

[**Control Flow Statements in Java	16**](#control-flow-statements-in-java)

[**Lombok Features in Java	26**](#lombok-features-in-java)

[**Java 17: Sealed Classes and Interfaces	32**](#java-17:-sealed-classes-and-interfaces)

# 

# Exception Handling in Java \- Complete Guide with Examples {#exception-handling-in-java---complete-guide-with-examples}

1\. What is Exception Handling in Java?

Exception handling in Java is a mechanism that allows us to **handle runtime errors** to ensure the normal flow of execution.

Why Exception Handling?

✔ Prevents program crashes due to unexpected errors  
 ✔ Helps debug and maintain code easily  
 ✔ Provides a mechanism to **gracefully handle runtime issues**

---

2\. Types of Exceptions in Java

Java exceptions are categorized into two main types:

A. Checked Exceptions (Compile-time exceptions)

* These exceptions are **checked at compile time**.  
* The compiler forces us to handle them using `try-catch` or `throws`.  
* Examples:  
  * `IOException`  
  * `SQLException`  
  * `FileNotFoundException`

Example: Checked Exception (Handling `IOException`)

java

CopyEdit

`import java.io.*;`

`public class CheckedExceptionExample {`

    `public static void main(String[] args) {`

        `try {`

            `FileReader file = new FileReader("nonexistent.txt"); // File not found`

            `BufferedReader br = new BufferedReader(file);`

            `System.out.println(br.readLine());`

        `} catch (IOException e) {`

            `System.out.println("File not found: " + e.getMessage());`

        `}`

    `}`

`}`

✔ **Without handling, this would cause a compile-time error.**

---

B. Unchecked Exceptions (Runtime Exceptions)

* These exceptions occur at **runtime** and **are not checked** at compile time.  
* They usually occur due to **logical errors in the program**.  
* Examples:  
  * `NullPointerException`  
  * `ArrayIndexOutOfBoundsException`  
  * `ArithmeticException`

Example: Unchecked Exception (`ArithmeticException`)

java

CopyEdit

`public class UncheckedExceptionExample {`

    `public static void main(String[] args) {`

        `int a = 10, b = 0;`

        `int result = a / b; // Causes ArithmeticException (division by zero)`

        `System.out.println(result);`

    `}`

`}`

✔ **No compile-time error, but crashes at runtime.**

---

C. Errors (Serious Issues)

* Errors are **not exceptions**, but serious problems beyond program control.  
* Examples:  
  * `StackOverflowError` (infinite recursion)  
  * `OutOfMemoryError` (insufficient memory)

Example: `StackOverflowError`

java

CopyEdit

`public class StackOverflowExample {`

    `public static void recursiveMethod() {`

        `recursiveMethod(); // Infinite recursion`

    `}`

    `public static void main(String[] args) {`

        `recursiveMethod();`

    `}`

`}`

✔ **Program crashes due to infinite recursion.**

---

3\. Java Exception Hierarchy

php

CopyEdit

`Throwable`

`│`

`├── Exception (Checked Exceptions)`

`│   ├── IOException`

`│   ├── SQLException`

`│   ├── ClassNotFoundException`

`│`

`├── RuntimeException (Unchecked Exceptions)`

`│   ├── NullPointerException`

`│   ├── ArithmeticException`

`│   ├── IndexOutOfBoundsException`

`│`

`└── Error (Serious Issues)`

    `├── StackOverflowError`

    `├── OutOfMemoryError`

---

4\. Exception Handling Mechanisms

Java provides several ways to handle exceptions:

A. Using try-catch Block  
java

CopyEdit

`public class TryCatchExample {`

    `public static void main(String[] args) {`

        `try {`

            `int num = 10 / 0; // Causes ArithmeticException`

        `} catch (ArithmeticException e) {`

            `System.out.println("Exception caught: " + e.getMessage());`

        `}`

        `System.out.println("Program continues...");`

    `}`

`}`

✔ **Catches the exception and prevents the program from crashing.**

---

B. Using Multiple Catch Blocks  
java

CopyEdit

`public class MultipleCatchExample {`

    `public static void main(String[] args) {`

        `try {`

            `int[] arr = {1, 2, 3};`

            `System.out.println(arr[5]); // IndexOutOfBoundsException`

        `} catch (ArithmeticException e) {`

            `System.out.println("ArithmeticException caught.");`

        `} catch (ArrayIndexOutOfBoundsException e) {`

            `System.out.println("ArrayIndexOutOfBoundsException caught.");`

        `}`

        `System.out.println("Program continues...");`

    `}`

`}`

✔ **Different catch blocks handle different exception types.**

---

C. Using finally Block (Always Executes)  
java

CopyEdit

`public class FinallyExample {`

    `public static void main(String[] args) {`

        `try {`

            `System.out.println("Inside try block");`

        `} catch (Exception e) {`

            `System.out.println("Exception caught");`

        `} finally {`

            `System.out.println("Finally block always executes.");`

        `}`

    `}`

`}`

✔ **`finally` executes whether an exception occurs or not.**

---

D. Using throw Keyword (Manually Throw Exception)  
java

CopyEdit

`public class ThrowExample {`

    `public static void checkAge(int age) {`

        `if (age < 18) {`

            `throw new IllegalArgumentException("Age must be 18 or above.");`

        `}`

        `System.out.println("Valid age.");`

    `}`

    `public static void main(String[] args) {`

        `checkAge(16); // Throws exception`

    `}`

`}`

✔ **Throws an exception manually when age is invalid.**

---

E. Using throws Keyword (Method-Level Exception Handling)  
java

CopyEdit

`import java.io.*;`

`public class ThrowsExample {`

    `public static void readFile() throws IOException {`

        `FileReader file = new FileReader("nonexistent.txt"); // May throw IOException`

    `}`

    `public static void main(String[] args) {`

        `try {`

            `readFile();`

        `} catch (IOException e) {`

            `System.out.println("Handled IOException: " + e.getMessage());`

        `}`

    `}`

`}`

✔ **Delegates exception handling to the caller method.**

---

5\. Custom Exceptions

We can create our own exceptions by extending the `Exception` class.

Example: Creating a Custom Exception  
java

CopyEdit

`class InvalidAgeException extends Exception {`

    `public InvalidAgeException(String message) {`

        `super(message);`

    `}`

`}`

`public class CustomExceptionExample {`

    `public static void validateAge(int age) throws InvalidAgeException {`

        `if (age < 18) {`

            `throw new InvalidAgeException("Age must be 18 or above.");`

        `}`

    `}`

    `public static void main(String[] args) {`

        `try {`

            `validateAge(16);`

        `} catch (InvalidAgeException e) {`

            `System.out.println("Caught Custom Exception: " + e.getMessage());`

        `}`

    `}`

`}`

✔ **Custom exception provides meaningful error messages.**

---

6\. Best Practices for Exception Handling

✅ Catch **specific exceptions** instead of `Exception`.  
 ✅ Always use `finally` to **release resources** like database connections.  
 ✅ Avoid **empty catch blocks** (hides errors).  
 ✅ Use **custom exceptions** for better error clarity.  
 ✅ Do not use exceptions for **flow control** (e.g., `try-catch` for loops).

---

7\. Summary

| Feature | Description |
| ----- | ----- |
| **Checked Exceptions** | Compile-time errors (e.g., `IOException`, `SQLException`) |
| **Unchecked Exceptions** | Runtime errors (e.g., `NullPointerException`, `ArithmeticException`) |
| **Errors** | System-level issues (`StackOverflowError`, `OutOfMemoryError`) |
| **Handling Exceptions** | `try-catch`, `finally`, `throw`, `throws` |
| **Custom Exceptions** | Extending `Exception` class |
| **Best Practices** | Catch specific exceptions, use finally, avoid empty catch blocks |

---

# Operators in Java \- Complete Guide with Examples {#operators-in-java---complete-guide-with-examples}

1\. What are Operators in Java?

Operators in Java are **special symbols** used to perform operations on variables and values.

Why Use Operators?

✔ Perform arithmetic operations  
 ✔ Compare values  
 ✔ Assign values  
 ✔ Manipulate bits  
 ✔ Control program flow

---

2\. Types of Operators in Java

Java provides different types of operators:

1. **Arithmetic Operators** (`+`, `-`, `*`, `/`, `%`)  
2. **Relational (Comparison) Operators** (`==`, `!=`, `>`, `<`, `>=`, `<=`)  
3. **Logical Operators** (`&&`, `||`, `!`)  
4. **Bitwise Operators** (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`)  
5. **Assignment Operators** (`=`, `+=`, `-=`, `*=`, `/=`, `%=`)  
6. **Unary Operators** (`+`, `-`, `++`, `--`, `~`, `!`)  
7. **Ternary Operator** (`condition ? trueValue : falseValue`)  
8. **Instanceof Operator** (`object instanceof ClassName`)  
9. **Type Cast Operator** (`(dataType) value`)

---

3\. Arithmetic Operators (Perform Mathematical Operations)

| Operator | Meaning | Example |
| ----- | ----- | ----- |
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - b` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / b` |
| `%` | Modulus (Remainder) | `a % b` |

Example: Arithmetic Operators  
java

CopyEdit

`public class ArithmeticExample {`

    `public static void main(String[] args) {`

        `int a = 10, b = 3;`

        `System.out.println("Addition: " + (a + b)); // 13`

        `System.out.println("Subtraction: " + (a - b)); // 7`

        `System.out.println("Multiplication: " + (a * b)); // 30`

        `System.out.println("Division: " + (a / b)); // 3`

        `System.out.println("Modulus: " + (a % b)); // 1`

    `}`

`}`

---

4\. Relational (Comparison) Operators

Used to compare two values, returning `true` or `false`.

| Operator | Meaning | Example (`a=10`, `b=20`) | Result |
| ----- | ----- | ----- | ----- |
| `==` | Equal to | `a == b` | `false` |
| `!=` | Not equal to | `a != b` | `true` |
| `>` | Greater than | `a > b` | `false` |
| `<` | Less than | `a < b` | `true` |
| `>=` | Greater than or equal to | `a >= b` | `false` |
| `<=` | Less than or equal to | `a <= b` | `true` |

Example: Relational Operators  
java

CopyEdit

`public class RelationalExample {`

    `public static void main(String[] args) {`

        `int a = 10, b = 20;`

        `System.out.println("a == b: " + (a == b)); // false`

        `System.out.println("a != b: " + (a != b)); // true`

        `System.out.println("a > b: " + (a > b)); // false`

        `System.out.println("a < b: " + (a < b)); // true`

    `}`

`}`

---

5\. Logical Operators

Used for logical operations, returning `true` or `false`.

| Operator | Meaning | Example (`a=true`, `b=false`) | Result |
| ----- | ----- | ----- | ----- |
| `&&` | AND | `a && b` | `false` |
| \` |  | \` | OR |
| `!` | NOT | `!a` | `false` |

Example: Logical Operators  
java

CopyEdit

`public class LogicalExample {`

    `public static void main(String[] args) {`

        `boolean a = true, b = false;`

        `System.out.println("a && b: " + (a && b)); // false`

        `System.out.println("a || b: " + (a || b)); // true`

        `System.out.println("!a: " + (!a)); // false`

    `}`

`}`

---

6\. Bitwise Operators (Work on Bits)

Used for bit-level manipulations.

| Operator | Meaning | Example |
| ----- | ----- | ----- |
| `&` | Bitwise AND | `a & b` |
| \` | \` | Bitwise OR |
| `^` | Bitwise XOR | `a ^ b` |
| `~` | Bitwise Complement | `~a` |
| `<<` | Left Shift | `a << 2` |
| `>>` | Right Shift | `a >> 2` |
| `>>>` | Zero-fill Right Shift | `a >>> 2` |

---

7\. Assignment Operators

Used to assign values to variables.

| Operator | Example | Equivalent to |
| ----- | ----- | ----- |
| `=` | `a = b` | `a = b` |
| `+=` | `a += b` | `a = a + b` |
| `-=` | `a -= b` | `a = a - b` |
| `*=` | `a *= b` | `a = a * b` |
| `/=` | `a /= b` | `a = a / b` |

Example: Assignment Operators  
java

CopyEdit

`public class AssignmentExample {`

    `public static void main(String[] args) {`

        `int a = 10;`

        `a += 5; // a = a + 5`

        `System.out.println("a: " + a); // 15`

    `}`

`}`

---

8\. Unary Operators

| Operator | Meaning | Example |
| ----- | ----- | ----- |
| `+` | Positive | `+a` |
| `-` | Negative | `-a` |
| `++` | Increment | `a++` or `++a` |
| `--` | Decrement | `a--` or `--a` |

---

9\. Ternary Operator (`condition ? trueValue : falseValue`)

java

CopyEdit

`public class TernaryExample {`

    `public static void main(String[] args) {`

        `int a = 10, b = 20;`

        `int min = (a < b) ? a : b;`

        `System.out.println("Minimum: " + min);`

    `}`

`}`

---

10\. instanceof Operator

Checks if an object is an instance of a class.

java

CopyEdit

`class Animal { }`

`class Dog extends Animal { }`

`public class InstanceofExample {`

    `public static void main(String[] args) {`

        `Dog d = new Dog();`

        `System.out.println(d instanceof Animal); // true`

    `}`

`}`

---

11\. Type Cast Operator

Used to convert data types.

java

CopyEdit

`public class TypeCastingExample {`

    `public static void main(String[] args) {`

        `int num = 100;`

        `double d = (double) num; // Explicit Casting`

        `System.out.println(d);`

    `}`

`}`

---

Operator Precedence Table in Java

Operators are listed from **highest to lowest** precedence.

| Precedence | Operator | Description | Associativity |
| ----- | ----- | ----- | ----- |
| **1** (Highest) | `()`, `[]`, `.` | Parentheses, Array access, Member selection | **Left to Right** |
| **2** | `++`, `--`, `~`, `!`, `(type)` | Unary operators | **Right to Left** |
| **3** | `*`, `/`, `%` | Multiplication, Division, Modulus | **Left to Right** |
| **4** | `+`, `-` | Addition, Subtraction | **Left to Right** |
| **5** | `<<`, `>>`, `>>>` | Bitwise shift operators | **Left to Right** |
| **6** | `<`, `<=`, `>`, `>=`, `instanceof` | Relational operators | **Left to Right** |
| **7** | `==`, `!=` | Equality operators | **Left to Right** |
| **8** | `&` | Bitwise AND | **Left to Right** |
| **9** | `^` | Bitwise XOR | **Left to Right** |
| **10** | `|` | Bitwise OR | **Left to Right** |
| **11** | `&&` | Logical AND | **Left to Right** |
| **12** | `||` | Logical OR | **Left to Right** |
| **13** | `?:` | Ternary Operator | **Right to Left** |
| **14** | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, `|=` | Assignment operators | **Right to Left** |
| **15** (Lowest) | `,` | Comma operator (used in loops) | **Left to Right** |

---

# Control Flow Statements in Java {#control-flow-statements-in-java}

Control flow statements **determine the execution order** of instructions in a Java program. Java provides:

✔ **Decision-Making Statements** (if-else, switch)  
 ✔ **Looping Statements** (for, while, do-while)  
 ✔ **Branching Statements** (break, continue, return)

---

1\. Decision-Making Statements

Decision-making statements allow the program to **execute different blocks of code** based on conditions.

1.1 if-else Statement

Used to execute a block of code **only if a condition is true**.

Syntax:

java

CopyEdit

`if (condition) {`

    `// Code executes if condition is true`

`} else {`

    `// Code executes if condition is false`

`}`

Example:

java

CopyEdit

`public class IfElseExample {`

    `public static void main(String[] args) {`

        `int number = 10;`

        `if (number > 0) {`

            `System.out.println("Positive Number");`

        `} else {`

            `System.out.println("Negative Number");`

        `}`

    `}`

`}`

✅ **Output:** `Positive Number`

---

1.2 if-else-if Ladder

Used when there are **multiple conditions**.

Syntax:

java

CopyEdit

`if (condition1) {`

    `// Code block 1`

`} else if (condition2) {`

    `// Code block 2`

`} else {`

    `// Default block`

`}`

Example:

java

CopyEdit

`public class IfElseIfExample {`

    `public static void main(String[] args) {`

        `int marks = 85;`

        `if (marks >= 90) {`

            `System.out.println("Grade A");`

        `} else if (marks >= 75) {`

            `System.out.println("Grade B");`

        `} else {`

            `System.out.println("Grade C");`

        `}`

    `}`

`}`

✅ **Output:** `Grade B`

---

1.3 Switch Statement

Used when we have **multiple possible values** for a variable.

Syntax:

java

CopyEdit

`switch (expression) {`

    `case value1:`

        `// Code block 1`

        `break;`

    `case value2:`

        `// Code block 2`

        `break;`

    `default:`

        `// Default block`

`}`

Example:

java

CopyEdit

`public class SwitchExample {`

    `public static void main(String[] args) {`

        `int day = 3;`

        `switch (day) {`

            `case 1: System.out.println("Monday"); break;`

            `case 2: System.out.println("Tuesday"); break;`

            `case 3: System.out.println("Wednesday"); break;`

            `default: System.out.println("Invalid Day");`

        `}`

    `}`

`}`

✅ **Output:** `Wednesday`

**🚀 Java 14+: Switch with Multiple Cases & Arrow Syntax**

java

CopyEdit

`public class SwitchNewSyntax {`

    `public static void main(String[] args) {`

        `int day = 3;`

        `String result = switch (day) {`

            `case 1, 2, 3 -> "Weekday";`

            `case 4, 5 -> "Weekend";`

            `default -> "Invalid";`

        `};`

        `System.out.println(result);`

    `}`

`}`

✅ **Output:** `Weekday`

---

2\. Looping Statements

Loops **repeat** a block of code **multiple times** until a condition is false.

| Loop | When to Use |
| ----- | ----- |
| **for** | When the number of iterations is known |
| **while** | When the number of iterations is unknown |
| **do-while** | Ensures the loop executes **at least once** |

---

2.1 for Loop

Executes code **a fixed number of times**.

Syntax:

java

CopyEdit

`for (initialization; condition; increment/decrement) {`

    `// Code block`

`}`

Example:

java

CopyEdit

`public class ForLoopExample {`

    `public static void main(String[] args) {`

        `for (int i = 1; i <= 5; i++) {`

            `System.out.println("Iteration: " + i);`

        `}`

    `}`

`}`

✅ **Output:**

makefile

CopyEdit

`Iteration: 1`  

`Iteration: 2`  

`Iteration: 3`  

`Iteration: 4`  

`Iteration: 5`


**🚀 Enhanced for Loop (for-each)** Used to iterate over arrays and collections.

java

CopyEdit

`public class ForEachExample {`

    `public static void main(String[] args) {`

        `int[] numbers = {1, 2, 3, 4, 5};`

        `for (int num : numbers) {`

            `System.out.println(num);`

        `}`

    `}`

`}`

---

2.2 while Loop

Executes code **as long as a condition is true**.

Syntax:

java

CopyEdit

`while (condition) {`

    `// Code block`

`}`

Example:

java

CopyEdit

`public class WhileLoopExample {`

    `public static void main(String[] args) {`

        `int i = 1;`

        `while (i <= 5) {`

            `System.out.println("Count: " + i);`

            `i++;`

        `}`

    `}`

`}`

✅ **Output:** `Count: 1, Count: 2, Count: 3, Count: 4, Count: 5`

---

2.3 do-while Loop

Executes code **at least once**, then continues based on condition.

Syntax:

java

CopyEdit

`do {`

    `// Code block`

`} while (condition);`

Example:

java

CopyEdit

`public class DoWhileExample {`

    `public static void main(String[] args) {`

        `int i = 1;`

        `do {`

            `System.out.println("Number: " + i);`

            `i++;`

        `} while (i <= 5);`

    `}`

`}`

✅ **Output:** `Number: 1, Number: 2, Number: 3, Number: 4, Number: 5`

---

3\. Branching Statements

Branching statements **change the normal execution flow**.

| Statement | Description |
| ----- | ----- |
| **break** | Exits a loop/switch immediately |
| **continue** | Skips the current iteration and moves to the next |
| **return** | Exits from the method |

---

3.1 break Statement

Used to **exit a loop or switch** immediately.

Example:

java

CopyEdit

`public class BreakExample {`

    `public static void main(String[] args) {`

        `for (int i = 1; i <= 5; i++) {`

            `if (i == 3) {`

                `break;  // Loop stops at i = 3`

            `}`

            `System.out.println(i);`

        `}`

    `}`

`}`

✅ **Output:** `1, 2`

---

3.2 continue Statement

Used to **skip** the current iteration and continue with the next.

Example:

java

CopyEdit

`public class ContinueExample {`

    `public static void main(String[] args) {`

        `for (int i = 1; i <= 5; i++) {`

            `if (i == 3) {`

                `continue;  // Skip i = 3`

            `}`

            `System.out.println(i);`

        `}`

    `}`

`}`

✅ **Output:** `1, 2, 4, 5`

---

3.3 return Statement

Used to **exit a method** and return a value.

Example:

java

CopyEdit

`public class ReturnExample {`

    `public static void main(String[] args) {`

        `System.out.println(sum(5, 10));`

    `}`

    `static int sum(int a, int b) {`

        `return a + b;  // Return sum`

    `}`

`}`

✅ **Output:** `15`

---

# Lombok Features in Java {#lombok-features-in-java}

Lombok is a Java library that reduces boilerplate code by generating commonly used methods like getters, setters, constructors, etc., during compilation.

---

📌 1\. `val` and `var`

* `val`: Immutable local variable (like `final`)

* `var`: Mutable local variable

* Type is inferred by the compiler.

java

CopyEdit

`val name = "John";  // becomes final String name = "John";`

`var count = 10;     // becomes int count = 10;`

> ✅ Helps reduce verbosity when declaring variables.

---

📌 2\. `@NonNull`

* Automatically adds null checks in constructors or methods.

* Throws `NullPointerException` if the value is null.

java

CopyEdit

`public class Person {`

    `public Person(@NonNull String name) {`

        `this.name = name;`

    `}`

`}`

> ✅ Avoids writing manual null checks.

---

📌 3\. `@Getter` and `@Setter`

* Automatically generates getter and setter methods.

java

CopyEdit

`@Getter`

`@Setter`

`private String name;`

* You can annotate at **class level** (for all fields) or **field level**.

> ✅ Reduces boilerplate method generation.

---

📌 4\. `@ToString`

* Generates a readable `toString()` method.

* Can exclude fields: `@ToString(exclude = "password")`

java

CopyEdit

`@ToString`

`public class User {`

    `private String name;`

    `private String email;`

`}`

---

📌 5\. `@NoArgsConstructor`, `@AllArgsConstructor`, `@RequiredArgsConstructor`

* `@NoArgsConstructor`: No-arg constructor.

* `@AllArgsConstructor`: Constructor with all fields.

* `@RequiredArgsConstructor`: Only `final` or `@NonNull` fields.

java

CopyEdit

`@RequiredArgsConstructor`

`public class Student {`

    `private final String name;`

    `private int age;`

`}`

---

📌 6\. `@EqualsAndHashCode`

* Generates `equals()` and `hashCode()` based on fields.

* Can exclude fields too.

java

CopyEdit

`@EqualsAndHashCode`

`public class Book {`

    `private String title;`

    `private String author;`

`}`

---

📌 7\. `@Data`

* Combines:

  * `@ToString`

  * `@EqualsAndHashCode`

  * `@Getter`/`@Setter`

  * `@RequiredArgsConstructor`

java

CopyEdit

`@Data`

`public class Product {`

    `private final String id;`

    `private String name;`

`}`

> ✅ Ideal for POJOs.

---

📌 8\. `@Value`

* Immutable version of `@Data`.

* All fields are `private` and `final`.

* No setters generated.

java

CopyEdit

`@Value`

`public class Config {`

    `String host;`

    `int port;`

`}`

---

📌 9\. `@Builder`

* Enables fluent API for object creation.

* Useful for creating immutable or complex objects.

java

CopyEdit

`@Builder`

`public class Order {`

    `private String item;`

    `private int quantity;`

`}`

java

CopyEdit

`Order order = Order.builder().item("Book").quantity(2).build();`

---

📌 10\. `@Cleanup`

* Automatically closes resources like streams, readers, etc.

java

CopyEdit

`@Cleanup InputStream in = new FileInputStream("file.txt");`

> ✅ Ensures `close()` is called, even in case of exceptions.

---

# Java 17: Sealed Classes and Interfaces {#java-17:-sealed-classes-and-interfaces}

---

🔑 Key Concept

* **Problem before Sealed Classes**:

  * No control over inheritance hierarchy.

  * Any class could implement an interface or extend a class.

  * Leads to unpredictable subclasses, forcing developers to add `default` cases in `switch` or `if-else` handling.

  * Silent code breaks could occur if a new subclass was introduced unintentionally.

* **Solution**: **Sealed Classes & Interfaces (Java 17\)**

  * Introduce `sealed` keyword \+ `permits` clause.

  * Restricts which classes or interfaces can directly extend/implement a type.

  * Provides controlled inheritance.

---

🚀 How It Works

**Syntax Example**:

 `public sealed interface Shape permits Circle, Rectangle {}`

*   
  * `Shape` can only be implemented by `Circle` and `Rectangle`.

  * Any other class (e.g., `Triangle`) is **not allowed**.

---

⚖️ Rules for Subclasses

Every permitted subclass must declare **one of three modifiers**:

**final** → No further subclassing allowed.

 `final class Circle implements Shape {}`

1. 

**sealed** → Can be subclassed, but only by explicitly permitted types.

 `sealed class AbstractShape implements Shape permits Rectangle, Triangle {}`

2. 

**non-sealed** → Open for extension by any number of subclasses.

 `non-sealed interface Polygon extends Shape {}`

3. 

---

📌 Important Conditions

* **Permitted types must be direct subclasses** of the sealed type.

* **Permitted subclasses must declare themselves as final, sealed, or non-sealed**.

* **All permitted subclasses must exist at compile time** (future hypothetical classes not allowed).

---

🧩 Example Hierarchy

`// Sealed Interface`

`public sealed interface Shape permits Circle, Polygon, AbstractShape {}`

`// Circle - No further subclass`

`public final class Circle implements Shape {}`

`// Polygon - Open branch`

`public non-sealed interface Polygon extends Shape {}`

`// AbstractShape - Restricted to Rectangle & Triangle`

`public sealed abstract class AbstractShape implements Shape permits Rectangle, Triangle {}`

`// Rectangle - Closed branch`

`public final class Rectangle extends AbstractShape {}`

`// Triangle - Open branch`

`public non-sealed class Triangle extends AbstractShape {}`

---

✅ Benefits

* Enforces **controlled inheritance**.

* Reduces **unexpected child classes**.

* Improves **readability and maintainability** of code.

* Compiler can perform **exhaustive checks** in `switch` expressions (no need for unnecessary `default`).

---

