---
description: Python programming language best practices, patterns, and conventions
applyTo: "**/*.py"
---

# Python Development Instructions

## Overview

This document provides systematic instructions for Python programming language best practices and conventions using the AI-first delivery methodology. These instructions follow established Python development patterns and transform Pythonic programming requirements into comprehensive coding standards that leverage Python's strengths, maintain readability, and ensure consistent implementation across Python projects.

## Process Overview

**Python Development Implementation** transforms Pythonic programming requirements into structured Python implementations that deliver readable code, effective use of Python idioms, comprehensive testing strategies, and maintainable applications through proper package structure, virtual environment management, and established patterns for scalable Python development.

## Implementation Process & Development Guidelines

This document establishes coding standards and best practices for Python development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across Python projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run application
python main.py

# Run tests
pytest

# Run linting
flake8 .
pylint .
black --check .
```

### Version Requirements
- **Python**: 3.10+ (3.11+ recommended)
- **pip**: Latest version
- **Virtual environment**: Always use venv or virtualenv

### Project Structure
```
project-name/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── user_service.py
│   ├── repositories/
│   │   ├── __init__.py
│   │   └── user_repository.py
│   ├── utils/
│   │   ├── __init__.py
│   │   └── validators.py
│   └── api/
│       ├── __init__.py
│       └── routes.py
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_services.py
│   └── test_api.py
├── requirements.txt
├── setup.py
├── pytest.ini
├── .flake8
└── pyproject.toml
```

---

## 2. Code Style & Conventions

### 2.1 Style Guide (PEP 8)
```python
# ✅ DO: Follow PEP 8 naming conventions
class UserService:  # PascalCase for classes
    def get_user_by_id(self, user_id: int) -> User:  # snake_case for functions
        user_constants = []  # snake_case for variables
        MAX_RETRIES = 3  # UPPER_SNAKE_CASE for constants
        return user_constants

# ❌ DON'T: Violate PEP 8
class userService:  # Not PascalCase
    def getUserById(self, userId):  # Not snake_case
        User_Constants = []  # Mixed casing
```

### 2.2 Imports
```python
# ✅ DO: Organize imports properly (standard library, third-party, local)
import os
import sys
from typing import List, Optional, Dict

import requests
import numpy as np

from src.models import User
from src.services import AuthService

# ✅ DO: Use absolute imports
from src.services.auth import AuthService

# ❌ DON'T: Use relative imports in modules
from .services.auth import AuthService  # Avoid deep relative paths

# ✅ DO: Import specific items
from typing import List, Optional

# ❌ DON'T: Use wildcard imports
from src.models import *
```

### 2.3 Type Hints
```python
# ✅ DO: Use type hints for clarity
def process_user(user_id: int, name: str) -> dict:
    """Process user data."""
    return {"id": user_id, "name": name}

# ✅ DO: Use Optional for nullable values
def find_user(user_id: int) -> Optional[User]:
    """Find user by ID or return None."""
    return None

# ✅ DO: Use Union for multiple types
from typing import Union

def parse_value(value: Union[int, str, float]) -> float:
    """Parse numeric value."""
    return float(value)

# ✅ DO: Use complex type hints
def process_users(users: List[Dict[str, str]]) -> Dict[int, User]:
    """Process list of user dictionaries."""
    return {}

# ❌ DON'T: Omit type hints entirely
def process_user(user_id, name):
    return {"id": user_id, "name": name}
```

---

## 3. Classes & Objects

### 3.1 Class Definition
```python
# ✅ DO: Use type hints and docstrings
class User:
    """Represents a user in the system."""

    def __init__(self, user_id: int, name: str, email: str) -> None:
        """Initialize user."""
        self.user_id = user_id
        self.name = name
        self.email = email

    def __str__(self) -> str:
        """Return string representation."""
        return f"User(id={self.user_id}, name={self.name})"

    def __repr__(self) -> str:
        """Return detailed representation."""
        return f"User(user_id={self.user_id!r}, name={self.name!r}, email={self.email!r})"

# ✅ DO: Use properties for controlled access
class Account:
    def __init__(self, balance: float) -> None:
        self._balance = balance

    @property
    def balance(self) -> float:
        """Get current balance."""
        return self._balance

    @balance.setter
    def balance(self, value: float) -> None:
        """Set balance with validation."""
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = value
```

### 3.2 Inheritance
```python
# ✅ DO: Use inheritance and follow Liskov Substitution Principle
class Animal:
    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return "Meow!"

