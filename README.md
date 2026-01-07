# .github Toolbox - Complete Index

**Your AI-driven PDLC Orchestration System reference hub.** All workflows, agents, instructions, templates, and prompts in one place.

---

## 🚀 Quick Start

```bash
@orchestrator Assess project status for [PROJECT_NAME]
```

---

## 📂 Directory Structure & Contents

### 🤖 [agents/](agents/) - AI Agents (11 roles)

Specialized AI agents that coordinate through handoffs. **Handoff Chain**: PM → PO → BA → UX → Architect → Dev-Lead → TDD Agents

| Agent | File | Role | Stages |
|-------|------|------|--------|
| **Orchestrator** | [orchestrator.agent.md](agents/orchestrator.agent.md) | Master coordinator, decision gates, handoff sequencing | All |
| **Project Manager** | [pm.agent.md](agents/pm.agent.md) | Announces steps, coordinates handoffs, sprint planning | 1, 6, 8 |
| **Product Owner** | [po.agent.md](agents/po.agent.md) | Requirements, features, stakeholder alignment | All |
| **Business Analyst** | [ba.agent.md](agents/ba.agent.md) | Analysis, BDD scenarios, implementation validation | 2, 5, 7 |
| **UX Designer** | [ux.agent.md](agents/ux.agent.md) | Journeys, wireframes, design systems | 3, 4 |
| **Solution Architect** | [architect.agent.md](agents/architect.agent.md) | System design, tech choices, architecture decisions | 1-4, 6, 8 |
| **Dev Lead** | [dev-lead.agent.md](agents/dev-lead.agent.md) | Implementation plans, handoff files, code quality | 4, 5, 7 |
| **TDD Orchestrator** | [dev-tdd.agent.md](agents/dev-tdd.agent.md) | Coordinates RED-GREEN-REFACTOR cycles | 7 |
| **TDD RED** | [dev-tdd-red.agent.md](agents/dev-tdd-red.agent.md) | Failing test creation (TDD entry point) | 7 |
| **TDD GREEN** | [dev-tdd-green.agent.md](agents/dev-tdd-green.agent.md) | Minimal code to pass tests | 7 |
| **TDD REFACTOR** | [dev-tdd-refactor.agent.md](agents/dev-tdd-refactor.agent.md) | Quality improvement, test optimization | 7 |

---

### 📋 [workflows/](workflows/) - Orchestration Workflows (4 files)

Define the 3-workflow system for coordinating agents and documents.

| Workflow | File | Description | Phases/Stages |
|----------|------|-------------|---|
| **PDLC Workflow** | [documents.workflows.md](workflows/documents.workflows.md) | 8-stage Product Development Lifecycle: Requirements → Analysis → Design → Planning → Testing → Deployment → Development → Improvement | 8 stages |
| **Implementation Workflow** | [implementation.workflows.md](workflows/implementation.workflows.md) | 6-phase TDD execution: Epic Review → Sprint Planning → BDD Integration → TDD Cycle → BDD Validation → Code Quality | 6 phases |
| **CI/CD Workflow** | [cicd.workflows.md](workflows/cicd.workflows.md) | 3-phase continuous integration: Bootstrap → Stabilization → Optimization | 3 phases |
| **GitHub Actions** | [ci.yml](workflows/ci.yml) | Automated CI/CD pipeline configuration | Auto-triggered |

---

### 📚 [instructions/](instructions/) - Development Standards (2 files)

Mandatory coding and documentation guidelines for all team members.

| Instruction | File | Coverage |
|-------------|------|----------|
| **Coding Standards** | [coding.instructions.md](instructions/coding.instructions.md) | SOLID principles, TDD, test coverage >80%, cyclomatic complexity, 13-point code review checklist, naming, error handling, performance, security, refactoring |
| **Documentation Standards** | [documentation.instructions.md](instructions/documentation.instructions.md) | Documentation scope, templates usage, README.md updates, Mermaid/PlantUML diagrams, when to document |

