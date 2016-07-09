
```js
// Returns the file extension including the leading period, if any,
// otherwise returns "".
function getFileExtension(path) {
	var i = indexOfFileExtension(path);
	return (i <= 0) ? "" : path.substring(i);
}
```

Uses:
* [indexOfFileExtension](indexOfFileExtension.md)