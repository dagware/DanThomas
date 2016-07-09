
```js
ObjC.import('AppKit');

// Sets the clipboard to the KM Actions Plist string, so it can be pasted
// into the KM editor as one or more actions.
function setClipboardToKMActionsPlistString(str) {
	setClipboardStringForType(str, kmConstants.actionsClipboardType);
}
```

Uses:
* [setClipboardStringForType](JXA%2FClipboard%20Utilities%2FsetClipboardStringForType.md)
* [getClipboardTypes](JXA%2FClipboard%20Utilities%2FgetClipboardTypes.md)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA%2FKeyboard%20Maestro%20Routines%2FDEMO%20-%20Clipboard%20Read%2C%20Write%2C%20and%20KM%20Action%20Macro%20Plist%20example.md)