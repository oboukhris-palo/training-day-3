# AI-Driven Workflow Orchestration Guide

**Quick Start:**

For **NEW** projects:
```bash
@orchestrator Start new PDLC workflow for [PROJECT_NAME]
```

For **EXISTING** projects (assess first):
```bash
@orchestrator Assess project status for [PROJECT_NAME]
```

Then follow the recommended workflow from the assessment report.

For **BROWNFIELD** projects (continue implementation):
```bash
@orchestrator Continue implementation for [PROJECT_NAME]
```

---

## 🎯 What This System Does

The AI-driven orchestration system adapts to your project status and coordinates specialized agents through three interconnected workflows:

1. **PDLC Workflow** (8 stages) - Requirements → Analysis → Design → Planning → Testing → Deployment → Development → Improvement
2. **Implementation Workflow** (6 phases) - Epic Review → Sprint Planning → BDD Integration → TDD Execution → BDD Validation → Code Quality
3. **CI/CD Workflow** (3 phases) - Bootstrap → Stabilization → Optimization

**Key Innovation**: The system **assesses project maturity** and adapts the starting point, skipping completed work and resuming at the right place.

---

## Project Status Assessment

Before starting, **always assess your project status**:

```bash
@orchestrator Assess project status for [PROJECT_NAME]
```

This runs a comprehensive analysis that checks:
- ✓ Existing PDLC documents (which exist, which are missing)
- ✓ Implementation status (which user stories are done)
- ✓ Code quality (test coverage, architecture alignment)
- ✓ BDD test status (passing vs failing)
- ✓ Documentation gaps

**Output**: Project maturity report with recommended next steps.

---

## 🗂️ Folder Structure

```
.github/  
├── workflows/          # PDLC, Implementation, CI/CD definitions
├── agents/             # All agent profiles with handoff definitions
├── templates/          # Document templates
├── instructions/       # Coding and documentation standards
├── tasks/              # Workflow launchers and guides
│   ├── assess-project-status.prompts.md
│   ├── start-pdlc.prompts.md
│   ├── start-implementation.prompts.md
│   └── PROJECT_STATUS_WORKFLOWS.md (this guide)
└── README.md

docs/
├── prd/                # All 13 PDLC documents
│   ├── requirements.md
│   ├── personas.md
│   ├── architecture-design.md
│   └── ... (10 more)
├── user-stories/       # User stories organized by reference
│   ├── user-stories.md (master list)
│   ├── US-001/
│   │   ├── implementation-plan.md
│   │   └── bdd-scenarios/
│   └── US-002/
│       └── ...
└── design/             # UX/UI design documents

features/               # BDD feature files
src/                    # Application source code
```

## Common Workflows by Project Status

### 1️⃣ NEW Project (No docs, no code)
```bash
@orchestrator Start new PDLC workflow for [PROJECT_NAME]
```
**Flow**: PDLC Stages 1-8 → Implementation → CI/CD  
**Timeline**: 3-4 months

### 2️⃣ PDLC In Progress (Some docs, no code)
```bash
@orchestrator Resume PDLC workflow at Stage [X] for [PROJECT_NAME]
```
**Flow**: Skip completed stages → Continue at Stage X → Implementation  
**Timeline**: 2-4 weeks

### 3️⃣ Planning Complete (All docs, no code)
```bash
@orchestrator Start implementation workflow for [PROJECT_NAME]
```
**Flow**: Implementation Phases 1-6 → CI/CD  
**Timeline**: 4-12 weeks

### 4️⃣ Brownfield (Mixed docs & code)
```bash
@orchestrator Continue implementation for [PROJECT_NAME]
```
**Flow**: Assess → Skip completed stories → Resume at incomplete → Parallel doc completion  
**Timeline**: 1-4 weeks

### 5️⃣ Near Complete (Most code done)
```bash
@orchestrator Validate and complete implementation for [PROJECT_NAME]
```
**Flow**: Fix failing tests → Complete final stories → Prepare deployment  
**Timeline**: 1-2 weeks

### 6️⃣ Migration Project (New features on existing code)
```bash
@orchestrator Start migration for [PROJECT_NAME]
```
**Flow**: Document existing → Plan migration → Implement new → Migrate existing  
**Timeline**: 2-6 months

---

### 1. PDLC (8 Stages)
1-2. Requirements & Analysis → requirements.md, personas.md
3. Design → architecture.md, user-stories.md | **Gate**: Architecture
4. Planning → tech-spec.md, design-systems.md | **Gate**: Tech stack
5-6. Testing & Deployment → test-strategies.md, BDD, deployment-plan.md
7-8. Development & Improvement | **Gates**: Sprint scope, acceptance

