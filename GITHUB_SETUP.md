# GitHub Repository Setup Guide

## ✅ What's Already Done

- ✅ Git repository initialized
- ✅ All files committed
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Vite config updated for GitHub Pages
- ✅ `.gitignore` file created

## 📋 Next Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `anniversary-app`
3. **Description**: `Romantic anniversary app with interactive features`
4. **Visibility**: Choose Private (recommended) or Public
5. **⚠️ IMPORTANT**: Do NOT check any boxes (no README, .gitignore, or license)
6. Click **"Create repository"**

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these instead:

```powershell
# Navigate to your project
cd "c:\Users\e0775081\Downloads\anniversary-app"

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/anniversary-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**OR** use the automated script:

```powershell
.\setup-github.ps1
```

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/anniversary-app`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**

### Step 4: Wait for Deployment

- GitHub Actions will automatically build and deploy your site
- You can check the progress in the **Actions** tab
- Once complete, your site will be available at:
  ```
  https://YOUR_USERNAME.github.io/anniversary-app/
  ```

## 🔧 Troubleshooting

### If push fails with authentication error:

**Option 1: Use Personal Access Token**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing

**Option 2: Use GitHub Desktop**
1. Download GitHub Desktop
2. Add your repository
3. Push from there

### If the site doesn't load:

1. Check that the base path in `vite.config.ts` matches your repository name
2. Verify GitHub Actions workflow completed successfully
3. Check repository Settings → Pages to ensure it's using "GitHub Actions"

## 📝 Important Notes

- The base path in `vite.config.ts` is set to `/anniversary-app/`
- If you change the repository name, update the `base` path in `vite.config.ts`
- The site will automatically redeploy on every push to `main` branch

## 🎉 You're Done!

Once deployed, share your beautiful anniversary app at:
`https://YOUR_USERNAME.github.io/anniversary-app/`

