# Project Type Workflow Adaptation Guide

## Overview

This guide explains how the orchestration system adapts to different project types and statuses, ensuring agents work efficiently regardless of whether you're starting from scratch, continuing on existing work, or migrating code.

---

## Project Status Types

### 1. NEW PROJECT
**Status**: No documentation, no code, starting from zero

**Characteristics**:
- Fresh start
- No constraints from existing code
- Full PDLC required
- Complete flexibility

**Recommended Workflow**:
```bash
@orchestrator Start new PDLC workflow for [PROJECT_NAME]
```

**What happens**:
- Orchestrator starts Stage 1: Requirements Gathering
- PM creates project charter
- PO creates requirements.md
- Full 8-stage PDLC process
- All agents involved in sequence
- Complete documentation generated
- Then: Start Implementation workflow when Stages 1-6 complete

**Timeline**: 6-8 weeks for PDLC + 4-12 weeks for implementation (depending on scope)

---

### 2. PDLC IN PROGRESS
**Status**: Some PDLC documents exist, no implementation yet

**Examples**:
- Completed Stages 1-2 (requirements, analysis)
- Completed Stages 1-3 (design added)
- Completed Stages 1-5 (testing strategy added)

**Characteristics**:
- Documentation partially complete
- Missing PDLC documents
- Ready to continue planning
- Implementation hasn't started

**Recommended Workflow**:
```bash
@orchestrator Resume PDLC workflow at Stage [X]
```

**What happens**:
- Orchestrator assesses which stage you're at
- Loads existing documents
- Skips completed stages
- Resumes at first incomplete stage
- Agents reference existing docs
- Complete missing documentation
- Progress to implementation

**Example**:
```
Assessment: Stages 1-3 complete, Stage 4 missing
Command: @orchestrator Resume PDLC workflow at Stage 4
Result:
  - Load architecture-design.md (Stage 3 output)
  - Load user-stories.md (Stage 3 output)
  - Create tech-spec.md (Stage 4 requirement)
  - Create design-systems.md (Stage 4 requirement)
  - Present tech stack decision gate
  - Continue to Stages 5-6
  - Then: Start implementation
```

**Timeline**: Depends on completion point
- From Stage 2: 4-6 weeks
- From Stage 4: 1-2 weeks
- From Stage 5: 1 week

---

### 3. PLANNING COMPLETE - READY FOR IMPLEMENTATION
**Status**: All PDLC documents complete (Stages 1-6), no code yet

**Characteristics**:
- Complete documentation
- All architecture decisions made
- All user stories defined with BDD
- No implementation started
- No tests written
- Ready to develop

**Recommended Workflow**:
```bash
@orchestrator Start implementation workflow for [PROJECT_NAME]
```

**What happens**:
- Orchestrator loads all PDLC documents
- Checks for BDD feature files
- Dev-Lead integrates BDD scenarios
- Sprint planning begins
- First user story selected
- TDD cycles start
- Agents work on implementation

**Timeline**: 4-12 weeks depending on scope and team velocity

---

### 4. BROWNFIELD - PARTIAL IMPLEMENTATION
**Status**: Some documentation exists, some code exists, work in progress

**Examples**:
- Completed docs (Stages 1-6) + 40% code done
- Partial docs + 60% code done
- Good code + minimal documentation

**Characteristics**:
- Mixed state (some docs, some code)
- Gaps between docs and code
- Some user stories complete
- Some user stories in progress
- Some user stories not started

**Recommended Workflow**:
```bash
@orchestrator Continue implementation for [PROJECT_NAME]
  Assess existing: yes
  Validate docs: yes
  Skip completed stories: yes
```

**What happens**:
1. **Assessment Phase**:
   - Scan docs folders
   - Scan codebase
   - Identify completed stories
   - Identify gaps

2. **Alignment Phase**:
   - Create missing documentation
   - OR validate existing docs against code
   - Identify architecture misalignments
   - Plan remediation

