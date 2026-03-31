# Workflow Enforcement Demo & Examples

## Overview
This document demonstrates how the workflow enforcement system works in practice with real examples and scenarios you'll encounter when using the AI-first delivery template.

---

## Example 1: New Project Setup

### Scenario
You've just copied the `.github/` template into a new project and want to start development.

### What Happens
```
🎯 WORKFLOW ENFORCEMENT ACTIVATED

Project: my-new-app
Template Version: 1.0
Enforcement Level: BALANCED (can be changed)

Choose your starting approach:
1. 🔍 Full Assessment - @orchestrator Assess project status
2. 📋 Existing Docs - I have documentation to upload
3. 🚀 Ready to Code - Jump to implementation
4. ⚡ Override - Skip workflows (requires justification)

💡 RECOMMENDED: Option 1 for best results
⏰ ESTIMATED TIME: 30-45 minutes for assessment
```

### Your Response Options

**Option 1 - Follow Guidance (Recommended)**:
```
@orchestrator Assess project status for my-new-app
```
✅ System guides you through proper workflow sequence  
✅ Templates and shortcuts provided at each step  
✅ Quality gates ensure high delivery standards  

**Option 4 - Expert Override**:
```yaml
# Created automatically: docs/.workflow-override.yml
override_request:
  justification: "Brownfield project - adding feature to existing well-documented system"
  risk_assessment: "LOW"
  duration: "implementation_phase_only"
```
⚡ Immediate access to implementation phase  
📊 Enhanced monitoring during development  
📝 Post-completion review recommended  

---

## Example 2: Workflow Sequence Violation

### Scenario  
You try to start implementation without completing the documentation phase.

### System Detection
```
⚠️ WORKFLOW SEQUENCE VIOLATION

Attempted: Start implementation (@dev-lead Begin implementation)
Missing: Completed documentation phase

REQUIRED PREREQUISITES:
❌ docs/01-requirements/user-stories.md - User stories with acceptance criteria  
❌ docs/02-architecture/architecture-design.md - System architecture design
❌ docs/05-implementation/user-stories.md - Implementation status tracking

ESTIMATED COMPLETION TIME: 2-4 hours
```

### Remediation Options
```
🔧 IMMEDIATE FIX OPTIONS:

1. COMPLETE DOCUMENTATION PHASE
   Command: @orchestrator Route documents workflow
   Time: 2-4 hours
   Result: Comprehensive PRD documentation

2. UPLOAD EXISTING DOCUMENTATION  
   Action: Copy existing docs to proper locations
   Time: 15-30 minutes
   Result: System validates and accepts existing work

3. EXPERT OVERRIDE
   Requirements: Justification + risk assessment
   Approval: AUTO (if LOW risk) or Senior Developer (if MEDIUM risk)
   Monitoring: Enhanced quality checks during implementation
```

### Your Choice: Override Path
```yaml
# You create: docs/.workflow-override.yml
override_request:
  timestamp: "2026-03-17T14:30:00Z"
  requested_by: "@senior-dev"
  rule_violated: "skip_documentation_phase"
  justification: "Client requirements clearly defined in existing Figma designs and API specs"
  
  risk_assessment: "MEDIUM"
  risk_mitigation:
    - "Existing API documentation comprehensive"
    - "Figma designs include complete user flows"
    - "Team has 6+ months experience with similar projects"
  
  monitoring_requirements:
    - "Daily check-ins for requirements clarification"
    - "Weekly review of implementation vs designs"
  
  duration: "2_weeks"
```

### System Response
```
✅ OVERRIDE APPROVED

Approval: AUTO-APPROVED (experienced team + good justification)
Risk Level: MEDIUM - enhanced monitoring activated
Duration: 2 weeks (until 2026-03-31)

ACTIVE MONITORING:
- Daily requirement clarification checks
- Weekly design-implementation review  
- Quality metrics tracking (test coverage, complexity)

🚀 PROCEEDING: Implementation workflow now available
📊 TRACKING: Override logged in audit trail
⚡ EMERGENCY STOP: Type 'stop override' if issues arise
```

---

## Example 3: Agent Handoff Validation

### Scenario
Dev-lead trying to hand off to TDD agents without complete implementation plan.

### System Response
```
🤝 HANDOFF VALIDATION FAILED: @dev-lead → @dev-tdd

MISSING HANDOFF ARTIFACTS:
❌ docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/implementation-plan.md
❌ docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/handoff.md

HANDOFF REQUIREMENTS:
✅ User story US-001 exists and is prioritized
✅ BDD scenarios defined (5 scenarios found)
❌ Implementation plan missing - required for TDD cycle planning
❌ Handoff artifact missing - required for context transfer

🔧 QUICK FIXES AVAILABLE:
```

