---
description: Quick-Reference Index for AI-first delivery framework - maps everyday tasks to files and agents
icon: 📋
category: Navigation
---

# 🚀 Quick-Reference: AI-first Delivery Framework

**Use this index to quickly find the right file, prompt, or agent for any task.**  
Load this via `/` in Copilot Chat or reference directly when planning work.

---

## 📍 Find What You Need

### By Everyday Task

| Task | Load This | Agent | Context |
|------|-----------|-------|---------|
| **Starting a new project** | `#file:.github/prompts/start-pdlc.prompt.md` | `@Workflow Orchestrator` | Phase 0 assessment |
| **Morning standup / status check** | `#file:.github/tasks/morning-standup.prompt.md` + current `handoff.md` | None | Daily sync |
| **Planning a user story** | `#file:.github/prompts/plan-us.prompt.md` + `#file:.github/templates/user-story-tmpl.yml` | `@Product Owner` | Documentation phase |
| **Creating implementation plan** | `#file:.github/templates/implementation-plan-tmpl.md` | `@Tech Lead` | Phase 5 handoff |
| **Starting TDD session** | `#file:.github/tasks/tdd-session-start.prompt.md` + current layer from `implementation-plan.md` | `@TDD Orchestrator` | Layer execution |
| **Writing failing test (RED)** | `#file:.github/tasks/write-tests.prompt.md` + `#file:.github/instructions/test-strategy.instructions.md` | `@TDD RED Phase Agent` | RED cycle |
| **Implementing code (GREEN)** | Current `implementation-plan.md` layer + failing test | `@TDD GREEN Phase Agent` | GREEN cycle |
| **Refactoring code** | `#file:.github/instructions/coding.instructions.md` + test file | `@TDD REFACTOR Phase Agent` | REFACTOR cycle |
| **Code review** | `#file:.github/instructions/code-review.instructions.md` + `#file:.github/templates/code-review-checklist-tmpl.md` | None | QA gate |
| **API design** | `#file:.github/instructions/api-design.instructions.md` + `#file:api/openapi.yaml` | `@Solution Architect` | Architecture |
| **Documenting code** | `#file:.github/instructions/code-comments.instructions.md` | None | During implementation |
| **Project handoff** | `#file:.github/guides/handoff-guide.md` + `#file:.github/templates/handoff-tmpl.json` | Agent receiving task | Phase boundary |
| **Optimizing costs/PRUs** | `#file:.github/instructions/pru-optimization.instructions.md` + `#file:.github/guides/context-optimization-strategy.md` | `@AI Engineering Agent` | Strategic review |

---

### By Phase

#### 🔍 Phase 0: Assessment & Discovery
**Goal**: Determine client maturity, prerequisites, and routing strategy  
**Key Files**:
- Start: `#file:.github/prompts/start-pdlc.prompt.md`
- Workflow: `#file:.github/workflows/assessment.workflows.md`
- Output template: `#file:.github/templates/project-status-tmpl.md`

**Agent**: `@Workflow Orchestrator`

#### 📚 Phases 1-7: Documentation & Development
**Goal**: Create PRD documents, user stories, and architecture  
**Key Files**:
- Routing guide: `#file:.github/workflows/documents.workflows.md`
- Story template: `#file:.github/templates/user-story-tmpl.yml`
- PRD templates: `#file:.github/templates/prd-tmpl.yml`
- BDD template: `#file:.github/templates/epic-tmpl.yml`

**Agents**: 
- Requirements: `@Product Owner`
- Architecture: `@Solution Architect`
- Design: `@UX/UI Designer`

#### ⚙️ Phase 8: Implementation (TDD)
**Goal**: Execute RED → GREEN → REFACTOR cycles per user story  
**Key Files**:
- Workflow: `#file:.github/workflows/implementation.workflows.md`
- Implementation plan: `#file:.github/templates/implementation-plan-tmpl.md`
- TDD execution: `#file:.github/templates/tdd-execution-tmpl.md`
- Handoff template: `#file:.github/templates/handoff-tmpl.json`

**Agents**: 
- Orchestration: `@TDD Orchestrator`
- RED: `@TDD RED Phase Agent`
- GREEN: `@TDD GREEN Phase Agent`
- REFACTOR: `@TDD REFACTOR Phase Agent`

---

### By Role/Agent

#### 🎯 Orchestrator (Master Coordinator)
**When to invoke**: Starting work, managing handoffs, coordinating phases  
**Use prompts**:
- `#file:.github/prompts/start-pdlc.prompt.md` — New project assessment
- `#file:.github/prompts/overview.prompt.md` — Current status check

#### 👤 Product Owner
**When to invoke**: Defining requirements, creating user stories  
**Use prompts**:
- `#file:.github/prompts/plan-us.prompt.md` — Create user story
- Story template: `#file:.github/templates/user-story-tmpl.yml`

