- NEVER generate a documentation that i did not be asked for.
- Never summarize the code base modification in an MD file or a document unless i asked for it.
- Follow up documentation workflow as described in /.github/workflows/documents.workflows.md
- Use documentation prompt from /.github/prompts/documentation.prompts.md
- All PRD documents are stored in docs/prd/ please make sure you read it in case you need to refer to it.
- All User Story documents are stored in docs/user-stories/ please make sure you read it in case you need to refer to it.
- All ux/ui Design documents are stored in docs/design/ please make sure you read it in case you need to refer to it.

---
applyTo: '**'
---


# Documentation Rules

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
- Location: apps/docs/index.md
- Include development guidelines
- Define testing requirements
- Maintain Definition of Done
- Store application diagrams in apps/docs/diagrams/

### Services Documentation
- Location: services/docs/index.md
- Document service architecture
- Include API documentation
- Define development workflow
- Store service diagrams in services/docs/diagrams/
