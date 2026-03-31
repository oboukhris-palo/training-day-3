---
description: C++ programming language best practices, patterns, and conventions
applyTo: "**/*.cpp,**/*.h,**/*.hpp"
---

# C++ Development Instructions

## Overview

This document provides systematic instructions for C++ programming language best practices and conventions using the AI-first delivery methodology. These instructions follow established C++ development patterns and transform systems programming requirements into comprehensive coding standards that leverage modern C++ features, maintain performance optimization, and ensure reliable system-level development.

## Process Overview

**C++ Development Implementation** transforms systems programming requirements into structured C++ implementations that deliver high-performance applications, effective memory management, comprehensive testing strategies, and maintainable codebases through proper C++ idioms, modern language features, and established patterns for robust systems programming.

## Implementation Process & Development Guidelines

This document establishes coding standards and best practices for C++ development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across C++ projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create C++ project
mkdir project-name && cd project-name

# Build with CMake
cmake -B build -S .
cmake --build build

# Build with Make
make

# Run tests
./build/bin/test_runner

# Format code (clang-format)
clang-format -i **/*.cpp **/*.h
```

### Version Requirements
- **C++**: C++17 or higher (C++20+ recommended)
- **Compiler**: GCC 11+, Clang 13+, or MSVC 2019+

### Project Structure
```
project-name/
├── src/
│   ├── main.cpp
│   ├── models/
│   │   ├── user.h
│   │   └── user.cpp
│   ├── services/
│   │   ├── user_service.h
│   │   └── user_service.cpp
│   └── utils/
│       └── helpers.h
├── include/
│   └── project/
│       └── public_headers.h
├── tests/
│   └── test_main.cpp
├── CMakeLists.txt
└── README.md
```

---

## 2. Code Style & Conventions

### 2.1 Naming Conventions
```cpp
// ✅ DO: Use clear naming conventions
class UserService { };  // PascalCase for classes
struct Point { };  // PascalCase for structs
enum class Status { };  // PascalCase for enums

void getUser();  // camelCase for functions
int userCount;  // camelCase for variables
const int MAX_RETRIES = 3;  // UPPER_SNAKE_CASE for constants
static int s_globalCounter;  // s_ prefix for static

// ✅ DO: Use namespaces to organize code
namespace project {
    namespace services {
        class UserService { };
    }
}

// ✅ DO: Use descriptive names
int calculateUserScore();  // Better than int calcScore();
bool isValidEmail();  // Better than bool validate();

// ❌ DON'T: Use single letters (outside loops)
int a, b, c;  // Poor naming
void f(int x);  // Unclear purpose
```

### 2.2 Headers & Includes
```cpp
// ✅ DO: Use include guards or #pragma once
#pragma once
// or
#ifndef PROJECT_USER_H
#define PROJECT_USER_H
// ...
#endif

// ✅ DO: Organize includes properly
#include <string>  // Standard library
#include <vector>

#include "project/models/user.h"  // Local headers
#include "project/services/user_service.h"

// ✅ DO: Avoid circular includes
// Use forward declarations when possible
class UserRepository;  // Forward declaration

class UserService {
    UserRepository* repository;
};
```

---

## 3. Memory Management

### 3.1 Smart Pointers
```cpp
// ✅ DO: Use smart pointers instead of raw pointers
#include <memory>

std::unique_ptr<User> user = std::make_unique<User>("id", "John");
std::shared_ptr<Database> db = std::make_shared<Database>();

// ✅ DO: Use RAII principle
class File {
public:
    File(const std::string& path) {
        handle = open(path.c_str());
    }
    
    ~File() {
        if (handle) close(handle);  // Cleanup in destructor
    }
    
private:
    int handle = -1;
};

// ✅ DO: Avoid raw pointers
// ❌ DON'T
User* user = new User();  // Manual memory management
delete user;  // Easy to forget

// ✅ DO
auto user = std::make_unique<User>();  // Automatic cleanup
```

### 3.2 Object Ownership
```cpp
// ✅ DO: Be clear about object ownership
class UserRepository {
private:
    std::vector<std::unique_ptr<User>> users;  // Owns the users
    
public:
    User* getUser(const std::string& id) {  // Returns non-owning pointer
        for (auto& user : users) {
            if (user->id == id) return user.get();
        }
        return nullptr;
    }
};

// ✅ DO: Use value semantics when appropriate
class Point {
public:
    Point(double x, double y) : x(x), y(y) {}
    
private:
    double x, y;
};

Point p1(0.0, 0.0);
Point p2 = p1;  // Copy semantics
```

---

## 4. Classes & Objects

### 4.1 Class Definition
```cpp
// ✅ DO: Use proper access specifiers
class User {
public:
    User(const std::string& id, const std::string& name);
    
    std::string getId() const;
    void setName(const std::string& name);
    
private:
    std::string id;
    std::string name;
    
    bool validate() const;
};

// ✅ DO: Use const correctly
class Database {
public:
    std::vector<User> getAllUsers() const {
        return users;  // Const method doesn't modify state
    }
    
    void addUser(const User& user) {
        users.push_back(user);  // Non-const, modifies state
    }
    
private:
    std::vector<User> users;
};

// ✅ DO: Use initialization lists
class Account {
public:
    Account(double balance, const std::string& type)
        : balance(balance), type(type), createdAt(std::time(nullptr)) {}
    
private:
    double balance;
    std::string type;
    std::time_t createdAt;
};

