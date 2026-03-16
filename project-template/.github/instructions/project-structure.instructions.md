# Project Structure Instructions

This document defines the standardized project structure for Gen-e2 projects, covering both **greenfield** (new projects) and **brownfield** (legacy replatforming) scenarios.

## Overview

All Gen-e2 projects follow a consistent structure that supports:
- Clear separation of concerns
- Scalable architecture
- Infrastructure as Code
- Comprehensive documentation
- CI/CD automation

## Base Project Structure (Greenfield)

Use this structure when starting a **new project from scratch**:

## 📂 Project Structure (Optimized)

```
project-root/
├── .github/
│   ├── agents/                    # AI agent system prompts
│   ├── instructions/              # Global coding & documentation standards
│   ├── workflows/                 # PDLC workflows (assessment, documents, implementation, cicd)
│   ├── prompts/                   # Reusable copy-paste prompts for agents
│   ├── tasks/                     # Daily task prompts (standup, TDD, code review, etc.)
│   ├── templates/                 # Document templates (user-story, implementation-plan, handoff, etc.)
│   └── guides/                    # Deep-dive guides (context-optimization, TDD-enforcement, handoffs, etc.)
│
├── docs/
│   ├── prd/                       # ✅ Phase 1-7 PDLC Documentation (FROZEN - read-only during implementation)
│   │   ├── requirements.md        # Business requirements
│   │   ├── personas.md            # User archetypes
│   │   ├── user-stories.md        # PRD user stories catalog with BDD scenarios (source of truth for story definitions)
│   │   ├── architecture-design.md # System architecture & constraints
│   │   ├── tech-spec.md           # Technical specifications
│   │   ├── design-systems.md      # UI components & design tokens
│   │   ├── test-strategies.md     # Testing approach & BDD scenarios
│   │   └── ...                    # Other PRD documents
│   │
│   ├── user-stories/              # ⭐ Phase 8 Implementation Tracking (ACTIVE during sprints)
│   │   ├── user-stories.md        # ⭐ MASTER STATUS TRACKING (SSOT) - Not Started | In Progress | Implemented | Delivered
│   │   ├── project-status.md      # 📊 Project dashboard (epic progress, velocity, blockers, metrics)
│   │   ├── current-sprint.md      # 📋 ACTIVE sprint planning & daily tracking (renamed to sprint-N.md after closure)
│   │   ├── sprint-1.md            # 📦 ARCHIVED Sprint 1 (closed, with retrospective)
│   │   ├── sprint-2.md            # 📦 ARCHIVED Sprint 2 (closed, with retrospective)
│   │   └── <US-REF>/              # ✨ Per-story implementation folders
│   │       ├── <US-REF>.md                      # Story definition (copy of PRD story with enrichment: AC, BDD, UX inputs, API contracts)
│   │       ├── implementation-plan.md           # Dev-Lead's layer-by-layer technical plan (Layer 1-4)
│   │       ├── api-design.md                    # API endpoints, schemas, authentication, error codes (if applicable)
│   │       ├── us-completition-checklist.md    # Definition of Done checklist (acceptance criteria, code quality, validation)
│   │       ├── features/                       # BDD feature files (Gherkin scenarios driving TDD)
│   │       │   ├── <domain>-<story-ref>.feature  # Gherkin feature file with Given-When-Then scenarios
│   │       │   └── <domain>-<story-ref>.steps.ts # Step definitions and failing tests
│   │       │
│   │       └── tdd-execution/                  # 🔄 TDD Cycle Execution Tracking (per cycle)
│   │           ├── 001/                        # First TDD cycle
│   │           │   ├── 001-HO-RED.json         # RED phase handoff (test written, failing)
│   │           │   ├── 001-HO-GREEN.json       # GREEN phase handoff (code implemented, test passing)
│   │           │   └── 001-HO-REFACTOR.md      # REFACTOR phase handoff (code quality improved)
│   │           ├── 002/                        # Second TDD cycle (if needed)
│   │           │   ├── 002-HO-RED.json
│   │           │   ├── 002-HO-GREEN.json
│   │           │   └── 002-HO-REFACTOR.md
│   │           └── [... additional cycles ...]
│   │
│   ├── design/                    # UX/UI design documents & design systems
│   ├── assessment/                # Phase 0 assessment outputs (if applicable)
│   └── [other documentation]/     # Architecture, deployment, etc.
│
├── features/                      # BDD feature files (Gherkin scenarios - project-wide source)
│   ├── feature/                   # Organized by feature domain
│   └── [domain]/                  # Feature files grouped by domain
│
├── src/                           # Application source code (implementation from TDD cycles)
├── tests/                         # Unit, integration, E2E tests
├── infra/                         # Infrastructure as Code (Terraform, CloudFormation, etc.)
├── README.md                      # Project overview and setup
└── TODO.md                        # Project task breakdown (by domain)
```

