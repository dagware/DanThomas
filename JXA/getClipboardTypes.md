
```js
ObjC.import('AppKit');

// Returns an array of strings containing all the clipboard
// types currently present on the clipboard.
// UPDATED: 2016/07/05 08:02 PDT
function getClipboardTypes() {
	return ObjC.deepUnwrap(
		$.NSPasteboard.generalPasteboard.pasteboardItems.js[0].types);
}
```

For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA/DEMO - Clipboard Read, Write, and KM Action Macro Plist example)