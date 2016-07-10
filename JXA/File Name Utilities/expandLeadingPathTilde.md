## REPLACED BY [PathNameUtils](..%2FPathNameUtils.md)
This will be removed as soon.

```js
// If the path has a leading tilde ("~"), this expands the path to a
// fully-qualified path, otherwise it returns the path as is.
// UPDATED: 2016/07/08 15:14 PDT
function expandLeadingPathTilde(path) {
	return path.charCodeAt(0) === 126 ?
		ObjC.unwrap($(path).stringByExpandingTildeInPath) :
		path;
}
```