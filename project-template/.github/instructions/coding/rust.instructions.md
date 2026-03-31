---
description: Rust programming language best practices, patterns, and conventions
applyTo: "**/*.rs"
---

# Rust Development Instructions

## Overview

This document provides systematic instructions for Rust programming language best practices and conventions using the AI-first delivery methodology. These instructions follow established Rust development patterns and transform systems programming requirements into comprehensive coding standards that leverage Rust's memory safety, performance guarantees, and concurrency features for reliable system development.

## Process Overview

**Rust Development Implementation** transforms systems programming requirements into structured Rust implementations that deliver memory-safe applications, effective ownership patterns, comprehensive testing strategies, and maintainable codebases through proper Rust idioms, borrow checker compliance, and established patterns for safe concurrent systems.

## Implementation Process & Development Guidelines

This document establishes coding standards and best practices for Rust development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across Rust projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create new Rust project
cargo new project-name

# Build project
cargo build

# Run application
cargo run

# Run tests
cargo test

# Format code
cargo fmt

# Lint code
cargo clippy

# Add dependencies
cargo add <crate-name>
```

### Version Requirements
- **Rust**: 1.70+ (latest stable recommended)
- **Cargo**: Latest version

### Project Structure
```
project-name/
├── Cargo.toml
├── Cargo.lock
├── src/
│   ├── main.rs
│   ├── lib.rs
│   ├── models/
│   │   └── mod.rs
│   ├── services/
│   │   └── mod.rs
│   ├── handlers/
│   │   └── mod.rs
│   └── utils/
│       └── mod.rs
└── tests/
    └── integration_test.rs
```

---

## 2. Code Style & Conventions

### 2.1 Naming Conventions
```rust
// ✅ DO: Use clear, conventional names
fn get_user(id: &str) -> Result<User, Error> { }  // snake_case for functions
const MAX_RETRIES: u32 = 3;  // UPPER_SNAKE_CASE for constants
struct UserData { }  // PascalCase for structs
enum Status { }  // PascalCase for enums
trait Drawable { }  // PascalCase for traits

// ❌ DON'T: Mix conventions
fn GetUser(id: &str) -> Result<User, Error> { }  // Wrong case
const max_retries: u32 = 3;  // Wrong case

// ✅ DO: Use descriptive variable names
fn process_payment(amount: f64, recipient: &str) -> Result<(), PaymentError> {
    let transaction_id = generate_id();
    let processed_amount = amount * TAX_RATE;
    Ok(())
}
```

### 2.2 Imports Organization
```rust
// ✅ DO: Organize imports clearly
use std::collections::HashMap;
use std::fs::File;
use std::io::{self, Read};

use serde::{Deserialize, Serialize};
use tokio::task;

use crate::models::User;
use crate::services::auth;

// ❌ DON'T: Use wildcard imports excessively
use std::*;  // ❌ Too broad
use crate::*;
```

---

## 3. Ownership & Borrowing

### 3.1 Ownership Rules
```rust
// ✅ DO: Understand move semantics
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 is moved to s2
    // println!("{}", s1);  // ❌ Error: s1 no longer valid
    
    println!("{}", s2);  // ✅ s2 is valid
}

// ✅ DO: Use references to avoid moves
fn process_string(s: &str) {
    println!("{}", s);
}

fn main() {
    let s = String::from("hello");
    process_string(&s);
    println!("{}", s);  // ✅ s still valid
}

// ✅ DO: Use mutable references when needed
fn modify_string(s: &mut String) {
    s.push_str(" world");
}

fn main() {
    let mut s = String::from("hello");
    modify_string(&mut s);
    println!("{}", s);  // "hello world"
}

// ❌ DON'T: Have multiple mutable references
let mut x = 5;
let r1 = &mut x;
let r2 = &mut x;  // ❌ Error: cannot have two mutable references
```

### 3.2 Lifetimes
```rust
// ✅ DO: Understand lifetimes (often omitted with Elision)
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() { s1 } else { s2 }
}

// ✅ DO: Use lifetime elision when possible
fn first(s: &str) -> &str {  // Lifetime is inferred
    &s[0..1]
}

struct User<'a> {
    name: &'a str,
}

impl<'a> User<'a> {
    fn get_name(&self) -> &'a str {
        self.name
    }
}
```

---

## 4. Error Handling

### 4.1 Result & Option
```rust
// ✅ DO: Use Result for operations that can fail
fn read_file(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// ✅ DO: Use Option for nullable values
fn find_user(id: u32) -> Option<User> {
    // Search for user
    None
}

// ✅ DO: Handle Results effectively
match read_file("config.toml") {
    Ok(contents) => println!("{}", contents),
    Err(e) => eprintln!("Error reading file: {}", e),
}

// ✅ DO: Use ? operator for early return
fn process_config() -> Result<Config, ConfigError> {
    let contents = read_file("config.toml")?;
    let config = parse_config(&contents)?;
    Ok(config)
}

// ✅ DO: Use custom error types
#[derive(Debug)]
enum CustomError {
    InvalidInput(String),
    NotFound,
    InternalError(String),
}

impl std::fmt::Display for CustomError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            CustomError::InvalidInput(msg) => write!(f, "Invalid input: {}", msg),
            CustomError::NotFound => write!(f, "Not found"),
            CustomError::InternalError(msg) => write!(f, "Internal error: {}", msg),
        }
    }
}

