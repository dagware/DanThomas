
```js
ObjC.import('AppKit');

// Sets the clipboard to the KM Actions Plist string, so it can be pasted
// into the KM editor as one or more actions.
function setClipboardToKMActionsPlistString(str) {
	setClipboardStringForType(str, kmConstants.actionsClipboardType);
}
```

Uses:
* [setClipboardStringForType](JXA/setClipboardStringForType)
* [getClipboardTypes](JXA/getClipboardTypes)

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA/DEMO - Clipboard Read, Write, and KM Action Macro Plist example)