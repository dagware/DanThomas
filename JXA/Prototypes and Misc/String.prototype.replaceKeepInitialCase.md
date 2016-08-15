
```js
// Replaces the pattern using "replace", capitalizing the
// first replaced character the same as it was in the source.
// If pattern is not a RegERxp, it is converted to one.
// If it IS a RegExp, the flags must be "gi" - if not, it won't
// work right. If throwIfFlagsDintMatch is true, an exception is thrown.
// UPDATED: 2016/07/20 04:13 PDT
String.prototype.replaceKeepInitialCase = function(pattern, replace, throwIfFlagsDontMatch) {
	var regexp = pattern.toRegExp("gi", throwIfFlagsDontMatch);
	return this.replace(regexp, function(match) {
		return (match.search(/^[a-z]/) === 0 ?
				replace.charAt(0).toLowerCase() :
				replace.charAt(0).toUpperCase()) +
			replace.substring(1);
	});
}
```

Required:
* [String.prototype.toRegExp](String.prototype.toRegExp.md)
* [RegExp.prototype.isRegExp](RegExp.prototype.isRegExp.md)