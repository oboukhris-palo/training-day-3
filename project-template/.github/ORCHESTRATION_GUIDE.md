# AI-Driven Workflow Orchestration Guide

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Active

---

## 🎯 Overview

This guide explains how to use the AI-driven orchestration system to manage the complete Product Development Lifecycle (PDLC) from requirements through deployment. The system coordinates specialized AI agents through three major workflows, presenting critical decisions interactively and automating routine tasks.

### What This System Does

✅ **Orchestrates** all PDLC stages from requirements to production  
✅ **Coordinates** specialized AI agents (PM, PO, BA, UX, Architect, Dev-Lead, TDD Navigator)  
✅ **Automates** document generation, code scaffolding, testing, and deployment  
✅ **Presents** 3 options with pros/cons for all critical decisions  
✅ **Enforces** quality gates and approval processes  
✅ **Maintains** traceability from requirements through implementation  
✅ **Tracks** progress with real-time todo lists  

---

## 🚀 Quick Start (5 Minutes)

### For Brand New Projects

```bash
# 1. Open GitHub Copilot Chat in VS Code
# 2. Copy and paste this command:

@orchestrator Start new PDLC workflow for MyAwesomeProject

Project Type: web-application
Project Description: [Describe your project in 1-2 sentences]
Initial Requirements: [List 3-5 key features or goals]

Orchestrate me through the complete PDLC workflow (8 stages) with:
- Step-by-step interactive guidance
- 3 options with pros/cons for all critical decisions
- Quality gates and approval processes
- Real-time progress tracking

Let's begin!
```

### For Existing Projects (Ready to Code)

```bash
# Prerequisites: requirements.md, user-stories.md, architecture-design.md exist

@orchestrator Start implementation workflow for MyAwesomeProject

Orchestrate me through development execution with:
- Epic review and user-story sequencing
- Sprint planning with velocity recommendations
- BDD-driven TDD implementation (layer-by-layer)
- Story acceptance based on BDD test results
- Code quality gates and merge approval

Let's begin!
```

### For CI/CD Setup

```bash
@orchestrator Setup CI/CD pipeline for MyAwesomeProject

Project State:
- Tech Stack: [Backend, Frontend, Database]
- Current Phase: [Bootstrap / Stabilization / Optimization]

Assess project maturity and orchestrate CI/CD setup with appropriate phase.
```

---

## 📋 The Three Core Workflows

### 1. PDLC Workflow (Documents) - Stages 1-8

**Purpose**: Transform stakeholder vision into comprehensive, approved PRD documents

**When to Use**: Starting a new project or adding major features

**Duration**: 6-8 weeks (varies by project size)

**Stages**:
1. **Requirements Gathering** (Week 1)
   - Agents: PM, PO, Architect
   - Deliverables: Project charter, requirements.md
   
2. **Analysis & Business Justification** (Week 1-2)
   - Agents: BA, PO, Architect
   - Deliverables: personas.md, business-case.md
   
3. **Design & Architecture** (Week 2-4)
   - Agents: UX, Architect, PO, BA
   - Deliverables: journey-maps.md, architecture-design.md, user-stories.md
   - **Decision Gate**: Architecture selection (3 options presented)
   
4. **Development Planning** (Week 4-5)
   - Agents: Architect, Dev-Lead, UX
   - Deliverables: tech-spec.md, code-generation.md, design-systems.md
   - **Decision Gate**: Technology stack selection (3 options presented)
   
5. **Testing Strategy** (Week 5-6)
   - Agents: BA, Dev-Lead, PO
   - Deliverables: test-strategies.md, BDD Gherkin scenarios
   
6. **Deployment & Release Planning** (Week 6)
   - Agents: PO, Architect, PM
   - Deliverables: iteration-planning.md, deployment-plan.md
   
7. **Development Execution (TDD)** (Week 7+)
   - Agents: Dev-Lead, TDD Navigator, BA, PO
   - Deliverables: Implemented features with tests
   - **Decision Gates**: Sprint scope, story acceptance
   
8. **Continuous Improvement** (Ongoing)
   - Agents: PO, Architect, PM
   - Deliverables: Updated requirements for next iteration
   - **Decision Gate**: Improvement prioritization

**Launcher**: [.github/tasks/start-pdlc.prompts.md](.github/tasks/start-pdlc.prompts.md)

---

### 2. Implementation Workflow (Development) - Phases 0-6

