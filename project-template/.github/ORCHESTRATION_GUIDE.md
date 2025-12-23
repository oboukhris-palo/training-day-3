# AI-Driven Workflow Orchestration Guide

**Quick Start:**
```
@orchestrator Start new PDLC workflow for [PROJECT_NAME]
@orchestrator Start implementation workflow for [PROJECT_NAME]
@orchestrator Setup CI/CD pipeline for [PROJECT_NAME]
```

---

## Folder Structure

```
.github/  → workflows, agents, templates, instructions, tasks
docs/prd/ → All 13 PDLC documents
docs/user-stories/ → user-stories.md + <US-REF>/implementation-plan.md + bdd-scenarios/
features/ → BDD feature files
src/ → Application code
```

---

## �📋 The Three Core Workflows

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

## Agents
- **PM**: Timeline, coordination
- **PO**: Requirements, PRDs, acceptance
- **BA**: BDD scenarios, validation
- **UX**: Design, Figma
- **Architect**: Architecture, tech decisions
- **Dev-Lead**: BDD integration, code review
- **TDD Navigator**: RED-GREEN-REFACTOR
- **Orchestrator**: Master coordinator

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


