# AI-Driven PDLC Orchestration Framework

**Production-ready orchestration system** for structured product development using AI agents + human decisions.

> **Start Here**: Read [USER-GUIDE.md](USER-GUIDE.md) for enterprise onboarding  
> **Quick Start**: `@orchestrator Assess project status for [YOUR_PROJECT]`

---

## 🎯 What Is This?

This `.github/` folder is a **reusable framework** that:
- ✅ **Orchestrates 11 AI agents** through structured workflows (PDLC, Implementation, CI/CD)
- ✅ **Enforces quality gates** at critical decision points (3 options presented, human decides)
- ✅ **Tracks all actions** with mandatory agent logging (audit trail for compliance)
- ✅ **Scales from 1 team to 100+** using identical patterns
- ✅ **Produces complete documentation** (requirements, architecture, BDD scenarios, implementation plans)

**Copy this into ANY project** — agents adapt automatically to your context.

---

## 🚀 Three Core Workflows

| Workflow | Use When | Output |
|----------|----------|--------|
| **PDLC** (8 stages) | Launching new product or retro-documenting | Specs, architecture, BDD scenarios |
| **Implementation** (6 phases) | Building features with quality gates | Working code with full traceability |
| **CI/CD** (3 phases) | Automating deployments | Continuous delivery pipeline |

---

## 🎯 Framework 2.0.0 Features (April 2026)

✅ **Agent Logging (MANDATORY)** — Immutable daily logs with timestamps for audit trails  
✅ **Implementation Plan Approval Gate** — `plan-approval.yaml` blocks coding until approved  
✅ **Checkpoint Lifecycle Tracking** — `.github/checkpoint.yaml` enables multi-session resumption  
✅ **Plan Versioning** — Auto-snapshot `implementation-plan-v1.md`, `v2.md` when plans change  
✅ **YOLO Mode** — Rapid prototyping with safety checks + mandatory review  
✅ **Agent Versioning** — `.github/agents/CHANGELOG.md` tracks migrations

---

## 📂 Project Structure (Framework 2.0.0)

Key directories in copied framework:

```
.github/
├── agents/                    # 11 AI agents (orchestrator, pm, po, ba, ux, architect, dev-lead, tdd-red/green/refactor, meeting-assistant)
├── workflows/                 # PDLC (8 stages), Implementation (6 phases), CI/CD (3 phases)
├── tasks/                     # Workflow launcher prompts (copy + fill + run)
├── templates/                 # Document templates (-tmpl.* suffix)
│   ├── agent-log-tmpl.md      # Mandatory logging template
│   ├── plan-approval-tmpl.yaml # Implementation gate (approval required)
│   └── implementation-plan-tmpl.md  # Layer-by-layer work plan
├── instructions/              # Coding standards, documentation rules
├── guides/                    # Handoff patterns, context optimization
├── validation/                # Workflow enforcement configuration
├── hooks/                     # Git hook validation scripts
├── checkpoint.yaml            # Lifecycle tracking (multi-session context recovery)
└── copilot-instructions.md    # Master system guide
```

**Generated project structure** (after workflows):

```
docs/
├── 01-requirements/           # IMMUTABLE: Requirements phase (PRD)
├── 02-architecture/           # IMMUTABLE: Architecture phase
├── 03-testing/                # IMMUTABLE: Testing strategy
├── 04-planning/               # IMMUTABLE: Planning + rollout
└── 05-implementation/         # MUTABLE: Per-story implementation tracking
    └── epics/<EPIC>/user-stories/<US>/
        ├── description.md                 (story spec)
        ├── implementation-plan.md         (frozen after approval)
        ├── implementation-plan-v{N}.md   (immutable snapshots)
        ├── plan-approval.yaml             (approval gate)
        └── bdd-scenarios/                 (BDD feature files)

logs/                          # Agent action audit trail
├── 00-assessment/
├── 01-requirements/
├── 02-architecture/
├── 03-testing/
├── 04-planning/
├── 05-implementation/epics/<EPIC>/user-stories/<US>/
└── agent-{name}-YYYYMMDD.md   (root level: cross-phase agents)
```

---

## 🚀 How to Get Started

### Step 1: Copy Framework Into Project
```bash
cp -r .github your-project/.github
```

### Step 2: Launch Orchestrator
```bash
@orchestrator Assess project status for [YOUR_PROJECT_NAME]
```

### Step 3: Follow Recommendations
Orchestrator will detect your project state and recommend workflow.

---

## 🎯 Key Workflows

**New Product:**
```
@orchestrator Generate PDLC documents for [PROJECT]
```

**Retro-Document Existing Project:**
```
@orchestrator Assess&document brownfield project [PROJECT]
```

**Start Implementation:**
```
@orchestrator Launch implementation Phase 1 for [PROJECT]
```

---

## 📊 Agent Handoff Chain

```
Orchestrator → PM → PO → BA → UX → Architect → Dev-Lead → TDD Agents
```

Each agent handles ONE responsibility. Handoffs are logged in `/logs/`.

---

## 🔑 Essential Files

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

## 🔑 Essential Files

| File | Purpose |
|------|---------|
| [USER-GUIDE.md](USER-GUIDE.md) | **Start here** — Enterprise onboarding |
| [copilot-instructions.md](.github/copilot-instructions.md) | System architecture reference |
| [agents/](.github/agents/) | AI agent definitions (11 roles) |
| [templates/](.github/templates/) | Document templates (-tmpl.* suffix) |
| [tasks/](.github/tasks/) | Workflow launcher prompts |
| [guides/](.github/guides/) | Best practices (handoff, context optimization) |

---

## 🎓 Key Concepts

**Epic** = Container (groups user stories)  
**User Story** = Work unit (implement ONE at a time, all 4 layers)  
**BDD-Driven TDD** = Failing BDD tests → RED → GREEN → REFACTOR → Passing tests  
**Quality Gate** = Approval required (+3 option tradeoff matrix) before proceeding  
**Agent Log** = Immutable audit trail (ISO8601 timestamp, handoff info, PRU tracking)

---

## ✅ Success Checklist

- [ ] Reviewed [USER-GUIDE.md](USER-GUIDE.md)
- [ ] Copied `.github/` into project
- [ ] Identified project context (new/brownfield/mid-dev)
- [ ] Ready to run orchestrator assessment

---

**Status**: ✅ Production-ready (Framework 2.0.0, April 2026)  
**Next**: Run `@orchestrator Assess project status for [YOUR_PROJECT]`
