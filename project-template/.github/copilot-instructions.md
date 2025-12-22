# AI-Driven PDLC Orchestration System

## 🎯 System Architecture Overview

This is an **AI-driven Product Development Lifecycle (PDLC) orchestration framework** that coordinates specialized AI agents through three interconnected workflows:

1. **PDLC Workflow** (`.github/workflows/documents.workflows.md`) - 8 stages: Requirements → Analysis → Design → Planning → Testing → Deployment → Development → Improvement
2. **Implementation Workflow** (`.github/workflows/implementation.workflows.md`) - 6 phases: Epic Review → Sprint Planning → BDD Integration → TDD Execution → BDD Validation → Code Quality
3. **CI/CD Workflow** (`.github/workflows/cicd.workflows.md`) - 3 phases: Bootstrap → Stabilization → Optimization

### Critical Concepts

**Epic-Driven Model**: Epics are organizational containers; **user-stories are the work units**. Always implement ONE user-story at a time through all 4 layers (Database → Backend → Config → Frontend). Epic completion is automatic when ALL its stories are done.

**BDD-Driven TDD**: BDD scenarios are **entry points** (not endpoints). Failing BDD tests drive layer-by-layer TDD cycles (RED → GREEN → REFACTOR). Implementation makes BDD tests pass incrementally.

**Orchestrator Pattern**: Use `@orchestrator` agent (`.github/agents/orchestrator.agent.md`) to coordinate all workflows. It invokes specialized agents via `runSubagent` with proper `subagentType` and presents 3 options at decision gates.

## 🤖 Agent Invocation Pattern

**CRITICAL**: Always invoke agents with correct `subagentType`. Never call agents directly without the orchestrator coordinating.

```bash
# Correct: Orchestrator coordinates agent invocation
@orchestrator Start implementation workflow for ProjectX

# The orchestrator will automatically:
# 1. Invoke dev-lead with subagentType="dev-lead-bdd-integration"
# 2. Invoke dev-tdd-orchestrator for TDD cycles
# 3. Invoke ba with subagentType="ba-bdd-execution"
# 4. Present decision gates for user approval
```

**Agent Registry** (`.github/agents/`):
- `orchestrator.agent.md` - Master coordinator (use for ALL workflow launches)
- `pm.agent.md` - Project Manager (subagentTypes: pm-kickoff, pm-sprint-planning)
- `po.agent.md` - Product Owner (subagentTypes: po-requirements-analysis, po-user-stories, po-feature-acceptance)
- `ba.agent.md` - Business Analyst (subagentTypes: ba-personas, ba-bdd-scenarios, ba-bdd-execution)
- `ux.agent.md` - UX Designer (subagentTypes: ux-journey-maps, ux-design-systems)
- `architect.agent.md` - Solution Architect (subagentTypes: architect-design, architect-tech-spec, architect-deployment)
- `dev-lead.agent.md` - Tech Lead (subagentTypes: dev-lead-bdd-integration, dev-lead-code-review)
- `dev-tdd*.agent.md` - TDD Navigators (orchestrator, red, green, refactor phases)

## 📋 Workflow Execution Rules

### Starting New Projects
**Always use workflow launchers** in `.github/tasks/`:
- `start-pdlc.prompts.md` - Copy prompt, fill parameters, paste to `@orchestrator`
- `start-implementation.prompts.md` - For development after PDLC complete
- `start-cicd.prompts.md` - For CI/CD setup

**Never skip stages**: PDLC must complete sequentially (1→2→3→4→5→6→7→8). Implementation requires PDLC Stages 1-6 complete with approved documents (requirements.md, user-stories.md, architecture-design.md, tech-spec.md, design-systems.md, test-strategies.md).

