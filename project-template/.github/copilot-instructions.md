- Before anything, please read entire /.github/instructions/ai.analysis.guardrails.instructions.md file.

# AI-Driven PDLC Orchestration System

## ⚡ **CAPITAL RULE: This is a Reusable Framework Template**

**CRITICAL CLARIFICATION**: 
- **This entire `.github/` framework is designed to be COPIED into ANY project**—it is NOT tied to a specific project
- **All example identifiers** (AUTH-003, US-001, US-xxx, PAYMENT-001, etc.) are **JUST EXAMPLES** showing how user-story IDs would look in YOUR future projects
- **When you use this framework in a real project**, you replace the example IDs with YOUR project's naming convention

### Framework Purpose
This orchestration system helps you:
1. **Retro-document brownfield projects** - Reconstruct missing specifications, architecture decisions, and BDD scenarios
2. **Run stakeholder workshops** - Conduct discovery interviews, gather requirements, surface tradeoffs using agents
3. **Generate PDLC documents** - Automatically create requirements, personas, architecture, tech specs, user stories
4. **Orchestrate AI agents** - Coordinate handoff chains: PM → PO → BA → UX → Architect → Dev-Lead → TDD
5. **Execute TDD workflows** - BDD-driven test cycles with strict sequencing (RED → GREEN → REFACTOR)

### Real-World Example
If you **copy this framework into a "PaymentProcessor" project**, you would have:
```
.github/                          # This framework (copied)
docs/prd/user-stories.md          # Stories like: PAYMENT-001, PAYMENT-002, BILLING-003
docs/user-stories/
├── PAYMENT-001/                  # Folder for your payment story
│   ├── implementation-plan.md
│   ├── handoff.md
│   └── tdd-execution.md
features/payment/
├── subscription-billing.feature   # Your domain-specific BDD scenarios
└── refund-processing.feature
```

All framework patterns (handoff orchestration, TDD sequencing, document consolidation) remain **identical**. Only the context (business domain, user-story IDs, feature names) changes.

### Bottom Line
**Medium**: Framework patterns (reusable)  
**Message**: Your project context (project-specific)

This README and all agent instructions use examples. **Adapt the IDs and context to YOUR project when you use the framework.**

---

# AI-Driven PDLC Orchestration System

## 🎯 System Architecture Overview

This is an **AI-driven Product Development Lifecycle (PDLC) orchestration framework** that coordinates specialized AI agents through three interconnected workflows:

1. **PDLC Workflow** (`.github/workflows/documents.workflows.md`) - 8 stages: Requirements → Analysis → Design → Planning → Testing → Deployment → Development → Improvement
2. **Implementation Workflow** (`.github/workflows/implementation.workflows.md`) - 6 phases: Epic Review → Sprint Planning → BDD Integration → TDD Execution → BDD Validation → Code Quality
3. **CI/CD Workflow** (`.github/workflows/cicd.workflows.md`) - 3 phases: Bootstrap → Stabilization → Optimization

### Critical Concepts

**Epic-Driven Model**: Epics are organizational containers; **user-stories are the work units**. Always implement ONE user-story at a time through all 4 layers (Database → Backend → Config → Frontend). Epic completion is automatic when ALL its stories are done.

**BDD-Driven TDD**: BDD scenarios are **entry points** (not endpoints). Failing BDD tests drive layer-by-layer TDD cycles (RED → GREEN → REFACTOR). Implementation makes BDD tests pass incrementally.

**Orchestrator Pattern**: Use `@orchestrator` agent (`.github/agents/orchestrator.agent.md`) to coordinate all workflows via handoffs and present 3 options at decision gates. Use `runSubagent` only for read‑only research or analysis; never for writing or editing shared project files.

### Standardized Folder Structure

The orchestration system uses a **fixed folder hierarchy** for all generated documents:

