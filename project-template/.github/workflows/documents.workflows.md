# Product Development Lifecycle (PDLC) Document Workflows

## Overview
This document defines the strict workflow for generating and evolving all 13 PRD documents through the Product Development Lifecycle. Each document is driven by inputs from previous stages, creating a continuous chain of value from business requirements through to deployment and continuous improvement.

### Agent Collaboration Model
This workflow coordinates the following agents through subagent invocations:
- **Project Manager** ([pm.agent.md](pm.agent.md)): Project coordination and stakeholder management
- **Product Owner** ([po.agent.md](po.agent.md)): Product definition and feature prioritization
- **Business Analyst** ([ba.agent.md](ba.agent.md)): Requirements analysis and BDD test creation
- **UX Designer** ([ux.agent.md](ux.agent.md)): User experience and UI design
- **Architect** ([architect.agent.md](architect.agent.md)): System architecture and technical strategy
- **Tech Lead** ([dev-lead.agent.md](dev-lead.agent.md)): Technical implementation planning
- **TDD Navigator** ([dev-tdd.agent.md](dev-tdd.agent.md)): Test-driven development execution

### Document Templates Reference
All documents generated in this workflow should follow these templates:
- [prd.template.yml](prd.template.yml) - Complete PRD structure with all 13 documents
- [user-story.template.yml](user-story.template.yml) - User story format and structure
- [func-doc.template.yml](func-doc.template.yml) - Functional specification template
- [tech-doc.template.yml](tech-doc.template.yml) - Technical specification template

---

## Agent Ecosystem Reference

### 1. Project Manager Agent ([pm.agent.md](pm.agent.md))
**Primary Domain**: Project execution, timeline management, budget, stakeholder coordination
- **Subagent Types**: pm-kickoff, pm-iteration-planning, pm-deployment-coordination, pm-sprint-planning
- **Key Responsibilities**: 
  - Project charter creation and stakeholder alignment
  - Schedule planning and resource allocation
  - Risk management and timeline tracking
  - Budget management and stakeholder reporting
- **Active in Stages**: 1 (kickoff), 6 (deployment), 8 (iteration planning)
- **Approval Authority**: Project timeline and resource decisions

### 2. Product Owner Agent ([po.agent.md](po.agent.md))
**Primary Domain**: Product definition, feature prioritization, requirements orchestration
- **Subagent Types**: po-requirements-analysis, po-user-stories, po-feature-acceptance, po-test-strategies-approval, po-iteration-planning, po-monitoring-feedback, po-gather-feedback, po-analyze-impact, po-requirements-refinement, po-next-iteration
- **Key Responsibilities**:
  - Requirements gathering and validation
  - User story creation and prioritization
  - Feature acceptance testing
  - Roadmap management and feedback integration
  - Iterative refinement based on deployment learnings
- **Active in Stages**: 1, 2, 3, 4, 5, 6, 8
- **Approval Authority**: Requirements, user stories, feature acceptance, roadmap priorities

### 3. Business Analyst Agent ([ba.agent.md](ba.agent.md))
**Primary Domain**: Requirements analysis, persona creation, BDD scenario generation
- **Subagent Types**: ba-personas, ba-business-case, ba-bdd-scenarios, ba-bdd-execution
- **Key Responsibilities**:
  - User persona creation and research
  - Business case and ROI analysis
  - Gherkin/Cucumber BDD scenario conversion from user stories
  - Functional documentation
- **Active in Stages**: 2 (personas/business-case), 5 (BDD scenarios), 7 (BDD execution)
- **Approval Authority**: Persona accuracy, business case justification, test scenario completeness

### 4. UX Designer Agent ([ux.agent.md](ux.agent.md))
**Primary Domain**: User experience design, journey mapping, UI design, HTML maquettes
- **Subagent Types**: ux-journey-maps, ux-blueprints, ux-design-systems
- **Key Responsibilities**:
  - User journey mapping and flow design
  - Wireframe and blueprint creation
  - Design system definition (tokens, components, accessibility)
  - HTML/CSS responsive maquettes for framework integration
  - WCAG accessibility compliance
- **Active in Stages**: 3 (journey maps/blueprints), 4 (design systems)
- **Approval Authority**: UX/UI design decisions, accessibility compliance

### 5. Software Architect Agent ([architect.agent.md](architect.agent.md))
**Primary Domain**: System architecture, technology stack, technical feasibility
- **Subagent Types**: architect-requirements-review, architect-tech-spec, architect-design, architect-flow-diagrams, architect-deployment, architect-impact-assessment
- **Key Responsibilities**:
  - Technical feasibility assessment
  - Architecture design and decision records (ADRs)
  - Technology stack recommendation
  - API contract definition
  - Deployment planning and infrastructure requirements
  - Technical impact analysis for improvements
- **Active in Stages**: 1 (feasibility), 2 (assessment), 3 (architecture design), 4 (tech-spec), 6 (deployment), 8 (impact assessment)
- **Approval Authority**: Technical architecture, technology decisions, scalability/security concerns

