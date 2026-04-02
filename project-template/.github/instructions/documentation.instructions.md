---
applyTo: '**'
---

# Documentation Standards Instructions

## Overview

This document provides systematic instructions for documentation standards and content creation guidelines using the AI-first delivery methodology. These instructions establish clear boundaries between code-level documentation (required), project documentation (forbidden unless requested), and structured artifacts (template-based) to maintain focused, maintainable documentation that enhances code readability without creating maintenance burden.

## Process Overview

**Documentation Standards Implementation** transforms documentation requirements into structured content creation guidelines that deliver focused code documentation, prevent documentation bloat, and maintain consistency through established templates while ensuring developers can access necessary information without overwhelming maintenance overhead or redundant content creation.

## Implementation Process

### 1. Code Documentation Generation
**Objective**: Create comprehensive inline documentation that enhances code readability and maintainability

**Activities**:
- Generate inline comments explaining WHY for non-obvious logic and business rules
- Create API documentation using JSDoc/docstrings for all public functions and classes
- Implement automated code review reports against coding standards checklist
- Add TODO comments referencing future implementations with story references

**Quality Standards**:
- All public APIs include comprehensive JSDoc/docstring documentation
- Inline comments explain business reasoning, not obvious code functionality
- Security and performance annotations are present where relevant
- Test documentation clearly states purpose and BDD scenario mappings

### 2. Documentation Boundary Enforcement
**Objective**: Prevent creation of maintenance-heavy project documentation unless explicitly required

**Activities**:
- Restrict creation of additional markdown files in /docs/ directory
- Prevent duplicate documentation when README.md covers the topic
- Use code comments instead of separate Architecture Decision Records
- Direct project documentation requests to established templates

**Quality Standards**:
- No unnecessary markdown files created outside standard templates
- README.md remains the single source for project overview information
- Code comments serve as primary source for architectural decisions
- All project documentation follows established template patterns

### 3. Structured Artifact Creation
**Objective**: Maintain consistency through template-based documentation for formal deliverables

**Activities**:
- Create PRD documents in phase-based folders following established templates (01-requirements, 02-architecture, 03-testing, 04-planning)
- Generate implementation plans in /docs/05-implementation/epics/<EPIC-REF>/user-stories/ with consistent format
- Produce handoff files in JSON format using handoff-tmpl.md template
- Generate meeting minutes in YAML format using meeting.assistant.agent

**Quality Standards**:
- All structured artifacts follow designated template formats exactly
- PRD documents maintain consistency across requirements, user-stories, and technical specifications
- Implementation plans use standardized structure for reproducible workflows
- Meeting minutes capture actionable items in structured YAML format

## Documentation Categories

### ✅ ALWAYS GENERATE (Code Documentation)
Code-level documentation is REQUIRED and should be generated automatically during implementation:

- **Inline comments**: WHY explanations for non-obvious logic, business rules, and complex algorithms
- **API documentation**: JSDoc/docstrings for all public functions, classes, and methods
- **Code review reports**: Automated analysis against coding standards checklist
- **TODO comments**: Future implementations and improvements with story references
- **Type definitions**: TypeScript interfaces, type annotations, and contracts
- **Test documentation**: Purpose, assumptions, and BDD scenario mappings in test files
- **Security annotations**: Authentication/authorization rules and validation constraints
- **Performance notes**: Optimization decisions and tradeoffs

### ❌ NEVER CREATE (Project Documentation)
Project-level documentation is FORBIDDEN unless explicitly requested by user:

- Additional markdown files in /docs/ (no AGENTS_REGISTRY.md, PROJECT_STRUCTURE.md, etc.)
- Duplicate documentation when README.md already covers the topic
- Architecture decision records as separate files (use code comments instead)
- Summary documents for code changes (unless user explicitly asks)
- Custom documentation outside standard templates

### 📋 STANDARD PROJECT DOCUMENTATION (Follow Templates)
These are created during PDLC/Implementation workflows using templates:

- PRD documents in phase folders: docs/01-requirements/, docs/02-architecture/, docs/03-testing/, docs/04-planning/
- Implementation plans in /docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/
- Handoff files (JSON format using handoff-tmpl.md)
- Meeting minutes (YAML format using meeting.assistant.agent)

---

## Key Principle
**Code documentation (✅) enhances code readability. Project documentation (❌) creates maintenance burden. Follow templates (📋) for structured artifacts.**

---

# General Documentation Guidelines

## General Documentation Guidelines
1. Always maintain consistency between related documents
2. Use markdown format for all documentation files
3. Follow existing document structure and formatting
4. Include clear section headers and descriptions

## Creating New Documentation
1. Create the new markdown file in the appropriate docs/ subdirectory
2: Follow the naming convention:
   - Use numerical prefixes (e.g., `001-`, `002-`) for ordering
   - Use kebab-case for file names
3. Update docs/index.md with:
   - Link to the new document
   - Brief description of its contents
   - Update directory structure if needed
4. Add references to related documents
5. Follow existing documentation patterns

## Diagram Management
For all diagram standards, guidelines, examples, and troubleshooting, refer to the [Diagram Usage Guide](../guides/diagram-usage.guide.md).

This includes:
- When to use Mermaid vs PlantUML
- Diagram examples and templates
- Setup and troubleshooting
- Best practices and quick reference

## Updating Documentation
1. Check docs/index.md first to understand document relationships
2. Update all related documents to maintain consistency
3. Update docs/index.md if changes affect:
   - Document structure
   - Document relationships
   - Project organization
4. Add TODO items in docs/index.md for pending documentation needs

## Document Cross-Referencing
1. Use relative paths for links between documents
2. Format: `[Document Title](relative/path/to/document.md)`
3. Check and update all affected cross-references
4. Maintain bidirectional links where appropriate

## Documentation Structure
1. Each document should have:
   - Clear title (H1)
   - Brief introduction/purpose
   - Logical section hierarchy
   - Links to related documents
2. Use consistent heading levels (H1 > H2 > H3)
3. Include code blocks with proper language tags
4. Add file paths for code-related documentation

## Documentation Directory Structure
```
docs/
├── index.md                         # Project Overview
├── prd/                             # All PRD documents (requirements, personas, architecture, tech-spec, etc.)
├── user-stories/                    # User story documents and implementation plans
│   ├── user-stories.md              # Master user stories document
│   └── <USER-STORY-REF>/            # Individual story folders (e.g., US-001/)
│       ├── implementation-plan.md   # Layer breakdown and technical approach
│       └── bdd-scenarios/           # Story-specific BDD feature files
├── design/                          # UX/UI design documents and design systems
│   └── diagrams/                    # Design-specific diagrams
├── features/                        # Feature Documentation
│   └── diagrams/                    # Feature-specific diagrams
├── development/                     # Development Guidelines
│   └── diagrams/                    # Development-related diagrams
└── architecture/                    # Architecture Documentation
    └── diagrams/                    # Architecture diagrams
```

### Infrastructure Documentation
- Location: infra/docs/index.md
- Include deployment procedures
- Document security practices
- Store infrastructure diagrams in infra/docs/diagrams/

### Application Documentation
- Location: src/docs/index.md (if application-specific) or root docs/
- Include development guidelines
- Define testing requirements
- Maintain Definition of Done
- Store application diagrams in docs/architecture/diagrams/

### Services Documentation
- Location: services/docs/index.md
- Document service architecture
- Include API documentation
- Define development workflow
- Store service diagrams in services/docs/diagrams/
