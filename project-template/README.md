# AI-Driven PDLC Orchestration System

**Production-Ready AI Agent Coordination Platform** with distributed tracing, quality monitoring, and automated workflow orchestration.

> **🎉 FRAMEWORK READY** - Reusable PDLC orchestration system  
> **🚀 Start Using**: Copy workflow prompts from [`tasks/`](tasks/) directory

---

## ⚡ **CAPITAL RULE: This is a Reusable Framework Template**

**Critical Understanding**: 
- **This entire `.github/` folder is a reusable framework** designed to be copied into ANY third-party project
- **User-story identifiers** (US-XXX, US-001, US-xxx, etc.) are **EXAMPLE IDENTIFIERS ONLY**—they represent hypothetical stories in your future projects
- **This framework is NOT tied to any specific project**—it's a meta-framework for orchestrating AI agents to:
  - 🔄 **Retro-document brownfield projects** (reconstruct missing specs, architecture, decisions)
  - 🗣️ **Facilitate stakeholder meetings** (conduct interviews, gather requirements, surface tradeoffs)
  - 📋 **Generate PDLC documents** (requirements, personas, architecture, tech specs, user stories with BDD)
  - 🤖 **Coordinate AI agents** through handoff-driven workflows
  - ✅ **Execute TDD cycles** with BDD-driven test automation

**How to Use**:
1. **Copy** the `.github/` folder into any existing or new project
2. **Initialize** with `@orchestrator Assess project status for [YOUR_PROJECT_NAME]`
3. **Follow** the handoff chain (PM → PO → BA → UX → Architect → Dev-Lead → TDD)
4. **All agents adapt** their workflows to YOUR project context

**Example**: If you copy this to a "PaymentProcessor" project, you'd have:
- `docs/prd/user-stories.md` with stories like `PAYMENT-001`, `PAYMENT-002`, etc.
- `docs/user-stories/PAYMENT-001/` folder structure (not `US-001/`)
- Features like `features/payment/subscription-billing.feature` (not `features/auth/`)
- All framework patterns remain identical; only project-specific names/IDs change

**Key Insight**: The framework is the MEDIUM (handoff orchestration, TDD sequencing, document consolidation); your project context is the MESSAGE (specific identifiers, features, business logic).

---

## 🚀 Quick Start

```bash
@orchestrator Assess project status for [PROJECT_NAME]
```

---

## 🚀 Key Features

### 🔒 **Workflow Enforcement System** ⭐ *NEW*
- **Auto-activation** when template copied to new projects
- **Smart validation** of workflow sequences (Assessment → Documents → Implementation)  
- **Expert overrides** with justification and risk assessment
- **Quality gates** enforce BDD coverage, testing standards, and code review
- **Flexible modes**: Guidance-only, Balanced (recommended), or Strict compliance

### 🏷️ **Framework 2.0.0: Enhanced Orchestration** ⭐ *NEW (March 2026)*
- **Agent Versioning System**: All agents track versions with `.github/agents/CHANGELOG.md` for migration tracking
- **Comprehensive Agent Logging Framework** ⭐ *MANDATORY (April 2026)*: 
  - **Phase-specific logs** for all PDLC stages (`/logs/{phase}/agent-{name}-YYYYMMDD.md`)
  - **TDD-specific logs** per user story (`/logs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/`)
  - **Structured entries** with ISO8601 timestamps, PRU tracking, handoff definitions
  - **Validation enforcement** at every handoff and quality gate
  - **Audit trails** for compliance, debugging, and knowledge transfer
  - **Full docs**: [Agent Logging Framework](AGENT-LOGGING-IMPLEMENTATION.md)
- **Implementation Plan Approval Gate**: Human validation required (`plan-approval.yaml`) before TDD execution with auto-revocation on changes
- **Plan Versioning**: Snapshots (`implementation-plan-v1.md`, `v2.md`) preserve history when plans evolve
- **YOLO Mode**: Rapid prototyping with pre-flight checks, single-cycle lock, and mandatory review

---

## 🏗️ System Architecture

