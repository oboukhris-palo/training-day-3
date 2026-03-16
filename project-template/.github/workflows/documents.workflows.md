# Product Development Lifecycle (PDLC) Document Workflows - Adaptive Client Framework

## Overview
**Adaptive workflow for generating PRD documents based on actual client inputs and organizational maturity.** This workflow intelligently routes based on available materials in `/docs/inputs/` - from perfect documentation to sparse epics to mixed legacy sources.

**Input-Driven Approach**: Scans `/docs/inputs/` → Assesses client maturity → Routes to appropriate documentation strategy → Generates comprehensive PRD suite

**Agents**: PM (coordination) | PO (product definition) | BA (requirements/BDD) | UX (design) | Architect (architecture) | Dev-Lead (implementation) | TDD Navigator (development)

**Templates**: prd.template.yml (13 docs) | user-story.template.yml | func-doc.template.yml | tech-doc.template.yml

**Supported Input Scenarios**: Perfect docs | Jira/ADO epics | Architecture diagrams | Sparse documentation | Mixed legacy sources | Interview-based discovery

---

## Input Assessment & Routing Framework

**CRITICAL: Always start here** - Assess available client inputs before proceeding to PRD generation.

### Phase 0: Client Input Discovery & Maturity Assessment

**Objective:** Scan `/docs/inputs/` to determine available materials and appropriate documentation strategy

**Duration:** 1-2 days  
**Agents:** PM (assessment coordination), PO (business context), Architect (technical assessment)

#### Step 0.1: Input Inventory & Classification

**Scan `/docs/inputs/` structure:**

```
/docs/inputs/
├── documentation/          # Existing docs (Confluence, Wiki, PDFs)
├── project-management/     # Jira exports, ADO items, GitHub issues
├── architecture/           # Architecture diagrams, ADRs, design docs
├── codebase/              # Code repos, README files, API specs
├── interviews/            # Stakeholder interviews, retex, surveys
├── design/                # Figma exports, Miro boards, wireframes
└── operations/            # Metrics, KPIs, monitoring dashboards
```

**PM (`pm-input-assessment`)** → Catalog available inputs by category:

| Input Category | Available | Quality | Coverage | Last Updated | Strategy Impact |
|---------------|-----------|---------|----------|--------------|----------------|
| **Requirements Docs** | ✓/✗ | High/Med/Low | 0-100% | Date | Strategy selection |
| **User Stories/Epics** | ✓/✗ | High/Med/Low | 0-100% | Date | Extraction workflow |  
| **Architecture Docs** | ✓/✗ | High/Med/Low | 0-100% | Date | Technical baseline |
| **Design Artifacts** | ✓/✗ | High/Med/Low | 0-100% | Date | UX workflow impact |
| **Business Context** | ✓/✗ | High/Med/Low | 0-100% | Date | Interview needs |
| **Technical Specs** | ✓/✗ | High/Med/Low | 0-100% | Date | Architecture work |

**Output:** `INPUT-ASSESSMENT-REPORT.md` with maturity scoring

#### Step 0.2: Client Maturity Classification

**Maturity Levels & Routing:**

**🟢 TIER 1: Documentation-Rich Client**
- **Criteria:** Comprehensive requirements docs, clear user stories, recent architecture diagrams
- **Route:** Traditional PDLC workflow (Stages 1-7) with minor validation
- **Timeline:** 15-25 days
- **Example:** Enterprise with strong BA team, established SDLC

**🟡 TIER 2: Partial Documentation Client** 
- **Criteria:** Some docs exist but gaps/outdated, mixed quality epics, partial architecture
- **Route:** Hybrid approach - use available docs + targeted extraction + focused interviews
- **Timeline:** 20-35 days  
- **Example:** Mid-size company with some process maturity

**🔴 TIER 3: Sparse Documentation Client**
- **Criteria:** Minimal docs, only epics/stories in project tools, tribal knowledge
- **Route:** Extraction-heavy workflow + comprehensive interview program
- **Timeline:** 25-40 days
- **Example:** Startup, legacy system with poor documentation

**⚫ TIER 4: Legacy/Discovery Client**
- **Criteria:** No formal docs, basic epics, legacy codebase only
- **Route:** Reverse engineering + extensive stakeholder interviews + code analysis
- **Timeline:** 30-50 days
- **Example:** Legacy modernization, brownfield with lost documentation

**PO (`po-maturity-assessment`)** → Classify client tier and business context
**Architect (`architect-input-analysis`)** → Assess technical documentation quality

**Output:** Client maturity classification + recommended routing strategy

#### Step 0.3: Strategy Selection & Routing

**Decision Matrix:**

| Client Tier | Documentation Strategy | Primary Workflow | Extraction Needs | Interview Priority |
|-------------|------------------------|------------------|------------------|-------------------|
| **Tier 1** | Traditional PDLC | Stages 1-7 direct | Minimal | Validation only |
| **Tier 2** | Hybrid Approach | Modified stages + extraction | Moderate | Targeted gaps |
| **Tier 3** | Extraction-First | Epic mining + interviews | Heavy | Comprehensive |
| **Tier 4** | Discovery-Heavy | Reverse engineering + interviews | Maximum | Critical priority |

**Routing Outcomes:**
- **Route A:** Traditional PDLC → Jump to Stage 1 (high-confidence inputs)
- **Route B:** Functional Extraction → Epic/Story mining by business domains
- **Route C:** Interview-Driven → Comprehensive stakeholder discovery
- **Route D:** Hybrid Assembly → Mixed approach with multiple input sources

