
```js
ObjC.import('AppKit');

// Sets the clipboard to the string of the specified type.
// PARAMETERS:
//   str    The string to put on the clipboard.
//   type   The type, like "public.utf8-plain-text".
// UPDATED: 2016/07/05 08:12 PDT
function setClipboardStringForType(str, type) {
	var clipboard = $.NSPasteboard.generalPasteboard;
	clipboard.clearContents;
	clipboard.setStringForType($(str), $(type));
}
```

## For a complete example, see:
* [DEMO - Clipboard Read, Write, and KM Action/Macro Plist example](JXA/DEMO - Clipboard Read, Write, and KM Action Macro Plist example)