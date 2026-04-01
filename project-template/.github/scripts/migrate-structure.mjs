#!/usr/bin/env node

/**
 * migrate-structure.mjs - One-time migration helper for Gen‑e2 compliance
 * 
 * This script migrates existing project structure to Gen‑e2 compliance:
 * - Moves old docs to PDLC-by-phase folders
 * - Renames <US-REF>.md to description.md
 * - Ensures required files exist or creates stubs
 * - Updates links using relative paths
 * - Creates logs directory structure
 * 
 * Usage: node .github/scripts/migrate-structure.mjs [--dry-run] [--force]
 * 
 * Part of Gen‑e2 Compliance and Professional Documentation framework
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

let migratedCount = 0;
let createdCount = 0;
let errors = [];
let dryRun = false;

/**
 * Log migration action
 */
function logAction(action, source, target = null, details = null) {
  const timestamp = new Date().toISOString();
  let message = `${timestamp} | ${action}: ${source}`;
  
  if (target) {
    message += ` → ${target}`;
  }
  
  if (details) {
    message += ` (${details})`;
  }
  
  console.log(dryRun ? `[DRY-RUN] ${message}` : message);
}

/**
 * Safe file/directory operations
 */
const safeOps = {
  ensureDir(dirPath) {
    if (!dryRun && !fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logAction('CREATE_DIR', path.relative(projectRoot, dirPath));
      createdCount++;
    }
  },
  
  moveFile(source, target) {
    if (!dryRun) {
      // Ensure target directory exists
      const targetDir = path.dirname(target);
      this.ensureDir(targetDir);
      
      // Move file
      fs.renameSync(source, target);
    }
    
    logAction('MOVE_FILE', 
      path.relative(projectRoot, source), 
      path.relative(projectRoot, target)
    );
    migratedCount++;
  },
  
  copyFile(source, target) {
    if (!dryRun) {
      const targetDir = path.dirname(target);
      this.ensureDir(targetDir);
      fs.copyFileSync(source, target);
    }
    
    logAction('COPY_FILE',
      path.relative(projectRoot, source),
      path.relative(projectRoot, target)
    );
    createdCount++;
  },
  
  writeFile(filePath, content) {
    if (!dryRun) {
      const dir = path.dirname(filePath);
      this.ensureDir(dir);
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    
    logAction('CREATE_FILE', path.relative(projectRoot, filePath));
    createdCount++;
  },
  
  updateFileContent(filePath, updater) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const newContent = updater(content);
        
        if (content !== newContent) {
          if (!dryRun) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
          }
          logAction('UPDATE_FILE', path.relative(projectRoot, filePath), null, 'link updates');
          migratedCount++;
        }
      }
    } catch (error) {
      errors.push(`Failed to update ${filePath}: ${error.message}`);
    }
  }
};

/**
 * Create PDLC phase directory structure
 */
function createPDLCStructure() {
  console.log('\n📁 Creating PDLC-by-phase directory structure...\n');
  
  const phases = [
    {
      dir: 'docs/00-assessment',
      desc: 'Phase 0: Client assessment and prerequisites'
    },
    {
      dir: 'docs/01-requirements', 
      desc: 'Phase 1-2: Requirements and personas (IMMUTABLE)'
    },
    {
      dir: 'docs/02-architecture',
      desc: 'Phase 3-4: Architecture and tech specs (IMMUTABLE)'  
    },
    {
      dir: 'docs/03-testing',
      desc: 'Phase 5: Testing strategies (IMMUTABLE)'
    },
    {
      dir: 'docs/04-planning',
      desc: 'Phase 6-7: Planning and deployment (IMMUTABLE)'
    },
    {
      dir: 'docs/05-implementation',
      desc: 'Phase 8: Implementation status tracking (MUTABLE)'
    }
  ];
  
  // Create phase directories
  for (const phase of phases) {
    const phaseDir = path.join(projectRoot, phase.dir);
    safeOps.ensureDir(phaseDir);
    
    // Create basic INDEX.md for phase
    const indexContent = `# ${phase.desc}\n\n` +
      `**Status**: Ready for content\n` +
      `**Created**: ${new Date().toISOString().split('T')[0]}\n\n` +
      `*This directory will contain ${phase.desc.toLowerCase()} documentation.*\n`;
    
    const indexPath = path.join(phaseDir, 'INDEX.md');
    if (!fs.existsSync(indexPath)) {
      safeOps.writeFile(indexPath, indexContent);
    }
  }
  
  // Create implementation subdirectories
  const implDir = path.join(projectRoot, 'docs/05-implementation');
  safeOps.ensureDir(path.join(implDir, 'epics'));
  
  // Create logs directory structure
  console.log('\n📋 Creating logs directory structure...\n');
  
  const logsDir = path.join(projectRoot, 'logs');
  safeOps.ensureDir(logsDir);
  
  // Create .keep file
  const keepFile = path.join(logsDir, '.keep');
  if (!fs.existsSync(keepFile)) {
    safeOps.writeFile(keepFile, '# Keep this directory in git\n# Agent logs will be created here\n');
  }
  
  // Create logs subdirectories matching docs structure
  for (const phase of phases) {
    const phaseNumber = phase.dir.split('/')[1]; // e.g., "01-requirements"
    const logPhaseDir = path.join(logsDir, phaseNumber);
    safeOps.ensureDir(logPhaseDir);
  }
}

