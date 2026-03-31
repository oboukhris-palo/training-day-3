# User Story Folder Template

**Purpose**: This template defines the REQUIRED files for every user story folder under `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/`. Tech Lead creates these files upfront (skeleton stubs); agents populate them as they work.

---

## Folder Structure (Create Upfront)

```
/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/
├── <US-REF>.md                          # Story definition + acceptance criteria (link to PRD version)
├── implementation-plan.md                # Concise layer-by-layer architecture (max 500 words/layer)
├── api-design.md                        # API endpoints, schemas, authentication (if applicable)
├── us-completion-checklist.md           # Definition of Done checklist
├── tdd-execution.md                     # 📋 APPEND-ONLY audit log (cycle summary table)
├── features/                            # BDD feature files (copied from project-wide /features/)
│   ├── <domain>-<story-ref>.feature     # Gherkin feature file
│   ├── <domain>-<story-ref>.steps.ts    # Step definitions and failing tests
│   └── ...
└── tdd-execution/                       # 🔄 TDD Cycle Execution Tracking (per cycle)
    ├── 001/                             # First TDD cycle
    │   ├── 001-HO-RED.json              # RED phase handoff (test written, failing)
    │   ├── 001-HO-GREEN.json            # GREEN phase handoff (code implemented, passing)
    │   └── 001-HO-REFACTOR.md           # REFACTOR phase handoff (code quality improved)
    ├── 002/                             # Second TDD cycle (if needed)
    │   ├── 002-HO-RED.json
    │   ├── 002-HO-GREEN.json
    │   └── 002-HO-REFACTOR.md
    └── [... additional cycles ...]
```

---

## File Purposes & Lifecycle

### 1. **{US-REF}.md** (Story Definition)

**Created by**: Tech Lead (skeleton, links to PRD)  
**Updated by**: No one (read-only reference to PRD version)  
**Purpose**: Single source of truth for story definition  
**Content**: Link to `/docs/01-requirements/user-stories.md#{US-REF}` + acceptance criteria

**Life Cycle**:
- Tech Lead creates stub with link
- Never modified (reference only)
- Points to canonical story in PRD

**Example**:
```markdown
# US-001: User Registration

**Source**: [/docs/01-requirements/user-stories.md#US-001](/docs/01-requirements/user-stories.md#US-001)

**Acceptance Criteria**:
1. User can register with email + password
2. System sends verification email within 60 seconds
3. Verification link expires after 24 hours

**BDD Scenarios**: See `bdd-scenarios/registration.feature`

**Acceptance**: See implementation-plan.md "Definition of Done"
```

---

### 2. **implementation-plan.md** (Architecture Blueprint)

**Created by**: Dev-Lead (Phase 3: Planning)  
**Updated by**: Never (frozen after creation - reference only)  
**Purpose**: Layer-by-layer technical approach (max 500 words per layer)  
**Content**: Layers 1-4, numbered steps, technology choices, implementation approach

**Life Cycle**:
- Dev-Lead creates during implementation planning
- Frozen after creation (reference document)
- Lives alongside story throughout development

---

### 3. **tdd-execution.md** (Append-Only Audit Log)

**Created by**: Dev-Lead (Phase 3: skeleton stub)  
**Updated by**: Dev-TDD (append after each REFACTOR completion)  
**Purpose**: Complete audit trail of all TDD cycles  
**Content**: One summary line per completed cycle (timestamp, phase, test count, coverage)

**Life Cycle**:
- Dev-Lead creates empty file with headers
- Dev-TDD appends one line after each REFACTOR complete
- NEVER delete or edit existing entries (append-only)

**Example**:
```markdown
# TDD Execution Log: US-001

| Cycle | Timestamp | Phase | Tests | Coverage | Commit | Notes |
|-------|-----------|-------|-------|----------|---------|-------|
| 001 | 2024-03-15T14:30Z | REFACTOR | 3 | 85% | abc123f | User model validation |
| 002 | 2024-03-15T16:45Z | REFACTOR | 5 | 92% | def456a | Email service integration |
```

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