```
project-root/
├── .github/
│   ├── workflows/          # PDLC, Implementation, CI/CD workflow definitions
│   ├── agents/             # All agent profiles
│   ├── templates/          # Document templates
│   ├── instructions/       # Coding and documentation standards
│   └── tasks/              # Workflow launcher prompts
│
├── docs/
│   ├── prd/                           # PDLC Documents (Stages 1-8)
│   │   ├── requirements.md           # Stage 1: Product requirements
│   │   ├── personas.md               # Stage 2: User personas
│   │   ├── business-case.md          # Stage 2: Business justification
│   │   ├── architecture-design.md    # Stage 3: System architecture
│   │   ├── user-stories.md           # Stage 4: User stories catalog (PRD - read-only reference)
│   │   │                             # Contains all epics & stories with BDD scenarios
│   │   ├── tech-spec.md              # Stage 4: Technical specifications
│   │   ├── test-strategies.md        # Stage 5: Testing approach
│   │   ├── design-systems.md         # Stage 3: Design tokens/components
│   │   ├── deployment-plan.md        # Stage 6: Deployment strategy
│   │   └── ... (13 PRD documents total)
│   │
│   ├── user-stories/                  # User Story Implementation Tracking
│   │   ├── user-stories.md                    # ⭐ SINGLE SOURCE OF TRUTH for implementation status
│   │   │                                      # Mirrors /docs/prd/user-stories.md structure
│   │   │                                      # Adds: Not Started / In Progress / In Review / Implemented
│   │   │                                      # Synchronized with issue tracker
│   │   │                                      # Orchestrator checks this to determine next work
│   │   ├── <USER-STORY-REF>/                  # Per-story folder (e.g., US-001/, PAYMENT-001/, AUTH-003/)
│   │   │   ├── implementation-plan.md         # Detailed layer-by-layer plan
│   │   │   ├── handoff.md                     # Current TDD cycle status
│   │   │   ├── tdd-execution.md               # Complete audit log (append-only)
│   │   │   └── bdd-scenarios/                 # Copy of BDD feature files
│   │   │       └── login.feature
│   │   └── <USER-STORY-REF>/
│   │       └── ...
│   │
│   └── design/                        # UX/UI Design Documents
│       ├── journey-maps.md
│       ├── design-systems.md
│       └── wireframes/
│
├── features/               # BDD Feature Files (project source control)
│   ├── auth/
│   │   ├── login.feature
│   │   └── login.steps.ts
│   └── ...
│
└── src/                    # Application source code
```

**⚠️ NOTE**: The folder structure is a TEMPLATE. When you use this framework in your project:
- Replace `<USER-STORY-REF>` with YOUR project's story identifiers (PAYMENT-001, AUTH-003, FEATURE-X, etc.)
- Replace `features/auth/` with YOUR domain-specific feature paths (features/payment/, features/billing/, etc.)
- The **framework patterns remain identical** (per-story folders, implementation-plan.md, handoff.md, tdd-execution.md)
- Only the **names and content** adapt to your project context

**Key Principles**:
- **All PRD documents** → `/docs/prd/`
- **User stories catalog (PRD)** → `/docs/prd/user-stories.md`
  - Created during PDLC Stage 4
  - Contains all epics and user stories with BDD scenarios
  - Read-only reference for implementation
- **⭐ Implementation status tracking (SINGLE SOURCE OF TRUTH)** → `/docs/user-stories/user-stories.md`
  - Mirrors `/docs/prd/user-stories.md` structure
  - Adds status: Not Started / In Progress / In Review / Implemented
  - Synchronized with issue tracker
  - Orchestrator checks this file to determine which story to tackle next
  - Updated by agents as stories progress through implementation phases
- **Per-story folder** → `/docs/user-stories/<USER-STORY-REF>/`
- **Implementation plan** → `/docs/user-stories/<USER-STORY-REF>/implementation-plan.md` (guides TDD execution)
- **BDD scenarios** → Project source `features/` with copies in `/docs/user-stories/<USER-STORY-REF>/bdd-scenarios/` for reference
- **Design documents** → `/docs/design/`

## 🤖 Agent Invocation Pattern

**CRITICAL**: Use **handoffs for collaborative work**, not `runSubagent`.

