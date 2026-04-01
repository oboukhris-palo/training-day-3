# User Story Folder Template - Gen‑e2 Compliance

**Purpose**: This template defines the REQUIRED files for every user story folder under `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/`. Dev-Lead creates these files upfront; TDD agents execute against implementation-plan.md checkboxes.

---

## Required Folder Structure 

```
/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/
├── description.md                       # Single source of truth for story definition
├── implementation-plan.md               # SSOT for TDD execution with layer checkboxes  
├── plan-approval.yaml                   # Human validation gate (required before TDD)
└── bdd-scenarios/                       # BDD feature files (optional)
    └── {feature}.feature                # Gherkin scenarios
```

---

## File Purposes & Creation Rules

### 1. **description.md** (Story Definition - SSOT)

**Created by**: Dev-Lead or BA  
**Updated by**: PO/BA only (with approval)  
**Purpose**: Single source of truth for functional, non-functional, technical requirements, acceptance criteria, and optional API design  
**Content**: Complete story definition with measurable acceptance criteria

**Template Content**:
```markdown
# User Story: {US-REF}

## Story Description

**As a** [user type]
**I want** [goal/functionality]  
**So that** [business value/benefit]

## Functional Requirements

- [Specific functional requirement 1]
- [Specific functional requirement 2]
- [Specific functional requirement 3]

## Non-Functional Requirements  

- **Performance**: [Response time requirements]
- **Security**: [Authentication/authorization requirements]
- **Compatibility**: [Browser/device compatibility]
- **Accessibility**: [WCAG compliance level]

## Acceptance Criteria (Measurable)

1. **Given** [context/setup]  
   **When** [action/event]  
   **Then** [expected result/outcome]

2. **Given** [context/setup]
   **When** [action/event] 
   **Then** [expected result/outcome]

3. **Given** [context/setup]
   **When** [action/event]
   **Then** [expected result/outcome]

## API Design (if applicable)

### Endpoint
`{METHOD} /api/{resource}/{action}`

### Request Payload
```json
{
  "field1": "value",
  "field2": 123
}
```

### Response (Success)
```json
{
  "status": "success",
  "data": {
    "field1": "result",
    "field2": 456
  }
}
```

### Error Responses
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required  
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server processing error

## Technical Notes

- [Integration dependencies]
- [Data migration requirements]
- [Third-party service integrations]
- [Security considerations]

## Definition of Done

- [ ] All acceptance criteria validated
- [ ] BDD scenarios pass (if applicable)
- [ ] Code review completed
- [ ] Unit test coverage ≥ 80%
- [ ] Integration tests pass
- [ ] Security review passed (if applicable)
- [ ] Performance requirements met
- [ ] Documentation updated

---

**Story ID**: {US-REF}
**Epic**: {EPIC-REF}  
**Created**: {YYYY-MM-DD}
**Status**: Draft
**Framework**: Gen‑e2 Compliance v2.0.0
```

---

### 2. **implementation-plan.md** (TDD Execution Guide)

**Created by**: Dev-Lead  
**Updated by**: TDD agents ONLY (mark checkboxes [x] upon completion)  
**Purpose**: Layer-by-layer implementation guide with checkboxes - SSOT for TDD agent execution  
**Content**: Uses implementation-plan-tmpl.md with checkbox tasks per layer

**Key Rules**:
- TDD agents execute against checkboxes in this file
- Each checkbox represents a specific task/file to create/modify
- Mark `[ ]` as `[x]` when task completed
- BDD mapping matrix maps scenarios to layer checkboxes
- Never delete or modify existing entries (append-only mindset)

**Life Cycle**:
- Dev-Lead creates complete plan with all checkboxes unchecked `[ ]`
- plan-approval.yaml must be `approved` before TDD execution starts
- TDD agents work through checkboxes sequentially by layer
- Each completed checkbox marks progress toward story completion

---

### 3. **plan-approval.yaml** (Human Validation Gate)

**Created by**: Dev-Lead (automatically when implementation-plan.md created)  
**Updated by**: Dev-Lead or authorized reviewer  
**Purpose**: Human validation gate that blocks TDD execution until approved  
**Content**: Uses plan-approval-tmpl.yaml format

**Status Values**:
- `changes-requested`: TDD BLOCKED, plan needs revision
- `approved`: TDD execution can proceed  
- `revoked`: Auto-set when plan modified after approval

**Approval Checklist** (in YAML file):
```yaml
status: changes-requested  # approved | changes-requested | revoked
reviewer: {reviewer-name}
review_date: {YYYY-MM-DD}
approval_checklist:
  architecture_follows_layers: false
  bdd_scenarios_mapped: false  
  dependencies_documented: false
  database_migrations_ordered: false
  business_logic_addressed: false
  error_handling_defined: false
comments: |
  - Review feedback item 1
  - Review feedback item 2
```

