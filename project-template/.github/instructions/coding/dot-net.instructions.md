---
description: .NET Framework and C# best practices, patterns, and conventions for backend API development
applyTo: backend/**/*.cs
---

# .NET Framework & C# Best Practices

## STATUS: ALWAYS APPLY

These conventions must be enforced in every .NET/C# file without exception.

## Core Principles

1. **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
2. **Clean Code**: Self-documenting, testable, maintainable, performant
3. **Security First**: Validate inputs, hash sensitive data, use parameterized queries, follow OWASP guidelines
4. **Fail-Fast**: Validate early, throw appropriate exceptions, log failures clearly
5. **Async-First**: Use async/await for I/O-bound operations, never `Task.Result` or `Wait()`

---

## C# Naming Conventions

### Classes & Structs
```csharp
// ✅ DO: Use PascalCase
public class UserService { }
public struct AuthenticationToken { }

// ❌ DON'T: Use camelCase or snake_case
public class userService { }
public class user_service { }
```

### Interfaces
```csharp
// ✅ DO: Start with 'I', use PascalCase
public interface IAuthenticationService { }
public interface IUserRepository { }

// ❌ DON'T: Omit 'I' or use other prefixes
public interface AuthenticationService { }
public interface AuthServiceInterface { }
```

### Methods
```csharp
// ✅ DO: Use PascalCase for public methods
public async Task<User> GetUserByIdAsync(int userId) { }
public bool ValidatePassword(string password) { }

// ❌ DON'T: Use camelCase for public methods
public async Task<User> getUserByIdAsync(int userId) { }
```

### Properties & Fields
```csharp
// ✅ DO: Use PascalCase for public properties
public string Email { get; set; }
public int UserId { get; private set; }

// ✅ DO: Use camelCase with underscore for private fields
private string _hashedPassword;
private int _loginAttempts;

// ❌ DON'T: Mix conventions
public string email { get; set; }
private string Password;
```

### Constants
```csharp
// ✅ DO: Use UPPER_SNAKE_CASE or PascalCase
public const int MAX_LOGIN_ATTEMPTS = 5;
public const string JwtSecretKey = "secret-key";

// ❌ DON'T: Use lowercase or inconsistent casing
public const int maxLoginAttempts = 5;
```

### Local Variables
```csharp
// ✅ DO: Use camelCase
public void ProcessUser()
{
    var userId = 123;
    string firstName = "John";
    int loginAttempts = 0;
}
```

---

## Async/Await Patterns

### ✅ DO: Use async/await consistently
```csharp
public class UserService
{
    private readonly IUserRepository _userRepository;
    
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    // ✅ DO: Async methods end with "Async"
    public async Task<User> GetUserAsync(int userId)
    {
        return await _userRepository.GetByIdAsync(userId);
    }
    
    // ✅ DO: ConfigureAwait(false) in library code
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync().ConfigureAwait(false);
    }
}
```

### ❌ DON'T: Block on async operations
```csharp
// ❌ NEVER: Task.Result or Task.Wait() (causes deadlocks)
var user = _userService.GetUserAsync(userId).Result;
var users = _userService.GetAllUsersAsync().Wait();

// ❌ NEVER: async void (except event handlers)
public async void ProcessUserRegistration() { } // WRONG!
```

---

## Dependency Injection & Configuration

### ✅ DO: Use constructor injection exclusively
```csharp
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authService;
    private readonly ILogger<AuthenticationController> _logger;
    
    // ✅ DO: Inject dependencies via constructor
    public AuthenticationController(
        IAuthenticationService authService,
        ILogger<AuthenticationController> logger)
    {
        _authService = authService;
        _logger = logger;
    }
}
```

### ✅ DO: Configure DI in Program.cs (minimal hosting)
```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();

// Configure logging
builder.Services.AddLogging(config =>
{
    config.AddConsole();
    config.AddDebug();
});

var app = builder.Build();
app.Run();
```