### Handoff-Based Collaboration (Same Workspace)
Agents hand off control to each other while maintaining shared file state:

```bash
# Correct: Orchestrator coordinates via handoffs
@orchestrator Start new PDLC workflow for ProjectX

# The orchestrator will:
# 1. Present workflow overview and decision gates
# 2. Hand off to PM → PO → BA → UX → Architect → Dev-Lead → TDD
# 3. Each agent creates/edits files in shared workspace
# 4. User makes decisions at gates (architecture, tech stack, sprint scope)
# 5. Progress is visible incrementally
```

**Handoff Chain**:
```
Orchestrator (gates) → PM (charter) → PO (requirements.md) → 
BA (personas.md, business-case.md) → UX (journey-maps.md, design-systems.md) → 
Architect (architecture-design.md, tech-spec.md) → Dev-Lead (BDD, implementation plan) →
TDD (RED→GREEN→REFACTOR) → BA (validation) → Orchestrator (acceptance gate)
```

### When to Use runSubagent (Isolated Research)
Only for independent research/analysis tasks:
- Market research reports
- Competitive analysis
- Technical feasibility studies (read-only)
- Code quality metrics (no edits)

**Never use runSubagent for**:
- Creating/editing project documents
- Writing code
- BDD/TDD cycles
- Any work requiring shared file state

After each agent completes work on a user story, persist two artifacts in the story folder:
- `delta_summary.json` (what changed, open questions, next files)
- `decision_log.md` (assumptions, options, choice, tradeoffs)
Store both under `/docs/user-stories/<USER-STORY-REF>/` and pass only deltas + relevant files to the next agent to reduce tokens and drift.

For every user story, keep a `story.yaml` in `/docs/user-stories/<USER-STORY-REF>/` capturing: `id, title, epic, type, risk, affected_components, acceptance_criteria[], nfrs[], data_contracts[], feature_flag, rollout_plan, migration, test_matrix, dependencies[]`. This file is validated in CI.

**Agent Registry** (`.github/agents/`):
- `orchestrator.agent.md` - Master coordinator with handoff definitions
- `pm.agent.md` - Project Manager (handoffs: PO, Architect, Dev-Lead)
- `po.agent.md` - Product Owner (handoffs: BA, UX, Architect)
- `ba.agent.md` - Business Analyst (handoffs: UX, Dev-Lead, Orchestrator)
- `ux.agent.md` - UX Designer (handoffs: Architect, PO, BA)
- `architect.agent.md` - Solution Architect (handoffs: PO, Dev-Lead, Orchestrator)
- `dev-lead.agent.md` - Tech Lead (handoffs: TDD, BA, Orchestrator)
- `dev-tdd.agent.md` - TDD Orchestrator (handoffs: RED/GREEN/REFACTOR agents)
- `dev-tdd-red/green/refactor.agent.md` - TDD phase agents

## 📋 Workflow Execution Rules

### Starting New Projects
**Always use workflow launchers** in `.github/tasks/`:
- `start-pdlc.prompts.md` - Copy prompt, fill parameters, paste to `@orchestrator`
- `start-implementation.prompts.md` - For development after PDLC complete
- `start-cicd.prompts.md` - For CI/CD setup

**Never skip stages**: PDLC must complete sequentially (1→2→3→4→5→6→7→8). Implementation requires PDLC Stages 1-6 complete with approved documents (requirements.md, user-stories.md, architecture-design.md, tech-spec.md, design-systems.md, test-strategies.md).

### Decision Gates
**Orchestrator pauses at critical points** and presents 3 options with pros/cons:
- Architecture selection (Stage 3): Monolith vs Microservices vs Serverless
- Technology stack (Stage 4): Language/framework/database choices
- Sprint scope (Implementation Phase 1): Conservative vs Balanced vs Stretch
- Story acceptance (Implementation Phase 4): Based on BDD test results
- CI/CD phase: Bootstrap vs Stabilization vs Optimization

**Always wait for user decision** before proceeding.

## 💻 Development Standards

