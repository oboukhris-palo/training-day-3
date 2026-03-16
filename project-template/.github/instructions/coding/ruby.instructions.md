---
description: Ruby programming language best practices, patterns, and conventions
applyTo: "**/*.rb"
---

# Ruby Best Practices & Development Guidelines

This document establishes coding standards and best practices for Ruby development. All team members must follow these guidelines to maintain consistency, quality, and maintainability across Ruby projects.

---

## 1. Project Setup & Configuration

### Initial Setup
```bash
# Create new Ruby project with Bundler
bundle init

# Install dependencies
bundle install

# Run Ruby script
ruby script.rb

# Start interactive console
irb

# Run tests
bundle exec rspec

# Lint code
bundle exec rubocop

# Format code
bundle exec rubocop -a
```

### Version Requirements
- **Ruby**: 3.1+ (3.3+ recommended)
- **Bundler**: Latest version

### Project Structure
```
project-name/
├── app/
│   ├── models/
│   ├── services/
│   ├── repositories/
│   ├── controllers/
│   └── helpers/
├── config/
│   └── application.rb
├── lib/
│   └── tasks/
├── spec/
│   ├── models/
│   └── services/
├── Gemfile
├── Gemfile.lock
└── README.md
```

---

## 2. Code Style & Conventions

### 2.1 Naming Conventions
```ruby
# ✅ DO: Follow Ruby naming conventions
class UserService  # PascalCase for classes
end

module Authenticatable  # PascalCase for modules
end

def get_user_by_id(id)  # snake_case for methods
  # Implementation
end

user_name = "John"  # snake_case for variables
MAX_RETRIES = 3  # UPPER_SNAKE_CASE for constants

# ✅ DO: Use meaningful names
def calculate_user_score  # Better than calc_score
  # Implementation
end

def valid_email?(email)  # Use ? for boolean methods
  email.include?("@")
end

def update_user_status!  # Use ! for methods with side effects
  # Implementation that modifies state
end

# ❌ DON'T: Mix conventions
def GetUser  # Wrong case
  # Implementation
end

user = "John"  # Lowercase constant is wrong
```

### 2.2 Comments & Docstrings
```ruby
# ✅ DO: Use meaningful comments
# Calculate score based on user activity
def calculate_score
  activities.sum(&:points)
end

# ✅ DO: Use YARD documentation
# Fetches a user by ID
#
# @param id [String] The user ID
# @return [User, nil] The user or nil if not found
# @raise [UserException] If ID is invalid
def get_user(id)
  raise UserException, "Invalid ID" if id.blank?
  users.find(id)
end

# ❌ DON'T: Use unclear comments
def calc  # Unclear what this does
  # Some logic
end
```

---

## 3. Classes & Modules

### 3.1 Class Definition
```ruby
# ✅ DO: Use clear class definitions
class User
  attr_accessor :name, :email
  attr_reader :id, :created_at
  attr_writer :password

  def initialize(id:, name:, email:)
    @id = id
    @name = name
    @email = email
    @created_at = Time.now
  end

  def valid?
    name.present? && email.include?("@")
  end

  def to_h
    {
      id: @id,
      name: @name,
      email: @email
    }
  end
end

# ✅ DO: Use private methods for internal logic
class UserService
  def create_user(name, email)
    validate_email(email)
    User.new(name: name, email: email)
  end

  private

  def validate_email(email)
    raise "Invalid email" unless email.include?("@")
  end
end

# ✅ DO: Use method visibility
class Database
  def query(sql)
    execute(sql)
  end

  protected

  def execute(sql)
    # Database execution
  end

  private

  def log(message)
    puts "[LOG] #{message}"
  end
end
```

