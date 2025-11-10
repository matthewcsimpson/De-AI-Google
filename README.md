# De-AI Google Browser Extension

A browser extension that automatically modifies Google search queries to exclude AI-generated results and forces classic search results view. Available for both Chrome and Safari.

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

## Installation

### Chrome/Edge

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension will be installed and active immediately

### Safari

1. Clone or download this repository
2. Use the Safari-specific files (`manifest-safari.json` and `content-safari.js`)
3. Follow Safari Web Extension development guidelines
4. Build through Xcode and Safari Web Extension toolkit

### From Browser Stores

_Note: This extension is not currently published on browser extension stores_

## Files Structure

```
Remove-AI-Summary/
├── manifest.json          # Chrome/Edge extension manifest (v3)
├── manifest-safari.json   # Safari extension manifest
├── rules.json             # Declarative Net Request rules (Chrome/Edge)
├── content.js             # Content script for Chrome/Edge
├── content-safari.js      # Enhanced content script for Safari
├── icons/                 # Extension icons (16, 32, 48, 128px)
├── README.md              # This file
├── .gitignore             # Git ignore file
└── _metadata/             # Chrome-generated metadata
    └── generated_indexed_rulesets/
        └── _ruleset1      # Compiled ruleset (binary)
```

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

**Safari:** Requires Safari Web Extension development setup:
1. Use Safari-specific manifest and content script files
2. Follow Apple's Safari Web Extension guidelines
3. Build through Xcode for distribution

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
2. Test with the Safari-specific files
3. Verify same functionality as Chrome version

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

### v1.2.1 (Current)
- Updated permissions to be more specific (Google domains only)
- Added Safari compatibility with dedicated files
- Improved query normalization
- Better handling of dynamic page changes
- Added proper extension icons

### v1.1.1
- Stable release with declarative net request rules
- Improved query normalization
- Better handling of dynamic page changes

## License

This project is open source. Feel free to modify and distribute according to your needs.

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
3. Include your Chrome version and extension version

## Browser-Specific Implementation

### Chrome/Edge (Recommended)
- **Files**: `manifest.json`, `rules.json`, `content.js`
- **Features**: Declarative Net Request + Content Script (fastest, most efficient)
- **Performance**: Excellent (browser-level URL interception)

### Safari
- **Files**: `manifest-safari.json`, `content-safari.js`
- **Features**: Content Script only (no declarative net request support)
- **Performance**: Good (JavaScript-based URL monitoring)
- **Note**: Slightly more resource usage due to content-script-only approach

---

**Note**: This extension modifies Google search behavior. Google may update their search parameters or detection methods, which could affect functionality.
