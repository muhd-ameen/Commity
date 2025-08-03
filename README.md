# 🤖 Commity - AI Commit Tool

A lightweight CLI tool that reads staged Git changes and uses OpenAI to generate intelligent commit messages.

## ✨ Features

- 📖 Reads staged Git changes automatically
- 🧠 Generates commit messages using OpenAI GPT models
- 🎯 Dynamic emoji selection based on change type
- 💬 Interactive confirmation and editing
- 🔒 Secure API key management
- 🎨 Colored CLI output for better UX
- ⚡ Fast and lightweight

## 🚀 Quick Start

### Method 1: VS Code Extension + CLI (Recommended)

1. **Install VS Code Extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Commity"
   - Install the extension

2. **Configure API Key in VS Code**:
   - Go to Settings (Ctrl+,)
   - Search for "Commity"
   - Enter your OpenAI API key

3. **Install CLI Tool**:
   ```bash
   npm install -g commity-ai-commit-tool
   ```

4. **Use from Command Line**:
   ```bash
   git add <files>
   commity
   ```

### Method 2: CLI Only

1. **Install CLI Tool**:
   ```bash
   npm install -g commity-ai-commit-tool
   ```

2. **Set up OpenAI API Key** (if not using VS Code extension):
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create `.env` file in your project:
     ```bash
     echo "OPENAI_API_KEY=sk-your-actual-api-key-here" > .env
     ```

3. **Use the Tool**:
   ```bash
   git add <files>
   commity
   ```

## 📋 Example Usage

### VS Code Extension
1. **Install extension** from VS Code marketplace
2. **Configure API key** in VS Code settings
3. **Use command palette**: Ctrl+Shift+P → "Generate AI Commit Message"

### 📸 Extension Flow Screenshots

![Step 1: Install Extension](ss1.png)
*Install the Commity extension from VS Code marketplace*

![Step 2: Configure Settings](ss2.png)
*Configure your OpenAI API key in VS Code settings*

![Step 3: Generate Commit](ss3.png)
*Use the command palette to generate AI commit messages*

### CLI Tool
```bash
# Install globally
npm install -g commity-ai-commit-tool

# Stage your changes
git add .

# Generate commit message
commity

# Output:
🤖 Commity - AI Commit Tool
📋 Using VS Code extension settings
📖 Reading staged changes...
🧠 Generating commit message with AI...

💬 Suggested commit message:
"🐛 Fix authentication validation and error handling"

? What would you like to do?
❯ Yes, use this message
  Edit the message  
  Cancel commit

✅ Committed successfully!
📝 Commit hash: a1b2c3d4
```

### 🎯 Emoji Examples

The tool automatically selects appropriate emojis based on your changes:

- ✨ **Features**: New functionality, additions
- 🐛 **Bug Fixes**: Error corrections, issue resolutions  
- 📚 **Documentation**: README, docs, comments
- ⚡ **Performance**: Optimizations, speed improvements
- ♻️ **Refactoring**: Code restructuring, improvements
- 🧪 **Testing**: Test files, specs, coverage
- ⚙️ **Configuration**: Settings, env files, configs
- 🔒 **Security**: Authentication, vulnerabilities
- 🎨 **UI/UX**: Styling, design changes
- 🗄️ **Database**: Schema changes, migrations
- 🔌 **API**: Endpoints, routes, services
- 🚀 **Deployment**: CI/CD, builds, deployment
- 📦 **Dependencies**: Package updates, installations
- 📝 **General**: Other changes

## ⚙️ Configuration

### VS Code Extension Settings (Recommended)

The CLI tool automatically reads your VS Code extension settings:

1. **Open VS Code Settings**: Ctrl+, (Windows/Linux) or Cmd+, (Mac)
2. **Search for "Commity"**
3. **Configure**:
   - **OpenAI API Key**: Your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - **OpenAI Model**: Choose your preferred model (default: gpt-4o-mini)
   - **Enable Emojis**: Toggle emoji support (default: true)

### Environment Variables (CLI Only)

If not using VS Code extension, create a `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key (required) | - |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4o-mini` |

### Supported Models

- `gpt-4o-mini` (default, fastest and most cost-effective)
- `gpt-4o`
- `gpt-4-turbo`
- `gpt-3.5-turbo`

## 🛠️ Development

### Project Structure

```
commity/
├── cli-wrapper.js   # CLI wrapper with VS Code settings integration
├── index.js         # Original CLI entry point
├── ai.js           # OpenAI API integration
├── git.js          # Git operations
├── prompt.js       # CLI user interactions
├── vscode-extension/ # VS Code extension
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

### Adding Features

Each module has a single responsibility:

- **index.js**: Main CLI flow and error handling
- **ai.js**: OpenAI API calls and message generation
- **git.js**: Git operations (diff, commit, status)
- **prompt.js**: User interaction and input validation

## 🔧 Troubleshooting

### Common Issues

**"OpenAI API key not configured"**
- **VS Code Extension**: Go to Settings → Commity → OpenAI API Key
- **CLI Only**: Create `.env` file with your API key
- Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

**"No staged changes found"**
- Make sure you've staged files with `git add <files>`
- Check `git status` to see your current repository state

**"Invalid OpenAI API key"**
- Verify your API key in VS Code settings or `.env` file
- Ensure you have credits available in your OpenAI account
- Check that the API key starts with `sk-`

**"Not in a Git repository"**
- Make sure you're running the command inside a Git repository
- Initialize a Git repo with `git init` if needed

**"OpenAI API rate limit exceeded"**
- Wait a moment and try again
- Consider upgrading your OpenAI plan for higher rate limits

## 📝 License

MIT License - feel free to use and modify as needed!

## 🚀 Future Enhancements

- Support for conventional commit formats
- Local AI model support (Ollama)
- Custom prompt templates
- Configuration file support
- Multi-language support
- Git hooks integration