---


## Legacy Replatforming Structure (Brownfield)

Use this structure when **replatforming an existing legacy application**:

```
project-root/
├── README.md                      # Project overview and replatforming goals
├── .github/                       # Same as greenfield
│   ├── agents/
│   ├── instructions/
│   ├── workflows/
│   └── ...
│
├── docs/                          # Project documentation (enhanced for brownfield)
│   ├── prd/                       # ✅ Phase 1-7 PDLC Documentation (FROZEN)
│   │   ├── requirements.md
│   │   ├── personas.md
│   │   ├── user-stories.md        # PRD user stories (source of truth)
│   │   └── ...
│   │
│   ├── user-stories/              # ⭐ Phase 8 Implementation Tracking (ACTIVE)
│   │   ├── user-stories.md        # ⭐ MASTER STATUS TRACKING (SSOT)
│   │   ├── project-status.md      # 📊 Project dashboard
│   │   ├── current-sprint.md      # 📋 Active sprint
│   │   ├── sprint-1.md            # 📦 Archived sprints
│   │   └── <US-REF>/              # Per-story folders (same as greenfield)
│   │       ├── <US-REF>.md
│   │       ├── implementation-plan.md
│   │       ├── api-design.md
│   │       ├── us-completition-checklist.md
│   │       ├── features/
│   │       └── tdd-execution/
│   │           └── <TDD-CYCLE>/
│   │
│   ├── design/                    # UX/UI documents
│   ├── assessment/                # Phase 0 assessment (if applicable)
│   ├── legacy-app/                # 🔴 BROWNFIELD: Legacy app analysis
│   │   ├── architecture.md        # Legacy system architecture
│   │   ├── features.md            # Current features & functionality
│   │   ├── data-structures.md     # Database schemas & relationships
│   │   ├── api.md                 # Current API documentation
│   │   └── critical-features.md   # Prioritized migration list
│   │
│   ├── migration/                 # 🔴 BROWNFIELD: Migration planning
│   │   ├── migration-plan.md      # Detailed migration strategy
│   │   ├── data-migration.md      # Data migration procedures
│   │   └── rollback-procedures.md # Rollback & disaster recovery
│   │
│   ├── development-environment/   # Dev setup instructions
│   ├── deployment/                # Deployment strategy
│   ├── infrastructure/            # Infrastructure architecture
│   ├── monitoring/                # Monitoring & logging strategy
│   ├── security/                  # Security strategy
│   ├── testing/                   # Testing strategy
│   ├── meeting-transcripts/       # Meeting & mob programming notes
│   ├── index.md                   # Main documentation index
│   └── CONTRIBUTE.md              # Contribution guidelines
│
├── LegacyApps/                    # 🔴 BROWNFIELD: Legacy application archive
│   └── [legacy-app-name]/         # Original legacy codebase (reference only)
│
├── features/                      # BDD feature files (same as greenfield)
├── src/                           # New application source code
├── tests/                         # Unit, integration, E2E tests
├── infra/                         # Infrastructure as Code
├── TODO.md                        # Project task breakdown
└── project-modules/               # 🔴 BROWNFIELD: Legacy app analysis by module
    └── [module-name]/             # Per-module documentation (optional)
        ├── module.md              # Module overview
        ├── features.md            # Module features
        └── data-structures.md     # Data structures
```

## Directory Descriptions

### Core Directories (All Projects)

- **`README.md`**: Project overview, goals, setup instructions, and quick start guide
- **`scripts/`**: Automation scripts for project management, setup, and database initialization
- **`apps/`**: frontend applications (web, mobile)
- **`backend/`**: Server-side application code including API, services, and data access layers
- **`docs/`**: Comprehensive project documentation
- **`infra/`**: Infrastructure as Code (Terraform, CloudFormation, etc.)
- **`DevOps/`**: CI/CD pipeline configurations and automation
- **`services/`**: Serverless functions (AWS Lambda, Azure Functions, etc.)

### Brownfield-Specific Directories

