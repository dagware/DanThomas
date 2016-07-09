
```js
// Does word-wrapping on a string.
// PARAMETERS:
// 		str: The input string.
//		width: The width to wrap at, or 0 for no wrapping.
//		cut: Cut in the middle of a long word, if needed.
// RESULTS:
// Returns an array of strings.
// UPDATED: 2016/06/22 08:20 PDT
function wordWrap(str, width, cut) {
	if (!str || width <= 0) {
		return [str];
	}
	cut = cut || false;

	var regex = '.{1,' + width + '}(\\s|$)' +
		(cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');
	return str.match(RegExp(regex, 'g'));
}
```