### 6. Tech Lead Agent ([dev-lead.agent.md](dev-lead.agent.md))
**Primary Domain**: Technical execution planning, TDD orchestration, code generation
- **Subagent Types**: dev-lead-tech-spec, dev-lead-code-generation, dev-lead-test-strategies, dev-lead-sprint-planning
- **Key Responsibilities**:
  - Technical specification validation and implementation planning
  - Code generation strategy and scaffolding
  - Test strategy definition (unit, integration, e2e)
  - Sprint planning and TDD cycle coordination
  - Code review and refactoring guidance
- **Active in Stages**: 4 (tech-spec/code-gen), 5 (test strategies), 7 (sprint planning/TDD cycles)
- **Approval Authority**: Technical implementation plans, test strategy completeness

### 7. TDD Navigator Agent ([dev-tdd.agent.md](dev-tdd.agent.md))
**Primary Domain**: Test-driven development, RED→GREEN→REFACTOR cycles
- **Subagent Types**: dev-tdd-red, dev-tdd-green, dev-tdd-refactor
- **Key Responsibilities**:
  - Test-first implementation (RED phase)
  - Minimal code to pass tests (GREEN phase)
  - Code quality improvement (REFACTOR phase)
  - TDD cycle execution and validation
  - Code coverage tracking
- **Active in Stages**: 7 (development execution)
- **Approval Authority**: Code quality, test coverage, TDD discipline

---

## PDLC Information Processing Pipeline

```
Requirements → Analysis → Design → Development → Testing → Deployment → Monitoring
     ↓            ↓          ↓          ↓           ↓           ↓            ↓
Business Context  AI-Driven  Code       Automated   Production  Performance
Analysis          Gathering  Design     Testing     Release     Analytics
     ↓            ↓          ↓          ↓           ↓           ↓            ↓
Stakeholder       Knowledge  UX/UI      Implementation Quality   Live        Continuous
Validation        Base       Documents  & Testing    Gates      Environment Improvement
```

---

## STAGE 1: REQUIREMENTS GATHERING

### Input Sources
- Stakeholder meetings and workshops (facilitated by PM)
- Market research and competitive analysis
- Business objectives and constraints
- Success metrics and KPIs

### Document Generated
**requirements.md** - Source of truth for product requirements (follows [prd.template.yml](prd.template.yml) Stage 1)

### Responsible Agents
- **Project Manager** ([pm.agent.md](pm.agent.md)): Conducts stakeholder kickoff and discovery workshops
- **Product Owner** ([po.agent.md](po.agent.md)): Gathers and structures business requirements
- **Architect** ([architect.agent.md](architect.agent.md)): Provides input on technical feasibility and constraints

### Workflow Steps & Agent Invocations

**Step 1: Project Kickoff** (PM leads)
- Invoke PM Agent via **subagentType: `pm-kickoff`**
  ```
  Prompt: "Conduct project kickoff with stakeholders. Capture business vision, objectives, constraints, and success metrics. Document stakeholder map and communication plan."
  ```

**Step 2: Stakeholder Interviews** (PM leads with PO)
- Invoke PM Agent via **subagentType: `pm-stakeholder-discovery`**
  ```
  Prompt: "Conduct stakeholder discovery workshops. Document business objectives, pain points, user needs, success metrics, and market context."
  ```

**Step 3: Requirement Analysis** (PO leads with PM)
- Invoke PO Agent via **subagentType: `po-requirements-analysis`**
  ```
  Prompt: "Analyze and consolidate stakeholder inputs. Categorize requirements (functional vs. non-functional). Prioritize by business value. Create requirements.md following [prd.template.yml](prd.template.yml) Stage 1 structure."
  ```

**Step 4: Architect Review** (Architect reviews)
- Invoke Architect Agent via **subagentType: `architect-requirements-review`**
  ```
  Prompt: "Review requirements.md for technical feasibility. Identify architectural constraints. Validate scale and performance requirements. Document technical implications."
  ```

**Step 5: Requirements Documentation & Approval** (PO owns)
- Finalize requirements.md based on feedback
- Approval Gate: PM, PO, Stakeholders sign-off
  - ✓ All requirements clearly defined
  - ✓ Business value justified for each requirement
  - ✓ Technical feasibility confirmed
  - ✓ Success metrics measurable and achievable

**Output**: requirements.md approved and ready for next stage

---

## STAGE 2: ANALYSIS & BUSINESS JUSTIFICATION

### Input
- requirements.md (approved)
- Stakeholder inputs and market research
- Business strategy and competitive positioning

### Documents Generated
- **personas.md** - User archetypes and characteristics (follows [prd.template.yml](prd.template.yml) Stage 2)
- **business-case.md** - Financial justification and ROI (follows [prd.template.yml](prd.template.yml) Stage 2)

### Responsible Agents
- **Product Owner** ([po.agent.md](po.agent.md)): Orchestrates analysis phase
- **Business Analyst** ([ba.agent.md](ba.agent.md)): Creates personas and business case
- **Architect** ([architect.agent.md](architect.agent.md)): Provides scale and complexity input

### Workflow: Requirements → Personas

