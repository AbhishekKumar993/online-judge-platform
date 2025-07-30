#!/bin/bash

# Quick deployment script
echo "🚀 Starting quick deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    commit_message="Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"
    
    # Push to trigger deployment
    git push
    
    echo "🎉 Deployment triggered! Check your Render dashboard."
    echo "🌐 Your app will be live at: https://online-judge-platform-kv5u.onrender.com"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi
