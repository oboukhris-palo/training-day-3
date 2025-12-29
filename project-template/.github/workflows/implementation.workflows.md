# Implementation Workflow

## Overview

This document defines the **Implementation & Development Execution Workflow** - the detailed process for converting completed PRD documents (from [documents.workflows.md](.github/workflows/documents.workflows.md)) into implemented, tested, and validated features. 

This workflow orchestrates the interaction between all development agents to execute User Stories through coordinated TDD cycles, BDD testing, and quality validation. Epics serve as organizational groupings of User Stories - an Epic is considered complete when all of its User Stories are implemented.

**Prerequisite**: All PDLC stages (1-6) must be completed with approved documents:
- ✅ requirements.md (business requirements) - stored in `/docs/prd/`
- ✅ personas.md (user archetypes) - stored in `/docs/prd/`
- ✅ **user-stories.md** (PRD document) - stored in `/docs/prd/`
  - Created during PDLC Stage 4
  - Epics section: Feature groupings and boundaries
  - User Stories section: Individual stories grouped under their parent epic
  - Contains BDD scenarios for each user story
  - **Read-only reference** for implementation
- ✅ **user-stories.md** (status tracking) - stored in `/docs/user-stories/`
  - ⭐ **SINGLE SOURCE OF TRUTH** for implementation status
  - Mirrors structure from `/docs/prd/user-stories.md`
  - Adds status tracking: Not Started / In Progress / In Review / Implemented
  - **Synchronized with issue tracker** - reflects current implementation state
  - **Orchestrator checks this file** to determine which user-story to tackle next
  - **Updated by agents** as stories progress through phases
- ✅ architecture-design.md (system design) - stored in `/docs/prd/`
- ✅ tech-spec.md (implementation specifications) - stored in `/docs/prd/`
- ✅ design-systems.md (UI components and design tokens) - stored in `/docs/design/`
- ✅ test-strategies.md (testing approach) - stored in `/docs/prd/`
- ✅ BDD scenarios (Gherkin feature files from user stories)

**Folder Structure**:
```
/docs/
  ├── prd/                          # All PRD documents
  │   ├── requirements.md
  │   ├── personas.md
  │   ├── user-stories.md           # PRD: All epics & user stories (created in PDLC Stage 4)
  │   ├── architecture-design.md
  │   └── tech-spec.md
  ├── user-stories/                 # User story implementation tracking
  │   ├── user-stories.md           # ⭐ SINGLE SOURCE OF TRUTH for implementation status
  │   │                             # Mirrors /docs/prd/user-stories.md structure
  │   │                             # Adds: Not Started / In Progress / In Review / Implemented
  │   │                             # Synchronized with issue tracker
  │   │                             # Orchestrator checks this to determine next work
  │   └── <USER-STORY-REF>/         # Individual story folders (e.g., US-001/)
  │       ├── implementation-plan.md # Layer breakdown and technical approach
  │       └── bdd-scenarios/        # Story-specific BDD feature files
  └── design/                       # UX/UI design documents and design systems
```

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
(/docs/prd/requirements.md, /docs/prd/user-stories.md with epics & BDD scenarios,
/docs/prd/architecture-design.md, /docs/prd/tech-spec.md, 
/docs/design/design-systems.md, /docs/prd/test-strategies.md)
        ↓
Create /docs/user-stories/user-stories.md (status tracking mirror)
        ↓
Epic Review & User Story Sequencing (PM + PO + BA + Dev-Lead via handoffs)
        ├─ 🔄 PM hands off to → PO for epic priority
        ├─ 🔄 PO hands off to → BA for story validation  
        ├─ 🔄 BA hands off to → Dev-Lead for technical sequencing
        ├─ 🎯 ANNOUNCE: "Ready to sequence [X] user stories for implementation"
        ├─ Epics are organizational groupings (not work units)
        ├─ User-Stories are the granulation level for implementation
        ├─ Each story already has BDD scenarios attached (from Stage 3)
        ├─ Determine story implementation order
        └─ Epic completion = ALL its child stories completed
        ↓