3. **Continuation Phase**:
   - Load implementation plan
   - Skip completed user stories
   - Resume at first incomplete story
   - Continue with Layer 1-4 TDD for incomplete stories
   - Fill documentation gaps in parallel

**Example Scenario**:
```
Existing state:
  - Docs: 10 of 13 documents (missing code-generation.md, deployment-plan.md)
  - Code: 4 of 7 user stories complete
  - Tests: 15 of 22 BDD scenarios passing

Command:
@orchestrator Continue implementation for AuthenticationApp
  Validate docs: yes
  Skip completed: yes

Orchestrator actions:
1. Load existing docs
2. Skip US-001, US-002, US-003, US-004 (complete)
3. Create missing docs in parallel
4. Resume TDD with US-005 (incomplete)
5. Assign doc creation task to PO
6. Assign US-005 implementation to Dev-Lead + TDD
7. Assign BDD validation to BA
8. Continue with US-006, US-007
9. All in parallel, coordinated workflow

Result: Project completion in 2-3 weeks instead of starting over
```

**Timeline**: Depends on completion percentage
- 25% complete: 3-4 weeks
- 50% complete: 2-3 weeks
- 75% complete: 1-2 weeks

---

### 5. NEAR COMPLETE - FINAL VALIDATION
**Status**: Most/all code done, needs validation and final touches

**Characteristics**:
- 75%+ code implementation
- Most/all BDD tests written
- Majority of tests passing
- Minor tasks remaining
- Quality gates need verification
- Ready for deployment planning

**Recommended Workflow**:
```bash
@orchestrator Validate and complete implementation for [PROJECT_NAME]
  Validate BDD: yes
  Fix failing tests: yes
  Prepare deployment: yes
```

**What happens**:
1. **Validation Phase**:
   - Run all BDD tests
   - Identify failing scenarios
   - Check code coverage
   - Validate architecture alignment

2. **Fix Phase**:
   - BA reviews failing BDD tests
   - Dev-Lead assigns fixes
   - TDD fixes failing tests
   - Verify all tests pass

3. **Documentation Phase**:
   - Create/complete deployment-plan.md
   - Update iteration-planning.md
   - Document final decisions

4. **Preparation Phase**:
   - Stage code for deployment
   - Prepare release notes
   - Plan deployment timeline

**Timeline**: 1-2 weeks

---

### 6. MIGRATION PROJECT - INTEGRATE EXISTING CODE
**Status**: Taking existing codebase and planning new features

**Characteristics**:
- Existing code from different project/tech stack
- Need to preserve existing functionality
- Adding new features on top
- May have minimal/no documentation
- Architecture may differ from new approach

**Recommended Workflow**:
```bash
@orchestrator Start migration for [PROJECT_NAME]
  Source codebase: [path/to/existing/code]
  Target architecture: [new architecture]
  Preserve existing: yes
```

**What happens**:
1. **Assessment Phase**:
   - Analyze existing codebase
   - Map existing implementation to architecture
   - Identify existing user stories
   - Identify new user stories
   - Create documentation for existing code

2. **Planning Phase**:
   - Create tech-spec.md for migration path
   - Plan incremental migration vs. rewrite
   - Define integration points
   - Plan parallel deployment strategy

3. **Documentation Phase**:
   - Create PDLC docs for existing code
   - Define new features through normal PDLC
   - Document integration approach

4. **Implementation Phase**:
   - Implement new features using TDD
   - Test integration with existing code
   - Plan gradual migration of existing code

**Example**:
```
Scenario: Migrating monolithic Ruby on Rails app to microservices

Assessment:
  - Existing: User auth + profile + task management (Rails)
  - Target: Microservices (Auth service, Profile service, Task service)
  - New: Real-time collaboration, mobile app

Workflow:
1. Document existing architecture
2. Define new architecture (microservices)
3. Plan features:
   - New: Real-time collaboration
   - Migrate: Auth to Auth service
   - Migrate: Profile to Profile service
4. Implement new features first (greenfield approach)
5. Gradually migrate existing features
6. Eventually retire legacy code

Result: Zero downtime migration over 3-6 months
```

**Timeline**: Depends on codebase size and complexity
- Small migration: 2-4 weeks
- Medium migration: 1-3 months
- Large migration: 3-6 months

---

## Workflow Decision Tree

```
START: @orchestrator [command]
  |
  +-- Assess Project Status
  |    |
  |    +-- NEW (0% docs, 0% code)
  |    |    +-- Start PDLC workflow → Stage 1
  |    |
  |    +-- PDLC-IN-PROGRESS (50% docs, 0% code)
  |    |    +-- Resume PDLC → Identify stage → Continue
  |    |
  |    +-- PLANNING-COMPLETE (100% docs, 0% code)
  |    |    +-- Start implementation workflow → Phase 1
  |    |
  |    +-- BROWNFIELD (75% docs, 50% code)
  |    |    +-- Continue implementation → Skip completed → Resume incomplete
  |    |
  |    +-- NEAR-COMPLETE (100% docs, 85% code)
  |    |    +-- Validate implementation → Fix tests → Prepare deployment
  |    |
  |    +-- MIGRATION (existing code + new features)
  |         +-- Plan migration → Implement new → Migrate existing
  |
  +-- Execute Recommended Workflow
  |    |
  |    +-- Load existing docs/code
  |    +-- Skip completed work
  |    +-- Resume at correct point
  |    +-- Coordinate agents efficiently
  |    +-- Track progress with todo list
  |    +-- Present decision gates as needed
  |
  +-- Complete Remaining Work
       |
       +-- Document any gaps
       +-- Implement remaining stories
       +-- Validate with BDD
       +-- Prepare for deployment
```

---

## Adaptive Agent Coordination

The orchestrator adapts agent involvement based on project status:

### For NEW Projects
- **All agents active**: PM, PO, BA, UX, Architect, Dev-Lead, TDD
- **Full workflow**: All 8 PDLC stages, then implementation
- **Duration**: 3-4 months

### For BROWNFIELD Projects
- **Selective activation**: Only agents needed for missing work
- **Parallel workflows**: Some agents complete docs, others implement
- **Efficiency**: Skip completed stories, focus on gaps
- **Duration**: Depends on completion %

### For MIGRATION Projects
- **Specialized team**: BA (document existing), Architect (plan migration), Dev-Lead (integration)
- **Phased approach**: New features → gradual migration → legacy retirement
- **Duration**: 2-6 months depending on scale

---

## Implementation Planning Artifacts

### For New Projects
```
/docs/user-stories/
  ├── user-stories.md (master list)
  ├── US-001/
  │   ├── implementation-plan.md
  │   └── bdd-scenarios/
  │       └── feature.feature
  ├── US-002/
  │   └── ...
  └── US-003/
      └── ...
```

### For Brownfield Projects
```
/docs/user-stories/
  ├── user-stories.md (lists all: done + todo)
  ├── US-001/ (✓ DONE - reference only)
  │   └── implementation-plan.md (completed)
  ├── US-002/ (✓ DONE - reference only)
  │   └── implementation-plan.md (completed)
  ├── US-003/ (🔄 IN PROGRESS)
  │   ├── implementation-plan.md (current)
  │   └── bdd-scenarios/
  │       └── feature.feature
  ├── US-004/ (⏳ TODO)
  │   └── implementation-plan.md (template)
  └── US-005/ (⏳ TODO)
      └── implementation-plan.md (template)
```

This allows:
- **History**: See what was done
- **Context**: Understand completed work
- **Continuation**: Pick up where you left off
- **Reference**: Use completed stories as patterns

---

## Commands by Project Status

### NEW Project
```bash
@orchestrator Start new PDLC workflow for [PROJECT_NAME]
```

