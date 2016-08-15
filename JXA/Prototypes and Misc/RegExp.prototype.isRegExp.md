
```js
// Use this in conjunction with String.prototype.isRegExp,
// to determine if an object is a RegExp or not.
// UPDATED: 2016/07/20 01:58 PDT

RegExp.prototype.isRegExp = function() {
	return true;
}
```

Also See:
* [String.prototype.isRegExp](String.prototype.isRegExp.md)