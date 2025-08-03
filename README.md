# 🤖 AI Commit Tool

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

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Add your API key to `.env`:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### 3. Stage Your Changes

```bash
git add <files>
```

### 4. Run the Tool

```bash
npm start
```

Or run directly:
```bash
node index.js
```

## 📋 Example Usage

```bash
$ node index.js

🤖 AI Commit Tool

📖 Reading staged changes...
🧠 Generating commit message with AI...

💬 Suggested commit message:
"🐛 Fix authentication validation and error handling"

? What would you like to do? (Use arrow keys)
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

### Environment Variables

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
ai-commit-toy/
├── .env              # Environment variables
├── index.js          # Main CLI entry point
├── ai.js            # OpenAI API integration
├── git.js           # Git operations
├── prompt.js        # CLI user interactions
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

### Adding Features

Each module has a single responsibility:

- **index.js**: Main CLI flow and error handling
- **ai.js**: OpenAI API calls and message generation
- **git.js**: Git operations (diff, commit, status)
- **prompt.js**: User interaction and input validation

## 🔧 Troubleshooting

### Common Issues

**"No staged changes found"**
- Make sure you've staged files with `git add <files>`
- Check `git status` to see your current repository state

**"Invalid OpenAI API key"**
- Verify your API key in the `.env` file
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
- VS Code extension
- Configuration file support