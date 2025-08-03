#!/usr/bin/env node

import dotenv from 'dotenv';
import chalk from 'chalk';
import { getStagedDiff, commitChanges } from './git.js';
import { generateCommitMessage } from './ai.js';
import { confirmCommitMessage, getManualCommitMessage } from './prompt.js';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log(chalk.blue('🤖 Commity - AI Commit Tool\n'));

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-openai-api-key-here') {
      console.log(chalk.red('❌ Error: OpenAI API key not found or not configured.'));
      console.log(chalk.yellow('Please set your OPENAI_API_KEY in the .env file.'));
      console.log(chalk.gray('Get your API key from: https://platform.openai.com/api-keys\n'));
      process.exit(1);
    }

    // Get staged changes
    console.log(chalk.gray('📖 Reading staged changes...'));
    const diff = await getStagedDiff();

    if (!diff || diff.trim() === '') {
      console.log(chalk.yellow('⚠️  No staged changes found.'));
      console.log(chalk.gray('Use "git add <files>" to stage changes first.\n'));
      process.exit(0);
    }

    // Generate commit message using AI
    console.log(chalk.gray('🧠 Generating commit message with AI...'));
    const aiMessage = await generateCommitMessage(diff);

    if (!aiMessage) {
      console.log(chalk.red('❌ Failed to generate commit message.'));
      process.exit(1);
    }

    // Display the suggested message
    console.log(chalk.green('\n💬 Suggested commit message:'));
    console.log(chalk.white(`"${aiMessage}"\n`));

    // Ask for confirmation
    const userChoice = await confirmCommitMessage();

    if (userChoice === 'yes') {
      // Commit with AI-generated message
      await commitChanges(aiMessage);
      console.log(chalk.green('✅ Committed successfully!'));
    } else if (userChoice === 'edit') {
      // Allow manual editing
      const manualMessage = await getManualCommitMessage(aiMessage);
      if (manualMessage && manualMessage.trim()) {
        await commitChanges(manualMessage);
        console.log(chalk.green('✅ Committed with your custom message!'));
      } else {
        console.log(chalk.yellow('⚠️  Commit cancelled - no message provided.'));
      }
    } else {
      // User chose to cancel
      console.log(chalk.yellow('⚠️  Commit cancelled.'));
    }

  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}

// Run the CLI tool
main();