# Anniversary App Startup Script
Write-Host "Starting Anniversary App..." -ForegroundColor Cyan

# Check if Node.js is installed
$nodeVersion = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeVersion) {
    Write-Host "`n❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "`nPlease install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download and install the LTS version" -ForegroundColor White
    Write-Host "3. Restart your terminal and run this script again" -ForegroundColor White
    Write-Host "`nOr install via winget:" -ForegroundColor Yellow
    Write-Host "   winget install OpenJS.NodeJS.LTS" -ForegroundColor White
    exit 1
}

Write-Host "✅ Node.js found: $(node --version)" -ForegroundColor Green
Write-Host "✅ npm found: $(npm --version)" -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n🚀 Starting development server..." -ForegroundColor Green
Write-Host "`nThe site will be available at: http://localhost:5174" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Yellow

npm run dev

