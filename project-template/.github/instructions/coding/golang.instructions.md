---
description: Go (Golang) programming language best practices, patterns, and conventions
applyTo: "**/*.go"
---

# Go Development Instructions

## Overview

This document provides systematic instructions for Go (Golang) programming language best practices and conventions using the AI-first delivery methodology. These instructions follow established Go development patterns and transform concurrent programming requirements into comprehensive coding standards that leverage Go's strengths in performance, simplicity, and concurrency for scalable applications.

## Process Overview

**Go Development Implementation** transforms concurrent programming requirements into structured Go implementations that deliver high-performance applications, effective goroutine usage, comprehensive error handling, and maintainable codebases through proper package organization, Go idioms, and established patterns for scalable concurrent systems.

## Implementation Process

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Initialize new Go module
go mod init github.com/user/project-name

# Build application
go build -o app

# Run application
go run main.go

# Run tests
go test ./...

# Format code
go fmt ./...

# Lint code
golangci-lint run

# Get dependencies
go get -u ./...
```

### Version Requirements
- **Go**: 1.21+ (1.22+ recommended)
- **Module-based dependencies**: Required

### Project Structure
```
project-name/
├── main.go
├── cmd/
│   └── app/
│       └── main.go
├── internal/
│   ├── app/
│   ├── models/
│   ├── services/
│   ├── handlers/
│   └── middleware/
├── pkg/
│   ├── utils/
│   └── config/
├── tests/
│   └── integration_test.go
├── go.mod
├── go.sum
└── Makefile
```

---

## 2. Code Style & Conventions

### 2.1 Naming Conventions
```go
// ✅ DO: Use clear, concise names
func GetUser(id string) (*User, error) { }  // PascalCase for exported
func getUserFromDatabase(id string) *User { }  // camelCase for unexported

// ✅ DO: Use meaningful variable names
func ProcessData(data []byte) error {
    var userCount int
    var totalScore float64
    
    return nil
}

// ❌ DON'T: Use single letter variables (outside loops)
func ProcessData(d []byte) error {  // 'd' is unclear
    var u int  // unclear
    return nil
}

// ✅ DO: Use uppercase for exported identifiers
package models

type User struct {
    ID    string
    Email string
}

const MaxRetries = 3

// ✅ DO: Use lowercase for unexported identifiers
package models

type user struct {
    internalId string
}

func (u *user) validate() error { }
```

### 2.2 Imports Organization
```go
// ✅ DO: Group imports properly
import (
    "encoding/json"  // Standard library
    "fmt"
    "io"

    "github.com/gorilla/mux"  // Third-party
    "github.com/sirupsen/logrus"

    "github.com/mycompany/myproject/internal/models"  // Local packages
    "github.com/mycompany/myproject/pkg/config"
)

// ❌ DON'T: Use unorganized imports
import (
    "github.com/gorilla/mux"
    "fmt"
    "github.com/mycompany/myproject/internal/models"
)
```

### 2.3 Code Formatting
```go
// ✅ DO: Follow gofmt rules (use 'go fmt' automatically)
// Proper indentation and spacing
type Config struct {
    Host string
    Port int
    SSL  bool
}

// ✅ DO: Use meaningful receiver names (typically single letter or abbreviation)
func (u *User) Validate() error {
    return nil
}

func (s *Service) Process() error {
    return nil
}
```

---

## 3. Error Handling

### 3.1 Error Returns
```go
// ✅ DO: Return errors as the last return value
func GetUser(id string) (*User, error) {
    if id == "" {
        return nil, errors.New("user id cannot be empty")
    }
    return &User{ID: id}, nil
}

// ✅ DO: Use custom error types for specific errors
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error in %s: %s", e.Field, e.Message)
}

// ✅ DO: Wrap errors with context
import "fmt"

func ProcessFile(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("failed to read file %s: %w", path, err)
    }
    return nil
}

