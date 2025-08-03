# 🚀 Commity - Setup Guide

This guide covers how to install and configure the AI Commit Tool for both CLI and VS Code extension usage.

## 📋 Table of Contents

1. [CLI Installation](#cli-installation)
2. [VS Code Extension Installation](#vs-code-extension-installation)
3. [API Key Configuration](#api-key-configuration)
4. [Usage Examples](#usage-examples)
5. [Troubleshooting](#troubleshooting)

## 🖥️ CLI Installation

### Method 1: Quick Install (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd commity

# Run the installation script
./install-global.sh
```

### Method 2: Manual Installation

```bash
# Clone the repository
git clone <repository-url>
cd commity

# Install dependencies
npm install

# Create global symlink
npm link

# Copy environment file
cp .env.example .env
```

### Method 3: Global NPM Install

```bash
# Install globally via npm (when published)
npm install -g commity
```

## 🔌 VS Code Extension Installation

### Method 1: Install from VSIX

1. **Build the extension**:
   ```bash
   cd vscode-extension
   npm install
   npm run compile
   npx vsce package
   ```

2. **Install in VS Code**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click "..." → "Install from VSIX..."
   - Select the generated `.vsix` file

### Method 2: Development Installation

```bash
cd vscode-extension
npm install
npm run compile

# In VS Code, press F5 to run in new window
```

## 🔑 API Key Configuration

### For CLI Users

1. **Get your OpenAI API key**:
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Configure the key**:
   ```bash
   # Edit the .env file
   nano .env
   # or
   code .env
   ```

3. **Replace the placeholder**:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### For VS Code Extension Users

1. **Open VS Code Settings**:
   - Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
   - Or go to File → Preferences → Settings

2. **Search for "AI Commit Tool"**:
   - Find "AI Commit Tool: OpenAI Api Key"
   - Paste your API key

3. **Alternative: Settings JSON**:
   ```json
   {
     "commity.openaiApiKey": "sk-your-api-key-here",
     "commity.openaiModel": "gpt-4o-mini",
"commity.enableEmojis": true
   }
   ```

## 🎯 Usage Examples

### CLI Usage

```bash
# Stage your changes
git add .

# Generate commit message
commity
# or
node index.js

# The tool will:
# 1. Read your staged changes
# 2. Generate AI commit message with emoji
# 3. Ask for confirmation
```

### VS Code Extension Usage

1. **Stage your changes**:
   ```bash
   git add .
   ```

2. **Generate commit message**:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Generate AI Commit Message"
   - Select the command

3. **Review and commit**:
   - Choose "Use This Message", "Edit Message", or "Cancel"

### Example Output

```
🤖 Commity - AI Commit Tool

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

## 🎨 Emoji Examples

The tool automatically selects emojis based on your changes:

| Change Type | Keywords | Emoji | Example |
|-------------|----------|-------|---------|
| **Bug Fixes** | `fix`, `bug`, `error`, `issue` | 🐛 | `🐛 Fix login validation error` |
| **Features** | `add`, `new`, `create`, `implement` | ✨ | `✨ Add user registration feature` |
| **Documentation** | `readme`, `docs`, `comment` | 📚 | `📚 Update API documentation` |
| **Performance** | `performance`, `optimize`, `cache` | ⚡ | `⚡ Optimize database queries` |
| **Refactoring** | `refactor`, `restructure`, `clean` | ♻️ | `♻️ Refactor authentication module` |
| **Testing** | `test`, `spec`, `unit`, `coverage` | 🧪 | `🧪 Add unit tests for user service` |
| **Configuration** | `config`, `setting`, `env` | ⚙️ | `⚙️ Update environment configuration` |
| **Security** | `security`, `auth`, `password` | 🔒 | `🔒 Implement JWT authentication` |
| **UI/UX** | `ui`, `ux`, `style`, `css` | 🎨 | `🎨 Improve button styling` |
| **Database** | `database`, `db`, `migration` | 🗄️ | `🗄️ Add user table migration` |
| **API** | `api`, `endpoint`, `route` | 🔌 | `🔌 Add user API endpoints` |
| **Deployment** | `deploy`, `ci`, `cd`, `docker` | 🚀 | `🚀 Add Docker deployment config` |
| **Dependencies** | `package.json`, `dependencies` | 📦 | `📦 Update React to v18` |
| **General** | Other changes | 📝 | `📝 Update README file` |

## 🔧 Troubleshooting

### Common Issues

#### "OpenAI API key not configured"
- **CLI**: Check your `.env` file has the correct API key
- **VS Code**: Go to Settings → Commity → OpenAI API Key

#### "No staged changes found"
```bash
# Stage files first
git add <files>
git status  # Check what's staged
```

#### "Not in a Git repository"
```bash
# Initialize Git repository
git init
```

#### "Invalid OpenAI API key"
- Verify the key starts with `sk-`
- Check you have credits in your OpenAI account
- Ensure the key is correctly copied

#### "OpenAI API rate limit exceeded"
- Wait a moment and try again
- Consider upgrading your OpenAI plan

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| **401 Unauthorized** | Invalid API key | Check your API key in settings |
| **429 Rate Limited** | Too many requests | Wait and try again later |
| **500 Server Error** | OpenAI service issue | Try again later |

### Debug Mode

For CLI users, you can enable debug logging:
```bash
DEBUG=* node index.js
```

## 🛠️ Development

### Building the VS Code Extension

```bash
cd vscode-extension
npm install
npm run compile
npx vsce package
```

### Testing

```bash
# Test CLI tool
node index.js

# Test VS Code extension
# Press F5 in VS Code to run in new window
```

## 📞 Support

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Verify your API key is correct**
3. **Ensure you have staged changes**
4. **Check you're in a Git repository**

For additional help, please open an issue on the repository.

## 🚀 Next Steps

After installation:

1. **Test with a simple change**:
   ```bash
   echo "// Test comment" >> test.js
git add test.js
commity
   ```

2. **Try the VS Code extension** for a better experience

3. **Customize settings** as needed

4. **Share with your team**! 🎉

---

**Happy committing! 🎯✨** 