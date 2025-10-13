# Java Keywords

Keywords are reserved words in Java that have predefined meanings and cannot be used as identifiers.

## What are Keywords?

Keywords are special words in Java programming language that are reserved by Java for specific purposes. These words cannot be used as variable names, method names, class names, or any other identifiers.

## List of Java Keywords

Java has **50+ keywords** that serve different purposes:

### Access Modifiers

| Keyword | Description |
|---------|-------------|
| `public` | Accessible from anywhere |
| `private` | Accessible only within the class |
| `protected` | Accessible within package and subclasses |

### Data Types

| Keyword | Description |
|---------|-------------|
| `byte` | 8-bit integer |
| `short` | 16-bit integer |
| `int` | 32-bit integer |
| `long` | 64-bit integer |
| `float` | 32-bit floating point |
| `double` | 64-bit floating point |
| `char` | 16-bit Unicode character |
| `boolean` | true or false |

### Control Flow Keywords

```java
// if-else statement
if (condition) {
    // code
} else if (anotherCondition) {
    // code
} else {
    // code
}

// switch statement
switch (variable) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code
}

// loops
for (int i = 0; i < 10; i++) {
    // code
}

while (condition) {
    // code
}

do {
    // code
} while (condition);
```

### Class and Object Keywords

| Keyword | Description |
|---------|-------------|
| `class` | Declares a class |
| `interface` | Declares an interface |
| `extends` | Indicates inheritance |
| `implements` | Implements an interface |
| `new` | Creates new objects |
| `this` | Refers to current object |
| `super` | Refers to parent class |

### Exception Handling Keywords

```java
try {
    // code that may throw exception
} catch (ExceptionType e) {
    // handle exception
} finally {
    // always executed
}

throw new Exception("Error message");
throws ExceptionType
```

### Other Important Keywords

| Keyword | Description |
|---------|-------------|
| `static` | Belongs to class, not instance |
| `final` | Cannot be changed/overridden |
| `abstract` | Must be implemented by subclass |
| `synchronized` | Thread-safe access |
| `volatile` | Value may change unexpectedly |
| `transient` | Not serialized |
| `native` | Implemented in native code |
| `void` | No return value |
| `return` | Returns from method |
| `package` | Declares package |
| `import` | Imports classes |

## Examples

### Using Keywords in a Class

```java
public class Student {
    // Instance variables
    private String name;
    private int age;

    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Static variable
    public static int totalStudents = 0;

    // Final constant
    public static final String SCHOOL_NAME = "XYZ School";

    // Method
    public void displayInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
    }
}
```

## Best Practices

!!! tip "Naming Convention"
    Since keywords are reserved, always use meaningful names for identifiers that don't conflict with keywords.

!!! warning "Case Sensitive"
    Java keywords are case-sensitive. For example, `public` is a keyword, but `Public` or `PUBLIC` are not.

## Common Mistakes

1. **Using keywords as identifiers**
   ```java
   int class = 5;  // ❌ Error: keyword 'class' cannot be used
   int myClass = 5; // ✅ Correct
   ```

2. **Incorrect capitalization**
   ```java
   Public class Test { }  // ❌ Error: 'Public' is not recognized
   public class Test { }  // ✅ Correct
   ```

## Summary

- Keywords are reserved words with special meanings
- There are 50+ keywords in Java
- Keywords are case-sensitive
- Cannot be used as identifiers
- Essential for Java syntax and structure

## Next Steps

Continue learning about [Java Identifiers](identifiers.md) to understand how to name your variables, methods, and classes properly.
