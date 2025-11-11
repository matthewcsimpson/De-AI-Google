#!/bin/bash

# Build script for De-AI Google Chrome extension
echo "Building De-AI Google Chrome Extension..."

# Chrome/Edge build
echo "🔄 Creating Chrome build..."

# Create Chrome build directory
mkdir -p build/chrome

# Copy Chrome files
cp manifest.json build/chrome/
cp content.js build/chrome/
cp LICENSE build/chrome/
cp -r icons build/chrome/

echo "✅ Build complete!"
echo ""
echo "📁 Chrome/Edge build: build/chrome/"
echo ""
echo "Usage:"
echo "  Chrome/Edge: Load 'build/chrome' as unpacked extension"