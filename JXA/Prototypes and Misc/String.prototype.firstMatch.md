
```js
// Returns the first capture group from the first match in the string.
// UPDATED: 2016/06/22 08:16 PDT
String.prototype.firstMatch = function firstMatch(regexString) {
	var match = new RegExp(regexString).exec(this);
	return (match && match.length >= 1) ? match[1] : undefined;
}
```