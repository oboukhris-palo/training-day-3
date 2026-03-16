---
description: Scala programming language best practices, patterns, and conventions
applyTo: "**/*.scala"
---

# Scala Best Practices & Development Guidelines

This document establishes coding standards and best practices for Scala development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across Scala projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create Scala project with sbt
sbt new scala/hello-world.g8

# Build project
sbt build

# Run application
sbt run

# Run tests
sbt test

# Format code (scalafmt)
scalafmt --all

# Lint code (scalastyle)
sbt scalastyle
```

### Version Requirements
- **Scala**: 3.x (3.3+ recommended)
- **JDK**: 11 or higher
- **sbt**: 1.9+ or Mill

### Project Structure
```
project-name/
├── src/
│   ├── main/
│   │   ├── scala/
│   │   │   ├── Main.scala
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   └── utils/
│   │   └── resources/
│   └── test/
│       └── scala/
├── build.sbt
└── project/
```

---

## 2. Code Style & Conventions

### 2.1 Naming Conventions
```scala
// ✅ DO: Use clear naming conventions
class UserService { }  // PascalCase for classes
trait UserRepository { }  // PascalCase for traits
object UserConstants { }  // PascalCase for objects
case class User(id: String, name: String)  // PascalCase

def getUserById(id: String): Option[User] = { }  // camelCase for methods
val userName: String = "John"  // camelCase for values
var counter: Int = 0  // camelCase for mutable variables
final val MAX_RETRIES: Int = 3  // UPPER_SNAKE_CASE for constants

// ✅ DO: Use meaningful names
def isValidEmail(email: String): Boolean = { }  // Better than valid()
def calculateUserScore(userId: String): Int = { }  // Better than calcScore()

// ❌ DON'T: Use unclear names
def u = "John"  // Too short
def calc() = { }  // Unclear purpose
```

### 2.2 Imports Organization
```scala
// ✅ DO: Organize imports clearly
import scala.collection.mutable
import scala.concurrent._
import scala.io.Source

import org.apache.spark.sql._
import com.typesafe.config.ConfigFactory

import project.models.User
import project.services.UserService

// ✅ DO: Use import aliases for clarity
import scala.collection.mutable.{ListBuffer => MList}
```

### 2.3 Type Annotations
```scala
// ✅ DO: Use type annotations for clarity
def getUserById(id: String): Option[User] = {
    // Implementation
    None
}

// ✅ DO: Use generics with type parameters
def getById[T](id: String)(implicit repository: Repository[T]): Option[T] = {
    repository.find(id)
}

// ✅ DO: Use type bounds
def process[T <: Serializable](item: T): String = {
    item.toString
}

// ✅ DO: Use upper and lower bounds
def compare[T >: Int](a: T, b: T): Boolean = {
    // Compare elements
    true
}
```

---

## 3. Collections & Functional Programming

### 3.1 Immutable Collections
```scala
// ✅ DO: Use immutable collections by default
val numbers: List[Int] = List(1, 2, 3, 4, 5)
val set: Set[String] = Set("a", "b", "c")
val map: Map[String, Int] = Map("one" -> 1, "two" -> 2)

// ✅ DO: Use functional operations
val doubled = numbers.map(_ * 2)
val evens = numbers.filter(_ % 2 == 0)
val sum = numbers.fold(0)(_ + _)
val grouped = numbers.groupBy(_ % 2)

// ✅ DO: Use for-comprehension
val result = for {
    n <- numbers
    if n > 2
    doubled = n * 2
} yield doubled

// ✅ DO: Use pattern matching
numbers.map {
    case 0 => "zero"
    case 1 => "one"
    case _ => "many"
}

// ✅ DO: Use Options and Either
def findUser(id: String): Option[User] = {
    // Find user
    None
}

def findUserWithError(id: String): Either[String, User] = {
    if (id.isEmpty) Left("ID cannot be empty")
    else Right(User(id, "John", "john@example.com"))
}
```

### 3.2 Streams & Lazy Evaluation
```scala
// ✅ DO: Use streams for infinite sequences
val naturals: LazyList[Int] = LazyList.from(1)
val firstTen = naturals.take(10).toList

// ✅ DO: Use view for lazy composition
val largeList = (1 to 1_000_000).toList
val result = largeList
    .view
    .filter(_ % 2 == 0)
    .map(_ * 2)
    .take(10)
    .force  // Convert back to strict collection
```

---

## 4. Classes & Case Classes

### 4.1 Case Classes
```scala
// ✅ DO: Use case classes for data
case class User(id: String, name: String, email: String)

// ✅ DO: Use copy method for immutable updates
val user = User("1", "John", "john@example.com")
val updatedUser = user.copy(name = "Jane")

// ✅ DO: Use pattern matching with case classes
user match {
    case User(id, name, "admin@example.com") => println(s"Admin: $name")
    case User(_, name, _) => println(s"User: $name")
}

// ✅ DO: Use Seq or List in patterns
user match {
    case User(id @ _, n1, e1) => println(s"ID: $id")
}
```

### 4.2 Regular Classes & Traits
```scala
// ✅ DO: Use traits for mixins
trait Loggable {
    def log(message: String): Unit = println(s"[LOG] $message")
}

trait Timestamped {
    val createdAt: Long = System.currentTimeMillis()
}

// ✅ DO: Mix traits into classes
class User(val id: String, val name: String) 
    extends Loggable 
    with Timestamped {
    
    def display(): Unit = log(s"User: $name")
}

// ✅ DO: Use sealed traits for ADTs (Algebraic Data Types)
sealed trait Shape
case class Circle(radius: Double) extends Shape
case class Rectangle(width: Double, height: Double) extends Shape

