# TDD Cycle Handoff: {USER-STORY-REF} - Cycle {CYCLE_NUMBER}

**⚠️ FILE LOCATION: `docs/user-stories/{US-REF}/tdd-execution/{CYCLE_NUMBER}/{CYCLE_NUMBER}-HO-{PHASE}.{json|md}`**  
**⚠️ NOTE: This file is created ONCE per phase and becomes permanent historical record. Summary goes to append-only `tdd-execution.md`.**

---

## Handoff Context
- **Story**: {US-REF} - {STORY_TITLE}
- **Cycle**: {CYCLE_NUMBER}
- **Phase**: {RED/GREEN/REFACTOR}
- **Status**: COMPLETE
- **Branch**: feature/{feature-name}
- **Timestamp**: {ISO_8601_TIMESTAMP}
- **Duration**: {PHASE_DURATION}

## Phase Summary
{Brief description of what this phase accomplished}

**Example RED**: 
- ✅ Failing test written for User.tier sync assertion
- ✅ Test identifies exact requirement from BDD scenario
- ✅ Next phase: implement minimal UserTierSyncService.sync()

**Example GREEN**:
- ✅ Implemented UserTierSyncService.sync() minimal code
- ✅ All RED phase tests now passing
- ✅ Next phase: refactor for clarity and performance

**Example REFACTOR**:
- ✅ Extracted sync utility, improved naming conventions
- ✅ Added comprehensive error handling and logging
- ✅ All tests still passing, code quality improved

---

## BDD Scenario Progress
- **Total Scenarios**: {TOTAL_COUNT}
- **Passing**: {PASSING_COUNT}
- **Failing**: {FAILING_COUNT}
- **Next Target**: {NEXT_SCENARIO_NAME}

**Status Table**:
```
✅ auth-tier-sync.feature:5-12  "User tier updates when subscription changes"
⬜ auth-tier-sync.feature:14-21 "Bulk tier sync handles errors gracefully"  
⬜ auth-tier-sync.feature:23-30 "Sync preserves user data integrity"
```

---

## Files Modified This Phase
```
{FILE_LIST_WITH_CHANGES}
```

**Example**:
```
M  src/services/UserTierSyncService.ts     # Added sync() method, error handling
M  src/services/__tests__/UserTierSyncService.test.ts  # New assertions for sync behavior
A  src/models/Subscription.ts              # Created subscription model
M  src/models/User.ts                      # Added tier property validation
```

---

## Test Results
- **Test Count**: {TEST_COUNT}
- **Passing**: {PASSING_TEST_COUNT}
- **Coverage**: {COVERAGE_PERCENTAGE}%
- **Performance**: {EXECUTION_TIME}ms average

**Failed Tests** (if any):
```
{FAILED_TEST_LIST}
```

---

## Next Phase Instructions
{Detailed instructions for the next phase or next cycle}

### If This Was RED Phase:
**GREEN Phase Instructions**:
1. Implement minimal code to make failing tests pass
2. Focus on simplest possible solution (no premature optimization)
3. Target files: {TARGET_FILES}
4. Expected implementation time: {ESTIMATE}

### If This Was GREEN Phase:
**REFACTOR Phase Instructions**:
1. Improve code quality without changing behavior
2. Extract common utilities, improve naming, add comments
3. Run full test suite to ensure no regressions
4. Update tdd-execution.md audit log when complete

### If This Was REFACTOR Phase:
**Next Cycle Instructions**:
1. Identify next BDD scenario to implement
2. Create new cycle folder: `tdd-execution/{NEXT_CYCLE}/`
3. Start RED phase for: {NEXT_SCENARIO}
4. Estimated effort: {NEXT_CYCLE_ESTIMATE}

---

## Commit Information
- **Commit SHA**: {COMMIT_SHA}
- **Commit Message**: TDD-{US-REF}-{PHASE}-{CYCLE}: {DESCRIPTION}
- **Files Committed**: {COMMITTED_FILE_COUNT}
- **Branch Status**: {BRANCH_STATUS}

---

## Notes & Context
{Any additional context, decisions made, or issues encountered}

**Blockers** (if any):
- {BLOCKER_DESCRIPTION}

**Decisions Made**:
- {DECISION_1}
- {DECISION_2}

**Technical Debt** (to address later):
- {DEBT_ITEM_1}
- {DEBT_ITEM_2}

---

## Notes for Next Agent

### Must Know
- {Critical information next agent needs}
- Test assertions focus on [X behavior]
- Constraint: [Y from implementation-plan.md]

### Nice to Know
- {Context that's helpful but not critical}
- Earlier decision: [Z reason]

### Open Questions
- {If any decision needed from next agent}
- Clarification: [What needs resolving]

---

## Progress Metrics
- **Tests Passing**: {X}/{Y}
- **Complexity**: {Current cyclomatic complexity}
- **Coverage**: {Code coverage %}
- **Git Commits**: {Number in this cycle}

---

**See `tdd-execution.md` for complete cycle history and audit trail.**