**Output:** Selected route + customized workflow plan

---

## Route B: Functional Extraction Workflow (Tier 2-3 Clients)

**When to Use:** Client has Jira/ADO epics, user stories, or mixed documentation but lacks comprehensive PRD structure

**Approach:** Functional theme-based extraction organizing epics by business domains rather than technical layers

**Duration:** 20-35 days (varies by epic volume and quality)

### Phase B.1: Epic/Story Discovery & Categorization

**Objective:** Extract and organize epics/stories by functional business domains

**Agents:** BA (extraction), PO (business logic), PM (coordination)

#### Step B.1.1: Source Material Extraction

**BA (`ba-source-extraction`)** → Process available project management exports:
- Jira epic CSV exports → Extract descriptions, acceptance criteria, story points
- Azure DevOps work items → Parse features, user stories, tasks
- GitHub issues/discussions → Filter enhancement requests, feature proposals
- Legacy documentation → Mine requirements from technical specs

**Input Processing:**
```
/docs/inputs/project-management/
├── jira-epics-export.csv          # Epic summaries, descriptions, story points
├── azure-devops-features.json     # ADO features and user stories
├── github-issues-export.json      # GitHub issues labeled as features
└── legacy-requirements/           # Old PDF/Word documents
```

**Output:** `RAW-REQUIREMENTS-INVENTORY.md` with source traceability

#### Step B.1.2: Business Domain Identification

**PO (`po-business-domain-analysis`)** → Identify functional themes in the extracted content:

**Example Domain Classifications** (adapt per client):
- **User Management** - Authentication, roles, permissions, profiles
- **Core Business Logic** - Primary product functionality, workflows
- **Data Management** - CRUD operations, imports, exports, reporting
- **Integration & APIs** - Third-party connections, data sync, webhooks
- **Analytics & Reporting** - Dashboards, KPIs, business intelligence
- **Operations & Admin** - System config, maintenance, monitoring
- **Billing & Commerce** - Payment processing, subscriptions, invoicing
- **Compliance & Security** - Audit trails, data protection, regulations

**Adaptive Approach:** If client domain is specialized (e.g., Healthcare, FinTech):
- Extract domain-specific themes from content
- Map to industry-standard functional areas
- Validate with stakeholder interviews

**BA (`ba-theme-categorization`)** → Organize epics/stories by functional themes:

| Theme | Epic Count | Story Count | Confidence | Coverage |
|-------|------------|-------------|------------|----------|
| User Management | 5 | 23 | High | 85% |
| Core Business Logic | 12 | 67 | Medium | 60% |
| Data Management | 8 | 31 | High | 90% |
| Integration & APIs | 6 | 19 | Low | 40% |

**Output:** `FUNCTIONAL-THEMES-MATRIX.md` with epic-to-theme mappings

#### Step B.1.3: Narrative Transformation & Business Context Extraction

**Critical for client-agnostic approach:** Transform technical jira descriptions into business narratives

**BA (`ba-narrative-transformation`)** → Clean and transform epic descriptions:

**Transformation Rules:**
1. **Strip Jira Markup:** Remove {quote}, +text+, [links], {panel}, h3., formatting
2. **Extract Structured Sections:**
   - "Current situation" → Baseline state
   - "Pain points" → Problems being solved
   - "Opportunity" → Business value to capture
   - "Proposed solution" → Approach
   - "Scope" / "In scope" → Feature boundaries
   - "Out of scope" → Excluded items
3. **Generate Business Narratives:** Convert to coherent paragraphs explaining WHY each feature matters

**Example Transformation:**
```
❌ Raw Jira: "+Current situation:+ {quote}Users can't see roles{quote} h3.Pain points: No role visibility"

✅ Business Narrative: "This epic enhances user administration by enabling role visibility and management. Currently, administrators must rely on external documentation to understand user permissions, creating operational overhead and security risks. The opportunity is to provide transparent role management that reduces administrative burden and improves security compliance."
```

**PO (`po-business-context-validation`)** → Validate business narratives align with strategic objectives

**Output:** `THEME-NARRATIVES.md` with cleaned business context per theme

### Phase B.2: Theme-Based PRD Generation

**Objective:** Generate comprehensive PRD documents organized by functional themes

**Agents:** PO (requirements synthesis), BA (acceptance criteria), UX (journey mapping where possible)

#### Step B.2.1: Generate Theme-Specific PRDs

**For each functional theme, PO (`po-theme-prd-generation`):**

**Create:** `/docs/prd/themes/{{theme-name}}.md`

**Structure per theme:**
```markdown
# {{Theme Name}} - Product Requirements

## Executive Summary
{{Business narrative synthesized from epics in this theme}}

## Business Context & Objectives
{{WHY this theme matters to the business}}

## Functional Requirements
{{Extracted from epic descriptions and acceptance criteria}}

## User Stories & Acceptance Criteria  
{{Organized by epic, cleaned and structured}}

## Success Metrics
{{KPIs and measurable outcomes for this theme}}

## Dependencies & Integration Points
{{Cross-theme dependencies and external systems}}

## Assumptions & Constraints
{{Technical and business limitations}}
```

**BA (`ba-acceptance-criteria-extraction`)** → Extract and formalize acceptance criteria from epic descriptions

