# AI Agent Instructions: PDLC Orchestration Framework

## ⚡ CRITICAL: This is a Reusable Template Framework

**You are working in a META-FRAMEWORK**, not a specific project. All identifiers (AUTH-003, US-001, PAYMENT-001) are EXAMPLES showing patterns for future projects. This `.github/` folder gets copied into any project to orchestrate AI agents through PDLC workflows.

## 🎯 Your Role & Context

**Before taking action**, always:
1. **Check which agent you are**: Read `.github/agents/<agent-name>.agent.md` for your responsibilities
2. **Verify handoff context**: Read `docs/user-stories/<STORY-REF>/handoff.md` for current cycle state
3. **Follow the plan**: Reference `docs/user-stories/<STORY-REF>/implementation-plan.md` for guidance

**Agent Roles** (handoff chain):
- **orchestrator**: Coordinates workflows, presents decision gates (3 options with tradeoffs)
- **po**: Asks questions, surfaces tradeoffs—NEVER decides unprompted
- **dev-lead**: Pre-creates folder structure, writes concise implementation plans (max 500 words/layer)
- **dev-tdd**: Orchestrates RED → GREEN → REFACTOR (strict sequencing, no parallel cycles)
- **dev-tdd-red/green/refactor**: Execute TDD phases following implementation plan

## 📋 Critical Document Patterns

**Phase 0 Assessment Outputs** (ONE set per engagement):
```
docs/assessment/
├── PREREQUISITES-REQUEST.yml       # Formal access request to client
├── AI-READINESS-REPORT.md          # Comprehensive maturity assessment
├── MULTI-DIMENSIONAL-ASSESSMENT.md # 8-dimension scores with confidence
├── HANDOFF-PACKAGE/                # Complete context for documentation phase
│   ├── Executive summaries
│   ├── Technology inventory
│   ├── Roadmap and success metrics
│   └── Raw data and evidence
└── interviews/                     # Stakeholder validation notes
```

**Phase 1-7 Documentation Outputs** (ONE PRD suite per engagement):
```
docs/prd/
├── requirements.md                 # Master PRD (consolidated from routes)
├── personas.md                     # User personas (if interview-driven)
├── user-stories.md                 # User stories with epics and acceptance criteria
├── architecture-design.md          # System architecture
├── tech-spec.md                    # Technical specifications
├── design-systems.md               # Design system and components
├── test-strategies.md              # Testing approach and BDD scenarios
└── themes/                         # Route B outputs (functional themes)
```

**Phase 8 Implementation Outputs** (ONE entry per user story):
```
docs/user-stories/US-001/
├── implementation-plan.md     # Frozen after creation (reference only)
├── handoff.md                 # OVERWRITE after each TDD phase
├── tdd-execution.md           # APPEND-ONLY audit log
└── bdd-scenarios/             # BDD feature files (entry point for TDD)
```

**Git commits**: 
- Assessment phase: `ASSESSMENT-PHASE-0: [description]`  
  Example: `ASSESSMENT-PHASE-0: Client maturity analysis and prerequisites request`
- Documentation phase: `DOC-PHASE-[1-7]-[STEP]: [description]`  
  Example: `DOC-PHASE-2-PERSONAS: Create user personas from stakeholder interviews`
- TDD phase: `TDD-<US-REF>-<PHASE>-<CYCLE>: [description]`  
  Example: `TDD-US-001-RED-18: Write failing test for user tier sync`

## 🔄 TDD Workflow (Non-Negotiable Sequencing)

**RED Phase** → Write failing test, update handoff.md (overwrite), append to tdd-execution.md, commit  
**GREEN Phase** → Implement minimal code, update handoff.md (overwrite), append to tdd-execution.md, commit  
**REFACTOR Phase** → Improve quality, update handoff.md (overwrite), append to tdd-execution.md, commit

**Rules**:
- One active cycle per story (no parallel RED/GREEN/REFACTOR)
- One active story in TDD at a time
- BDD scenarios from `features/` drive implementation
- All tests must pass before moving to next phase

## 🗂️ Key Files & Their Purpose

| File | Purpose | Update Pattern |
|------|---------|----------------|
| `.github/agents/*.agent.md` | Agent system prompts | Read-only (defines your behavior) |
| `.github/templates/*.template.md` | Document templates | Reference for structure |
| `.github/workflows/*.workflows.md` | PDLC/Implementation/CI-CD flows | Read-only (workflow definitions) |
| `.github/workflows/assessment.workflows.md` | **Phase 0**: Client assessment, prerequisites, AI readiness | Reference for discovery phase |
| `.github/workflows/documents.workflows.md` | **Phases 1-7**: Adaptive PRD generation (Routes A/B/C/D) | Reference for documentation strategy |
| `.github/workflows/implementation.workflows.md` | **Phase 8**: TDD-driven development execution | Reference for implementation phase |
| `docs/assessment/` | Assessment phase outputs (prerequisites, AI readiness report) | Generated during Phase 0 |
| `docs/inputs/` | Client-provided materials (epics, docs, interviews, code) | Input source for Phase 0 assessment |
| `docs/prd/` | PRD documents (requirements, user-stories, architecture, tech-spec) | Generated during Phases 1-7 |
| `docs/prd/user-stories.md` | PRD user stories catalog | Generated during documentation phase |
| `docs/user-stories/user-stories.md` | ⭐ Implementation status tracking (SSOT) | Update as stories progress |
| `docs/user-stories/<US-REF>/implementation-plan.md` | Layer-by-layer architecture | Frozen after dev-lead creates |
| `docs/user-stories/<US-REF>/handoff.md` | Current cycle snapshot | Overwrite each phase |
| `docs/user-stories/<US-REF>/tdd-execution.md` | Complete audit trail | Append-only, never delete |

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
❌ Create cycle-specific files (cycle-18-handoff.md, red-summary.md)  
❌ Run multiple TDD cycles in parallel  
❌ Work on multiple stories simultaneously  
❌ Skip quality gates or bypass BDD validation  
❌ Make decisions for PO (always present 3 options)  
❌ Modify workflows directly (use orchestrator)  
❌ Create new project documentation (only follow templates)

## 📊 Context Optimization

When context is tight:
- Read only the current layer section from implementation-plan.md
- Reference handoff.md for immediate context (last cycle summary)
- Use `grep_search` to find specific patterns instead of reading full files
- Delegate read-only research to `runSubagent` (never for writing/editing)