---
description: Best practices for using GitHub Copilot effectively in VS Code
applyTo: "**"
status: ALWAYS_APPLY
---

# GitHub Copilot Best Practices Instructions

## STATUS: ALWAYS APPLY

## Core Principle

GitHub Copilot is an AI pair programmer, not a replacement programmer. Optimal results require deliberate context engineering and clear intent communication.

---

## Rule 1: Select the Right Copilot Tool

### Use Code Completions For:
- ✅ Completing code snippets, variable names, and functions as you type
- ✅ Generating repetitive code patterns
- ✅ Converting inline natural language comments to code
- ✅ Generating tests for TDD workflows

### Use Copilot Chat For:
- ✅ Answering code questions in natural language
- ✅ Generating large code sections with iterative refinement
- ✅ Accomplishing tasks using keywords, slash commands, and skills
- ✅ Role-based assistance (e.g., "Act as a Senior C++ Developer focused on code quality")

---

## Rule 2: Optimize Inline Suggestions Through Context Engineering

### 2.1 Open Related Files
**MUST**: Keep related files open in your editor to provide contextual understanding.
- Copilot analyzes open files to establish project context
- Multiple related files improve suggestion accuracy
- Helps Copilot see the "bigger picture" of your architecture

### 2.2 Write Top-Level Comments
**MUST**: Begin each file with a high-level comment explaining purpose and context.
\`\`\`
// User authentication service - handles JWT token generation,
// validation, and refresh flows using Redis for session storage
\`\`\`

### 2.3 Manually Set Includes and References
**MUST**: Explicitly define imports and module references rather than relying on Copilot.
- Informs Copilot about frameworks, libraries, and versions you're using
- Ensures suggestions match your dependency choices
- Prevents suggestions for incompatible library versions

### 2.4 Use Meaningful Function Names
**MUST**: Use descriptive, specific function names.
- ❌ Bad: \`fetchData()\`, \`handleIt()\`, \`process()\`
- ✅ Good: \`fetchUserProfileById()\`, \`validateJWTToken()\`, \`processPaymentTransaction()\`

### 2.5 Write Specific Function Comments
**SHOULD**: Add well-scoped comments that provide context beyond the function name.
\`\`\`javascript
// Validates JWT token signature and expiry, then refreshes if within 5 minutes of expiration
function validateAndRefreshToken(token) { ... }
\`\`\`

### 2.6 Prime Copilot with Sample Code
**TECHNIQUE**: Copy/paste desirable code samples into open tabs to "train" Copilot's pattern matching.
- Use when Copilot defaults to outdated library versions
- Provide examples of desired coding style or patterns
- Delete sample code once Copilot adapts

### 2.7 Maintain Consistent Quality
**CRITICAL**: "Garbage in, garbage out" - Copilot mirrors existing code patterns.
- Keep quality bar high even during rapid prototyping
- Consider temporarily disabling Copilot during "hacking mode"
- Access toggle via Copilot status menu in VS Code status bar

---

## Rule 3: Optimize Copilot Chat Prompts

### 3.1 Start General, Then Get Specific
**PATTERN**: Use progressive refinement in multi-turn prompts.

**Example**:
\`\`\`
1. "Write a function that tells me if a number is prime."
2. "The function should take an integer and return true if the integer is prime."
3. "The function should throw an error if the input isn't a positive integer."
\`\`\`

### 3.2 Provide Examples
**MUST**: Include example inputs, outputs, and implementations when relevant.
- Example input data
- Example expected outputs
- Example implementation patterns

### 3.3 Break Complex Tasks into Simple Steps
**MUST**: Decompose large tasks into sequential, manageable sub-tasks.

**Example - Word Search Puzzle**:
\`\`\`
Step 1: "Write a function to generate a 10 by 10 grid of letters."
Step 2: "Write a function to find all words in a grid of letters, given a list of valid words."
Step 3: "Write a function that uses the previous functions to generate a 10 by 10 grid of letters that contains at least 10 words."
Step 4: "Update the previous function to print the grid of letters and 10 random words from the grid."
\`\`\`

### 3.4 Avoid Ambiguous References
**MUST**: Be explicit about what code/file you're referencing.
- ❌ Bad: "What does this do?"
- ✅ Good: "What does the createUser function do?"
- ✅ Good: "Explain the authentication logic in #file:auth.service.ts"

### 3.5 Indicate Relevant Code
**MUST**: Open files or highlight code you want Copilot to reference.
- Open relevant files in editor
- Highlight specific code blocks
- Use chat variables to specify files explicitly

---

## Rule 4: Use Chat Participants, Slash Commands, and Variables

### 4.1 Chat Participants
**MUST**: Use appropriate participants to provide domain-specific context.

| Participant | Use Case |
|-------------|----------|
| \`@workspace\` | Questions about your open project codebase |
| \`@vscode\` | Questions about VS Code features and APIs |
| \`@terminal\` | Terminal and command-line tasks |

### 4.2 Slash Commands
**MUST**: Use slash commands to communicate intent clearly.

| Command | Purpose |
|---------|----------|
| \`/explain\` | Understanding code or concepts |
| \`/fix\` | Fixing bugs or issues |
| \`/tests\` | Generating test cases |
| \`/doc\` | Generating documentation |

### 4.3 Chat Variables
**MUST**: Use \`#\` symbol to reference specific context elements.

**Examples**:
- \`#file:package.json\` - Reference specific file
- \`#selection\` - Reference highlighted code
- \`#terminalLastCommand\` - Reference last terminal command

**Usage**:
\`\`\`
"Can you suggest improvements to #file:package.json?"
"How do I add an extension in #file:devcontainer.json?"
"Explain what #selection does and suggest optimizations"
\`\`\`

---

## Rule 5: Iterate and Manage Chat History

### 5.1 Experiment and Iterate
**PATTERN**: If results are unsatisfactory:
1. Iterate on your prompt with more specificity
2. Reference the previous response for continuity
3. Delete unsuccessful responses and restart

### 5.2 Keep History Relevant
**MUST**: Maintain clean, focused chat history.
- Start new threads for new tasks
- Delete irrelevant or failed requests
- Avoid context pollution from unrelated conversations

---

## Rule 6: Follow Code Quality Foundations

**PREREQUISITE**: Copilot suggestions improve when existing code follows best practices.

### Required Code Quality Standards:
1. ✅ Consistent code style and patterns
2. ✅ Descriptive names for variables and functions
3. ✅ Well-commented code with intent explanations
4. ✅ Modular, scoped component structure
5. ✅ Comprehensive unit test coverage

---

## Summary: The Copilot Optimization Stack

\`\`\`
┌─────────────────────────────────────────┐
│   Rule 6: Code Quality Foundation       │  ← Base Layer
├─────────────────────────────────────────┤
│   Rule 2: Context Engineering           │  ← Signal Quality
├─────────────────────────────────────────┤
│   Rule 3-4: Prompt Optimization         │  ← Intent Clarity
├─────────────────────────────────────────┤
│   Rule 5: Iteration & History Mgmt      │  ← Continuous Improvement
├─────────────────────────────────────────┤
│   Rule 1: Right Tool Selection          │  ← Strategic Decision
└─────────────────────────────────────────┘
\`\`\`

**Remember**: GitHub Copilot amplifies your existing code quality. Invest in context engineering and clear communication for maximum ROI.
