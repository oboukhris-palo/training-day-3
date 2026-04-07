# AI Agent Instructions: PDLC Orchestration Framework

## ⚡ CRITICAL: This is a Reusable Template Framework

**You are working in a META-FRAMEWORK**, not a specific project. All identifiers (US-XXX, US-001, PAYMENT-001) are EXAMPLES showing patterns for future projects. This `.github/` folder gets copied into any project to orchestrate AI agents through PDLC workflows.

## 🎯 Your Role & Context

**Before taking action**, always:
1. **Check which agent you are**: Read `.github/agents/<agent-name>.agent.md` for your responsibilities
2. **Verify current progress**: Check `docs/05-implementation/epics/<EPIC-REF>/user-stories/<STORY-REF>/implementation-plan.md` checkboxes and git commit history for current TDD phase state
3. **Follow the plan**: Reference `docs/05-implementation/epics/<EPIC-REF>/user-stories/<STORY-REF>/implementation-plan.md` for layer-by-layer implementation guidance

**Agent Roles** (handoff chain):
- **orchestrator**: Coordinates workflows, presents decision gates (3 options with tradeoffs)
- **project-manager**: Manages project execution, timelines, and coordination across teams
- **product-owner**: Defines product requirements and prioritizes features—surfaces tradeoffs, NEVER decides unprompted
- **ba**: Creates functional specifications, BDD scenarios, and acceptance criteria for stories
- **ux**: Designs user experiences and creates interactive prototypes
- **architect**: Designs system architecture, selects technology stack, and guides technical strategy
- **ai-engineering**: Optimizes prompts, designs multi-agent systems, evaluates LLM models, manages PRU costs
- **dev-lead**: Pre-creates folder structure, writes concise implementation plans (max 500 words/layer)
- **dev-tdd**: Orchestrates RED → GREEN → REFACTOR (strict sequencing, no parallel cycles)
- **dev-tdd-red/green/refactor**: Execute TDD phases following implementation plan
- **qa**: Executes comprehensive testing (E2E, BDD validation), verifies acceptance criteria, ensures quality gates
- **meeting.assistant**: Transforms meeting transcripts into professional meeting minutes (Comptes Rendus)

## � Folder Structure & Path Naming Conventions

### Documentation Hierarchy (Immutable PRD)
```
docs/
├── 01-requirements/          # Phase 1-2: Requirements & personas (IMMUTABLE)
│   ├── requirements.md       # Master PRD
│   ├── personas.md           # User personas
│   ├── user-stories.md       # PRD catalog (REFERENCE: /docs/01-requirements/user-stories.md)
│   ├── business-case.md      # Business justification
│   └── themes/               # Route B outputs
│
├── 02-architecture/          # Phase 3-4: Architecture & tech specs (IMMUTABLE)
│   ├── architecture-design.md
│   ├── tech-spec.md
│   └── design-systems.md
│
├── 03-testing/               # Phase 5: Testing strategies (IMMUTABLE)
│   └── test-strategies.md
│
├── 04-planning/              # Phase 6-7: Deployment & planning (IMMUTABLE)
│   ├── iteration-planning.md
│   └── deployment-plan.md
```

### Implementation Status Tracking (Mutable SSOT)
```
docs/
└── 05-implementation/
    ├── user-stories.md       # ⭐ SINGLE SOURCE OF TRUTH for implementation progress
    │                          # REFERENCE: /docs/05-implementation/user-stories.md
    │
    └── epics/
        └── <EPIC-REF>/       # Epic identifier (e.g., AUTH-001)
            └── user-stories/
                └── <US-REF>/ # User story identifier (e.g., US-001)
                    ├── description.md          # Story definition: requirements, acceptance criteria, DoD
                    ├── implementation-plan.md  # Layer-by-layer guide with checkboxes (TDD execution)
                    ├── plan-approval.yaml      # Human validation gate (approved before TDD starts)
                    └── features/               # BDD scenarios from BA agent (Given/When/Then)
                        ├── user-authentication.feature
                        └── profile-management.feature
```

