# Framework Usage Guide: Adapting to Your Project

**⚡ CRITICAL**: This `.github/` folder is a **reusable, template-based framework**—not tied to any specific project. Use it as the foundation for ANY project.

---

## 🎯 What This Framework Does

| Scenario | Use This Framework |
|----------|-------------------|
| 🆕 New project with stakeholder discovery | ✅ YES |
| 🔄 Brownfield retro-documentation | ✅ YES |
| 📋 Create PDLC documents (requirements, specs) | ✅ YES |
| 🤖 Orchestrate AI agents for development | ✅ YES |
| ✅ Execute BDD-driven TDD workflows | ✅ YES |
| 🚀 Scale from 1 team to enterprise | ✅ YES |

---

## 🔄 Copy → Adapt → Use Workflow

### Step 1: Copy Framework
```bash
# Copy this folder into your target project
cp -r project-template/.github your-project/.github
```

### Step 2: Replace Example Identifiers with Your Context

#### Identifier Substitution Template

| Example (Framework) | Your Project | Files to Update |
|-------------------|-------------|-----------------|
| `AUTH-003` | `YOUR-PREFIX-###` | docs/prd/user-stories.md |
| `US-001` | `YOUR-PREFIX-###` | All docs/ references |
| `features/auth/` | `features/your-domain/` | Feature file paths |
| `/api/auth/register` | `/api/your-endpoint/` | API specs, implementation |
| `UserService` | `YourDomainService` | Implementation code |

**Example: Payment Processor Project**
```
AUTH-003 → PAYMENT-001, PAYMENT-002, BILLING-003
features/auth/ → features/payment/, features/billing/
POST /api/auth/register → POST /api/payments/subscribe
UserTierSync → PaymentProcessing
```

### Step 3: Initialize Orchestrator
```bash
@orchestrator Assess project status for [YOUR_PROJECT_NAME]
```

The orchestrator will:
1. Detect your project's state (new, brownfield, mid-development)
2. Ask clarifying questions about scope, tech stack, team
3. Recommend next workflow (PDLC Stage 1, Implementation Phase 1, etc.)
4. Hand off to appropriate agent (PM, Dev-Lead, etc.)

---

## 📚 Framework Components (All Reusable)

### `.github/agents/` (11 AI Agents)
All agents work with ANY project context:
- ✅ **orchestrator.agent.md** - Coordinates workflows
- ✅ **pm.agent.md** - Project management
- ✅ **po.agent.md** - Product ownership with question-driven decisions
- ✅ **ba.agent.md** - Business analysis & enrichment
- ✅ **ux.agent.md** - UX/design
- ✅ **architect.agent.md** - Architecture + OpenAPI specs
- ✅ **dev-lead.agent.md** - Technical leadership + folder setup
- ✅ **dev-tdd.agent.md** - TDD orchestration
- ✅ **dev-tdd-red/green/refactor.agent.md** - TDD phases

**These agents adapt to YOUR project automatically—no modifications needed.**

### `.github/workflows/` (3 Workflows)
- ✅ **documents.workflows.md** - PDLC 8 stages (reusable)
- ✅ **implementation.workflows.md** - 6 phases (reusable)
- ✅ **cicd.workflows.md** - CI/CD pipeline (reusable)

**No modifications needed—workflows are domain-agnostic.**

### `.github/templates/` (Document Templates)
- ✅ **handoff.template.json** - Agent handoff format (reusable)
- ✅ **user-story.template.yml** - Story structure (reusable)
- ✅ **user-story-handoff.template.md** - TDD cycle snapshot (reusable)
- ✅ **tdd-execution.template.md** - Audit log (reusable)
- ✅ **user-story-folder.template.md** - Folder structure (reusable)
- ✅ **api-specification.template.md** - OpenAPI guide (reusable)

**Templates stay exactly as-is. Agents populate them with YOUR content.**

