# CI/CD Workflow

## Overview

This document defines the **Continuous Integration & Continuous Deployment (CI/CD) Workflow** - the automated pipeline for validating code quality, running tests, and deploying features to production environments.

This workflow operates in parallel with [code-generation.workflows.md](.github/workflows/code-generation.workflows.md), providing automated validation at every commit. It evolves from a **simple bootstrap approach** for project startup through increasingly sophisticated stages as the project matures.

**Prerequisites**: 
- Git repository with main and develop branches
- GitHub Actions configured for automation
- Passing [code-generation.workflows.md](.github/workflows/code-generation.workflows.md) requirements
- Tech stack defined in [architecture-design.md](../docs/prd/architecture-design.md)
- Code standards in [coding.instructions.md](../instructions/coding.instructions.md)

---

## Workflow Governance

**Scope**: Automated validation, testing, and deployment for all code changes
**Agents Involved**: Dev-Lead (CI/CD orchestration), Architect (deployment strategy), PM (release coordination)
**Key Documents**: [documents.workflows.md](.github/workflows/documents.workflows.md), [architecture-design.md](../docs/prd/architecture-design.md), [tech-spec.md](../docs/prd/tech-spec.md), [coding.instructions.md](../instructions/coding.instructions.md)

**Version Control**: Git with feature branches → develop → main
**Issue Tracking**: GitHub Issues with CI/CD status checks and deployment logs
**Deployment Strategy**: Progressive rollout from dev → staging → production

---

## CI/CD Pipeline Stages Overview

```
Developer Commits Code
        ↓
[STAGE 1] CONTINUOUS INTEGRATION
├─ Checkout code
├─ Build application
├─ Run unit tests
├─ Run integration tests
├─ Code quality analysis
├─ Security scanning
└─ Report results → GitHub
        ↓
[IF PASSED] → Artifacts staged
[IF FAILED] → Notify developer, block merge
        ↓
[STAGE 2] CONTINUOUS TESTING
├─ Deploy to test environment
├─ Run BDD scenarios
├─ Run API tests
├─ Run e2e tests
├─ Performance testing (Phase 3+)
└─ Report results → GitHub
        ↓
[IF PASSED] → Ready for deployment
[IF FAILED] → Block deployment, notify team
        ↓
[STAGE 3] CONTINUOUS DEPLOYMENT
├─ Deploy to dev environment (Phase 1)
├─ Deploy to staging environment (Phase 2+)
├─ Deploy to production (Phase 3+)
├─ Health checks & smoke tests
├─ Rollback if needed
└─ Mark deployment complete
        ↓
[STAGE 4] CONTINUOUS MONITORING
├─ Application health monitoring
├─ Error tracking & alerting
├─ Performance metrics collection
├─ User feedback aggregation (Phase 2+)
└─ Update iteration-planning.md
```

---

## Project Phases & CI/CD Evolution

### PHASE 1: PROJECT BOOTSTRAP (Initial Development)

**Duration**: Weeks 1-4 of development
**Goal**: Establish basic CI/CD pipeline for rapid development
**Approach**: Simplistic but sufficient for MVP validation

#### Phase 1 Characteristics
- Minimal automation, focused on blocking critical errors
- Deploy directly to development environment
- Manual testing on staging environment
- Basic code quality checks
- Simple artifact management

#### Phase 1 Continuous Integration Pipeline

```
Trigger: Push to feature branch
        ↓
Stage 1.1: Build
├─ Checkout code
├─ Install dependencies
│  ├─ Backend: mvn clean install -DskipTests
│  └─ Frontend: npm install
├─ Build application
│  ├─ Backend: mvn package
│  └─ Frontend: ng build
└─ Report: Build success/failure

Stage 1.2: Unit Tests
├─ Backend: mvn test
├─ Frontend: ng test --watch=false
└─ Report: Test results + coverage
        ↓
Stage 1.3: Code Quality (Minimal)
├─ Linting checks (ESLint for frontend, Checkstyle for backend)
├─ Basic code analysis
└─ Report: Quality warnings (non-blocking)
        ↓
Stage 1.4: Security Scan (Basic)
├─ Dependency vulnerability check (npm audit, OWASP)
└─ Report: Vulnerabilities (blocking if critical)
        ↓
RESULT: Build status reported to GitHub
```