### Key Path Distinctions
- **PRD References**: Use `/docs/01-requirements/user-stories.md` for immutable specifications
- **Implementation Status**: Use `/docs/05-implementation/user-stories.md` for current progress tracking (SSOT)
- **Epic Structure**: Always include `/epics/<EPIC-REF>/user-stories/<US-REF>/` when referencing implementation artifacts
- **Agent Logs**: **MANDATORY for ALL agents** - See comprehensive logging rules in `.github/instructions/agent-logging.instructions.md`
  - **Assessment Phase**: `/logs/00-assessment/agent-{name}-YYYYMMDD.md`
  - **Requirements Phase**: `/logs/01-requirements/agent-{name}-YYYYMMDD.md`
  - **Architecture Phase**: `/logs/02-architecture/agent-{name}-YYYYMMDD.md`
  - **Testing Phase**: `/logs/03-testing/agent-{name}-YYYYMMDD.md`
  - **Planning Phase**: `/logs/04-planning/agent-{name}-YYYYMMDD.md`
  - **Implementation (TDD)**: `/logs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/agent-{name}-YYYYMMDD.md`
  - **Implementation (Non-TDD)**: `/logs/05-implementation/agent-{name}-YYYYMMDD.md`
  - **Cross-Phase**: `/logs/agent-{name}-YYYYMMDD.md`
- **Plan Snapshots**: Immutable versions created when plans change: `implementation-plan-v1.md`, `implementation-plan-v2.md`, etc.

## �📋 Critical Document Patterns

**Phase 0 Assessment Outputs** (ONE set per engagement):
```
docs/assessment/
├── prerequisites-request.yml       # Formal access request to client
├── baseline-assessment.md          # Initial findings from available inputs
├── multi-dimensional-assessment.md # 8-dimension maturity scores with confidence
├── ai-readiness-report.md          # Comprehensive transformation strategy & roadmap
├── HANDOFF-PACKAGE/                # Complete context for documentation phase
│   ├── assessment-summary.md       # Executive summary (2 pages)
│   ├── technology-inventory.md     # Complete tech stack with versions
│   ├── architecture-overview.md    # System architecture and integration map
│   ├── transformation-roadmap.md   # Phased implementation plan (0-18+ months)
│   ├── success-metrics.md          # KPIs and measurement approach
│   └── raw-data/                   # Evidence sources and supporting data
└── interviews/                     # Stakeholder validation notes and workshop summaries
```

**Phase 1-7 Documentation Outputs** (ONE PRD suite per engagement):
```
docs/01-requirements/
├── requirements.md                 # Master PRD (consolidated from routes)
├── personas.md                     # User personas (if interview-driven)
├── user-stories.md                 # User stories with epics and acceptance criteria
├── business-case.md                # Business justification
└── themes/                         # Route B outputs (functional themes)

docs/02-architecture/
├── architecture-design.md          # System architecture
├── tech-spec.md                    # Technical specifications
└── design-systems.md               # Design system and components

docs/03-testing/
└── test-strategies.md              # Testing approach and BDD scenarios

docs/04-planning/
├── iteration-planning.md           # Sprint/iteration planning
└── deployment-plan.md              # Deployment and rollout strategy
```

**Phase 8 Implementation Outputs** (ONE entry per user story):
```
docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/
├── description.md             # Story definition: requirements, acceptance criteria, DoD
├── implementation-plan.md     # Layer-by-layer guide with checkboxes (TDD execution)
├── plan-approval.yaml         # Human validation gate (approved before TDD starts)
└── features/                  # BDD scenarios from BA agent (Given/When/Then)
    ├── user-authentication.feature
    └── profile-management.feature
```

**Git commits**: 
- Assessment phase: `ASSESSMENT-PHASE-0: [description]`  
  Example: `ASSESSMENT-PHASE-0: Client maturity analysis and prerequisites request`
- Documentation phase: `DOC-PHASE-[1-7]-[STEP]: [description]`  
  Example: `DOC-PHASE-2-PERSONAS: Create user personas from stakeholder interviews`