### `.github/tasks/` (Workflow Launchers)
- ✅ **start-pdlc.prompts.md** - Launch PDLC workflow
- ✅ **start-implementation.prompts.md** - Launch implementation
- ✅ **plan-us.prompts.md** - Plan individual stories

**Copy prompt, fill [YOUR_PROJECT_NAME], paste to @orchestrator.**

---

## 🚀 Usage Patterns by Project Type

### Pattern 1: New Project (Greenfield)
```
1. Copy .github/ into project
2. Run: @orchestrator Start PDLC for [PROJECT_NAME]
3. Answer stakeholder questions (PO, BA agents guide you)
4. Generate PDLC docs (requirements, personas, architecture, etc.)
5. When Stage 1-6 complete, start Implementation Phase 1
6. Hand off to Dev-Lead for sprint planning
7. Execute TDD cycles with BDD-driven tests
```

### Pattern 2: Brownfield Project (Retro-Documentation)
```
1. Copy .github/ into project
2. Run: @orchestrator Retro-document [PROJECT_NAME] for brownfield
3. BA agent scans code, extracts existing specs
4. Reconstruct requirements, architecture, design decisions
5. Create user stories with BDD scenarios
6. Validate with stakeholders
7. Begin Implementation Phase 1 for next features
```

### Pattern 3: Mid-Development Project
```
1. Copy .github/ into project
2. Run: @orchestrator Assess project status for [PROJECT_NAME]
3. Orchestrator detects current state (PDLC Stage X, Implementation Phase Y)
4. Recommends next milestone
5. Hand off to appropriate agent (Architect, Dev-Lead, etc.)
6. Continue orchestrated workflow
```

---

## 📋 What You Customize (Project-Specific)

### 1. User Story Identifiers
**Framework uses**: AUTH-003, US-001, PAYMENT-001  
**You adopt**: YOUR_PREFIX-001, YOUR_PREFIX-002, etc.

Where they appear:
- `/docs/prd/user-stories.md` - Define your stories with YOUR IDs
- `/docs/user-stories/<YOUR_ID>/` - Create folders per YOUR ID
- Git commits: `TDD-YOUR_ID-RED-1:` format
- BDD scenarios: Reference YOUR stories

### 2. Feature Domains
**Framework uses**: `features/auth/`, `features/payment/`, `features/billing/`  
**You adopt**: `features/your_domain/` matching YOUR business logic

Where they appear:
- `features/your-domain/*.feature` - BDD scenario files
- `src/controllers/YourDomainController.ts` - Implementation
- OpenAPI paths: `/api/your-endpoint/` - API contracts

### 3. Technology Stack
**Framework is agnostic** to:
- Database (PostgreSQL, MySQL, MongoDB, DynamoDB)
- Backend (Node.js, Python, Go, Java)
- Frontend (React, Vue, Angular, Svelte)
- Testing (Jest, Mocha, Pytest, JUnit)

Agents adapt to YOUR tech choices automatically during Architecture stage.

### 4. OpenAPI Specification
**Framework provides**: Complete OpenAPI template  
**You populate**: Your actual endpoints, schemas, auth methods

File: `/api/openapi.yaml`
- Architect generates during PDLC Stage 4
- Dev-Lead references during Implementation Phase 2
- Frontend team uses for SDK generation
- Becomes source of truth for API contracts

---

## ✅ What Never Changes (Framework Rules)

**These patterns are SACRED—don't modify:**

1. **Handoff Format** (JSON schema)
   - One agent to next always uses standard handoff
   - No exceptions, no custom formats

2. **TDD Sequencing** (RED → GREEN → REFACTOR)
   - Strict blocking between phases
   - No parallel cycles
   - No skipping phases

3. **Document Consolidation**
   - 1 handoff.md per story (overwrite each phase)
   - 1 tdd-execution.md per story (append-only)
   - NO cycle-specific files (no cycle-18-handoff.md)

4. **Agent Handoff Chain**
   - Orchestrator → PM → PO → BA → UX → Architect → Dev-Lead → TDD
   - No skipping agents
   - No parallel agent work on same story

