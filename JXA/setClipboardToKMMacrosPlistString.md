
```js
ObjC.import('AppKit');

// Sets the clipboard to the KM Macros Plist string, so it can be pasted
// into the KM editor as one or more macros.
function setClipboardToKMMacrosPlistString(str) {
	setClipboardStringForType(str, kmConstants.macrosClipboardType);
}
```

Uses:
* [setClipboardStringForType](JXA/setClipboardStringForType)
* [getClipboardTypes](JXA/getClipboardTypes)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA/DEMO - Clipboard Read, Write, and KM Action Macro Plist example)