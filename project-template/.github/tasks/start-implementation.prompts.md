# Start Implementation Workflow - Interactive Launcher

**Purpose**: Launch development execution workflow from completed PDLC documents through tested, production-ready code

**Workflow Reference**: [.github/workflows/implementation.workflows.md](/.github/workflows/implementation.workflows.md)

**Orchestrator Agent**: [.github/agents/orchestrator.agent.md](/.github/agents/orchestrator.agent.md)

---

## Prerequisites Checklist

Before starting implementation, verify all PDLC documents exist and are approved:

- ✅ requirements.md (Stage 1)
- ✅ personas.md (Stage 2)
- ✅ user-stories.md with Epics and User Stories sections (Stage 3)
- ✅ architecture-design.md (Stage 3)
- ✅ tech-spec.md (Stage 4)
- ✅ design-systems.md (Stage 4)
- ✅ test-strategies.md (Stage 5)
- ✅ Gherkin BDD feature files (features/**/*.feature) (Stage 5)
- ✅ PDLC Stages 1-6 completed and approved

---

## Usage

Copy and paste this prompt to GitHub Copilot Chat to start implementation:

```
@orchestrator Start implementation workflow for [PROJECT_NAME]

I have completed PDLC Stages 1-6 with all required documents.

Orchestrate me through the 6-phase implementation workflow with the following approach:
1. Go step-by-step interactively, ONE user-story at a time
2. Epics are organizational groupings only - implement at USER-STORY level
3. Present sprint planning options with velocity and priorities
4. BDD scenarios drive TDD implementation (BDD tests are entry points, not endpoints)
5. Execute RED-GREEN-REFACTOR cycles for each layer (Database → Backend → Config → Frontend)
6. BA Agent validates each story with BDD scenarios before acceptance
7. Present story acceptance decision gates based on BDD test results
8. When ALL stories in an epic are complete, mark epic "Implemented"
9. Maintain todo list tracking story-level progress
10. Enforce code quality gates (coding.instructions.md compliance)

Start with Phase 0: Epic Review & User Story Sequencing
- Review epics and user-stories from user-stories.md
- Determine story implementation order based on dependencies
- Present sequencing recommendation for my approval

Let's begin!
```

---

## Expected Workflow Execution

### Phase 0: Epic Review & User Story Sequencing (Day 1)
**Agents**: PM, PO, BA, Dev-Lead

**Orchestrator Actions**:
1. Reads user-stories.md to identify all epics and their user-stories
2. Analyzes story dependencies and complexity
3. **Decision Gate**: Presents story sequencing options with rationale
4. User approves sequence
5. Creates sequencing document

**Deliverables**:
- User story dependency map
- Recommended implementation sequence
- Risk assessment per story

**Decision Gates**:
- ✋ **Gate 0.1**: Story sequencing approval (USER DECIDES implementation order)

**Example Output**:
```
Epic Review Summary:

Epic E001: Authentication & User Management (3 stories, 11 points)
├─ US-001: User Registration (5 points) - NO dependencies
├─ US-002: Email Verification (3 points) - DEPENDS ON US-001
└─ US-003: Password Reset (3 points) - DEPENDS ON US-001

Epic E002: Core Business Features (5 stories, 21 points)
├─ US-004: Create Task (5 points) - DEPENDS ON US-001 (auth required)
├─ US-005: Edit Task (3 points) - DEPENDS ON US-004
├─ US-006: Delete Task (3 points) - DEPENDS ON US-004
├─ US-007: Assign Task (5 points) - DEPENDS ON US-004, US-001
└─ US-008: Task Status Transitions (5 points) - DEPENDS ON US-004

Epic E003: Team Collaboration (4 stories, 17 points)
├─ US-009: Create Team (5 points) - DEPENDS ON US-001
├─ US-010: Invite Team Members (5 points) - DEPENDS ON US-009
├─ US-011: Team Activity Feed (4 points) - DEPENDS ON US-004
└─ US-012: Real-time Updates (3 points) - DEPENDS ON US-011 (complex)

Recommended Sequence:
1. Epic E001 stories first (authentication foundation)
2. Epic E002 stories next (core features)
3. Epic E003 stories last (advanced collaboration)

Within E001: US-001 → US-002 → US-003 (linear dependency)
Within E002: US-004 → [US-005, US-006 parallel] → US-007 → US-008
Within E003: US-009 → US-010 → US-011 → US-012

Approve this sequence? [Yes / Modify / See Alternative]
```

