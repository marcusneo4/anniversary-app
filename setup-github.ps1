# GitHub Repository Setup Script
# This script helps you set up the GitHub repository and deploy to GitHub Pages

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Setup for Anniversary App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Check current branch
$currentBranch = git branch --show-current
if (-not $currentBranch) {
    Write-Host "Creating main branch..." -ForegroundColor Yellow
    git checkout -b main
}

Write-Host ""
Write-Host "Step 1: Create a new repository on GitHub" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Green
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: anniversary-app" -ForegroundColor White
Write-Host "3. Description: Romantic anniversary app with interactive features" -ForegroundColor White
Write-Host "4. Choose: Private (recommended) or Public" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "6. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Have you created the repository? (y/n)"
if ($continue -ne "y" -and $continue -ne "Y") {
    Write-Host "Please create the repository first, then run this script again." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Step 2: Enter your GitHub username" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Green
$username = Read-Host "GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "Username cannot be empty. Exiting." -ForegroundColor Red
    exit
}

$repoUrl = "https://github.com/$username/anniversary-app.git"

Write-Host ""
Write-Host "Step 3: Adding remote and pushing code..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Green

# Add remote
Write-Host "Adding remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $repoUrl

# Check if we have commits
$hasCommits = git log --oneline 2>$null
if (-not $hasCommits) {
    Write-Host "No commits found. Making initial commit..." -ForegroundColor Yellow
    git add .
    git commit -m "Initial commit: Anniversary app with interactive map and region-based country selection"
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for your GitHub credentials." -ForegroundColor Yellow
Write-Host ""

try {
    git branch -M main
    git push -u origin main
    Write-Host ""
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Step 4: Enable GitHub Pages" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Green
    Write-Host "1. Go to: https://github.com/$username/anniversary-app/settings/pages" -ForegroundColor White
    Write-Host "2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
    Write-Host "3. The site will be available at:" -ForegroundColor White
    Write-Host "   https://$username.github.io/anniversary-app/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "The GitHub Actions workflow will automatically deploy your site!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "Error pushing to GitHub. Please check:" -ForegroundColor Red
    Write-Host "1. Your GitHub credentials are correct" -ForegroundColor Yellow
    Write-Host "2. The repository exists at: $repoUrl" -ForegroundColor Yellow
    Write-Host "3. You have push access to the repository" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can manually push using:" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
}

