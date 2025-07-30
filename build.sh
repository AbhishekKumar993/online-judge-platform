#!/bin/bash
set -e  # Exit on any error

echo "🚀 Starting frontend build and copy process..."
echo "📍 Current directory: $(pwd)"
echo "📁 Available files: $(ls -la)"

# Navigate to Frontend and build
echo "📦 Building frontend..."
cd Frontend
echo "📍 In Frontend directory: $(pwd)"

# Install dependencies and build
npm ci
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Frontend build failed - no dist directory found"
    exit 1
fi

echo "✅ Frontend build completed"
echo "📁 Frontend dist contents: $(ls -la dist)"

# Navigate back and copy to Backend
echo "📋 Copying frontend to Backend..."
cd ..
echo "📍 Back to root: $(pwd)"

# Ensure Backend directory exists
if [ ! -d "Backend" ]; then
    echo "❌ Backend directory not found"
    exit 1
fi

# Copy frontend dist to Backend
cp -r Frontend/dist Backend/
echo "✅ Frontend copied to Backend/dist"

# Verify copy
if [ -d "Backend/dist" ]; then
    echo "✅ Verification: Backend/dist exists"
    echo "📁 Backend/dist contents: $(ls -la Backend/dist)"
else
    echo "❌ Copy failed - Backend/dist does not exist"
    exit 1
fi

# Install Backend dependencies
echo "📦 Installing Backend dependencies..."
cd Backend
npm ci
cd ..

echo "🎉 Build process completed successfully!"