**Critical Rule**: TDD agents MUST validate plan-approval.yaml status = "approved" before starting any implementation work.

---

### 4. **bdd-scenarios/** (Optional BDD Test Files)

**Created by**: BA or Dev-Lead  
**Updated by**: BA (scenarios), Dev-TDD (step implementations)  
**Purpose**: Executable BDD specifications that drive TDD implementation  
**Content**: Gherkin feature files with scenarios

**Structure**:
```
bdd-scenarios/
├── {feature-name}.feature           # Gherkin scenarios
└── {feature-name}.steps.{ext}       # Step definitions (if needed)
```

**Usage**:
- BDD scenarios define WHAT should work
- implementation-plan.md defines HOW to build it
- BDD mapping matrix connects scenarios to implementation checkboxes
- TDD agents implement to make BDD scenarios pass

---

## Workflow Integration

### Creation Sequence (Dev-Lead)
1. Create `description.md` with complete story definition
2. Create `implementation-plan.md` using implementation-plan-tmpl.md  
3. Auto-create `plan-approval.yaml` with status `changes-requested`
4. Create `bdd-scenarios/` if BDD approach used
5. Review implementation plan and mark plan-approval.yaml as `approved`

### Execution Sequence (TDD Agents)
1. **Validation**: Check plan-approval.yaml status = "approved"
2. **Layer 1**: Execute Database & Domain Model checkboxes
3. **Layer 2**: Execute Backend Services & API checkboxes  
4. **Layer 3**: Execute Configuration & Integration checkboxes
5. **Layer 4**: Execute Frontend & Components checkboxes
6. **Validation**: Verify all BDD scenarios pass and acceptance criteria met

### Quality Gates  
- TDD execution BLOCKED if plan-approval.yaml ≠ "approved"
- Layer N+1 BLOCKED until Layer N checkboxes 100% complete
- Story completion BLOCKED until all checkboxes marked [x]
- Story acceptance BLOCKED until all acceptance criteria validated

---

## Anti-Patterns (Do NOT Create)

❌ **{US-REF}.md** - Use `description.md` instead  
❌ **tdd-execution.md** - Execution tracked via implementation-plan.md checkboxes  
❌ **us-completion-checklist.md** - Definition of Done in description.md  
❌ **handoff.json** - Not needed in Gen‑e2 compliance model  

---

**Framework**: Gen‑e2 Compliance v2.0.0  
**Template**: User Story Folder Structure  
**Usage**: Dev-Lead creates folder structure; TDD agents execute against checkboxes

---

### 4. **tdd-execution/<CYCLE>/** (Detailed Cycle Handoffs)

**Created by**: Dev-TDD (before RED phase of each cycle)  
**Updated by**: Dev-TDD (after each phase: RED→GREEN→REFACTOR)  
**Purpose**: Detailed context for each TDD phase  
**Content**: Phase-specific handoffs with exact context, files, next steps

**Life Cycle**:
- Dev-TDD creates cycle folder before starting RED
- Creates `<CYCLE>-HO-RED.json` after RED complete
- Creates `<CYCLE>-HO-GREEN.json` after GREEN complete  
- Creates `<CYCLE>-HO-REFACTOR.md` after REFACTOR complete
- Folder becomes read-only historical record

**Example Structure**:
```
tdd-execution/
├── 001/
│   ├── 001-HO-RED.json      # "Test written, failing assertion ready"
│   ├── 001-HO-GREEN.json    # "Minimal code, test passing"
│   └── 001-HO-REFACTOR.md   # "Quality improved, ready for next cycle"
└── 002/
    ├── 002-HO-RED.json      # Next feature test written
    ├── 002-HO-GREEN.json    # Next feature implemented  
    └── 002-HO-REFACTOR.md   # Quality pass completed
```

**Life Cycle**:
- Tech Lead writes concise plan with:
  - Layer 1-4 sections (each ≤500 words)
  - Files to create, BDD coverage, TDD approach, constraints
  - Definition of Done (cumulative)
- TDD agents reference during RED-GREEN-REFACTOR
- Stays frozen (no updates during execution)