- **`LegacyApps/`**: Archive of the original legacy application code and documentation
- **`docs/legacy-app/`**: Analysis of legacy app architecture, features, and data structures
- **`docs/CriticalFeatures.md`**: Prioritized list of critical features requiring immediate migration
- **`docs/migration/`**: Detailed migration plan, data migration strategies, and rollback procedures

## Key Files

### Greenfield Projects

| File | Purpose |
|------|---------|
| `README.md` | Project overview and goals |
| `docs/index.md` | Documentation index |
| `docs/CONTRIBUTE.md` | Contribution guidelines |
| `infra/docs/feature/authentication/index.md` | Authentication infrastructure documentation |
| `TODO.md` | Task breakdown (if needed) |
| `.gitignore` | Version control exclusions |

### Brownfield Projects (Additional)

| File | Purpose |
|------|---------|
| `docs/CriticalFeatures.md` | Prioritized migration features |
| `docs/legacy-app/*.md` | Legacy app analysis |
| `docs/infrastructure.md` | Infrastructure architecture |
| `docs/api.md` | API architecture |
| `docs/backend.md` | backend architecture |
| `docs/testing.md` | Testing strategy |
| `docs/deployment.md` | Deployment strategy |
| `docs/deployment-pipeline.md` | CI/CD pipeline details |
| `docs/monitoring.md` | Monitoring and logging |
| `docs/security.md` | Security strategy |
| `docs/migration.md` | Migration plan |
| `docs/rollback.md` | Rollback procedures |
| `docs/development-environment.md` | Dev environment setup |
| `docs/issue-tracker.md` | Clarifications and questions |
| `TODO.md` | Task breakdown by domain |

## Documentation Standards

### docs/features/
- **One file per feature**
- Include acceptance criteria, user stories, and technical requirements
- Link to related API documentation and design documents

### docs/api/
- **Swagger/OpenAPI format** for API documentation
- Include examples of requests and responses
- Document authentication mechanisms and error codes

### docs/infrastructure/
- Use **PlantUML** for architecture diagrams
- Document cloud provider, services, and networking
- Include disaster recovery and scaling strategies

### docs/testing/
- Define testing scope (unit, integration, E2E)
- Document testing frameworks and tools
- Include test coverage requirements

## TODO.md Format

For all projects, create `TODO.md` with domain-based task breakdown:

```markdown
## Domain
[ ] Task to be done (owner)
```

**Requirements**:
- Tasks must be small enough to complete in a few hours
- Include tasks outside development (DevOps, security, documentation review)
- Add review tasks for all generated files (architecture, API docs, etc.)
- Organize by domain: frontend, backend, Infrastructure, DevOps, Testing, Security, Documentation

---

## Workflow Conventions & Files

This section documents the `.github/` directory structure and workflow-related files used throughout the PDLC.

### `.github/` Directory Structure

```
.github/
├── agents/                            # Agent system prompts
│   ├── orchestrator.agent.md         # Workflow coordinator (PDLC decisions/gates)
│   ├── po.agent.md                   # Product Owner (requirements/tradeoffs)
│   ├── dev-lead.agent.md             # Dev Lead (architecture/plans)
│   ├── dev-tdd.agent.md              # TDD Orchestrator (cycle management)
│   ├── dev-tdd-red.agent.md          # RED phase executor
│   ├── dev-tdd-green.agent.md        # GREEN phase executor
│   └── dev-tdd-refactor.agent.md     # REFACTOR phase executor
│
├── instructions/                      # System-wide instructions
│   ├── project-structure.instructions.md    # THIS FILE: Project structure conventions
│   ├── coding.instructions.md               # Code standards (SOLID, complexity, coverage)
│   ├── documentation.instructions.md        # Code documentation guidelines
│   ├── api-design.instructions.md           # API design and OpenAPI standards
│   ├── run-merchant-locally.instructions.md # Project-specific setup (if brownfield)
│   └── ...                                  # Other project-specific instructions
│
├── workflows/                         # Workflow definitions (reference only, read all before acting)
│   ├── assessment.workflows.md        # Phase 0: Assessment & Discovery
│   ├── documents.workflows.md         # Phase 1-7: Documentation (Routes A/B/C/D)
│   ├── implementation.workflows.md    # Phase 8: TDD Implementation
│   ├── ci-cd.workflows.md            # CI/CD pipeline definitions
│   └── ...                            # Other workflow definitions
│
├── prompts/                           # Copilot-surfaced prompts (via /commands)
│   ├── quick-reference.prompt.md     # Fast lookup: tasks, roles, files
│   ├── start-implementation.prompt.md # Kick off Phase 8 (TDD)
│   ├── plan-us.prompt.md             # Create user story implementation plan
│   └── ...                            # Other copilot prompts
│
├── tasks/                             # Task starters (copy prompt when starting work)
│   ├── start-implementation.prompts.md   # Copy when beginning TDD phase
│   ├── plan-us.prompts.md               # Copy when creating user story plan
│   └── ...                              # Other task starters
│
├── templates/                         # Document templates (copy when creating new files)
│   ├── user-story-tmpl.md         # User story template
│   ├── implementation-plan-tmpl.md # Implementation plan template
│   ├── handoff-tmpl.md            # Handoff file template (per TDD cycle)
│   ├── tdd-execution-tmpl.md      # TDD execution audit log template
│   └── ...                            # Other templates
│
└── guides/                            # Procedural guides
    ├── bdd-scenario-writing.guide.md  # How to write BDD scenarios
    ├── tdd-red-phase.guide.md         # RED phase execution steps
    ├── tdd-green-phase.guide.md       # GREEN phase execution steps
    ├── tdd-refactor-phase.guide.md    # REFACTOR phase execution steps
    └── ...                            # Other procedural guides
```