---

### 🎨 [templates/](templates/) - Document Templates (10 files)

Reusable templates for consistent document generation across projects.

| Template | File | Purpose | Used By |
|----------|------|---------|---------|
| **PRD Artifact Structure** | [prd.template.yml](templates/prd.template.yml) | 13 PRD documents schema (requirements, personas, architecture, etc.) | PO, BA, Architect |
| **User Story** | [user-story.template.yml](templates/user-story.template.yml) | Individual user story format with acceptance criteria | Dev-Lead, BA |
| **Epic** | [epic.template.yml](templates/epic.template.yml) | Epic grouping structure and story linkage | PM, PO |
| **Tech Doc** | [tech-doc.template.yml](templates/tech-doc.template.yml) | Technical specification document | Architect, Dev-Lead |
| **Functional Doc** | [func-doc.template.yml](templates/func-doc.template.yml) | Feature/function documentation | PO, BA |
| **User Stories Status** | [user-stories-status.template.yml](templates/user-stories-status.template.yml) | Status tracking for user stories (Not Started / In Progress / Implemented) | Dev-Lead, PM |
| **User Stories Tracking** | [user-stories-tracking.template.md](templates/user-stories-tracking.template.md) | Master tracking file for all stories across epics | Dev-Lead, PM |
| **User Story Handoff** | [user-story-handoff.template.md](templates/user-story-handoff.template.md) | Handoff file for TDD cycle progress tracking | TDD Agents |
| **Project Status** | [project-status.template.md](templates/project-status.template.md) | PM dashboard with epic/sprint/velocity/quality metrics | PM, PO |
| **Sprint Planning** | [sprint-planning.template.md](templates/sprint-planning.template.md) | Sprint scope, capacity, and story assignments | PM, Dev-Lead |

---

### 🎯 [tasks/](tasks/) - Workflow Launchers (7 files)

Reusable prompts to start workflows. Copy prompt, fill parameters, invoke agent.

| Task | File | Invocation | When to Use |
|------|------|-----------|------------|
| **Assess Project Status** | [assess-project-status.prompts.md](tasks/assess-project-status.prompts.md) | `@orchestrator Assess project status for [PROJECT_NAME]` | Starting ANY work - shows doc completeness, code status, maturity level, next steps |
| **Start PDLC** | [start-pdlc.prompts.md](tasks/start-pdlc.prompts.md) | `@orchestrator [Copy/fill prompt from file]` | New projects - starts Stage 1 with PM |
| **Start Implementation** | [start-implementation.prompts.md](tasks/start-implementation.prompts.md) | `@orchestrator [Copy/fill prompt from file]` | After PDLC Stages 1-6 complete - starts Phase 1 with PM |
| **Start CI/CD** | [start-cicd.prompts.md](tasks/start-cicd.prompts.md) | `@orchestrator [Copy/fill prompt from file]` | After implementation stable - starts CI/CD bootstrap |
| **Plan User Story** | [plan-us.prompts.md](tasks/plan-us.prompts.md) | `@dev-lead [Copy/fill prompt from file]` | Dev-Lead creating implementation plan for a user story |
| **Write Tests** | [write-tests.prompts.md](tasks/write-tests.prompts.md) | `@ba [Copy/fill prompt from file]` | BA creating BDD scenarios |
| **Commit User Story** | [commit-us.prompts.md](tasks/commit-us.prompts.md) | `@dev-lead [Copy/fill prompt from file]` | Dev-Lead finalizing story after all tests pass |

---

### 💡 [prompts/](prompts/) - Reusable Prompt Library (5 files)

General-purpose prompts for common tasks, referenced by agents.