### Continuing PDLC
```bash
@orchestrator Resume PDLC workflow at Stage [X] for [PROJECT_NAME]
```

### Starting Implementation (docs complete)
```bash
@orchestrator Start implementation workflow for [PROJECT_NAME]
```

### Continuing Implementation (partial code)
```bash
@orchestrator Continue implementation for [PROJECT_NAME]
  Start from story: [US-X]
  Skip completed: yes
```

### Validating Completion
```bash
@orchestrator Validate implementation for [PROJECT_NAME]
  Fix failing tests: yes
  Complete remaining: yes
```

### Assessing Status
```bash
@orchestrator Assess project status for [PROJECT_NAME]
```

### Migrating Code
```bash
@orchestrator Start migration for [PROJECT_NAME]
  Source: [existing codebase path]
  Target: [new architecture]
```

---

## Benefits of Adaptive Workflows

✅ **Efficiency**: Don't repeat completed work
✅ **Flexibility**: Start anywhere in PDLC
✅ **Continuity**: Resume at correct point
✅ **Team alignment**: All agents know status
✅ **Quality**: Maintain standards throughout
✅ **Scalability**: Handles projects of any maturity level
✅ **Risk reduction**: Validate existing work
✅ **Documentation**: Keep docs synchronized with code

---

## Common Scenarios

### Scenario 1: Stakeholder provides requirements doc
```
Input: Existing requirements document (non-standard format)

Workflow:
1. @orchestrator Resume PDLC at Stage 2
2. PO converts to standard requirements.md
3. BA creates personas.md, business-case.md
4. Continue Stages 3-6
5. Start implementation

Timeline: 4-5 weeks
```

### Scenario 2: Designer has created UI mockups
```
Input: Figma designs but no written specs

Workflow:
1. @orchestrator Resume PDLC at Stage 3
2. UX converts mockups to journey-maps.md, blueprints.md
3. BA creates user stories from designs
4. Architect designs system architecture
5. Continue Stages 4-6
6. Start implementation

Timeline: 3-4 weeks
```

### Scenario 3: Backend partially implemented, frontend not started
```
Input: Backend code exists (Layers 1-2), Layer 4 missing

Workflow:
1. @orchestrator Continue implementation
2. Assess: Backend done, frontend TODO
3. Create implementation-plan.md for Layer 4
4. Dev-Lead assigns Layer 4 stories
5. TDD executes Layer 4 (frontend)
6. BA validates with BDD
7. Complete remaining stories

Timeline: 1-2 weeks per story
```

### Scenario 4: Entire project implemented, no tests
```
Input: Working code, no BDD, no tests

Workflow:
1. @orchestrator Validate implementation
2. BA reviews code against user-stories.md
3. Create/integrate BDD scenarios
4. TDD writes tests for existing code
5. Fix failing tests
6. Achieve 80%+ coverage
7. Prepare for deployment

Timeline: 2-3 weeks
```

---

## Success Criteria

For each project status, success looks like:

### NEW → PDLC Complete
- ✓ All 13 PRD documents created and approved
- ✓ All user stories defined with BDD
- ✓ All decision gates passed
- ✓ Ready for implementation

### BROWNFIELD → Complete
- ✓ All documentation current and accurate
- ✓ All user stories implemented
- ✓ All BDD tests passing (100%)
- ✓ Code coverage > 80%
- ✓ Ready for deployment

### MIGRATION → Successful
- ✓ New features implemented
- ✓ Existing features working in new architecture
- ✓ Integration tested
- ✓ Zero downtime cutover completed
- ✓ Legacy code retired

---

## See Also

- [assess-project-status.prompts.md](assess-project-status.prompts.md)
- [start-pdlc.prompts.md](start-pdlc.prompts.md)
- [start-implementation.prompts.md](start-implementation.prompts.md)
- [ORCHESTRATION_GUIDE.md](../ORCHESTRATION_GUIDE.md)