**Purpose**: Execute user stories through BDD-driven TDD, producing tested, production-ready code

**When to Use**: After PDLC Stages 1-6 complete, ready to start coding

**Duration**: Ongoing (2-week sprints, multiple iterations)

**Phases**:

**Phase 0: Epic Review & User Story Sequencing**
- Review epics and user-stories from user-stories.md
- Determine implementation order based on dependencies
- **Decision Gate**: Approve sequencing
- Duration: 1 day

**Phase 1: Sprint Planning**
- Analyze team velocity and capacity
- **Decision Gate**: Select sprint scope (3 options: conservative, balanced, stretch)
- Create sprint plan with GitHub Issues
- Duration: 1-2 days

**Phase 2: BDD Integration & User Story Breakdown**
- For each story: Extract Gherkin scenarios, create feature files
- Create step definitions with failing BDD tests
- Break story into 4 layers (Database → Backend → Config → Frontend)
- Duration: 1 day per story (automated)

**Phase 3: TDD Development Cycle**
- **Entry Point**: Failing BDD tests
- For each layer:
  - Run BDD tests → See which assertions fail
  - RED: Write failing unit test supporting BDD assertion
  - GREEN: Implement minimal code to pass test
  - REFACTOR: Improve code quality
- **Exit Condition**: All BDD tests pass
- Duration: 2-5 days per story (depends on complexity)

**Phase 4: BDD Testing & Validation**
- BA executes Gherkin scenarios in real environment
- Tests with actual data, full stack
- **Decision Gate**: Accept story or request fixes
- Duration: 1-2 hours per story

**Phase 5: Code Quality & Commit**
- Dev-Lead reviews code against coding.instructions.md
- Validates test coverage, security, architecture
- **Decision Gate**: Approve code merge
- Commits and marks story complete
- If all epic stories done: Mark epic "Implemented"
- Duration: 1-2 hours per story

**Phase 6: Sprint Review & Next Steps**
- Generate sprint summary
- Update epic completion status
- **Decision Gate**: Plan next sprint
- Duration: 1-2 hours

**Key Concept**: Work at **user-story level** (not epic level). Epic completion is automatic when all its stories are done.

**Launcher**: [.github/tasks/start-implementation.prompts.md](.github/tasks/start-implementation.prompts.md)

---

### 3. CI/CD Workflow (Automation) - Phases 1-3

**Purpose**: Automate build, test, and deployment with phased evolution

**When to Use**: Git repo exists, tech stack defined, at least one story implemented

**Phases**:

**Phase 1: Bootstrap** (2-3 days)
- Minimal automation for rapid development
- GitHub Actions CI (build, unit tests, code quality, security)
- Auto-deploy to development environment
- Basic monitoring (health checks, error logs)
- **Best For**: MVP, early-stage projects
- **Cost**: Low ($50-100/month)

**Phase 2: Stabilization** (1-2 weeks)
- Production-grade automation
- Staging environment + integration tests + automated BDD
- Canary deployment to production (10% → 50% → 100%)
- APM monitoring + log aggregation
- **Best For**: Pre-production, approaching launch
- **Cost**: Medium ($200-500/month)

**Phase 3: Optimization** (2-3 weeks)
- Enterprise-grade automation
- Infrastructure as Code (Terraform)
- Blue-green deployment (zero-downtime)
- Mutation testing + chaos engineering + load testing
- Full observability (Prometheus, Grafana, ELK, tracing)
- **Best For**: Production, high-traffic, mission-critical
- **Cost**: High ($1000-5000/month)

**Decision Gate**: Orchestrator assesses project and recommends phase, presents 3 options

**Launcher**: [.github/tasks/start-cicd.prompts.md](.github/tasks/start-cicd.prompts.md)

---

## 🎭 Meet Your AI Agent Team

### [Project Manager (PM)](/.github/agents/pm.agent.md) - Michael Torres
**Expertise**: Project execution, timeline management, coordination  
**Role**: Orchestrates project lifecycle, removes blockers, manages stakeholders  
**Active in**: Stage 1, 6, 8 (PDLC) | Phase 1 (Implementation)  
**Key Deliverables**: Project charter, sprint plans, status reports

### [Product Owner (PO)](/.github/agents/po.agent.md) - Priya Gupta
**Expertise**: Product strategy, requirements, feature prioritization  
**Role**: Translates stakeholder vision into actionable requirements  
**Active in**: All PDLC stages, Implementation acceptance gates  
**Key Deliverables**: All 13 PRD documents, feature acceptance decisions