**Step 1: User Research & Persona Creation** (BA leads)
- Invoke BA Agent via **subagentType: `ba-personas`**
  ```
  Prompt: "Conduct user research based on requirements.md. Create personas.md following [prd.template.yml](prd.template.yml) Stage 2. For each requirement user type, develop detailed persona with goals, pain points, behaviors, and needs. Map personas to requirements."
  ```

**Step 2: Persona Validation** (PO validates)
- Invoke PO Agent via **subagentType: `po-personas-validation`**
  ```
  Prompt: "Review and validate personas.md. Ensure all user types from requirements.md are represented. Validate with stakeholders. Approve personas for next stage."
  ```

**Output**: personas.md with detailed user archetypes

### Workflow: Requirements → Business Case

**Step 1: Business Analysis & Case Development** (BA leads)
- Invoke BA Agent via **subagentType: `ba-business-case`**
  ```
  Prompt: "Analyze market opportunity and competitive landscape. Create business-case.md following [prd.template.yml](prd.template.yml) Stage 2. Calculate financial projections, ROI, payback period. Identify risks and mitigation. Ensure case justifies product investment based on requirements.md."
  ```

**Step 2: Architect Complexity Assessment** (Architect inputs)
- Invoke Architect Agent via **subagentType: `architect-complexity-assessment`**
  ```
  Prompt: "Review requirements.md and personas.md. Assess technical complexity, scale, and implementation effort. Provide input for financial projections in business-case.md."
  ```

**Step 3: Business Case Approval** (PO validates)
- Invoke PO Agent via **subagentType: `po-business-case-approval`**
  ```
  Prompt: "Review and approve business-case.md. Ensure ROI targets aligned with business objectives. Verify risk mitigation strategies. Get stakeholder sign-off."
  ```

**Output**: business-case.md with business justification

### Approval Gate
- ✓ Personas represent all user types from requirements
- ✓ Business case justifies product investment
- ✓ ROI targets aligned with business objectives
- ✓ Risk mitigation strategies defined

**Output**: personas.md and business-case.md approved and ready

---

## STAGE 3: DESIGN & ARCHITECTURE

### Input
- requirements.md (approved)
- personas.md (approved)
- business-case.md (approved)

### Documents Generated
- **journey-maps.md** - User experience flows (follows [prd.template.yml](prd.template.yml) Stage 3)
- **user-stories.md** - Feature requirements grouped by epics (follows [user-story.template.yml](user-story.template.yml))
  - Epics section: Major feature groupings organizing user stories
  - User Stories section: Individual stories grouped under their parent epic
- **blueprints.md** - UI structure and layout (follows [prd.template.yml](prd.template.yml) Stage 3)
- **architecture-design.md** - System technical design (follows [tech-doc.template.yml](tech-doc.template.yml))
- **flow-diagrams.md** - Process and interaction flows (follows [prd.template.yml](prd.template.yml) Stage 3)

### Responsible Agents
- **Product Owner** ([po.agent.md](po.agent.md)): Orchestrates design phase
- **UX Designer** ([ux.agent.md](ux.agent.md)): Creates journey maps and blueprints
- **Architect** ([architect.agent.md](architect.agent.md)): Creates system architecture
- **Business Analyst** ([ba.agent.md](ba.agent.md)): Supports user story creation

### Workflow: Personas → Journey Maps

**Step 1: Journey Mapping & UX Design** (UX leads with PO)
- Invoke UX Agent via **subagentType: `ux-journey-maps`**
  ```
  Prompt: "Create journey-maps.md following [prd.template.yml](prd.template.yml) Stage 3. Map user scenarios and workflows for each persona in personas.md. Identify touchpoints, emotional journey, pain points, and opportunities. Document detailed journey stages with interactions."
  ```

**Step 2: Journey Map Validation** (PO validates)
- Invoke PO Agent via **subagentType: `po-journey-validation`**
  ```
  Prompt: "Review and validate journey-maps.md. Ensure journeys align with personas and requirements.md. Validate with stakeholders and users where possible."
  ```

**Output**: journey-maps.md with detailed user experience flows

### Workflow: Requirements + Personas → Epics & User Stories (Defined Together)

**IMPORTANT CONCEPT**: 
- **Epics are organizational groupings** of related user stories (not separate work units)
- **User Stories are the granulation level** for implementation and tracking
- Both epics and stories are defined in the SAME document: **user-stories.md**
- An epic is "complete" when ALL its user-stories are implemented

**Step 1: Epic Definition** (PO leads with BA and Architect)
- Invoke PO Agent via **subagentType: `po-epics-definition`**
  ```
  Prompt: "Define epics from requirements.md. Group related functionality into major feature categories/epics. For each epic, document:
    - Epic name and description
    - Business value and objectives
    - Scope and boundaries
    - Key features/user stories it will contain
    - Success criteria
    - Timeline and priority
    Reference journey-maps.md and personas.md to ensure epics align with user workflows.
    
    NOTE: These are GROUPING containers, not units of work. Implementation will occur at user-story level."
  ```

