
```js
// Appends a value before the file extension. If no file extension, the
// value is added to the end of the file name. This is useful for adding
// trailing sequence numbers or timestamps, for example.
// UPDATED: 2016/07/08 14:59 PDT
function appendBeforeFileExtension(path, value) {
	var i = indexOfFileExtension(path);
	return ((i <= 0) ?
		path + value :
		path.substring(0, i) + value) + path.substring(i);
}
```

Uses:
* [indexOfFileExtension](indexOfFileExtension.md)