**Example Structure**:
```markdown
# Implementation Plan: US-001 User Registration

## Header (100 words max)
- Story: US-001 User Registration
- Epic: Authentication (User Access Control)
- BDD Scenarios: features/auth/registration.feature (lines 5-45)
- Failing Tests: 3 scenarios needing implementation

**Key Timeline**: Layer 1 (2h) → Layer 2 (4h) → Layer 3 (1h) → Layer 4 (3h)

---

## Layer 1 - Database (500 words max)

**Goal**: Create users table with secure schema

**Files to Create**:
- Migration: `/src/db/migrations/001_create_users_table.ts`
- Model: `/src/models/User.ts`
- Test: `/src/models/__tests__/User.test.ts`

**BDD Test Coverage** (Which assertions pass after Layer 1):
- ✅ "User table stores email and password hash"
- ✅ "User email is unique (constraint prevents duplicates)"
- ✅ "User.id is UUID (not auto-increment)"

**TDD Approach**:
1. RED: Test User.create() with valid data → fails
2. GREEN: Implement migration + model
3. REFACTOR: Extract password hashing, add JSDoc

**Architectural Constraints**:
- Use Sequelize ORM (from architecture-design.md)
- Password must be bcrypt hash, never plaintext
- Email field unique at DB level
- ID field as UUID primary key

**Estimated Complexity**: 3 story points (2 hours)

---

## Layer 2 - Backend (500 words max)

**Goal**: Create POST /api/auth/register endpoint

**Files to Create**:
- Controller: `src/controllers/AuthController.ts`
- Service: `src/services/AuthService.ts`
- DTO: `src/dtos/RegisterRequest.ts`, `RegisterResponse.ts`
- Middleware: `src/middleware/ValidationMiddleware.ts`
- Test: `src/services/__tests__/AuthService.test.ts`

**BDD Test Coverage** (Assertions now passing):
- ✅ Previous Layer 1 assertions still passing
- ✅ "POST /api/auth/register returns 201 Created"
- ✅ "Response includes user object with ID and email"
- ✅ "Password never returned in response"
- ✅ "Duplicate email returns 409 Conflict"

**TDD Approach**:
1. RED: Integration test for POST /api/auth/register → fails
2. GREEN: Implement AuthService.register() + AuthController
3. REFACTOR: Extract validation, improve error messages

**Architectural Constraints**:
- JWT token generation (from tech-spec.md)
- bcrypt with 10 salt rounds (from security spec)
- Rate limiting: 5 attempts per hour per IP
- Email validation: RFC 5322 basic check

**Estimated Complexity**: 5 story points (4 hours)

---

## Layer 3 - Configuration (500 words max)

[Similar structure...]

---

## Layer 4 - Frontend (500 words max)

[Similar structure...]

---

## Implementation Sequence

1. Layer 1 (Database) MUST complete before Layer 2
2. Layer 2 (Backend) MUST complete before Layer 3
3. Layer 3 (Config) MUST complete before Layer 4
4. Layer 4 is independent (no blocking)

**Parallel Opportunities**: None for this story (sequential)

---

## Definition of Done (Cumulative)

- ✅ All BDD scenarios in `bdd-scenarios/` passing
- ✅ Test coverage > 80% (all layers)
- ✅ Cyclomatic complexity < 10 (all layers)
- ✅ Code review approved (13-point checklist)
- ✅ Zero critical security issues
- ✅ Performance targets met (all endpoints <500ms)
- ✅ Design system compliance (frontend components)
- ✅ Merged to main branch
```

**Word Count Enforcement**:
- Header: ~100 words
- Each Layer: ~400-500 words
- Sequence: ~100 words
- Total: ~2,000 words (concise, not verbose)

---

### 5. **features/** (BDD Feature Files)

**Created by**: Dev-Lead (copies from project-wide `/features/`)
**Updated by**: Dev-TDD (as new scenarios identified during RED phase)  
**Purpose**: BDD feature files specific to this story
**Content**: Gherkin scenarios that drive TDD implementation

**Life Cycle**:
- Dev-Lead copies relevant feature files during story setup
- Dev-TDD may add new scenarios during RED phases
- Files become source of truth for test assertions

**Example Structure**:
```
features/
├── auth-tier-sync.feature       # Copied from /features/auth/
├── user-registration.feature    # Copied from /features/auth/
└── subscription-sync.feature    # Added during Cycle 3 (new requirement discovered)
```

**Created by**: Tech Lead (skeleton)  
**Updated by**: TDD agents append after each cycle phase  
**Purpose**: Complete, immutable audit trail  
**Lifecycle**: APPEND-ONLY (never delete, never overwrite)