**Step 2: Epic Validation** (BA and Architect validate)
- Invoke BA Agent via **subagentType: `ba-epics-validation`**
  ```
  Prompt: "Review and validate epic definitions. Ensure:
    - Epics are properly scoped as feature groupings (not as separate deployable units)
    - Each epic can logically contain multiple user-stories
    - Epics align with requirements.md and business objectives
    - Epic boundaries are clear and non-overlapping
    
    NOTE: These are organizing containers. Actual work will be tracked at user-story level."
  ```

**Output**: Epic groupings defined and ready for story breakdown

**Step 3: User Story Creation Within Epics** (PO leads with BA)
- Invoke PO Agent via **subagentType: `po-user-stories`**
  ```
  Prompt: "Create user-stories.md following [user-story.template.yml](user-story.template.yml). Structure document with:
    1. EPICS SECTION: List all epics with:
       - Epic name and objectives
       - Business value and timeline
       - Expected implementation sequence
       - Epic completion criteria: 'COMPLETE when all child user-stories are IMPLEMENTED'
    
    2. USER STORIES SECTION: For each epic, list its user-stories:
       - Story number and epic assignment
       - User persona (from personas.md)
       - Acceptance criteria (from requirements)
       - Complexity estimate
       - Dependencies (both within epic and cross-epic)
       - BDD scenario outline
    
    Map each story to journey-maps.md stages and its parent epic.
    
    NOTE: Development work happens at USER-STORY level. Epics are tracking/reporting containers."
  ```

**Step 4: BA Story Validation & BDD Scenario Attachment** (BA validates and creates BDD)
- Invoke BA Agent via **subagentType: `ba-stories-validation`**
  ```
  Prompt: "Review and validate user-stories.md for clarity and completeness. Ensure:
    - Each epic clearly lists its constituent user-stories
    - Stories are grouped correctly under parent epics
    - Each user-story has clear, testable acceptance criteria
    - No missing stories from requirements.md
    - Dependencies between stories (within epic and cross-epic) are identified
    - Epic completion is defined as: 'All child user-stories are IMPLEMENTED'
    
    CRITICAL: For each user-story, create and attach Gherkin/Cucumber BDD scenarios:
    - Create one Gherkin feature file per user-story (e.g., feature-X.feature)
    - Write Given-When-Then scenarios for each acceptance criterion
    - Ensure every acceptance criterion has a BDD scenario that tests it
    - Include test data setup, expected outcomes, and edge cases
    - Include the feature file content in the user-story definition
    
    These BDD scenarios will be the entry point for Dev-Lead agent in Phase 2 of implementation.workflows.md"
  ```

**Output**: user-stories.md with:
  - EPICS SECTION: Feature groupings with clear scope and boundaries
  - USER STORIES SECTION: Individual implementable stories grouped by epic
    - **Each story includes: Acceptance criteria + Attached BDD/Gherkin scenarios**
  - Epic completion = ALL child stories completed (automatic status roll-up)

### Workflow: Journey Maps + User Stories → Blueprints

**Step 1: UI Design & Wireframing** (UX leads)
- Invoke UX Agent via **subagentType: `ux-blueprints`**
  ```
  Prompt: "Create blueprints.md following [prd.template.yml](prd.template.yml) Stage 3. Create wireframes for each user story in user-stories.md. Map UI components and structure. Define layout and navigation. Validate against journey-maps.md. Create component inventory."
  ```

**Step 2: UX & PO Design Review** (PO validates)
- Invoke PO Agent via **subagentType: `po-blueprint-approval`**
  ```
  Prompt: "Review and approve blueprints.md. Ensure UI supports all user stories and requirements.md. Validate stakeholder and user satisfaction with proposed designs."
  ```

**Output**: blueprints.md with UI structure and component organization

### Workflow: Requirements → Architecture Design

**Step 1: Architecture Design** (Architect leads)
- Invoke Architect Agent via **subagentType: `architect-design`**
  ```
  Prompt: "Create architecture-design.md following [tech-doc.template.yml](tech-doc.template.yml). Analyze requirements.md and create system architecture. Design components and layers. Select technology stack. Design data model. Map integration points. Include diagrams and detailed documentation."
  ```

**Step 2: Architecture Review** (PM and PO validate)
- Invoke Architect Agent via **subagentType: `architect-review`**
  ```
  Prompt: "Present and review architecture-design.md with stakeholders. Gather feedback and ensure alignment with business requirements.md and journey-maps.md. Finalize technical decisions."
  ```

**Output**: architecture-design.md with system technical design

### Workflow: Architecture + Blueprints → Flow Diagrams

**Step 1: Flow Documentation** (Architect leads with UX)
- Invoke Architect Agent via **subagentType: `architect-flow-diagrams`**
  ```
  Prompt: "Create flow-diagrams.md following [prd.template.yml](prd.template.yml) Stage 3. Map user interaction flows from journey-maps.md to system flows. Document process sequences, decision points, and data transformations. Create sequence diagrams connecting blueprints.md UI to architecture-design.md components."
  ```

**Output**: flow-diagrams.md with process and interaction flows