/**
 * Migrate existing user story structure
 */
function migrateUserStories() {
  console.log('\n🔄 Migrating existing user story structure...\n');
  
  // Look for existing docs/user-stories directory
  const oldUserStoriesDir = path.join(projectRoot, 'docs/user-stories');
  
  if (!fs.existsSync(oldUserStoriesDir)) {
    logAction('SKIP', 'docs/user-stories', null, 'directory not found');
    return;
  }
  
  try {
    const entries = fs.readdirSync(oldUserStoriesDir);
    
    for (const entry of entries) {
      const entryPath = path.join(oldUserStoriesDir, entry);
      
      if (!fs.statSync(entryPath).isDirectory()) {
        continue;
      }
      
      // Assume entry is a user story ID (US-001, US-002, etc.)
      if (entry.match(/^US-\d{3}$/)) {
        migrateUserStory(entryPath, entry);
      }
    }
  } catch (error) {
    errors.push(`Failed to migrate user stories: ${error.message}`);
  }
}

/**
 * Migrate a single user story
 */
function migrateUserStory(oldStoryPath, storyId) {
  // Determine target epic (for now, group stories by hundreds)
  const storyNum = parseInt(storyId.split('-')[1]);
  const epicNum = Math.floor((storyNum - 1) / 10) + 1; // Group every 10 stories
  const epicId = `EPIC-${epicNum.toString().padStart(3, '0')}`;
  
  const targetDir = path.join(
    projectRoot, 
    'docs/05-implementation/epics', 
    epicId, 
    'user-stories', 
    storyId
  );
  
  safeOps.ensureDir(targetDir);
  
  try {
    const files = fs.readdirSync(oldStoryPath);
    
    for (const file of files) {
      const oldFilePath = path.join(oldStoryPath, file);
      const stats = fs.statSync(oldFilePath);
      
      if (stats.isFile()) {
        let newFileName = file;
        let targetFilePath = path.join(targetDir, newFileName);
        
        // Handle special file renames
        if (file === `${storyId}.md`) {
          newFileName = 'description.md';
          targetFilePath = path.join(targetDir, newFileName);
          logAction('RENAME', `${storyId}.md → description.md`, null, 'standardization');
        }
        
        safeOps.moveFile(oldFilePath, targetFilePath);
      } else if (stats.isDirectory()) {
        // Move subdirectories (like bdd-scenarios/)
        const targetSubDir = path.join(targetDir, file);
        safeOps.ensureDir(targetSubDir);
        
        const subFiles = fs.readdirSync(oldFilePath);
        for (const subFile of subFiles) {
          const oldSubFilePath = path.join(oldFilePath, subFile);
          const newSubFilePath = path.join(targetSubDir, subFile);
          safeOps.moveFile(oldSubFilePath, newSubFilePath);
        }
      }
    }
    
    // Create required files if missing
    ensureRequiredStoryFiles(targetDir, storyId);
    
  } catch (error) {
    errors.push(`Failed to migrate story ${storyId}: ${error.message}`);
  }
}

/**
 * Ensure required files exist in story directory
 */
function ensureRequiredStoryFiles(storyDir, storyId) {
  const requiredFiles = [
    {
      name: 'description.md',
      content: `# User Story: ${storyId}\n\n` +
        `## Story Description\n\n` +
        `*[Brief description of what this story accomplishes]*\n\n` +
        `## Acceptance Criteria\n\n` +
        `- [ ] *[Add specific, measurable acceptance criteria]*\n\n` +
        `## Notes\n\n` +
        `*[Additional context, assumptions, or dependencies]*\n\n` +
        `---\n` +
        `**Story ID**: ${storyId}  \n` +
        `**Created**: ${new Date().toISOString().split('T')[0]}  \n` +
        `**Status**: Draft\n`
    },
    {
      name: 'implementation-plan.md',
      content: `# Implementation Plan: ${storyId}\n\n` +
        `## Story Overview\n\n` +
        `**Story ID**: ${storyId}  \n` +
        `**Version**: 1.0  \n` +
        `**Status**: Draft  \n` +
        `**Last Updated**: ${new Date().toISOString().split('T')[0]}\n\n` +
        `## Layer Architecture\n\n` +
        `### Layer 1: Database & Domain Model\n` +
        `- [ ] *[Add specific database tasks]*\n\n` +
        `### Layer 2: Backend Services & API\n` +
        `- [ ] *[Add backend implementation tasks]*\n\n` +
        `### Layer 3: Configuration & Integration\n` +
        `- [ ] *[Add configuration tasks]*\n\n` +
        `### Layer 4: Frontend & Components\n` +
        `- [ ] *[Add frontend implementation tasks]*\n\n` +
        `## BDD Mapping Matrix\n\n` +
        `| Scenario | Layer | Checkpoint | Files |\n` +
        `|----------|-------|------------|-------|\n` +
        `| *[Add mapping]* | *[Layer]* | *[Checkpoint]* | *[Files]* |\n\n` +
        `---\n` +
        `**Framework**: Gen‑e2 Compliance v2.0.0\n`
    }
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(storyDir, file.name);
    
    if (!fs.existsSync(filePath)) {
      safeOps.writeFile(filePath, file.content);
    }
  }
}

