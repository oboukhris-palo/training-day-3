---
description: Kotlin programming language best practices, patterns, and conventions
applyTo: "**/*.kt"
---

# Kotlin Development Instructions

## Overview

This document provides systematic instructions for Kotlin programming language best practices and conventions using the AI-first delivery methodology. These instructions follow established Kotlin development patterns and transform modern JVM programming requirements into comprehensive coding standards that leverage Kotlin's conciseness, safety features, and interoperability for scalable applications.

## Process Overview

**Kotlin Development Implementation** transforms modern JVM programming requirements into structured Kotlin implementations that deliver concise code, effective null safety, comprehensive testing strategies, and maintainable applications through proper Kotlin idioms, language features, and established patterns for scalable Kotlin development.

## Implementation Process & Development Guidelines

This document establishes coding standards and best practices for Kotlin development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across Kotlin projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create Kotlin project using Gradle
gradle init --type kotlin-application

# Build project
./gradlew build

# Run application
./gradlew run

# Run tests
./gradlew test

# Lint code (ktlint)
./gradlew ktlintFormat
```

### Version Requirements
- **Kotlin**: 1.9+ (1.10+ recommended)
- **Java**: 11 or higher
- **Gradle**: 8.x or higher

### Project Structure
```
project-name/
├── src/
│   ├── main/
│   │   ├── kotlin/
│   │   │   ├── main.kt
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   └── utils/
│   │   └── resources/
│   └── test/
│       └── kotlin/
├── build.gradle.kts
└── settings.gradle.kts
```

---

## 2. Kotlin Fundamentals

### 2.1 Variables & Type Inference
```kotlin
// ✅ DO: Use val for immutable variables
val userName: String = "John"
val users: List<User> = emptyList()

// ✅ DO: Use var only when necessary
var counter = 0
counter++

// ✅ DO: Let Kotlin infer types when obvious
val message = "Hello"  // Inferred as String
val numbers = listOf(1, 2, 3)  // Inferred as List<Int>

// ✅ DO: Use nullable types explicitly
val nullable: String? = "value"
val nonNullable: String = "value"

// ❌ DON'T: Use var for constants
var MAX_USERS = 100  // Should be val
```

### 2.2 String Templates
```kotlin
// ✅ DO: Use string templates
val name = "World"
val message = "Hello, $name!"
val math = "5 + 3 = ${5 + 3}"

// ✅ DO: Use raw strings for complex content
val json = """
    {
        "name": "John",
        "age": 30
    }
""".trimIndent()
```

---

## 3. Functions & Lambdas

### 3.1 Function Definition
```kotlin
// ✅ DO: Use clear function signatures
fun getUserById(id: String): User? {
    return userRepository.find(id)
}

// ✅ DO: Use default parameters
fun greet(name: String, greeting: String = "Hello"): String {
    return "$greeting, $name!"
}

// ✅ DO: Use named parameters
greet(name = "Alice", greeting = "Hi")

// ✅ DO: Use varargs for variable arguments
fun sumNumbers(vararg numbers: Int): Int {
    return numbers.sum()
}

// ✅ DO: Use extension functions
fun String.isValidEmail(): Boolean {
    return this.contains("@")
}

val isValid = "user@example.com".isValidEmail()

// ✅ DO: Use infix functions for DSL-like code
infix fun Int.times(other: Int): Int {
    return this * other
}

val result = 5 times 3  // DSL-like
```

### 3.2 Lambda Expressions
```kotlin
// ✅ DO: Use lambdas with functional operations
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }
val evens = numbers.filter { it % 2 == 0 }

// ✅ DO: Use trailing lambda syntax
numbers.forEach { number ->
    println(number)
}

// ✅ DO: Use it when single parameter
val squared = numbers.map { it * it }

// ✅ DO: Destructure in lambdas
val pairs = listOf(1 to "a", 2 to "b")
pairs.forEach { (number, letter) ->
    println("$number: $letter")
}
```

---

## 4. Classes & Data Classes

### 4.1 Data Classes
```kotlin
// ✅ DO: Use data classes for immutable data
data class User(
    val id: String,
    val name: String,
    val email: String
)

// ✅ DO: Use copy() for modified copies
val user = User("1", "John", "john@example.com")
val updatedUser = user.copy(name = "Jane")

// ✅ DO: Use destructuring
val (id, name, email) = user
println("User $name has id $id")

// ✅ DO: Use sealed classes for type-safe hierarchies
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// ✅ DO: Use when with sealed classes
when (result) {
    is Result.Success -> println(result.data)
    is Result.Error -> println(result.exception)
    Result.Loading -> println("Loading...")
}
```

### 4.2 Object & Companion Objects
```kotlin
// ✅ DO: Use object for singletons
object Logger {
    fun log(message: String) {
        println("[LOG] $message")
    }
}

// ✅ DO: Use companion object for static members
class Configuration {
    companion object {
        const val DEFAULT_TIMEOUT = 5000
        
        fun load(): Configuration {
            return Configuration()
        }
    }
}

// Usage:
Configuration.DEFAULT_TIMEOUT
Configuration.load()
```

---

## 5. Null Safety

### 5.1 Nullable Types
```kotlin
// ✅ DO: Use nullable types explicitly
val userName: String? = "John"