### Approval Gate
- ✓ Journey maps align with personas and user scenarios
- ✓ User stories trace back to requirements
- ✓ Blueprints support all user stories
- ✓ Architecture supports all requirements and use cases
- ✓ Flow diagrams connect journey maps to architecture
- ✓ Design is feasible and scalable
- ✓ All Stage 3 documents approved by PM, PO, Architect

**Output**: All Stage 3 documents approved and ready for development

---

## STAGE 4: DEVELOPMENT PLANNING

### Input
- All Stage 3 documents (approved)
- requirements.md and business-case.md

### Documents Generated
- **tech-spec.md** - Detailed technical specifications (follows [tech-doc.template.yml](tech-doc.template.yml))
- **design-systems.md** - Visual and component standards (follows [prd.template.yml](prd.template.yml) Stage 4)
- **code-generation.md** - Automation and scaffolding specifications (follows [prd.template.yml](prd.template.yml) Stage 4)

### Responsible Agents
- **Architect** ([architect.agent.md](architect.agent.md)): Leads technical specification creation
- **Tech Lead** ([dev-lead.agent.md](dev-lead.agent.md)): Creates detailed implementation specs
- **UX Designer** ([ux.agent.md](ux.agent.md)): Defines design systems
- **Product Owner** ([po.agent.md](po.agent.md)): Ensures alignment with requirements

### Workflow: Architecture + Blueprints → Tech Spec

**Step 1: Technical Specification Creation** (Architect and Tech Lead)
- Invoke Architect Agent via **subagentType: `architect-tech-spec`**
  ```
  Prompt: "Create tech-spec.md following [tech-doc.template.yml](tech-doc.template.yml). Define API contracts (OpenAPI/Swagger) based on architecture-design.md and flow-diagrams.md. Specify database schema and relationships. Document implementation patterns and error handling."
  ```

**Step 2: Tech Lead Implementation Planning** (Tech Lead creates)
- Invoke Tech Lead Agent via **subagentType: `dev-lead-tech-spec`**
  ```
  Prompt: "Finalize tech-spec.md following [tech-doc.template.yml](tech-doc.template.yml). Document all API endpoints with full specifications. Specify database schema with constraints. Define data models, transformations, error codes. Ensure specs align with user-stories.md acceptance criteria."
  ```

**Step 3: Architect & PO Review** (Architect validates)
- Invoke Architect Agent via **subagentType: `architect-spec-review`**
  ```
  Prompt: "Review tech-spec.md for architectural alignment. Validate API design, database schema, and implementation patterns align with architecture-design.md. Ensure specifications support all user stories from user-stories.md."
  ```

**Output**: tech-spec.md with detailed technical specifications

### Workflow: Blueprints → Design Systems

**Step 1: Design System Definition** (UX leads)
- Invoke UX Agent via **subagentType: `ux-design-systems`**
  ```
  Prompt: "Create design-systems.md following [prd.template.yml](prd.template.yml) Stage 4. Based on blueprints.md, define color palette, typography, component library, spacing grid, responsive breakpoints. Document design tokens and component variants. Specify accessibility standards (WCAG, ARIA)."
  ```

**Step 2: Design System Review** (Architect and Tech Lead validate)
- Invoke Tech Lead Agent via **subagentType: `dev-lead-design-systems`**
  ```
  Prompt: "Review design-systems.md for implementation feasibility. Ensure design tokens and components are implementable with selected technology stack. Validate responsive behavior and accessibility compliance."
  ```

**Output**: design-systems.md with visual and component standards

### Workflow: Tech Spec + Design Systems → Code Generation

**Step 1: Code Generation Strategy** (Tech Lead leads with Architect)
- Invoke Tech Lead Agent via **subagentType: `dev-lead-code-generation`**
  ```
  Prompt: "Create code-generation.md following [prd.template.yml](prd.template.yml) Stage 4. Define code generation templates for frontend, backend, and database migrations. Specify scaffolding approach, code organization, naming conventions. Document API contract generation strategy (OpenAPI, GraphQL, or similar).\"
  ```

**Step 2: Architect Code Generation Review** (Architect validates)
- Invoke Architect Agent via **subagentType: `architect-code-generation`**
  ```
  Prompt: "Review code-generation.md. Ensure code generation approach maintains architectural consistency. Validate that generated code follows design patterns from architecture-design.md. Confirm consistency with design-systems.md."
  ```

**Output**: code-generation.md with automation specifications

### Approval Gate
- ✓ Tech specs are complete and implementation-ready
- ✓ Design systems provide clear implementation guidance
- ✓ Code generation approach maintains consistency
- ✓ All specifications align with architecture and requirements
- ✓ All Stage 4 documents approved by Architect and Tech Lead

**Output**: All Stage 4 documents approved, development ready

---

## STAGE 5: TESTING STRATEGY

### Input
- user-stories.md (approved)
- tech-spec.md (approved)
- flow-diagrams.md (approved)

### Documents Generated
- **test-strategies.md** - Comprehensive testing approach with BDD scenarios (follows [prd.template.yml](prd.template.yml) Stage 5)

