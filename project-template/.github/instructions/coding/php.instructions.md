---
description: PHP programming language best practices, patterns, and conventions
applyTo: "**/*.php"
---

# PHP Best Practices & Development Guidelines

This document establishes coding standards and best practices for PHP development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across PHP projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create PHP project
composer create-project project-name

# Install dependencies
composer install

# Start development server
php -S localhost:8000

# Run tests
php vendor/bin/phpunit

# Lint code
php vendor/bin/phpcs

# Format code
php vendor/bin/phpcbf
```

### Version Requirements
- **PHP**: 8.1+ (8.3+ recommended)
- **Composer**: Latest version

### Project Structure
```
project-name/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   ├── Models/
│   ├── Services/
│   ├── Repositories/
│   └── Exceptions/
├── config/
│   └── app.php
├── routes/
│   └── web.php
├── tests/
│   ├── Unit/
│   └── Feature/
├── public/
│   └── index.php
├── vendor/
├── .env
├── composer.json
└── phpunit.xml
```

---

## 2. Code Style & Conventions

### 2.1 PSR-12 Coding Standards
```php
<?php

// ✅ DO: Follow PSR-12 style guide
namespace App\Services;

use Exception;

class UserService
{
    public function getUserById(string $id): ?User
    {
        return $this->repository->find($id);
    }

    public function createUser(string $name, string $email): User
    {
        return $this->repository->create([
            'name' => $name,
            'email' => $email,
        ]);
    }
}

// ✅ DO: Use 4-space indentation
// ✅ DO: Maximum line length of 120 characters
// ✅ DO: Opening brace on same line

// ❌ DON'T: Mix styles
class BadStyle{public function test(){}}
```

### 2.2 Naming Conventions
```php
<?php

namespace App\Services;

// ✅ DO: Use clear naming conventions
class UserService { }  // PascalCase for classes
interface UserRepositoryInterface { }  // Interface suffix Interface
trait LoggerTrait { }  // Trait suffix Trait

const MAX_RETRIES = 3;  // UPPER_SNAKE_CASE for constants
const DATABASE_URL = 'postgresql://localhost/db';

$userName = 'John';  // camelCase for variables
$users = [];

function getUserById(string $id): ?User { }  // camelCase for functions

// ❌ DON'T: Use unclear names
$u = 'John';  // Too short
function calc() { }  // Unclear purpose
```

### 2.3 Type Hints
```php
<?php

namespace App\Services;

// ✅ DO: Use comprehensive type hints (PHP 8.1+)
class UserService
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function getUserById(string $id): ?User
    {
        return $this->repository->find($id);
    }

    public function createUser(string $name, string $email): User
    {
        return new User($name, $email);
    }

    public function getUsersByIds(array $ids): array
    {
        return $this->repository->findByIds($ids);
    }

    /**
     * @param User[] $users
     */
    public function saveUsers(array $users): void
    {
        foreach ($users as $user) {
            $this->repository->save($user);
        }
    }
}

// ✅ DO: Use union types (PHP 8.0+)
public function process(string|int $id): bool { }

// ✅ DO: Use readonly properties (PHP 8.1+)
class User
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public string $email
    ) {}
}

// ❌ DON'T: Omit type hints
function getUserById($id) { }  // Missing types
```

---

## 3. Classes & Objects

### 3.1 Class Definition
```php
<?php

namespace App\Models;

final class User
{
    public function __construct(
        private string $id,
        private string $name,
        private string $email,
        private \DateTime $createdAt = new \DateTime()
    ) {}

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        if (empty($name)) {
            throw new \InvalidArgumentException('Name cannot be empty');
        }
        $this->name = $name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }
}

// ✅ DO: Use final class to prevent extending
// ✅ DO: Use private properties with typed getters
// ✅ DO: Use constructor property promotion (PHP 8.0+)
// ✅ DO: Validate in setters
```

### 3.2 Inheritance & Traits
```php
<?php

namespace App\Models;

// ✅ DO: Use traits for shared functionality
trait Timestampable
{
    private \DateTime $createdAt;
    private ?\DateTime $updatedAt = null;

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function setUpdatedAt(): void
    {
        $this->updatedAt = new \DateTime();
    }
}

// ✅ DO: Use abstract classes for base types
abstract class Entity
{
    use Timestampable;

    abstract public function validate(): bool;

    protected function log(string $message): void
    {
        error_log($message);
    }
}

class User extends Entity
{
    public function validate(): bool
    {
        return !empty($this->name) && filter_var($this->email, FILTER_VALIDATE_EMAIL);
    }
}
```

---

## 4. Functions & Methods

### 4.1 Function Definition
```php
<?php

namespace App\Services;

class UserService
{
    // ✅ DO: Use clear function signatures
    public function getUserById(string $id): ?User
    {
        return $this->repository->find($id);
    }

    // ✅ DO: Use default parameters
    public function getUsers(int $limit = 10, int $offset = 0): array
    {
        return $this->repository->findAll($limit, $offset);
    }

    // ✅ DO: Use named arguments (PHP 8.0+)
    $users = $service->getUsers(limit: 20, offset: 10);