### Auto-Fix Options
```
⚡ QUICK GENERATION OPTIONS:

1. AUTO-GENERATE FROM CONTEXT
   └ 🤖 Create implementation-plan.md from:
     ├─ Existing user story acceptance criteria  
     ├─ BDD scenarios in features/
     ├─ Architecture patterns from tech-spec.md
     └─ Team coding standards
   ⏰ Time: 2-3 minutes
   
2. TEMPLATE-ASSISTED CREATION
   └ 📋 Use implementation-plan-tmpl.md:
     ├─ Pre-filled with current context
     ├─ Guided sections with examples
     └─ Validation checks as you complete
   ⏰ Time: 15-20 minutes
   
3. MANUAL CREATION
   └ ✍️ Create from scratch:
     ├─ Full control over structure
     ├─ Custom approach for complex stories
     └─ Manual validation required
   ⏰ Time: 30-45 minutes
```

### Your Choice: Auto-Generate
```
🤖 AUTO-GENERATING IMPLEMENTATION PLAN...

Analyzing context:
✅ User story: US-001 User Authentication
✅ Acceptance criteria: 8 criteria found
✅ BDD scenarios: 5 scenarios covering login/logout/registration  
✅ Architecture: Node.js + Express + PostgreSQL + JWT
✅ Code standards: ESLint + Prettier + Jest

Generated structure:
├─ Layer 1 (Database): User model, authentication schema
├─ Layer 2 (Backend): Auth service, JWT handling, password hashing
├─ Layer 3 (Config): Routes, middleware, environment variables  
├─ Layer 4 (Frontend): Login/logout forms, auth state management

📄 CREATED: docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/implementation-plan.md
🤝 CREATED: docs/05-implementation/epics/<EPIC-REF>/user-stories/US-001/handoff.md

✅ HANDOFF VALIDATED: @dev-lead → @dev-tdd ready to proceed
```

---

## Example 4: Quality Gate Failure

### Scenario
Trying to complete a TDD cycle without meeting quality standards.

### System Detection
```
📊 QUALITY GATE FAILURE: TDD Cycle 3 - User Authentication

QUALITY ISSUES FOUND:
❌ Test Coverage: 67% (minimum 80% required)
❌ BDD Scenario Coverage: 3/5 scenarios passing (100% required)  
❌ Code Review: Not submitted for review
⚠️ Cyclomatic Complexity: Average 8.2 (target <10, acceptable)
⚠️ Security Review: Recommended for authentication code

BLOCKING ISSUES: 3 (must resolve to proceed)
WARNING ISSUES: 2 (should address but can override)
```

### Resolution Options
```
🔧 RESOLUTION OPTIONS:

OPTION 1: FIX ALL ISSUES (Recommended)
├─ 📈 Increase test coverage:
│  ├─ Add tests for error handling paths
│  ├─ Test edge cases (invalid tokens, expired sessions)
│  └─ Estimated time: 45-60 minutes
├─ ✅ Fix failing BDD scenarios:
│  ├─ Debug password reset flow
│  ├─ Fix session timeout handling  
│  └─ Estimated time: 30-45 minutes
└─ 📝 Submit for code review:
   └─ Request review from @senior-dev
   └─ Estimated time: 5 minutes (+ review time)

TOTAL ESTIMATED TIME: 1.5-2 hours

OPTION 2: PARTIAL FIX + OVERRIDE (Expert Users)
├─ ✅ Fix blocking issues (coverage + BDD)
├─ ⚡ Override code review requirement
│  └─ Justification: "Pair programming with senior dev throughout"
└─ 📊 Enhanced monitoring for security concerns

OPTION 3: EMERGENCY OVERRIDE (High Risk)
├─ ⚡ Override all quality gates
├─ 🔐 Requires architect approval  
├─ 📊 Intensive monitoring activated
└─ 📝 Mandatory post-completion review
```

### Your Choice: Partial Fix + Override
```yaml
# System generates override request
quality_gate_override:
  timestamp: "2026-03-17T16:45:00Z"
  cycle: "TDD-US-001-CYCLE-03"
  issues_resolved:
    test_coverage: "Increased to 82% - exceeds minimum"
    bdd_scenarios: "All 5 scenarios now passing"
  
  issues_overridden:
    code_review: "Pair programming with @senior-dev throughout development"
  
  risk_assessment: "LOW"
  risk_mitigation:
    - "Continuous pair programming eliminates review need"
    - "Authentication patterns are well-established in team"
    - "Automated security tests included in pipeline"
  
  monitoring: "Standard post-deployment monitoring"
  approval_status: "AUTO_APPROVED"
```

---

## Example 5: Emergency Override

### Scenario
Production system down, need immediate hotfix deployment.