// ❌ DON'T: Ignore errors
data, _ := os.ReadFile(path)  // ❌ Ignoring error

// ❌ DON'T: Use panic for normal errors
func GetUser(id string) *User {
    if id == "" {
        panic("invalid user id")  // ❌ Wrong
    }
    return nil
}
```

### 3.2 Graceful Error Handling
```go
// ✅ DO: Handle errors gracefully
func main() {
    if err := run(); err != nil {
        fmt.Fprintf(os.Stderr, "Error: %v\n", err)
        os.Exit(1)
    }
}

func run() error {
    config, err := loadConfig()
    if err != nil {
        return fmt.Errorf("failed to load config: %w", err)
    }

    app, err := setupApp(config)
    if err != nil {
        return fmt.Errorf("failed to setup app: %w", err)
    }

    return app.Run()
}

// ✅ DO: Use errors.Is and errors.As for error checking
import "errors"

if errors.Is(err, os.ErrNotExist) {
    // Handle file not found
}

var syntaxErr *json.SyntaxError
if errors.As(err, &syntaxErr) {
    // Handle JSON syntax error
}
```

---

## 4. Structs & Methods

### 4.1 Struct Definition
```go
// ✅ DO: Use struct embedding for composition
type User struct {
    ID        string `json:"id"`
    Email     string `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

// ✅ DO: Use value receivers for small types, pointer receivers for large
type Point struct {
    X, Y int
}

func (p Point) Distance() float64 {  // Value receiver (small struct)
    return math.Sqrt(float64(p.X*p.X + p.Y*p.Y))
}

type LargeData struct {
    Data [1000]byte
}

func (d *LargeData) Process() {  // Pointer receiver (large struct)
    // Process large data
}

// ✅ DO: Use struct tags for serialization
type User struct {
    ID       string `json:"id" db:"user_id" msg:"id"`
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"-" db:"password"`  // Exclude from JSON
}
```

### 4.2 Constructor Pattern
```go
// ✅ DO: Use constructor functions for initialization
type DatabaseConnection struct {
    host     string
    port     int
    username string
    password string
    timeout  time.Duration
}

func NewDatabaseConnection(host string, port int, opts ...Option) (*DatabaseConnection, error) {
    conn := &DatabaseConnection{
        host: host,
        port: port,
    }

    for _, opt := range opts {
        opt(conn)
    }

    return conn, nil
}

// ✅ DO: Use functional options pattern
type Option func(*DatabaseConnection)

func WithTimeout(d time.Duration) Option {
    return func(c *DatabaseConnection) {
        c.timeout = d
    }
}

// Usage:
conn, err := NewDatabaseConnection("localhost", 5432, WithTimeout(30*time.Second))
```

---

## 5. Interfaces & Polymorphism

### 5.1 Interface Design
```go
// ✅ DO: Define small, focused interfaces
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type ReadWriter interface {
    Reader
    Writer
}

// ✅ DO: Accept interfaces, return concrete types
func ProcessData(r Reader) ([]byte, error) {
    return io.ReadAll(r)
}

// ✅ DO: Use type assertions for type checking
func handleInterface(i interface{}) {
    switch v := i.(type) {
    case string:
        fmt.Printf("String: %s\n", v)
    case int:
        fmt.Printf("Integer: %d\n", v)
    case error:
        fmt.Printf("Error: %v\n", v)
    }
}

// ❌ DON'T: Create large interfaces
type BadInterface interface {  // ❌ Too large
    Read()
    Write()
    Close()
    Connect()
    Disconnect()
    Process()
}
```

---

## 6. Concurrency

### 6.1 Goroutines & Channels
```go
// ✅ DO: Use goroutines for concurrent operations
go func() {
    result, err := fetchData()
    if err != nil {
        log.Printf("Error: %v", err)
    }
}()

