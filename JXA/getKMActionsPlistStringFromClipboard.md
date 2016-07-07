
```js
ObjC.import('AppKit');

// Returns a string containing the "source code" (aka plist) of the Keyboard
// Maestro Action(s) on the clipboard, if any, otherwise returns undefined.
// PARAMETERS:
//   types  OPTIONAL. You can pass the available clipboard types, usually
//          retrieved from getClipboardTypes(), if you want. You would do
//          this if you had already called getClipboardTypes() for some
//          other reason, and wanted to eliminate calling it again. No big
//          deal either way.
// UPDATED: 2016/07/05 08:44 PDT
function getKMActionsPlistStringFromClipboard(types) {
	return getClipboardStringForType(kmConstants.actionsClipboardType, types);
}
```

Uses:
* [getClipboardStringForType](JXA/getClipboardStringForType)
* [clipboardContainsType](JXA/clipboardContainsType)
* [getClipboardTypes](JXA/getClipboardTypes)
* [kmConstants](JXA/kmConstants)

Also see:
* [getKMMacrosPlistStringFromClipboard](JXA/getKMMacrosPlistStringFromClipboard)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA/DEMO - Clipboard Read, Write, and KM Action Macro Plist example)