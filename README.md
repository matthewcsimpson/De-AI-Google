# De-AI Google Browser Extension

The Google AI Overview of search results is often quite bad, so this extension automatically modifies Google search queries to exclude AI-generated results and forces classic search results view. Available for both Chrome and Safari.

## Installation

### Chrome/Edge

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension will be installed and active immediately

### Safari (Development)

1. Clone or download this repository
2. Build Safari version and convert to Xcode project:
   ```bash
   ./build.sh --safari-convert
   ```
   Or manually:
   ```bash
   ./build.sh
   xcrun safari-web-extension-converter ./build/safari --project-location ./safari
   ```
3. Open the generated Xcode project: `open ./safari/De-AI\ Google/De-AI\ Google.xcodeproj`
4. Run the project in Xcode to install in Safari
5. Enable the extension in Safari > Settings > Extensions

### From Browser Stores

_Note: This extension is not currently published on browser extension stores_

## Features

- **Automatic AI Exclusion**: Appends `-ai` to all Google search queries to filter out AI-generated content
- **Classic Results**: Forces Google to display classic search results (`udm=14` parameter)
- **Smart Query Processing**: Prevents duplicate `-ai` additions and normalizes queries
- **Form Interception**: Handles both direct URL navigation and form submissions
- **Dynamic Updates**: Works with single-page application navigation and history changes

## How It Works

The extension uses multiple approaches to ensure consistent behavior:

1. **Declarative Net Request**: Automatically adds `udm=14` parameter to Google search URLs
2. **Content Script**: Modifies search queries in real-time and handles form submissions
3. **URL Rewriting**: Processes both direct navigation and dynamic page changes

## Technical Details

### Permissions

**Chrome/Edge:**

- `declarativeNetRequestWithHostAccess`: For URL redirection rules
- `host_permissions`: Access to Google search domains

**Safari:**

- `host_permissions`: Access to Google search domains only
- No declarative net request (uses content script approach)

### Query Modification Logic

1. **Normalization**: Removes existing `-ai` terms to prevent duplication
2. **Addition**: Appends ` -ai` to the cleaned query
3. **Parameter Injection**: Ensures `udm=14` is present for classic results
4. **Deduplication**: Tracks last applied URL to prevent infinite redirects

### Browser Compatibility

- **Chrome**: ✅ Fully supported (Manifest V3 + Declarative Net Request)
- **Edge**: ✅ Fully supported (Chromium-based, uses Chrome files)
- **Safari**: ✅ Supported (uses Safari-specific files, content script only)
- **Firefox**: ❌ Not compatible (uses Chrome-specific APIs)

## Configuration

The extension works out of the box with no configuration required. Supports major Google search domains:

- `google.com`
- `google.co.uk`, `google.ca`, `google.de`
- `google.fr`, `google.it`, `google.es`
- `google.com.au`, `google.co.jp`
- And other Google country domains

## Development

### Building

**Chrome/Edge:** No build process required - load unpacked extension directly.

**Safari:** Proper Safari Web Extension development requires Apple's conversion tool:

```bash
# 1. Build Safari-compatible files
./build.sh

# 2. Convert to Safari App Extension using Apple's tool
xcrun safari-web-extension-converter ./build/safari --project-location ./safari

# 3. Open the generated Xcode project
open ./safari/De-AI Google/De-AI Google.xcodeproj
```

**Alternative Safari setup (manual):**

1. Use Safari-specific manifest and content script files from `build/safari/`
2. Follow Apple's Safari Web Extension guidelines
3. Use Xcode for development and distribution

### Testing

**Chrome/Edge:**

1. Load the extension in developer mode
2. Navigate to Google Search
3. Perform a search query
4. Verify that:
   - The query includes ` -ai` at the end
   - The URL includes `udm=14` parameter
   - Classic search results are displayed

**Safari:**

1. Use Safari Web Extension development tools
2. Convert extension: `xcrun safari-web-extension-converter ./build/safari --project-location ./safari`
3. Open generated Xcode project and run in Safari
4. Verify same functionality as Chrome version

### Debugging

**Chrome/Edge:**

- Check the console for any JavaScript errors
- Use Chrome DevTools to inspect network requests
- Monitor the extension's background page in `chrome://extensions/`

**Safari:**

- Use Safari Web Inspector for debugging
- Check console for JavaScript errors
- Monitor extension behavior through Safari's developer tools

## Troubleshooting

### Extension Not Working

1. Ensure the extension is enabled in `chrome://extensions/`
2. Check that you're on a Google search page
3. Refresh the page after installing/updating the extension

### Queries Not Modified

1. Check browser console for JavaScript errors
2. Ensure content scripts are allowed to run
3. Verify the extension has necessary permissions

### Classic Results Not Showing

1. Clear browser cache and cookies for Google
2. Check if Google has changed their classic results parameter
3. Try manually adding `&udm=14` to a Google search URL

## Privacy

This extension:

- ✅ Does NOT collect any personal data
- ✅ Does NOT send data to external servers
- ✅ Only modifies Google search URLs locally
- ✅ Works entirely within your browser

## Version History

### v1.0.0 (Current)

- Initial release with dual Chrome/Safari support
- Declarative Net Request implementation for Chrome/Edge
- Content-script only implementation for Safari
- Smart query normalization and deduplication
- Form interception and dynamic page handling
- Automated build system for platform-specific deployments

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License allows you to freely use, modify, and distribute this software.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Open an issue on the project repository
3. Include your browser version and extension version (v1.0.0)

## Browser-Specific Implementation

### Chrome/Edge (Recommended)

- **Files**: Use root directory or `build/chrome/`
- **Components**: `manifest.json`, `rules.json`, `content.js`
- **Features**: Declarative Net Request + Content Script (fastest, most efficient)
- **Performance**: Excellent (browser-level URL interception)

### Safari

- **Files**: Use `build/safari/` directory (generated by build script)
- **Components**: `manifest.json` (from manifest-safari.json), `content-safari.js`
- **Features**: Content Script only (no declarative net request support)
- **Performance**: Good (JavaScript-based URL monitoring)
- **Note**: Slightly more resource usage due to content-script-only approach

---

**Note**: This extension modifies Google search behavior. Google may update their search parameters or detection methods, which could affect functionality.