### Three-Workflow Orchestration
1. **PDLC Workflow** (8 stages): Requirements → Analysis → Design → Planning → Testing → Deployment → Development → Improvement
2. **Implementation Workflow** (6 phases): Epic Review → Sprint Planning → BDD Integration → TDD Execution → BDD Validation → Code Quality  
3. **CI/CD Workflow** (3 phases): Bootstrap → Stabilization → Optimization

### Agent Handoff Chain
**Orchestrator** coordinates: PM → PO → BA → UX → Architect → Dev-Lead → TDD Agents

---

## 📂 Core Components

### 🤖 [agents/](agents/) - AI Agents (11 specialized roles)
**Handoff Chain**: Orchestrator → PM → PO → BA → UX → Architect → Dev-Lead → TDD Agents

| Agent | Role | Responsibility | Key Output |
|-------|------|---------------|------------|
| **Orchestrator** | Master coordinator | Decision gates, workflow sequencing | Handoff orchestration |
| **Dev Lead** | Technical implementation | Layer-by-layer plans, BDD integration | Implementation plans |
| **TDD Agents** | Test-driven development | RED-GREEN-REFACTOR cycles | Working code |

### 📋 [workflows/](workflows/) - Orchestration Workflows
| Workflow | Stages/Phases | Purpose |
|----------|---------------|---------|
| **PDLC** | 8 stages | Product Development Lifecycle |
| **Implementation** | 6 phases | TDD execution with BDD validation |
| **CI/CD** | 3 phases | Continuous integration pipeline |

### 🎯 [tasks/](tasks/) - Workflow Launchers
**Copy prompt, fill parameters, invoke agent** (all files use `.prompt.md` suffix)
- `assess-project-status.prompt.md` - Start here for any project
- `start-pdlc.prompt.md` - New projects  
- `start-implementation.prompt.md` - After PDLC complete

### 🔒 [validation/](validation/) - Workflow Enforcement
| File | Purpose | When to Use |
|------|---------|-------------|
| **workflow-enforcer.md** | Core enforcement system and rules | Understanding how validation works |
| **workflow-compliance.yml** | Configuration and settings | Customizing enforcement per project |
| **override-mechanisms.md** | Expert bypass procedures | When you need to deviate from workflows |
| **enforcement-guide.md** | User guide and troubleshooting | Learning to work with the system |
- `plan-us.prompt.md` - User story planning

### 🎨 [templates/](templates/) - Document Templates
**Ensures consistent outputs across agents** (all files use `-tmpl.*` suffix)
- `agent-log-tmpl.md` - **MANDATORY** agent logging template with PRU tracking ⭐ *NEW*
- `user-story-tmpl.yml` - User story structure
- `prerequisites-tmpl.yml` - Prerequisites request template (634 lines, optimized)
- `recommendation-plan-tmpl.md` - Recommendation plan format
- `handoff-tmpl.md` - Agent handoff format
- `tdd-execution-tmpl.md` - Audit log template
- `plan-approval-tmpl.yaml` - Human validation gate for implementation plans ⭐ *NEW*
- `pull_request_template.md` - PR validation checklist for Gen‑e2 compliance

### 🔧 [scripts/](.github/scripts/) - Automation & Validation Scripts
**Framework automation scripts** (ESM Node.js modules in `.mjs` format)
- `update-index.mjs` - Generates/updates INDEX.md files across docs hierarchy
  - Usage: `node .github/scripts/update-index.mjs [target-directory]`
- `enforce-naming.mjs` - Validates naming conventions (EPIC-xxx, US-xxx patterns)
  - Usage: `node .github/scripts/enforce-naming.mjs [--branch] [--commits]`
  - Configuration: Environment variables (APP_PREFIX, EPIC_PREFIX, STORY_PREFIX, ID_WIDTH)
- `migrate-structure.mjs` - One-time migration helper for legacy structures
  - Usage: `node .github/scripts/migrate-structure.mjs [--dry-run] [--force]`

---

## 📂 Project Structure (Optimized) — Framework 2.0.0

