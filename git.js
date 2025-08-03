import { simpleGit } from 'simple-git';
import chalk from 'chalk';

const git = simpleGit();

/**
 * Get the staged changes diff
 * @returns {Promise<string>} The diff output
 */
export async function getStagedDiff() {
  try {
    // Check if we're in a git repository
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      throw new Error('Not in a Git repository. Please run this command from within a Git repository.');
    }

    // Get the staged diff
    const diff = await git.diff(['--cached']);
    return diff;
  } catch (error) {
    throw new Error(`Failed to read staged changes: ${error.message}`);
  }
}

/**
 * Check if there are staged changes
 * @returns {Promise<boolean>} True if there are staged changes
 */
export async function hasStagedChanges() {
  try {
    const status = await git.status();
    return status.staged.length > 0;
  } catch (error) {
    throw new Error(`Failed to check git status: ${error.message}`);
  }
}

/**
 * Commit changes with the provided message
 * @param {string} message - The commit message
 * @returns {Promise<void>}
 */
export async function commitChanges(message) {
  try {
    if (!message || message.trim() === '') {
      throw new Error('Commit message cannot be empty');
    }

    // Check if there are staged changes
    const hasStaged = await hasStagedChanges();
    if (!hasStaged) {
      throw new Error('No staged changes to commit');
    }

    // Perform the commit
    const result = await git.commit(message.trim());
    
    if (result.commit) {
      console.log(chalk.gray(`📝 Commit hash: ${result.commit.substr(0, 8)}`));
    }
  } catch (error) {
    throw new Error(`Failed to commit changes: ${error.message}`);
  }
}

/**
 * Stage all modified files
 * @returns {Promise<void>}
 */
export async function stageAllChanges() {
  try {
    await git.add('.');
    console.log(chalk.green('✅ All changes staged successfully.'));
  } catch (error) {
    throw new Error(`Failed to stage changes: ${error.message}`);
  }
}

/**
 * Get current repository information
 * @returns {Promise<object>} Repository info
 */
export async function getRepoInfo() {
  try {
    const status = await git.status();
    const branch = await git.branch();
    
    return {
      currentBranch: branch.current,
      stagedFiles: status.staged,
      modifiedFiles: status.modified,
      untrackedFiles: status.not_added,
      ahead: status.ahead,
      behind: status.behind
    };
  } catch (error) {
    throw new Error(`Failed to get repository info: ${error.message}`);
  }
}

/**
 * Display repository status information
 */
export async function displayRepoStatus() {
  try {
    const info = await getRepoInfo();
    
    console.log(chalk.blue(`📂 Repository Status (${info.currentBranch} branch):`));
    
    if (info.stagedFiles.length > 0) {
      console.log(chalk.green(`  ✅ Staged files: ${info.stagedFiles.length}`));
      info.stagedFiles.forEach(file => {
        console.log(chalk.gray(`     ${file}`));
      });
    }
    
    if (info.modifiedFiles.length > 0) {
      console.log(chalk.yellow(`  📝 Modified files: ${info.modifiedFiles.length}`));
    }
    
    if (info.untrackedFiles.length > 0) {
      console.log(chalk.red(`  ❓ Untracked files: ${info.untrackedFiles.length}`));
    }
    
    console.log('');
  } catch (error) {
    console.log(chalk.gray('ℹ️  Could not retrieve repository status.'));
  }
}