### ❌ DON'T: Use static classes for service locators
```csharp
// ❌ NEVER: Service locator pattern
public static class ServiceLocator
{
    public static IUserService UserService { get; set; }
}

// Usage:
var user = ServiceLocator.UserService.GetUser(id); // ANTI-PATTERN
```

---

## Entity Framework Core

### ✅ DO: Use DbContext properly
```csharp
public class MerchantContext : DbContext
{
    public MerchantContext(DbContextOptions<MerchantContext> options) 
        : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<DebitNote> DebitNotes { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Fluent API configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.Property(e => e.Tier).IsRequired().HasConversion<string>();
            
            // Index for query performance
            entity.HasIndex(e => e.Email).IsUnique();
        });
        
        // Relationships
        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId);
        });
    }
}
```

### ✅ DO: Use migrations properly
```bash
# Create migration
dotnet ef migrations add AddUserTierField

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

### ✅ DO: Query efficiently
```csharp
// ✅ DO: Use async queries with AsNoTracking when appropriate
public async Task<User> GetUserByIdAsync(int userId)
{
    return await _context.Users
        .AsNoTracking() // For read-only queries
        .FirstOrDefaultAsync(u => u.Id == userId);
}

// ✅ DO: Project to DTO to avoid loading unnecessary data
public async Task<UserDto> GetUserDtoAsync(int userId)
{
    return await _context.Users
        .Where(u => u.Id == userId)
        .Select(u => new UserDto
        {
            Id = u.Id,
            Email = u.Email,
            Tier = u.Tier
        })
        .FirstOrDefaultAsync();
}

// ✅ DO: Use Include for related entities when needed
public async Task<User> GetUserWithSubscriptionsAsync(int userId)
{
    return await _context.Users
        .Include(u => u.Subscriptions)
        .FirstOrDefaultAsync(u => u.Id == userId);
}
```

### ❌ DON'T: Use lazy loading with navigation properties
```csharp
// ❌ NEVER: Trust lazy loading (can cause N+1 queries)
var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
var subscriptions = user.Subscriptions; // May not be loaded!

// ✅ DO: Eagerly load or explicitly load
var user = await _context.Users
    .Include(u => u.Subscriptions)
    .FirstOrDefaultAsync(u => u.Id == userId);
```

---

## Exception Handling

### ✅ DO: Create custom exception types
```csharp
// Custom exceptions for specific business scenarios
public class AuthenticationException : Exception
{
    public AuthenticationException(string message) : base(message) { }
}

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
    public string PropertyName { get; set; }
}

public class ConflictException : Exception
{
    public ConflictException(string message) : base(message) { }
}

public class ResourceNotFoundException : Exception
{
    public ResourceNotFoundException(string message) : base(message) { }
}
```

### ✅ DO: Throw specific exceptions with clear messages
```csharp
public class AuthenticationService : IAuthenticationService
{
    public async Task<User> RegisterUserAsync(string email, string password)
    {
        // Validate input early
        if (string.IsNullOrWhiteSpace(email))
            throw new ValidationException("Email is required") 
            { 
                PropertyName = nameof(email) 
            };
        
        if (string.IsNullOrWhiteSpace(password))
            throw new ValidationException("Password is required")
            { 
                PropertyName = nameof(password) 
            };
        
        // Validate format
        if (!IsValidEmail(email))
            throw new ValidationException("Email format is invalid");
        
        if (password.Length < 8)
            throw new ValidationException("Password must be at least 8 characters");
        
        // Check for existing user
        var existingUser = await _userRepository.GetByEmailAsync(email);
        if (existingUser != null)
            throw new ConflictException($"User with email '{email}' already exists");
        
        // Hash password (never store plaintext)
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(password, 12);
        
        // Create user with default tier
        var user = new User
        {
            Email = email,
            PasswordHash = passwordHash,
            Tier = UserTier.Free,
            CreatedAt = DateTime.UtcNow
        };
        
        return await _userRepository.CreateAsync(user);
    }
}
```

### ✅ DO: Handle exceptions contextually in controllers
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authService;
    private readonly ILogger<AuthenticationController> _logger;
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        try
        {
            var user = await _authService.RegisterUserAsync(
                request.Email, 
                request.Password);
            
            return CreatedAtAction(
                nameof(GetUser), 
                new { userId = user.Id }, 
                new { user.Id, user.Email });
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning($"Validation failed: {ex.Message}");
            return BadRequest(new 
            { 
                error = "Validation failed",
                message = ex.Message,
                property = ex.PropertyName 
            });
        }
        catch (ConflictException ex)
        {
            _logger.LogWarning($"Conflict: {ex.Message}");
            return Conflict(new 
            { 
                error = "User already exists",
                message = ex.Message 
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during registration");
            return StatusCode(500, new 
            { 
                error = "Internal server error" 
            });
        }
    }
}
```