    // ✅ DO: Use variadic parameters
    public function sendNotifications(User ...$users): void
    {
        foreach ($users as $user) {
            // Send notification
        }
    }

    // ✅ DO: Use match expression (PHP 8.0+)
    public function getStatusMessage(string $status): string
    {
        return match($status) {
            'active' => 'User is active',
            'inactive' => 'User is inactive',
            'banned' => 'User is banned',
            default => 'Unknown status'
        };
    }
}
```

---

## 5. Error Handling

### 5.1 Exceptions
```php
<?php

namespace App\Exceptions;

// ✅ DO: Create custom exceptions
class ValidationException extends \Exception
{
    public function __construct(
        public readonly string $field,
        string $message = 'Validation failed'
    ) {
        parent::__construct($message);
    }
}

class UserNotFoundException extends \Exception
{
    public function __construct(string $id)
    {
        parent::__construct("User with id {$id} not found");
    }
}

// ✅ DO: Use specific exceptions
namespace App\Services;

class UserService
{
    public function getUserById(string $id): User
    {
        if (empty($id)) {
            throw new ValidationException('id', 'User ID cannot be empty');
        }

        $user = $this->repository->find($id);
        if (!$user) {
            throw new UserNotFoundException($id);
        }

        return $user;
    }

    public function createUser(string $name, string $email): User
    {
        if (empty($name) || empty($email)) {
            throw new ValidationException('name|email', 'Name and email are required');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new ValidationException('email', 'Invalid email format');
        }

        return $this->repository->create([
            'name' => $name,
            'email' => $email,
        ]);
    }
}

// ✅ DO: Handle exceptions appropriately
try {
    $user = $service->getUserById($id);
} catch (ValidationException $e) {
    error_log("Validation error in {$e->field}: {$e->getMessage()}");
    // Handle validation error
} catch (UserNotFoundException $e) {
    error_log($e->getMessage());
    // Handle not found
} catch (\Exception $e) {
    error_log("Unexpected error: {$e->getMessage()}");
    // Handle unexpected error
}
```

---

## 6. Design Patterns

### 6.1 Dependency Injection
```php
<?php

namespace App\Services;

interface UserRepositoryInterface
{
    public function find(string $id): ?User;
    public function create(array $data): User;
}

// ✅ DO: Use constructor injection
class UserService
{
    public function __construct(
        private UserRepositoryInterface $repository,
        private LoggerInterface $logger
    ) {}

    public function getUserById(string $id): ?User
    {
        $this->logger->info("Fetching user with id: {$id}");
        return $this->repository->find($id);
    }
}

// ✅ DO: Use container for DI
class Container
{
    private array $services = [];

    public function register(string $name, callable $resolver): void
    {
        $this->services[$name] = $resolver;
    }

    public function get(string $name): mixed
    {
        return ($this->services[$name])($this);
    }
}
```

### 6.2 Repository Pattern
```php
<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function find(string $id): ?object;
    public function findAll(): array;
    public function create(array $data): object;
    public function update(string $id, array $data): void;
    public function delete(string $id): void;
}

class UserRepository implements RepositoryInterface
{
    public function __construct(private \PDO $connection) {}

    public function find(string $id): ?User
    {
        $stmt = $this->connection->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $data = $stmt->fetch(\PDO::FETCH_ASSOC);

        return $data ? new User(...$data) : null;
    }

    public function create(array $data): User
    {
        $stmt = $this->connection->prepare(
            'INSERT INTO users (name, email) VALUES (?, ?)'
        );
        $stmt->execute([$data['name'], $data['email']]);

        return new User($id, ...$data);
    }
}
```

---

## 7. Testing

### 7.1 Unit Tests (PHPUnit)
```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\UserService;
use App\Exceptions\ValidationException;

class UserServiceTest extends TestCase
{
    private UserService $service;

    protected function setUp(): void
    {
        $this->service = new UserService(
            $this->createMock(UserRepositoryInterface::class)
        );
    }

    public function testGetUserByIdSuccessfully(): void
    {
        $user = $this->service->getUserById('1');

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('John', $user->getName());
    }

    public function testThrowsExceptionOnInvalidId(): void
    {
        $this->expectException(ValidationException::class);

        $this->service->getUserById('');
    }
}
```

---

## 8. Common Patterns & Anti-Patterns

### ✅ DO's
- Use type hints extensively
- Use final classes by default
- Use constructor injection
- Handle exceptions explicitly
- Use traits for shared behavior
- Write tests for functions
- Use named arguments
- Use match expressions

### ❌ DON'Ts
- Omit type hints
- Use global variables
- Ignore error handling
- Create deeply nested classes
- Use `var_dump()` in production
- Create huge classes
- Ignore PHP deprecation warnings
- Use `eval()` or dynamic code execution

---

## Resources

- [PHP Official Documentation](https://www.php.net/docs.php)
- [PSR-12 Coding Standard](https://www.php-fig.org/psr/psr-12/)
- [PHP Best Practices](https://phpbestpractices.org/)
- [PHPUnit Testing Framework](https://phpunit.de/)