Launcher: `.github/tasks/start-pdlc.prompts.md`

---

### 2. Implementation (6 Phases)

**Phase 0-1**: Epic review, sprint planning | **Gate**: Sprint scope
**Phase 2**: BDD integration, 4-layer breakdown, implementation plan
**Phase 3**: TDD cycles (RED-GREEN-REFACTOR) per layer, BDD-driven
**Phase 4**: BA validates BDD scenarios | **Gate**: Accept story
**Phase 5**: Code review, merge | **Gate**: Approve merge
**Phase 6**: Sprint review | **Gate**: Plan next sprint

**Key**: Work ONE story at a time (4 layers). Epic completes when all stories done.
Launcher: `.github/tasks/start-implementation.prompts.md`

---

### 3. CI/CD (3 Phases)
**Phase 1 (Bootstrap)**: GitHub Actions, dev env, basic monitoring | MVP
**Phase 2 (Stabilization)**: Staging, canary deploy, APM | Pre-prod
**Phase 3 (Optimization)**: IaC, blue-green, chaos, full observability | Production

**Gate**: Phase selection
Launcher: `.github/tasks/start-cicd.prompts.md`

---

## 🤖 Agent Coordination

**Handoff-Based Collaboration** (agents work in same workspace):
- Agents use handoffs to transfer control while maintaining shared context
- All agents see and edit the same files
- Incremental progress visible to user
- Interactive decision gates at critical points

**Handoff Chain**:
```
Orchestrator presents workflow options
    ↓
PM creates project charter
    ↓ (handoff)
PO creates requirements.md
    ↓ (handoff)
BA creates personas.md, business-case.md
    ↓ (handoff)
UX creates journey-maps.md, blueprints.md, design-systems.md
    ↓ (handoff)
Architect creates architecture-design.md, tech-spec.md
    ↓ (decision gate - orchestrator)
PO creates user-stories.md
    ↓ (handoff)
BA creates BDD scenarios (Gherkin)
    ↓ (handoff)
Dev-Lead integrates BDD, creates implementation plan
    ↓ (handoff)
TDD executes RED→GREEN→REFACTOR cycles
    ↓ (handoff)
BA validates BDD scenarios in full environment
    ↓ (decision gate - orchestrator)
Dev-Lead approves code review
    ↓
Orchestrator presents next sprint/epic options
```

**Agent Roles**:
- **Orchestrator**: Presents options, manages decision gates, coordinates handoffs
- **PM**: Project charter, timeline, sprint planning
- **PO**: Requirements, PRDs, user stories, acceptance
- **BA**: Personas, business case, BDD scenarios, validation
- **UX**: Journey maps, UI design, design systems (with Figma MCP)
- **Architect**: Architecture design, tech stack, technical specifications
- **Dev-Lead**: BDD integration, implementation planning, code review
- **TDD Navigator**: RED-GREEN-REFACTOR cycles (red/green/refactor agents)

**When Orchestrator Uses runSubagent** (for isolated research only):
- Market research, competitive analysis
- Technical feasibility studies  
- Code quality reports (read-only analysis)
- Any task that doesn't require editing project files

---

## Decision Gates

Format: 3 options (Pros|Cons|Best for) → User decides

**Gates**: Architecture (Stage 3), Tech Stack (Stage 4), Sprint Scope (Phase 1), Story Accept (Phase 4), CI/CD Phase

## Progress Tracking

Use `manage_todo_list`. Check anytime:
```bash
@orchestrator Show [PDLC/implementation/CI-CD] progress
```

---

## Project Flow
**Week 1-6**: PDLC (8 stages) → All PRDs
**Week 5**: CI/CD setup (parallel)
**Week 7+**: 2-week sprints, TDD per story
**Week 12+**: Stage 8 improvement cycles

---

## Best Practices
- Start simple, evolve complexity
- Sequential stages, respect gates
- Review 3 options at gates
- Maintain traceability
- ONE story at a time (4 layers)
- BDD-driven TDD (failing tests first)

---

## Common Commands
```bash
@orchestrator Start [PDLC/implementation/CI-CD] workflow for [PROJECT]
@orchestrator Resume [workflow] at Stage/Phase [X]
@orchestrator Show progress
```

---

## Reference Files
**Workflows**: `.github/workflows/` - PDLC, Implementation, CI/CD
**Agents**: `.github/agents/` - All agent profiles
**Tasks**: `.github/tasks/` - Workflow launchers
**Templates**: `.github/templates/` - PRD, user-story, tech/func docs
**Standards**: `.github/instructions/` - Coding, documentation

---