**Coding Standards**: Follow `.github/instructions/coding.instructions.md` strictly:
- SOLID principles, TDD discipline (RED-GREEN-REFACTOR)
- Test coverage >80%, cyclomatic complexity <10
- 13-point code review checklist before merge

**Documentation Standards**: Follow `.github/instructions/documentation.instructions.md`:
- **NEVER create documentation unless explicitly requested**
- **ONLY update README.md** for project documentation
- **NEVER create additional docs** (no AGENTS_REGISTRY.md, PROJECT_STRUCTURE.md, etc.)
- Use Mermaid for simple diagrams, PlantUML for complex UML

**Templates**: Use `.github/templates/` for all document generation:
- `prd.template.yml` - 13 PRD documents structure
- `user-story.template.yml` - Story format with acceptance criteria
- `tech-doc.template.yml` - Technical specifications
- `func-doc.template.yml` - Functional specifications

## 🔄 TDD Workflow (Critical)

**Implementation happens layer-by-layer**:
1. **Layer 1 (Database)**: Migrations, models, indexes
2. **Layer 2 (Backend)**: API endpoints, business logic, services
3. **Layer 3 (Config)**: Routes, DI, feature flags
4. **Layer 4 (Frontend)**: Components, state management, styling

**For each layer, execute strict TDD guided by the implementation plan**:
- **PREPARATION**: Read `/docs/user-stories/<USER-STORY-REF>/implementation-plan.md` for current layer
  - Note: Files to create/modify, BDD test coverage, TDD approach, architectural constraints
- **RED**: Write failing test supporting BDD assertion (use `dev-tdd-red`, guided by implementation plan)
- **GREEN**: Implement minimal code to pass (use `dev-tdd-green`, following implementation plan file structure)
- **REFACTOR**: Improve quality while tests pass (use `dev-tdd-refactor`, adhering to implementation plan constraints)
- **VERIFY**: Check BDD test progress after layer

**Entry point**: Failing BDD tests from feature files + Implementation plan  
**Exit condition**: All BDD scenarios pass for the user-story (as defined in implementation plan "Definition of Done")

**Implementation Plan Structure** (generated by dev-lead in Phase 2):
```markdown
# Implementation Plan: <USER-STORY-REF>

## Header
- User Story Reference and Title
- Epic Name
- Links to BDD scenarios
- Failing BDD test summary

## Layer 1 - Database
- Tables to create/modify
- Migrations (up/down scripts)
- Indexes for performance
- Model classes and validations
- **Files to create**: List specific migration files, model files
- **BDD Test Coverage**: Which BDD assertions will pass after this layer
- **TDD Approach**: Suggested test cases
- **Estimated Complexity**: Story points or hours

## Layer 2 - Backend Logic
- API endpoints (method, path, schemas)
- Service classes and business logic
- Validation rules and error handling
- Integration points
- **Files to create**: List specific controller, service, DTO files
- **BDD Test Coverage**: Which BDD assertions will pass
- **TDD Approach**: Suggested test cases
- **Architectural Constraints**: From /docs/prd/architecture-design.md
- **Estimated Complexity**: Story points

## Layer 3 - Configuration
- Route registration
- Dependency injection
- Feature flags
- Middleware setup
- **Files to create**: List specific config files
- **BDD Test Coverage**: Which BDD assertions will pass
- **TDD Approach**: Suggested test cases
- **Estimated Complexity**: Story points

## Layer 4 - Frontend
- Components to create (hierarchy)
- State management
- API client integration
- Styling requirements from /docs/design/design-systems.md
- **Files to create**: List specific component, service, style files
- **BDD Test Coverage**: Which BDD assertions will pass
- **TDD Approach**: Suggested test cases for UI interactions
- **Design Specifications**: Reference to design tokens/components
- **Estimated Complexity**: Story points

## Implementation Sequence
- Dependency order between layers
- Parallel work opportunities
- Risk areas and mitigation

## Definition of Done
- All BDD scenarios passing
- Test coverage > 80%
- Code review approved
- Tech specs met
- Design requirements implemented
```

## 📊 Progress Tracking

