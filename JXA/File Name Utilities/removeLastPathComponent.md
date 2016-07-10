## REPLACED BY [PathNameUtils](..%2FPathNameUtils.md)
This will be removed as soon.

```js
// Removes the last component of the path, which is often the file name.
// Leaves the trailing "/" if any.
// UPDATED: 2016/07/08 15:16 PDT
removeLastPathComponent: function(path) {
	var i = path.lastIndexOf("/");
	return i < 0 ? "" : path.substring(0, i + 1);
}
```