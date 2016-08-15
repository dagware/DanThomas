# ClipboardUtils
Methods for manipulating the system Clipboard (Pasteboard).
### NOTE: ###
This class uses the "Module" Design Pattern. Basically, anything in the "return" statement is public, everything before it is private.

See https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

## [Jump to the Source Code](#source)

---

## Functions and Usage
* [clearContents()](#clearContents)
* [clipboardContainsType()](#clipboardContainsType)
* [getClipboardString()](#getClipboardString)
* [getClipboardStringForType()](#getClipboardStringForType)
* [getClipboardTypes()](#getClipboardTypes)
* [getPlainTextClipboardType()](#getPlainTextClipboardType)
* [setClipboardString()](#setClipboardString)
* [setClipboardStringForType()](#setClipboardStringForType)
* [Source Code](#source)

---

### <a name="clearContents"></a>PathNameUtils.clearContents()
**PURPOSE:**
Clears the contents of the clipboard.

---

### <a name="clipboardContainsType"></a>ClipboardUtils.clipboardContainsType(_type_)
**PURPOSE:**
Returns **true** if _type_ is on the clipboard.

**PARAMETERS:**
_type_: A string value representing the clipboard type.

---

### <a name="getClipboardString"></a>ClipboardUtils.getClipboardString(_throwIfNotFound_)
**PURPOSE:**
Returns trhe current clipboard contents as a if possible.

If the clipboard doesn't contain string content, the result will be an empty string unless _throwIfNotFound_ is **true**, in which case an exception is thrown.

**PARAMETERS:**
_throwIfNotFound_: OPTIONAL. Default **false**. If **true** and a string value can't be retrieved from the clipboard, an exception is thrown.

---

### <a name="getClipboardStringForType"></a>ClipboardUtils.getClipboardStringForType(_type_, _throwIfNotFound_)
**PURPOSE:**
Returns a string of the specified clipboard type from the clipboard.

If the clipboard doesn't contain the specified type, the result will be an empty string unless _throwIfNotFound_ is true, in which case an exception is thrown.

**PARAMETERS:**
_type_: A string value representing the desired clipboard type.
_throwIfNotFound_: OPTIONAL. Default **false**. If **true** and a string value of the specified format can't be retrieved from the clipboard, an exception is thrown.

---

### <a name="getClipboardTypes"></a>ClipboardUtils.getClipboardTypes()
**PURPOSE:**
Returns an array of strings containing all the clipboard types currently present on the clipboard. If the clipboard is empty, a zero-length array is returned.

---

### <a name="getPlainTextClipboardType"></a>ClipboardUtils.getPlainTextClipboardType()
**PURPOSE:**
Returns the clipboard type for plain text, e.g. "public.utf8-plain-text".

---

### <a name="setClipboardString"></a>PathNameUtils.setClipboardString(_str_)
**PURPOSE:**
Sets the clipboard to _str_.

**PARAMETERS:**
_str_: The string value to place on the clipboard.

---

### <a name="setClipboardStringForType"></a>ClipboardUtils.setClipboardStringForType(_str_, _type_)
**PURPOSE:**
Sets the clipboard to the string of the specified type.

**PARAMETERS:**
_str_: The string value to place on the clipboard.
_type_: A string value representing the clipboard type.

---

## <a name="source"></a>Source Code

### NOTES:
The class itself is between the first set of "===========" comments.

The code below that are test cases.

```js
(function() {
	'use strict';

	// ======= BEGIN CLASS SOURCE CODE =========================================
	ObjC.import('AppKit');

	var ClipboardUtils = (function() {
		return {
			clearContents: function() {
				/*jshint -W030 */
				$.NSPasteboard.generalPasteboard.clearContents;
				/*jshint +W030 */
			},

			clipboardContainsType: function(type) {
				return this.getClipboardTypes().indexOf(type) >= 0;
			},

			getClipboardString: function(throwIfNotFound) {
				return this.getClipboardStringForType(
					this.getPlainTextClipboardType(), throwIfNotFound);
			},

			getClipboardStringForType: function(type, throwIfNotFound) {
				if (this.clipboardContainsType(type))
					return ObjC.unwrap(
						$.NSPasteboard.generalPasteboard
						.stringForType(type));
				if (throwIfNotFound)
					throw Error("No clipboard data for specified type");
				return "";
			},

			getClipboardTypes: function() {
				var items = $.NSPasteboard.generalPasteboard.pasteboardItems;
				if (items.count === 0)
					return [];

				return ObjC.deepUnwrap(items.js[0].types);
			},

			getPlainTextClipboardType: function() {
				return $.NSPasteboardTypeString.js;
			},

			setClipboardString: function(str) {
				this.setClipboardStringForType(str, this.getPlainTextClipboardType());
			},

			setClipboardStringForType: function(str, type) {
				var clipboard = $.NSPasteboard.generalPasteboard;
				/*jshint -W030 */
				clipboard.clearContents;
				/*jshint +W030 */
				clipboard.setStringForType($(str), $(type));
			}
		};
	})();
	// ======= END CLASS SOURCE CODE ===========================================

	// ======= BEGIN TEST AND DEMO CODE ========================================

	function testMethod(expression) {
		eval(expression);
		console.log(expression);
	}

	function testFunction(expression, expectedResult) {
		var result;
		try {
			result = eval(expression);
		} catch (e) {
			console.log(' \n** UNEXPECTED EXCEPTION *********\n' +
				expression + '\n' + e.message +
				'\n********************************\n ');
			return;
		}
		if (expectedResult == undefined || result === expectedResult) {
			console.log(expression + ' --> "' + result + '"');
		} else {
			console.log(' \n** UNEXPECTED RESULT ***********\n' +
				expression + '\nactual/expected:\n' + result + '\n' +
				expectedResult + '\n********************************\n ');
		}
	}

	function testException(expression, expectedExceptionMessage) {
		try {
			eval(expression);
		} catch (e) {
			if (!expectedExceptionMessage || e.message.includes(expectedExceptionMessage)) {
				console.log(expression + ' --> "' + e.message + '"');
			} else {
				console.log(' \n** UNEXPECTED EXCEPTION MESSAGE ***********\n' +
					expression + '\nactual/expected:\n' + e.message + '\n' +
					expectedExceptionMessage + '\n********************************\n ');
			}
			return;
		}
		console.log(' \n** EXPECTED EXCEPTION, DID NOT THROW ONE ***********\n' +
			expression + '\n********************************\n ');
	}

	testMethod("ClipboardUtils.setClipboardStringForType('Hello World', 'public.utf8-plain-text')");
	testFunction("ClipboardUtils.clipboardContainsType('public.utf8-plain-text')", true);
	testFunction("ClipboardUtils.getClipboardString()", "Hello World");
	testFunction("ClipboardUtils.getClipboardStringForType('public.utf8-plain-text')", "Hello World");
	testFunction("ClipboardUtils.getClipboardTypes().length", 1);
	testFunction("ClipboardUtils.getClipboardTypes()[0]", "public.utf8-plain-text");
	testFunction("ClipboardUtils.getPlainTextClipboardType()", "public.utf8-plain-text");
	testMethod("ClipboardUtils.setClipboardString('Hello World!')");
	testFunction("ClipboardUtils.getClipboardString()", "Hello World!");

	ClipboardUtils.clearContents();
	testFunction("ClipboardUtils.getClipboardTypes().length", 0);
	testFunction("ClipboardUtils.clipboardContainsType('public.utf8-plain-text')", false);
	testFunction("ClipboardUtils.getClipboardString()", "");
	testException("ClipboardUtils.getClipboardString(true)", "No clipboard data for specified type");
	testFunction("ClipboardUtils.getClipboardStringForType('public.utf8-plain-text')", "");
	testException("ClipboardUtils.getClipboardStringForType('public.utf8-plain-text', true)",
		"No clipboard data for specified type");
	// ======= END TEST AND DEMO CODE ==========================================

})()
```