## REPLACED BY [PathNameUtils](..%2FPathNameUtils.md)
This will be removed as soon.

```js
// Returns the index of the start of the extension in a file name,
// or -1 if not found. Also returns -1 if the file name starts with
// a ".", as in ".something", or the period immediately follows a "/",
// like "//machine/user/.something".
// UPDATED: 2016/07/08 15:16 PDT
function indexOfFileExtension(path) {
	var i = path.lastIndexOf(".");
	return (i <= 0 || path[i - 1] === "/") ? -1 : i;
}
```