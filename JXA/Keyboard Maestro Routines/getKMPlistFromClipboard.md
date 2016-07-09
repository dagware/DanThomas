
```js
ObjC.import('AppKit');

// Returns a Keyboard Maestro plist from the clipboard, containing
// either Groups or Macros.
// UPDATED: 2016/06/21 14:50 PDT
function getKMPlistFromClipboard() {
    if (clipboardContainsType("com.stairways.keyboardmaestro.actionarray"))
        return ObjC.unwrap($.NSPasteboard.generalPasteboard.stringForType('com.stairways.keyboardmaestro.actionarray'));
    if (clipboardContainsType("com.stairways.keyboardmaestro.macrosarray"))
        return ObjC.unwrap($.NSPasteboard.generalPasteboard.stringForType('com.stairways.keyboardmaestro.macrosarray'));
    return undefined;
}
```

See also:

* [getKMActionsFromClipboard](JXA%2FKeyboard%20Maestro%20Routines%2FgetKMActionsPlistStringFromClipboard.md)
* [getKMMacroAndGroupByMacroUUID](JXA%2FKeyboard%20Maestro%20Routines%2FgetKMMacroAndGroupByMacroUUID.md)