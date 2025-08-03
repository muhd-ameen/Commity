import { simpleGit, SimpleGit } from 'simple-git';

const git: SimpleGit = simpleGit();

/**
 * Get the staged changes diff
 * @returns The diff output
 */
export async function getStagedDiff(): Promise<string> {
  try {
    // Check if we're in a git repository
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      throw new Error('Not in a Git repository. Please run this command from within a Git repository.');
    }

    // Get the staged diff
    const diff = await git.diff(['--cached']);
    return diff;
  } catch (error: any) {
    throw new Error(`Failed to read staged changes: ${error.message}`);
  }
}

/**
 * Check if there are staged changes
 * @returns True if there are staged changes
 */
export async function hasStagedChanges(): Promise<boolean> {
  try {
    const status = await git.status();
    return status.staged.length > 0;
  } catch (error: any) {
    throw new Error(`Failed to check git status: ${error.message}`);
  }
}

/**
 * Commit changes with the provided message
 * @param message - The commit message
 */
export async function commitChanges(message: string): Promise<void> {
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
      console.log(`📝 Commit hash: ${result.commit.substr(0, 8)}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to commit changes: ${error.message}`);
  }
}

/**
 * Stage all modified files
 */
export async function stageAllChanges(): Promise<void> {
  try {
    await git.add('.');
    console.log('✅ All changes staged successfully.');
  } catch (error: any) {
    throw new Error(`Failed to stage changes: ${error.message}`);
  }
}

/**
 * Get current repository information
 * @returns Repository info
 */
export async function getRepoInfo(): Promise<{
  currentBranch: string;
  stagedFiles: string[];
  modifiedFiles: string[];
  untrackedFiles: string[];
  ahead: number;
  behind: number;
}> {
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
  } catch (error: any) {
    throw new Error(`Failed to get repository info: ${error.message}`);
  }
} 