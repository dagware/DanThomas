
```js
// Splits the string on \r and/or \n, removes empty lines, and returns the result/
// UPDATED: 2016/06/22 08:19 PDT
String.prototype.splitAndRemoveBlankLines = function splitAndRemoveBlankLines() {
	return this.split(/\r|\n/).removeBlankLines();
}
```

Also uses:
* [Array.prototype.removeBlankLines](JXA%2FArray.prototype.removeBlankLines)