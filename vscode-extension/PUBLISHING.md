# 🚀 Publishing Commity to VS Code Marketplace

## 📋 Prerequisites

1. **Microsoft Account**: You need a Microsoft account to publish extensions
2. **Publisher Account**: Create a publisher on the VS Code Marketplace
3. **Personal Access Token**: Generate a token for authentication

## 🔧 Step-by-Step Guide

### Step 1: Create Publisher Account

1. Go to [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Click "Sign in" with your Microsoft account
3. Click "Publish extensions"
4. Create a new publisher:
   - Choose a unique publisher name (e.g., "emeenx" or "commity")
   - Fill in publisher details
   - Accept terms and conditions

### Step 2: Generate Personal Access Token

1. Go to [Azure DevOps](https://dev.azure.com/)
2. Sign in with your Microsoft account
3. Click on your profile → "Personal access tokens"
4. Click "New Token"
5. Configure the token:
   - **Name**: "VS Code Extension Publishing"
   - **Organization**: All accessible organizations
   - **Expiration**: Choose appropriate duration
   - **Scopes**: Custom defined
   - **Scopes**: Marketplace (Publish)
6. Click "Create"
7. **Copy the token** (you won't see it again!)

### Step 3: Login with vsce

```bash
# Login with your publisher name and token
vsce login <your-publisher-name>
```

When prompted, enter your Personal Access Token.

### Step 4: Package the Extension

```bash
# Package the extension (creates .vsix file)
vsce package
```

### Step 5: Publish the Extension

```bash
# Publish to marketplace
vsce publish
```

Or publish with a specific version:
```bash
vsce publish patch  # 1.0.0 → 1.0.1
vsce publish minor  # 1.0.0 → 1.1.0
vsce publish major  # 1.0.0 → 2.0.0
```

## 📦 Extension Details

### Package Information
- **Name**: commity
- **Display Name**: Commity - AI Commit Tool
- **Description**: Generate intelligent Git commit messages using AI with dynamic emoji selection
- **Publisher**: [your-publisher-name]
- **Categories**: SCM Providers, Other

### Features
- 🎯 Dynamic emoji selection based on code changes
- 🧠 AI-powered commit message generation
- 💬 Interactive confirmation and editing
- 🔒 Secure API key management
- 🔗 CLI integration using VS Code settings

## 🎯 Publishing Checklist

Before publishing, ensure:

- [ ] Extension compiles without errors
- [ ] All dependencies are listed in package.json
- [ ] README.md is comprehensive
- [ ] Icon and screenshots are included (optional)
- [ ] License is specified
- [ ] Publisher account is created
- [ ] Personal access token is generated
- [ ] vsce is logged in

## 🔄 Updating the Extension

To update the extension:

1. **Update version** in package.json
2. **Make your changes**
3. **Compile**: `npm run compile`
4. **Package**: `vsce package`
5. **Publish**: `vsce publish`

## 📊 Post-Publishing

After publishing:

1. **Wait for indexing** (usually 5-10 minutes)
2. **Search for your extension** in VS Code
3. **Test the installation** in a clean VS Code instance
4. **Monitor reviews and feedback**

## 🛠️ Troubleshooting

### Common Issues

**"Publisher not found"**
- Ensure you're logged in with the correct publisher
- Check your publisher name is correct

**"Token expired"**
- Generate a new Personal Access Token
- Login again with `vsce login`

**"Extension already exists"**
- Update the version in package.json
- Use `vsce publish patch/minor/major`

**"Compilation errors"**
- Fix TypeScript errors
- Ensure all dependencies are installed
- Run `npm run compile` to check

## 📈 Marketing Your Extension

After publishing:

1. **Create a GitHub repository** for the extension
2. **Add screenshots and demos** to the marketplace listing
3. **Write a blog post** about the extension
4. **Share on social media** and developer communities
5. **Respond to reviews** and feedback

## 🔗 Useful Links

- [VS Code Marketplace](https://marketplace.visualstudio.com/)
- [Extension API Documentation](https://code.visualstudio.com/api)
- [Publishing Extensions Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)

---

**Happy Publishing! 🎉** 