#### Phase 1 Continuous Deployment Pipeline

```
Trigger: Pull Request Merged to develop
        ↓
Stage 2.1: Deploy to Dev Environment
├─ Create deployment artifacts
├─ Deploy backend microservices
├─ Deploy frontend application
├─ Update database schema (if needed)
└─ Run smoke tests
        ↓
Stage 2.2: Manual Testing (QA/BA)
├─ BA Agent executes BDD scenarios manually
├─ Test with real test data
├─ Verify against acceptance criteria
└─ Mark as tested or request fixes
        ↓
RESULT: Feature available in dev environment for testing
```

#### Phase 1 Quality Gates

- ❌ BLOCK merge if: Build fails
- ❌ BLOCK merge if: Critical security vulnerabilities found
- ⚠️ WARN on merge if: Test coverage < 60%
- ⚠️ WARN on merge if: Linting violations exist
- ✅ ALLOW merge if: Build passes + no critical vulnerabilities

#### Phase 1 Monitoring

- Application health checks every 5 minutes
- Error logs aggregated in central dashboard
- Manual daily review of application logs
- Feedback collected through manual testing sessions

#### Phase 1 Automated Tasks

**Triggered on Every Commit**:
- `mvn clean install && mvn test` (Backend)
- `npm install && npm test` (Frontend)
- ESLint + Prettier formatting check

**Triggered on PR Merge**:
- Package application artifacts
- Deploy to dev environment
- Run smoke tests
- Notify team of deployment

**Agents Involved in Phase 1**:
- **Dev-Lead**: Monitors CI/CD status, fixes broken builds, approves deployments
- **BA Agent**: Manually tests features in dev environment, provides feedback
- **Architect**: Reviews deployment logs for infrastructure issues

---

### PHASE 2: STABILIZATION & SCALING (Mid-Development)

**Duration**: Weeks 5-8 of development
**Goal**: Add automated testing and staging environment
**Approach**: More sophisticated pipeline with quality gates

#### Phase 2 Characteristics
- Automated end-to-end testing added
- Staging environment mirrors production
- Performance testing baseline established
- Automated deployments to staging
- Multiple approval gates before production

#### Phase 2 Continuous Integration Pipeline

```
Trigger: Push to feature branch
        ↓
Stage 1.1: Build
├─ (Same as Phase 1)
        ↓
Stage 1.2: Unit Tests
├─ (Same as Phase 1 + coverage reporting)
├─ Report: Coverage trend analysis
        ↓
Stage 1.3: Code Quality (Enhanced)
├─ SonarQube analysis (code smell detection)
├─ Architecture compliance checks
│  ├─ Verify layer separation maintained
│  └─ Validate API contracts
├─ Design system compliance check (frontend)
└─ Report: Quality metrics dashboard
        ↓
Stage 1.4: Security Scan (Enhanced)
├─ SAST (Static Application Security Testing)
├─ OWASP dependency check
├─ Container image scanning
└─ Report: Security scorecard
        ↓
RESULT: Build status with quality metrics
```

#### Phase 2 Continuous Testing Pipeline

```
Trigger: Pull Request Merged to develop
        ↓
Stage 2.1: Integration Tests
├─ Backend: mvn verify (integration test suite)
├─ API contract testing
└─ Database integration tests
        ↓
Stage 2.2: Deploy to Staging Environment
├─ Deploy all services to staging
├─ Run database migrations
├─ Apply test data seed
└─ Verify all services healthy
        ↓
Stage 2.3: Automated BDD Testing
├─ Execute all Gherkin scenarios (Cucumber/BDD)
├─ Run against staging environment
├─ Test with realistic data volumes
└─ Report: Test results + coverage
        ↓
Stage 2.4: End-to-End Testing
├─ Frontend e2e tests (Cypress/Selenium)
├─ User workflow validation
├─ Cross-browser compatibility (Phase 2.5+)
└─ Report: e2e test results
        ↓
Stage 2.5: Performance Baseline Testing
├─ API response time tests
├─ Frontend load time tests
├─ Database query performance tests
└─ Report: Performance metrics vs baseline
        ↓
RESULT: All tests automated, quality gates enforced
```