### [Business Analyst (BA)](/.github/agents/ba.agent.md) - Marcus Thompson
**Expertise**: Requirements analysis, BDD scenarios, functional testing  
**Role**: Creates functional specs and validates features with BDD tests  
**Active in**: Stage 2, 5, 7 (PDLC) | Phase 4 (Implementation)  
**Key Deliverables**: personas.md, business-case.md, Gherkin scenarios, test results

### [UX Designer (UX)](/.github/agents/ux.agent.md) - Isabella Romano
**Expertise**: User experience, UI design, prototyping, Figma MCP  
**Role**: Designs intuitive, accessible interfaces and HTML maquettes  
**Active in**: Stage 3, 4 (PDLC)  
**Key Deliverables**: journey-maps.md, blueprints.md, design-systems.md, Figma components

### [Solution Architect](/.github/agents/architect.agent.md) - David Kumar
**Expertise**: System architecture, technology strategy, scalability  
**Role**: Designs system architecture and makes critical technical decisions  
**Active in**: Stage 1, 2, 3, 4, 6, 8 (PDLC) | CI/CD setup  
**Key Deliverables**: architecture-design.md, tech-spec.md, deployment-plan.md

### [Tech Lead (Dev-Lead)](/.github/agents/dev-lead.agent.md) - Catherine Wells
**Expertise**: Technical execution, BDD integration, code quality  
**Role**: Breaks down stories into layers, orchestrates TDD, validates code  
**Active in**: Stage 4, 5, 7 (PDLC) | Phase 2, 5 (Implementation)  
**Key Deliverables**: code-generation.md, test-strategies.md, feature files, code reviews

### [TDD Navigator](/.github/agents/dev-tdd.agent.md) - Alex Rivera
**Expertise**: Test-driven development, RED-GREEN-REFACTOR discipline  
**Role**: Executes TDD cycles to make failing BDD tests pass  
**Active in**: Stage 7 (PDLC) | Phase 3 (Implementation)  
**Key Deliverables**: Tested code implementations, passing unit tests

### [Workflow Orchestrator](/.github/agents/orchestrator.agent.md) - Sarah Chen
**Expertise**: Multi-agent coordination, workflow orchestration, decision facilitation  
**Role**: Master coordinator managing all workflows and agent interactions  
**Active in**: All workflows, all stages/phases  
**Key Deliverables**: Progress tracking, decision gates, workflow coordination

---

## 🎯 Decision Gates Explained

Throughout the workflows, you'll encounter decision gates where the orchestrator pauses and presents options.

### Anatomy of a Decision Gate

```
───────────────────────────────────────────────────────────────
🎯 DECISION GATE: [Gate Name]
───────────────────────────────────────────────────────────────
Context: [Brief explanation of why this decision is needed]

**Option 1: [Conservative Choice]**
Pros: [3-4 advantages]
Cons: [2-3 drawbacks]
Best for: [Use cases]
Cost/Effort: [Estimate]

**Option 2: [Balanced Choice]** ⭐ RECOMMENDED
Pros: [3-4 advantages]
Cons: [2-3 drawbacks]
Best for: [Use cases]
Cost/Effort: [Estimate]

**Option 3: [Aggressive Choice]**
Pros: [3-4 advantages]
Cons: [2-3 drawbacks]
Best for: [Use cases]
Cost/Effort: [Estimate]

Which option do you prefer? [1 / 2 / 3 / Custom]
```

### Critical Decision Gates

#### Gate 3.1: Architecture Selection (PDLC Stage 3)
**When**: After requirements.md is approved  
**Options**: Monolith, Microservices, Serverless  
**Impact**: Affects entire system design, technology stack, deployment strategy  
**Recommendation**: Start with monolith for MVP, plan microservices migration if needed

#### Gate 4.1: Technology Stack Selection (PDLC Stage 4)
**When**: Architecture design is complete  
**Options**: Various language/framework/database combinations  
**Impact**: Team learning curve, development speed, long-term maintainability  
**Recommendation**: Choose stack matching team expertise and project requirements

#### Gate 1.1: Sprint Scope Selection (Implementation Phase 1)
**When**: Starting a new sprint  
**Options**: Conservative (low points), Balanced (matched velocity), Stretch (high points)  
**Impact**: Sprint success rate, team morale, feature delivery speed  
**Recommendation**: Match team's proven velocity, buffer for unknowns

