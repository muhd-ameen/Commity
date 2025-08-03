<div align="center">

<img src="https://raw.githubusercontent.com/muhd-ameen/Commity/main/logo.png" width="100" alt="Commity Logo" />

# 🤖 Commity

> **AI-powered commit messages that don’t suck. With emojis.**

</div>

Writing commit messages was killing me. So I built Commity.  
A tiny CLI tool that looks at your staged git changes, asks OpenAI what the hell you just did, and gives you a clean, emoji’d commit line you can actually be proud of.

No more `Update` or `fixes lol`.

---

## 🧪 What it actually does

- Reads your `git diff`  
- Sends it to OpenAI  
- Spits back a commit message that *makes sense*  
- Drops in a matching emoji (because vibes matter)  
- You hit enter. Boom. Committed.

---

## ⚡ Why it slaps

- 🧠 **Smarter than you on bad days** – AI writes your commit messages  
- 🎯 **Emoji sniper** – Tags it right: 🐛 for bugs, ✨ for features, etc.  
- 🔒 **Safe** – Your API key stays in `.env`, not flying around  
- 💬 **Talks to you** – Edit, confirm, cancel. Like a chill assistant.  
- 🎨 **Sexy CLI** – Colors, prompts, feedback. Feels alive.

---

## 🏁 Getting Started (takes 1 min max)

**1. Install**
```bash
npm install -g commity-ai-commit-tool
```

**2. Add your OpenAI key**
```bash
echo "OPENAI_API_KEY=sk-..." > .env
```

→ Grab key from [here](https://platform.openai.com/api-keys)  
→ Yes, free tier works too

![Add key](https://raw.githubusercontent.com/muhd-ameen/Commity/main/ss1.png)

**3. Use it**
```bash
git add .
commity
```

![CLI shot](https://raw.githubusercontent.com/muhd-ameen/Commity/main/ss2.png)  
![Commit success](https://raw.githubusercontent.com/muhd-ameen/Commity/main/ss3.png)

---

## 🧠 Sample Output

```bash
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
```

You just saved 2 minutes *and* looked smart doing it.

---

## 🔥 Emoji Mapping (Auto-detected)

| Type | Emoji |
|------|-------|
| New Feature | ✨ |
| Bug Fix | 🐛 |
| Docs | 📚 |
| Performance | ⚡ |
| Refactor | ♻️ |
| Tests | 🧪 |
| Config | ⚙️ |
| Security | 🔒 |
| UI | 🎨 |
| DB | 🗄️ |
| API | 🔌 |
| Deploy | 🚀 |
| Packages | 📦 |

---

## 🛠️ Configs (Only if you’re picky)

| Env Variable | What it does | Default |
|--------------|--------------|---------|
| `OPENAI_API_KEY` | Your OpenAI key (duh) | – |
| `OPENAI_MODEL` | Which model to use | `gpt-4o-mini` |

**Supported Models:**

- `gpt-4o-mini` (default)  
- `gpt-4o`  
- `gpt-4-turbo`  
- `gpt-3.5-turbo`

---

## 😭 If it breaks

- **API key not found?** → You forgot the `.env` file  
- **"No staged changes"?** → Run `git add .`  
- **Not in a repo?** → `git init`, friend  

---

## 🧱 Code Structure (for devs)

```
commity/
├── cli-wrapper.js   // handles terminal
├── ai.js            // OpenAI stuff
├── git.js           // git logic
├── prompt.js        // CLI questions
├── package.json     // npm life
└── README.md        // this file
```

---

## 🛠️ Wanna contribute?

Yes please. PRs welcome.

1. Fork it  
2. `git checkout -b cool-feature`  
3. Code  
4. `git commit -m '✨ adds cool stuff'`  
5. Open PR  

Bugs? Feature ideas? → [Open an issue](https://github.com/muhd-ameen/Commity/issues)

---

## 📜 License

MIT. Steal with style.

---

## ❤️ Credits

- Powered by OpenAI (shoutout)
- Inspired by late-night coding guilt
- Built by [Muhammad Ameen](https://github.com/muhd-ameen) with coffee, rage, and love

---

**No more cringe commit messages. Let Commity talk.**  
Install now → `npm install -g commity-ai-commit-tool`