| Prompt | File | Purpose |
|--------|------|---------|
| **Agent Prompt Library** | [agent-prompt-library.md](prompts/agent-prompt-library.md) | Collection of agent-specific prompt patterns |
| **Documentation Prompts** | [documentation.prompts.md](prompts/documentation.prompts.md) | Parameterized prompt for all documentation types (7 parameters) |
| **Overview Prompts** | [overview.prompts.md](prompts/overview.prompts.md) | System overview and navigation prompts |
| **TDD Prompts** | [tdd.prompts.md](prompts/tdd.prompts.md) | RED-GREEN-REFACTOR cycle guidance |
| **Planning Prompts** | [plan-us.prompts.md](prompts/plan-us.prompts.md) | User story planning and layer breakdown |

---

### 📋 [guides/](guides/) - Extended Documentation

Detailed guides and reference materials (check directory for latest).

---

### ⚠️ [quality/](quality/) - Quality & Risk Management

Quality gates, risk assessments, and compliance checks (check directory for latest).

---

### 🔗 [agent-contracts/](agent-contracts/) - Agent Interface Specifications

Formal contracts defining agent responsibilities and handoff formats (check directory for latest).

---

### 🚨 [conflicts/](conflicts/) - Conflict Resolution

Mechanisms for handling conflicting decisions or merge issues (check directory for latest).

---

### 📄 [copilot-instructions.md](copilot-instructions.md)

**Master instructions file** - Complete system architecture, orchestration rules, TDD workflow, folder structure, progress tracking.

**READ THIS FIRST** for full system understanding.

---

## 🎯 How to Use This Toolbox

### 1️⃣ Starting Work
```bash
@orchestrator Assess project status for [PROJECT_NAME]
```
Shows what exists, what's missing, and recommends next workflow.

### 2️⃣ Starting New PDLC
Copy prompt from [start-pdlc.prompts.md](tasks/start-pdlc.prompts.md), fill parameters, invoke:
```bash
@orchestrator [Your filled prompt]
```

### 3️⃣ Starting Implementation (after PDLC complete)
Copy prompt from [start-implementation.prompts.md](tasks/start-implementation.prompts.md), invoke:
```bash
@orchestrator [Your filled prompt]
```

### 4️⃣ Following Handoffs
- Each agent reads their agent file for responsibilities
- Agents coordinate through handoff files in `/docs/user-stories/<US-REF>/`
- One agent at a time works on shared files
- User makes decisions at **decision gates** (3 options presented)

### 5️⃣ TDD Cycles
Dev-Lead creates implementation plan → TDD-Orchestrator sequences RED→GREEN→REFACTOR → BA validates with BDD

### 6️⃣ Checking Coding Standards
Before committing code, review [instructions/coding.instructions.md](instructions/coding.instructions.md) - 13-point checklist included.

### 7️⃣ Generating Documentation
Use [prompts/documentation.prompts.md](prompts/documentation.prompts.md) with 7 parameters for any doc type.

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
| Start work on any project | [tasks/assess-project-status.prompts.md](tasks/assess-project-status.prompts.md) |
| Start new PDLC project | [tasks/start-pdlc.prompts.md](tasks/start-pdlc.prompts.md) |
| Start implementation phase | [tasks/start-implementation.prompts.md](tasks/start-implementation.prompts.md) |
| Understand PDLC stages (1-8) | [workflows/documents.workflows.md](workflows/documents.workflows.md) |
| Understand implementation phases (1-6) | [workflows/implementation.workflows.md](workflows/implementation.workflows.md) |
| Learn coding standards | [instructions/coding.instructions.md](instructions/coding.instructions.md) |
| Plan user story implementation | [templates/user-story.template.yml](templates/user-story.template.yml) + [tasks/plan-us.prompts.md](tasks/plan-us.prompts.md) |
| Understand agent roles | [agents/](agents/) (choose specific agent) |
| Get document templates | [templates/](templates/) |

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

**Last Updated**: January 7, 2026  
**System**: AI-Driven PDLC Orchestration Framework