**Output:** Individual theme PRDs (typically 5-12 themes per client)

#### Step B.2.2: Cross-Theme Integration Analysis

**Architect (`architect-cross-theme-integration`)** → Identify dependencies and integration points between themes

**Integration Matrix:**
| Theme A | Theme B | Integration Type | Complexity | Priority |
|---------|---------|------------------|------------|----------|
| User Management | Core Business Logic | Authentication flow | Medium | High |
| Data Management | Analytics | Data pipeline | High | Medium |
| Integration APIs | All themes | Data synchronization | High | Critical |

**Output:** `CROSS-THEME-INTEGRATION.md` with dependency mapping

### Phase B.3: PRD Consolidation & Gap Filling

**Objective:** Merge theme PRDs into comprehensive master requirements document

**Agents:** PO (consolidation), PM (gap analysis), BA (validation)

#### Step B.3.1: Master Requirements Assembly

**PO (`po-master-prd-assembly`)** → Consolidate theme PRDs into master document:

**Create:** `/docs/prd/requirements.md`

**Master Structure:**
1. **Executive Summary** - Overall product vision and strategy
2. **Business Context** - Market opportunity, user needs, business case  
3. **Product Overview** - High-level capabilities and value proposition
4. **Functional Requirements by Theme** - Organized domain sections
5. **Cross-Cutting Concerns** - Security, performance, scalability, compliance
6. **Success Metrics** - North star metrics and KPI dashboard
7. **Implementation Roadmap** - Phased delivery approach
8. **Assumptions & Dependencies** - Risks and external dependencies

**BA (`ba-requirements-validation`)** → Cross-validate requirements for completeness and consistency

**Output:** Comprehensive master PRD document

#### Step B.3.2: Gap Analysis & Interview Planning

**PM (`pm-gap-analysis`)** → Identify areas requiring stakeholder interviews:

**Common Gaps in Extracted Content:**
- Business strategy and market positioning
- User personas and journey context  
- Non-functional requirements (performance, security, compliance)
- Integration architecture and API contracts
- Success metrics and KPIs
- Regulatory and compliance requirements

**Interview Planning:**
- **Executive Sponsor** - Strategy, vision, success metrics
- **Product Leadership** - User needs, market fit, prioritization  
- **Engineering Leadership** - Technical constraints, architecture, NFRs
- **Operations** - Support, monitoring, operational requirements
- **Compliance/Security** - Regulatory requirements, security posture

**Output:** `GAP-ANALYSIS.md` + `STAKEHOLDER-INTERVIEW-PLAN.md`

#### Step B.3.3: Targeted Interview Execution

**PO (`po-targeted-interviews`)** → Execute focused interviews to fill identified gaps

**Interview Focus Areas:**
1. **Strategy & Vision** (Executive) - Market opportunity, competitive landscape, success metrics
2. **User Experience** (Product) - User personas, pain points, journey maps
3. **Technical Architecture** (Engineering) - Non-functional requirements, integration patterns
4. **Operational Requirements** (Operations) - Monitoring, support, maintenance
5. **Compliance & Security** (Governance) - Regulatory requirements, data protection

**BA (`ba-interview-synthesis`)** → Synthesize interview findings into PRD updates

**Output:** Enhanced PRD documents with stakeholder-validated content

### Route B Results & Handoff

**Deliverables:**
- `requirements.md` - Master PRD with functional themes
- `themes/` folder - Individual theme PRDs  
- `FUNCTIONAL-THEMES-MATRIX.md` - Epic-to-theme mappings
- `CROSS-THEME-INTEGRATION.md` - Integration dependencies
- `GAP-ANALYSIS.md` - Identified gaps and interview results

**Quality Gates:**
✅ All functional themes documented with business context  
✅ Epic content transformed into business narratives  
✅ Cross-theme dependencies identified  
✅ Stakeholder gaps filled through targeted interviews  
✅ Requirements traceable to source epics/stories

**Handoff to Implementation:** Route to Stage 7 (skip stages 2-6) OR continue to missing stages if needed

---

## Route C: Interview-Driven Workflow (Tier 3-4 Clients)

**When to Use:** Client has minimal documentation, requires comprehensive stakeholder discovery

**Duration:** 30-50 days  

### Phase C.1: Comprehensive Stakeholder Discovery

**Objective:** Extract product requirements through structured interview program

**Agents:** PO (interview lead), BA (synthesis), PM (coordination)

#### Step C.1.1: Stakeholder Mapping & Interview Strategy

**PM (`pm-stakeholder-mapping`)** → Identify all key stakeholders across business functions:

**Executive Tier:**
- C-level sponsor, VP Product, VP Engineering
- Business unit leaders, P&L owners

**Domain Expert Tier:**  
- Product managers, business analysts
- Subject matter experts, power users

**Technical Tier:**
- Engineering managers, tech leads, architects
- DevOps, security, compliance officers

**Operational Tier:**
- Customer support, operations managers
- Sales, marketing (if B2B product)

**User Representative Tier:**
- End users, customer proxies
- UX researchers (if available)

**Interview Strategy Matrix:**
| Stakeholder Tier | Interview Type | Duration | Focus Areas | Expected Outcomes |
|------------------|----------------|----------|-------------|-------------------|
| Executive | Strategic | 60 min | Vision, success metrics, constraints | Product strategy, business case |
| Domain Expert | Functional | 90 min | Requirements, user needs, workflows | Detailed requirements, user stories |
| Technical | Solution-focused | 90 min | Architecture, NFRs, integration | Technical constraints, system design |
| Operational | Process-focused | 60 min | Support, monitoring, maintenance | Operational requirements, SLAs |
| User Representative | User-centered | 90 min | Pain points, workflows, goals | User personas, journey maps |

