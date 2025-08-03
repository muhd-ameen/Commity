# 🚀 Quick Publish Guide for Commity

## ⚡ Quick Steps

### 1. Create Publisher Account
- Go to: https://marketplace.visualstudio.com/
- Sign in with Microsoft account
- Click "Publish extensions"
- Create publisher (e.g., "yourname")

### 2. Generate Personal Access Token
- Go to: https://dev.azure.com/
- Sign in → Profile → Personal access tokens
- Create new token:
  - Name: "VS Code Extension Publishing"
  - Scopes: Marketplace (Publish)
- **Copy the token** (you won't see it again!)

### 3. Login and Publish
```bash
# Login with your publisher name
vsce login your-publisher-name

# Package the extension
vsce package

# Publish to marketplace
vsce publish
```

## 📝 Before Publishing

### Update package.json
Replace these placeholders:
```json
{
      "publisher": "emeenx",
  "repository": {
    "url": "https://github.com/muhd-ameen/Commity.git"
  },
  "homepage": "https://github.com/muhd-ameen/Commity",
  "bugs": {
    "url": "https://github.com/muhd-ameen/Commity/issues"
  }
}
```

### Test the Extension
```bash
# Compile
npm run compile

# Package
vsce package

# Test locally (optional)
code --install-extension commity-1.0.0.vsix
```

## 🎯 Extension Details

- **Name**: commity
- **Display Name**: Commity - AI Commit Tool
- **Description**: Generate intelligent Git commit messages using AI with dynamic emoji selection
- **Categories**: SCM Providers, Other
- **Features**: AI-powered commits, dynamic emojis, CLI integration

## 📦 Package Size
- **Before**: 2.89 MB (with node_modules)
- **After**: 10.22 KB (optimized)

## 🔄 Updates
```bash
# Update version
vsce publish patch  # 1.0.0 → 1.0.1
vsce publish minor  # 1.0.0 → 1.1.0
vsce publish major  # 1.0.0 → 2.0.0
```

## 🚨 Common Issues

**"Publisher not found"**
- Check publisher name is correct
- Ensure you're logged in with right account

**"Token expired"**
- Generate new Personal Access Token
- Login again with `vsce login`

**"Extension already exists"**
- Update version in package.json
- Use `vsce publish patch/minor/major`

---

**Ready to publish! 🎉** 