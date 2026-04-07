# Enterprise Toolbox Guide: Getting Started

**Welcome to the AI-Driven Toolbox** — A production-grade framework for structured product development in enterprise environments.

## The Problem This Solves

Enterprise teams struggle with:
- ❌ **Scattered ownership** — Who decides what gets built?
- ❌ **Lost context** — Why was this architecture chosen?
- ❌ **Rework cycles** — Requirements change mid-development
- ❌ **Quality variance** — Testing is inconsistent
- ❌ **Skill silos** — Knowledge trapped in individuals

**This framework fixes all of it** by orchestrating AI agents + human decisions through a proven workflow.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Copy the Framework
```bash
cp -r project-template/.github your-project/.github
```

### Step 2: One Command to Start
```bash
@orchestrator Assess project status for [YOUR_PROJECT_NAME]
```

### Step 3: Answer Questions
The orchestrator asks about your project, team, tech stack—then recommends next steps.

**That's it.** Your first workflow is launched.

---

## 🎯 What This Framework Does

✅ **Structures product development** — Clear phases from idea to shipped code  
✅ **Orchestrates AI agents** — 11 specialized agents handling strategy, design, testing, coding  
✅ **Enforces quality gates** — Human decisions at critical points, audit trails for every action  
✅ **Scales from 1 team to 100+** — Same patterns work at any scale  
✅ **Enables enterprise governance** — Compliance, traceability, documented decisions

---

## � Three Enterprise Workflows

### **Workflow A: Launching a New Product** (Most Common)
```
1. Copy .github/ into your project
2. @orchestrator Launch new product for [COMPANY/PRODUCT]
3. Answer discovery questions (scope, team size, timeline)
4. Orchestrator generates full PRD (requirements, specs, architecture)
5. Team reviews & approves
6. Begin implementation with quality gates
```
**Timeline**: 2-6 weeks for comprehensive planning  
**Who decides**: Product Owner + executives at gates  
**Output**: Complete documentation + trained team

### **Workflow B: Retro-Documenting Existing Code** (Brownfield)
```
1. Copy .github/ into your existing project
2. @orchestrator Assess brownfield project [PROJECT_NAME]
3. BA agent scans codebase + interviews team
4. Framework extracts existing patterns, architecture, team knowledge
5. Documents auto-generated in `/docs/01-06/`
6. Team validates + approves
7. Continue with new features using full framework
```
**Timeline**: 1-4 weeks depending on codebase size  
**Who decides**: Tech leads + domain experts  
**Output**: Recovered institutional knowledge + baseline for new work

### **Workflow C: Mid-Project Course Correction**
```
1. Copy .github/ into your project at current phase
2. @orchestrator Assess current project status for [PROJECT]
3. Orchestrator reads your existing docs + commit history
4. Identifies current phase + recommends next milestone
5. Hands off to appropriate agent
6. Continues from where you are
```
**Timeline**: Immediate  
**Who decides**: Current project team  
**Output**: Structured path forward + clear next steps

---

## 🤖 The Agent Team (AI + Human Decisions)

The framework includes 11 specialized agents that work sequentially. Each handles one responsibility:

| Agent | Role | Enterprise Concern |
|-------|------|-------------------|
| **Orchestrator** | Workflow coordinator | Ensures sequence, prevents mistakes |
| **PM** | Project management | Timeline, scope, resource allocation |
| **PO** | Product decisions | Feature prioritization, tradeoff choices |
| **BA** | Functional specs | Business rules, edge cases, acceptance criteria |
| **UX** | Experience design | User research, prototypes, interactions |
| **Architect** | Technical strategy | Tech stack, scalability, security |
| **Dev-Lead** | Implementation planning | Layer breakdown, task sizing |
| **TDD Agents** (RED/GREEN/REFACTOR) | Development execution | Failing tests → passing code → clean code |

**Key principe**: Each agent has ONE job. No multi-tasking = fewer mistakes.

---

## 📚 Enterprise Features (Built-In)

### Quality Gates at Critical Points
- ✅ **Tradeoff presentation** — Every major decision shows 3 options with pros/cons
- ✅ **Human approval** — Implementation plan must be approved before coding starts
- ✅ **Audit trail** — Every agent logs actions with timestamps (ISO8601)
- ✅ **Immutable history** — No modifying past decisions; snapshots preserve intent

### Team Coordination
- ✅ **Clear handoffs** — Agent A → Agent B with full context
- ✅ **Parallel progression** — Multiple teams work independently (no bottlenecks)
- ✅ **Escalation protocol** — When something fails, it's escalated immediately
- ✅ **Compliance ready** — Checkpoints, approvals, audit logs for governance

### Production-Grade Documentation
- ✅ **Living docs** — Specs in `/01-requirements/` stay current as source of truth
- ✅ **Immutable PDLC phases** — Requirements (01), Architecture (02), Testing (03), Planning (04) don't change mid-project
- ✅ **Mutable implementation** — Implementation plan (05) evolves as needed with version control
- ✅ **Automation-ready** — Specs drive tests, tests drive code (no manual sync required)