#### Gate 4.1: Story Acceptance (Implementation Phase 4)
**When**: BDD tests complete for a user-story  
**Options**: Accept, Reject, Request Changes  
**Impact**: Story progression, quality standards, technical debt  
**Recommendation**: Accept only when all BDD scenarios pass and acceptance criteria met

#### Gate 0.1: CI/CD Phase Selection (CI/CD Setup)
**When**: Setting up CI/CD pipeline  
**Options**: Bootstrap, Stabilization, Optimization  
**Impact**: Automation level, infrastructure cost, deployment safety  
**Recommendation**: Start Bootstrap, evolve to Stabilization for production

---

## 📊 Progress Tracking

The orchestrator maintains real-time progress using the `manage_todo_list` tool.

### PDLC Progress Example

```yaml
current_workflow: documents.workflows.md
current_stage: 3
stage_name: "Design & Architecture"
progress: 38% (3 of 8 stages complete)

completed:
  - stage_1: "Requirements Gathering" (approved 2025-12-20)
  - stage_2: "Analysis & Business Justification" (approved 2025-12-21)

in_progress:
  - stage_3: "Design & Architecture"
    tasks:
      - Create journey-maps.md: ✅ complete
      - Architecture decision gate: ⏳ waiting for user decision
      - Create user-stories.md: ⬜ not started

pending:
  - stage_4 through stage_8

quality_gates_passed: 4
documents_generated: 5
documents_approved: 4
```

### Implementation Progress Example

```yaml
current_workflow: implementation.workflows.md
current_sprint: 2
current_phase: 3
phase_name: "TDD Development Cycle"

epic_E001:
  name: "Authentication & User Management"
  status: "in-progress"
  progress: 67% (2 of 3 stories complete)
  stories:
    - US-001: ✅ complete (5 pts, BDD 5/5 passing, coverage 89%)
    - US-002: ✅ complete (3 pts, BDD 3/3 passing, coverage 92%)
    - US-003: 🔄 in-progress (3 pts, Layer 2 - Backend, GREEN phase)

epic_E002:
  name: "Core Business Features"
  status: "not-started"
  progress: 0% (0 of 5 stories complete)

sprint_2_summary:
  capacity: 8 points
  committed: 8 points (US-003 + US-004)
  delivered: 3 points (US-003 in progress)
  velocity: on track
```

### CI/CD Status Example

```yaml
current_workflow: cicd.workflows.md
current_phase: 1
phase_name: "Bootstrap"
setup_progress: 80%

components:
  - github_actions_ci: ✅ operational (build: 5m 50s, success rate: 95%)
  - dev_environment: ✅ deployed (URL: https://dev.example.com)
  - monitoring: ✅ configured (health checks, error logs)
  - staging_environment: ⬜ pending (Phase 2)
  - production_deployment: ⬜ pending (Phase 2)

quality_gates:
  - build_passing: ✅ yes
  - critical_vulnerabilities: ✅ none found
  - test_coverage: ⚠️ 62% (target: 80%)

next_steps:
  - Increase test coverage to 80%
  - Plan Phase 2 (Stabilization) in 4 weeks
```

You can check progress anytime:
```bash
@orchestrator Show PDLC progress for [PROJECT_NAME]
@orchestrator Show implementation progress for [PROJECT_NAME]
@orchestrator Show CI/CD pipeline status for [PROJECT_NAME]
```

---

## 🔄 Typical Project Flow

### Week 1-6: PDLC Setup
```
Week 1: Stages 1-2 (Requirements, Analysis)
├─ Invoke PM for project charter
├─ Invoke PO for requirements.md
├─ Invoke BA for personas.md and business-case.md
└─ Quality gates: Charter approval, requirements baseline

Week 2-4: Stage 3 (Design & Architecture)
├─ Invoke UX for journey-maps.md and blueprints.md
├─ Invoke Architect for architecture-design.md
├─ 🎯 Decision Gate: Choose architecture (3 options)
├─ Invoke PO for user-stories.md with epics
└─ Quality gates: UX approval, architecture approval, stories validated

Week 4-5: Stage 4 (Development Planning)
├─ Invoke Architect for tech-spec.md
├─ 🎯 Decision Gate: Choose technology stack (3 options)
├─ Invoke Dev-Lead for code-generation.md
├─ Invoke UX for design-systems.md
└─ Quality gates: Tech spec approval, design system approval

Week 5-6: Stages 5-6 (Testing + Deployment)
├─ Invoke BA for BDD Gherkin scenarios
├─ Invoke Dev-Lead for test-strategies.md
├─ Invoke PO for iteration-planning.md
├─ Invoke Architect for deployment-plan.md
└─ Quality gates: Test coverage approval, deployment readiness
```

