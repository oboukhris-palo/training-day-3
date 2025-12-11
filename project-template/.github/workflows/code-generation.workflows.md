# Code Generation Workflow

## Overview

This document defines the **Code Generation & Development Execution Workflow** - the detailed process for converting completed PRD documents (from [documents.workflows.md](.github/workflows/documents.workflows.md)) into implemented, tested, and validated features. 

This workflow orchestrates the interaction between all development agents to execute features through coordinated TDD cycles, BDD testing, and quality validation.

**Prerequisite**: All PDLC stages (1-6) must be completed with approved documents:
- ✅ requirements.md (business requirements)
- ✅ personas.md (user archetypes)
- ✅ user-stories.md (features with acceptance criteria)
- ✅ architecture-design.md (system design)
- ✅ tech-spec.md (implementation specifications)
- ✅ design-systems.md (UI components and design tokens)
- ✅ test-strategies.md (testing approach)
- ✅ BDD scenarios (Gherkin feature files from user stories)

---

## Workflow Governance

**Scope**: Development execution of user stories from requirements to production-ready code
**Agents Involved**: PM, PO, BA, Dev-Lead, Dev-TDD, UX Designer
**Key Documents**: [documents.workflows.md](.github/workflows/documents.workflows.md), [architecture-design.md](../docs/prd/architecture-design.md), [tech-spec.md](../docs/prd/tech-spec.md), [design-systems.md](../docs/prd/design-systems.md), [coding.instructions.md](../instructions/coding.instructions.md)

**Version Control**: Git with feature branches, pull requests, and quality gates
**Issue Tracking**: GitHub Issues with user-story linked to pull requests

---

## Development Execution Pipeline

```
PDLC Complete Documents
(requirements.md, user-stories.md, architecture-design.md, tech-spec.md, design-systems.md, test-strategies.md)
        ↓
Sprint Planning (PM + PO + BA + Dev-Lead)
        ↓
User Story Breakdown (Dev-Lead)
        ├─ User-Story GitHub Issue Created
        ├─ Acceptance Criteria Linked
        ├─ BDD Scenarios Attached (Gherkin)
        ├─ Layer Breakdown Documented (DB, Backend, Config, Frontend)
        └─ Assigned to Dev-TDD Agent
        ↓
TDD Development Cycle (Dev-TDD Agent)
        ├─ Layer 1: Database Design & Migrations (RED → GREEN → REFACTOR)
        ├─ Layer 2: Backend APIs & Services (RED → GREEN → REFACTOR)
        ├─ Layer 3: Configuration & Integration (RED → GREEN → REFACTOR)
        ├─ Layer 4: Frontend Components (RED → GREEN → REFACTOR with UX guidance)
        └─ All tests passing, Code review approved
        ↓
BDD Testing & Validation (BA Agent)
        ├─ Execute Gherkin scenarios on real data
        ├─ Validate against acceptance criteria
        ├─ Test with production-like environment
        └─ Approve or Request Changes
        ↓
Code Commit & Quality Gate (Dev-Lead Agent)
        ├─ IF tests passing: Commit code to feature branch
        ├─ IF tests failing: Return to Dev-TDD with feedback
        ├─ Code review & architectural validation
        └─ Merge to main branch
        ↓
Feature Complete & Ready for Deployment
```

---

## Key Summary

This workflow schematizes the complete interaction between all agents:

- **PM Agent**: Discusses with PO and BA agents to plan and validate sprint iterations
- **PO Agent**: Orchestrates feature prioritization and requirements
- **BA Agent**: Provides user-stories and BDD Gherkin feature files as key inputs
- **Dev-Lead Agent**: Plans order and priority for user-stories, triggers Dev-TDD agent for breakdown
- **Dev-TDD Agent**: Tackles each user-story layer by layer (DB → Backend → Config → Frontend) using TDD cycles
- **Dev-TDD Red/Green/Refactor Agents**: Execute the test-first development approach
- **UX Agent**: Provides UI templates and design specifications for frontend tasks
- **Dev-TDD Agent**: Ensures developers respect navigation rules and architecture documents
- **Dev-Lead Agent**: Verifies code quality, updates [coding.instructions.md](../instructions/coding.instructions.md) for continuous improvement
- **BA Agent**: Tests BDD scenarios on the application with real-world data
- **Dev-Lead Agent**: Commits code when user-story is marked "implemented"

---

## Detailed Phases

The complete workflow execution happens in 5 coordinated phases:

### PHASE 1: SPRINT PLANNING
- PM, PO, BA, and Dev-Lead coordinate sprint scope and feasibility
- Input: user-stories.md, test-strategies.md, architecture-design.md, tech-spec.md
- Output: Sprint backlog approved and ready for execution

### PHASE 2: USER STORY BREAKDOWN & ASSIGNMENT
- Dev-Lead creates GitHub Issues with complete layer breakdown
- Documents acceptance criteria, BDD scenarios, and implementation requirements
- References architecture-design.md and design-systems.md
- Assigns to Dev-TDD Agent with detailed feedback

### PHASE 3: TDD DEVELOPMENT EXECUTION
- Dev-TDD Agent orchestrates development in 4 layers:
  1. **Layer 1: Database** (schemas, migrations, indexes)
  2. **Layer 2: Backend** (APIs, services, business logic)
  3. **Layer 3: Configuration** (environment, integration, feature flags)
  4. **Layer 4: Frontend** (Angular components, services, UI with UX guidance)
- Each layer uses RED → GREEN → REFACTOR cycle
- All tests must pass before moving to next layer
- Code committed after each layer completion

### PHASE 4: BDD TESTING & VALIDATION
- BA Agent executes Gherkin scenarios against implemented feature
- Uses real test data and production-like environment
- Validates against acceptance criteria from user-stories.md
- Either approves feature as "implemented" or returns with detailed failure feedback

### PHASE 5: CODE QUALITY & COMMIT
- Dev-Lead verifies code quality against coding.instructions.md
- Validates architecture compliance and design system usage
- Either approves code for merge or returns with detailed feedback
- When approved, creates PR, merges to main, and closes GitHub Issue
- If issues found, updates coding.instructions.md to prevent recurrence

---

## Workflow Details by Phase

For complete details on each phase including specific agent invocations, quality gates, and input/output documents, see the detailed sections that follow this summary.