#### Phase 2 Continuous Deployment Pipeline

```
Trigger: All tests pass on develop branch
        ↓
Stage 3.1: Deploy to Staging
├─ Create release candidate artifacts
├─ Deploy to staging environment
├─ Run smoke tests
└─ Notify team: "Ready for approval"
        ↓
Stage 3.2: Approval Gate (Dev-Lead + Architect)
├─ Review deployment logs
├─ Verify all systems healthy
├─ Inspect release notes
└─ Approve or reject deployment
        ↓
[IF APPROVED] → Deploy to Production (limited rollout)
[IF REJECTED] → Block deployment, notify team
        ↓
Stage 3.3: Canary Deployment to Production
├─ Deploy to 10% of production instances
├─ Monitor error rates + latency
├─ Validate health checks passing
└─ Wait 30 minutes for stability
        ↓
[IF STABLE] → Roll out to 100%
[IF ISSUES] → Automatic rollback
        ↓
Stage 3.4: Production Health Verification
├─ Smoke tests on production
├─ Error rate monitoring
├─ Performance validation
└─ Notify team: "Deployment complete"
        ↓
RESULT: Feature deployed with automated rollback capability
```

#### Phase 2 Quality Gates

- ❌ BLOCK deployment if: Any test fails
- ❌ BLOCK deployment if: Code coverage declined
- ❌ BLOCK deployment if: Security vulnerabilities (high/critical)
- ❌ BLOCK deployment if: Architecture violations detected
- ⚠️ WARN if: Code quality score declined
- ⚠️ WARN if: Performance degraded > 5%
- ✅ ALLOW if: All checks pass + approval obtained

#### Phase 2 Monitoring

- Real-time error tracking (Sentry, Rollbar, or similar)
- Application performance monitoring (New Relic, Datadog)
- Health checks every 2 minutes
- Automated alerting on critical errors
- Daily performance reports

#### Phase 2 Automated Tasks

**Triggered on Every Commit**:
- All Phase 1 tasks
- `mvn verify` (Backend integration tests)
- SonarQube analysis

**Triggered on PR Merge**:
- All Phase 1 tasks
- Deploy to staging environment
- Run automated BDD tests
- Run e2e tests
- Generate quality reports
- Wait for approval before production

**Agents Involved in Phase 2**:
- **Dev-Lead**: Approves staging deployments, reviews quality metrics
- **Architect**: Validates architecture compliance, approves production deployments
- **BA Agent**: Validates BDD test results, provides functional feedback
- **PM Agent**: Coordinates release timing with stakeholders

---

### PHASE 3: OPTIMIZATION & RELIABILITY (Mature Development)

**Duration**: Weeks 9+ (ongoing)
**Goal**: Full automation with advanced monitoring and optimization
**Approach**: Continuous optimization and proactive monitoring

#### Phase 3 Characteristics
- Fully automated deployment pipeline
- Blue-green deployments with zero downtime
- Comprehensive monitoring and observability
- Predictive alerting and anomaly detection
- Continuous performance optimization

#### Phase 3 Continuous Integration Pipeline

```
Trigger: Push to feature branch
        ↓
Stage 1.1-1.4: All Phase 2 stages
        ↓
Stage 1.5: Advanced Code Analysis
├─ Mutation testing (verify test quality)
├─ Complexity analysis (McCabe, cyclomatic)
├─ Architecture impact analysis
├─ Database schema evolution validation
└─ Report: Advanced metrics dashboard
        ↓
Stage 1.6: Security Scanning (Advanced)
├─ DAST (Dynamic Application Security Testing)
├─ Infrastructure-as-Code scanning
├─ Secret detection (API keys, passwords)
└─ Report: Security scorecard with trends
        ↓
RESULT: Comprehensive quality and security analysis
```

#### Phase 3 Continuous Testing Pipeline