/**
 * Update file links to use relative paths
 */
function updateFileLinks() {
  console.log('\n🔗 Updating file links to use relative paths...\n');
  
  const docsDir = path.join(projectRoot, 'docs');
  if (!fs.existsSync(docsDir)) return;
  
  function updateLinksInDirectory(dir) {
    try {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const entryPath = path.join(dir, entry);
        const stats = fs.statSync(entryPath);
        
        if (stats.isDirectory()) {
          updateLinksInDirectory(entryPath);
        } else if (entry.endsWith('.md')) {
          safeOps.updateFileContent(entryPath, (content) => {
            // Replace absolute paths with relative paths
            let updated = content;
            
            // Replace /docs/ references with relative paths
            updated = updated.replace(/\(\/docs\/[^)]+\)/g, (match, path) => {
              return match; // Keep for now, can be enhanced with proper relative path calculation
            });
            
            // Replace hardcoded user-stories paths
            updated = updated.replace(/\/docs\/user-stories\/US-/g, '../user-stories/US-');
            
            return updated;
          });
        }
      }
    } catch (error) {
      errors.push(`Failed to update links in ${dir}: ${error.message}`);
    }
  }
  
  updateLinksInDirectory(docsDir);
}

/**
 * Clean up old directory structure
 */
function cleanupOldStructure(force = false) {
  if (!force) {
    console.log('\n🧹 Cleanup of old structure skipped (use --force to enable)\n');
    return;
  }
  
  console.log('\n🧹 Cleaning up old directory structure...\n');
  
  const oldDirs = [
    path.join(projectRoot, 'docs/user-stories'),
    path.join(projectRoot, 'docs/prd')
  ];
  
  for (const oldDir of oldDirs) {
    if (fs.existsSync(oldDir)) {
      try {
        // Check if directory is empty after migration
        const remaining = fs.readdirSync(oldDir);
        
        if (remaining.length === 0) {
          if (!dryRun) {
            fs.rmdirSync(oldDir);
          }
          logAction('REMOVE_DIR', path.relative(projectRoot, oldDir), null, 'empty after migration');
        } else {
          logAction('KEEP_DIR', path.relative(projectRoot, oldDir), null, `${remaining.length} items remaining`);
        }
      } catch (error) {
        errors.push(`Failed to clean up ${oldDir}: ${error.message}`);
      }
    }
  }
}

/**
 * Display migration summary
 */
function displaySummary() {
  console.log('\n📊 Migration Summary\n');
  console.log(`✅ Files migrated: ${migratedCount}`);
  console.log(`📁 Files created: ${createdCount}`);
  console.log(`❌ Errors encountered: ${errors.length}\n`);
  
  if (errors.length > 0) {
    console.log('⚠️  ERRORS:\n');
    for (const error of errors) {
      console.log(`   - ${error}`);
    }
    console.log('');
  }
  
  if (dryRun) {
    console.log('🔍 This was a DRY RUN. No files were actually modified.');
    console.log('💡 Run without --dry-run to perform the migration.\n');
  } else {
    console.log('✅ Migration completed successfully!');
    console.log('🔄 Next steps:');
    console.log('   1. Run: node .github/scripts/update-index.mjs');
    console.log('   2. Run: node .github/scripts/enforce-naming.mjs');
    console.log('   3. Review migrated content and update as needed');
    console.log('   4. Commit changes: git add . && git commit -m "chore(structure): migrate to Gen‑e2 compliance"\n');
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  dryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  
  console.log('🔄 Gen‑e2 Structure Migration Tool\n');
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE: No files will be modified\n');
  }
  
  // Run migration steps
  createPDLCStructure();
  migrateUserStories();
  updateFileLinks();
  cleanupOldStructure(force);
  
  // Display results
  displaySummary();
  
  if (errors.length > 0 && !dryRun) {
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { migrateUserStories, createPDLCStructure, ensureRequiredStoryFiles };