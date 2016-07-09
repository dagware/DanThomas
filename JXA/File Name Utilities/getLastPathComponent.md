
```js
// Returns the last component of the path, which is often the file
// name, but could be a folder name.
// UPDATED: 2016/07/08 15:14 PDT
function getLastPathComponent(path) {
	var i = path.lastIndexOf("/");
	return i < 0 ? path : path.substring(i + 1);
}
```