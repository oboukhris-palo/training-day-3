# AI-Driven PDLC Orchestration System

**Production-Ready AI Agent Coordination Platform** with distributed tracing, quality monitoring, and automated workflow orchestration.

> **🎉 FRAMEWORK READY** - Reusable PDLC orchestration system  
> **🚀 Start Using**: Copy workflow prompts from [`tasks/`](tasks/) directory

---

## ⚡ **CAPITAL RULE: This is a Reusable Framework Template**

**Critical Understanding**: 
- **This entire `.github/` folder is a reusable framework** designed to be copied into ANY third-party project
- **User-story identifiers** (AUTH-003, US-001, US-xxx, etc.) are **EXAMPLE IDENTIFIERS ONLY**—they represent hypothetical stories in your future projects
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
- `plan-us.prompt.md` - User story planning

### 🎨 [templates/](templates/) - Document Templates
**Ensures consistent outputs across agents** (all files use `-tmpl.*` suffix)
- `user-story-tmpl.yml` - User story structure
- `prerequisites-tmpl.yml` - Prerequisites request template (634 lines, optimized)
- `recommendation-plan-tmpl.md` - Recommendation plan format
- `handoff-tmpl.md` - Agent handoff format
- `tdd-execution-tmpl.md` - Audit log template



---

## 📂 Project Structure (Optimized)

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
│   └── copilot-instructions.md    # Master system guide
│
├── docs/
│   ├── prd/                       # PDLC Documents (13 files)
│   │   ├── requirements.md
│   │   ├── user-stories.md        # BDD scenarios (PRD - read-only)
│   │   ├── architecture-design.md
│   │   └── ...
│   │
│   ├── user-stories/              # Implementation tracking
│   │   ├── user-stories.md        # ⭐ Status tracking (SSOT)
│   │   ├── current-sprint.md        # ⭐ Status tracking (SSOT)
│   │   ├── project-status.md        # ⭐ Status tracking (SSOT)
│   │   └── <US-REF>/             # Per-story folders
│   │       ├── <US-REF>.md       # the user story content (copy of the original user story from PRD)
│   │       ├── implementation-plan.md  # Implementation plan for the user story
│   │       ├── api-design.md      # API design details for the user story
│   │       ├── us-completition-checklist.md         # Checklist for user story completion
│   │       ├── features/         # BDD feature files (project source)
│   │       └── tdd-execution/     # TDD execution details and results
│   │           └── <TDD-CYCLE>/     # Per TDD cycle folders
│   │               ├── <TDD-CYCLE>-HO-REFACTOR.md   # REFACTOR agent Handoff file for tdd cycle number <TDD-CYCLE>
│   │               ├── <TDD-CYCLE>-HO-GREEN.json  # GREEN agent Handoff file for tdd cycle number <TDD-CYCLE>
│   │               └── <TDD-CYCLE>-HO-RED.json  # RED agent Handoff file for tdd cycle number <TDD-CYCLE>
│
├── features/                      # BDD feature files (project source)
├── src/                          # Application source code
└── api/openapi.yaml              # API contracts
```

---

## 📂 Project Structure (Optimized)

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
│   └── copilot-instructions.md    # Master system guide
│
├── docs/
│   ├── prd/                       # PDLC Documents (13 files)
│   │   ├── requirements.md
│   │   ├── user-stories.md        # BDD scenarios (PRD - read-only)
│   │   ├── architecture-design.md
│   │   └── ...
│   │
│   ├── user-stories/              # Implementation tracking
│   │   ├── user-stories.md        # ⭐ Status tracking (SSOT)
│   │   ├── current-sprint.md        # ⭐ Status tracking (SSOT)
│   │   ├── project-status.md        # ⭐ Status tracking (SSOT)
│   │   └── <US-REF>/             # Per-story folders
│   │       ├── <US-REF>.md       # the user story content (copy of the original user story from PRD)
│   │       ├── implementation-plan.md  # Implementation plan for the user story
│   │       ├── api-design.md      # API design details for the user story
│   │       ├── us-completition-checklist.md         # Checklist for user story completion
│   │       ├── features/         # BDD feature files (project source)
│   │       └── tdd-execution/     # TDD execution details and results
│   │           └── <TDD-CYCLE>/     # Per TDD cycle folders
│   │               ├── <TDD-CYCLE>-HO-REFACTOR.md   # REFACTOR agent Handoff file for tdd cycle number <TDD-CYCLE>
│   │               ├── <TDD-CYCLE>-HO-GREEN.json  # GREEN agent Handoff file for tdd cycle number <TDD-CYCLE>
│   │               └── <TDD-CYCLE>-HO-RED.json  # RED agent Handoff file for tdd cycle number <TDD-CYCLE>
│   └── design/                    # UX/UI documents
│
├── features/                      # BDD feature files (project source)
├── src/                          # Application source code
└── api/openapi.yaml              # API contracts
```

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
| Understand entire system | [copilot-instructions.md](copilot-instructions.md) |
| Understand AI analysis and guardrails | [instructions/ai.analysis.guardrails.instructions.md](.github/instructions/ai.analysis.guardrails.instructions.md) |
| Learn handoff patterns | [guides/handoff-guide.md](.github/guides/handoff-guide.md) ⭐ |
| Start work on any project | [tasks/assess-project-status.prompt.md](.github/tasks/assess-project-status.prompt.md) |
| Start new PDLC project | [tasks/start-pdlc.prompt.md](.github/tasks/start-pdlc.prompt.md) |
| Start implementation phase | [tasks/start-implementation.prompt.md](.github/tasks/start-implementation.prompt.md) |
| Understand PDLC stages (1-8) | [workflows/documents.workflows.md](.github/workflows/documents.workflows.md) |
| Understand implementation phases (1-6) | [workflows/implementation.workflows.md](.github/workflows/implementation.workflows.md) |
| Learn coding standards | [instructions/coding.instructions.md](.github/instructions/coding.instructions.md) |
| Understand agent roles | [agents/](.github/agents/) (choose specific agent) |
| Get document templates | [templates/](.github/templates/) |
| Optimize AI context | [guides/context-optimization-strategy.md](.github/guides/context-optimization-strategy.md) |

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
