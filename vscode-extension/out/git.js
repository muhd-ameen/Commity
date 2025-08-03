"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoInfo = exports.stageAllChanges = exports.commitChanges = exports.hasStagedChanges = exports.getStagedDiff = void 0;
const simple_git_1 = require("simple-git");
const git = (0, simple_git_1.simpleGit)();
/**
 * Get the staged changes diff
 * @returns The diff output
 */
async function getStagedDiff() {
    try {
        // Check if we're in a git repository
        const isRepo = await git.checkIsRepo();
        if (!isRepo) {
            throw new Error('Not in a Git repository. Please run this command from within a Git repository.');
        }
        // Get the staged diff
        const diff = await git.diff(['--cached']);
        return diff;
    }
    catch (error) {
        throw new Error(`Failed to read staged changes: ${error.message}`);
    }
}
exports.getStagedDiff = getStagedDiff;
/**
 * Check if there are staged changes
 * @returns True if there are staged changes
 */
async function hasStagedChanges() {
    try {
        const status = await git.status();
        return status.staged.length > 0;
    }
    catch (error) {
        throw new Error(`Failed to check git status: ${error.message}`);
    }
}
exports.hasStagedChanges = hasStagedChanges;
/**
 * Commit changes with the provided message
 * @param message - The commit message
 */
async function commitChanges(message) {
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
    }
    catch (error) {
        throw new Error(`Failed to commit changes: ${error.message}`);
    }
}
exports.commitChanges = commitChanges;
/**
 * Stage all modified files
 */
async function stageAllChanges() {
    try {
        await git.add('.');
        console.log('✅ All changes staged successfully.');
    }
    catch (error) {
        throw new Error(`Failed to stage changes: ${error.message}`);
    }
}
exports.stageAllChanges = stageAllChanges;
/**
 * Get current repository information
 * @returns Repository info
 */
async function getRepoInfo() {
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
    }
    catch (error) {
        throw new Error(`Failed to get repository info: ${error.message}`);
    }
}
exports.getRepoInfo = getRepoInfo;
//# sourceMappingURL=git.js.map