### Emergency Declaration
```
🚨 EMERGENCY OVERRIDE ACTIVATED

Issue: Payment processing system completely down
Impact: $50,000+/hour revenue loss, customers unable to checkout
Severity: PRODUCTION_CRITICAL

Emergency Override Grants:
✅ Skip all workflow validation (4 hours max)
✅ Deploy without full testing (manual testing acceptable)
✅ Bypass code review (post-deployment review required)
✅ Skip documentation updates (24-hour grace period)

AUTOMATIC ACTIONS:
📢 Architect notification sent
📊 Intensive monitoring activated  
⏰ Auto-expire: 4 hours from now
📝 Post-mortem review scheduled for tomorrow
```

### Emergency Protocol
```
🚨 EMERGENCY PROTOCOL ACTIVE

IMMEDIATE ACTIONS REQUIRED:
1. ✅ Fix applied to production (hotfix-payment-processor)
2. ✅ Rollback script prepared and tested
3. ✅ Customer service team notified of fix status
4. ✅ Marketing team notified (communication to customers)

COMPLIANCE TRACKING:
├─ Manual testing evidence: Screenshots + test results saved
├─ Deployment log: All commands and outputs captured  
├─ Monitoring data: Error rates, response times tracked
└─ Communication log: All stakeholder notifications recorded

POST-EMERGENCY REQUIREMENTS (Within 24 hours):
├─ ✅ Full test suite added for fixed issue
├─ ✅ Comprehensive code review completed
├─ ✅ Documentation updated with fix details
├─ ✅ Post-mortem session scheduled and conducted
└─ ✅ Process improvement recommendations submitted
```

### Post-Emergency Review
```
📊 POST-EMERGENCY REVIEW: Payment Processor Hotfix

EMERGENCY OVERRIDE ANALYSIS:
✅ Issue Resolution: 23 minutes from detection to fix
✅ Downtime Minimized: 31 minutes total (target <1 hour)  
✅ Compliance Maintained: All required post-actions completed
✅ Process Followed: Emergency protocol executed correctly

LESSONS LEARNED:
├─ Monitoring Improvement: Add payment gateway health checks
├─ Testing Gap: Missing test for third-party API timeout scenarios
├─ Documentation Gap: Emergency runbook needs update
└─ Process Success: Override system enabled rapid response

PROCESS IMPROVEMENTS:
├─ Enhanced monitoring for payment APIs (assigned to @devops)
├─ Additional resilience tests (assigned to @qa)  
├─ Updated emergency procedures (assigned to @architect)
└─ Team training on payment system architecture (assigned to @tech-lead)

OVERRIDE SYSTEM PERFORMANCE: ✅ EXCELLENT
Emergency protocol enabled rapid response while maintaining audit trail
```

---

## How to Configure Enforcement for Your Team

### New Team (Learning Mode)
```yaml
# .github/workflow-enforcement.yml  
project_info:
  enforcement_level: "GUIDANCE_ONLY"
  team_experience: "new_to_workflows"

guidance_settings:
  show_all_suggestions: true
  provide_training_links: true
  explain_rationale: true
  gentle_nudges_only: true
```

### Experienced Team (Balanced Mode)
```yaml
# .github/workflow-enforcement.yml
project_info:
  enforcement_level: "BALANCED" 
  team_experience: "experienced"

override_permissions:
  senior_developer:
    low_risk: true
    medium_risk: true
  dev_lead:
    low_risk: true 
    medium_risk: true
    high_risk: false
```

### High-Compliance Organization (Strict Mode)
```yaml  
# .github/workflow-enforcement.yml
project_info:
  enforcement_level: "STRICT"
  compliance_requirement: "regulatory"

strict_settings:
  require_approvals: true
  extensive_audit_trail: true  
  minimal_overrides: true
  mandatory_quality_gates: true
```

---

## Quick Reference Commands

### Check Project Status
```bash
@orchestrator Assess project status  # Shows current workflow state
```

### Start Workflows
```bash
@orchestrator Assess project status for [PROJECT_NAME]    # Assessment
@orchestrator Route documents workflow for [PROJECT_NAME] # Documentation  
@orchestrator Start implementation for [USER_STORY]       # Implementation
```

### Override Commands
```bash
# Create override file
touch docs/.workflow-override.yml
# System guides you through override request

# Emergency override
echo "EMERGENCY_OVERRIDE: {reason}" > docs/.emergency-override
# 4-hour immediate override with post-hoc review
```

### System Status
```bash
# Check enforcement status
ls .github/validation/
cat docs/.project-state.yml

# View current overrides
cat docs/.workflow-override.yml
cat docs/.workflow-audit.yml
```

---

**Demo Version**: 1.0  
**Last Updated**: 2026-03-17  
**Purpose**: Help users understand workflow enforcement through practical examples