- TDD phase: `TDD-<US-REF>-<PHASE>-<CYCLE>-YYYYMMDD: [description]` (date in YYYYMMDD format)  
  Example: `TDD-US-001-RED-18-20260402: Write failing test for user tier sync`

## 🔄 TDD Workflow (Non-Negotiable Sequencing)

**RED Phase** → Write failing test, mark checkbox in implementation-plan.md, commit  
**GREEN Phase** → Implement minimal code, mark checkbox in implementation-plan.md, commit  
**REFACTOR Phase** → Improve quality, mark checkbox in implementation-plan.md, commit

**Rules**:
- One active cycle per story (no parallel RED/GREEN/REFACTOR)
- One active story in TDD at a time
- BDD scenarios from `features/` drive implementation
- All tests must pass before moving to next phase

---

## 📋 Agent Logging (MANDATORY - No Exceptions)

**⚠️ UNBREAKABLE RULE: ALL agent interactions MUST be logged.**

### Core Logging Requirements

**Every agent action requires**:
1. **Log file creation**: Use template `.github/templates/agent-log-tmpl.md`
2. **Phase-specific path**: Log to appropriate PDLC phase directory
3. **Real-time logging**: Log immediately after action completes
4. **Complete entry**: Include all required fields (timestamp, action, status, context, outcome, handoff)

### Log Location by Phase

| Phase | Path Pattern |
|-------|-------------|
| Assessment | `/logs/00-assessment/agent-{name}-YYYYMMDD.md` |
| Requirements | `/logs/01-requirements/agent-{name}-YYYYMMDD.md` |
| Architecture | `/logs/02-architecture/agent-{name}-YYYYMMDD.md` |
| Testing | `/logs/03-testing/agent-{name}-YYYYMMDD.md` |
| Planning | `/logs/04-planning/agent-{name}-YYYYMMDD.md` |
| Implementation (TDD) | `/logs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/agent-{name}-YYYYMMDD.md` |
| Implementation (Non-TDD) | `/logs/05-implementation/agent-{name}-YYYYMMDD.md` |
| Cross-Phase | `/logs/agent-{name}-YYYYMMDD.md` |

### Quick Log Entry Template

```markdown
## {ISO8601_TIMESTAMP} | Action: {DESCRIPTION} | Status: {success|failure|partial|blocked}

- **Phase**: {PDLC_PHASE}
- **Epic/Story**: {EPIC_REF}/{US_REF} (if applicable)
- **Layer/Cycle**: {LAYER}/{CYCLE} (if applicable)
- **Files**: [{changed_files}]
- **PRU**: ~{estimate}
- **Status**: {status}
- **Changes**: {brief_description}
- **Blockers**: {none_or_description}
- **Next**: {next_agent} (if handoff)

---
```

### Validation Enforcement

**Orchestrator validates logs at**:
- Every agent handoff
- Every phase transition
- Every quality gate
- End of day (daily summary)

**Missing logs = non-compliant action** (requires remediation)

**Full Documentation**: See `.github/instructions/agent-logging.instructions.md` for comprehensive logging standards, examples, and enforcement mechanisms.

---

## 🆕 Framework 2.0.0: Enhanced Features (March 2026)

### 🏷️ Agent Versioning System

**All agents now track versions** with metadata in YAML frontmatter:

```yaml
---
name: Agent Name
version: 1.0.0
last_updated: 2026-03-17
breaking_changes: false
compatible_with:
  min: "framework-2.0.0"
  max: "framework-3.x"
---
```

**Version Changelog**: `.github/agents/CHANGELOG.md` tracks all agent updates with migration notes

**Git Tags**: `agent/{agent_name}@{version}` (e.g., `agent/dev-tdd-green@1.2.0`)

**Breaking Changes**:
- Orchestrator prompts for confirmation with diff summary
- Migration notes required in CHANGELOG

### 📋 Action Tracing & Agent Logs

**Agent actions are logged to immutable daily files** for audit trails and debugging:

