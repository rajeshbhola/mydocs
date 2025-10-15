#!/bin/bash

# Deploy script for GitHub Pages (main branch, site folder only)

echo "🔨 Building the site..."
python -m mkdocs build

echo "📦 Preparing deployment..."
cd site

# Initialize git in site folder if not already
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/rajeshbhola/mydocs.git
fi

# Add all files
git add -A

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "Deploy documentation - $(date '+%Y-%m-%d %H:%M:%S')"

# Force push to main branch
echo "🚀 Deploying to GitHub Pages..."
git push -f origin main

echo "✅ Deployment complete!"
echo "🌐 Site will be available at: https://rajeshbhola.github.io/mydocs/"

cd ..