**Append Pattern**:
```
Each TDD phase (RED, GREEN, REFACTOR) appends ONE entry:

## Cycle 5: RED Phase
- Time: 2026-02-05 10:30 UTC
- Outcome: ✅ Test fails
- Commit: TDD-US-001-RED-5

## Cycle 5: GREEN Phase
- Time: 2026-02-05 11:15 UTC
- Outcome: ✅ Tests passing
- Commit: TDD-US-001-GREEN-5

## Cycle 5: REFACTOR Phase
- Time: 2026-02-05 11:45 UTC
- Outcome: ✅ Improved code quality
- Commit: TDD-US-001-REFACTOR-5

[NEXT CYCLE APPENDS BELOW - existing entries stay intact]
```

---

### 5. **bdd-scenarios/** (Feature Files)

**Created by**: Dev-Lead during Phase 1 (BDD Integration)  
**Content**: Copies of feature files from `features/` directory  
**Purpose**: Reference for TDD agents; single source of truth is in `features/`

**Example**:
```
bdd-scenarios/
├── registration.feature         (Copy from features/auth/registration.feature)
├── email-verification.feature   (Copy from features/auth/email-verification.feature)
└── login.feature                (Copy from features/auth/login.feature)
```

---

### 6. **code-review-report.md** (Generated After Layer Complete)

**Created by**: REFACTOR agent after final REFACTOR phase for layer  
**Purpose**: Detailed code review against 13-point checklist (coding.instructions.md)

**Content**:
```markdown
# Code Review Report: US-001 Layer 2 (Backend)

## 13-Point Checklist

1. **SOLID Principles** ✅
   - Single Responsibility: Each class has one reason to change
   - Open/Closed: New validation rules extend without modifying existing code
   - Liskov Substitution: All implementations follow contract
   - Interface Segregation: Small, focused interfaces
   - Dependency Inversion: Depends on abstractions, not concretions

2. **Test Coverage** ✅ 94%
   - Happy path: User registration with valid data
   - Error paths: Duplicate email, invalid format
   - Edge cases: Empty fields, special characters

[... rest of 13 points ...]

## Issues Found

### Critical (0)
None

### High (0)
None

### Medium (1)
- Missing error logging in AuthService.register() → Recommend adding winston logger

### Low (2)
- JSDoc could be more detailed for DTO classes
- Consider extracting magic number (5 rate limit) to config constant

## Overall Assessment

**Status**: ✅ APPROVED FOR MERGE

**Summary**: Code quality is excellent. All SOLID principles followed. Test coverage 94% (exceeds 80% target). Complexity within limits (max 7, target <10). No critical or high issues. Ready for production.

**Approved By**: dev-tdd-refactor  
**Date**: 2026-02-05 12:00 UTC
```

---

## File Creation Checklist (Dev-Lead)

Before handing off to TDD agents, Dev-Lead ensures:

```
✅ Created folder: /docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/
✅ Created <US-REF>.md (link to PRD, acceptance criteria)
✅ Created implementation-plan.md (500 words/layer max)
✅ Created api-design.md (if applicable)
✅ Created us-completion-checklist.md (DoD criteria)
✅ Created tdd-execution.md (empty audit log with headers)
✅ Created features/ folder
✅ Copied relevant feature files to features/
✅ Created tdd-execution/ folder for cycle handoffs
✅ All skeleton files ready for population
✅ implementation-plan.md references tech-spec.md constraints
✅ Folder structure matches this template exactly
```

---

## Key Rules for Agents

### TDD Cycle Handoff Rules
- ✅ Create nested cycle folder: `tdd-execution/<CYCLE>/`
- ✅ Create phase-specific handoffs: `<CYCLE>-HO-RED.json`, `<CYCLE>-HO-GREEN.json`, `<CYCLE>-HO-REFACTOR.md`
- ✅ Each handoff file is permanent historical record
- ✅ Include comprehensive context for next phase/cycle
- ❌ Overwrite existing handoff files
- ❌ Create flat structure (no direct cycle files in story root)