#### 🏗️ Solution Architect
**When to invoke**: Designing system architecture, selecting tech stack  
**Key files**:
- Templates: `#file:.github/templates/architecture-design.template.md` + `#file:.github/templates/tech-spec.template.md`
- Instructions: `#file:.github/instructions/api-design.instructions.md`

#### 👨‍💼 Tech Lead
**When to invoke**: Creating implementation plans, unblocking TDD  
**Use prompts**:
- `#file:.github/tasks/layer-checkpoint.prompt.md` — Layer completion check
- Template: `#file:.github/templates/implementation-plan.template.md`

#### 🧪 TDD Orchestrator
**When to invoke**: Managing RED → GREEN → REFACTOR cycles  
**Use prompts**:
- `#file:.github/tasks/tdd-session-start.prompt.md` — Start TDD session
- `#file:.github/tasks/write-tests.prompt.md` — Write tests

#### 💡 AI Engineering Agent
**When to invoke**: Optimizing prompts, cost analysis, AI strategy  
**Key files**:
- `#file:.github/guides/context-optimization-strategy.md` — Context design
- `#file:.github/instructions/pru-optimization.instructions.md` — Token budgets

#### 🎨 UX/UI Designer
**When to invoke**: Creating user journeys, designing interfaces  
**Key files**:
- Templates: `#file:.github/templates/epic.template.yml` (user journey mapping)

---

## 📖 Core Reference Guides

| Guide | Purpose | When to Read |
|-------|---------|--------------|
| **[copilot-instructions.md](./../copilot-instructions.md)** | Framework overview + agent roles | First thing — defines everything |
| **[HANDOFF-GUIDE.md](./guides/handoff-guide.md)** | Handoff format + quality gates | When designing handoffs |
| **[context-optimization-strategy.md](./guides/context-optimization-strategy.md)** | Token efficiency + 3-level model | When optimizing prompts |
| **[tdd-enforcement.guide.md](./guides/tdd-enforcement.guide.md)** | TDD sequencing rules | Before starting implementation |
| **[pru-optimization.instructions.md](./../instructions/pru-optimization.instructions.md)** | Token budgets by agent type | Planning PRU strategy |

---

## 🎯 Coding Standards & Instructions

| Standard | File | Applies To |
|----------|------|-----------|
| **General coding** | `#file:.github/instructions/coding.instructions.md` | All code |
| **Code documentation** | `#file:.github/instructions/code-comments.instructions.md` | All code comments |
| **Code review checklist** | `#file:.github/instructions/code-review.instructions.md` | Code review |
| **API design** | `#file:.github/instructions/api-design.instructions.md` | API routes |
| **Test strategy** | `#file:.github/instructions/test-strategy.instructions.md` | Test files |
| **Documentation rules** | `#file:.github/instructions/documentation.instructions.md` | Markdown files |
| **Analysis guardrails** | `#file:.github/instructions/ai.analysis.guardrails.instructions.md` | Artifact analysis |

**Language-Specific**:
- TypeScript: `#file:.github/instructions/coding/typescript.instructions.md`
- .NET/C#: `#file:.github/instructions/coding/dot-net.instructions.md`
- React: `#file:.github/instructions/coding/react.instructions.md`
- Angular: `#file:.github/instructions/coding/angular.instructions.md`
- Next.js: `#file:.github/instructions/coding/nextjs.instructions.md`
- [View all languages](./instructions/coding/)

---

## 📁 All Available Templates

**User Story & Planning**:
- User story: `#file:.github/templates/user-story.template.yml`
- Epic: `#file:.github/templates/epic.template.yml`
- User story folder structure: `#file:.github/templates/user-story-folder.template.md`

**Documentation**:
- PRD: `#file:.github/templates/prd.template.yml`
- Implementation plan: `#file:.github/templates/implementation-plan.template.md`
- Tech doc: `#file:.github/templates/tech-doc.template.yml`
- Architecture design: `#file:.github/templates/architecture-design.template.md`

**Implementation**:
- Handoff: `#file:.github/templates/handoff.template.json`
- TDD execution log: `#file:.github/templates/tdd-execution.template.md`
- Layer completion checklist: `#file:.github/templates/layer-completion-checklist.template.md`

**Review & QA**:
- Code review checklist: `#file:.github/templates/code-review-checklist.template.md`
- Project status: `#file:.github/templates/project-status.template.md`
- Sprint planning: `#file:.github/templates/sprint-planning.template.md`

**Meetings**:
- Meeting minutes: `#file:.github/templates/meeting.minutes.template.yml`

---

## 🚀 Quick Copy-Paste Prompts

**For daily work**, copy these prompts and paste into a new chat:

| Task | Prompt File |
|------|-------------|
| New project assessment | `#file:.github/tasks/assess-project-status.prompt.md` |
| Morning standup | `#file:.github/tasks/morning-standup.prompt.md` |
| Start TDD session | `#file:.github/tasks/tdd-session-start.prompt.md` |
| Write tests | `#file:.github/tasks/write-tests.prompt.md` |
| Start implementation | `#file:.github/tasks/start-implementation.prompt.md` |
| Layer checkpoint | `#file:.github/tasks/layer-checkpoint.prompt.md` |
| Commit user story | `#file:.github/tasks/commit-us.prompt.md` |
| Start CI/CD | `#file:.github/tasks/start-cicd.prompt.md` |

---

## 🔧 Agent System Prompts (Advanced)

**For customizing agent behavior**, reference these system prompts:

| Agent | System Prompt |
|-------|---------------|
| Base template | `#file:.github/prompts/agent-system-prompts/base.template.md` |
| Orchestrator | `#file:.github/prompts/agent-system-prompts/orchestrator.system.md` |
| Product Owner | `#file:.github/prompts/agent-system-prompts/po.system.md` |
| Tech Lead | `#file:.github/prompts/agent-system-prompts/dev-lead.system.md` |
| TDD Orchestrator | `#file:.github/prompts/agent-system-prompts/dev-tdd.system.md` |
| [View all agents](./agent-system-prompts/) |

---

## 📊 Context Engineering Quick Tips

### Loading Strategy (PRU Optimization)
```
✅ ALWAYS load: .github/copilot-instructions.md (auto-loaded, baseline)
✅ LOAD ON DEMAND: Task-specific files via #file: references
❌ NEVER LOAD: Full history or archive files
```

### Token Budget by Agent
| Agent Type | Budget | Example |
|-----------|--------|---------|
| Planning (PM, PO) | 5-10K | Requirements definition |
| Architecture | 10-15K | System design |
| TDD Implementation | 3-5K | Single layer, single file |
| Review/Strategy | 5-8K | Cost analysis |

### 3-Level Context Model
1. **CANONICAL**: Single source of truth (read-only references)
2. **DELTA**: What changed this cycle (handoff.md)
3. **CONTEXTUAL**: Agent-specific prompts (task-specific files)

---

## ⚡ Common Workflows

### New Project (Assessment → Documentation → Implementation)
1. `@Workflow Orchestrator` — Run `#file:.github/prompts/start-pdlc.prompt.md`
2. `@Workflow Orchestrator` — Route documentation workflow
3. `@Tech Lead` — Create implementation plan
4. `@TDD Orchestrator` — Start TDD cycles

### User Story (Planning → Development → Validation)
1. `@Product Owner` — Run `#file:.github/prompts/plan-us.prompt.md`
2. `@Tech Lead` — Create `implementation-plan.md`
3. `@TDD Orchestrator` — Execute RED → GREEN → REFACTOR
4. `@Tech Lead` — Validate completion

### Code Review Checklist
1. Load: `#file:.github/instructions/code-review.instructions.md`
2. Load: `#file:.github/templates/code-review-checklist.template.md`
3. Review against 13-point checklist
4. Document in handoff.md

---

## 🔗 Framework Structure at a Glance

```
.github/
├── agents/                      # 13 agent role definitions
├── instructions/                # Global rules + language-specific
├── workflows/                   # 4 PDLC phase workflows
├── prompts/                     # Reusable .prompt.md files
│   └── agent-system-prompts/   # Agent customization
├── tasks/                       # 11 daily copy-paste prompts
├── templates/                   # 22 document templates
├── guides/                      # 4 deep-dive guides
├── copilot-instructions.md      # Master entry point
└── [This file]                  # Quick-Reference Index
```

---

## 📚 Learning Path

**New to the framework?** Follow this sequence:

1. Read: `#file:.github/copilot-instructions.md` (5 min)
2. Review: `#file:.github/guides/HANDOFF-GUIDE.md` (10 min)
3. Scan: `#file:.github/guides/context-optimization-strategy.md` (5 min)
4. Reference: This quick-reference as needed (ongoing)

**Focused on implementation?**

1. Load: `#file:.github/workflows/implementation.workflows.md`
2. Read: `#file:.github/guides/tdd-enforcement.guide.md`
3. Use: Copy-paste from `#file:.github/tasks/`

---

## 🎯 Need Help?

| Question | Action |
|----------|--------|
| "What do I do next?" | Load: `#file:.github/prompts/overview.prompt.md` |
| "How do I start a project?" | Load: `#file:.github/prompts/start-pdlc.prompt.md` |
| "What are my TDD rules?" | Load: `#file:.github/guides/tdd-enforcement.guide.md` |
| "How do I optimize tokens?" | Load: `#file:.github/instructions/pru-optimization.instructions.md` |
| "What's my role?" | Load: `#file:.github/agents/<role>.agent.md` |
| "How do handoffs work?" | Load: `#file:.github/guides/HANDOFF-GUIDE.md` |

---

**Last Updated**: March 2026 | **Status**: Production Ready  
**Framework**: AI-first Delivery | **Version**: 1.0