### 3.2 Modules & Mixins
```ruby
# ✅ DO: Use modules for shared behavior
module Timestampable
  def self.included(base)
    base.attr_reader :created_at, :updated_at
  end

  def created_at
    @created_at ||= Time.now
  end

  def touch
    @updated_at = Time.now
  end
end

class User
  include Timestampable
end

# ✅ DO: Use concern modules
module Validatable
  def validates(*attributes)
    # Validation logic
  end
end

class BaseModel
  include Validatable
end

# ✅ DO: Use extend for class methods
module HasTimestamp
  def created_at
    Time.now
  end
end

class Document
  extend HasTimestamp
end
```

---

## 4. Functions & Methods

### 4.1 Method Definition
```ruby
# ✅ DO: Use clear method signatures
def get_users(limit: 10, offset: 0)
  User.limit(limit).offset(offset)
end

# ✅ DO: Use keyword arguments
def send_email(to:, subject:, body:, cc: nil)
  # Email logic
end

# Usage:
send_email(to: "user@example.com", subject: "Hello", body: "Welcome")

# ✅ DO: Use default parameters
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end

# ✅ DO: Use splat operators
def sum(*numbers)
  numbers.reduce(:+)
end

result = sum(1, 2, 3, 4, 5)  # => 15

# ✅ DO: Use double splat for options
def configure(**options)
  @host = options[:host] || "localhost"
  @port = options[:port] || 8080
end

configure(host: "example.com", port: 3000)
```

### 4.2 Blocks & Procs
```ruby
# ✅ DO: Use blocks for iteration
[1, 2, 3].each { |n| puts n }

# ✅ DO: Use yield for custom iteration
def each_chunk(size)
  count = 0
  chunk = []
  
  each do |item|
    chunk << item
    count += 1
    
    if count == size
      yield chunk
      chunk = []
      count = 0
    end
  end
  
  yield chunk if chunk.any?
end

# ✅ DO: Use &block parameter
def process(&block)
  items.map(&block)
end

process { |item| item * 2 }

# ✅ DO: Use Proc/Lambda
multiply = ->(a, b) { a * b }
result = multiply.call(5, 3)  # => 15

add = Proc.new { |a, b| a + b }
result = add.call(5, 3)  # => 8
```

---

## 5. Collections & Enumeration

### 5.1 Array & Hash Operations
```ruby
# ✅ DO: Use array methods effectively
numbers = [1, 2, 3, 4, 5]

doubled = numbers.map { |n| n * 2 }
evens = numbers.select { |n| n.even? }
sum = numbers.reduce(:+)  # or .sum
grouped = numbers.group_by { |n| n % 2 }

# ✅ DO: Use hash operations
user_hash = { id: 1, name: "John", email: "john@example.com" }

value = user_hash[:name]
user_hash[:name] = "Jane"
user_hash.merge(active: true)

user_hash.each { |key, value| puts "#{key}: #{value}" }
user_hash.select { |k, v| k == :name }

# ✅ DO: Use string methods
text = "Hello World"
text.upcase  # "HELLO WORLD"
text.downcase  # "hello world"
text.split(" ")  # ["Hello", "World"]
text.include?("World")  # true

# ✅ DO: Use enumerable methods
[1, 2, 3, 4, 5].find { |n| n > 3 }  # 4
[1, 2, 3, 4, 5].any? { |n| n > 4 }  # true
[1, 2, 3, 4, 5].all? { |n| n > 0 }  # true
```

### 5.2 Lazy Enumeration
```ruby
# ✅ DO: Use lazy enumeration for large collections
large_range = (1..1_000_000)

result = large_range
  .lazy
  .select { |n| n.even? }
  .map { |n| n * 2 }
  .take(10)
  .force  # Convert back to array

# ✅ DO: Use each_with_index
["a", "b", "c"].each_with_index { |item, index| puts "#{index}: #{item}" }

# ✅ DO: Use zip for parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]

names.zip(scores).each { |name, score| puts "#{name}: #{score}" }
```

---

## 6. Error Handling

