import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Ask user to confirm the AI-generated commit message
 * @returns {Promise<string>} User's choice: 'yes', 'edit', or 'no'
 */
export async function confirmCommitMessage() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'Yes, use this message',
          value: 'yes',
          short: 'Yes'
        },
        {
          name: 'Edit the message',
          value: 'edit',
          short: 'Edit'
        },
        {
          name: 'Cancel commit',
          value: 'no',
          short: 'Cancel'
        }
      ],
      default: 'yes'
    }
  ]);

  return choice;
}

/**
 * Get a manual commit message from the user
 * @param {string} suggestedMessage - The AI-suggested message as default
 * @returns {Promise<string>} The user's commit message
 */
export async function getManualCommitMessage(suggestedMessage = '') {
  console.log(chalk.blue('\n✏️  Enter your commit message:'));
  
  const { message } = await inquirer.prompt([
    {
      type: 'input',
      name: 'message',
      message: 'Commit message:',
      default: suggestedMessage,
      validate: (input) => {
        const trimmed = input.trim();
        if (!trimmed) {
          return 'Commit message cannot be empty';
        }
        if (trimmed.length > 200) {
          return 'Commit message should be under 200 characters';
        }
        return true;
      }
    }
  ]);

  return message.trim();
}

/**
 * Ask user if they want to stage all changes
 * @returns {Promise<boolean>} True if user wants to stage all changes
 */
export async function askToStageChanges() {
  const { shouldStage } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldStage',
      message: 'No staged changes found. Would you like to stage all modified files?',
      default: false
    }
  ]);

  return shouldStage;
}

/**
 * Display help information
 */
export function displayHelp() {
  console.log(chalk.blue('🤖 AI Commit Tool - Help\n'));
  
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  node index.js\n'));
  
  console.log(chalk.white('Prerequisites:'));
  console.log(chalk.gray('  1. Stage your changes with: git add <files>'));
  console.log(chalk.gray('  2. Set your OpenAI API key in .env file\n'));
  
  console.log(chalk.white('What this tool does:'));
  console.log(chalk.gray('  • Reads your staged Git changes'));
  console.log(chalk.gray('  • Uses AI to generate a commit message'));
  console.log(chalk.gray('  • Asks for your confirmation'));
  console.log(chalk.gray('  • Commits with the approved message\n'));
  
  console.log(chalk.white('Environment Variables:'));
  console.log(chalk.gray('  OPENAI_API_KEY - Your OpenAI API key (required)'));
  console.log(chalk.gray('  OPENAI_MODEL   - Model to use (optional, defaults to gpt-4o-mini)\n'));
}