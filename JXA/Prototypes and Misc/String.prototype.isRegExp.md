
```js
// Use this in conjunction with RegExp.prototype.isRegExp,
// to determine if an object is a RegExp or not.
// UPDATED: 2016/07/20 01:58 PDT
String.prototype.isRegExp = function() {
	return false;
}
```

Also See:
* [RegExp.prototype.isRegExp](RegExp.prototype.isRegExp.md)