**Output:** `STAKEHOLDER-INTERVIEW-STRATEGY.md` with interview schedule

#### Step C.1.2: Interview Execution & Documentation

**PO (`po-stakeholder-interviews`)** → Execute structured interviews using templates:

**Interview Templates by Stakeholder Type:**

**Executive Interview Template:**
1. **Product Vision** (15 min)
   - What problem does this product solve?
   - What's the market opportunity?
   - How does this align with business strategy?

2. **Success Metrics** (15 min) 
   - How will we measure success?
   - What are the key business outcomes?
   - Timeline expectations and milestones?

3. **Constraints & Priorities** (15 min)
   - Budget and timeline constraints?
   - What are the must-have vs nice-to-have features?
   - Competitive pressures or market timing?

4. **Strategic Context** (15 min)
   - How does this fit into broader product portfolio?
   - Organizational capabilities and limitations?
   - Risk tolerance and compliance requirements?

**Domain Expert Interview Template:**
1. **Current State Assessment** (20 min)
   - Walk through current user workflows
   - What are the biggest pain points?
   - What workarounds do users employ?

2. **Detailed Requirements** (40 min) 
   - What specific features are needed?
   - User roles and permission requirements?
   - Data requirements and business logic?

3. **Success Scenarios** (20 min)
   - What would the ideal solution look like?
   - User acceptance criteria?
   - Edge cases and error handling?

4. **Integration & Dependencies** (10 min)
   - What systems need to integrate?
   - Data sources and external dependencies?

**Technical Interview Template:**
1. **Current Architecture** (20 min)
   - Existing system architecture and tech stack?
   - Performance and scalability challenges?
   - Technical debt and modernization needs?

2. **Non-Functional Requirements** (30 min)
   - Performance requirements (throughput, latency)?
   - Security and compliance requirements?
   - Availability and disaster recovery needs?

3. **Integration Architecture** (30 min)
   - API requirements and integration patterns?
   - Data synchronization and consistency needs?
   - Third-party system dependencies?

4. **Development Constraints** (10 min)
   - Technology preferences or limitations?
   - Development team capabilities?
   - Operational and deployment constraints?

**BA (`ba-interview-documentation`)** → Document each interview with standardized format:

**Interview Report Template:**
```markdown
# Interview Report: {{Stakeholder Name}} - {{Date}}

## Stakeholder Profile
- **Name:** {{Name}}
- **Role:** {{Title and Function}}
- **Tier:** {{Executive/Domain/Technical/Operational/User}}
- **Interview Duration:** {{Minutes}}

## Key Insights Summary
{{3-5 bullet points of most important findings}}

## Detailed Notes
### {{Topic 1}}
{{Verbatim quotes and detailed context}}

### {{Topic 2}}  
{{Verbatim quotes and detailed context}}

## Requirements Extracted
{{Specific functional and non-functional requirements identified}}

## Pain Points Identified
{{Current state problems and frustrations}}

## Success Criteria Mentioned
{{Stakeholder's definition of successful solution}}

## Follow-up Actions
{{Additional interviews needed, clarifications required}}
```

**Output:** Individual interview reports for each stakeholder

#### Step C.1.3: Cross-Interview Synthesis & Requirements Extraction

**BA (`ba-cross-interview-synthesis`)** → Synthesize findings across all interviews:

**Synthesis Dimensions:**
1. **Functional Requirements Consolidation**
   - Common requirements mentioned by multiple stakeholders
   - Conflicting requirements requiring resolution
   - Unique requirements from single stakeholders

2. **User Persona Extraction**
   - User roles and responsibilities identified
   - User goals and motivations
   - User pain points and workflow challenges

3. **Business Context Integration**  
   - Strategic drivers and business objectives
   - Market context and competitive pressures
   - Success metrics and KPI alignment

4. **Technical Context Assembly**
   - Architecture constraints and opportunities
   - Integration requirements and dependencies
   - Non-functional requirements consolidation

**PO (`po-requirements-prioritization`)** → Prioritize and resolve conflicting requirements:

**Conflict Resolution Process:**
1. **Identify Conflicts** - Requirements that contradict each other
2. **Stakeholder Impact Analysis** - Who is affected by each option
3. **Business Value Assessment** - ROI and strategic alignment
4. **Technical Feasibility** - Implementation complexity and risk
5. **Resolution Workshop** - Facilitated session with key stakeholders
6. **Decision Documentation** - Rationale and tradeoffs captured

**Output:** `INTERVIEW-SYNTHESIS.md` with consolidated requirements and resolved conflicts

### Phase C.2: PRD Assembly from Interview Data

**Objective:** Transform interview findings into structured PRD documents

**Agents:** PO (assembly), BA (validation), UX (user experience synthesis)

#### Step C.2.1: User Persona Development

**UX (`ux-persona-synthesis`)** → Create user personas from interview data:

**Persona Development Process:**
1. **Cluster User Types** - Group similar roles and behaviors
2. **Extract Goals & Motivations** - What drives each user type
3. **Document Pain Points** - Current frustrations and blockers
4. **Define Success Scenarios** - What good looks like for each persona
5. **Create Persona Profiles** - Detailed persona documents

