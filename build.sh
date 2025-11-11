#!/bin/bash

# Build script for De-AI Google extension
echo "Building De-AI Google Extension..."

# Chrome/Edge build (already ready)
echo "✅ Chrome/Edge version ready (use current files)"

# Safari build
echo "🔄 Creating Safari build..."

# Create Safari build directory
mkdir -p build/safari
mkdir -p build/chrome

# Copy Chrome files
cp manifest.json build/chrome/
cp content.js build/chrome/
cp LICENSE build/chrome/
cp -r icons build/chrome/

# Copy Safari files (rename appropriately)
cp manifest-safari.json build/safari/manifest.json
cp content-safari.js build/safari/content-safari.js
cp LICENSE build/safari/
cp -r icons build/safari/

# Check if Safari conversion is requested
if [[ "$1" == "--safari-convert" ]]; then
    echo "🔄 Converting to Safari App Extension..."
    if command -v xcrun &> /dev/null; then
        xcrun safari-web-extension-converter ./build/safari --project-location ./safari
        echo "✅ Safari Xcode project created in ./safari/"
    else
        echo "❌ xcrun not found. Make sure Xcode Command Line Tools are installed."
        exit 1
    fi
fi

echo "✅ Build complete!"
echo ""
echo "📁 Chrome/Edge build: build/chrome/"
echo "📁 Safari build: build/safari/"
echo ""
echo "Usage:"
echo "  Chrome/Edge: Load 'build/chrome' as unpacked extension"
echo "  Safari: Run 'xcrun safari-web-extension-converter ./build/safari --project-location ./safari'"
echo ""
echo "To create Safari Xcode project automatically:"
echo "  ./build.sh --safari-convert"