def area(shape: Shape): Double = shape match {
    case Circle(r) => Math.PI * r * r
    case Rectangle(w, h) => w * h
}
```

---

## 5. Functions & Higher-Order Functions

### 5.1 Function Definition
```scala
// ✅ DO: Use function types
val add: (Int, Int) => Int = (a, b) => a + b
val increment: Int => Int = _ + 1

// ✅ DO: Use higher-order functions
def apply[A, B](f: A => B, value: A): B = f(value)

// ✅ DO: Use default parameters
def greet(name: String, greeting: String = "Hello"): String = {
    s"$greeting, $name!"
}

// ✅ DO: Use currying
def multiply(a: Int)(b: Int): Int = a * b
val double = multiply(2)(_)

// ✅ DO: Use implicit parameters
implicit val defaultName: String = "Guest"

def greetUser(implicit name: String): String = {
    s"Hello, $name!"
}

// Usage:
greetUser  // Uses implicit value
greetUser(implicitly[String])  // Explicit
```

### 5.2 Anonymous Functions & Lambdas
```scala
// ✅ DO: Use concise lambda syntax
val numbers = List(1, 2, 3, 4, 5)
val doubled = numbers.map(_ * 2)
val filtered = numbers.filter(_ > 2)

// ✅ DO: Use block syntax for complex logic
val result = numbers.map { n =>
    if (n > 2) n * 2 else n
}

// ✅ DO: Use foreach for side effects
numbers.foreach(println(_))

// ✅ DO: Chain operations
numbers
    .filter(_ > 2)
    .map(_ * 2)
    .foreach(println(_))
```

---

## 6. Error Handling

### 6.1 Try-Catch & Custom Exceptions
```scala
// ✅ DO: Use Try for error handling
import scala.util.{Try, Success, Failure}

def parseInt(str: String): Try[Int] = Try(str.toInt)

parseInt("42") match {
    case Success(value) => println(s"Parsed: $value")
    case Failure(exception) => println(s"Error: ${exception.getMessage}")
}

// ✅ DO: Use Either for explicit error type
def validateEmail(email: String): Either[String, String] = {
    if (email.contains("@")) Right(email)
    else Left("Invalid email format")
}

// ✅ DO: Chain operations with flatMap
for {
    email <- validateEmail(userEmail)
    user <- findUserByEmail(email).toRight("User not found")
} yield user

// ✅ DO: Create custom exceptions
class UserException(message: String) extends Exception(message)
class UserNotFoundException(id: String) extends UserException(s"User not found: $id")

def getUser(id: String): Try[User] = {
    Try {
        if (id.isEmpty) throw new UserException("ID cannot be empty")
        User(id, "John", "john@example.com")
    }
}
```

---

## 7. Async Programming

### 7.1 Futures
```scala
// ✅ DO: Use Futures for async operations
import scala.concurrent.{Future, ExecutionContext}

implicit val ec: ExecutionContext = scala.concurrent.ExecutionContext.global

def fetchUser(id: String): Future[User] = Future {
    // Simulate network call
    Thread.sleep(1000)
    User(id, "John", "john@example.com")
}

// ✅ DO: Chain Futures
val userFuture = fetchUser("1")
    .map(user => user.copy(name = "Jane"))
    .flatMap(user => fetchUserProjects(user.id))

// ✅ DO: Handle Futures
userFuture.onComplete {
    case Success(projects) => println(s"Projects: ${projects.size}")
    case Failure(exception) => println(s"Error: ${exception.getMessage}")
}

// ✅ DO: Use for-comprehension with Futures
val result = for {
    user <- fetchUser("1")
    projects <- fetchUserProjects(user.id)
} yield (user, projects)
```

---

## 8. Testing

### 8.1 Unit Tests (ScalaTest/Specs2)
```scala
// ✅ DO: Write tests using ScalaTest
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

class UserServiceTests extends AnyFlatSpec with Matchers {
    
    val service = new UserService()
    
    "UserService" should "create a user successfully" in {
        val user = service.createUser("John", "john@example.com")
        
        user.name should equal("John")
        user.email should equal("john@example.com")
    }
    
    it should "throw on invalid email" in {
        a[UserException] should be thrownBy {
            service.createUser("John", "invalid-email")
        }
    }
}

// ✅ DO: Use property-based testing
import org.scalatest.prop.TableDrivenPropertyChecks

class PropertyTests extends AnyFlatSpec with Matchers with TableDrivenPropertyChecks {
    val examples = Table(
        ("input", "expected"),
        ("john@example.com", true),
        ("invalid", false),
        ("", false)
    )
    
    "Email validation" should "work for various inputs" in {
        forAll(examples) { (email, expected) =>
            isValidEmail(email) should equal(expected)
        }
    }
}
```

---

## 9. Common Patterns & Anti-Patterns

### ✅ DO's
- Use immutable collections
- Use functional operations (map, filter, fold)
- Use Option and Either/Try
- Use pattern matching
- Use case classes for data
- Use traits for mixins
- Write expressive code
- Use for-comprehensions

### ❌ DON'Ts
- Use mutable collections by default
- Use var unnecessarily
- Ignore type safety
- Use null (use Option instead)
- Create deeply nested code
- Use var for loops (use foreach)
- Ignore Scala idioms
- Create large case classes

---

## Resources

- [Scala Official Documentation](https://docs.scala-lang.org/)
- [Scala Book](https://docs.scala-lang.org/scala3/book/introduction.html)
- [Programming in Scala](https://www.oreilly.com/library/view/programming-in-scala/9780997148503/)
- [ScalaTest](https://www.scalatest.org/)