// ✅ DO: Use channels for communication
func fetchUsersConcurrently(ids []string) []User {
    results := make(chan User, len(ids))
    
    for _, id := range ids {
        go func(id string) {
            user, _ := fetchUser(id)
            results <- user
        }(id)
    }
    
    users := make([]User, 0, len(ids))
    for i := 0; i < len(ids); i++ {
        users = append(users, <-results)
    }
    
    return users
}

// ✅ DO: Use context for cancellation
func fetchWithContext(ctx context.Context, id string) (*User, error) {
    result := make(chan *User, 1)
    errs := make(chan error, 1)
    
    go func() {
        user, err := fetchUser(id)
        if err != nil {
            errs <- err
        } else {
            result <- user
        }
    }()
    
    select {
    case user := <-result:
        return user, nil
    case err := <-errs:
        return nil, err
    case <-ctx.Done():
        return nil, ctx.Err()
    }
}

// ✅ DO: Use sync.WaitGroup for coordination
func processFilesInParallel(files []string) error {
    var wg sync.WaitGroup
    errs := make(chan error, len(files))
    
    for _, file := range files {
        wg.Add(1)
        go func(f string) {
            defer wg.Done()
            if err := processFile(f); err != nil {
                errs <- err
            }
        }(file)
    }
    
    wg.Wait()
    close(errs)
    
    for err := range errs {
        if err != nil {
            return err
        }
    }
    return nil
}
```

---

## 7. Testing

### 7.1 Unit Tests
```go
// ✅ DO: Write clear test functions
package main

import "testing"

func TestGetUser(t *testing.T) {
    user, err := GetUser("123")
    
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
    
    if user.ID != "123" {
        t.Errorf("expected ID '123', got '%s'", user.ID)
    }
}

// ✅ DO: Use table-driven tests
func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        wantErr bool
    }{
        {"valid email", "test@example.com", false},
        {"invalid email", "not-an-email", true},
        {"empty email", "", true},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := ValidateEmail(tt.email)
            if (err != nil) != tt.wantErr {
                t.Errorf("ValidateEmail() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}

// ✅ DO: Use test helpers
func TestVeryComplexFunction(t *testing.T) {
    t.Helper()
    
    setup := setupTestEnvironment()
    defer setup.tearDown()
    
    // Test logic
}
```

### 7.2 Benchmarks
```go
// ✅ DO: Write benchmarks for performance-critical code
func BenchmarkProcessData(b *testing.B) {
    data := generateTestData(1000)
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        ProcessData(data)
    }
}
```

---

## 8. Database & ORM

### 8.1 Database Access
```go
// ✅ DO: Use database/sql with prepared statements
import "database/sql"

func getUser(db *sql.DB, id string) (*User, error) {
    var user User
    
    err := db.QueryRowContext(
        context.Background(),
        "SELECT id, email FROM users WHERE id = $1",
        id,
    ).Scan(&user.ID, &user.Email)
    
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, fmt.Errorf("user not found")
        }
        return nil, err
    }
    
    return &user, nil
}

// ✅ DO: Use connection pooling
type Database struct {
    db *sql.DB
}

func NewDatabase(dsn string) (*Database, error) {
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, err
    }
    
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)
    
    if err := db.Ping(); err != nil {
        return nil, err
    }
    
    return &Database{db: db}, nil
}
```

---

## 9. Common Patterns & Anti-Patterns

### ✅ DO's
- Handle errors explicitly
- Use interfaces for abstraction
- Write small, focused functions
- Use goroutines for I/O-bound operations
- Test with table-driven tests
- Use context for cancellation
- Keep packages focused and cohesive
- Use meaningful variable names

### ❌ DON'Ts
- Ignore errors with `_`
- Use `panic` for normal errors
- Create large interfaces
- Block the main goroutine unnecessarily
- Use unbuffered channels without careful consideration
- Modify shared data without synchronization
- Return generic `interface{}`
- Use global variables extensively

---

## Resources

- [Effective Go](https://golang.org/doc/effective_go)
- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- [Go Testing Guide](https://golang.org/pkg/testing/)
