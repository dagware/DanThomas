
```js
// Returns the string "escaped" to work with regular expressions.
// UPDATED: 2016/06/21 14:33 PDT
function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
```