**TDD Agents** (per-story):
- Location: `/logs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/agent-{agent_name}-YYYYMMDD.md`
- Examples: `agent-dev-tdd-red-20260317.md`, `agent-dev-tdd-green-20260317.md`

**Other Agents** (root-level):
- Location: `/logs/agent-{agent_name}-YYYYMMDD.md`
- Examples: `agent-orchestrator-20260317.md`, `agent-dev-lead-20260317.md`

**Log Entry Format** (ISO8601 timestamps, append-only):
```markdown
## 2026-03-17T09:45:33Z | Phase: RED | Cycle: 001

- **Status**: success
- **Layer**: Layer 1 (Database & Domain Model)
- **Files touched**: [file1.cs, file2.sql]
- **Progress tracking**: Checkboxes in implementation-plan.md marked [x] as tasks complete
- **Rationale**: Created failing test for tier sync validation
- **Next step**: awaiting → dev-tdd-green
```

**Use Cases**:
- Debugging TDD failures
- Audit trail for compliance
- Process improvement analysis
- Knowledge transfer for onboarding

### ✅ Implementation Plan Approval Gate

**Human validation required before TDD execution** via `plan-approval.yaml`:

**Location**: `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/plan-approval.yaml`

**Workflow**:
1. **Dev-Lead creates plan** → Creates `plan-approval.yaml` with `status: changes-requested`
2. **Dev-Lead reviews checklist** → Validates architecture, dependencies, BDD mapping
3. **Dev-Lead approves** → Sets `status: approved`
4. **Orchestrator validates** → Checks approval before launching TDD execution
5. **Plan modified** → Auto-revokes approval, requires re-review

**Status Values**:
- `approved`: TDD execution can proceed
- `changes-requested`: TDD BLOCKED, plan needs revision
- `revoked`: Auto-set when plan modified after approval

**Approval Checklist** (validated in `plan-approval.yaml`):
- [ ] Implementation plan follows layer architecture (DB → Service → API → UI)
- [ ] BDD scenarios map to implementation layers
- [ ] All external dependencies documented
- [ ] Database migration order correct
- [ ] Critical business logic addressed
- [ ] Error handling strategy defined

**Plan Versioning**:
- `implementation-plan.md` = CURRENT version (always latest)
- `implementation-plan-v1.md`, `v2.md` = IMMUTABLE snapshots (historical)
- When plan modified: Create snapshot, update current, auto-revoke approval

### ⚡ YOLO Mode (Rapid Prototyping)

**Skip approval gate for low-risk stories** with explicit risk acknowledgment:

**Activation**: `@orchestrator YOLO mode for <US-REF> (I acknowledge the risks)`

**Pre-flight Checks** (Auto-executed):
- ✅ All BDD tests written and failing
- ✅ Git working tree clean
- ✅ Implementation plan exists and complete
- ✅ No open blockers

**Safety Rails**:
- **Single-cycle lock**: Only ONE TDD cycle allowed
- **Auto-abort on regression**: Stops if ANY existing test fails
- **Mandatory review after cycle**: Human review required before continuing

**After YOLO Cycle**:
- Auto-create `plan-approval.yaml` with `status: changes-requested`
- Require normal approval for subsequent cycles

**Use Cases**:
- Rapid prototyping
- Low-risk bug fixes
- Experimental features with isolated scope
- Learning/training scenarios

---

## 🗂️ Key Files & Their Purpose