5. **BDD-Driven TDD**
   - BDD scenarios are entry point (failing tests)
   - TDD cycles make BDD pass
   - Not unit tests; not acceptance tests; both together

6. **Quality Gates**
   - Decision gates at critical points
   - Always 3 options presented
   - User chooses (agent doesn't decide)

---

## 🎓 Learning Path for Your Team

### For Project Managers
1. Read: `.github/agents/pm.agent.md`
2. Read: `.github/workflows/documents.workflows.md` (Stages 1-2)
3. Ask orchestrator to "Start PDLC for [PROJECT]"
4. Follow along as PM agent gathers requirements

### For Product Owners
1. Read: `.github/agents/po.agent.md` (especially question-driven decisions)
2. Prepare: Stakeholder contact list, high-level vision
3. Ask orchestrator to "Start PDLC Stage 2" (requirements phase)
4. Guide decisions using tradeoff matrices

### For Architects
1. Read: `.github/templates/api-specification.template.md`
2. Read: `.github/agents/architect.agent.md`
3. When Stage 3 starts, architect generates `/api/openapi.yaml`
4. Review: Endpoints, schemas, auth, rate limits

### For Developers
1. Read: `.github/workflows/implementation.workflows.md` (Phases 1-6)
2. Read: `.github/templates/user-story-folder.template.md`
3. Read: `.github/templates/tdd-execution.template.md`
4. When Phase 4 starts (TDD), look at implementation-plan.md
5. Follow TDD agents: RED → GREEN → REFACTOR

### For QA / Testers
1. Read: `features/*.feature` (BDD scenarios)
2. Read: `.github/agents/dev-tdd.agent.md` (BDD mapping)
3. Validation: All BDD scenarios passing = story complete
4. Reporting: Reference tdd-execution.md for test history

---

## 🔍 Validation Checklist (Before Starting)

```
□ Copied .github/ into project
□ Updated user-story identifiers in agent prompts
□ Updated feature domains in templates
□ Identified technology stack (database, backend, frontend)
□ Identified team structure (PM, PO, DEV, QA)
□ Prepared stakeholder list (business sponsor, PM, tech lead)
□ Ready to answer discovery questions (scope, timeline, budget)

When all boxes checked:
@orchestrator Assess project status for [YOUR_PROJECT_NAME]
```

---

## 📞 Common Questions

**Q: Can I modify the TDD sequencing to run RED and GREEN in parallel?**  
**A**: No. Strict RED → GREEN → REFACTOR sequencing is non-negotiable. Parallel work creates conflicts and duplicate code.

**Q: Do I have to use all 11 agents?**  
**A**: For full PDLC, yes. You can skip agents for brownfield projects (no UX agent if redesigning existing UI, no PM if team exists).

**Q: Can I change the handoff format to JSON instead of Markdown?**  
**A**: No. Handoffs must follow the standard format. Mix of JSON schema validation + Markdown readability is intentional.

**Q: What if my project doesn't fit the 4-layer architecture (Database → Backend → Config → Frontend)?**  
**A**: Architect adapts layers during PDLC Stage 3. Layers can be reordered, combined, or expanded per your architecture.

**Q: Can I skip PDLC and start straight to Implementation?**  
**A**: Not recommended. PDLC Stages 1-6 are prerequisites for sanity. You can compress brownfield (Stages 4-5 focus on existing code).

---

## 🎯 Bottom Line

**This framework is:**
- ✅ **Template-based** (copy, don't fork)
- ✅ **Context-agnostic** (works for any project)
- ✅ **Agent-orchestrated** (humans make decisions, agents execute)
- ✅ **Pattern-locked** (TDD, handoffs, sequencing are fixed)
- ✅ **Scalable** (1 story or 100 stories, same process)

**Your job:**
1. Copy the framework
2. Adapt project context (replace example IDs)
3. Invoke orchestrator
4. Answer questions when asked
5. Decisions made through quality gates
6. Framework handles the rest

**Result**: Structured, traceable, auditable product development with full AI orchestration at scale.
