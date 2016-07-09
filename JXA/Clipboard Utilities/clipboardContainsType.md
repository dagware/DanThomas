
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
* [getClipboardTypes](getClipboardTypes.md)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](Keyboard%20Maestro%20Routines%2FDEMO%20-%20Clipboard%20Read%2C%20Write%2C%20and%20KM%20Action%20Macro%20Plist%20example.md)