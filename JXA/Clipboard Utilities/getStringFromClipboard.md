
```js
// Gets a string from the clipboard. If the clipboard
// doesn't contain string content, the result will be
// 'undefined' unless 'throwIfNotFound' is true, in
// which case an exception is thrown.
// UPDATED: 2016/06/21 14:59 PDT
function getStringFromClipboard(throwIfNotFound) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	var s = app.theClipboard();
	if (s == undefined) {
		if (throwIfNotFound) {
			throw Error("No clipboard data");
		}
		return undefined;
	}
	return s.toString();
}
```