| File | Purpose | Update Pattern |
|------|---------|----------------|
| `.github/agents/*.agent.md` | Agent system prompts with version metadata | Read-only (defines your behavior) |
| `.github/agents/CHANGELOG.md` | Agent version history and migration notes | Updated when agents change |
| `.github/templates/*.template.md` | Document templates | Reference for structure |
| `.github/templates/plan-approval-tmpl.yaml` | Human validation gate template | Reference for approval files |
| `.github/workflows/*.workflows.md` | PDLC/Implementation/CI-CD flows | Read-only (workflow definitions) |
| `.github/checkpoint.yaml` | ⭐ Current PDLC position tracking (context recovery for agents) | Updated on each commit |
| `.github/workflows/assessment.workflows.md` | **Phase 0**: Client assessment, prerequisites, AI readiness | Reference for discovery phase |
| `.github/workflows/documents.workflows.md` | **Phases 1-7**: Adaptive PRD generation (Routes A/B/C/D) | Reference for documentation strategy |
| `.github/workflows/implementation.workflows.md` | **Phase 8**: TDD-driven development with approval gates | Reference for implementation phase |
| `docs/assessment/` | Assessment phase outputs (prerequisites, AI readiness report) | Generated during Phase 0 |
| `docs/inputs/` | Client-provided materials (epics, docs, interviews, code) | Input source for Phase 0 assessment |
| `logs/agent-{agent}-YYYYMMDD.md` | Root-level agent action logs (non-TDD agents) | Append-only daily logs |
| `docs/01-requirements/` | Requirements phase documents (requirements, personas, user-stories, business-case) | Generated during Phase 1-2 |
| `docs/02-architecture/` | Architecture phase documents (architecture-design, tech-spec, design-systems) | Generated during Phase 3-4 |
| `docs/03-testing/` | Testing phase documents (test-strategies) | Generated during Phase 5 |
| `docs/04-planning/` | Planning phase documents (iteration-planning, deployment-plan) | Generated during Phase 6-7 |
| `docs/01-requirements/user-stories.md` | PRD user stories catalog | Generated during documentation phase |
| `docs/05-implementation/user-stories.md` | ⭐ Implementation status tracking (SSOT) | Update as stories progress |
| `docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/implementation-plan.md` | Layer-by-layer architecture (CURRENT version) | Frozen after approval |
| `docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/implementation-plan-v{N}.md` | IMMUTABLE plan snapshots (historical) | Created when plan modified |
| `docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/plan-approval.yaml` | Human validation gate for TDD execution | Created by dev-lead, updated on changes |
| `logs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/agent-{agent}-YYYYMMDD.md` | Per-story TDD agent action logs | Append-only daily logs |
| `docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/implementation-plan.md` | Implementation plan with checkboxes | Update checkboxes as work completes |
| `.github/agents/CHANGELOG.md` | Agent versioning and migration history (Framework 2.0.0+) | Reference for breaking changes |

## 🚀 PDLC Workflow Sequence

**Complete PDLC Flow:**
1. **Phase 0**: Assessment & Discovery (`.github/workflows/assessment.workflows.md`)
   - Client input assessment and maturity classification
   - Prerequisites request generation
   - AI readiness report creation
   - Handoff to documentation phase

2. **Phase 1-7**: Documentation & Development (`.github/workflows/documents.workflows.md`)
   - Route A (Tier 1): Traditional PDLC workflow
   - Route B (Tier 2-3): Functional extraction from epics/stories
   - Route C (Tier 3-4): Interview-driven discovery
   - Route D (Mixed): Hybrid assembly approach

3. **Implementation**: Execute via `.github/workflows/implementation.workflows.md`

## 🚀 Starting Work Commands

**New project assessment**: `@orchestrator Assess project status for [PROJECT_NAME]`  
→ Triggers Phase 0 (assessment.workflows.md) to determine client maturity and routing

**After assessment complete**: `@orchestrator Route documents workflow for [PROJECT_NAME]`  
→ Executes Phase 1-7 (documents.workflows.md) using appropriate route (A/B/C/D)

**Implementation**: Copy prompt from `.github/tasks/start-implementation.prompts.md`  
**User story planning**: Copy prompt from `.github/tasks/plan-us.prompts.md`

## 🎨 Code Standards (From `.github/instructions/`)

- **coding.instructions.md**: SOLID principles, cyclomatic complexity <10, test coverage >80%, 13-point code review checklist
- **documentation.instructions.md**: ✅ Code documentation (JSDoc, inline comments); ❌ Project docs (no new markdown files)
- **api-design.instructions.md**: OpenAPI mandatory in `/api/openapi.yaml` (Architect generates in Stage 4)

## ⚠️ Anti-Patterns (Never Do This)