```
Trigger: All Phase 2 tests pass
        ↓
Stage 2.1-2.5: All Phase 2 stages
        ↓
Stage 2.6: Load Testing
├─ Simulate production traffic volume
├─ Identify performance bottlenecks
├─ Validate auto-scaling thresholds
└─ Report: Load test results
        ↓
Stage 2.7: Chaos Engineering Tests
├─ Inject failures and test resilience
├─ Verify failover mechanisms
├─ Test recovery automation
└─ Report: Resilience verification
        ↓
Stage 2.8: Accessibility Testing
├─ Automated WCAG 2.1 compliance checks
├─ Screen reader compatibility
└─ Report: Accessibility score
        ↓
RESULT: Comprehensive quality assurance
```

#### Phase 3 Continuous Deployment Pipeline

```
Trigger: All tests pass, all approvals obtained
        ↓
Stage 3.1-3.4: Canary deployment (Phase 2)
        ↓
Stage 3.5: Blue-Green Deployment
├─ Full deployment to alternate environment
├─ Run comprehensive smoke tests
├─ Switch traffic gradually (90% → 100%)
├─ Monitor for errors/anomalies
└─ Keep old version running for instant rollback
        ↓
Stage 3.6: Post-Deployment Validation
├─ Advanced monitoring dashboard
├─ Synthetic transaction tests
├─ User experience monitoring (RUM)
├─ Database performance validation
└─ Report: Deployment success metrics
        ↓
Stage 3.7: Continuous Optimization
├─ Performance analysis
├─ Cost optimization review
├─ Infrastructure utilization analysis
└─ Update architecture-design.md with findings
        ↓
RESULT: Zero-downtime deployment with optimization
```

#### Phase 3 Quality Gates

- ❌ BLOCK if: Any Phase 2 gate triggered
- ❌ BLOCK if: Mutation test score declined
- ❌ BLOCK if: Chaos engineering tests failed
- ❌ BLOCK if: Load test performance degraded > 10%
- ⚠️ WARN if: Any metric shows concerning trend
- ✅ ALLOW if: All gates pass + 2+ approvals obtained

#### Phase 3 Monitoring

- Observability stack: Prometheus, Grafana, ELK Stack
- Distributed tracing (Jaeger, Datadog)
- Real User Monitoring (RUM)
- Infrastructure monitoring
- Cost optimization tracking
- Predictive alerting based on trends

#### Phase 3 Automated Tasks

**Triggered on Every Commit**:
- All Phase 2 tasks
- Mutation testing
- Advanced code analysis
- DAST security scanning

**Triggered on PR Merge**:
- All Phase 2 tasks
- Load testing
- Chaos engineering tests
- Accessibility testing
- Generate comprehensive reports
- Multi-step approval workflow

**Agents Involved in Phase 3**:
- **Dev-Lead**: Manages complex deployment scenarios, optimizes pipeline
- **Architect**: Approves infrastructure changes, reviews optimization findings
- **PM Agent**: Coordinates releases, tracks time-to-production metrics
- **BA Agent**: Validates business impact of performance changes

---

## CI/CD Pipeline Implementation Details

### Technology Stack

**Continuous Integration**:
- **Platform**: GitHub Actions
- **Build Tools**: Maven (Java), npm (Node.js/Angular)
- **Testing**: JUnit 5, Mockito (Java), Jasmine/Karma (Angular)
- **Code Quality**: SonarQube, ESLint, Checkstyle
- **Security**: OWASP Dependency Check, Snyk

**Continuous Deployment**:
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Phase 2+)
- **Registry**: Docker Hub or Private Registry
- **Deployment Tool**: GitOps tool (ArgoCD, Flux) (Phase 2+)

**Monitoring & Observability**:
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Error Tracking**: Sentry or Rollbar
- **APM**: New Relic or Datadog

### Branch Strategy

```
main (production-ready)
  ↑
  ├─← master (stable releases)
  │
develop (integration branch)
  ↑
  ├─← feature/* (feature development)
  ├─← bugfix/* (bug fixes)
  ├─← hotfix/* (production hotfixes)
  └─← refactor/* (code improvements)
```

**Merge Requirements**:
- All CI checks pass
- Code review approved
- No merge conflicts
- At least 1 approval (Phase 1)
- At least 2 approvals (Phase 2+)
- CODEOWNERS approval (if configured)

### Artifact Management