### Week 5: CI/CD Setup (Parallel)
```
Day 1: Phase assessment and GitHub Actions setup
Day 2: Development environment deployment
Day 3: Monitoring and documentation
```

### Week 7+: Implementation Sprints
```
Sprint 1 (Week 7-8):
├─ Phase 0: Epic review, story sequencing (Day 1)
├─ Phase 1: Sprint planning, select stories (Day 1-2)
│  └─ 🎯 Decision Gate: Sprint scope (3 options)
├─ Phase 2: BDD integration, feature files (Day 2)
├─ Phase 3: TDD execution, RED-GREEN-REFACTOR (Day 2-8)
│  ├─ Story 1: US-001 (Day 2-5)
│  │  ├─ Layer 1: Database (Day 2-3)
│  │  ├─ Layer 2: Backend (Day 3-4)
│  │  ├─ Layer 3: Config (Day 4)
│  │  └─ Layer 4: Frontend (Day 5)
│  └─ Story 2: US-002 (Day 6-8)
├─ Phase 4: BDD validation (Day 5, Day 8)
│  └─ 🎯 Decision Gate: Accept stories (2 decisions)
├─ Phase 5: Code review and commit (Day 5, Day 8)
│  └─ 🎯 Decision Gate: Approve merges (2 decisions)
└─ Phase 6: Sprint review (Day 9-10)
   └─ 🎯 Decision Gate: Plan next sprint

Sprint 2 (Week 9-10): Repeat process with new stories
Sprint 3+ (Week 11+): Continue until all epics complete
```

### Week 12+: Stage 8 (Continuous Improvement)
```
Ongoing:
├─ Monitor production metrics
├─ Collect user feedback
├─ Analyze business and technical impact
├─ 🎯 Decision Gate: Prioritize improvements
├─ Refine requirements.md
└─ Return to Stage 1 for next iteration
```

---

## 💡 Best Practices

### 1. Start Simple, Evolve Complexity
- ✅ **Do**: Start with PDLC Stage 1, Bootstrap CI/CD, implement smallest story first
- ❌ **Don't**: Skip stages, over-engineer early, implement entire epics at once

### 2. Trust the Process
- ✅ **Do**: Follow sequential stages, respect quality gates, wait for approval
- ❌ **Don't**: Skip approval gates, bypass BDD validation, merge without code review

### 3. Leverage Decision Gates
- ✅ **Do**: Review all 3 options carefully, ask for clarification, choose based on context
- ❌ **Don't**: Always pick option 1, ignore recommendations, rush decisions

### 4. Maintain Traceability
- ✅ **Do**: Link stories to epics, code to stories, tests to scenarios
- ❌ **Don't**: Create code without stories, skip BDD scenarios, lose requirements context

### 5. Work at Story Level
- ✅ **Do**: Implement ONE story at a time, complete all 4 layers, pass BDD tests
- ❌ **Don't**: Work on multiple stories in parallel, skip layers, bypass BDD validation

### 6. Embrace BDD-Driven TDD
- ✅ **Do**: Start with failing BDD tests, use RED-GREEN-REFACTOR, validate progress
- ❌ **Don't**: Write code before tests, skip refactoring, ignore failing tests

### 7. Monitor Progress
- ✅ **Do**: Check todo list regularly, update status, celebrate milestones
- ❌ **Don't**: Lose track of progress, forget to mark tasks complete, ignore blockers

### 8. Communicate Continuously
- ✅ **Do**: Share progress with team, escalate blockers, ask for help
- ❌ **Don't**: Work in isolation, hide problems, skip retrospectives

---

## 🛠️ Common Scenarios