❌ Skip Phase 0 assessment - wrong routing leads to rework  
❌ Force Traditional (Route A) when documentation is poor  
❌ Mix multiple routes without clear strategy  
❌ Run multiple TDD cycles in parallel  
❌ Work on multiple stories simultaneously  
❌ Skip quality gates or bypass BDD validation  
❌ Make decisions for PO (always present 3 options)  
❌ Modify workflows directly (use orchestrator)  
❌ Create new project documentation (only follow templates)

## � Workflow Enforcement

**CRITICAL: Auto-activated validation system ensures proper workflow usage** 

### Before Any Action
1. **Check enforcement status**: System validates workflow sequences automatically
2. **Follow guidance**: Error messages provide clear remediation steps  
3. **Use overrides when needed**: Expert bypass available with justification

### Enforcement Levels
- **GUIDANCE_ONLY**: Suggestions only, never blocks (learning/prototype mode)
- **BALANCED**: Blocks violations, allows justified overrides (recommended default)
- **STRICT**: Minimal overrides, requires approvals (high-compliance mode)

### Key Validation Points
- **Workflow Sequencing**: Assessment → Documents → Implementation  
- **Agent Handoffs**: Proper artifacts required between agent transitions
- **Quality Gates**: BDD coverage, test coverage, code review standards
- **Template Compliance**: Use provided templates for structured outputs

### Override System
```yaml
# Create when justified deviation needed: docs/.workflow-override.yml
override_request:
  rule_violated: "policy_name"
  justification: "Business reason for deviation" 
  risk_assessment: "LOW|MEDIUM|HIGH"
  monitoring_requirements: ["enhanced_testing"]
```

### Integration Files
- **Configuration**: `.github/validation/workflow-compliance.yml`
- **Enforcement Logic**: `.github/validation/workflow-enforcer.md`
- **Override Guide**: `.github/validation/override-mechanisms.md`
- **User Guide**: `.github/validation/enforcement-guide.md`

## �📊 Context Optimization

When context is tight:
- Read only the current layer section from implementation-plan.md
- Read implementation-plan.md checkboxes for current progress
- Use `grep_search` to find specific patterns instead of reading full files
- Delegate read-only research to `runSubagent` (never for writing/editing)
---

## 🔄 Path Migration Reference (Framework 2.0.0)

**If you encounter references to old paths in legacy documentation**, use this mapping:

| Old Path (Pre-March 2026) | New Path (Current) | Purpose |
|---------------------------|-------------------|---------|
| `/docs/prd/` | `/docs/01-requirements/` | Requirements phase (immutable) |
| `/docs/prd/user-stories.md` | `/docs/01-requirements/user-stories.md` | PRD catalog reference |
| `/docs/prd/tech-spec.md` | `/docs/02-architecture/tech-spec.md` | Technical specifications |
| `/docs/user-stories/user-stories.md` | `/docs/05-implementation/user-stories.md` | Implementation status SSOT |
| `/docs/user-stories/<US-REF>/` | `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/` | Story implementation folder |
| `/docs/user-stories/<US-REF>/implementation-plan.md` | `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/implementation-plan.md` | Layer-by-layer implementation |
| `/docs/user-stories/<US-REF>/bdd-scenarios/` | `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/bdd-scenarios/` | BDD feature files |

**Critical Rules**:
- ✅ **Read from `/docs/01-requirements/`** when accessing PRD or immutable specifications
- ✅ **Update `/docs/05-implementation/user-stories.md`** for progress tracking and story status
- ✅ **Always include epic path** when referencing implementation: `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/`
- ✅ **Preserve IMMUTABLE snapshots** when plan changes: create `implementation-plan-v1.md`, `v2.md`, etc., keep current as `implementation-plan.md`
- ✅ **Handoff is chat-based**: Next agent reads conversation history + `.github/checkpoint.yaml` (no file artifacts)
- ❌ **Never modify** documentation under `/docs/01-*/` (immutable PRD)
- ❌ **Never reference old paths** in new or modified documentation
- ❌ **Never create** `tdd-execution.md`, `api-design.md`, `handoff.json` as per-story file artifacts