---
description: Create a new Git branch and push it to GitHub remote repository
agent: agent
---

# Create and Push New Branch to GitHub

## Objective
Create a new Git branch with a user-provided name and push it to the GitHub remote repository, establishing tracking between the local and remote branches.

## Context
You are working with a Git repository that is connected to a GitHub remote. The user needs to create a new branch for feature development, bug fixes, or experimentation, and wants to immediately establish the branch on GitHub for collaboration and backup purposes.

## Requirements

### Prerequisites
- Git repository must be initialized and have a remote named 'origin'
- User must have push permissions to the GitHub repository
- Working directory should be clean (no uncommitted changes recommended)

### Branch Creation Process
1. **Accept Branch Name**: Receive the branch name from the user (e.g., "first-init", "feature/new-dashboard", "bugfix/login-issue")
2. **Create Local Branch**: Use `git checkout -b <branch-name>` to create and switch to the new branch
3. **Push to Remote**: Use `git push -u origin <branch-name>` to push the branch to GitHub and set up tracking

### Command Structure
```bash
git checkout -b <branch-name> && git push -u origin <branch-name>
```

Where:
- `git checkout -b <branch-name>`: Creates a new branch and switches to it
- `&&`: Ensures the push only happens if branch creation succeeds
- `git push -u origin <branch-name>`: Pushes the branch and sets upstream tracking
- `-u` flag: Sets up tracking relationship between local and remote branch

## Deliverables

### Success Outputs
- Confirmation message: "Switched to a new branch '<branch-name>'"
- Remote push confirmation with GitHub URL for creating a pull request
- Branch tracking status: "branch '<branch-name>' set up to track 'origin/<branch-name>'"

### User Feedback
Provide clear confirmation including:
- The name of the created branch
- Confirmation that the branch has been pushed to GitHub
- Current working branch status

## Quality Standards

### Validation Criteria
- ✅ Branch name follows project naming conventions (if applicable)
- ✅ Branch is successfully created locally
- ✅ Branch is successfully pushed to GitHub remote
- ✅ Tracking relationship is established between local and remote branch
- ✅ User receives clear confirmation of success

### Error Handling
Handle common scenarios:
- Branch name already exists locally
- Network connectivity issues
- Permission denied errors
- Invalid branch name characters

### Best Practices
- Verify current git status before creating branch
- Ensure working directory is clean or changes are committed/stashed
- Use descriptive branch names that indicate purpose
- Follow team branching conventions (e.g., feature/, bugfix/, hotfix/ prefixes)

## File Management
- No files are created or modified by this operation
- Git metadata is updated in `.git/` directory
- Remote tracking information is stored in Git configuration