**Create:** `/docs/prd/personas.md`

**Output:** Comprehensive user personas with interview evidence

#### Step C.2.2: Requirements Assembly & Documentation

**PO (`po-requirements-assembly`)** → Transform synthesized requirements into PRD structure:

**Create:** `/docs/prd/requirements.md`

**Assembly Process:**
1. **Executive Summary** - Strategic context from executive interviews
2. **Business Context** - Market opportunity and business case
3. **User Needs & Personas** - User research synthesis
4. **Functional Requirements** - Feature requirements by user journey
5. **Non-Functional Requirements** - Technical requirements from engineering interviews
6. **Success Metrics** - KPIs and measurement approach from stakeholder input
7. **Implementation Considerations** - Technical constraints and integration needs

**BA (`ba-requirements-validation`)** → Cross-validate requirements against interview sources

**Validation Checklist:**
✅ Each requirement traceable to stakeholder interview  
✅ Conflicting requirements resolved with documented decisions  
✅ Non-functional requirements specified with measurable criteria  
✅ User acceptance criteria defined for each functional requirement  
✅ Dependencies and integration points documented

**Output:** Complete master PRD with comprehensive stakeholder input

### Route C Results & Handoff

**Deliverables:**
- `requirements.md` - Master PRD from stakeholder synthesis
- `personas.md` - User personas from interview data
- `STAKEHOLDER-INTERVIEW-REPORTS/` - Individual interview notes
- `INTERVIEW-SYNTHESIS.md` - Cross-interview analysis
- `CONFLICT-RESOLUTIONS.md` - Documented requirement conflict decisions

**Quality Gates:**
✅ All key stakeholder tiers interviewed  
✅ Requirements conflicts identified and resolved  
✅ User personas validated with actual user input  
✅ Success metrics aligned with business strategy  
✅ Technical constraints and integration needs documented

**Handoff to Implementation:** Route to Stage 7 (skip stages 2-6) OR continue to missing stages if needed

---

## Agent Ecosystem

| Agent | Domain | Subagent Types | Active Stages | Authority |
|-------|--------|---------------|---------------|----------|
| **PM** | Project execution, timeline, budget | kickoff, iteration-planning, deployment-coordination, sprint-planning, input-assessment, gap-analysis, stakeholder-mapping | 0, 1, 6, 8, B, C | Timeline, resources, maturity assessment |
| **PO** | Product definition, prioritization | requirements-analysis, user-stories, feature-acceptance, test-strategies-approval, monitoring-feedback, gather-feedback, analyze-impact, requirements-refinement, business-domain-analysis, theme-prd-generation, stakeholder-interviews | 0, 1-6, 8, B, C | Requirements, stories, acceptance, business context |
| **BA** | Requirements analysis, BDD | personas, business-case, bdd-scenarios, bdd-execution, source-extraction, narrative-transformation, acceptance-criteria-extraction, interview-synthesis | 2, 5, 7, B, C | Persona accuracy, test completeness, extraction quality |
| **UX** | UX design, journey mapping | journey-maps, blueprints, design-systems, persona-synthesis | 3, 4, C | UX/UI decisions, accessibility, user experience synthesis |
| **Architect** | System architecture, tech stack | requirements-review, tech-spec, design, flow-diagrams, deployment, impact-assessment, input-analysis, cross-theme-integration | 0, 1-4, 6, 8, B | Architecture, technology, security, technical assessment |
| **Dev-Lead** | Technical execution, TDD orchestration | tech-spec-review, bdd-integration, implementation-planning, code-review | 4, 5, 7 | Implementation plans, code quality |
| **TDD Orchestrator** | Layer-by-layer TDD execution | layer-execution, tdd-cycle-coordination | 7 | Layer completion, BDD test validation |

---

## Route A: Traditional PDLC Workflow (Tier 1 Clients)

**When to Use:** Client has comprehensive documentation, clear requirements, established processes

**Prerequisites:** Route selection from Phase 0 determined high-confidence traditional approach

**Duration:** 15-25 days

**Quality Gates Enhanced:** Each stage includes input validation to ensure assumptions hold
| **PO** | Product definition, prioritization | requirements-analysis, user-stories, feature-acceptance, test-strategies-approval, monitoring-feedback, gather-feedback, analyze-impact, requirements-refinement | 1-6, 8 | Requirements, stories, acceptance |
| **BA** | Requirements analysis, BDD | personas, business-case, bdd-scenarios, bdd-execution | 2, 5, 7 | Persona accuracy, test completeness |
| **UX** | UX design, journey mapping | journey-maps, blueprints, design-systems | 3, 4 | UX/UI decisions, accessibility |
| **Architect** | System architecture, tech stack | requirements-review, tech-spec, design, flow-diagrams, deployment, impact-assessment | 1-4, 6, 8 | Architecture, technology, security |
| **Dev-Lead** | Technical execution, TDD orchestration | tech-spec-review, bdd-integration, implementation-planning, code-review | 4, 5, 7 | Implementation plans, code quality |
| **TDD Orchestrator** | Layer-by-layer TDD execution | layer-execution, tdd-cycle-coordination | 7 | Layer completion, BDD test validation |

---

## STAGE 1: REQUIREMENTS GATHERING

