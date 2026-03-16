# New Meeting Folder Creation Prompt

## Objective
Create a standardized meeting folder structure for capturing raw materials (transcripts, notes, recordings) and generating meeting minutes following Gen-e2 repository conventions.

## Context
You are organizing a new meeting or interview session as part of a Gen-e2 assessment engagement. The folder structure must comply with repository naming conventions and provide proper organization for raw materials and deliverables.

## Requirements

### Meeting Information Needed
Before creating the folder, gather:
- **Date**: Meeting date in YYYYMMDD format
- **Type**: Meeting type (Workshop, one2one, Interview, Planning Session, etc.)
- **Topic**: Brief topic description (hyphen-separated, no special characters)
- **Participant(s)**: Primary participant name(s)
- **Location**: If not provided, ask the user to specify the appropriate directory

### Directory Structure to Create
```
[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]/
├── RAW/
│   └── [raw materials: transcripts, audio, notes, etc.]
└── [YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md (meeting minutes)
```

### Naming Convention Standards

**Folder Name Format**: `[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]`

Examples:
- `20251124_ai-driven-sdlc-workshop_john-smith/`
- `20251113_project-mvp_jane-doe/`
- `20251124_planning-session_alex-johnson/`

**Meeting Minutes File Format**: `[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md`

Examples:
- `20251124_ai-driven-sdlc-workshop_john-smith_CR.md`
- `20251113_project-mvp_jane-doe_CR.md`
- `20251124_planning-session_alex-johnson_CR.md`

**Note**: Use kebab-case (lowercase with hyphens) for all topics and participant names. Underscores separate the main components (date, topic, participant, CR).

## Deliverables

### 1. Create Directory Structure
Based on provided meeting information, create:
```bash
# Navigate to appropriate location (ask user if not specified)
cd [specified-location]

# Create folder structure
mkdir -p "[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]/RAW"
```

### 2. Create Placeholder Files
Inside the RAW folder, create `.gitkeep` to ensure folder is tracked:
```bash
touch "[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]/RAW/.gitkeep"
```

### 3. Initialize Meeting Minutes File
Create the CR file with basic metadata:
```bash
touch "[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]/[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md"
```

## Quality Standards

### Naming Compliance
- ✅ Date format: YYYYMMDD (8 digits, no separators)
- ✅ Underscore `_` separates main components (date, topic, participant)
- ✅ Kebab-case (lowercase with hyphens) for topics and participant names
- ✅ No spaces or special characters except hyphens and underscores
- ✅ All lowercase for folder and file names
- ✅ `.md` extension for meeting minutes
- ✅ `_CR` suffix for meeting minutes (Compte Rendu)

### Directory Location
- ✅ Project meetings: `[project-name]/meetings/`
- ✅ Assessment meetings: `01-assess/docs/meetings/`
- ✅ Context meetings: `00-context/docs/meetings/`
- ✅ If location unclear, ask user to specify the appropriate directory

### Folder Contents
- ✅ RAW subfolder exists with `.gitkeep`
- ✅ CR file created at folder root level
- ✅ Clear separation between raw materials and deliverables
- ✅ Consistent with existing repository structure

## File Management

### Raw Materials Storage
Place in `RAW/` subfolder:
- Transcript files (.txt, .vtt, .srt)
- Audio/video recordings (if applicable)
- Handwritten notes scans
- Presentation slides
- Any source materials used for meeting minutes

### Meeting Minutes Location
Place at folder root level:
- `[YYYYMMDD]_[topic-in-kebab-case]_[participant-name-in-kebab-case]_CR.md`

### Example Complete Structure
```
20251124_ai-driven-sdlc-workshop_john-smith/
├── RAW/
│   ├── .gitkeep
│   ├── 20251124-workshop-transcript.txt
│   └── 20251124-workshop-slides.pdf
└── 20251124_ai-driven-sdlc-workshop_john-smith_CR.md
```

## Usage Instructions

To use this prompt:

1. **Gather Meeting Information**: Collect date, type, topic, and participant name(s)
2. **Determine Location**: Identify correct deliverables folder based on meeting purpose
3. **Execute Creation**: Run commands or use VS Code to create folder structure
4. **Verify Compliance**: Check naming against standards above
5. **Add to Index**: Update INDEX.md if folder represents new deliverable category

## Example Prompt Usage

```
Create a new meeting folder for:
- Date: November 27, 2025
- Type: Workshop
- Topic: Task Force AI Driven SDLC
- Participant: John Smith
- Location: 01-assess/docs/meetings/

Expected output: 
01-assess/docs/meetings/20251127_task-force-ai-driven-sdlc_john-smith/
├── RAW/.gitkeep
└── 20251127_task-force-ai-driven-sdlc_john-smith_CR.md
```

---

**Last Updated:** December 05, 2025  
**Maintained By:** Palo IT Assessment Team  
**Version:** 1.0  
**Scope:** Meeting organization and documentation structure  
**Usage:** Creating standardized folders for Gen-e2 assessment meetings and interviews