@echo off
REM Deploy script for GitHub Pages (Windows)

echo Building the site...
python -m mkdocs build

echo Preparing deployment...
cd site

REM Initialize git in site folder if not already
if not exist ".git" (
    git init
    git remote add origin https://github.com/rajeshbhola/mydocs.git
)

REM Add all files
git add -A

REM Commit with timestamp
echo Committing changes...
git commit -m "Deploy documentation - %date% %time%"

REM Force push to main branch
echo Deploying to GitHub Pages...
git push -f origin main

echo Deployment complete!
echo Site will be available at: https://rajeshbhola.github.io/mydocs/

cd ..
pause