impl std::error::Error for CustomError {}
```

---

## 5. Structs & Enums

### 5.1 Struct Patterns
```rust
// ✅ DO: Use meaningful struct definitions
#[derive(Debug, Clone)]
struct User {
    id: u32,
    name: String,
    email: String,
}

// ✅ DO: Implement methods on structs
impl User {
    fn new(id: u32, name: String, email: String) -> Self {
        User { id, name, email }
    }

    fn is_valid(&self) -> bool {
        !self.email.is_empty() && !self.name.is_empty()
    }
}

// ✅ DO: Use builder pattern for complex construction
struct ConfigBuilder {
    host: String,
    port: u16,
    timeout: Option<u64>,
}

impl ConfigBuilder {
    fn new(host: String, port: u16) -> Self {
        ConfigBuilder {
            host,
            port,
            timeout: None,
        }
    }

    fn with_timeout(mut self, timeout: u64) -> Self {
        self.timeout = Some(timeout);
        self
    }

    fn build(self) -> Config {
        Config {
            host: self.host,
            port: self.port,
            timeout: self.timeout.unwrap_or(30),
        }
    }
}

// Usage:
let config = ConfigBuilder::new("localhost".to_string(), 8080)
    .with_timeout(60)
    .build();
```

### 5.2 Enum Patterns
```rust
// ✅ DO: Use enums for type-safe alternatives
enum Status {
    Pending,
    Active,
    Completed,
    Failed(String),
}

// ✅ DO: Pattern match on enums effectively
match status {
    Status::Pending => println!("Waiting to start"),
    Status::Active => println!("Currently running"),
    Status::Completed => println!("Done"),
    Status::Failed(reason) => println!("Failed: {}", reason),
}

// ✅ DO: Use Option and Result extensively
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}
```

---

## 6. Traits & Polymorphism

### 6.1 Trait Definition
```rust
// ✅ DO: Define clear traits
trait Drawable {
    fn draw(&self);
    fn bounds(&self) -> (f32, f32);
}

// ✅ DO: Implement traits on types
struct Circle {
    radius: f32,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing circle with radius {}", self.radius);
    }

    fn bounds(&self) -> (f32, f32) {
        (self.radius * 2.0, self.radius * 2.0)
    }
}

// ✅ DO: Use trait bounds
fn print_drawable<T: Drawable>(item: &T) {
    item.draw();
}

// ✅ DO: Use trait objects when needed
fn process_drawables(items: Vec<Box<dyn Drawable>>) {
    for item in items {
        item.draw();
    }
}
```

---

## 7. Async & Concurrency

### 7.1 Async/Await
```rust
// ✅ DO: Use async for I/O-bound operations
async fn fetch_user(id: u32) -> Result<User, Error> {
    // Async operation
    Ok(User::default())
}

// ✅ DO: Use .await to wait for futures
async fn main() {
    match fetch_user(1).await {
        Ok(user) => println!("User: {:?}", user),
        Err(e) => eprintln!("Error: {}", e),
    }
}

// ✅ DO: Spawn tasks concurrently
use tokio::task;

async fn process_many() {
    let handles: Vec<_> = (0..10)
        .map(|i| {
            task::spawn(async move {
                fetch_user(i).await
            })
        })
        .collect();

    for handle in handles {
        if let Ok(result) = handle.await {
            println!("Result: {:?}", result);
        }
    }
}
```

### 7.2 Threading
```rust
// ✅ DO: Use threads for CPU-bound work
use std::thread;

fn main() {
    let handles: Vec<_> = (0..4)
        .map(|i| {
            thread::spawn(move || {
                expensive_computation(i)
            })
        })
        .collect();

    for handle in handles {
        let result = handle.join().unwrap();
        println!("Result: {}", result);
    }
}

// ✅ DO: Use channels for thread communication
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Hello from thread".to_string()).unwrap();
    });

    let msg = rx.recv().unwrap();
    println!("{}", msg);
}
```

---

## 8. Testing

### 8.1 Unit Tests
```rust
// ✅ DO: Write unit tests in the same file
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    #[should_panic]
    fn it_panics() {
        panic!("This test should panic");
    }

    #[test]
    fn it_can_fail() {
        let result = divide(10.0, 2.0);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), 5.0);
    }
}

// ✅ DO: Use helpful assertions
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_string_length() {
        let s = "hello".to_string();
        assert_eq!(s.len(), 5);
        assert!(s.contains("ell"));
    }
}
```

---

## 9. Common Patterns & Anti-Patterns

### ✅ DO's
- Use ownership rules to prevent memory bugs
- Handle errors with Result and Option
- Use functional programming patterns
- Leverage the type system
- Write comprehensive tests
- Use descriptive names
- Document public APIs
- Use pattern matching extensively

### ❌ DON'Ts
- Ignore compiler warnings
- Use `unwrap()` in production code
- Have multiple mutable references
- Use `panic!` for regular error handling
- Create deeply nested matches (use guards)
- Use `as` for type conversions liberally
- Create global mutable state

---

## Resources

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)
