#!/bin/bash

# AI Commit Tool - Global Installation Script
# This script installs the AI Commit Tool globally and helps users set up their API key

set -e

echo "🤖 Commity - Global Installation"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Install dependencies
echo "📦 Installing dependencies..."
cd "$SCRIPT_DIR"
npm install

# Create global symlink
echo "🔗 Creating global command..."
npm link

echo ""
echo "✅ Installation complete!"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
fi

# API Key Setup
echo "🔑 OpenAI API Key Setup"
echo "======================="
echo ""

# Check if API key is already set
if grep -q "sk-your-openai-api-key-here" .env 2>/dev/null; then
    echo "⚠️  OpenAI API key not configured yet."
    echo ""
    echo "To set up your API key:"
    echo "1. Get your API key from: https://platform.openai.com/api-keys"
    echo "2. Edit the .env file and replace 'sk-your-openai-api-key-here' with your actual key"
    echo ""
    echo "Or run this command to open the .env file:"
    echo "   code .env"
    echo ""
else
    echo "✅ OpenAI API key appears to be configured"
fi

echo ""
echo "🎯 Usage Instructions:"
echo "====================="
echo ""
echo "1. Stage your changes:"
echo "   git add <files>"
echo ""
echo "2. Generate commit message:"
echo "   commity"
echo "   # or"
echo "   node index.js"
echo ""
echo "3. The tool will:"
echo "   - Read your staged changes"
echo "   - Generate an AI commit message with emoji"
echo "   - Ask for your confirmation"
echo ""

# VS Code Extension Info
echo "💡 VS Code Extension Available!"
echo "==============================="
echo ""
echo "For a better experience, install the VS Code extension:"
echo "1. Open VS Code"
echo "2. Go to Extensions (Ctrl+Shift+X)"
echo "3. Search for 'Commity'"
echo "4. Install the extension"
echo "5. Configure your API key in VS Code settings"
echo ""

echo "🚀 You're all set! Happy committing! 🎉" 