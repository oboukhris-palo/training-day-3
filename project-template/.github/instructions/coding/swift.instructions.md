---
description: Swift programming language best practices, patterns, and conventions
applyTo: "**/*.swift"
---

# Swift Best Practices & Development Guidelines

This document establishes coding standards and best practices for Swift development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across Swift projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create Swift package
swift package init --type library

# Create iOS project
swift package init --type executable

# Build
swift build

# Run tests
swift test

# Format code
swift-format -i -r .

# Lint with SwiftLint
swiftlint .
```

### Version Requirements
- **Swift**: 5.9+ (5.10+ recommended)
- **macOS**: 11+, iOS: 12+, tvOS: 12+, watchOS: 5+

### Project Structure
```
ProjectName/
├── Sources/
│   ├── App/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   ├── ViewModels/
│   │   └── Views/
│   └── Shared/
├── Tests/
│   ├── AppTests/
│   └── UnitTests/
├── Package.swift
└── README.md
```

---

## 2. Code Style & Conventions

### 2.1 Naming Conventions
```swift
// ✅ DO: Use clear naming conventions
class UserService { }  // PascalCase for classes
struct User { }  // PascalCase for structs
enum Status { }  // PascalCase for enums
protocol UserRepository { }  // PascalCase for protocols

func getUserById(id: String) -> User? { }  // camelCase for functions
let userName: String = "John"  // camelCase for variables
let MAX_RETRIES: Int = 3  // UPPER_SNAKE_CASE for constants (rare in Swift)

// ❌ DON'T: Mix conventions
func GetUser() { }  // Wrong case
class userService { }  // Wrong case
var User_Name: String = "John"  // Wrong convention

// ✅ DO: Use meaningful names
var isEmailValid: Bool  // Better than valid
func calculateUserScore() -> Int { }  // Better than calcScore()
```

### 2.2 Imports Organization
```swift
// ✅ DO: Organize imports clearly
import Foundation
import UIKit
import Combine

import Alamofire
import SwiftyJSON

// Local imports
import UserService
import Models
```

### 2.3 Type Inference
```swift
// ✅ DO: Let Swift infer types when obvious
let name = "John"  // Inferred as String
let count = 42  // Inferred as Int
let users: [User] = []  // Type hint when needed

// ❌ DON'T: Over-specify types
let name: String = "John"  // Unnecessary
let count: Int = 42  // Unnecessary
```

---

## 3. Structs vs Classes

### 3.1 Struct Definition
```swift
// ✅ DO: Use structs for value types by default
struct User: Identifiable {
    let id: String
    let name: String
    let email: String
    
    var initials: String {
        name.split(separator: " ")
            .compactMap { $0.first }
            .map(String.init)
            .joined()
    }
}

// ✅ DO: Use let for immutable properties
struct Point {
    let x: Double
    let y: Double
}

// ✅ DO: Use var only when state changes
struct Counter {
    var count: Int = 0
    
    mutating func increment() {
        count += 1
    }
}

// ✅ DO: Conform to Codable for serialization
struct User: Codable {
    let id: String
    let name: String
    let email: String
}
```

### 3.2 Class Definition
```swift
// ✅ DO: Use classes only for reference types
class Database {
    private let connection: Connection
    
    init(connection: Connection) {
        self.connection = connection
    }
    
    func getUser(id: String) -> User? {
        // Database query
        return nil
    }
}

// ✅ DO: Use deinit for cleanup
class FileHandle {
    private let handle: Int
    
    init(path: String) {
        self.handle = open(path, O_RDONLY)
    }
    
    deinit {
        close(handle)
    }
}

// ✅ DO: Use weak self in closures to avoid cycles
class ViewController: UIViewController {
    func fetchData() {
        service.fetchData { [weak self] result in
            self?.handleResult(result)
        }
    }
}
```

---

## 4. Functions & Methods

### 4.1 Function Definition
```swift
// ✅ DO: Use clear function signatures
func getUserById(id: String) -> User? {
    return userRepository.find(id)
}

// ✅ DO: Use argument labels
func presentAlert(title: String, message: String, action: @escaping () -> Void) {
    // Show alert
}

// Usage:
presentAlert(title: "Error", message: "Something went wrong", action: {
    print("Dismissed")
})

// ✅ DO: Use default parameters
func greet(name: String, greeting: String = "Hello") -> String {
    return "\(greeting), \(name)!"
}

// ✅ DO: Use variadic parameters
func sumNumbers(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}

// ✅ DO: Use inout for reference parameters
func increment(_ number: inout Int) {
    number += 1
}

var value = 5
increment(&value)  // value is now 6
```

### 4.2 Closure & Trailing Closure
```swift
// ✅ DO: Use closures for callbacks
let completion: (Result<User, Error>) -> Void = { result in
    switch result {
    case .success(let user):
        print("User: \(user.name)")
    case .failure(let error):
        print("Error: \(error)")
    }
}

// ✅ DO: Use trailing closure syntax
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    print("Delayed execution")
}

