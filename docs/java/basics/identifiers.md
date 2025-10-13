# Java Identifiers

Identifiers are names given to various program elements like variables, methods, classes, interfaces, packages, etc.

## What are Identifiers?

An identifier is a name given to a program element such as:
- Variables
- Methods
- Classes
- Interfaces
- Packages
- Constants

## Rules for Identifiers

### Must Follow These Rules:

1. **Can contain:**
   - Letters (a-z, A-Z)
   - Digits (0-9)
   - Underscore (_)
   - Dollar sign ($)

2. **Must begin with:**
   - A letter (a-z, A-Z)
   - Underscore (_)
   - Dollar sign ($)
   - **Cannot start with a digit**

3. **Cannot be:**
   - Java keywords
   - `true`, `false`, or `null`

4. **Case sensitive:**
   - `myVariable` and `myvariable` are different

5. **No length limit:**
   - Can be any length, but keep them reasonable

## Valid and Invalid Identifiers

### Valid Identifiers ✅

```java
// Valid variable names
int age;
int _age;
int $age;
int age1;
int myAge;
int my_age;
int $my_age_123;

// Valid class names
class Student { }
class _Student { }
class $Student { }
class Student123 { }
```

### Invalid Identifiers ❌

```java
// Invalid - starts with digit
int 1age;        // ❌ Error

// Invalid - contains special characters
int my-age;      // ❌ Error
int my age;      // ❌ Error (space not allowed)
int my@age;      // ❌ Error

// Invalid - Java keyword
int class;       // ❌ Error
int public;      // ❌ Error
int static;      // ❌ Error

// Invalid - reserved literals
int true;        // ❌ Error
int false;       // ❌ Error
int null;        // ❌ Error
```

## Naming Conventions

Java follows specific naming conventions to make code more readable:

### 1. Class Names
- Start with **uppercase letter**
- Use **PascalCase** (capitalize first letter of each word)

```java
public class Student { }
public class StudentRecord { }
public class EmployeeManagementSystem { }
```

### 2. Interface Names
- Same as class names
- Start with **uppercase letter**
- Use **PascalCase**

```java
public interface Drawable { }
public interface ActionListener { }
public interface Comparable { }
```

### 3. Method Names
- Start with **lowercase letter**
- Use **camelCase**
- Should be verbs or verb phrases

```java
public void calculateTotal() { }
public int getAge() { }
public void setName(String name) { }
public boolean isActive() { }
```

### 4. Variable Names
- Start with **lowercase letter**
- Use **camelCase**
- Should be meaningful and descriptive

```java
int age;
String firstName;
double accountBalance;
boolean isActive;
```

### 5. Constant Names
- All **UPPERCASE letters**
- Words separated by **underscores**
- Declared with `final` keyword

```java
public static final int MAX_VALUE = 100;
public static final String DATABASE_URL = "jdbc:mysql://localhost:3306/db";
public static final double PI = 3.14159;
```

### 6. Package Names
- All **lowercase letters**
- Reverse domain name notation

```java
package com.company.project;
package org.example.utilities;
package in.mycompany.module;
```

## Examples

### Complete Example with Proper Naming

```java
package com.example.school;

public class StudentManagement {
    // Constants
    public static final int MAX_STUDENTS = 100;
    public static final String SCHOOL_NAME = "ABC School";

    // Instance variables
    private String studentName;
    private int studentAge;
    private double studentGrade;
    private boolean isActive;

    // Constructor
    public StudentManagement(String studentName, int studentAge) {
        this.studentName = studentName;
        this.studentAge = studentAge;
        this.isActive = true;
    }

    // Getter methods
    public String getStudentName() {
        return studentName;
    }

    public int getStudentAge() {
        return studentAge;
    }

    // Setter methods
    public void setStudentGrade(double grade) {
        this.studentGrade = grade;
    }

    // Regular methods
    public void displayStudentInfo() {
        System.out.println("Name: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("Grade: " + studentGrade);
    }

    public boolean checkEligibility() {
        return isActive && studentAge >= 5;
    }
}
```

## Best Practices

!!! tip "Use Meaningful Names"
    Choose names that clearly describe the purpose:
    ```java
    // Bad
    int a, b, c;

    // Good
    int studentAge, studentGrade, studentRollNumber;
    ```

!!! tip "Be Consistent"
    Follow the same naming convention throughout your project.

!!! tip "Avoid Single Letters"
    Except for loop counters (i, j, k), use descriptive names:
    ```java
    // Acceptable for loops
    for (int i = 0; i < 10; i++) { }

    // Not recommended for variables
    int a = 25;  // Bad
    int age = 25; // Good
    ```

!!! warning "Don't Use Dollar Sign"
    While `$` is allowed, it's typically reserved for generated code:
    ```java
    int $value;  // Legal but not recommended
    int value;   // Better
    ```

## Common Mistakes

### 1. Starting with a Number
```java
int 1stPlace;    // ❌ Error
int firstPlace;  // ✅ Correct
```

### 2. Using Keywords
```java
int class;       // ❌ Error
int className;   // ✅ Correct
```

### 3. Using Spaces
```java
int my age;      // ❌ Error
int myAge;       // ✅ Correct
int my_age;      // ✅ Also correct
```

### 4. Wrong Case in Naming Conventions
```java
public class student { }     // ❌ Should start with uppercase
public class Student { }     // ✅ Correct

int StudentAge;              // ❌ Variable should start with lowercase
int studentAge;              // ✅ Correct
```

## Summary

| Element | Convention | Example |
|---------|-----------|---------|
| Class | PascalCase | `StudentRecord` |
| Interface | PascalCase | `Drawable` |
| Method | camelCase | `calculateTotal()` |
| Variable | camelCase | `studentName` |
| Constant | UPPER_SNAKE_CASE | `MAX_VALUE` |
| Package | lowercase | `com.example.project` |

## Next Steps

Now that you understand identifiers, continue learning about Java data types and how to use them effectively in your programs.