---

### Phase 1: Sprint Planning (Day 1-2)
**Agents**: PM, PO, BA, Dev-Lead

**Orchestrator Actions**:
1. Analyzes team velocity and capacity
2. **Decision Gate**: Presents sprint scope options (3 options with different story combinations)
3. User selects sprint scope
4. Creates sprint plan with story breakdown
5. Estimates completion timeline

**Deliverables**:
- Sprint plan with selected user-stories
- GitHub Project board setup
- Sprint goal definition

**Decision Gates**:
- ✋ **Gate 1.1**: Sprint scope selection (USER DECIDES which stories to include)

**Example Output**:
```
Sprint Planning Options:

Team Velocity: 10 story points/sprint (based on team size and experience)
Sprint Duration: 2 weeks

**Option 1: Conservative Sprint (8 points)**
Stories: US-001 (5) + US-002 (3)
Pros: High confidence of completion, quality focus, buffer for blockers
Cons: Slower feature delivery, password reset delayed
Completion: Full user registration with email verification

**Option 2: Balanced Sprint (11 points)**
Stories: US-001 (5) + US-002 (3) + US-003 (3)
Pros: Complete authentication epic, cohesive feature delivery
Cons: Aggressive timeline, risk if blockers occur
Completion: Entire authentication flow ready

**Option 3: Stretch Sprint (16 points)**
Stories: E001 complete (11) + US-004 (5)
Pros: Fast progress, authentication + start core features
Cons: High risk of incomplete work, quality compromise
Completion: Authentication + basic task creation

Which option do you prefer? [1 / 2 / 3 / Custom]
```

---

### Phase 2: BDD Integration & User Story Breakdown (Day 2)
**Agents**: Dev-Lead

