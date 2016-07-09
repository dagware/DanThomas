
```js
// Replaces the current file name's extension with a new one. If "newExt"
// is blank, the extension is removed. Otherwise, "newExt" can include
// the leading ".", but it doesn't have to.
// UPDATED: 2016/07/08 15:16 PDT
function replaceFileExtension(path, newExt) {
	if (!newExt) {
		newExt = ""
	} else if (!newExt.startsWith(".")) {
		newExt = "." + newExt;
	}
	var i = indexOfFileExtension(path);
	return (i <= 0) ? path + newExt : path.substring(0, i) + newExt;
}
```

Uses:
* [indexOfFileExtension](indexOfFileExtension.md)