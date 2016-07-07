
```js
ObjC.import('AppKit');

// Reads a text file as one string.
// UPDATED: 2016/06/30 09:07 PDT
function readTextFile(strPath) {
	var error;
	var str = ObjC.unwrap(
			$.NSString.stringWithContentsOfFileEncodingError(
				$(strPath)
				.stringByStandardizingPath,
				$.NSUTF8StringEncoding,
				error
			)
		);
	if (error) {
		throw Error('Could not read file "' + strPath + '"');
	}
	return str;
}
```