// ✅ DO: Use @escaping for long-lived closures
func fetchUser(id: String, completion: @escaping (User?) -> Void) {
    DispatchQueue.global().async {
        let user = self.repository.find(id)
        DispatchQueue.main.async {
            completion(user)
        }
    }
}
```

---

## 5. Error Handling

### 5.1 Custom Errors
```swift
// ✅ DO: Define custom error types
enum UserError: Error, LocalizedError {
    case notFound
    case invalidEmail(String)
    case validationFailed(message: String)
    
    var errorDescription: String? {
        switch self {
        case .notFound:
            return "User not found"
        case .invalidEmail(let email):
            return "Invalid email: \(email)"
        case .validationFailed(let message):
            return message
        }
    }
}

// ✅ DO: Throw and catch errors
func validateEmail(_ email: String) throws {
    if !email.contains("@") {
        throw UserError.invalidEmail(email)
    }
}

do {
    try validateEmail(userEmail)
} catch UserError.invalidEmail(let email) {
    print("Invalid email: \(email)")
} catch UserError.validationFailed(let message) {
    print("Validation error: \(message)")
} catch {
    print("Unexpected error: \(error)")
}

// ✅ DO: Use Result type for asynchronous operations
func fetchUser(id: String, completion: @escaping (Result<User, UserError>) -> Void) {
    // Fetch user
    completion(.failure(.notFound))
}
```

---

## 6. Async/Await

### 6.1 Async Functions
```swift
// ✅ DO: Use async/await for asynchronous operations
async func fetchUser(id: String) throws -> User {
    guard !id.isEmpty else {
        throw UserError.validationFailed(message: "ID cannot be empty")
    }
    
    // Simulate network call
    try await Task.sleep(nanoseconds: 1_000_000_000)
    
    return User(id: id, name: "John", email: "john@example.com")
}

// ✅ DO: Call async functions with await
Task {
    do {
        let user = try await fetchUser(id: "123")
        print("User: \(user.name)")
    } catch {
        print("Error: \(error)")
    }
}

// ✅ DO: Use async for image loading
func loadImage(from url: URL) async -> UIImage? {
    let (data, _) = try? await URLSession.shared.data(from: url)
    return data.flatMap(UIImage.init(data:))
}

// ✅ DO: Use structured concurrency
async func fetchMultipleUsers(ids: [String]) -> [User] {
    return await withTaskGroup(of: User?.self) { group in
        for id in ids {
            group.addTask {
                try? await self.fetchUser(id: id)
            }
        }
        
        var users: [User] = []
        for await user in group {
            if let user = user {
                users.append(user)
            }
        }
        return users
    }
}
```

---

## 7. SwiftUI

### 7.1 View Structure
```swift
// ✅ DO: Use @State for local state
struct ContentView: View {
    @State private var isShowingAlert = false
    @State private var userName = ""
    
    var body: some View {
        VStack {
            TextField("Enter name", text: $userName)
            Button("Show Alert") {
                isShowingAlert = true
            }
        }
        .alert("Welcome", isPresented: $isShowingAlert) {
            Button("OK") { }
        }
    }
}

// ✅ DO: Use @StateObject for observed objects
class UserViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false
    
    func fetchUser(id: String) {
        isLoading = true
        // Fetch logic
    }
}

struct UserView: View {
    @StateObject private var viewModel = UserViewModel()
    
    var body: some View {
        if viewModel.isLoading {
            ProgressView()
        } else if let user = viewModel.user {
            Text(user.name)
        }
    }
}

// ✅ DO: Use @Environment for passing values down
struct ContentView: View {
    var body: some View {
        ChildView()
            .environment(\.colorScheme, .dark)
    }
}

struct ChildView: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        Text("Current scheme: \(colorScheme?.description ?? "unknown")")
    }
}
```

---

## 8. Testing

### 8.1 XCTest
```swift
// ✅ DO: Write unit tests
import XCTest

class UserServiceTests: XCTestCase {
    var service: UserService!
    
    override func setUp() {
        super.setUp()
        service = UserService()
    }
    
    func testFetchUserSuccessfully() async throws {
        let user = try await service.fetchUser(id: "123")
        
        XCTAssertEqual(user.id, "123")
        XCTAssertEqual(user.name, "John")
    }
    
    func testThrowsErrorOnEmptyId() async {
        do {
            _ = try await service.fetchUser(id: "")
            XCTFail("Should throw error")
        } catch UserError.validationFailed {
            // Expected
        }
    }
}

// ✅ DO: Use async testing with async/await
func testAsyncOperation() async throws {
    let result = try await performAsyncOperation()
    XCTAssertNotNil(result)
}
```

---

## 9. Common Patterns & Anti-Patterns

### ✅ DO's
- Use structs by default
- Use protocols for abstraction
- Use type-safe enums
- Use Codable for serialization
- Handle errors with Result
- Use async/await
- Use @State and @StateObject
- Write unit tests
- Avoid strong reference cycles

### ❌ DON'Ts
- Overuse classes
- Create implicitly unwrapped optionals
- Use `!` unnecessarily  
- Ignore memory management
- Create deeply nested views
- Use `var` for constants
- Ignore compiler warnings
- Test with `Thread.sleep()`

---

## Resources

- [Swift.org Documentation](https://swift.org/documentation/)
- [SwiftUI Documentation](https://developer.apple.com/swiftui/)
- [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)
- [Swift by Example](https://www.hackingwithswift.com/)
