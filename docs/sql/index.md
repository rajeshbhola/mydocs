# SQL (Structured Query Language)

Learn SQL for managing and querying relational databases.

## What is SQL?

SQL (Structured Query Language) is a standard language for storing, manipulating, and retrieving data in relational databases.

## SQL Categories

### 1. DDL (Data Definition Language)

Define database structure.

```sql
-- CREATE: Create database objects
CREATE DATABASE mydb;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10, 2)
);

-- ALTER: Modify structure
ALTER TABLE employees ADD COLUMN department VARCHAR(50);
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12, 2);
ALTER TABLE employees DROP COLUMN department;

-- DROP: Delete objects
DROP TABLE employees;
DROP DATABASE mydb;

-- TRUNCATE: Remove all data
TRUNCATE TABLE employees;
```

### 2. DML (Data Manipulation Language)

Manipulate data in tables.

```sql
-- INSERT: Add new records
INSERT INTO employees (first_name, last_name, email, hire_date, salary)
VALUES ('John', 'Doe', 'john@example.com', '2024-01-15', 75000.00);

-- Multiple records
INSERT INTO employees (first_name, last_name, email, salary) VALUES
('Jane', 'Smith', 'jane@example.com', 80000.00),
('Bob', 'Johnson', 'bob@example.com', 72000.00),
('Alice', 'Williams', 'alice@example.com', 85000.00);

-- UPDATE: Modify existing records
UPDATE employees
SET salary = 80000.00
WHERE id = 1;

UPDATE employees
SET salary = salary * 1.10
WHERE hire_date < '2023-01-01';

-- DELETE: Remove records
DELETE FROM employees WHERE id = 1;
DELETE FROM employees WHERE salary < 50000;
```

### 3. DQL (Data Query Language)

Query and retrieve data.

```sql
-- SELECT: Basic query
SELECT * FROM employees;

SELECT first_name, last_name, salary
FROM employees;

-- WHERE: Filter results
SELECT * FROM employees
WHERE salary > 75000;

SELECT * FROM employees
WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';

-- ORDER BY: Sort results
SELECT * FROM employees
ORDER BY salary DESC;

SELECT * FROM employees
ORDER BY last_name ASC, first_name ASC;

-- LIMIT: Restrict number of results
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 10;

-- DISTINCT: Unique values
SELECT DISTINCT department FROM employees;
```

### 4. DCL (Data Control Language)

Control access to data.

```sql
-- GRANT: Give permissions
GRANT SELECT, INSERT ON mydb.employees TO 'user'@'localhost';

-- REVOKE: Remove permissions
REVOKE INSERT ON mydb.employees FROM 'user'@'localhost';
```

## SQL Operators

### Comparison Operators

```sql
SELECT * FROM employees WHERE salary = 75000;    -- Equal
SELECT * FROM employees WHERE salary != 75000;   -- Not equal
SELECT * FROM employees WHERE salary > 75000;    -- Greater than
SELECT * FROM employees WHERE salary >= 75000;   -- Greater or equal
SELECT * FROM employees WHERE salary < 75000;    -- Less than
SELECT * FROM employees WHERE salary <= 75000;   -- Less or equal
SELECT * FROM employees WHERE salary BETWEEN 70000 AND 80000;
SELECT * FROM employees WHERE department IN ('IT', 'Sales', 'HR');
SELECT * FROM employees WHERE email LIKE '%@example.com';
SELECT * FROM employees WHERE department IS NULL;
```

### Logical Operators

```sql
-- AND
SELECT * FROM employees
WHERE salary > 70000 AND department = 'IT';

-- OR
SELECT * FROM employees
WHERE department = 'IT' OR department = 'Sales';

-- NOT
SELECT * FROM employees
WHERE NOT department = 'HR';
```

## Aggregate Functions

```sql
-- COUNT: Count rows
SELECT COUNT(*) FROM employees;
SELECT COUNT(DISTINCT department) FROM employees;

-- SUM: Calculate total
SELECT SUM(salary) FROM employees;
SELECT SUM(salary) FROM employees WHERE department = 'IT';

-- AVG: Calculate average
SELECT AVG(salary) FROM employees;
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- MAX and MIN
SELECT MAX(salary) FROM employees;
SELECT MIN(salary) FROM employees;
SELECT department, MAX(salary), MIN(salary)
FROM employees
GROUP BY department;
```

## GROUP BY and HAVING

```sql
-- GROUP BY: Group rows
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;

SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- HAVING: Filter grouped results
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 75000;
```

## Joins

### INNER JOIN

Returns matching rows from both tables.

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

### LEFT JOIN

Returns all rows from left table and matching rows from right.

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

### RIGHT JOIN

Returns all rows from right table and matching rows from left.

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

