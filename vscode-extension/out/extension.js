"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const ai_1 = require("./ai");
const git_1 = require("./git");
function activate(context) {
    console.log('Commity extension is now active!');
    // Register the command immediately
    console.log('Registering commity.generateCommit command...');
    let disposable = vscode.commands.registerCommand('commity.generateCommit', async () => {
        try {
            // Get configuration
            const config = vscode.workspace.getConfiguration('commity');
            const apiKey = config.get('openaiApiKey');
            const model = config.get('openaiModel', 'gpt-4o-mini');
            const enableEmojis = config.get('enableEmojis', true);
            // Check if API key is configured
            if (!apiKey || apiKey.trim() === '') {
                const action = await vscode.window.showErrorMessage('OpenAI API key not configured. Please set your API key in VS Code settings.', 'Open Settings', 'Get API Key');
                if (action === 'Open Settings') {
                    vscode.commands.executeCommand('workbench.action.openSettings', 'commity.openaiApiKey');
                }
                else if (action === 'Get API Key') {
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
                const diff = await (0, git_1.getStagedDiff)();
                if (!diff || diff.trim() === '') {
                    vscode.window.showWarningMessage('No staged changes found. Please stage some files first.');
                    return;
                }
                // Generate commit message
                progress.report({ increment: 40, message: "Generating commit message with AI..." });
                const aiMessage = await (0, ai_1.generateCommitMessage)(diff);
                if (!aiMessage) {
                    vscode.window.showErrorMessage('Failed to generate commit message.');
                    return;
                }
                progress.report({ increment: 30, message: "Commit message generated!" });
                // Show the generated message and ask for confirmation
                const userChoice = await vscode.window.showInformationMessage(`💬 Suggested commit message:\n"${aiMessage}"`, 'Use This Message', 'Edit Message', 'Cancel');
                if (userChoice === 'Use This Message') {
                    await (0, git_1.commitChanges)(aiMessage);
                    vscode.window.showInformationMessage(`✅ Committed successfully with message: "${aiMessage}"`);
                }
                else if (userChoice === 'Edit Message') {
                    const editedMessage = await vscode.window.showInputBox({
                        prompt: 'Edit the commit message:',
                        value: aiMessage,
                        placeHolder: 'Enter your commit message'
                    });
                    if (editedMessage && editedMessage.trim()) {
                        await (0, git_1.commitChanges)(editedMessage.trim());
                        vscode.window.showInformationMessage(`✅ Committed with custom message: "${editedMessage.trim()}"`);
                    }
                    else {
                        vscode.window.showWarningMessage('Commit cancelled - no message provided.');
                    }
                }
                else {
                    vscode.window.showInformationMessage('Commit cancelled.');
                }
            });
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        }
    });
    context.subscriptions.push(disposable);
    console.log('Commity command registered successfully!');
}
exports.activate = activate;
function deactivate() {
    console.log('Commity extension is now deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map