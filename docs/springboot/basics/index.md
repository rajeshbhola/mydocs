# Spring Boot Basics

Learn the fundamentals of Spring Boot framework for building Java applications.

## What is Spring Boot?

Spring Boot is an opinionated framework built on top of the Spring Framework that makes it easy to create stand-alone, production-grade Spring-based applications with minimal configuration.

## Why Spring Boot?

| Feature | Benefit |
|---------|---------|
| **Auto-configuration** | Automatic configuration based on classpath |
| **Standalone** | Embedded servers (Tomcat, Jetty) |
| **Production-ready** | Metrics, health checks out of the box |
| **No XML** | Convention over configuration |
| **Quick Start** | Minimal setup required |

## Key Features

### 1. Auto-Configuration

Spring Boot automatically configures your application based on the dependencies you have added.

```java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### 2. Starter Dependencies

Simplified dependency management through starters.

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Web applications -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- JPA and Database -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

### 3. Embedded Server

No need to deploy WAR files - application runs standalone.

```java
// Application runs on embedded Tomcat by default
// Access at http://localhost:8080
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## Core Annotations

### @SpringBootApplication

Combines three annotations:
- `@Configuration` - Marks class as source of bean definitions
- `@EnableAutoConfiguration` - Enables auto-configuration
- `@ComponentScan` - Scans for components in current package and sub-packages

```java
@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```

### @RestController

Creates RESTful web services.

```java
@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

### @Service

Marks service layer components.

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
```

### @Repository

Marks data access layer components.

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query methods
    List<User> findByLastName(String lastName);

    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.age > :age")
    List<User> findUsersOlderThan(@Param("age") int age);
}
```

### @Entity

Marks JPA entities.

```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private Integer age;

    // Getters and setters
}
```

## Configuration

### application.properties

```properties
# Server configuration
server.port=8080
server.servlet.context-path=/api

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logging.level.root=INFO
logging.level.com.example=DEBUG
```

### application.yml

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect

logging:
  level:
    root: INFO
    com.example: DEBUG
```

## Project Structure

```
my-spring-boot-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── myapp/
│   │   │               ├── MyAppApplication.java
│   │   │               ├── controller/
│   │   │               │   └── UserController.java
│   │   │               ├── service/
│   │   │               │   └── UserService.java
│   │   │               ├── repository/
│   │   │               │   └── UserRepository.java
│   │   │               ├── model/
│   │   │               │   └── User.java
│   │   │               ├── dto/
│   │   │               │   └── UserDTO.java
│   │   │               ├── exception/
│   │   │               │   └── ResourceNotFoundException.java
│   │   │               └── config/
│   │   │                   └── AppConfig.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── myapp/
│                       └── MyAppApplicationTests.java
├── pom.xml
└── README.md
```

## Creating a REST API

Complete example of a REST API:

```java
// Entity
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    // Constructors, getters, setters
}

// Repository
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContaining(String name);
    List<Product> findByPriceBetween(Double min, Double max);
}

// Service
@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        return repository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        repository.delete(product);
    }
}

// Controller
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.createProduct(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {
        return ResponseEntity.ok(service.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
```

## Exception Handling

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

## Best Practices

!!! tip "Spring Boot Best Practices"
    1. **Use appropriate layers** - Controller, Service, Repository
    2. **Dependency Injection** - Use constructor injection
    3. **DTOs** - Don't expose entities directly
    4. **Exception Handling** - Use @ControllerAdvice
    5. **Validation** - Use @Valid and Bean Validation
    6. **Logging** - Use SLF4J with Logback
    7. **Profiles** - Use profiles for different environments
    8. **Testing** - Write unit and integration tests

## Common Starters

| Starter | Purpose |
|---------|---------|
| `spring-boot-starter-web` | Web applications and REST APIs |
| `spring-boot-starter-data-jpa` | JPA and Hibernate |
| `spring-boot-starter-security` | Spring Security |
| `spring-boot-starter-test` | Testing (JUnit, Mockito, etc.) |
| `spring-boot-starter-actuator` | Production monitoring |
| `spring-boot-starter-validation` | Bean Validation |
| `spring-boot-starter-mail` | Email support |
| `spring-boot-starter-cache` | Caching support |

## Summary

Spring Boot simplifies Java application development by providing:

- ✅ Auto-configuration
- ✅ Starter dependencies
- ✅ Embedded servers
- ✅ Production-ready features
- ✅ Minimal configuration
- ✅ Quick development setup

## Next Steps

Explore more advanced topics:
- Spring Boot Security
- Spring Data JPA advanced features
- Microservices with Spring Boot
- Spring Boot Actuator
- Caching and Performance
- Testing strategies