---

## Security Best Practices

### ✅ DO: Hash passwords with appropriate cost factor
```csharp
public class PasswordHashingService : IPasswordHashingService
{
    // Use BCrypt with cost factor 12 (more secure than lower values)
    private const int BCRYPT_COST = 12;
    
    public string HashPassword(string plainPassword)
    {
        if (string.IsNullOrWhiteSpace(plainPassword))
            throw new ArgumentException("Password cannot be empty");
        
        return BCrypt.Net.BCrypt.HashPassword(plainPassword, BCRYPT_COST);
    }
    
    public bool VerifyPassword(string plainPassword, string hash)
    {
        if (string.IsNullOrWhiteSpace(plainPassword) || 
            string.IsNullOrWhiteSpace(hash))
            return false;
        
        return BCrypt.Net.BCrypt.Verify(plainPassword, hash);
    }
}
```

### ✅ DO: Use parameterized queries (EF Core does this automatically)
```csharp
// ✅ SAFE: EF Core parameterizes automatically
var user = await _context.Users
    .FirstOrDefaultAsync(u => u.Email == userInput); // Parameterized

// ✅ SAFE: Using LINQ prevents SQL injection
var users = await _context.Users
    .Where(u => u.Email == userInput)
    .ToListAsync();
```

### ✅ DO: Validate all inputs
```csharp
public class InputValidator
{
    public static void ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ValidationException("Email is required");
        
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            if (addr.Address != email)
                throw new ValidationException("Email format is invalid");
        }
        catch (FormatException)
        {
            throw new ValidationException("Email format is invalid");
        }
    }
    
    public static void ValidatePassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            throw new ValidationException("Password is required");
        
        if (password.Length < 8)
            throw new ValidationException("Password must be at least 8 characters");
        
        if (!password.Any(char.IsUpper))
            throw new ValidationException("Password must contain at least one uppercase letter");
        
        if (!password.Any(char.IsDigit))
            throw new ValidationException("Password must contain at least one digit");
    }
}
```

### ❌ DON'T: Store sensitive data in logs
```csharp
// ❌ NEVER: Log passwords or tokens
_logger.LogInformation($"User {email} logged in with password {password}"); // WRONG!

// ✅ DO: Log only necessary info
_logger.LogInformation($"User {email} logged in successfully");
```

---

## API Design Standards

### ✅ DO: Follow RESTful conventions
```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    // GET api/users/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _userService.GetUserAsync(id);
        if (user == null)
            return NotFound();
        
        return Ok(user);
    }
    
    // POST api/users
    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserRequest request)
    {
        var user = await _userService.CreateUserAsync(request);
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }
    
    // PUT api/users/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UpdateUserRequest request)
    {
        var success = await _userService.UpdateUserAsync(id, request);
        if (!success)
            return NotFound();
        
        return NoContent();
    }
    
    // DELETE api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var success = await _userService.DeleteUserAsync(id);
        if (!success)
            return NotFound();
        
        return NoContent();
    }
}
```

### ✅ DO: Use DTOs (Data Transfer Objects)
```csharp
// Request DTO
public class CreateUserRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}

// Response DTO
public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Tier { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Never expose Entity directly
// ✅ DO: Map Entity to DTO before returning
public async Task<UserDto> GetUserAsync(int userId)
{
    var user = await _userRepository.GetByIdAsync(userId);
    return new UserDto
    {
        Id = user.Id,
        Email = user.Email,
        Tier = user.Tier.ToString(),
        CreatedAt = user.CreatedAt
    };
}
```