### Scenario 1: Starting a Brand New Project
```bash
# Step 1: Launch PDLC
@orchestrator Start new PDLC workflow for [PROJECT_NAME]

# Step 2: Make architecture decisions at Stage 3
# (Orchestrator presents 3 options, you choose)

# Step 3: Make technology stack decisions at Stage 4
# (Orchestrator presents 3 options, you choose)

# Step 4: Setup CI/CD (parallel with Stage 5-6)
@orchestrator Setup CI/CD pipeline for [PROJECT_NAME]

# Step 5: Start implementation at Week 7
@orchestrator Start implementation workflow for [PROJECT_NAME]

# Step 6: Sprint planning every 2 weeks
# (Orchestrator presents 3 scope options, you choose)
```

### Scenario 2: Joining an Existing Project
```bash
# Step 1: Check current state
@orchestrator Show PDLC progress for [PROJECT_NAME]
@orchestrator Show implementation progress for [PROJECT_NAME]

# Step 2: Resume where left off
@orchestrator Resume PDLC workflow at Stage [X] for [PROJECT_NAME]
# OR
@orchestrator Continue implementation at Sprint [N] for [PROJECT_NAME]

# Step 3: Follow interactive prompts
```

### Scenario 3: Adding a New Major Feature
```bash
# Step 1: Enter Stage 8 (Continuous Improvement)
@orchestrator Analyze production feedback and plan improvements for [PROJECT_NAME]

# Step 2: Prioritize improvements
# (Orchestrator presents 3 priority options, you choose)

# Step 3: Update requirements
# (Orchestrator invokes PO to refine requirements.md)

# Step 4: Return to Stage 1 with new requirements
# (Orchestrator continues through PDLC for new feature)
```

### Scenario 4: Troubleshooting a Failing Build
```bash
# Step 1: Check CI/CD status
@orchestrator Show CI/CD pipeline status for [PROJECT_NAME]

# Step 2: Get troubleshooting guidance
@orchestrator Troubleshoot failing CI/CD pipeline for [PROJECT_NAME]

# Step 3: Follow recommended fixes
# (Orchestrator analyzes logs, suggests solutions)
```

### Scenario 5: Upgrading CI/CD Phase
```bash
# Step 1: Assess readiness
@orchestrator Assess CI/CD maturity for [PROJECT_NAME]

# Step 2: Present upgrade options
# (Orchestrator presents Phase 2 or 3 options, you choose)

# Step 3: Execute upgrade
@orchestrator Upgrade from Phase [X] to Phase [Y] for [PROJECT_NAME]
```

---

## 📚 Reference Files

### Core Documentation
- **Orchestrator Agent**: [.github/agents/orchestrator.agent.md](.github/agents/orchestrator.agent.md)
- **PDLC Workflow**: [.github/workflows/documents.workflows.md](.github/workflows/documents.workflows.md)
- **Implementation Workflow**: [.github/workflows/implementation.workflows.md](.github/workflows/implementation.workflows.md)
- **CI/CD Workflow**: [.github/workflows/cicd.workflows.md](.github/workflows/cicd.workflows.md)

### Task Launchers
- **Start PDLC**: [.github/tasks/start-pdlc.prompts.md](.github/tasks/start-pdlc.prompts.md)
- **Start Implementation**: [.github/tasks/start-implementation.prompts.md](.github/tasks/start-implementation.prompts.md)
- **Start CI/CD**: [.github/tasks/start-cicd.prompts.md](.github/tasks/start-cicd.prompts.md)

### Agent Definitions
- **PM Agent**: [.github/agents/pm.agent.md](.github/agents/pm.agent.md)
- **PO Agent**: [.github/agents/po.agent.md](.github/agents/po.agent.md)
- **BA Agent**: [.github/agents/ba.agent.md](.github/agents/ba.agent.md)
- **UX Agent**: [.github/agents/ux.agent.md](.github/agents/ux.agent.md)
- **Architect Agent**: [.github/agents/architect.agent.md](.github/agents/architect.agent.md)
- **Dev-Lead Agent**: [.github/agents/dev-lead.agent.md](.github/agents/dev-lead.agent.md)
- **TDD Agents**: [.github/agents/dev-tdd*.agent.md](.github/agents/)

### Templates
- **PRD Template**: [.github/templates/prd.template.yml](.github/templates/prd.template.yml)
- **User Story Template**: [.github/templates/user-story.template.yml](.github/templates/user-story.template.yml)
- **Tech Doc Template**: [.github/templates/tech-doc.template.yml](.github/templates/tech-doc.template.yml)
- **Functional Doc Template**: [.github/templates/func-doc.template.yml](.github/templates/func-doc.template.yml)