### FULL OUTER JOIN

Returns all rows when there's a match in either table.

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

### CROSS JOIN

Returns Cartesian product of both tables.

```sql
SELECT e.first_name, d.department_name
FROM employees e
CROSS JOIN departments d;
```

## Subqueries

```sql
-- Subquery in WHERE clause
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery in FROM clause
SELECT dept, avg_sal
FROM (
    SELECT department as dept, AVG(salary) as avg_sal
    FROM employees
    GROUP BY department
) AS department_avg
WHERE avg_sal > 75000;

-- Subquery with IN
SELECT first_name, last_name
FROM employees
WHERE department_id IN (
    SELECT id FROM departments WHERE location = 'New York'
);
```

## Indexes

```sql
-- CREATE INDEX: Speed up queries
CREATE INDEX idx_email ON employees(email);
CREATE INDEX idx_name ON employees(last_name, first_name);

-- UNIQUE INDEX
CREATE UNIQUE INDEX idx_email ON employees(email);

-- DROP INDEX
DROP INDEX idx_email ON employees;
```

## Constraints

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10, 2) CHECK (salary > 0),
    hire_date DATE DEFAULT CURRENT_DATE,

    FOREIGN KEY (department_id) REFERENCES departments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

## Transactions

```sql
-- START TRANSACTION
START TRANSACTION;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- COMMIT: Save changes
COMMIT;

-- ROLLBACK: Undo changes if error
ROLLBACK;
```

## Views

```sql
-- CREATE VIEW: Virtual table
CREATE VIEW employee_details AS
SELECT e.id, e.first_name, e.last_name, d.department_name, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- Use view
SELECT * FROM employee_details WHERE salary > 75000;

-- DROP VIEW
DROP VIEW employee_details;
```

## Common Functions

### String Functions

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;
SELECT UPPER(first_name) FROM employees;
SELECT LOWER(email) FROM employees;
SELECT LENGTH(first_name) FROM employees;
SELECT SUBSTRING(email, 1, 10) FROM employees;
SELECT TRIM(first_name) FROM employees;
```

### Date Functions

```sql
SELECT NOW();                                    -- Current date and time
SELECT CURDATE();                                -- Current date
SELECT CURTIME();                                -- Current time
SELECT DATE_FORMAT(hire_date, '%Y-%m-%d') FROM employees;
SELECT DATEDIFF(CURDATE(), hire_date) AS days_employed FROM employees;
SELECT DATE_ADD(hire_date, INTERVAL 1 YEAR) FROM employees;
```

### Numeric Functions

```sql
SELECT ROUND(salary, 2) FROM employees;
SELECT CEIL(salary) FROM employees;
SELECT FLOOR(salary) FROM employees;
SELECT ABS(salary) FROM employees;
SELECT POWER(2, 3);  -- 8
```

## Best Practices

!!! tip "SQL Best Practices"
    1. **Use indexes** - For frequently queried columns
    2. **Avoid SELECT *** - Select only needed columns
    3. **Use JOINs properly** - Choose appropriate join type
    4. **Parameterize queries** - Prevent SQL injection
    5. **Use transactions** - For data consistency
    6. **Normalize data** - Reduce redundancy
    7. **Use constraints** - Ensure data integrity
    8. **Add comments** - Document complex queries
    9. **Use aliases** - Make queries readable
    10. **Test on sample data** - Before production

## Performance Tips

```sql
-- Good: Use index
SELECT * FROM employees WHERE id = 100;

-- Bad: Function on indexed column
SELECT * FROM employees WHERE YEAR(hire_date) = 2023;

-- Good: Use range instead
SELECT * FROM employees
WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';

-- Use EXPLAIN to analyze queries
EXPLAIN SELECT * FROM employees WHERE salary > 75000;
```

## Common Patterns

### Pagination

```sql
-- MySQL/PostgreSQL
SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;  -- Page 3 (rows 21-30)
```

### Ranking

```sql
SELECT
    first_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;
```

### Pivot Table

```sql
SELECT
    department,
    SUM(CASE WHEN YEAR(hire_date) = 2022 THEN 1 ELSE 0 END) as hired_2022,
    SUM(CASE WHEN YEAR(hire_date) = 2023 THEN 1 ELSE 0 END) as hired_2023
FROM employees
GROUP BY department;
```

## Summary

SQL is essential for:

- ✅ Creating and managing databases
- ✅ Querying and retrieving data
- ✅ Data manipulation and updates
- ✅ Data analysis and reporting
- ✅ Ensuring data integrity
- ✅ Performance optimization

## Next Topics

- Advanced SQL (Window functions, CTEs)
- Database design and normalization
- SQL optimization and indexing
- Stored procedures and triggers
- NoSQL databases
