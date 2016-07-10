# ClipboardUtils
Methods for manipulating the system Clipboard (Pasteboard).
### NOTE: ###
This class uses the "Module" Design Pattern. Basically, anything in the "return" statement is public, everything before it is private.

See https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

## [Jump to the Source Code](#source)

---

## Functions and Usage
* [clipboardContainsType()](#clipboardContainsType)
* [getClipboardString()](#getClipboardString)
* [getClipboardStringForType()](#getClipboardStringForType)
* [getClipboardTypes()](#getClipboardTypes)
* [getCurrentApp()](#getCurrentApp)
* [getPlainTextClipboardType()](#getPlainTextClipboardType)
* [setClipboardStringForType()](#setClipboardStringForType)
* [Source Code](#source)

---

### <a name="clipboardContainsType"></a>ClipboardUtils.clipboardContainsType(type)
**PURPOSE:**
Returns true if the specified "type" is on the clipboard.

---

### <a name="getClipboardString"></a>ClipboardUtils.getClipboardString(throwIfNotFound)
**PURPOSE:**
Gets a string from the clipboard - any type of string available.

If the clipboard doesn't contain string content, the result will be 'undefined' unless 'throwIfNotFound' is true, in which case an exception is thrown.

---

### <a name="getClipboardStringForType"></a>ClipboardUtils.getClipboardStringForType(type, throwIfNotFound)
**PURPOSE:**
Gets a string of the specified type from the clipboard.

If the clipboard doesn't contain the specified type, the result will be 'undefined' unless 'throwIfNotFound' is true, in which case an exception is thrown.

---

### <a name="getClipboardTypes"></a>ClipboardUtils.getClipboardTypes()
**PURPOSE:**
Returns an array of strings containing all the clipboard types currently present on the clipboard.

---

### <a name="getCurrentApp"></a>ClipboardUtils.getCurrentApp()
**PURPOSE:**
Returns the current application, with "includeStandardAdditions" set to true. The object is cached, so subsequent calls return the same object.
**NOTES:**
This is used mostly internally, but it's available if you ever need it.


---

### <a name="getPlainTextClipboardType"></a>ClipboardUtils.getPlainTextClipboardType()
**PURPOSE:**
Returns the clipboard type for plain text, e.g. "public.utf8-plain-text".

---

### <a name="setClipboardStringForType"></a>ClipboardUtils.setClipboardStringForType(str, type)
**PURPOSE:**
Sets the clipboard to the string of the specified type.

---

## <a name="source"></a>Source Code

```js
ObjC.import('AppKit');

var ClipboardUtils = (function() {
	var _plainTextClipboardType = "public.utf8-plain-text";
	var _currentApp = undefined;

	return {
		getCurrentApp: function() {
			if (!_currentApp) {
				_currentApp = Application.currentApplication();
				_currentApp.includeStandardAdditions = true;
			}
			return _currentApp;
		},

		getPlainTextClipboardType: function() {
			return _plainTextClipboardType;
		},

		clipboardContainsType: function(type) {
			return this.getClipboardTypes().indexOf(type) >= 0;
		},

		getClipboardString: function(throwIfNotFound) {
			var s = this.getCurrentApp().theClipboard();
			if (s == undefined) {
				if (throwIfNotFound)
					throw Error("No clipboard data");
				return undefined;
			}
			return s.toString();
		},

		getClipboardStringForType: function(type, throwIfNotFound) {
			if (this.clipboardContainsType(type))
				return ObjC.unwrap(
					$.NSPasteboard.generalPasteboard
					.stringForType(type));
			if (throwIfNotFound)
				throw Error("No clipboard data for specified type");
			return undefined;
		},

		getClipboardTypes: function() {
			return ObjC.deepUnwrap(
				$.NSPasteboard.generalPasteboard
				.pasteboardItems.js[0].types);
		},

		setClipboardStringForType: function(str, type) {
			var clipboard = $.NSPasteboard.generalPasteboard;
			clipboard.clearContents;
			clipboard.setStringForType($(str), $(type));
		}
	}
})();
```