**Phase 1**: Store in GitHub Actions cache
**Phase 2**: Container registry (Docker Hub, ECR, GCR)
**Phase 3**: Multi-region registry with cache optimization

**Artifact Retention**:
- Keep latest 10 releases
- Keep releases for 90 days
- Delete old feature branch artifacts after 7 days

### Rollback Strategy

**Phase 1**: Manual rollback via redeployment
**Phase 2**: One-click rollback to previous version (30 min window)
**Phase 3**: Instant rollback via blue-green switching (any time)

---

## CI/CD Commands & Scripts

### Local Development (Pre-Commit)

```bash
# Backend verification
cd backend
mvn clean test
mvn clean package
mvn checkstyle:check

# Frontend verification
cd frontend
npm test -- --watch=false
ng lint
ng build
```

### GitHub Actions (Automated)

All automated via GitHub Actions workflows triggered on:
- Push to feature branch
- Pull request creation
- Merge to develop branch
- Merge to main branch

### Manual Commands (Dev-Lead)

```bash
# Force deployment to staging
gh workflow run deploy-staging.yml -f version=v1.2.3

# Manually trigger rollback
gh workflow run rollback.yml -f version=v1.2.2

# Run performance tests
gh workflow run performance-tests.yml -f environment=staging
```

---

## Failure Scenarios & Recovery

### Scenario 1: Build Failure

**Detection**: CI pipeline fails during build stage
**Notification**: GitHub notification to commit author
**Recovery**:
1. Dev identifies build error from CI logs
2. Commits fix to feature branch
3. CI re-runs automatically
4. Once fixed, PR can be merged

**Dev-Lead Involvement**: Monitor build queue, unblock high-priority fixes

### Scenario 2: Test Failure

**Detection**: Unit, integration, or e2e test fails
**Notification**: GitHub check fails, blocks merge
**Recovery**:
1. Developer reviews test failure
2. Either: Fix code to pass test OR Update test if requirements changed
3. Commit fix and CI re-runs
4. Once passing, PR can be merged

**Dev-Lead Involvement**: Review test relevance, approve test changes

### Scenario 3: Deployment Failure

**Detection**: Health checks fail or smoke tests fail post-deployment
**Notification**: Deployment blocked, team notified
**Recovery (Phase 1)**:
1. Fix deployed and re-deploy manually
2. Verify health checks pass

**Recovery (Phase 2+)**:
1. Automatic rollback to previous version
2. Investigate failure
3. Fix committed and tested
4. Revert to new version when ready

**Architect Involvement**: Review infrastructure logs, identify root cause

### Scenario 4: Performance Degradation

**Detection**: Performance tests show > 10% slowdown
**Notification**: Deployment blocked until reviewed
**Recovery**:
1. Architect reviews performance impact
2. Either: Accept performance change OR require optimization
3. Dev optimizes code and re-tests
4. Once acceptable, deployment proceeds

**Architect Involvement**: Approve performance trade-offs

---

## Integrations with Other Workflows

### Integration with [documents.workflows.md](.github/workflows/documents.workflows.md)

- **Test Strategies Document** (Stage 5): Defines test coverage requirements that CI/CD validates
- **Tech Spec Document** (Stage 4): Deployment targets and infrastructure defined here
- **Architecture Document** (Stage 3): Architecture rules enforced by CI/CD compliance checks

### Integration with [code-generation.workflows.md](.github/workflows/code-generation.workflows.md)

- **Phase 3 (TDD Development)**: Code committed after RED→GREEN→REFACTOR cycle
- **CI/CD Pipeline**: Automatically validates code via build and unit tests
- **Phase 4 (BDD Testing)**: BA executes tests on deployed version in test environment
- **Feedback Loop**: Test failures trigger developer fixes before deployment

### Integration with [architecture-design.md](../docs/prd/architecture-design.md)

- **Architecture Validation**: CI/CD checks verify code respects architectural patterns
- **Layer Separation**: Compilation checks prevent layer violations
- **API Contracts**: CI/CD validates APIs match documented contracts

### Integration with [coding.instructions.md](../instructions/coding.instructions.md)

- **Code Standards**: Linting and quality checks enforce coding standards
- **Continuous Improvement**: When violations found, coding.instructions.md updated by Dev-Lead
- **Quality Gates**: CI/CD enforces updated standards on future commits

