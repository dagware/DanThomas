## REPLACED BY [PathNameUtils](..%2FPathNameUtils.md)
This will be removed as soon.

```js
// Combines 2 path components, making sure there is one and only one "/"
// between them.
// UPDATED: 2016/07/08 15:10 PDT
function combinePathComponents(path1, path2) {
	if (path1.endsWith("/"))
		path1 = path1.substring(0, path1.length - 1);
	if (path2.startsWith("/"))
		path2 = path2.substring(1);
	return path1 + "/" + path2;
}
```