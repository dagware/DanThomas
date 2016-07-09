
```js
// Example showing how to match against an array of regexp's.
// UPDATED: 2016/06/22 08:11 PDT
function matchesAnyRegexp(line) {
	return [
		/^## /,
		/^#* PURPOSE/,
		/^### AUTOMATION/
	].some(function(regexp) {
		return regexp.test(line);
	});
}
```