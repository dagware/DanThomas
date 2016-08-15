
```js
// Returns the string "escaped" to work with regular expressions.
// UPDATED: 2016/07/20 01:53 PDT
String.prototype.escapeRegExp = function() {
	return this.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
```