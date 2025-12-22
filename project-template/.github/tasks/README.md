# Workflow Task Launchers

This directory contains interactive prompt templates for launching the major workflows in the AI-Driven Product Development Lifecycle system.

---

## Available Launchers

### 1. [start-pdlc.prompts.md](start-pdlc.prompts.md)
**Purpose**: Launch the complete PDLC workflow (8 stages) from requirements through deployment

**When to Use**:
- Starting a new project from scratch
- No PDLC documents exist yet
- Need to define requirements, architecture, and planning

**Stages Covered**:
- Stage 1: Requirements Gathering
- Stage 2: Analysis & Business Justification
- Stage 3: Design & Architecture
- Stage 4: Development Planning
- Stage 5: Testing Strategy
- Stage 6: Deployment & Release Planning
- Stage 7: Development Execution (TDD)
- Stage 8: Continuous Improvement

**Typical Duration**: 6-8 weeks for complete PDLC (depends on project size)

**Quick Start**:
```
@orchestrator Start new PDLC workflow for [PROJECT_NAME]
```

---

### 2. [start-implementation.prompts.md](start-implementation.prompts.md)
**Purpose**: Launch development execution workflow (6 phases) from user stories to tested code

**When to Use**:
- PDLC Stages 1-6 are complete
- All required documents exist (requirements, user-stories, architecture, tech-spec, etc.)
- Ready to start coding user stories

**Phases Covered**:
- Phase 0: Epic Review & User Story Sequencing
- Phase 1: Sprint Planning
- Phase 2: BDD Integration & User Story Breakdown
- Phase 3: TDD Development Cycle (RED-GREEN-REFACTOR)
- Phase 4: BDD Testing & Validation
- Phase 5: Code Quality & Commit
- Phase 6: Sprint Review & Next Steps

**Typical Duration**: Ongoing (2-week sprints, multiple iterations)

**Quick Start**:
```
@orchestrator Start implementation workflow for [PROJECT_NAME]
```

---

### 3. [start-cicd.prompts.md](start-cicd.prompts.md)
**Purpose**: Setup and configure CI/CD pipeline with phased evolution

**When to Use**:
- Git repository initialized
- Tech stack defined
- At least one user story implemented
- Ready to automate build, test, and deployment

**Phases Covered**:
- Phase 1: Bootstrap (Basic CI, dev environment)
- Phase 2: Stabilization (Staging, canary deployment, APM)
- Phase 3: Optimization (Blue-green, chaos testing, full observability)

**Typical Duration**:
- Phase 1: 2-3 days
- Phase 2: 1-2 weeks
- Phase 3: 2-3 weeks

**Quick Start**:
```
@orchestrator Setup CI/CD pipeline for [PROJECT_NAME]
```

---

## How to Use

1. **Choose the appropriate launcher** based on your project state
2. **Copy the prompt template** from the launcher file
3. **Fill in the parameters** (project name, type, requirements, etc.)
4. **Paste into GitHub Copilot Chat** with `@orchestrator` mention
5. **Follow interactive prompts** - orchestrator will guide you step-by-step
6. **Make decisions at gates** - orchestrator presents 3 options with pros/cons for critical decisions

---

## Workflow Relationships

```
┌─────────────────────────────────────────────────────────────┐
│ START HERE: PDLC Workflow (start-pdlc.prompts.md)          │
│ Stages 1-6: Requirements → Architecture → Planning          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ PARALLEL SETUP: CI/CD Pipeline (start-cicd.prompts.md)     │
│ Phase 1: Bootstrap - Basic automation                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ DEVELOPMENT: Implementation Workflow                        │
│ (start-implementation.prompts.md)                           │
│ Phase 0-6: Epic planning → TDD execution → BDD validation  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ EVOLUTION: Continuous Improvement                           │
│ PDLC Stage 8 → Refine Requirements → Repeat                │
└─────────────────────────────────────────────────────────────┘
```

**Recommended Sequence**:
1. **Week 1-6**: Run PDLC Workflow (stages 1-6) to create all planning documents
2. **Week 4-5**: Setup CI/CD Phase 1 (Bootstrap) in parallel with PDLC Stage 4-5
3. **Week 7+**: Start Implementation Workflow with first sprint
4. **Week 11-12**: Upgrade to CI/CD Phase 2 (Stabilization) before production
5. **Ongoing**: Sprint cycles (2 weeks each) until all epics/stories complete
6. **Post-launch**: PDLC Stage 8 (Continuous Improvement) for iterations

---

## Decision Gates Reference

Throughout the workflows, you'll encounter decision gates where the orchestrator presents options:

### PDLC Workflow Decision Gates
- **Gate 1.1**: Project charter approval
- **Gate 3.1**: Architecture selection (monolith vs microservices vs serverless)
- **Gate 4.1**: Technology stack selection (language, frameworks, database)
- **Gate 7.1**: Sprint scope selection (which user stories to implement)
- **Gate 8.1**: Improvement prioritization (what to build next iteration)

