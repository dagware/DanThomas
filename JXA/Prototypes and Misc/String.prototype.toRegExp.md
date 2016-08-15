
```js
// Same as new RegExp(), but when used with RegExp.prototype.toRegExp(),
// you can guarantee you have a RegExp object.
// UPDATED: 2016/07/20 02:10 PDT
String.prototype.toRegExp = function(flags) {
	return new RegExp(this.escapeRegExp(), flags);
}
```

Also see:
* [RegExp.prototype.toRegExp](RegExp.prototype.toRegExp.md)