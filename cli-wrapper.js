#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { getStagedDiff, commitChanges } from './git.js';
import { generateCommitMessage } from './ai.js';
import { confirmCommitMessage, getManualCommitMessage } from './prompt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

/**
 * Get VS Code settings for Commity extension
 * @returns {Object|null} Settings object or null if not found
 */
function getVSCodeSettings() {
  try {
    const platform = os.platform();
    let settingsPath;
    
    if (platform === 'darwin') {
      // macOS
      settingsPath = path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'settings.json');
    } else if (platform === 'win32') {
      // Windows
      settingsPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User', 'settings.json');
    } else {
      // Linux
      settingsPath = path.join(os.homedir(), '.config', 'Code', 'User', 'settings.json');
    }
    
    if (fs.existsSync(settingsPath)) {
      const settingsContent = fs.readFileSync(settingsPath, 'utf8');
      const settings = JSON.parse(settingsContent);
      
      if (settings.commity) {
        return settings.commity;
      }
    }
    
    return null;
  } catch (error) {
    console.log(chalk.gray('Could not read VS Code settings:', error.message));
    return null;
  }
}

/**
 * Get API key from various sources
 * @returns {string|null} API key or null if not found
 */
function getApiKey() {
  // First, try environment variable
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-openai-api-key-here') {
    return process.env.OPENAI_API_KEY;
  }
  
  // Then, try VS Code settings
  const vsCodeSettings = getVSCodeSettings();
  if (vsCodeSettings && vsCodeSettings.openaiApiKey) {
    return vsCodeSettings.openaiApiKey;
  }
  
  return null;
}

/**
 * Get model from various sources
 * @returns {string} Model name
 */
function getModel() {
  // First, try environment variable
  if (process.env.OPENAI_MODEL) {
    return process.env.OPENAI_MODEL;
  }
  
  // Then, try VS Code settings
  const vsCodeSettings = getVSCodeSettings();
  if (vsCodeSettings && vsCodeSettings.openaiModel) {
    return vsCodeSettings.openaiModel;
  }
  
  // Default
  return 'gpt-4o-mini';
}

/**
 * Check if emojis are enabled
 * @returns {boolean} Whether emojis are enabled
 */
function isEmojisEnabled() {
  // First, try environment variable
  if (process.env.COMMITY_ENABLE_EMOJIS !== undefined) {
    return process.env.COMMITY_ENABLE_EMOJIS === 'true';
  }
  
  // Then, try VS Code settings
  const vsCodeSettings = getVSCodeSettings();
  if (vsCodeSettings && vsCodeSettings.enableEmojis !== undefined) {
    return vsCodeSettings.enableEmojis;
  }
  
  // Default
  return true;
}

async function main() {
  try {
    console.log(chalk.blue('🤖 Commity - AI Commit Tool\n'));

    // Get API key from various sources
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log(chalk.red('❌ OpenAI API key not found.'));
      console.log(chalk.yellow('Please configure your API key in one of these ways:'));
      console.log(chalk.gray(''));
      console.log(chalk.gray('1. VS Code Extension (Recommended):'));
      console.log(chalk.gray('   - Install the Commity VS Code extension'));
      console.log(chalk.gray('   - Go to Settings → Commity → OpenAI API Key'));
      console.log(chalk.gray('   - Enter your API key'));
      console.log(chalk.gray(''));
      console.log(chalk.gray('2. Environment Variable:'));
      console.log(chalk.gray('   - Set OPENAI_API_KEY in your .env file'));
      console.log(chalk.gray(''));
      console.log(chalk.gray('3. Get your API key from: https://platform.openai.com/api-keys\n'));
      process.exit(1);
    }

    // Set environment variables for the AI module
    process.env.OPENAI_API_KEY = apiKey;
    process.env.OPENAI_MODEL = getModel();
    
    // Show source of configuration
    const vsCodeSettings = getVSCodeSettings();
    if (vsCodeSettings) {
      console.log(chalk.gray('📋 Using VS Code extension settings'));
    } else {
      console.log(chalk.gray('📋 Using environment variables'));
    }
    console.log('');

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