---

## **🚨 CRITICAL: User.Tier and Subscription.Tier Synchronization**

### Problem
The User entity has a `Tier` property, and the Subscription entity also has a `Tier` property. **They MUST stay in sync** or the system will have inconsistent state.

### ✅ DO: Synchronize both tiers in the service layer
```csharp
public class SubscriptionService : ISubscriptionService
{
    private readonly ISubscriptionRepository _subscriptionRepository;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<SubscriptionService> _logger;
    
    public SubscriptionService(
        ISubscriptionRepository subscriptionRepository,
        IUserRepository userRepository,
        ILogger<SubscriptionService> logger)
    {
        _subscriptionRepository = subscriptionRepository;
        _userRepository = userRepository;
        _logger = logger;
    }
    
    // CRITICAL: Update both User.Tier and Subscription.Tier together
    public async Task<Subscription> UpdateSubscriptionTierAsync(
        int userId, 
        SubscriptionTier newTier)
    {
        var subscription = await _subscriptionRepository
            .GetByUserIdAsync(userId);
        
        if (subscription == null)
            throw new ResourceNotFoundException(
                $"Subscription not found for user {userId}");
        
        // Step 1: Update subscription tier
        subscription.Tier = newTier;
        subscription.UpdatedAt = DateTime.UtcNow;
        await _subscriptionRepository.UpdateAsync(subscription);
        
        _logger.LogInformation(
            $"Updated subscription tier for user {userId} to {newTier}");
        
        // Step 2: CRITICAL - Also update user tier to match
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            throw new ResourceNotFoundException($"User {userId} not found");
        
        user.Tier = ConvertToUserTier(newTier);
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepository.UpdateAsync(user);
        
        _logger.LogInformation(
            $"Synchronized user tier for user {userId} to {user.Tier}");
        
        return subscription;
    }
    
    // Helper to convert between tier types
    private UserTier ConvertToUserTier(SubscriptionTier subscriptionTier)
    {
        return subscriptionTier switch
        {
            SubscriptionTier.Free => UserTier.Free,
            SubscriptionTier.Pro => UserTier.Pro,
            SubscriptionTier.Premium => UserTier.Premium,
            _ => throw new InvalidOperationException(
                $"Unknown subscription tier: {subscriptionTier}")
        };
    }
}
```

### ❌ DON'T: Update just Subscription.Tier without User.Tier
```csharp
// ❌ WRONG: User and subscription get out of sync
public async Task<Subscription> UpdateSubscriptionTierAsync(
    int userId, 
    SubscriptionTier newTier)
{
    var subscription = await _subscriptionRepository
        .GetByUserIdAsync(userId);
    
    subscription.Tier = newTier;
    await _subscriptionRepository.UpdateAsync(subscription);
    
    // FORGOT TO UPDATE USER.TIER - NOW SYSTEM IS INCONSISTENT!
    
    return subscription;
}
```

### 🧪 **BDD Test Pattern for Tier Synchronization**
```gherkin
Feature: Subscription Tier Change

Scenario: Updating subscription tier should sync with user tier
  Given a user with ID 123 exists with tier "Free"
  And the user has a subscription with tier "Free"
  When I update the subscription tier to "Pro"
  Then the subscription tier should be "Pro"
  And the user tier should also be updated to "Pro"
  And the update timestamp should be recent for both entities
```

---

## Logging

### ✅ DO: Use structured logging
```csharp
public class UserService
{
    private readonly ILogger<UserService> _logger;
    
    public async Task<User> GetUserAsync(int userId)
    {
        _logger.LogInformation("Fetching user {UserId}", userId);
        
        var user = await _userRepository.GetByIdAsync(userId);
        
        if (user == null)
        {
            _logger.LogWarning("User {UserId} not found", userId);
            return null;
        }
        
        _logger.LogInformation(
            "User {UserId} fetched successfully. Email: {Email}", 
            userId, 
            user.Email);
        
        return user;
    }
    
    public async Task<User> RegisterUserAsync(
        string email, 
        string password)
    {
        try
        {
            _logger.LogInformation("Attempting to register user with email {Email}", email);
            
            var user = new User 
            { 
                Email = email, 
                PasswordHash = password 
            };
            
            await _userRepository.CreateAsync(user);
            
            _logger.LogInformation("User {UserId} registered successfully", user.Id);
            
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Registration failed for email {Email}", email);
            throw;
        }
    }
}
```