```
project-root/
├── .github/
│   ├── agents/                    # 11 specialized AI agents
│   ├── workflows/                 # PDLC, Implementation, CI/CD workflows
│   ├── tasks/                     # Workflow launcher prompts
│   ├── templates/                 # Document templates
│   ├── schemas/                   # JSON schemas for validation
│   ├── guides/                    # Best practices and strategies
│   │   ├── handoff-guide.md       # ⭐ Single source of truth for handoffs
│   │   ├── context-optimization-strategy.md  # Token efficiency (~350 lines)
│   │   └── diagram-usage.guide.md # Diagram standards
│   ├── instructions/              # Coding and documentation standards
│   ├── prompts/                   # Agent system prompts
│   ├── validation/                # Workflow enforcement system
│   └── copilot-instructions.md    # Master system guide
│
├── logs/                          # Agent action logs (all phases) ⭐ NEW
│   ├── 00-assessment/             # Assessment phase logs
│   ├── 01-requirements/           # Requirements phase logs
│   ├── 02-architecture/           # Architecture phase logs
│   ├── 03-testing/                # Testing phase logs
│   ├── 04-planning/               # Planning phase logs
│   ├── 05-implementation/         # Implementation phase logs
│   │   └── epics/
│   │       └── <EPIC-REF>/
│   │           └── user-stories/
│   │               └── <US-REF>/
│   │                   ├── agent-dev-tdd-red-YYYYMMDD.md
│   │                   ├── agent-dev-tdd-green-YYYYMMDD.md
│   │                   └── agent-dev-tdd-refactor-YYYYMMDD.md
│   └── agent-{name}-YYYYMMDD.md   # Cross-phase logs (root level)
│
├── docs/
│   ├── 01-requirements/           # Phase 1-2: Requirements & personas (IMMUTABLE)
│   │   ├── requirements.md
│   │   ├── personas.md
│   │   ├── user-stories.md        # PRD catalog (IMMUTABLE reference)
│   │   └── business-case.md
│   │
│   ├── 02-architecture/           # Phase 3-4: Architecture & tech specs (IMMUTABLE)
│   │   ├── architecture-design.md
│   │   ├── tech-spec.md
│   │   └── design-systems.md
│   │
│   ├── 03-testing/                # Phase 5: Testing strategies (IMMUTABLE)
│   │   └── test-strategies.md
│   │
│   ├── 04-planning/               # Phase 6-7: Deployment & planning (IMMUTABLE)
│   │   ├── iteration-planning.md
│   │   └── deployment-plan.md
│   │
│   ├── 05-implementation/         # Phase 8: Implementation status tracking (MUTABLE)
│   │   ├── user-stories.md        # ⭐ SSOT: Overall progress tracking
│   │   └── epics/
│   │       └── <EPIC-REF>/
│   │           └── user-stories/
│   │               └── <US-REF>/  # Per-story implementation folder
│   │                   ├── description.md                    # Story definition
│   │                   ├── implementation-plan.md            # Frozen after approval
│   │                   ├── implementation-plan-v{N}.md       # IMMUTABLE snapshots
│   │                   ├── plan-approval.yaml                # Human validation gate ⭐
│   │                   ├── bdd-scenarios/                    # BDD feature files
│   │                   ├── tdd-execution.md                  # APPEND-ONLY cycle summary
│   │                   └── tdd-execution/                    # Per-cycle handoff artifacts
│   │                       ├── 001/
│   │                       │   ├── 001-HO-RED.json
│   │                       │   ├── 001-HO-GREEN.json
│   │                       │   └── 001-HO-REFACTOR.md
│   │                       └── 002/
│   │
│   ├── assessment/                # Phase 0: Assessment outputs
│   │   ├── PREREQUISITES-REQUEST.yml
│   │   ├── AI-READINESS-REPORT.md
│   │   └── MULTI-DIMENSIONAL-ASSESSMENT.md
│   │
│   └── design/                    # UX/UI design documents and systems
│       └── diagrams/              # Design system diagrams
│
├── features/                      # BDD feature files (project source)
├── src/                          # Application source code
└── api/openapi.yaml              # API contracts (OpenAPI specification)
```

### Path Reference (Framework 2.0.0)

**Documentation paths** (immutable PRD phases):
- Requirements: `/docs/01-requirements/`
- Architecture: `/docs/02-architecture/`
- Testing: `/docs/03-testing/`
- Planning: `/docs/04-planning/`

**Implementation paths** (mutable tracking):
- User stories: `/docs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/`