**Inputs**: Stakeholder workshops, market research, business objectives
**Output**: requirements.md (approved)
**Agents**: PM (kickoff), PO (requirements), Architect (feasibility)

**Steps**:
1. PM kickoff (`pm-kickoff`) → Project charter, stakeholder map
2. PM discovery (`pm-stakeholder-discovery`) → Business objectives, pain points
3. PO analysis (`po-requirements-analysis`) → requirements.md categorized/prioritized
4. Architect review (`architect-requirements-review`) → Feasibility assessment
5. Approval Gate: ✓ Requirements defined ✓ Business value justified ✓ Feasibility confirmed ✓ Metrics measurable

---

## STAGE 2: ANALYSIS & BUSINESS JUSTIFICATION

**Inputs**: requirements.md, market research
**Outputs**: personas.md, business-case.md (approved)
**Agents**: BA (personas/business-case), PO (validation), Architect (complexity)

**Personas Workflow**:
1. BA (`ba-personas`) → personas.md with goals, pain points, behaviors
2. PO (`po-personas-validation`) → Validate against requirements, approve

**Business Case Workflow**:
1. BA (`ba-business-case`) → business-case.md with ROI, projections, risks
2. Architect (`architect-complexity-assessment`) → Technical complexity input
3. PO (`po-business-case-approval`) → Verify ROI, approve

**Approval Gate**: ✓ Personas complete ✓ Business case justified ✓ ROI aligned ✓ Risks mitigated

---

## STAGE 3: DESIGN & ARCHITECTURE

**Inputs**: requirements.md, personas.md, business-case.md (approved)
**Outputs**: journey-maps.md, user-stories.md (with epics), blueprints.md, architecture-design.md, flow-diagrams.md
**Agents**: UX (journey/blueprints/design), PO (stories), Architect (architecture), BA (validation)

**Journey Maps**: UX (`ux-journey-maps`) → journey-maps.md | PO validates

**Epics & User Stories** (same document):
- **Concept**: Epics = organizational groupings, User-Stories = work units
- PO (`po-epics-definition`) → Define epic groupings
- BA (`ba-epics-validation`) → Validate scope
- PO (`po-user-stories`) → user-stories.md with:
  - Section 1: Epics (objectives, completion = all child stories done)
  - Section 2: Stories grouped by epic (acceptance criteria, BDD outline)
- BA (`ba-stories-validation`) → Validate + attach Gherkin scenarios per story

**Blueprints**: UX (`ux-blueprints`) → blueprints.md | PO approves

**Architecture**: Architect (`architect-design`) → architecture-design.md | PM/PO review

**Flow Diagrams**: Architect (`architect-flow-diagrams`) → flow-diagrams.md

**Approval Gate**: ✓ Journeys align with personas ✓ Stories trace to requirements ✓ Blueprints support stories ✓ Architecture supports requirements ✓ Flows connect journeys to architecture

---

## STAGE 4: DEVELOPMENT PLANNING

**Inputs**: All Stage 3 docs, requirements.md, business-case.md
**Outputs**: tech-spec.md, design-systems.md, code-generation.md
**Agents**: Architect (tech-spec), Dev-Lead (implementation), UX (design-systems)

**Tech Spec**: Architect (`architect-tech-spec`) → API contracts, DB schema | Dev-Lead (`dev-lead-tech-spec`) → Finalize specs | Architect reviews
**Design Systems**: UX (`ux-design-systems`) → design-systems.md with tokens, components | Dev-Lead validates feasibility
**Code Generation**: Dev-Lead (`dev-lead-code-generation`) → code-generation.md with templates, scaffolding | Architect reviews

**Approval Gate**: ✓ Tech specs complete ✓ Design systems clear ✓ Code generation consistent ✓ Aligned with architecture

---

## STAGE 5: TESTING STRATEGY

**Inputs**: user-stories.md (with BDD), tech-spec.md, flow-diagrams.md
**Output**: test-strategies.md
**Agents**: Dev-Lead (strategy), BA (BDD consolidation), PO (approval)

**Note**: BDD scenarios already attached to each user-story (from Stage 3). This stage consolidates overall testing strategy.

**Steps**:
1. Dev-Lead (`dev-lead-test-strategies`) → Define unit (80%+ coverage), integration, e2e, performance, security testing
2. BA (`ba-bdd-scenarios-consolidation`) → Verify BDD coverage, organize by epic/story
3. PO (`po-test-strategies-approval`) → Validate coverage, approve

**Approval Gate**: ✓ BDD covers acceptance criteria ✓ Unit coverage 80%+ ✓ Integration tests cover flows ✓ E2E tests cover journeys ✓ Performance/security aligned with requirements

---

## STAGE 6: DEPLOYMENT & MONITORING

**Inputs**: All Stage 4-5 docs, requirements.md, business-case.md
**Output**: iteration-planning.md
**Agents**: PO (planning), PM (coordination), Architect (deployment)

**Steps**:
1. PO (`po-iteration-planning`) → MVP vs phased rollout, feature phasing, release timeline
2. Architect (`architect-deployment`) + PM (`pm-deployment-coordination`) → Deployment architecture, logistics
3. PO (`po-monitoring-feedback`) → Monitoring metrics, feedback loop

**Approval Gate**: ✓ Release phases sequenced ✓ MVP identified ✓ Deployment sound ✓ Monitoring covers business/technical metrics ✓ Feedback loop defined

---

## STAGE 7: DEVELOPMENT & TESTING EXECUTION

