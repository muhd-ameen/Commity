import * as vscode from 'vscode';
import { generateCommitMessage } from './ai';
import { getStagedDiff, commitChanges } from './git';

export function activate(context: vscode.ExtensionContext) {
          console.log('Commity extension is now active!');

  let disposable = vscode.commands.registerCommand('commity.generateCommit', async () => {
    try {
      // Get configuration
      const config = vscode.workspace.getConfiguration('commity');
      const apiKey = config.get<string>('openaiApiKey');
      const model = config.get<string>('openaiModel', 'gpt-4o-mini');
      const enableEmojis = config.get<boolean>('enableEmojis', true);

      // Check if API key is configured
      if (!apiKey || apiKey.trim() === '') {
        const action = await vscode.window.showErrorMessage(
          'OpenAI API key not configured. Please set your API key in VS Code settings.',
          'Open Settings',
          'Get API Key'
        );

        if (action === 'Open Settings') {
          vscode.commands.executeCommand('workbench.action.openSettings', 'commity.openaiApiKey');
        } else if (action === 'Get API Key') {
          vscode.env.openExternal(vscode.Uri.parse('https://platform.openai.com/api-keys'));
        }
        return;
      }

      // Set environment variables for the AI module
      process.env.OPENAI_API_KEY = apiKey;
      process.env.OPENAI_MODEL = model;

      // Show progress
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "🤖 Generating AI commit message...",
        cancellable: false
      }, async (progress) => {
        progress.report({ increment: 0 });

        // Get staged changes
        progress.report({ increment: 30, message: "Reading staged changes..." });
        const diff = await getStagedDiff();

        if (!diff || diff.trim() === '') {
          vscode.window.showWarningMessage('No staged changes found. Please stage some files first.');
          return;
        }

        // Generate commit message
        progress.report({ increment: 40, message: "Generating commit message with AI..." });
        const aiMessage = await generateCommitMessage(diff);

        if (!aiMessage) {
          vscode.window.showErrorMessage('Failed to generate commit message.');
          return;
        }

        progress.report({ increment: 30, message: "Commit message generated!" });

        // Show the generated message and ask for confirmation
        const userChoice = await vscode.window.showInformationMessage(
          `💬 Suggested commit message:\n"${aiMessage}"`,
          'Use This Message',
          'Edit Message',
          'Cancel'
        );

        if (userChoice === 'Use This Message') {
          await commitChanges(aiMessage);
          vscode.window.showInformationMessage(`✅ Committed successfully with message: "${aiMessage}"`);
        } else if (userChoice === 'Edit Message') {
          const editedMessage = await vscode.window.showInputBox({
            prompt: 'Edit the commit message:',
            value: aiMessage,
            placeHolder: 'Enter your commit message'
          });

          if (editedMessage && editedMessage.trim()) {
            await commitChanges(editedMessage.trim());
            vscode.window.showInformationMessage(`✅ Committed with custom message: "${editedMessage.trim()}"`);
          } else {
            vscode.window.showWarningMessage('Commit cancelled - no message provided.');
          }
        } else {
          vscode.window.showInformationMessage('Commit cancelled.');
        }
      });

    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {} 