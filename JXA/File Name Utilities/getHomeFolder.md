## REPLACED BY [PathNameUtils](..%2FPathNameUtils.md)
This will be removed as soon.

```js
// Returns the current user's home folder, without a trailing "/".
// UPDATED: 2016/07/08 15:13 PDT
function getHomeFolder() {
	return ObjC.unwrap($('~').stringByExpandingTildeInPath);
}
```