**Inputs**: All Stage 1-6 docs (approved), particularly user-stories.md, tech-spec.md, test-strategies.md
**Agents**: Dev-Lead (sprint orchestration), TDD Orchestrator (layer execution), BA (validation), PO (acceptance)

**Refined Process with Clear Role Boundaries**:
1. **Dev-Lead** (`dev-lead-sprint-planning`) → Plan sprint scope + create implementation plans
2. **Dev-Lead** (`dev-lead-bdd-integration`) → Setup BDD feature files + assign Layer 1 to TDD Orchestrator  
3. **TDD Orchestrator** (`tdd-layer-execution`) → Execute RED-GREEN-REFACTOR cycles for Layer 1
4. **Dev-Lead** (`dev-lead-layer-review`) → Approve Layer 1 completion, assign Layer 2 
5. **TDD Orchestrator** → Execute Layer 2 (repeat for Layers 3-4)
6. **Dev-Lead** (`dev-lead-story-review`) → Final code review when all layers complete
7. **BA** (`ba-bdd-execution`) → Validate story in full test environment
8. **PO** (`po-feature-acceptance`) → Accept story

**Key Clarifications**:
- **Dev-Lead Domain**: Strategic orchestration (sprint/story/architecture compliance)
- **TDD Orchestrator Domain**: Tactical execution (layer-by-layer TDD cycles)
- **Handoff Trigger**: Implementation plan ready + failing BDD tests + layer assignment
- **Return Trigger**: Layer complete + BDD assertions passing + code committed

**TDD Cycle per Layer**: RED (failing test supporting BDD) → GREEN (minimal code) → REFACTOR (improve quality) | **Entry**: Failing BDD tests for layer | **Exit**: Layer BDD tests pass

**Output**: Working features, test reports, deployment-ready artifacts

---

## STAGE 8: CONTINUOUS IMPROVEMENT & FEEDBACK LOOP

**Inputs**: iteration-planning.md, user feedback, analytics, performance metrics
**Agents**: PO (feedback/analysis/refinement), Architect (impact), PM (planning)

**Process**:
1. PO (`po-gather-feedback`) → Collect feedback, monitor metrics
2. PO (`po-analyze-impact`) + Architect (`architect-impact-assessment`) → Business/technical impact
3. PO (`po-requirements-refinement`) → Update requirements.md, create new stories
4. PM (`pm-iteration-planning`) + PO (`po-next-iteration`) → Plan next cycle

**Feedback Loop**: Deployed Features → Monitor Metrics → Gather Feedback → Analyze Impact → Update Requirements → Repeat PDLC

---

## Route D: Hybrid Assembly Workflow (Mixed Input Scenarios)

**When to Use:** Client has mixed inputs - some documentation, some epics, some architecture diagrams, but significant gaps

**Duration:** 25-40 days (highly variable based on input mix)

### Hybrid Strategy Selection

**Input Mix Analysis:**
- **High-Quality Requirements + Sparse Technical** → Traditional interviews + Technical deep-dive
- **Good Epics + No Business Context** → Functional extraction + Executive interviews  
- **Strong Architecture + Weak User Context** → Technical baseline + User research program
- **Legacy System + Modernization Need** → Reverse engineering + Stakeholder visioning

**Adaptive Approach:**
1. **Use What's Available** - Build from strongest input sources first
2. **Fill Critical Gaps** - Target interviews and extraction for missing pieces
3. **Cross-Validate** - Use multiple sources to verify and enrich findings
4. **Iterative Assembly** - Build PRD incrementally as inputs become available

**Example Hybrid Flows:**

**Flow 1: Epic-Heavy with Architecture**
- Route B (Functional Extraction) → Architecture validation → Targeted stakeholder interviews for business context

**Flow 2: Legacy System Modernization**  
- Code analysis + Architecture reverse engineering → Route C (Interview-Driven) for vision → Route B for feature extraction

**Flow 3: Partial Documentation with Strong Technical Team**
- Document assessment → Technical interviews → Route A (Traditional) for missing stages

**Output:** Varies based on input mix - typically comprehensive PRD with documented evidence sources and confidence levels

---

## Workflow Selection Guidelines

### Decision Tree

```
Client Assessment Complete?
├─ No → Start with Phase 0 (Input Assessment)
└─ Yes → Route based on Tier Classification

Tier 1 (Documentation-Rich)?  
├─ Yes → Route A (Traditional PDLC)
└─ No → Continue assessment

Tier 2-3 (Epic/Story Rich)?
├─ Yes → Route B (Functional Extraction)  
└─ No → Continue assessment

Tier 4 (Minimal Documentation)?
├─ Yes → Route C (Interview-Driven)
└─ Mixed Inputs → Route D (Hybrid Assembly)
```

### Success Indicators by Route

| Route | Time Investment | Quality Indicator | Risk Level | Best For |
|-------|----------------|-------------------|------------|----------|
| **Route A** | Low (15-25 days) | High confidence, comprehensive docs | Low | Mature organizations with established processes |
| **Route B** | Medium (20-35 days) | Good functional coverage, business context | Medium | Organizations with good PM tooling but doc gaps |
| **Route C** | High (30-50 days) | Strong stakeholder buy-in, comprehensive | Medium-High | Startups, legacy modernizations, greenfield |
| **Route D** | Variable (25-40 days) | Mixed confidence levels | High | Complex organizations with mixed maturity |