### Implementation Workflow Decision Gates
- **Gate 0.1**: User story sequencing approval
- **Gate 1.1**: Sprint scope selection (story combinations and velocity)
- **Gate 4.1**: Story acceptance decision (based on BDD test results)
- **Gate 5.1**: Code merge approval (based on quality review)
- **Gate 6.1**: Next sprint planning (continue epic or start new)

### CI/CD Workflow Decision Gates
- **Gate 0.1**: CI/CD phase selection (Bootstrap vs Stabilization vs Optimization)
- **Gate 2.1**: Deployment strategy selection (rolling vs canary vs blue-green)
- **Gate 3.1**: Monitoring level selection (basic vs APM vs full observability)

At each gate, the orchestrator:
1. **Presents 3 options** with detailed pros/cons
2. **Provides recommendation** based on project context
3. **Waits for your decision** before proceeding
4. **Implements your choice** and continues workflow

---

## Key Orchestration Principles

All launchers follow these principles:

1. **Interactive Step-by-Step**: Never rush ahead - go incrementally with user approval
2. **3 Options Rule**: Always present 3 choices for major decisions
3. **Traceability**: All documents and code trace back to requirements
4. **Quality Gates**: Enforce approval processes before progression
5. **Agent Specialization**: Invoke correct agent with proper `subagentType`
6. **Transparency**: Maintain todo list showing real-time progress
7. **User-Story Granularity**: Implement at story level, not epic level
8. **BDD-Driven TDD**: BDD scenarios drive layer-by-layer TDD implementation
9. **Standards Compliance**: Follow coding.instructions.md and documentation.instructions.md
10. **Continuous Improvement**: Stage 8 feedback loops back to Stage 1

---

## Quick Reference

| Launcher | Start Condition | End Condition | Agents Involved | Duration |
|----------|-----------------|---------------|-----------------|----------|
| **PDLC** | New project idea | All 13 PRD documents + test strategies | PM, PO, BA, UX, Architect, Dev-Lead | 6-8 weeks |
| **Implementation** | PDLC complete | All epics/stories implemented + tested | Dev-Lead, TDD Navigator, BA, PO | Ongoing (2-week sprints) |
| **CI/CD** | Code repo + tests | Automated pipeline operational | Architect, Dev-Lead | 3 days - 3 weeks |

---

## Examples

### Starting a New E-commerce Project

```bash
# Step 1: Launch PDLC Workflow (Week 1-6)
@orchestrator Start new PDLC workflow for ShopEasy
Project Type: web-application
Project Description: B2C e-commerce platform with inventory management
Initial Requirements: Product catalog, shopping cart, checkout, payment integration

# Step 2: Setup CI/CD (Week 5)
@orchestrator Setup CI/CD pipeline for ShopEasy
Project State: PDLC Stage 4 complete
Tech Stack: Spring Boot, Angular, PostgreSQL
Current Phase: Bootstrap

# Step 3: Start Development (Week 7+)
@orchestrator Start implementation workflow for ShopEasy
PDLC Complete: Yes
Starting Epic: E001 - User Authentication
Sprint Capacity: 10 story points
```

### Resuming an Existing Project

```bash
# Check current state
@orchestrator Show PDLC progress for ProjectX

# Resume at specific stage
@orchestrator Resume PDLC workflow at Stage 5 for ProjectX

# Or jump to implementation
@orchestrator Start implementation workflow for ProjectX
Current Epic: E003 - Reporting Features
```

---

## Troubleshooting

### "Prerequisites not met" Error
**Cause**: Trying to start Implementation or CI/CD without completing PDLC
**Solution**: Run PDLC workflow first to generate required documents

### "Agent invocation failed" Error
**Cause**: Incorrect agent subagentType or missing context
**Solution**: Check [.github/agents/](/.github/agents/) for correct subagentType

### "Quality gate blocked" Error
**Cause**: Document or code doesn't meet quality standards
**Solution**: Review standards in [.github/instructions/](/.github/instructions/)

### "Todo list out of sync" Error
**Cause**: Manual changes to workflow state
**Solution**: Run `@orchestrator Show [workflow] progress` to re-sync

---

## Related Documentation

- **Orchestrator Agent**: [.github/agents/orchestrator.agent.md](/.github/agents/orchestrator.agent.md)
- **PDLC Workflow**: [.github/workflows/documents.workflows.md](/.github/workflows/documents.workflows.md)
- **Implementation Workflow**: [.github/workflows/implementation.workflows.md](/.github/workflows/implementation.workflows.md)
- **CI/CD Workflow**: [.github/workflows/cicd.workflows.md](/.github/workflows/cicd.workflows.md)
- **All Agents**: [.github/agents/](/.github/agents/)
- **Templates**: [.github/templates/](/.github/templates/)
- **Instructions**: [.github/instructions/](/.github/instructions/)
