
```js
// Replaces all instances of matches. Automatically escapes
// "find" for regex's.
// UPDATED: 2016/06/22 08:17 PDT
String.prototype.replaceAll = function replaceAll(find, replace) {
	return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
```

See also:
* [escapeRegExp](JXA/escapeRegExp)