Sprint Planning (PM + PO + BA + Dev-Lead via handoffs)
        ├─ 🎯 ANNOUNCE: "Ready to plan sprint. Choose approach: Conservative/Balanced/Stretch"
        ├─ Select User-Stories for sprint (ONE AT A TIME implementation)
        ├─ Conservative: 3-5 stories | Balanced: 6-8 stories | Stretch: 9+ stories
        ├─ (Each story has BDD scenarios attached)
        ├─ Stories grouped by epic for context
        ├─ Estimate story-level effort
        ├─ Each story = full 4-layer implementation before next story
        └─ 🔄 Hand off to → Dev-Lead for implementation planning
        ↓
BDD Integration & User Story Breakdown (Dev-Lead) ← CRITICAL PHASE
        ├─ For each story: Extract Gherkin BDD scenarios
        ├─ Create feature files in project
        ├─ Create step definition stubs with API/component calls
        ├─ Run BDD tests → THEY FAIL (expected - endpoints don't exist)
        ├─ Document layers needed to make BDD tests pass
        ├─ Create GitHub Issue per STORY (tagged with parent epic)
        └─ Assign failing BDD tests + layers to Dev-TDD Agent
        ↓
TDD Development Cycle (Dev-TDD Agent - ONE STORY AT A TIME) ← DRIVEN BY BDD
        ├─ Layer 1: Database (implement until DB BDD assertions pass)
        ├─ Layer 2: Backend (implement until backend BDD assertions pass)
        ├─ Layer 3: Configuration (implement until config BDD assertions pass)
        ├─ Layer 4: Frontend (implement until UI BDD assertions pass)
        ├─ TDD RED → GREEN → REFACTOR driven by failing BDD assertions
        ├─ All BDD tests passing locally
        └─ Story marked "In Review"
        ↓
BDD Testing & Validation (BA Agent) ← FULL ENVIRONMENT VALIDATION
        ├─ Execute same Gherkin scenarios in real environment
        ├─ Use real test data, real database
        ├─ Verify story acceptance criteria met
        ├─ If all epic's stories done: test epic-level integration
        └─ Approve story or return with feedback
        ↓
Code Quality & Commit (Dev-Lead Agent)
        ├─ Verify code quality vs coding.instructions.md
        ├─ Validate architecture compliance
        ├─ When epic all-stories-complete: verify epic integration
        ├─ Merge to main, mark story "Implemented"
        └─ Mark epic "Implemented" (if all its stories are done)
        ↓
Move to Next User-Story in Sprint
        (Repeat for each user-story until sprint complete)
```

**Key Point**: Work happens at **user-story level**. BDD scenarios are the **entry point** (Phase 2) that **drive TDD implementation** (Phase 3). When you complete all user-stories belonging to an epic, the epic is automatically considered "Implemented".

---

## Key Summary

This workflow orchestrates development at the **user-story level** with epics as organizational groupings:

- **PM Agent**: Coordinates with PO and BA to sequence user-stories and plan sprints (organizing by epic for context)
- **PO Agent**: Defines epics as feature groupings and ensures user-stories support epic goals
- **BA Agent**: Provides user-stories and BDD scenarios; validates story implementation in Phase 4
- **Dev-Lead Agent**: 
  - In Phase 0-1: Helps sequence stories and plan sprints
  - In Phase 2: Creates GitHub Issues for individual stories, tagging with parent epic
  - In Phase 5: Approves code and marks stories complete; marks epic "Implemented" when all its stories are done
- **Dev-TDD Agent**: Implements **one user-story at a time** through 4 layers using TDD cycles
- **UX Agent**: Provides UI/component specifications for frontend stories
- **BA Agent**: Tests each story's BDD scenarios and validates acceptance criteria

**Critical Concept**: 
- **Epics are organizational groupings**, not units of work
- **User-stories are the granulation level** for development assignment and completion
- **Epic completion is automatic**: When ALL user-stories in an epic are implemented, the epic is marked "Implemented"
- Each developer works on **one story at a time**, not a whole epic

---

## Detailed Phases

The complete workflow execution happens in 6 coordinated phases:

### PHASE 0: EPIC REVIEW & USER STORY SEQUENCING
- PM, PO, BA, and Dev-Lead review epics and user-stories from **`/docs/prd/user-stories.md`** (PRD reference)
- **Check current status** in **`/docs/user-stories/user-stories.md`** (status tracking): Which stories are "Not Started", "In Progress", "In Review", "Implemented"
- Validate epic scope as groupings of related user-stories
- **KEY CONCEPT**: Epics are organizational containers - we implement **USER STORIES**, not epics directly
- Determine implementation sequence for "Not Started" stories by:
  - User-story business priority
  - Epic dependencies (stories from one epic may block stories from another)
  - Resource availability
  - Risk mitigation strategy
  - Technical sequencing requirements
- Note: Epic completion is **automatic** when all its child user-stories are marked "Implemented"
- Input: `/docs/prd/user-stories.md` (PRD reference), `/docs/user-stories/user-stories.md` (current status), requirements.md, architecture-design.md
- Output: User-story implementation sequence approved (stories grouped by epic for context), `/docs/user-stories/user-stories.md` updated with planned sequence
- Outcome: Team understands which stories to implement in what order and which epic they belong to; orchestrator knows where to resume

### PHASE 1: SPRINT PLANNING
- PM, PO, BA, and Dev-Lead coordinate sprint scope and feasibility
- Select **user-stories** from `/docs/user-stories/user-stories.md` with status "Not Started" for current sprint
- Update status to "In Progress" for stories selected in sprint
- Estimate **user-story**-level effort and complexity (not epic effort - epics are groupings)
- Ensure interdependent stories from same epic are included together when possible
- **Update `/docs/user-stories/user-stories.md`** to reflect sprint assignments and status changes
- Input: `/docs/user-stories/user-stories.md` with sequencing from Phase 0, test-strategies.md, architecture-design.md, tech-spec.md
- Output: Sprint backlog approved with user-stories ready for execution (grouped by epic for visualization), user-stories.md updated with "In Progress" status
- Outcome: Team knows which user-stories to implement this sprint; orchestrator tracks progress via user-stories.md; issue tracker synchronized

### PHASE 2: USER STORY BREAKDOWN & BDD INTEGRATION BY DEV-LEAD
- Dev-Lead takes each **user-story** selected in sprint (which already has BDD scenarios attached)
- For each user-story:
  - Create GitHub Issue (tag with parent epic label for tracking)
  - **Extract and integrate BDD/Gherkin scenarios into project**:
    - Create feature file (e.g., `features/auth/login.feature`) with Gherkin scenarios
    - Create step definition stubs that implement scenario steps (Given, When, Then)
    - Step implementations call actual API endpoints/services with scenario input parameters
    - Step implementations perform assertions/validations with expected results
  - **Run BDD tests** - they FAIL at this point (endpoints/components don't exist)
  - **Generate implementation plan document** at `/docs/user-stories/<USER-STORY-REF>/implementation-plan.md`:
    - Layer 1 (Database): Tables, columns, indexes, migrations, models needed
    - Layer 2 (Backend): API endpoints, services, business logic, validation rules
    - Layer 3 (Configuration): Routes, DI containers, feature flags, environment variables
    - Layer 4 (Frontend): Components, state management, API integration, styling
    - For each layer: List specific files to create/modify, TDD approach, BDD test coverage
    - Include architectural constraints from `/docs/prd/architecture-design.md`
    - Include technical specifications from `/docs/prd/tech-spec.md`
    - Include design requirements from `/docs/design/design-systems.md`
  - Establish architectural requirements from design-systems.md and tech-spec.md
  - **Assign failing BDD tests + implementation plan to Dev-TDD Agent** - one story at a time
  - Include: "Make these failing BDD tests pass by following implementation-plan.md"
  - Include epic context: "This story is part of Epic: [Epic Name]"
- Key Point: **BDD tests are the entry point**, **implementation plan is the roadmap** that drive TDD implementation
- Input: User-stories selected in Phase 1 (from `/docs/prd/user-stories.md` with BDD scenarios), `/docs/prd/architecture-design.md`, `/docs/prd/tech-spec.md`, `/docs/design/design-systems.md`
- Output: GitHub Issues with integrated failing BDD tests + detailed implementation plans in `/docs/user-stories/<USER-STORY-REF>/implementation-plan.md`
- Outcome: Clear failing test requirements + structured layer breakdown drive TDD RED → GREEN → REFACTOR cycles

### PHASE 3: TDD DEVELOPMENT EXECUTION (DRIVEN BY BDD TESTS + IMPLEMENTATION PLAN)
- Dev-TDD Agent implements **ONE user-story at a time** in 4 layers, **guided by implementation plan** and **driven by failing BDD tests**:
  - **Reference Document**: `/docs/user-stories/<USER-STORY-REF>/implementation-plan.md` (layer breakdown, files, approach)
  1. **Layer 1: Database** (schemas, migrations, indexes) - follow implementation plan, implement until DB-related BDD test steps pass
  2. **Layer 2: Backend** (APIs, services, business logic) - implement until backend BDD test steps pass
  3. **Layer 3: Configuration** (environment, integration, feature flags) - implement until configuration BDD test steps pass
  4. **Layer 4: Frontend** (UI components, services, styling) - implement until UI BDD test steps pass
- For each layer:
  - Run BDD tests to see which assertions are failing
  - **RED**: Write failing unit/integration test supporting BDD step assertions
  - **GREEN**: Implement minimal code to make BDD test assertions pass
  - **REFACTOR**: Clean up code while BDD tests stay passing
- BDD tests are the acceptance criteria - all BDD scenarios must pass before layer is complete
- All tests (BDD + unit + integration) must pass before moving to next layer
- Code committed after each layer completion with BDD test results
- Update GitHub Issue with progress: "Layer N complete, BDD test Y passing"
- **Update status in `/docs/user-stories/user-stories.md` to "In Review"** when all layers complete
- Epic context (which epic this story belongs to) is noted for integration testing in Phase 4
- Input: GitHub Issue with integrated, failing BDD tests + layers to implement, architecture specs, design-systems.md
- Output: Implemented and tested code for one user-story, **all BDD scenarios passing**, status "In Review" in user-stories.md
- Outcome: Story marked "In Review" in user-stories.md and GitHub Issue, BDD tests pass, ready for Phase 4 validation

### PHASE 4: BDD TESTING & VALIDATION
- BA Agent executes the same Gherkin scenarios that were already integrated by Dev-Lead in Phase 2
- Uses real test data and production-like environment
- Validates that **all BDD scenarios pass** with real application behavior (not just unit tests)
- Verifies user-story acceptance criteria through executable BDD tests
- When multiple stories from same epic are completed: also tests them together to ensure epic-level feature works
- Either approves story (ready for Phase 5) or returns to Dev-TDD with detailed feedback (scenarios failing - status reverts to "In Progress")
- Mark GitHub Issue as "Validated" when approved
- **Keep status as "In Review"** in `/docs/user-stories/user-stories.md` - will be updated to "Implemented" in Phase 5 after code review
- Input: Implemented code for user-story with passing BDD tests from Phase 3, acceptance criteria
- Output: Story validated and approved (BDD scenarios pass in full environment), or issues identified for rework
- Outcome: Confidence that user-story works correctly and meets all acceptance criteria; partial confidence in epic feature (more stories may be pending)

### PHASE 5: CODE QUALITY & COMMIT
- Dev-Lead verifies code quality against coding.instructions.md
- Validates architecture compliance and design system usage
- When this story completes an epic (all sibling stories in same epic are also completed):
  - Verifies epic-level integration (all stories in epic work together correctly)
  - Validates data flows between stories within the epic
  - **Updates `/docs/user-stories/user-stories.md` to mark epic as "Implemented"**
- Approves code for merge or returns with detailed feedback (status reverts to "In Progress" if issues found)
- When approved: creates PR, merges to main, closes GitHub Issue
- **Updates `/docs/user-stories/user-stories.md` to mark story as "Implemented"**
- **Synchronizes with issue tracker** - story marked complete
- If issues found: updates coding.instructions.md to prevent recurrence
- **Epic Completion Status**: An epic is marked "Implemented" in user-stories.md ONLY when ALL its user-stories are marked "Implemented"
- **Orchestrator reads user-stories.md** to determine next story to tackle
- Input: Validated code from Phase 4, quality metrics, architecture compliance, current `/docs/user-stories/user-stories.md`
- Output: Merged code or feedback for improvement, user-stories.md updated with "Implemented" status
- Outcome: User-story integrated into main and marked "Implemented" in user-stories.md; if all epic stories are done, epic also marked "Implemented"; orchestrator knows current state

---

## Workflow Details by Phase

For complete details on each phase including specific agent invocations, quality gates, and input/output documents, see the detailed sections that follow this summary.