### Anti-Patterns to Avoid

❌ **Force Traditional When Documentation is Poor** - Results in shallow, assumption-heavy PRDs  
❌ **Over-Interview When Good Sources Exist** - Wastes time and stakeholder goodwill  
❌ **Extract Without Business Context** - Creates feature-heavy but strategy-light PRDs  
❌ **Skip Input Assessment** - Wrong workflow choice leads to rework and delays  
❌ **Mix Routes Without Clear Strategy** - Creates confusion and inconsistent documentation quality

✅ **Always Start with Input Assessment** - Accurate routing is critical for success  
✅ **Adapt Based on Reality** - Use what clients actually have, not what they should have  
✅ **Document Evidence Sources** - Track confidence levels and validation approaches  
✅ **Cross-Validate When Possible** - Use multiple input types to verify findings  
✅ **Set Stakeholder Expectations** - Explain workflow choice and timeline impact

---

## Continuous Improvement & Framework Evolution

### Client Feedback Integration

After each engagement, capture lessons learned:

**Client Feedback Questions:**
1. How accurately did we assess your input maturity?
2. Which workflow components added the most value?
3. What gaps did we miss in our routing decision?
4. How could we have better utilized your available inputs?

**Template Updates:**
- Refine tier classification criteria based on field experience
- Add new hybrid flow patterns for emerging client scenarios  
- Update interview templates based on successful extraction patterns
- Enhance business domain categories for different industries

### Framework Extensions

**Industry-Specific Adaptations:**
- **Healthcare** - HIPAA compliance integration, clinical workflow focus
- **FinTech** - Regulatory requirements, security-first architecture
- **E-commerce** - Transaction flows, inventory management, payment processing
- **SaaS** - Multi-tenant considerations, subscription models, API-first design

**Technology Stack Adaptations:**  
- **Legacy Modernization** - Migration planning, technical debt assessment
- **Cloud-Native** - Microservices patterns, cloud platform integration
- **AI/ML Products** - Data pipeline requirements, model lifecycle management
- **Mobile-First** - Cross-platform considerations, offline-first design

**Organizational Maturity Extensions:**
- **Enterprise** - Governance processes, compliance integration, stakeholder complexity
- **Startup** - MVP focus, rapid iteration, resource constraints
- **Government** - Procurement processes, accessibility requirements, security clearances
- **Non-Profit** - Budget constraints, volunteer management, impact measurement

---

## Quick Start Reference

### For PM/PO Starting New Engagement

1. **Always Begin Here:** Phase 0 - Client Input Discovery & Maturity Assessment
2. **Document Everything:** Input inventory and assessment rationale  
3. **Route Confidently:** Use decision tree and tier classification
4. **Set Expectations:** Explain chosen workflow to stakeholders
5. **Track and Adapt:** Monitor assumption validity throughout process

### Common Client Questions & Responses

**"Why can't we just start with requirements?"**
→ "We need to assess what inputs you have first to choose the most efficient approach for your situation."

**"We have some documentation but it might be outdated."**  
→ "Perfect for Route B or D - we'll extract what's valuable and validate/enhance through targeted interviews."

**"Our epics are very technical, not business-focused."**
→ "Route B handles this - we transform technical epics into business narratives and organize by functional themes."

**"We're not sure what we have or where it is."**
→ "Route C (Interview-Driven) is designed exactly for this scenario - we'll discover requirements through comprehensive stakeholder interviews."

---

**Status:** Adaptive PDLC Framework v2.0 | **Last Updated:** March 16, 2026 | **Owner:** AI Engineering Team

**Output**: Updated requirements.md, refined user-stories.md, revised priorities, ready for next iteration

---

## Document Traceability Matrix

**Requirements Flow**: requirements.md → personas.md, business-case.md, user-stories.md, architecture-design.md, tech-spec.md, test-strategies.md

**User Story Flow**: user-stories.md → blueprints.md, flow-diagrams.md, test-strategies.md, acceptance validation

**Architecture Flow**: architecture-design.md → flow-diagrams.md, tech-spec.md, design-systems.md, code-generation.md, deployment

**Design Flow**: design-systems.md → code-generation.md, blueprints.md, implementation

**Testing Flow**: test-strategies.md → BDD scenarios, unit tests, integration tests, e2e tests, feature validation

---

## Document Governance

**Storage**: `/docs/prd/` | Version control: Git | Approval history tracked

**Approval Gates**:
- Stage 1: PM, PO, Stakeholders
- Stage 2: PO, BA, Architect
- Stage 3: PO, UX, Architect, Dev-Lead
- Stage 4: Architect, Dev-Lead, PO
- Stage 5: BA, QA, PO
- Stage 6: PM, PO, Architect

**Standards**: Clear, concise, actionable | Visual diagrams | Full traceability | Version history | Approval dates

---

## Key Success Factors

1. Sequential dependency (no skipping stages)
2. Clear traceability (everything traces to requirements)
3. Agent collaboration (right agents per stage)
4. Quality gates (approval before progression)
5. Continuous feedback (learning feeds next iteration)
6. Complete documentation (audit trail)
7. Stakeholder alignment (regular reviews)
8. Version control (clear history)

---

## Anti-Patterns

❌ Skip stages | ❌ Unclear ownership | ❌ No approval gates | ❌ Traceability gaps | ❌ Ignore feedback | ❌ Documents out of sync | ❌ Mix responsibilities