### Responsible Agents
- **Business Analyst** ([ba.agent.md](ba.agent.md)): Leads BDD scenario creation
- **QA Lead**: Defines testing strategy
- **Product Owner** ([po.agent.md](po.agent.md)): Validates acceptance criteria

### Workflow: User Stories (with BDD) → Test Strategies

**IMPORTANT**: BDD scenarios are **already attached to each user-story** (from Stage 3, Step 4). This stage consolidates overall testing strategy.

**Step 1: Test Strategy Definition** (BA and Tech Lead lead)
- Invoke Tech Lead Agent via **subagentType: `dev-lead-test-strategies`**
  ```
  Prompt: "Develop comprehensive testing approach in test-strategies.md. User-stories already have individual BDD/Gherkin scenarios attached.
  
  Your responsibility:
  - Define unit testing scope and coverage targets based on tech-spec.md (minimum 80% coverage)
  - Define integration testing approach for component interactions from flow-diagrams.md
  - Define e2e testing for critical user workflows from journey-maps.md
  - Define performance testing benchmarks and targets
  - Define security testing checklist based on requirements.md
  - Reference the BDD scenarios already attached to each user-story in user-stories.md
  
  The BDD scenarios are the acceptance tests. This document defines the supporting test strategy (unit, integration, e2e, performance, security)."
  ```

**Step 2: BDD Scenario Consolidation & Test Strategy Documentation** (BA finalizes)
- Invoke BA Agent via **subagentType: `ba-bdd-scenarios-consolidation`**
  ```
  Prompt: "Consolidate test-strategies.md with reference to BDD scenarios. 
  - Verify all BDD scenarios from user-stories.md are listed/referenced
  - Ensure BDD scenarios cover all acceptance criteria from user-stories.md
  - Document the BDD scenarios as executable acceptance tests for each story
  - Organize by epic/story hierarchy to show test coverage
  - Confirm unit, integration, e2e, performance, and security test approaches align with BDD scenarios"
  ```

**Step 3: Test Strategy Review & Approval** (PO validates)
- Invoke PO Agent via **subagentType: `po-test-strategies-approval`**
  ```
  Prompt: "Review and approve test-strategies.md. Validate:
    - All user-story acceptance criteria have BDD scenarios (from user-stories.md)
    - Unit test coverage targets are realistic (80%+)
    - Integration tests cover component interactions from flow-diagrams.md
    - E2E tests cover critical user workflows from journey-maps.md
    - Performance and security testing align with requirements.md
    - Overall testing strategy validates all requirements are met"
  ```

**Output**: test-strategies.md with comprehensive testing approach

### Approval Gate
- ✓ BDD scenarios cover all user story acceptance criteria
- ✓ Unit test coverage targets defined (minimum 80%)
- ✓ Integration tests cover component interactions from flow-diagrams.md
- ✓ E2E tests cover critical user workflows from journey-maps.md
- ✓ Performance benchmarks aligned with requirements.md
- ✓ Security tests mapped to security requirements
- ✓ All Stage 5 documents approved by BA, QA, and PO

**Output**: test-strategies.md approved, testing ready

---

## STAGE 6: DEPLOYMENT & MONITORING

### Input
- All Stage 4-5 documents (approved)
- requirements.md and business-case.md

### Documents Generated
- **iteration-planning.md** - Release phases and deployment strategy (follows [prd.template.yml](prd.template.yml) Stage 6)

### Responsible Agents
- **Product Owner** ([po.agent.md](po.agent.md)): Defines feature phasing and release strategy
- **Project Manager** ([pm.agent.md](pm.agent.md)): Coordinates deployment logistics
- **Architect** ([architect.agent.md](architect.agent.md)): Validates deployment architecture

### Workflow: All Documents → Iteration Planning

**Step 1: Release Strategy & Feature Phasing** (PO leads)
- Invoke PO Agent via **subagentType: `po-iteration-planning`**
  ```
  Prompt: "Create iteration-planning.md following [prd.template.yml](prd.template.yml) Stage 6. Determine MVP vs. phased rollout based on business-case.md ROI timeline. Define feature phasing by release, grouping related user-stories.md. Identify dependencies and sequencing. Map features to release phases. Define release timeline."
  ```

**Step 2: Deployment Architecture Planning** (PM and Architect)
- Invoke Architect Agent via **subagentType: `architect-deployment`**
  ```
  Prompt: "Define deployment architecture in iteration-planning.md. Based on architecture-design.md, specify deployment approach (containerized, serverless, hybrid). Define environments (dev, staging, production). Specify scaling strategy, high-availability approach, and rollback strategy."
  ```

- Invoke PM Agent via **subagentType: `pm-deployment-coordination`**
  ```
  Prompt: "Plan deployment logistics in iteration-planning.md. Define deployment timeline and phases. Coordinate release dates, environment provisioning, team responsibilities. Plan go-live activities and contingencies."
  ```