### tdd-execution.md Rules  
- ✅ APPEND new summary line after each REFACTOR completion
- ✅ ONE summary line per completed cycle
- ✅ Include: cycle number, timestamp, tests, coverage, commit SHA, notes
- ✅ Never delete or overwrite existing entries (audit trail)
- ✅ Provide high-level progress tracking for PM/stakeholders
- ❌ Include detailed phase information (that's in cycle folders)

### Git Commit Message Rules
```
TDD-<US-REF>-<PHASE>-<CYCLE>: [Description]

Examples:
- TDD-US-001-RED-5: Write failing test for tier sync
- TDD-US-001-GREEN-5: Implement UserTierSyncService.sync()  
- TDD-US-001-REFACTOR-5: Extract tierSync utility, improve naming
```

---

## Folder Lifecycle Example

### T=0 (Dev-Lead - Phase 3, Implementation Planning)
```
Dev-Lead creates:
/docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/
├── US-001.md (stub: link to PRD)
├── implementation-plan.md (500 words per layer)
├── api-design.md (if applicable)
├── us-completion-checklist.md (DoD criteria)
├── tdd-execution.md (empty audit log with headers)
├── features/
│   ├── registration.feature (copied from project /features/)
│   └── email-verification.feature
└── tdd-execution/  # Empty folder ready for cycles
```

### T=1h (Dev-TDD RED - Cycle 1, Layer 1)
```
Dev-TDD RED:
1. Creates tdd-execution/001/ folder
2. Reads implementation-plan.md Layer 1
3. Writes failing test in UserRepository.test.ts
4. Creates 001-HO-RED.json with test context and next steps
5. Commits: TDD-US-001-RED-1: Write failing test for User creation
```

### T=2h (Dev-TDD GREEN - Cycle 1, Layer 1)  
```
Dev-TDD GREEN:
1. Reads tdd-execution/001/001-HO-RED.json for context
2. Implements minimal UserRepository.ts to make tests pass
3. Creates 001-HO-GREEN.json with implementation details
4. Commits: TDD-US-001-GREEN-1: Implement UserRepository creation
```

### T=3h (Dev-TDD REFACTOR - Cycle 1, Layer 1)
```
Dev-TDD REFACTOR:
1. Reads tdd-execution/001/001-HO-GREEN.json for optimization targets
2. Refactors UserRepository.ts, extracts password utility
3. Creates 001-HO-REFACTOR.md with quality improvements summary
4. Appends summary line to tdd-execution.md (audit log)
5. Commits: TDD-US-001-REFACTOR-1: Extract password hashing utility
```

### T=4h (Dev-TDD RED - Cycle 2, Layer 1)
```
Dev-TDD RED starts new cycle:
1. Creates tdd-execution/002/ folder
2. Reads implementation-plan.md Layer 1 (next behavior/edge case)
3. Writes failing test for email validation edge case
4. Creates 002-HO-RED.json with test details
5. Commits: TDD-US-001-RED-2: Test email validation edge cases
[Continue: GREEN → REFACTOR → next cycle...]
```

### T=∞ (After All Cycles Complete)
```
/docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/
├── US-001.md (unchanged reference)
├── implementation-plan.md (frozen reference)
├── api-design.md (if created)
├── us-completion-checklist.md (for QA validation)
├── tdd-execution.md (append-only audit log: ~15 summary lines)
├── features/ (BDD files - may have grown)
│   ├── registration.feature
│   └── email-verification.feature
└── tdd-execution/
    ├── 001/
    │   ├── 001-HO-RED.json (historical record)
    │   ├── 001-HO-GREEN.json
    │   └── 001-HO-REFACTOR.md
    ├── 002/
    │   ├── 002-HO-RED.json  
    │   ├── 002-HO-GREEN.json
    │   └── 002-HO-REFACTOR.md
    └── [... up to cycle N]

tdd-execution.md contains:
- One summary line per cycle (not per phase)
- High-level progress tracking for PM/stakeholders
- Commit SHAs, test coverage, major decisions
- Ready for retrospective analysis and auditing
```
```

---

## Benefits of This Structure

| Aspect | Benefit |
|--------|---------|
| **Document Consolidation** | No sprawl: 1 handoff + 1 log instead of cycle-* files |
| **Auditability** | tdd-execution.md is complete audit trail (immutable) |
| **Clarity** | handoff.md always shows current cycle state (current snapshot) |
| **Stakeholder Visibility** | tdd-execution.md shows full journey; can generate summary report |
| **Git Simplicity** | Commit messages linked to handoff/execution entries |
| **Scalability** | Works for 1 story or 100 stories; structure is consistent |
| **Traceability** | Code → BDD scenario → Layer → Cycle → Commit → Entry in log |

---

## Summary

**Create Upfront (Tech Lead)**:
- ✅ Folder `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/`
- ✅ 5 files: {US-REF}.md, implementation-plan.md, handoff.md, tdd-execution.md, bdd-scenarios/

**Agents Populate During TDD**:
- OVERWRITE: handoff.md (after each phase)
- APPEND: tdd-execution.md (after each phase)
- GENERATE: code-review-report.md (after each layer REFACTOR)

**Never Create**:
- ❌ cycle-specific files (cycle-5-handoff.md, red-handoff.md)
- ❌ per-agent files (dev-tdd-red-notes.md, dev-tdd-green-notes.md)
- ❌ phase-specific logs (red-log.md, green-log.md, refactor-log.md)

**Result**: Clean, auditable, scalable structure with ZERO document sprawl.
