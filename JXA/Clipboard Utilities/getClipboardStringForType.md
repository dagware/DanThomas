
```js
ObjC.import('AppKit');

// Returns the string value of the specified clipboard type from the
// clipboard if present, otherwise returns undefined.
// PARAMETERS:
//   type   The type, like "public.utf8-plain-text".
//   types  OPTIONAL. You can pass the available clipboard types, usually
//          retrieved from getClipboardTypes(), if you want. You would do
//          this if you had already called getClipboardTypes() for some
//          other reason, and wanted to eliminate calling it again. No big
//          deal either way.
// UPDATED: 2016/07/05 08:12 PDT
function getClipboardStringForType(type, types) {
	if (clipboardContainsType(type, types))
		return ObjC.unwrap(
			$.NSPasteboard.generalPasteboard
			.stringForType(type));
	return undefined;
}
```

Uses:
* [clipboardContainsType](clipboardContainsType.md)
* [getClipboardTypes](getClipboardTypes.md)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](Keyboard%20Maestro%20Routines%2FDEMO%20-%20Clipboard%20Read%2C%20Write%2C%20and%20KM%20Action%20Macro%20Plist%20example.md)