**Step 3: Monitoring & Feedback Planning** (PO leads)
- Invoke PO Agent via **subagentType: `po-monitoring-feedback`**
  ```
  Prompt: "Define monitoring and continuous improvement in iteration-planning.md. Based on requirements.md success metrics and business-case.md KPIs, define business metrics to monitor. Define technical metrics (performance, availability, error rates). Specify monitoring tools and alerting thresholds. Document feedback loop process for continuous improvement."
  ```

**Output**: iteration-planning.md with release and monitoring strategy

### Approval Gate
- ✓ Release phases are sequenced logically with dependencies managed
- ✓ MVP identified and aligned with business-case.md timeline
- ✓ Deployment approach is sound and aligned with architecture-design.md
- ✓ Monitoring plan covers business metrics from requirements.md and technical metrics
- ✓ Feedback loop process defined for learning and continuous improvement
- ✓ All Stage 6 documents approved by PM, PO, and Architect

**Output**: iteration-planning.md approved, ready for deployment

---

## STAGE 7: DEVELOPMENT & TESTING EXECUTION

### Document Inputs
- All Stage 1-6 documents (approved)
- Particularly: user-stories.md, tech-spec.md, test-strategies.md, code-generation.md

### Process Flow & Agent Invocations

**Development Orchestration** (Tech Lead orchestrates via TDD Navigator)
- Invoke Tech Lead Agent via **subagentType: `dev-lead-sprint-planning`**
  ```
  Prompt: "Plan development sprints based on user-stories.md prioritization. Break down user stories into tasks across layers (frontend, backend, database, CI/CD). Assign tasks to development team. Prepare TDD cycle for each task."
  ```

**For Each User Story / Feature:**
1. Invoke TDD Navigator via **subagentType: `dev-tdd-red`**
   ```
   Prompt: "Create failing BDD test based on test-strategies.md scenarios. Write unit test stubs based on tech-spec.md. Follow code-generation.md scaffolding approach. Task: [User Story ID and acceptance criteria]"
   ```

2. Invoke TDD Navigator via **subagentType: `dev-tdd-green`**
   ```
   Prompt: "Implement minimal code to pass failing test. Follow architecture-design.md patterns and tech-spec.md. Use code-generation.md templates. Ensure implementation satisfies acceptance criteria from user-stories.md"
   ```

3. Invoke TDD Navigator via **subagentType: `dev-tdd-refactor`**
   ```
   Prompt: "Refactor code for clarity, performance, and maintainability. Ensure all tests still pass. Maintain architectural patterns from architecture-design.md. Apply design-systems.md standards."
   ```

**Quality Assurance** (BA orchestrates BDD validation)
- Invoke BA Agent via **subagentType: `ba-bdd-execution`**
  ```
  Prompt: "Execute BDD tests from test-strategies.md using Gherkin/Cucumber. Validate feature against acceptance criteria from user-stories.md. Report test results and any failures."
  ```

**Feature Validation** (PO validates business readiness)
- Invoke PO Agent via **subagentType: `po-feature-acceptance`**
  ```
  Prompt: "Review completed feature against user story from user-stories.md. Verify all acceptance criteria met. Approve feature or request changes. Document validation and sign-off."
  ```

### Output
- Working features passing all tests from test-strategies.md
- Feature validation documentation tracing to user-stories.md
- Test reports and quality metrics
- Deployment-ready artifacts aligned with code-generation.md

---

## STAGE 8: CONTINUOUS IMPROVEMENT & FEEDBACK LOOP

### Input
- iteration-planning.md monitoring and feedback plan
- User feedback and analytics
- Performance metrics and test results from test-strategies.md

### Process Flow & Agent Invocations

**1. Gather Feedback** (PO leads)
- Invoke PO Agent via **subagentType: `po-gather-feedback`**
  ```
  Prompt: "Gather user feedback on deployed features from iteration-planning.md. Monitor business metrics from requirements.md success criteria. Analyze usage patterns and user behavior. Identify improvement opportunities and pain points."
  ```

**2. Analyze Impact** (PO and Architect)
- Invoke PO Agent via **subagentType: `po-analyze-impact`**
  ```
  Prompt: "Analyze feedback impact on product roadmap and requirements. Evaluate how feedback maps to current requirements.md. Assess priority and business value of potential improvements."
  ```

- Invoke Architect Agent via **subagentType: `architect-impact-assessment`**
  ```
  Prompt: "Assess technical impact of proposed improvements. Evaluate impact on architecture-design.md and tech-spec.md. Identify technical debt or optimization needs. Recommend architectural adjustments."
  ```

**3. Update Requirements** (PO leads)
- Invoke PO Agent via **subagentType: `po-requirements-refinement`**
  ```
  Prompt: "Refine requirements.md based on user feedback and performance data. Create new user-stories.md for improvements. Update journey-maps.md based on actual usage patterns. Adjust feature priorities for next iteration based on learning."
  ```

**4. Plan Next Iteration** (PM and PO)
- Invoke PM Agent via **subagentType: `pm-iteration-planning`**
  ```
  Prompt: "Plan next development iteration. Update timeline and budget based on lessons learned. Allocate resources for planned improvements. Prepare for next PDLC cycle."
  ```