### Workflow-Related Files in `docs/`

#### Phase 0: Assessment (Outputs Only)
```
docs/assessment/
├── PREREQUISITES-REQUEST.yml           # Formal access request to client
├── AI-READINESS-REPORT.md             # Comprehensive maturity assessment
├── MULTI-DIMENSIONAL-ASSESSMENT.md    # 8-dimension scores & confidence
├── HANDOFF-PACKAGE/                   # Handoff to documentation phase
│   ├── ROADMAP.md                     # Roadmap and success metrics
│   └── ...                            # Other handoff artifacts
└── interviews/                        # Stakeholder validation notes
    └── [stakeholder-name].md          # Interview transcripts
```

#### Phases 1-7: Documentation (PRD Suite)
```
docs/prd/                              # ✅ FROZEN after documentation complete
├── requirements.md                    # Master PRD (consolidated from routes)
├── personas.md                        # User personas (if interview-driven)
├── user-stories.md                    # ⭐ User stories catalog (SSOT for PRD)
├── epics.md                           # Epic definitions (Route B alternative)
├── architecture-design.md             # System architecture
├── tech-spec.md                       # Technical specifications
├── design-systems.md                  # UI/UX design system
└── test-strategies.md                 # Testing approach & BDD scenarios
```

#### Phase 8: Implementation (ACTIVE, Per-Story)
```
docs/user-stories/
├── user-stories.md                    # ⭐ MASTER STATUS TRACKING (SSOT)
│                                      # Updates after each story completion
├── project-status.md                  # 📊 Project dashboard
├── current-sprint.md                  # 📋 Active sprint tracking
├── sprint-1.md, sprint-2.md          # 📦 Archived sprints
│
└── <US-REF>/                          # Per-story folder (e.g., AUTH-003/)
    ├── <US-REF>.md                   # Story content (copy from PRD)
    ├── implementation-plan.md         # ⭐ FROZEN architecture (ref only)
    ├── api-design.md                 # API endpoint specifications (if applicable)
    ├── us-completion-checklist.md    # Story completion criteria
    ├── features/                     # BDD feature files (driver for TDD)
    │   └── auth-tier-sync.feature    # Example: feature file
    │
    └── tdd-execution/                # ⭐ TDD CYCLE TRACKING (ACTIVE)
        ├── <CYCLE>-RED.md            # RED phase summary
        ├── <CYCLE>-GREEN.md          # GREEN phase summary
        ├── <CYCLE>-REFACTOR.md       # REFACTOR phase summary
        └── <CYCLE>-HANDOFF.md        # Cycle completion handoff
```

### Key File Purposes & Update Patterns

#### `.github/agents/*.agent.md` (Agent System Prompts)
- **Purpose**: Define agent roles, responsibilities, and decision frameworks
- **Update Pattern**: Read-only (unless role definition changes)
- **Used By**: Every agent action (self-reference before acting)
- **Example**: `orchestrator.agent.md` defines when to present 3-option gates vs. decide

