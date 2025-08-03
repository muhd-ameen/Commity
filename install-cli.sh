#!/bin/bash

# Commity CLI Installation Script
# This script installs the Commity CLI tool globally

set -e

echo "🤖 Commity CLI Installation"
echo "==========================="
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

# Check if VS Code extension is installed
echo "🔍 Checking for VS Code extension settings..."
if [ -f "$HOME/Library/Application Support/Code/User/settings.json" ] || [ -f "$HOME/.config/Code/User/settings.json" ] || [ -f "$HOME/AppData/Roaming/Code/User/settings.json" ]; then
    echo "✅ VS Code settings found"
    echo ""
    echo "💡 To use Commity with VS Code extension settings:"
    echo "1. Install the Commity VS Code extension"
    echo "2. Configure your OpenAI API key in VS Code settings"
    echo "3. Run 'commity' from command line"
    echo ""
else
    echo "⚠️  VS Code settings not found"
    echo ""
    echo "💡 To use Commity with environment variables:"
    echo "1. Create a .env file"
    echo "2. Add your OpenAI API key: OPENAI_API_KEY=sk-your-key-here"
    echo "3. Run 'commity' from command line"
    echo ""
fi

echo "🎯 Usage:"
echo "=========="
echo ""
echo "1. Stage your changes:"
echo "   git add <files>"
echo ""
echo "2. Generate commit message:"
echo "   commity"
echo ""
echo "3. The tool will:"
echo "   - Read your staged changes"
echo "   - Generate an AI commit message with emoji"
echo "   - Ask for your confirmation"
echo ""

echo "🚀 You're all set! Happy committing! 🎉" 