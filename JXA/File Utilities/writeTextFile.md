
```js
// Writes the string to a file.
// UPDATED: 2016/06/22 08:51 PDT
function writeTextFile(strContent, strPath) {
	var error;
	var str = $.NSString.alloc.initWithUTF8String(strContent);
	str.writeToFileAtomicallyEncodingError(
		$(strPath).stringByStandardizingPath,
		true,
		$.NSUTF8StringEncoding,
		null);
	if (error) {
		throw Error('Could not write file "' + strPath + '"');
	}
}
```