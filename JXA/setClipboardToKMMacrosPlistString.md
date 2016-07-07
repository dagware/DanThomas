
```js
ObjC.import('AppKit');

// Sets the clipboard to the KM Macros Plist string, so it can be pasted
// into the KM editor as one or more macros.
function setClipboardToKMMacrosPlistString(str) {
	setClipboardStringForType(str, kmConstants.macrosClipboardType);
}
```

Uses:
* [setClipboardStringForType](JXA%2FsetClipboardStringForType)
* [getClipboardTypes](JXA%2FgetClipboardTypes)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA%2FDEMO%20-%20Clipboard%20Read%2C%20Write%2C%20and%20KM%20Action%20Macro%20Plist%20example)