### Decision Gates
**Orchestrator pauses at critical points** and presents 3 options with pros/cons:
- Architecture selection (Stage 3): Monolith vs Microservices vs Serverless
- Technology stack (Stage 4): Language/framework/database choices
- Sprint scope (Implementation Phase 1): Conservative vs Balanced vs Stretch
- Story acceptance (Implementation Phase 4): Based on BDD test results
- CI/CD phase: Bootstrap vs Stabilization vs Optimization

**Always wait for user decision** before proceeding.

## 💻 Development Standards

**Coding Standards**: Follow `.github/instructions/coding.instructions.md` strictly:
- SOLID principles, TDD discipline (RED-GREEN-REFACTOR)
- Test coverage >80%, cyclomatic complexity <10
- 13-point code review checklist before merge

**Documentation Standards**: Follow `.github/instructions/documentation.instructions.md`:
- **NEVER create documentation unless explicitly requested**
- **ONLY update README.md** for project documentation
- **NEVER create additional docs** (no AGENTS_REGISTRY.md, PROJECT_STRUCTURE.md, etc.)
- Use Mermaid for simple diagrams, PlantUML for complex UML

**Templates**: Use `.github/templates/` for all document generation:
- `prd.template.yml` - 13 PRD documents structure
- `user-story.template.yml` - Story format with acceptance criteria
- `tech-doc.template.yml` - Technical specifications
- `func-doc.template.yml` - Functional specifications

## 🔄 TDD Workflow (Critical)

**Implementation happens layer-by-layer**:
1. **Layer 1 (Database)**: Migrations, models, indexes
2. **Layer 2 (Backend)**: API endpoints, business logic, services
3. **Layer 3 (Config)**: Routes, DI, feature flags
4. **Layer 4 (Frontend)**: Components, state management, styling

**For each layer, execute strict TDD**:
- **RED**: Write failing test supporting BDD assertion (use `dev-tdd-red`)
- **GREEN**: Implement minimal code to pass (use `dev-tdd-green`)
- **REFACTOR**: Improve quality while tests pass (use `dev-tdd-refactor`)
- **Verify**: Check BDD test progress after layer

**Entry point**: Failing BDD tests from feature files
**Exit condition**: All BDD scenarios pass for the user-story

## 📊 Progress Tracking

**Use `manage_todo_list` tool** extensively to track:
- PDLC stage progress (current stage, completed stages, documents generated)
- Implementation progress (epics, user-stories, current layer, TDD phase)
- CI/CD status (pipeline components, quality gates, build health)

**Check progress anytime**:
```bash
@orchestrator Show PDLC progress for [PROJECT_NAME]
@orchestrator Show implementation progress for [PROJECT_NAME]
@orchestrator Show CI/CD pipeline status for [PROJECT_NAME]
```

## 🎯 Development Approach

- **Go step-by-step interactively** - ask for clarifications, avoid assumptions
- **Present 3 options** for all important choices (architecture, tech stack, sprint scope) with pros/cons
- **Enforce traceability** - all documents trace to requirements.md, all code traces to user-stories
- **Quality gates first** - never skip approval gates or bypass BDD validation
- **One story at a time** - implement full layer stack for ONE story before moving to next
- **BDD drives TDD** - failing BDD tests are the entry point, passing tests are the exit condition
- **Document sparingly** - only update README.md unless user explicitly requests new documents

## 📚 Key Reference Files

**Essential Reading**:
- `.github/ORCHESTRATION_GUIDE.md` - Complete usage guide (read first!)
- `.github/README.md` - System overview and workflow diagrams
- `.github/workflows/` - All three workflow definitions (PDLC, Implementation, CI/CD)
- `.github/agents/` - Agent profiles with subagentType definitions
- `.github/tasks/` - Workflow launcher prompts

**Quick Start**:
1. Read ORCHESTRATION_GUIDE.md for complete system understanding
2. Choose launcher from `.github/tasks/` based on project state
3. Copy prompt template, fill parameters, invoke `@orchestrator`
4. Follow interactive prompts and make decisions at gates
5. Track progress via todo lists

**Never modify workflows directly** - use orchestrator to execute them