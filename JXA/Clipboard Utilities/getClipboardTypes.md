
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
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA%2FKeyboard%20Maestro%20Routines%2FDEMO%20-%20Clipboard%20Read%2C%20Write%2C%20and%20KM%20Action%20Macro%20Plist%20example.md)