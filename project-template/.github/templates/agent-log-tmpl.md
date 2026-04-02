---
metadata:
  # Document identification
  id: "LOG-{AGENT_NAME}-{YYYYMMDD}"         # Unique agent log identifier
  title: "Agent Log: {AGENT_NAME}"          # Human-readable log title
  version: "1.0.0"                          # Semantic version
  date: "{YYYY-MM-DD}"                      # Creation/last update date
  author: "{AGENT_NAME}"                    # Agent that created this log
  
  # Template and AI tracking
  template:
    source: ".github/templates/agent-log-tmpl.md"  # Template used
    compliance: "COMPLIANT"                        # Template adherence status
  
  ai_generation:
    model: "{MODEL_NAME}"                   # LLM model used (e.g., "claude-3.5-sonnet", "gpt-4")
    generation_date: "{YYYY-MM-DD}"         # When AI generated this document
  
  # Document relationships
  related_documents:
    agent_config: ".github/agents/{agent_name}.agent.md"  # Related agent configuration
    epic_story: "{EPIC_REF}/{US_REF}"      # Related epic and story (if applicable)
  
  # Status tracking
  status: "Active"                         # Log status (Active, Completed, Archived)
  
  # Classification
  classification: "Internal"               # Data classification level
  tags: ["agent-log", "{AGENT_NAME}", "{PHASE_NAME}"]  # Searchable tags
---

# Agent Log: {AGENT_NAME}

## {TIMESTAMP} | Action: {ACTION_DESCRIPTION} | Status: {STATUS}

- **Phase**: {PDLC_PHASE}
- **Epic/Story**: {EPIC_REF}/{US_REF} (if applicable)
- **Layer/Cycle**: {LAYER}/{CYCLE} (if applicable)
- **Files**: [{changed_files}]
- **PRU**: ~{estimate}
- **Status**: {success|failure|partial|blocked}
- **Changes**: {brief_description}
- **Blockers**: {none_or_description}
- **Next**: {next_agent} (if handoff)

---