#### `.github/instructions/*.instructions.md` (System-Wide Standards)
- **Purpose**: Document coding standards, API patterns, documentation rules
- **Update Pattern**: Update when standards change (code review checklists, new patterns)
- **Used By**: All developers (reference during code review)
- **Example**: `coding.instructions.md` defines SOLID principles, cyclomatic complexity <10

#### `.github/workflows/*.workflows.md` (Workflow Definitions)
- **Purpose**: Describe complete workflow phases (assessment, documentation, implementation)
- **Update Pattern**: Read-only reference (define sequence, not execute)
- **Used By**: Orchestrator (decides routing); dev-lead (creates implementation plans)
- **Example**: `implementation.workflows.md` defines RED → GREEN → REFACTOR sequence

#### `.github/prompts/*.prompt.md` (Copilot Surfaced)
- **Purpose**: Fast lookup, task starters, context bridges for heavy-load agents
- **Update Pattern**: Update when new prompts needed or task patterns change
- **Used By**: Copilot `/` command display; agents copy-paste for context
- **Example**: `quick-reference.prompt.md` maps tasks to files/roles for 1-second lookup

#### `.github/templates/*-tmpl.md` (Document Templates)
- **Purpose**: Canonical structure for user stories, plans, handoffs, audit logs
- **Update Pattern**: Update when document schema changes (new required sections)
- **Used By**: Developers (copy when creating new user story/plan/handoff)
- **Example**: `handoff-tmpl.md` ensures consistent cycle-to-cycle transitions

#### `docs/prd/` (PRD Suite - FROZEN)
- **Purpose**: Complete requirements, user stories, architecture, tech specs
- **Update Pattern**: Frozen after Phase 7; only updated through formal change request
- **Contents**: user-stories.md is SSOT for story definitions, test strategies
- **Used By**: dev-lead (creates implementation plans), dev-tdd (reads stories for BDD)
- **Status**: ✅ Read-only after documentation phase

#### `docs/user-stories/user-stories.md` (Master Status - ACTIVE)
- **Purpose**: Single source of truth for implementation progress
- **Update Pattern**: Update row after story completion, preserve commit history
- **Columns**: US-REF, Title, Status (Open/In-Progress/Complete), Owner, Branch
- **Used By**: PM (tracking), orchestrator (routing decisions), developers (current work)
- **Status**: ⭐ ACTIVE; update after each user story completes

#### `docs/user-stories/<US-REF>/implementation-plan.md` (Per-Story Plan)
- **Purpose**: Layer-by-layer architecture (Database → API → Service → Controller → UI)
- **Update Pattern**: Frozen after dev-lead creates; serves as reference throughout TDD
- **Content**: 1-2 paragraphs per layer, decision rationale, tech choices
- **Used By**: dev-tdd (reference during RED phase), dev-tdd-red (guiding test design)
- **Status**: 🔒 Frozen (reference only during development)

#### `docs/user-stories/<US-REF>/handoff.md` (Cycle Handoff - ACTIVE)
- **Purpose**: Current cycle snapshot (what's done, what's next, blockers)
- **Update Pattern**: Overwrite after each TDD phase (RED → GREEN → REFACTOR)
- **Content**: Current cycle summary, test status, implementation notes, next steps
- **Used By**: dev-tdd (transition between RED/GREEN/REFACTOR), orchestrator (sprint planning)
- **Status**: ⭐ Overwritten each phase; preserve in git history

#### `docs/user-stories/<US-REF>/tdd-execution.md` (Audit Log - APPEND-ONLY)
- **Purpose**: Complete audit trail of all TDD cycles (immutable history)
- **Update Pattern**: Append-only; never delete or rewrite entries
- **Content**: Per-cycle: timestamp, phase, test count, coverage %, refactor notes
- **Used By**: PM (progress tracking), retrospectives (what worked, learnings)
- **Status**: 📋 Append-only (git history shows all entries)

#### `docs/user-stories/<US-REF>/features/` (BDD Feature Files)
- **Purpose**: Executable specifications (Gherkin/BDD syntax)
- **Update Pattern**: Add new scenarios as RED phase reveals missing features
- **Used By**: dev-tdd-red (driver for test design), dev-tdd-green (validation)
- **Status**: ⭐ Grows during implementation (new scenarios per cycle)

### Commit Message Conventions

#### Assessment Phase (Phase 0)
```
ASSESSMENT-PHASE-0: [description]
Example: ASSESSMENT-PHASE-0: Client maturity analysis and prerequisites request
```