// ✅ DO: Use default member initialization
class Config {
    int timeout = 5000;
    bool debug = false;
    std::string name = "default";
};
```

### 4.2 Inheritance & Polymorphism
```cpp
// ✅ DO: Use virtual functions for polymorphism
class Entity {
public:
    virtual ~Entity() = default;
    virtual void update() = 0;
    virtual std::string getName() const = 0;
};

class User : public Entity {
public:
    void update() override {
        // Implementation
    }
    
    std::string getName() const override {
        return name;
    }
    
private:
    std::string name;
};

// ✅ DO: Use override keyword
class Player : public User {
    void update() override { }  // Explicit override
};

// ✅ DO: Use abstract base classes
class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
};
```

---

## 5. Templates & Generics

### 5.1 Template Functions
```cpp
// ✅ DO: Use templates for generic code
template<typename T>
T max(T a, T b) {
    return a > b ? a : b;
}

// ✅ DO: Use template specialization
template<>
std::string max<std::string>(std::string a, std::string b) {
    return a.length() > b.length() ? a : b;
}

// ✅ DO: Use concepts to constrain templates (C++20)
template<typename T>
requires std::integral<T>
T doubleValue(T value) {
    return value * 2;
}
```

### 5.2 Template Classes
```cpp
// ✅ DO: Use template classes for containers
template<typename T>
class Stack {
public:
    void push(const T& value) {
        elements.push_back(value);
    }
    
    T pop() {
        T value = elements.back();
        elements.pop_back();
        return value;
    }
    
private:
    std::vector<T> elements;
};

// Usage:
Stack<int> intStack;
intStack.push(42);
int value = intStack.pop();
```

---

## 6. Error Handling

### 6.1 Exceptions
```cpp
// ✅ DO: Use exceptions for error handling
class ValidationError : public std::runtime_error {
public:
    ValidationError(const std::string& field, const std::string& message)
        : std::runtime_error(field + ": " + message), field(field) {}
    
    std::string getField() const { return field; }
    
private:
    std::string field;
};

// ✅ DO: Throw and catch exceptions appropriately
void validateEmail(const std::string& email) {
    if (email.find('@') == std::string::npos) {
        throw ValidationError("email", "Invalid email format");
    }
}

try {
    validateEmail(userEmail);
} catch (const ValidationError& e) {
    std::cerr << "Field: " << e.getField() << ", Error: " << e.what() << std::endl;
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
}

// ✅ DO: Use RAII for resource management
class DatabaseConnection {
public:
    DatabaseConnection() { connect(); }
    ~DatabaseConnection() { disconnect(); }
    
    void connect();
    void disconnect();
};
```

---

## 7. Modern C++ Features

### 7.1 Auto & Type Deduction
```cpp
// ✅ DO: Use auto for type deduction
auto x = 42;  // int
auto name = std::string("John");  // std::string
auto users = std::vector<User>();  // std::vector<User>

// ✅ DO: Use range-based for loops
std::vector<User> users = /*...*/;
for (const auto& user : users) {
    std::cout << user.getName() << std::endl;
}

// ✅ DO: Use structured bindings (C++17)
struct Point { double x, y; };
Point p{1.0, 2.0};
auto [x, y] = p;
```

### 7.2 Lambda Functions
```cpp
// ✅ DO: Use lambdas for concise functions
auto isEven = [](int n) { return n % 2 == 0; };
bool even = isEven(4);

// ✅ DO: Use lambdas with algorithms
std::vector<int> numbers = {1, 2, 3, 4, 5};
std::transform(numbers.begin(), numbers.end(),
               numbers.begin(),
               [](int n) { return n * 2; });

// ✅ DO: Capture context
int multiplier = 10;
auto multiply = [multiplier](int n) { return n * multiplier; };

// ✅ DO: Use auto return type (C++14)
auto getUser = [](const std::string& id) -> std::optional<User> {
    // Return optional
    return std::nullopt;
};
```

---

## 8. Testing

### 8.1 Unit Tests (Google Test)
```cpp
// ✅ DO: Write tests using Google Test
#include <gtest/gtest.h>

class UserServiceTest : public ::testing::Test {
protected:
    UserService service;
};

TEST_F(UserServiceTest, CreateUserSuccessfully) {
    auto user = service.createUser("John", "john@example.com");
    
    EXPECT_EQ(user.getName(), "John");
    EXPECT_EQ(user.getEmail(), "john@example.com");
}

TEST_F(UserServiceTest, FailOnInvalidEmail) {
    EXPECT_THROW(
        service.createUser("John", "invalid"),
        ValidationError
    );
}
```

---

## 9. Common Patterns & Anti-Patterns

### ✅ DO's
- Use smart pointers (unique_ptr, shared_ptr)
- Follow RAII principle
- Use const correctly
- Prefer value semantics
- Use templates for generic code
- Handle errors with exceptions
- Use range-based for loops
- Use auto for type deduction

### ❌ DON'Ts
- Use raw pointers for ownership
- Ignore memory management
- Use uninitialized variables
- Create deeply nested classes
- Use #define for constants
- Ignore const correctness
- Mix owning and non-owning pointers without clarity
- Use goto statements

---

## Resources

- [C++ Reference](https://en.cppreference.com/)
- [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines)
- [Effective Modern C++](https://www.oreilly.com/library/view/effective-modern-c/9781491908021/)