### 6.1 Exceptions
```ruby
# ✅ DO: Define custom exceptions
class UserException < StandardError; end
class UserNotFoundException < UserException; end
class ValidationError < UserException; end

# ✅ DO: Raise specific exceptions
def get_user(id)
  raise ValidationError, "ID cannot be empty" if id.blank?
  
  user = User.find(id)
  raise UserNotFoundException, "User not found" unless user
  
  user
end

# ✅ DO: Handle exceptions with rescue
begin
  user = get_user(user_id)
rescue ValidationError => e
  puts "Validation error: #{e.message}"
rescue UserNotFoundException => e
  puts "User not found: #{e.message}"
rescue => e
  puts "Unexpected error: #{e.message}"
ensure
  # Cleanup code
end

# ✅ DO: Use ensure for cleanup
def read_file(path)
  file = File.open(path)
  yield file
ensure
  file&.close
end

# ✅ DO: Use retry for transient errors
retries = 0
begin
  perform_risky_operation
rescue => e
  retries += 1
  retry if retries < 3
end
```

---

## 7. Metaprogramming

### 7.1 Dynamic Methods & Classes
```ruby
# ✅ DO: Use define_method for dynamic methods
class User
  %i[name email].each do |attr|
    define_method("get_#{attr}") do
      instance_variable_get("@#{attr}")
    end
  end
end

# ✅ DO: Use method_missing for dynamic handling
class DynamicObject
  def method_missing(method_name, *args)
    "Called #{method_name} with #{args.inspect}"
  end

  def respond_to_missing?(method_name, include_private = false)
    true
  end
end

# ✅ DO: Use send for dynamic method calls
method_name = :upcase
result = "hello".send(method_name)  # => "HELLO"

# ✅ DO: Use class_eval for class modifications
String.class_eval do
  def shout
    upcase + "!"
  end
end

"hello".shout  # => "HELLO!"
```

---

## 8. Testing

### 8.1 RSpec Tests
```ruby
# ✅ DO: Write expressive tests
require 'rspec'

describe UserService do
  let(:service) { UserService.new }
  
  describe '#create_user' do
    it 'creates a user successfully' do
      user = service.create_user('John', 'john@example.com')
      
      expect(user.name).to eq('John')
      expect(user.email).to eq('john@example.com')
    end

    it 'raises error on invalid email' do
      expect {
        service.create_user('John', 'invalid-email')
      }.to raise_error(ValidationError)
    end

    context 'when name is empty' do
      it 'raises validation error' do
        expect {
          service.create_user('', 'john@example.com')
        }.to raise_error(ValidationError)
      end
    end
  end
end

# ✅ DO: Use matchers
expect(value).to eq(expected)
expect(array).to include(element)
expect(string).to match(/pattern/)
expect { code }.to change { counter }.by(1)
expect { code }.to raise_error(ErrorClass)

# ✅ DO: Use test doubles
user_repo = double("UserRepository", find: User.new)
service = UserService.new(user_repo)

allow(user_repo).to receive(:find).and_return(user)
expect(user_repo).to have_received(:find).with(1)
```

---

## 9. Common Patterns & Anti-Patterns

### ✅ DO's
- Use keyword arguments
- Use blocks for iteration
- Use private/protected for encapsulation
- Error handling with specific exceptions
- Use attr_accessor/reader/writer
- Write expressive tests with RSpec
- Use modules for mixins
- Follow snake_case conventions

### ❌ DON'Ts
- Use global variables
- Create deeply nested methods
- Ignore error handling
- Use `eval()` unnecessarily
- Mix symbols and strings as keys
- Ignore Rails conventions (if using Rails)
- Create overly complex one-liners
- Use `instance_variable_get` excessively

---

## Resources

- [Ruby Official Documentation](https://www.ruby-lang.org/en/documentation/)
- [Ruby Style Guide](https://rubystyle.guide/)
- [RSpec Documentation](https://rspec.info/)
- [Ruby Best Practices](https://www.oreilly.com/library/view/ruby-best-practices/9780596523015/)
