
```js
ObjC.import('AppKit');

// Returns true if the specified "type" is on the clipboard.
// PARAMETERS:
//   type   Type type, like "public.utf8-plain-text".
//   types  OPTIONAL. You can pass the available clipboard types, usually
//          retrieved from getClipboardTypes(), if you want. You would do
//          this if you had already called getClipboardTypes() for some
//          other reason, and wanted to eliminate calling it again. No big
//          deal either way.
// UPDATED: 2016/07/05 08:09 PDT
function clipboardContainsType(type, types) {
	return (types || getClipboardTypes()).indexOf(type) >= 0;
}
```

Uses:
* [getClipboardTypes](JXA/getClipboardTypes)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA/DEMO - Clipboard Read, Write, and KM Action Macro Plist example)