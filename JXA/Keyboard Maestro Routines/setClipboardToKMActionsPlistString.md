
```js
ObjC.import('AppKit');

// Sets the clipboard to the KM Actions Plist string, so it can be pasted
// into the KM editor as one or more actions.
function setClipboardToKMActionsPlistString(str) {
	ClipboardUtils.setClipboardStringForType(str, kmConstants.actionsClipboardType);
}
```

Uses:
* [ClipboardUtils](..%2FClipboardUtils.md)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](DEMO%20-%20Clipboard%20Read%2C%20Write%2C%20and%20KM%20Action%20and%20Macro%20Plist%20example.md)