// ✅ DO: Use safe call operator
val length: Int? = userName?.length

// ✅ DO: Use elvis operator
val name: String = userName ?: "Guest"

// ✅ DO: Use not-null assertion only when sure
val notNull: String = userName!!

// ✅ DO: Use let for null checking
userName?.let { name ->
    println("Hello, $name")
}

// ✅ DO: Use also for side effects
userName
    ?.also { println("Name: $it") }
    ?.let { it.uppercase() }

// ❌ DON'T: Use !! unnecessarily
val unsafe: String = userName!!  // Can throw NPE
```

---

## 6. Collections

### 6.1 Collection Operations
```kotlin
// ✅ DO: Use functional collection methods
val numbers = listOf(1, 2, 3, 4, 5)

val doubled = numbers.map { it * 2 }
val evens = numbers.filter { it % 2 == 0 }
val sum = numbers.fold(0) { acc, num -> acc + num }
val first = numbers.firstOrNull { it > 3 }

// ✅ DO: Use immutable collections by default
val items: List<String> = listOf("a", "b", "c")
val set: Set<Int> = setOf(1, 2, 3)
val map: Map<String, Int> = mapOf("a" to 1, "b" to 2)

// ✅ DO: Use mutable collections when needed
val mutableList: MutableList<String> = mutableListOf("a", "b")
mutableList.add("c")

// ✅ DO: Use sequences for lazy evaluation
val sequence = numbers
    .asSequence()
    .map { it * 2 }
    .filter { it > 5 }
    .toList()
```

---

## 7. Coroutines (Async)

### 7.1 Coroutine Basics
```kotlin
// ✅ DO: Use coroutines for async operations
import kotlinx.coroutines.*

suspend fun fetchUser(id: String): User {
    // Suspend function
    return withContext(Dispatchers.IO) {
        // Network call
        User(id, "John", "john@example.com")
    }
}

// ✅ DO: Use launch for fire-and-forget
GlobalScope.launch {
    println("Async task")
}

// ✅ DO: Use async for results
val deferredUser = async {
    fetchUser("1")
}
val user = deferredUser.await()

// ✅ DO: Use runBlocking for main functions
fun main() = runBlocking {
    val user = fetchUser("1")
    println(user)
}

// ✅ DO: Use coroutineScope for structured concurrency
suspend fun loadAllUsers(ids: List<String>): List<User> {
    return coroutineScope {
        ids.map { id ->
            async { fetchUser(id) }
        }.awaitAll()
    }
}
```

---

## 8. Error Handling

### 8.1 Try-Catch & Custom Exceptions
```kotlin
// ✅ DO: Use try-catch expressions
val result: String = try {
    readFile("config.txt")
} catch (e: IOException) {
    "File not found"
} finally {
    println("Cleaning up")
}

// ✅ DO: Create custom exceptions
class ValidationException(override val message: String) : Exception()
class NotFoundException(id: String) : Exception("Item not found: $id")

// ✅ DO: Throw specific exceptions
fun validateEmail(email: String) {
    if (!email.contains("@")) {
        throw ValidationException("Invalid email format")
    }
}

// ✅ DO: Use runCatching for Result
val result: Result<String> = runCatching {
    readFile("config.txt")
}

result.onSuccess { content ->
    println(content)
}.onFailure { error ->
    println("Error: ${error.message}")
}
```

---

## 9. Testing

### 9.1 Unit Tests (JUnit / Kotest)
```kotlin
// ✅ DO: Write typed tests
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class UserServiceTest {
    @Test
    fun `should create user with valid data`() {
        val service = UserService()
        val user = service.createUser("John", "john@example.com")

        assertEquals("John", user.name)
        assertEquals("john@example.com", user.email)
    }

    @Test
    fun `should throw on invalid email`() {
        val service = UserService()
        
        assertThrows<ValidationException> {
            service.createUser("John", "invalid")
        }
    }
}

// ✅ DO: Use Kotest for BDD-style testing
import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.shouldBe

class UserServiceKotestTest : FunSpec({
    test("user creation should succeed") {
        val service = UserService()
        val user = service.createUser("John", "john@example.com")
        
        user.name shouldBe "John"
    }
})
```

---

## 10. Common Patterns & Anti-Patterns

### ✅ DO's
- Use val for immutable data
- Leverage null safety with ? and ?:
- Use data classes for DTOs
- Use sequences for lazy evaluation
- Handle exceptions explicitly
- Use extension functions
- Write tests for all functions
- Use coroutines for async

### ❌ DON'Ts
- Use var unnecessarily
- Use !! without certainty
- Create mutable collections by default
- Ignore null safety
- Use try-catch for expected control flow
- Create deeply nested lambdas
- Use GlobalScope in production
- Ignore coroutine cancellation

---

## Resources

- [Kotlin Official Documentation](https://kotlinlang.org/docs/)
- [Kotlin by Example](https://play.kotlinlang.org/byExample/overview)
- [Coroutines Guide](https://github.com/Kotlin/kotlinx.coroutines/blob/master/docs/basics.md)