**Use `manage_todo_list` tool** extensively to track:
- PDLC stage progress (current stage, completed stages, documents generated)
- Implementation progress (epics, user-stories, current layer, TDD phase)
- CI/CD status (pipeline components, quality gates, build health)

**Check progress anytime**:
```bash
@orchestrator Show PDLC progress for [PROJECT_NAME]
@orchestrator Show implementation progress for [PROJECT_NAME]
@orchestrator Show CI/CD pipeline status for [PROJECT_NAME]
```

## 🎯 Development Approach

- **Go step-by-step interactively** - ask for clarifications, avoid assumptions
- **Present 3 options** for all important choices (architecture, tech stack, sprint scope) with pros/cons
- **Enforce traceability** - all documents trace to requirements.md, all code traces to user-stories
- **Quality gates first** - never skip approval gates or bypass BDD validation
- **One story at a time** - implement full layer stack for ONE story before moving to next
- **BDD drives TDD** - failing BDD tests are the entry point, passing tests are the exit condition
- **Document sparingly** - only update README.md unless user explicitly requests new documents

## 📚 Key Reference Files

**Essential Reading**:
- `.github/README.md` - System overview and workflow diagrams
- `.github/workflows/` - All three workflow definitions (PDLC, Implementation, CI/CD)
- `.github/agents/` - Agent profiles with subagentType definitions
- `.github/tasks/` - Workflow launcher prompts

**Quick Start**:
1. Read `.github/guides/HANDOFF-GUIDE.md` for agent coordination patterns
2. Choose launcher from `.github/tasks/` based on project state
3. Copy prompt template, fill parameters, invoke `@orchestrator`
4. Follow interactive prompts and make decisions at gates
5. Track progress via todo lists

**Never modify workflows directly** - use orchestrator to execute them

---

## 🔄 Adapting This Framework to Your Project

This framework becomes YOUR project's orchestration system through simple context substitution:

### What Stays the Same (Framework Patterns)
- ✅ Agent handoff chain (PM → PO → BA → UX → Architect → Dev-Lead → TDD)
- ✅ PDLC 8-stage workflow
- ✅ Implementation 6-phase workflow
- ✅ TDD sequencing (RED → GREEN → REFACTOR)
- ✅ Document consolidation (1 handoff + 1 execution log per story)
- ✅ BDD-driven test automation
- ✅ Quality gates and decision points

### What Changes (Your Project Context)
- 🔄 User-story identifiers: `AUTH-003` becomes `YOURPREFIX-003`
- 🔄 Feature domains: `features/auth/` becomes `features/yourmodule/`
- 🔄 Business logic: Requirements reflect YOUR business domain
- 🔄 Technology stack: Architecture decisions match YOUR tech choices
- 🔄 Team structure: Agents adapt to YOUR team composition

### Minimal Setup for New Projects
1. Copy `.github/` into your project
2. Run: `@orchestrator Assess project status for [YOUR_PROJECT_NAME]`
3. Answer questions about project scope, team, technology
4. Orchestrator configures agents for YOUR context
5. Begin PDLC Stage 1 or Implementation Phase 1

### Brownfield Project Setup
1. Copy `.github/` into your project
2. Run: `@orchestrator Retro-document project [YOUR_PROJECT_NAME]`
3. Agents scan code, reconstruct missing specs, capture decisions
4. Validate documentation with stakeholders
5. Begin implementation of next stories using framework

---

## ⚠️ Framework Is Context-Agnostic by Design

**Key Insight**: Every example in this framework (AUTH-003, US-001,UserTierSync, POST /api/auth/register, features/auth/, etc.) is a PLACEHOLDER for your project's real identifiers and behaviors.

**Your Responsibility**:
- Replace example IDs with YOUR project's naming convention
- Replace example features with YOUR domain-specific features  
- Keep framework patterns and workflows unchanged
- Use handoff and execution logging as defined (no modifications)
- Follow TDD sequencing strictly (no skipping phases)

**Result**: Framework scales from 1-person projects to enterprise teams. Same orchestration, different business logic.