**Agent Logs** (action tracing):
- Phase-specific: `/logs/{phase}/agent-{name}-YYYYMMDD.md`
- Story-specific: `/logs/05-implementation/epics/<EPIC-REF>/user-stories/<US-REF>/agent-{name}-YYYYMMDD.md`
- Root-level: `/logs/agent-{name}-YYYYMMDD.md`

---

## 🎯 How to Use This System

### 1️⃣ **Start ANY Project Work**
```bash
@orchestrator Assess project status for [PROJECT_NAME]
```
**Output**: Shows what exists, what's missing, recommends next workflow

### 2️⃣ **Start New PDLC** (new projects)
Copy prompt from [`tasks/start-pdlc.prompt.md`](tasks/start-pdlc.prompt.md):
```bash
@orchestrator [Your filled prompt]
```

### 3️⃣ **Start Implementation** (after PDLC Stages 1-6 complete)
Copy prompt from [`tasks/start-implementation.prompt.md`](tasks/start-implementation.prompt.md):
```bash
@orchestrator [Your filled prompt]
```

### 🔄 **Agent Handoff Pattern**
- Agents coordinate through handoff files in `/docs/user-stories/<US-REF>/`  
- One agent at a time works on shared files
- Quality gates prevent low-quality work from propagating
- Full trace visibility with automatic performance monitoring

---

## 📊 Implementation Status

### ✅ **Phase 1**: Prompt Standardization (Complete)
- 12 standardized agent system prompts
- Handoff JSON schema validation
- Quality thresholds and gates

### ✅ **Phase 2**: Handoff Schema & Variants (Complete)  
- Schema validation in workflows
- Prompt variant management system
- A/B testing capabilities

### 🎯 **Production Ready**
The framework is production-ready with full multi-agent coordination:
- Handoff-driven agent workflows with schema validation
- PDLC documentation automation (Phases 0-7)  
- BDD-driven TDD orchestration (Phase 8)
- Start using immediately with `@orchestrator` commands  
- Monitor agent efficiency and quality trends
- Scale with confidence using quality gates

---

## 🎓 Key Concepts

### **Epic-Driven Model** 
Epics organize; **user-stories are work units**. Implement ONE story at a time through all 4 layers (Database → Backend → Config → Frontend).

### **BDD-Driven TDD**
BDD scenarios are **entry points**. Failing BDD tests drive layer-by-layer TDD cycles (RED → GREEN → REFACTOR).

### **Quality-First**
Every handoff validates against quality gates. Sub-threshold work triggers automatic escalation.

### **Full Traceability** 
Complete audit trail from requirements → user stories → BDD scenarios → TDD cycles → production code.

---

## � Essential Files

| Priority | File | Purpose |
|----------|------|---------|
| **START HERE** | [copilot-instructions.md](copilot-instructions.md) | Complete system understanding |
| **User Contract** | [instructions/ai.analysis.guardrails.instructions.md](.github/instructions/ai.analysis.guardrails.instructions.md) | AI analysis and guardrails instructions |
| **Handoff Guide** | [guides/handoff-guide.md](.github/guides/handoff-guide.md) | ⭐ Single source of truth for agent coordination |
| **Quick Launch** | [tasks/assess-project-status.prompt.md](.github/tasks/assess-project-status.prompt.md) | Start any work |
| **Agent Profiles** | [agents/](.github/agents/) directory | Specialized AI agent definitions |
| **Context Optimization** | [guides/context-optimization-strategy.md](.github/guides/context-optimization-strategy.md) | Token efficiency strategies |

**Everything builds on these foundations.** Start here, then explore as needed.

---

## 📊 Key Concepts

**Epics** = Organizational containers (groups of stories)  
**User Stories** = Work units (implement ONE at a time, all 4 layers)  
**Handoffs** = Agent-to-agent coordination via shared files  
**Decision Gates** = User choices at critical points (3 options each)  
**BDD-Driven TDD** = Failing BDD tests → RED-GREEN-REFACTOR cycles → Passing tests

---

## 🔑 Critical Files