### Standards & Instructions
- **Coding Standards**: [.github/instructions/coding.instructions.md](.github/instructions/coding.instructions.md)
- **Documentation Standards**: [.github/instructions/documentation.instructions.md](.github/instructions/documentation.instructions.md)

---

## 🎓 Learning Path

### Beginner (Week 1-2)
1. Read this orchestration guide completely
2. Review [.github/README.md](.github/README.md) for system overview
3. Understand the 3 core workflows (PDLC, Implementation, CI/CD)
4. Launch a simple test project using PDLC workflow
5. Practice making decisions at decision gates

### Intermediate (Week 3-4)
1. Deep dive into agent responsibilities ([.github/agents/](.github/agents/))
2. Study BDD-driven TDD workflow (implementation.workflows.md)
3. Launch implementation workflow for test project
4. Complete 2-3 user stories using TDD discipline
5. Setup CI/CD Phase 1 (Bootstrap)

### Advanced (Week 5+)
1. Orchestrate full project from requirements to production
2. Make architecture and technology stack decisions
3. Implement complex user stories with BDD/TDD
4. Upgrade CI/CD to Phase 2 (Stabilization)
5. Enter Stage 8 (Continuous Improvement) cycles

---

## 🚨 Troubleshooting

### "Orchestrator not found" Error
**Cause**: @orchestrator agent not recognized  
**Solution**: Ensure VS Code GitHub Copilot Chat is active and orchestrator.agent.md exists in [.github/agents/](.github/agents/)

### "Prerequisites not met" Error
**Cause**: Trying to skip workflow stages  
**Solution**: Complete required prior stages, generate missing documents

### "Agent invocation failed" Error
**Cause**: Incorrect subagentType or missing context  
**Solution**: Check agent definitions for correct subagentType, ensure context documents exist

### "Quality gate blocked" Error
**Cause**: Document/code doesn't meet standards  
**Solution**: Review standards in [.github/instructions/](.github/instructions/), address issues, resubmit

### "BDD tests failing" Error
**Cause**: Implementation doesn't meet acceptance criteria  
**Solution**: Return to TDD cycle (RED-GREEN-REFACTOR), fix implementation, re-run BDD tests

### "Todo list out of sync" Error
**Cause**: Manual changes to workflow state  
**Solution**: Run `@orchestrator Show [workflow] progress` to refresh state

---

## 🎉 Success Stories

### Example: E-commerce Platform (8 weeks, 3 developers)
- **Week 1-6**: PDLC complete (all 13 documents generated)
- **Week 5**: CI/CD Phase 1 setup (3 days)
- **Week 7-8**: Sprint 1 (Authentication epic, 3 stories, 11 points)
- **Week 9-10**: Sprint 2 (Product catalog epic, 5 stories, 21 points)
- **Week 11-12**: Sprint 3 (Shopping cart epic, 4 stories, 17 points)
- **Week 12**: Upgrade to CI/CD Phase 2, production launch
- **Result**: MVP launched on time, 87% test coverage, zero critical bugs

### Example: SaaS Dashboard (12 weeks, 5 developers)
- **Week 1-6**: PDLC complete with microservices architecture
- **Week 6**: CI/CD Phase 2 setup (Kubernetes + canary deployment)
- **Week 7-12**: 6 sprints, 12 epics, 47 user stories implemented
- **Week 12**: Stage 8 feedback → plan next iteration
- **Result**: Production-ready platform, 92% test coverage, 99.9% uptime

---

## 📞 Getting Help

**Check Progress**: `@orchestrator Show [workflow] progress`  
**Get Next Steps**: `@orchestrator What should I do next for [PROJECT_NAME]`  
**Review Decisions**: `@orchestrator Show decision history for [PROJECT_NAME]`  
**Resume Work**: `@orchestrator Resume [workflow] for [PROJECT_NAME]`  
**Troubleshoot**: `@orchestrator Troubleshoot [issue] for [PROJECT_NAME]`  

**Documentation**:
- Main README: [.github/README.md](.github/README.md)
- Workflow Details: [.github/workflows/](.github/workflows/)
- Agent Profiles: [.github/agents/](.github/agents/)
- Task Launchers: [.github/tasks/](.github/tasks/)

---

**Last Updated**: December 22, 2025  
**Maintained By**: AI Engineering Team  
**Version**: 1.0.0