# ✅ DO: Use dataclasses for simple data containers
from dataclasses import dataclass

@dataclass
class UserData:
    """User data container."""
    user_id: int
    name: str
    email: str
```

---

## 4. Functions & Methods

### 4.1 Function Definition
```python
# ✅ DO: Use descriptive names and docstrings
def calculate_user_score(user_id: int, activities: List[str]) -> float:
    """
    Calculate user score based on activities.

    Args:
        user_id: Unique identifier for the user
        activities: List of activity names

    Returns:
        float: Calculated score (0.0 to 100.0)

    Raises:
        ValueError: If user_id is negative
    """
    if user_id < 0:
        raise ValueError(f"user_id must be positive, got {user_id}")
    
    score = len(activities) * 10.0
    return min(score, 100.0)

# ✅ DO: Use default arguments
def connect_database(host: str = "localhost", port: int = 5432) -> Connection:
    """Connect to database."""
    return Connection(host, port)

# ✅ DO: Use *args and **kwargs correctly
def log_message(level: str, *args: str, **kwargs: str) -> None:
    """Log message with metadata."""
    message = " ".join(args)
    print(f"[{level}] {message}", kwargs)
```

### 4.2 Lambda Functions
```python
# ✅ DO: Use lambda for small, simple operations
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))

# ✅ DO: Use lambda with sorted
users = [User(1, "Alice"), User(2, "Bob")]
sorted_users = sorted(users, key=lambda u: u.name)

# ❌ DON'T: Use lambda for complex logic (define function instead)
complex_lambda = lambda x: x * 2 if x > 10 else x / 2 if x < 5 else x  # Too complex
```

---

## 5. Exception Handling

### 5.1 Custom Exceptions
```python
# ✅ DO: Define custom exceptions for your domain
class ValidationError(Exception):
    """Raised when validation fails."""
    pass

class UserNotFoundError(Exception):
    """Raised when user is not found."""
    pass

class DatabaseError(Exception):
    """Raised when database operation fails."""
    pass

# ✅ DO: Provide helpful error messages
def get_user(user_id: int) -> User:
    """Get user by ID."""
    user = database.query(User).filter_by(id=user_id).first()
    if not user:
        raise UserNotFoundError(f"User with id={user_id} not found")
    return user
```

### 5.2 Exception Handling
```python
# ✅ DO: Be specific with exception types
try:
    user = get_user(user_id)
    process_user(user)
except UserNotFoundError as e:
    logger.error(f"User lookup failed: {e}")
except DatabaseError as e:
    logger.error(f"Database error: {e}")
except Exception as e:
    logger.error(f"Unexpected error: {e}")

# ✅ DO: Use context managers for resource cleanup
from contextlib import contextmanager

@contextmanager
def database_connection(connection_string: str):
    """Context manager for database connections."""
    conn = connect(connection_string)
    try:
        yield conn
    finally:
        conn.close()

# Usage:
with database_connection("postgresql://localhost/db") as conn:
    result = conn.query("SELECT * FROM users")

# ❌ DON'T: Use bare except
try:
    risky_operation()
except:  # ❌ Too broad, catches KeyboardInterrupt, SystemExit, etc.
    pass
```

---

## 6. Async Programming

### 6.1 Async/Await
```python
# ✅ DO: Use async/await for concurrent operations
import asyncio

async def fetch_user(user_id: int) -> User:
    """Fetch user asynchronously."""
    await asyncio.sleep(1)  # Simulate I/O
    return User(user_id, "John", "john@example.com")

async def get_multiple_users(user_ids: List[int]) -> List[User]:
    """Fetch multiple users concurrently."""
    tasks = [fetch_user(user_id) for user_id in user_ids]
    return await asyncio.gather(*tasks)

# ✅ DO: Use async context managers
class AsyncDatabaseConnection:
    async def __aenter__(self):
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.disconnect()

async def main():
    async with AsyncDatabaseConnection() as db:
        users = await db.fetch_users()
```

---

## 7. Testing

### 7.1 Unit Tests (pytest)
```python
# ✅ DO: Write clear test functions
import pytest

def test_user_creation():
    """Test user creation."""
    user = User(1, "Alice", "alice@example.com")
    assert user.user_id == 1
    assert user.name == "Alice"