- Invoke PO Agent via **subagentType: `po-next-iteration`**
  ```
  Prompt: "Finalize user stories and priorities for next iteration. Prepare refined requirements for next PDLC cycle. Communicate roadmap updates to stakeholders."
  ```

### Feedback Loop Process
```
Deployed Features (from iteration-planning.md)
  ↓
Monitor Metrics (business & technical from test-strategies.md)
  ↓
Gather Feedback (user and analytics)
  ↓
Analyze Impact (against requirements.md and architecture-design.md)
  ↓
Update Requirements (refine requirements.md, create new stories)
  ↓
Plan Next Iteration
  ↓
Repeat PDLC Cycle (return to STAGE 1 with refined requirements)
```

### Continuous Improvement Outcomes
- Updated requirements.md for next iteration
- Refined user-stories.md with new features
- Updated journey-maps.md based on actual usage
- Revised priorities based on business impact
- Lessons learned documented
- Team retrospectives completed
- Ready to begin next PDLC cycle with improved understanding

---

## Document Traceability Matrix

### Requirements Traceability
```
requirements.md
  ↓ (drives)
  ├→ personas.md (user types define personas)
  ├→ business-case.md (business objectives drive financial case)
  ├→ user-stories.md (functional requirements become stories)
  ├→ architecture-design.md (non-functional requirements drive design)
  ├→ tech-spec.md (technical requirements drive specs)
  └→ test-strategies.md (all requirements need tests)
```

### User Story Traceability
```
user-stories.md
  ↓ (drives)
  ├→ blueprints.md (features need UI)
  ├→ flow-diagrams.md (features have workflows)
  ├→ test-strategies.md (stories have acceptance criteria = tests)
  └→ acceptance_validation (stories are accepted when tests pass)
```

### Architecture Traceability
```
architecture-design.md
  ↓ (drives)
  ├→ flow-diagrams.md (components interact via flows)
  ├→ tech-spec.md (architecture determines spec approach)
  ├→ design-systems.md (architecture informs technical components)
  ├→ code-generation.md (architecture patterns drive code templates)
  └→ deployment (architecture determines deployment approach)
```

### Design Traceability
```
design-systems.md
  ↓ (drives)
  ├→ code-generation.md (design tokens and components)
  ├→ blueprints.md (component library defines available components)
  └→ implementation (frontend code generation from design specs)
```

### Testing Traceability
```
test-strategies.md
  ↓ (drives)
  ├→ BDD Scenarios (from user story acceptance criteria)
  ├→ Unit Tests (from tech-spec component design)
  ├→ Integration Tests (from flow-diagrams interactions)
  ├→ E2E Tests (from journey-maps user workflows)
  └→ Feature Validation (acceptance criteria verification)
```

---

## Document Generation Governance

### Version Control
- All documents stored in `/docs/prd/` folder
- Version controlled with Git
- Each document has version number and date
- Changes tracked with approval history

### Approval Gates (Quality Checkpoints)
```
Stage 1: requirements.md
  ✓ PM, PO, Stakeholders sign-off

Stage 2: personas.md, business-case.md
  ✓ PO, BA, Architect validation

Stage 3: journey-maps.md, user-stories.md, blueprints.md, 
         architecture-design.md, flow-diagrams.md
  ✓ PO, UX, Architect, Tech Lead validation

Stage 4: tech-spec.md, design-systems.md, code-generation.md
  ✓ Architect, Tech Lead, PO validation

Stage 5: test-strategies.md
  ✓ BA, QA, PO validation

Stage 6: iteration-planning.md
  ✓ PM, PO, Architect validation
```

### Documentation Standards
- Clear, concise, and actionable language
- Use of diagrams and visuals where helpful
- Full traceability to previous documents
- Version history and change log
- Approval signatures and dates

### Review Cadence
- Stage 1-2: Weekly reviews during requirements phase
- Stage 3: Bi-weekly reviews during design phase
- Stage 4-5: Weekly reviews during planning phase
- Stage 6+: As-needed reviews during execution

---

## Key Success Factors

1. **Sequential Dependency**: Each stage begins only after previous stage is approved
2. **Clear Traceability**: Every element traces back to requirements
3. **Agent Collaboration**: Right agents involved at each stage
4. **Quality Gates**: Approval required before progression
5. **Continuous Feedback**: Learning from implementation feeds into next iteration
6. **Documentation**: Complete audit trail of all decisions and changes
7. **Stakeholder Alignment**: Regular reviews with all stakeholders
8. **Version Control**: All documents tracked with clear history

---

## Anti-Patterns to Avoid

❌ Skipping stages to "save time" - Creates rework downstream
❌ Unclear document ownership - Leads to inconsistencies
❌ No approval gates - Insufficient validation
❌ Traceability gaps - Can't validate requirements are met
❌ Ignoring feedback - Misses learning and improvements
❌ Documents becoming "shelf-ware" - Out of sync with reality
❌ Mixing responsibilities - Creates confusion and conflicts

---

This workflow ensures that every PRD document is properly generated, validated, and integrated into the product development process, maintaining traceability and quality throughout the entire product lifecycle.