#### Documentation Phases (Phases 1-7)
```
DOC-PHASE-[1-7]-[STEP]: [description]
Example: DOC-PHASE-2-PERSONAS: Create user personas from stakeholder interviews
Example: DOC-PHASE-5-API: Design REST endpoints for auth service
```

#### Implementation Phase (Phase 8 - TDD)
```
TDD-<US-REF>-<PHASE>-<CYCLE>: [description]
Example: TDD-AUTH-003-RED-1: Write failing test for user tier sync
Example: TDD-AUTH-003-GREEN-1: Implement user tier sync in service layer
Example: TDD-AUTH-003-REFACTOR-1: Extract tier sync logic to separate method
```

**Rules**:
- One commit per TDD phase (RED/GREEN/REFACTOR)
- Include cycle number (1, 2, 3, etc.) for traceability
- Message should describe what was tested/implemented/improved

### Handoff Chain & File Transitions

```
Phase 0: Assessment
↓ (outputs: prerequisites, AI-readiness report)
Phase 1-7: Documentation  
↓ (outputs: docs/prd/ suite)
Phase 8: Implementation (TDD)
├─ RED phase
│  ├─ Input: Feature files + implementation-plan.md
│  ├─ Output: Failing tests + handoff.md (overwrite)
│  ├─ Commit: TDD-<US>-RED-<CYCLE>
│  └─ Next: dev-tdd-green.agent
├─ GREEN phase
│  ├─ Input: handoff.md + failing tests
│  ├─ Output: Passing implementation + handoff.md (overwrite)
│  ├─ Commit: TDD-<US>-GREEN-<CYCLE>
│  └─ Next: dev-tdd-refactor.agent
└─ REFACTOR phase
   ├─ Input: handoff.md + passing code
   ├─ Output: Improved code + handoff.md (overwrite)
   ├─ Commit: TDD-<US>-REFACTOR-<CYCLE>
   └─ Next: dev-tdd.agent (new cycle or story)
```

---

## Project Setup Checklist

### Greenfield Projects
1. ✅ Create base directory structure
2. ✅ Initialize Git repository
3. ✅ Create README.md with project overview
4. ✅ Set up .gitignore (language-specific)
5. ✅ Create docs/index.md documentation index
6. ✅ Set up dependency management (package.json, requirements.txt, etc.)
7. ✅ Create infrastructure files (if needed)
8. ✅ Set up CI/CD pipeline
9. ✅ Configure testing frameworks
10. ✅ Install project dependencies

### Brownfield Projects (Additional)
11. ✅ Archive legacy app in LegacyApps/
12. ✅ Document legacy app in docs/legacy-app/
13. ✅ Create feature list from legacy app
14. ✅ Prioritize features in docs/CriticalFeatures.md
15. ✅ Create migration plan in docs/migration/
16. ✅ Document rollback procedures in docs/rollback/
17. ✅ Set up issue tracker in docs/issue-tracker.md
18. ✅ Create API documentation (if legacy app lacks API)
19. ✅ Document interfaces to other systems
20. ✅ Create data migration strategy

## Best Practices

1. **Version Control**: Always initialize Git and create initial commit after setup
2. **Environment Variables**: Use .env files for secrets (add to .gitignore)
3. **Code Quality**: Set up linters and formatters from the start
4. **Security**: Include vulnerability scanning tools
5. **Documentation**: Keep documentation synchronized with code changes
6. **Testing**: Write tests alongside feature development
7. **Deployment**: Use staging environments before production
8. **Monitoring**: Set up logging and monitoring early

## Questions to Ask Before Setup

### All Projects
1. What are the project requirements and features?
2. Which cloud provider? (AWS, Azure, GCP, etc.)
3. What is the target architecture? (Monolith, Microservices, Serverless)
4. API-first or frontend first?
5. Specific languages or frameworks required?
6. Infrastructure format? (Terraform, CloudFormation, etc.)

### Brownfield Projects (Additional)
7. What legacy app needs replatforming?
8. Key challenges in replatforming?
9. Interfaces to other systems that must be maintained?
10. Requirements for replatforming process? (same data structure, UX consistency, etc.)
11. Critical features that must be migrated first?

## Maintenance

- **Review** .gitignore after file creation to ensure proper exclusions
- **Update** docs/index.md when adding new documentation
- **Sync** README.md with current project state
- **Validate** all generated files (architecture, API docs) and update as needed
- **Track** tasks in TODO.md and mark complete when done

---

**Last Updated**: January 2026  
**Version**: 1.0