---

## Agent Responsibilities in CI/CD

### Dev-Lead Agent

**Responsibilities**:
- Monitor CI/CD pipeline status
- Approve staging and production deployments
- Review deployment logs for issues
- Fix broken builds quickly
- Update coding.instructions.md based on CI/CD findings
- Optimize pipeline performance

**Authority**:
- Approve/reject deployments
- Bypass non-critical quality gates (with justification)
- Modify CI/CD configuration

**Invocation**: `dev-lead-deployment-approval`, `dev-lead-pipeline-optimization`

### Architect Agent

**Responsibilities**:
- Validate architecture compliance in CI/CD checks
- Approve architectural changes
- Review performance impact of deployments
- Plan infrastructure scaling based on metrics
- Assess security scan results
- Update architecture-design.md based on learnings

**Authority**:
- Approve/reject deployments affecting architecture
- Approve technology stack changes
- Decide on performance/cost trade-offs

**Invocation**: `architect-deployment-approval`, `architect-performance-review`

### Project Manager Agent

**Responsibilities**:
- Coordinate release timing with stakeholders
- Track deployment frequency and success rate
- Manage deployment windows
- Monitor time-to-production metrics
- Report CI/CD health to leadership

**Authority**:
- Decide release timing
- Schedule maintenance windows

**Invocation**: `pm-release-coordination`, `pm-deployment-scheduling`

### Business Analyst Agent

**Responsibilities**:
- Validate BDD test results in CI/CD
- Confirm feature behavior matches acceptance criteria
- Report functional validation results
- Update iteration-planning.md based on test results

**Invocation**: `ba-bdd-test-validation`, `ba-feature-acceptance`

---

## Success Metrics

### Efficiency Metrics
- **Build Time**: < 10 minutes (Phase 1), < 5 minutes (Phase 2+)
- **Deployment Frequency**: 1-4 deployments/day (Phase 2+)
- **Time to Deployment**: < 30 minutes from merge to production (Phase 2+)

### Quality Metrics
- **Build Success Rate**: > 95%
- **Test Pass Rate**: 100% before deployment
- **Code Coverage**: > 80% (Phase 2+)
- **Deployment Failure Rate**: < 5% (Phase 1), < 1% (Phase 2+)

### Reliability Metrics
- **Deployment Rollback Rate**: < 10% (Phase 1), < 5% (Phase 2), < 1% (Phase 3)
- **Mean Time to Recovery**: < 30 minutes
- **System Uptime**: > 99.5% (Phase 2+), > 99.9% (Phase 3)

### Security Metrics
- **Critical Vulnerabilities**: 0 in production
- **High Vulnerabilities**: < 5 in production
- **Security Scan Pass Rate**: 100% before deployment

---

## Related Documents

- [documents.workflows.md](.github/workflows/documents.workflows.md) - PDLC document generation
- [code-generation.workflows.md](.github/workflows/code-generation.workflows.md) - Development execution
- [architecture-design.md](../docs/prd/architecture-design.md) - System architecture
- [tech-spec.md](../docs/prd/tech-spec.md) - Implementation specifications
- [test-strategies.md](../docs/prd/test-strategies.md) - Testing approach
- [coding.instructions.md](../instructions/coding.instructions.md) - Code standards

---

## CI/CD Evolution Summary

| Aspect | Phase 1 | Phase 2 | Phase 3 |
|--------|---------|---------|---------|
| **Build Time** | 10 min | 5 min | 3 min |
| **Test Coverage** | Unit only | Unit + Integration + e2e | All + Load + Chaos |
| **Environments** | Dev only | Dev + Staging | Dev + Staging + Prod |
| **Deployments** | Manual | Automated (staging) | Fully automated |
| **Deployment Safety** | Basic checks | Approval gates | Blue-green + rollback |
| **Monitoring** | Logs only | Real-time dashboards | Observability stack |
| **Performance Testing** | Manual | Automated baseline | Continuous optimization |
| **Rollback** | Manual redeployment | One-click (30 min) | Instant blue-green |

This CI/CD workflow provides a scalable, phased approach to automation that grows with your project maturity.
