# Start Implementation Workflow

## Prerequisites

- ✅ requirements.md, personas.md, user-stories.md, architecture-design.md, tech-spec.md, design-systems.md, test-strategies.md
- ✅ Gherkin BDD files (features/**/*.feature)
- ✅ PDLC Stages 1-6 complete

## Command

```bash
@orchestrator Start implementation workflow for [PROJECT_NAME]

I have completed PDLC Stages 1-6. Orchestrate:
- ONE user-story at a time, 4 layers each
- BDD drives TDD (RED-GREEN-REFACTOR)
- BA validates, Dev-Lead reviews

Start with Phase 0: Epic Review
```

## Phases

### 0: Epic Review (Day 1)
**Deliverables**: Story dependency map, sequence  
**Gate**: Sequencing approval

### 1: Sprint Planning (Day 1-2)
**Deliverables**: Sprint plan  
**Gate**: Sprint scope (3 options)

### 2: BDD Integration (Day 2)
**Deliverables**: Feature files, 4-layer breakdown, GitHub Issues

### 3: TDD Cycle (Days 2-5eliverables**: Layers 1-4 (DB, Backend, Config, Frontend), tests

### 4: BDD Validation (Per story)
**Deliverables**: BDD report  
**Gate**: Story acceptance

### 5: Code Quality (Per story)
**Deliverables**: Review report  
**Gate**: Merge approval

### 6: Sprint Review
**Deliverables**: Sprint summary  
**Gate**: Next sprint planning