### ✅ DO: Log at appropriate levels
```csharp
// LogInformation: Normal operations, successful actions
_logger.LogInformation("User {UserId} logged in successfully", userId);

// LogWarning: Expected errors, recoverable issues
_logger.LogWarning("User {UserId} not found", userId);

// LogError: Unexpected errors, failures that need attention
_logger.LogError(ex, "Database connection failed");

// LogDebug: Development/debugging information
_logger.LogDebug("Query took {ElapsedMilliseconds}ms", stopwatch.ElapsedMilliseconds);
```

---

## Testing

### ✅ DO: Write unit tests for services
```csharp
public class AuthenticationServiceTests
{
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly AuthenticationService _service;
    
    public AuthenticationServiceTests()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _service = new AuthenticationService(_mockUserRepository.Object);
    }
    
    [Fact]
    public async Task RegisterUserAsync_WithValidEmail_ReturnsUser()
    {
        // Arrange
        var email = "test@example.com";
        var password = "SecurePass123";
        
        _mockUserRepository
            .Setup(r => r.GetByEmailAsync(email))
            .ReturnsAsync((User)null);
        
        _mockUserRepository
            .Setup(r => r.CreateAsync(It.IsAny<User>()))
            .ReturnsAsync(new User { Id = 1, Email = email });
        
        // Act
        var result = await _service.RegisterUserAsync(email, password);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(email, result.Email);
        _mockUserRepository.Verify(
            r => r.CreateAsync(It.IsAny<User>()), 
            Times.Once);
    }
    
    [Fact]
    public async Task RegisterUserAsync_WithExistingEmail_ThrowsConflictException()
    {
        // Arrange
        var email = "existing@example.com";
        var password = "SecurePass123";
        
        _mockUserRepository
            .Setup(r => r.GetByEmailAsync(email))
            .ReturnsAsync(new User { Email = email });
        
        // Act & Assert
        await Assert.ThrowsAsync<ConflictException>(
            () => _service.RegisterUserAsync(email, password));
    }
}
```

### ✅ DO: Write integration tests with test database
```csharp
public class UserRepositoryIntegrationTests : IAsyncLifetime
{
    private readonly PostgresContainer _dbContainer;
    private MerchantContext _context;
    private UserRepository _repository;
    
    public UserRepositoryIntegrationTests()
    {
        _dbContainer = new PostgresBuilder()
            .WithImage("postgres:latest")
            .Build();
    }
    
    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
        
        var options = new DbContextOptionsBuilder<MerchantContext>()
            .UseNpgsql(_dbContainer.GetConnectionString())
            .Options;
        
        _context = new MerchantContext(options);
        await _context.Database.MigrateAsync();
        
        _repository = new UserRepository(_context);
    }
    
    public async Task DisposeAsync()
    {
        await _context.DisposeAsync();
        await _dbContainer.StopAsync();
    }
    
    [Fact]
    public async Task CreateUserAsync_WithValidData_PersistsToDatabase()
    {
        // Arrange
        var user = new User
        {
            Email = "test@example.com",
            PasswordHash = "hashed_password"
        };
        
        // Act
        var result = await _repository.CreateAsync(user);
        
        // Assert
        var persisted = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == result.Id);
        
        Assert.NotNull(persisted);
        Assert.Equal("test@example.com", persisted.Email);
    }
}
```

---

## Code Organization

