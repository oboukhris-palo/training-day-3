# Generate Meeting Minutes Prompt

## Objective
Generate comprehensive meeting minutes from raw materials (transcripts, notes, recordings) following Gen-e2 repository conventions and professional documentation standards.

## Context
You are documenting a meeting or interview session. The meeting folder structure should already exist (created using `new-meeting-folder.prompt.md`), and raw materials are available for processing into formal meeting minutes.

**Prerequisites**: Meeting folder created with the following structure:
```
[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]/
├── RAW/
│   └── [raw materials: transcripts, audio, notes, etc.]
└── [YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md (to be filled)
```

## Requirements

### Source Materials Location
Raw materials should be located in the meeting folder's `RAW/` subfolder:
- Transcript files (.txt, .vtt, .srt)
- Audio/video recordings (if applicable)
- Handwritten notes or scans
- Presentation slides or supporting documents

### Meeting Minutes File
The target file for meeting minutes:
- **Location**: Meeting folder root level
- **Format**: `[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md`

## Deliverables

Follow the structure defined in `.gene2-core/templates/interviews/interview-minutes-generic-tmpl.md`:

### 1. Meeting Information
Include complete metadata:
- **Date:** YYYYMMDD formatted
- **Time:** Start - End Time
- **Meeting Type:** Workshop | Discussion | Planning Session | Status Update | Decision Meeting | Brainstorming
- **Participants:** List with roles/titles and organizations
- **Duration:** XX minutes/hours
- **Location/Format:** Physical/Remote/Hybrid
- **Objective:** Primary meeting goal and expected outcomes

### 2. Context & Background