| Need to... | Read This |
|-----------|-----------|
| **🚀 START HERE (new to enforcement)** | [enforcement-guide.md](.github/validation/enforcement-guide.md) + [examples](.github/validation/enforcement-examples.md) ⭐ |
| Configure workflow enforcement | [workflow-compliance.yml](.github/validation/workflow-compliance.yml) |
| Override workflows when needed | [override-mechanisms.md](.github/validation/override-mechanisms.md) |
| Understand the system architecture | [copilot-instructions.md](.github/copilot-instructions.md) |
| Understand AI analysis guardrails | [ai.analysis.guardrails.instructions.md](.github/instructions/ai.analysis.guardrails.instructions.md) |
| Learn handoff patterns | [handoff-guide.md](.github/guides/handoff-guide.md) ⭐ |
| Start work on any project | [assess-project-status.prompt.md](.github/tasks/assess-project-status.prompt.md) |
| Start new PDLC project | [start-pdlc.prompt.md](.github/tasks/start-pdlc.prompt.md) |
| Start implementation phase | [start-implementation.prompt.md](.github/tasks/start-implementation.prompt.md) |
| Understand PDLC stages (1-8) | [documents.workflows.md](.github/workflows/documents.workflows.md) |
| Understand implementation phases (1-6) | [implementation.workflows.md](.github/workflows/implementation.workflows.md) |
| Learn coding standards | [coding.instructions.md](.github/instructions/coding.instructions.md) |
| Understand agent roles | [agents/](.github/agents/) (choose specific agent) |
| Get document templates | [templates/](.github/templates/) |
| Optimize AI context | [context-optimization-strategy.md](.github/guides/context-optimization-strategy.md) |

---

## 📈 Workflow at a Glance

```
┌─────────────────────────────────────────────────────────┐
│ NEW PROJECT? Run: @orchestrator Assess [PROJECT_NAME]   │
└──────────────────┬──────────────────────────────────────┘
                   │
      ┌────────────┴────────────┐
      │                         │
    PDLC?                    IMPLEMENTATION?
   (Stages 1-8)              (Phases 1-6)
      │                         │
      ├─→ Start PDLC         ├─→ Start Implementation
      │   (tasks/)              (tasks/)
      │                         │
      ├─→ Agent Chain:       ├─→ Agent Chain:
      │   PM→PO→BA→          │   PM→Dev-Lead→TDD
      │   UX→Architect        │   Orchestrator
      │                         │
      ├─→ Approval Gates     ├─→ Decision Gates
      │   (by stage)           (architecture, scope)
      │                         │
      └─→ 13 PRD Docs        └─→ 4 Layers per Story:
          Ready for            1. Database
          Implementation       2. Backend
                              3. Config
                              4. Frontend
```

---

## ✅ Success Checklist

- [ ] Read [copilot-instructions.md](copilot-instructions.md) for system overview
- [ ] Review agent files for your role ([agents/](agents/))
- [ ] Check templates for document structure ([templates/](templates/))
- [ ] Follow coding standards before committing ([instructions/](instructions/))
- [ ] Use task prompts to start workflows ([tasks/](tasks/))
- [ ] Track progress via handoff files (`/docs/user-stories/<US-REF>/`)
- [ ] Run `@orchestrator Assess` before any major decision

---

**Last Updated**: March 16, 2026  
**System**: AI-Driven PDLC Orchestration Framework  
**Status**: ✅ Production-ready with harmonized naming and optimized context

---

## 📝 Recent Improvements

### Phase 1: File Naming Harmonization (Complete)
- ✅ All `.github/` files use lowercase kebab-case
- ✅ Templates adopt `-tmpl.*` suffix (e.g., `user-story-tmpl.yml`)
- ✅ Prompts adopt `.prompt.md` suffix (e.g., `start-pdlc.prompt.md`)
- ✅ Cross-references updated across all documents

### Phase 2: Content Optimization (Complete)
- ✅ `context-optimization-strategy.md`: 728 → 350 lines (52% reduction)
- ✅ `prerequisites-tmpl.yml`: 1,022 → 634 lines (38% reduction)
- ✅ Aggressive semantic compression while preserving all critical information
- ✅ Optimization report: [`PHASE-2-OPTIMIZATION-REPORT.md`](PHASE-2-OPTIMIZATION-REPORT.md)

**Impact**: Significantly reduced token consumption for AI agents while maintaining full functionality.