### ✅ DO: Organize by feature/domain
```
backend/
├── Controllers/
│   ├── AuthenticationController.cs
│   ├── UsersController.cs
│   └── SubscriptionsController.cs
├── Services/
│   ├── IAuthenticationService.cs
│   ├── AuthenticationService.cs
│   ├── ISubscriptionService.cs
│   ├── SubscriptionService.cs
│   └── IPasswordHashingService.cs
├── Repositories/
│   ├── IUserRepository.cs
│   ├── UserRepository.cs
│   ├── ISubscriptionRepository.cs
│   └── SubscriptionRepository.cs
├── Models/
│   ├── User.cs
│   ├── Subscription.cs
│   └── DebitNote.cs
├── DTOs/
│   ├── UserDto.cs
│   ├── CreateUserRequest.cs
│   └── UpdateUserRequest.cs
├── Exceptions/
│   ├── AuthenticationException.cs
│   ├── ValidationException.cs
│   ├── ConflictException.cs
│   └── ResourceNotFoundException.cs
├── Data/
│   └── MerchantContext.cs
├── Migrations/
│   ├── 20240101000000_InitialCreate.cs
│   └── 20240102000000_AddTierColumn.cs
└── Program.cs
```

---

## Performance Considerations

### ✅ DO: Avoid N+1 queries
```csharp
// ❌ WRONG: N+1 queries (1 for user, N for subscriptions)
var users = await _context.Users.ToListAsync();
foreach (var user in users)
{
    var subscriptions = await _context.Subscriptions
        .Where(s => s.UserId == user.Id)
        .ToListAsync(); // Extra query per user!
}

// ✅ RIGHT: Single query with Include
var users = await _context.Users
    .Include(u => u.Subscriptions)
    .ToListAsync();
```

### ✅ DO: Use pagination for large result sets
```csharp
public async Task<PagedResult<UserDto>> GetUsersAsync(int page = 1, int pageSize = 10)
{
    var queryable = _context.Users.AsQueryable();
    
    var total = await queryable.CountAsync();
    
    var users = await queryable
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(u => new UserDto
        {
            Id = u.Id,
            Email = u.Email,
            Tier = u.Tier.ToString()
        })
        .ToListAsync();
    
    return new PagedResult<UserDto>
    {
        Items = users,
        Total = total,
        Page = page,
        PageSize = pageSize
    };
}
```

### ✅ DO: Use connection pooling (configured in Program.cs)
```csharp
builder.Services.AddDbContext<MerchantContext>(options =>
    options.UseNpgsql(
        connectionString,
        dbContextOptions => dbContextOptions
            .EnableRetryOnFailure(3) // Resilience
            .CommandTimeout(30))); // Timeout protection
```

---

## Validation Data Annotations

### ✅ DO: Use data annotations on DTOs
```csharp
public class CreateUserRequest
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Email format is invalid")]
    [MaxLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
    public string Password { get; set; }
}

// Usage in controller with automatic validation
[HttpPost("register")]
public async Task<IActionResult> Register(
    [FromBody] CreateUserRequest request) // Auto-validates
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);
    
    // Implementation...
}
```

---

## Summary of Critical Rules

| Rule | Status | Reason |
|------|--------|--------|
| **Always use async/await** | ✅ CRITICAL | Prevents deadlocks, improves scalability |
| **Sync User.Tier + Subscription.Tier** | ✅ CRITICAL | Prevents inconsistent state, required for BDD tests |
| **Validate input early** | ✅ CRITICAL | Fail-fast, clear error messages |
| **Hash passwords with cost 12** | ✅ CRITICAL | Security, protects user accounts |
| **Use DTOs, never expose Entities** | ✅ CRITICAL | API stability, security |
| **Parameterized queries only** | ✅ CRITICAL | SQL injection prevention |
| **Constructor injection DI** | ✅ CRITICAL | Testability, SOLID principles |
| **Log without sensitive data** | ✅ CRITICAL | Security, compliance |
| **Structured logging** | ✅ STRONG | Debugging, monitoring |
| **Include for eager loading** | ✅ STRONG | Query performance, N+1 prevention |
| **Pagination for large sets** | ✅ STRONG | Memory efficiency, UI responsiveness |