**Orchestrator Actions**:
1. For each selected user-story, invokes Dev-Lead (dev-lead-bdd-integration)
2. Dev-Lead extracts Gherkin scenarios from user-stories.md
3. Creates feature files in project (features/**/*.feature)
4. Creates step definition stubs with API/component calls
5. Runs BDD tests to verify they fail (expected - endpoints don't exist yet)
6. Documents failing BDD tests as TDD entry points
7. Breaks each story into 4 layers (Database → Backend → Config → Frontend)
8. Creates GitHub Issue per user-story linked to parent epic

**Deliverables**:
- Feature files integrated into project
- Step definitions with failing tests
- Layer breakdown per user-story
- GitHub Issues created and linked

**Decision Gates**:
- None (automated execution, user informed of progress)

**Example Output**:
```
BDD Integration Complete for US-001 (User Registration)

Feature File: features/auth/registration.feature
Scenarios: 5 Gherkin scenarios
├─ Scenario 1: Successful registration with valid data
├─ Scenario 2: Registration fails with duplicate email
├─ Scenario 3: Registration fails with invalid email format
├─ Scenario 4: Registration fails with weak password
└─ Scenario 5: Registration succeeds with password hashing

BDD Test Status: ❌ All 5 scenarios FAILING (expected - no implementation yet)

Layer Breakdown for US-001:
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Database (Day 2-3)                                │
│ ├─ Create users table migration                            │
│ ├─ Define User model with validations                      │
│ ├─ Add indexes (email unique, created_at)                  │
│ └─ BDD Progress: 2 of 5 scenarios will pass after Layer 1  │
├─────────────────────────────────────────────────────────────┤
│ Layer 2: Backend Logic (Day 3-4)                           │
│ ├─ POST /api/auth/register endpoint                        │
│ ├─ Email validation service                                │
│ ├─ Password hashing (bcrypt)                               │
│ ├─ User creation service                                   │
│ └─ BDD Progress: 4 of 5 scenarios will pass after Layer 2  │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: Configuration (Day 4)                             │
│ ├─ Register routes in router                               │
│ ├─ Configure CORS for registration endpoint                │
│ ├─ Setup auth middleware (prepare for future stories)      │
│ └─ BDD Progress: All 5 scenarios should pass after Layer 3 │
├─────────────────────────────────────────────────────────────┤
│ Layer 4: Frontend (Day 5)                                  │
│ ├─ Registration form component                             │
│ ├─ Form validation (email, password strength)              │
│ ├─ API client service for registration                     │
│ ├─ Success/error message handling                          │
│ └─ BDD Progress: UI scenarios tested in real environment   │
└─────────────────────────────────────────────────────────────┘

GitHub Issue: #101 - US-001: User Registration
Epic: E001 - Authentication & User Management
Labels: user-story, authentication, sprint-1
Linked BDD Feature: features/auth/registration.feature

Ready to start TDD implementation? [Yes / Review BDD Scenarios First]
```

---

### Phase 3: TDD Development Cycle (Days 2-5+)
**Agents**: TDD Navigator (dev-tdd-orchestrator, dev-tdd-red, dev-tdd-green, dev-tdd-refactor)

**Orchestrator Actions**:
1. Invokes TDD Navigator (dev-tdd-orchestrator) for selected user-story
2. TDD Navigator executes layer-by-layer implementation:
   - For each layer (1-4), run BDD tests to see which assertions fail
   - RED Phase: Write failing unit test supporting BDD assertion
   - GREEN Phase: Implement minimal code to pass test
   - REFACTOR Phase: Improve code quality while keeping tests passing
   - Verify BDD test progress after each layer
3. Reports progress after each layer completion
4. Moves to next layer automatically if BDD tests show progress
5. Completes when all BDD scenarios for the story pass

**Deliverables**:
- Layer 1: Database migrations, models, indexes
- Layer 2: API endpoints, business logic, services
- Layer 3: Routes, dependency injection, configuration
- Layer 4: UI components, state management, styling
- Unit tests for all layers (TDD-generated)
- Passing BDD scenarios

**Decision Gates**:
- None during TDD execution (automated RED-GREEN-REFACTOR cycles)
- Progress reported after each layer

**Example Output**:
```
TDD Execution: US-001 - Layer 1 (Database)

BDD Entry Point: 5 scenarios failing in features/auth/registration.feature

═══════════════════════════════════════════════════════════════
RED Phase - Layer 1, Test 1
───────────────────────────────────────────────────────────────
Writing failing test: test_user_table_has_required_columns()

Test Code:
def test_user_table_has_required_columns(db_session):
    # Arrange: Inspect users table schema
    # Assert: Has id, email, password_hash, created_at columns
    ...

Test Result: ❌ FAILED (table doesn't exist yet)
BDD Scenario Impact: Supports Scenario 1 (successful registration)
───────────────────────────────────────────────────────────────

GREEN Phase - Layer 1, Test 1
───────────────────────────────────────────────────────────────
Writing minimal code: create_users_table_migration.sql

Migration Code:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Test Result: ✅ PASSED
BDD Scenario Impact: Scenario 1 database constraint validated
───────────────────────────────────────────────────────────────

REFACTOR Phase - Layer 1, Test 1
───────────────────────────────────────────────────────────────
Improvements:
✓ Added index on email for faster lookups
✓ Added NOT NULL constraints
✓ Added default value for created_at

Test Result: ✅ STILL PASSING
───────────────────────────────────────────────────────────────

[Continue RED-GREEN-REFACTOR for remaining Layer 1 tests...]

Layer 1 Complete! ✓
─────────────────────────────────────────────────────────────
Tests Written: 8 unit tests (all passing)
Code Generated:
├─ migrations/001_create_users_table.sql
├─ models/user.py (User model with validations)
└─ tests/models/test_user.py (8 passing tests)

BDD Progress Check:
✓ Scenario 2: Registration fails with duplicate email (DB constraint working)
✓ Scenario 3: Registration fails with invalid email (validation at DB level)
⏳ Scenarios 1, 4, 5: Still failing (need backend logic)

Time: 2 hours

Moving to Layer 2: Backend Logic...
═══════════════════════════════════════════════════════════════
```

---

### Phase 4: BDD Testing & Validation (After each story)
**Agents**: BA

**Orchestrator Actions**:
1. After all 4 layers complete for a user-story, invokes BA Agent (ba-bdd-execution)
2. BA Agent executes all Gherkin scenarios in REAL test environment
3. Uses actual test data, real database, full stack
4. Reports results: passing/failing scenarios, performance, issues
5. **Decision Gate**: Presents test results to user for story acceptance

**Deliverables**:
- BDD test execution report
- Performance metrics (response times)
- Issue list (if any failures)

**Decision Gates**:
- ✋ **Gate 4.1**: Story acceptance decision (USER DECIDES based on BDD results)

**Example Output**:
```
BDD Testing Complete: US-001 (User Registration)

Test Environment: Full stack (Database + Backend + Frontend)
Test Data: 50 test users with varied inputs
Execution Time: 3 minutes

Scenario Results:
═══════════════════════════════════════════════════════════════
✅ Scenario 1: Successful registration with valid data
   Steps: 5 Given/When/Then steps
   Status: PASSING
   Performance: 145ms avg response time
   Assertions: All passed (user created, password hashed, email unique)

✅ Scenario 2: Registration fails with duplicate email
   Steps: 4 Given/When/Then steps
   Status: PASSING
   Performance: 89ms avg response time
   Assertions: HTTP 409 Conflict, proper error message returned

✅ Scenario 3: Registration fails with invalid email format
   Steps: 4 Given/When/Then steps
   Status: PASSING
   Performance: 62ms avg response time
   Assertions: HTTP 400 Bad Request, validation error message

✅ Scenario 4: Registration fails with weak password
   Steps: 4 Given/When/Then steps
   Status: PASSING
   Performance: 58ms avg response time
   Assertions: HTTP 400 Bad Request, password strength error

✅ Scenario 5: Registration succeeds with password hashing
   Steps: 6 Given/When/Then steps
   Status: PASSING
   Performance: 152ms avg response time
   Assertions: Password stored as bcrypt hash (verified)
═══════════════════════════════════════════════════════════════

Overall: ✅ 5 of 5 scenarios PASSING (100%)

Quality Metrics:
✓ Performance: All scenarios under 200ms (target: <500ms)
✓ Security: Password hashing verified (bcrypt with salt)
✓ Validation: Email format and password strength enforced
✓ Error Handling: Proper HTTP status codes and messages

Coverage:
✓ All acceptance criteria met
✓ Edge cases tested (duplicate email, invalid inputs)
✓ Security requirements validated

───────────────────────────────────────────────────────────────
🎯 DECISION GATE: Story Acceptance
───────────────────────────────────────────────────────────────
US-001 (User Registration) is ready for acceptance.

All BDD scenarios pass, performance is excellent, and security 
requirements are met. No issues found.

Accept US-001 for completion? [Yes / No / Request Changes]

If Yes: Story will be marked complete and code merged
If No: Story returns to TDD cycle for fixes
If Request Changes: Specify what needs adjustment
```

---

### Phase 5: Code Quality & Commit (After story acceptance)
**Agents**: Dev-Lead

**Orchestrator Actions**:
1. Invokes Dev-Lead (dev-lead-code-review) for quality validation
2. Dev-Lead checks:
   - coding.instructions.md compliance
   - Test coverage > 80%
   - No critical security issues
   - Architecture consistency
   - SOLID principles followed
3. Generates code review report
4. **Decision Gate**: Presents quality assessment for merge approval
5. If approved, commits code and updates GitHub Issue
6. If epic has ALL stories complete, marks epic "Implemented"

**Deliverables**:
- Code review report
- Test coverage report
- Security scan results
- Merge commit (if approved)

**Decision Gates**:
- ✋ **Gate 5.1**: Code merge approval (USER DECIDES based on quality report)

**Example Output**:
```
Code Quality Review: US-001 (User Registration)

Code Review Checklist (13 points):
═══════════════════════════════════════════════════════════════
✅ 1. Functionality: Code does what it's supposed to do
✅ 2. Design: Architecture is sound and maintainable
✅ 3. Complexity: Code is reasonably simple (cyclomatic < 10)
✅ 4. Testing: Test coverage 89% (target: >80%)
✅ 5. Naming: Names are clear and consistent
✅ 6. Comments: Comments are helpful (minimal, focused on "why")
✅ 7. Error Handling: Errors handled appropriately
✅ 8. Performance: No obvious performance issues
✅ 9. Security: Password hashing, input validation present
✅ 10. Documentation: Code is self-documenting
✅ 11. Consistency: Follows project standards
✅ 12. Best Practices: SOLID principles applied
✅ 13. Dependencies: bcrypt dependency justified
═══════════════════════════════════════════════════════════════

Test Coverage Details:
├─ models/user.py: 95% coverage
├─ services/auth_service.py: 87% coverage
├─ controllers/auth_controller.py: 85% coverage
└─ Overall: 89% coverage (✅ exceeds 80% target)

Security Scan:
✅ No critical vulnerabilities
✅ Password hashing: bcrypt with proper cost factor (12 rounds)
✅ Input validation: Email regex, password strength enforced
✅ SQL injection: Using parameterized queries

Architecture Consistency:
✅ Follows layered architecture (Database → Service → Controller)
✅ Dependency injection used appropriately
✅ Single Responsibility Principle maintained
✅ No business logic in controllers

Code Smells: None detected

Minor Suggestions (non-blocking):
⚠ Consider extracting email validation regex to constants
⚠ Add logging for failed registration attempts (security audit)

───────────────────────────────────────────────────────────────
🎯 DECISION GATE: Code Merge Approval
───────────────────────────────────────────────────────────────
US-001 code quality is excellent. All quality gates passed.

Summary:
✅ All 13 code review criteria met
✅ Test coverage: 89%
✅ Security: No critical issues
✅ Architecture: Consistent with design
✅ Performance: Benchmarks met

Approve code merge to develop branch? [Yes / No / Request Refactoring]

If Yes: Code will be merged, GitHub Issue closed, CI/CD triggered
If No: Code returns to dev for fixes
If Request Refactoring: Specify what needs improvement
```

---

### Phase 6: Sprint Review & Next Steps
**Orchestrator Actions**:
1. After all sprint stories complete, generates sprint summary
2. Updates epic status (mark "Implemented" if all stories done)
3. Presents options for next sprint or different epic
4. **Decision Gate**: User selects next sprint scope or continues with current epic

**Deliverables**:
- Sprint summary report
- Epic completion status
- Next sprint recommendations

**Decision Gates**:
- ✋ **Gate 6.1**: Next sprint planning (USER DECIDES what to work on next)

**Example Output**:
```
Sprint 1 Review: Complete ✅

Duration: 2 weeks (Day 1 - Day 10)
User Stories Completed: 2 of 2 (100%)
Story Points Delivered: 8 of 8 (100%)

Stories Delivered:
═══════════════════════════════════════════════════════════════
✅ US-001: User Registration (5 points)
   BDD Scenarios: 5 of 5 passing
   Test Coverage: 89%
   Time: 3 days

✅ US-002: Email Verification (3 points)
   BDD Scenarios: 3 of 3 passing
   Test Coverage: 92%
   Time: 2 days
═══════════════════════════════════════════════════════════════

Epic E001 Status: 67% Complete (2 of 3 stories done)
├─ ✅ US-001: User Registration
├─ ✅ US-002: Email Verification
└─ ⏳ US-003: Password Reset (planned for Sprint 2)

Quality Metrics:
✓ All BDD scenarios passing (8 of 8)
✓ Average test coverage: 90.5%
✓ No critical security issues
✓ All code reviews approved
✓ CI/CD pipeline: 100% success rate (20 builds)

Velocity Achieved: 8 points (matches planned capacity)

───────────────────────────────────────────────────────────────
🎯 DECISION GATE: Next Sprint Planning
───────────────────────────────────────────────────────────────
Sprint 1 was successful! What would you like to do next?

**Option 1: Complete Epic E001**
Next Story: US-003 (Password Reset, 3 points)
Pros: Finish authentication epic, cohesive feature release
Cons: Small sprint, team may have idle time
Sprint 2 Capacity: 3 points (low utilization)

**Option 2: Complete E001 + Start E002**
Stories: US-003 (3) + US-004 (5) + US-005 (3) = 11 points
Pros: High velocity, start core features
Cons: Aggressive scope, risk if blockers occur
Sprint 2 Capacity: 11 points (stretch goal)

**Option 3: Complete E001 + Partial E002**
Stories: US-003 (3) + US-004 (5) = 8 points
Pros: Balanced sprint, realistic completion
Cons: Leaves E002 partial
Sprint 2 Capacity: 8 points (matches current velocity)

Which option do you prefer for Sprint 2? [1 / 2 / 3 / Custom]
```

---

## Progress Tracking

The Orchestrator maintains a detailed todo list at the user-story level:

```yaml
implementation_progress:
  current_workflow: "implementation.workflows.md"
  current_phase: 3
  phase_name: "TDD Development Cycle"
  current_sprint: 1
  sprint_capacity: 8
  
  epics:
    - epic_id: "E001"
      epic_name: "Authentication & User Management"
      total_stories: 3
      total_points: 11
      completed_stories: 2
      completed_points: 8
      status: "in-progress"
      completion: 67%
      
      stories:
        - story_id: "US-001"
          title: "User Registration"
          points: 5
          status: "completed"
          github_issue: "#101"
          bdd_feature: "features/auth/registration.feature"
          bdd_scenarios: 5
          bdd_passing: 5
          test_coverage: 89%
          completion_date: "2025-12-18"
          
        - story_id: "US-002"
          title: "Email Verification"
          points: 3
          status: "completed"
          github_issue: "#102"
          bdd_feature: "features/auth/verification.feature"
          bdd_scenarios: 3
          bdd_passing: 3
          test_coverage: 92%
          completion_date: "2025-12-20"
          
        - story_id: "US-003"
          title: "Password Reset"
          points: 3
          status: "not-started"
          github_issue: "#103"
          bdd_feature: "features/auth/password_reset.feature"
          bdd_scenarios: 4
          bdd_passing: 0
          planned_sprint: 2
          
    - epic_id: "E002"
      epic_name: "Core Business Features"
      total_stories: 5
      total_points: 21
      completed_stories: 0
      completed_points: 0
      status: "not-started"
      
  sprint_1_summary:
    planned_points: 8
    delivered_points: 8
    stories_planned: 2
    stories_delivered: 2
    velocity: 8
    success_rate: 100%
    
  quality_metrics:
    average_test_coverage: 90.5%
    bdd_scenarios_total: 8
    bdd_scenarios_passing: 8
    critical_issues: 0
    code_reviews_passed: 2
    ci_builds_successful: 20
    ci_builds_failed: 0
```

---

## Key Implementation Principles

1. **User-Story Level Work**: Implement ONE story at a time, not entire epics
2. **BDD Drives TDD**: BDD scenarios are entry points that drive layer-by-layer TDD
3. **Epic as Container**: Epics group related stories, completion is automatic when all stories done
4. **Layer-by-Layer**: Database → Backend → Config → Frontend for each story
5. **RED-GREEN-REFACTOR**: Strict TDD discipline at every layer
6. **Full Environment Testing**: BA tests with real data in complete stack
7. **Code Quality Gates**: Review against coding.instructions.md before merge
8. **Interactive Decisions**: User approves sprint scope, story acceptance, code merges
9. **Transparency**: Todo list tracks every story, layer, and test
10. **Continuous Feedback**: Sprint reviews inform next sprint planning

---

## Quick Start Commands

**Start Implementation:**
```
@orchestrator Start implementation workflow for [PROJECT_NAME]
```

**Resume at Specific Phase:**
```
@orchestrator Resume implementation at Phase [X]
```

**Check Implementation Progress:**
```
@orchestrator Show implementation progress and epic status
```

**Start Specific Epic:**
```
@orchestrator Start development on Epic [EPIC_NAME]
```

**Plan Next Sprint:**
```
@orchestrator Plan sprint [N] based on current velocity
```

---

## Related Files

- **Orchestrator Agent**: [.github/agents/orchestrator.agent.md](/.github/agents/orchestrator.agent.md)
- **Implementation Workflow**: [.github/workflows/implementation.workflows.md](/.github/workflows/implementation.workflows.md)
- **TDD Agents**: [.github/agents/dev-tdd*.agent.md](/.github/agents/)
- **Dev-Lead Agent**: [.github/agents/dev-lead.agent.md](/.github/agents/dev-lead.agent.md)
- **BA Agent**: [.github/agents/ba.agent.md](/.github/agents/ba.agent.md)
- **Coding Standards**: [.github/instructions/coding.instructions.md](/.github/instructions/coding.instructions.md)