#### Meeting Focus Area
- **Topic:** Subject matter or domain being discussed
- **Scope:** Boundaries of discussion (what's in scope and out of scope)
- **Current Situation:** Relevant background and current state
- **Key Stakeholders:** People or groups affected by or involved in the discussion

#### Organizational Context *(Optional - include if relevant)*
- **Team/Department:** Relevant organizational unit
- **Related Initiatives:** Connected projects or programs
- **Decision Authority:** Who has authority to make decisions on discussed topics

### 3. Key Discussion Points

For each topic area, include:

- **Discussion Summary:** Main points discussed, key information shared, data/metrics mentioned
- **Key Points:** Specific points with descriptions
- **Decisions Made:** ✅ Decisions with rationale
- **Questions Raised:** ❓ Questions with any partial answers or follow-up needed
- **Key Quotes & Insights:** Direct quotes with speaker attribution and context

*Repeat this structure for each major discussion topic*

### 4. Decisions Made

#### Key Decisions
For each decision:
- ✅ **Decision:** What was decided
  - **Rationale:** Why this decision was made
  - **Impact:** Who/what this affects
  - **Owner:** Person responsible for implementation

#### Deferred Decisions
- 🔄 **Decision:** What needs to be decided later and why it was deferred

### 5. Action Items & Follow-ups

#### Immediate Actions
- [ ] Action items with assignments and due dates

#### Information Gathering
- [ ] Information needed with source and priority (High/Medium/Low)

#### Stakeholder Connections
- [ ] People to contact with roles and purpose
- [ ] Teams to engage with context and timing

#### Parking Lot / Open Issues
- 🔄 Issues/topics with context (why parked) and when to revisit

#### Risks Identified
- ⚠️ Risks with descriptions and potential impact

### 6. Appendices

#### A. Referenced Materials
- **Documents:** List of documents referenced or reviewed
- **Systems/Tools:** Systems, tools, or platforms discussed
- **Links:** URLs or locations for additional information

#### B. Participants & Stakeholders *(Optional)*
- **Decision Makers:** People with decision authority on discussed topics
- **Subject Matter Experts:** Technical or domain experts consulted
- **Affected Parties:** People or teams impacted by decisions
- **Additional Contacts:** Other relevant stakeholders

### 7. Meeting Effectiveness

#### Participant Engagement
- **Engagement Level:** High/Medium/Low
- **Participation Balance:** Balanced/Dominated by few/Uneven
- **Discussion Quality:** Productive/Needs focus/Off-track

#### Meeting Outcomes
- **Objectives Achieved:** Yes/Partially/No with explanation
- **Time Management:** Effective/Could improve/Ran over
- **Decision Quality:** Clear decisions made/Some clarity/Needs follow-up

#### Next Steps
- **Follow-up Meeting:** Date/Not scheduled/Not needed
- **Meeting Cadence:** Frequency if recurring meeting
- **Additional Participants Needed:** Who else should be involved
- **Topics for Next Meeting:** What to discuss next

### 8. Document Footer
Complete with metadata:
- **Prepared by:** Meeting facilitator/note taker
- **Date Finalized:** YYYYMMDD
- **Review Status:** Draft/Reviewed/Final
- **Version:** Version number (e.g., 1.0)
- **Distribution:** Who should receive this document
- **Confidentiality:** Internal/Restricted/Public
- **Related Documents:** Links to related meeting minutes, project docs, or decisions
- **Meeting Series:** Name if part of recurring series, or N/A

*Include engagement/project context statement at the bottom*

## Quality Standards

### Content Requirements
- ✅ Complete and accurate capture of all discussion points
- ✅ Clear attribution of quotes and key statements
- ✅ Balanced representation of all participants' perspectives
- ✅ Actionable items with clear ownership and deadlines
- ✅ Context provided for decisions and agreements
- ✅ Professional tone and language throughout

### Formatting Standards
- ✅ Consistent markdown formatting
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Use of bullet points and numbered lists where appropriate
- ✅ Code blocks for technical content or examples
- ✅ Blockquotes for direct quotes
- ✅ Emoji indicators for status (✅ 🔄 ⚠️ ❓ 🔴 🟡 🟢)

### Evidence & Accuracy
- ✅ All information directly traceable to source materials
- ✅ No speculation or assumptions beyond provided content
- ✅ Timestamps or references to source materials when available
- ✅ Acknowledgment of gaps or unclear information
- ✅ Confidence assessment for interpretations if needed

### Professional Standards
- ✅ Objective and neutral language
- ✅ Respectful representation of all participants
- ✅ Clear and concise writing
- ✅ Proper grammar and spelling
- ✅ Appropriate level of detail (not too verbose, not too brief)

## File Management

### Input Sources
Read from meeting folder's `RAW/` subfolder:
- Primary transcript file
- Supporting documents
- Any additional notes or materials

### Output Location
Write meeting minutes to:
- Meeting folder root level
- Filename: `[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md`

### Cross-References
Link to related documents:
- Reference templates used
- Link to related meeting minutes
- Reference assessment reports or deliverables

### Stakeholder Map Management
**MANDATORY:** Check `00-context/stakeholder-map.md` for:
- **Consistency & Accuracy:** Verify all participant names, titles, and roles match the stakeholder map
- **Missing Stakeholders:** If new stakeholders appear in the meeting who are not in the stakeholder map:
  1. Add them to the "To be Validated" section in `stakeholder-map.md`
  2. Include their name, tentative title/role, and source reference
  3. Add a link to the current meeting minutes CR file for traceability
  4. Format: `**[Name]** - [Tentative Title/Role] - **Source:** [Meeting Type] ([Date]), CR: [link to CR file]`

### Glossary Management
**MANDATORY:** Check `00-context/glossary.md` for:
- **Consistency & Accuracy:** Verify all technical terms, acronyms, and organization-specific terminology match the glossary
- **New Terms:** If new terminology appears in the meeting that is not in the glossary:
  1. Add them to the "To be Validated" section in `glossary.md`
  2. Include the term, tentative definition/context, and source reference
  3. Add a link to the current meeting minutes CR file for traceability
  4. Format: `**[Term/Acronym]** - [Tentative Definition] - **Source:** [Meeting Type] ([Date]), CR: [link to CR file]`
- **Categories:** Consider which section the term belongs to based on the glossary structure (organizational terms, technical platforms, methodologies, industry standards, etc.)

## Processing Instructions

1. **Read all raw materials** in the meeting folder's RAW/ subfolder
2. **Extract meeting metadata** (date, participants, duration, purpose)
3. **Check stakeholder map** (`00-context/stakeholder-map.md`) for participant name/title consistency
4. **Check glossary** (`00-context/glossary.md`) for terminology consistency and completeness
5. **Identify missing stakeholders** not in the map and prepare entries for "To be Validated" section
6. **Identify new terms/acronyms** not in the glossary and prepare entries for "To be Validated" section
7. **Identify main discussion topics** and organize chronologically
8. **Capture key quotes** with proper attribution
9. **Document all decisions, agreements, and action items**
10. **Note questions raised** (both answered and unresolved)
11. **Assess meeting effectiveness** and next steps
12. **Format consistently** following the template structure
13. **Validate accuracy** against source materials
14. **Update stakeholder map** if new stakeholders found (add to "To be Validated" section with CR link)
15. **Update glossary** if new terms found (add to "To be Validated" section with CR link)
16. **Save to root level** of meeting folder with proper filename

## Usage Example

```
Generate meeting minutes for the folder:
00-context/01-initial-scope/meetings/20251205_first-briefing_cyril-limont/

Source materials:
- RAW/20251205-briefing-transcript.txt
- RAW/20251205-briefing-notes.pdf

Output file:
20251205_first-briefing_cyril-limont_CR.md

The meeting minutes should capture all discussion points,
decisions made, and action items for next steps.
```

---

**Last Updated:** December 5, 2025  
**Maintained By:** Assessment Team  
**Version:** 1.1  
**Scope:** Meeting documentation and minutes generation  
**Usage:** Creating professional meeting minutes from raw materials in meeting folders created by new-meeting-folder.prompt.md