---

## 🏢 Real Enterprise Scenarios

### Scenario 1: "We Have Requirements, No Architecture"
**Situation**: Product org defined features, but tech team doesn't know how to build it.

**Your move:**
```
@orchestrator Generate architecture for [PROJECT] given existing requirements
```

**What happens**:
1. Architect agent reads your requirements (01-requirements/)
2. Asks clarifying questions (database choice, scale, team size)
3. Generates full architecture document (tech stack, APIs, integrations)
4. Creates approval gate for tech leadership
5. Implementation team starts with clear technical roadmap

**Outcome**: Tech team has a built-for-purpose architecture (no rework)

---

### Scenario 2: "Our Codebase Has Zero Documentation"
**Situation**: Working product, but nobody remembers why it's architected this way.

**Your move:**
```
@orchestrator Retro-document codebase for [PROJECT]
```

**What happens**:
1. BA agent reads your code
2. Interviews team (architecture decisions, business rules, edge cases)
3. Auto-generates specs (users, features, requirements)
4. Extracts technical architecture from code
5. Creates snapshot docs (01-04)
6. Team validates + adds missing context

**Outcome**: Institutional knowledge captured, new team members onboarded 50% faster

---

### Scenario 3: "Quality Issues After Launch"
**Situation**: Delivered features, but testing was spotty—bugs in production.

**Your move:**
```
@orchestrator Assess quality for [PROJECT] and recommend improvements
```

**What happens**:
1. QA agent analyzes existing tests + production incidents
2. Architect designs test strategy (unit, integration, E2E)
3. BDD scenarios written for critical paths
4. Implementation phases get automated quality gates
5. Each deployment requires test + approval from QA lead

**Outcome**: Quality becomes measurable + predictable (no surprises in production)

---

## 🎓 For Your Team (Quick Onboarding)

| Role | Start Here |
|------|-----------|
| **PM** | `.github/agents/pm.agent.md` — Learn how orchestrator coordinates |
| **PO/Product** | `.github/agents/po.agent.md` — How to make decisions at gates |
| **Architect** | `.github/agents/architect.agent.md` — Tech strategy guide + OpenAPI |
| **Dev-Lead** | `.github/templates/implementation-plan-tmpl.md` — Layer breakdown pattern |
| **Developers** | Follow the dev-lead's implementation plan (RED → GREEN → REFACTOR cycles) |
| **QA/Testing** | `.github/agents/dev-tdd.agent.md` — How BDD scenarios drive code |

**Each role has ONE starting document.** Read it, then start the first workflow with the orchestrator.

---

## ✅ The 5 Rules (Don't Break These)

1. **TDD is strict** — RED → GREEN → REFACTOR, no exceptions
2. **Decisions are gated** — Major decisions get tradeoff matrix with 3 options
3. **Handoffs are logged** — Every agent logs what they did + hands off to next agent
4. **Docs are versioned** — Implementation plans create snapshots when changed (v1, v2, v3)
5. **Approvals block work** — No code execution until plan is approved (plan-approval.yaml: approved)

**These 5 rules prevent rework, ensure quality, and keep large teams aligned.**

---

## 🚦 Your First 30 Minutes

**Minute 0-5**: Copy `.github/` into your project  
**Minute 5-10**: Run orchestrator assessment  
**Minute 10-20**: Answer discovery questions (scope, team, tech stack)  
**Minute 20-30**: Orchestrator presents recommended workflow + next agent

**By minute 30**: Your first structured workflow is active

---

## 🔧 When Things Go Off-Track

| Problem | Solution |
|---------|----------|
| "Which agent should do this?" | Ask orchestrator for next step |
| "We disagree on direction" | Call orchestrator to present 3 options |
| "Implementation is taking too long" | Check implementation-plan approval gates |
| "Team doesn't know what to do next" | Read the handoff from previous agent in logs |
| "We built something wrong" | Review decision gates from Planning phase (04-planning) |

**Every problem has a debug path in the framework.**

---

## 🏆 Why Enterprises Choose This Framework

✅ **Compliance & Governance** — Every decision is logged, traceable, auditable  
✅ **Reduced Rework** — Structured discovery + approval gates catch issues early  
✅ **Team Scale** — Scales from 1 team to 50+ teams without breakdown  
✅ **Knowledge Transfer** — New team members onboard fast (docs + logs are living reference)  
✅ **Cost Control** — No wasted engineering cycles on rework or miscommunication  
✅ **Quality Predictability** — Automated gates + BDD create measurable quality  
✅ **Executive Visibility** — Roadmap → Architecture → Implementation all tracked

---

## 📖 Ready to Start?

**Copy .github/ → Run orchestrator → Answer questions → Framework handles the rest.**

Your first structured workflow launches in 5 minutes.

```bash
@orchestrator Assess project status for [YOUR_PROJECT_NAME]
```

**That's all you need to remember.**
