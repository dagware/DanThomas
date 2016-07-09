
```js
// Given an array of strings, this removes any entries that are empty.
// NOTES:
// This should probably be called "removeEntyStrings", but it isn't...
// UPDATED: 2016/06/21 12:57 PDT
Array.prototype.removeBlankLines = function removeBlankLines() {
	return this.filter(function(s) {
		return s !== "";
	});
};
```