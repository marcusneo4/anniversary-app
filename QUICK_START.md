# 🚀 Quick Start - Deploy to GitHub Pages

## Your code is ready! Follow these 3 simple steps:

### 1️⃣ Create GitHub Repository (2 minutes)

1. Open: https://github.com/new
2. Repository name: **anniversary-app**
3. Description: **Romantic anniversary app**
4. Choose: **Private** (recommended)
5. **Don't check any boxes** (no README, .gitignore, license)
6. Click **"Create repository"**

### 2️⃣ Push Your Code (1 command)

After creating the repo, run this (replace `YOUR_USERNAME`):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/anniversary-app.git
git push -u origin main
```

**OR** run the automated script:
```powershell
.\setup-github.ps1
```

### 3️⃣ Enable GitHub Pages (30 seconds)

1. Go to: `https://github.com/YOUR_USERNAME/anniversary-app/settings/pages`
2. Under **Source**, select **"GitHub Actions"**
3. Click **Save**

## ✨ That's it!

Your site will be live at:
**https://YOUR_USERNAME.github.io/anniversary-app/**

The GitHub Actions workflow will automatically build and deploy your site every time you push code!

---

📖 For detailed instructions, see `GITHUB_SETUP.md`