def test_user_invalid_id():
    """Test user with invalid ID."""
    with pytest.raises(ValueError):
        User(-1, "Alice", "alice@example.com")

# ✅ DO: Use fixtures for setup
@pytest.fixture
def sample_user() -> User:
    """Provide sample user for tests."""
    return User(1, "Test User", "test@example.com")

def test_user_with_fixture(sample_user):
    """Test using fixture."""
    assert sample_user.name == "Test User"

# ✅ DO: Parametrize tests
@pytest.mark.parametrize("user_id,expected", [
    (1, 1),
    (10, 10),
    (100, 100),
])
def test_user_id_values(user_id, expected):
    """Test various user ID values."""
    user = User(user_id, "Test", "test@example.com")
    assert user.user_id == expected
```

### 7.2 Mocking
```python
# ✅ DO: Mock external dependencies
from unittest.mock import Mock, patch

def test_user_service_with_mock():
    """Test service with mocked repository."""
    mock_repo = Mock()
    mock_repo.get_user.return_value = User(1, "Mocked", "mock@example.com")
    
    service = UserService(mock_repo)
    user = service.get_user(1)
    
    assert user.name == "Mocked"
    mock_repo.get_user.assert_called_once_with(1)

# ✅ DO: Use patch for external services
@patch('src.services.external_api.get_data')
def test_with_patched_api(mock_api):
    """Test with patched external API."""
    mock_api.return_value = {"status": "success"}
    result = my_function()
    assert result == {"status": "success"}
```

---

## 8. Code Organization

### 8.1 Modules and Packages
```python
# ✅ DO: Organize code into logical modules
# src/models/__init__.py
from .user import User
from .account import Account

__all__ = ["User", "Account"]

# src/services/__init__.py
from .auth_service import AuthService
from .user_service import UserService

__all__ = ["AuthService", "UserService"]
```

### 8.2 Constants
```python
# ✅ DO: Define constants at module level
# config.py
MAX_LOGIN_ATTEMPTS = 5
DEFAULT_TIMEOUT = 30
DATABASE_URL = "postgresql://localhost/db"

# services/auth.py
from config import MAX_LOGIN_ATTEMPTS

def check_login_attempts(attempts: int) -> bool:
    return attempts < MAX_LOGIN_ATTEMPTS
```

---

## 9. Performance

### 9.1 Comprehensions
```python
# ✅ DO: Use comprehensions for conciseness
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]  # List comprehension
evens = {x for x in numbers if x % 2 == 0}  # Set comprehension
pairs = {x: x**2 for x in numbers}  # Dict comprehension

# ✅ DO: Use generators for large datasets
def large_number_generator():
    """Generate large numbers efficiently."""
    for i in range(1_000_000):
        yield i

sum_of_numbers = sum(x for x in large_number_generator())
```

### 9.2 Caching
```python
# ✅ DO: Use functools.lru_cache for expensive computations
from functools import lru_cache

@lru_cache(maxsize=128)
def calculate_fibonacci(n: int) -> int:
    """Calculate fibonacci with caching."""
    if n < 2:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

# ✅ DO: Use memoization for repeated calls
class UserService:
    def __init__(self):
        self._cache = {}

    def get_user(self, user_id: int) -> Optional[User]:
        """Get user with caching."""
        if user_id not in self._cache:
            self._cache[user_id] = self._fetch_user(user_id)
        return self._cache[user_id]
```

---

## 10. Common Patterns & Anti-Patterns

### ✅ DO's
- Use type hints consistently
- Write comprehensive docstrings
- Handle exceptions specifically
- Use context managers for resources
- Write unit tests for all functions
- Follow PEP 8 style guide
- Use virtual environments
- Keep functions small and focused

### ❌ DON'Ts
- Use bare except clauses
- Modify mutable default arguments
- Use mutable objects in function signatures
- Ignore type hints
- Create deeply nested structures
- Use global variables extensively
- Block the event loop with sync operations (in async code)

---

## Resources

- [PEP 8 Style Guide](https://www.python.org/dev/peps/pep-0008/)
- [Python Type Hints](https://www.python.org/dev/peps/pep-0484/)
- [Real Python Tutorials](https://realpython.com/)
- [Pytest Documentation](https://docs.pytest.org/)
