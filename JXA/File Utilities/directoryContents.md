
```js
ObjC.import('AppKit');

// Returns the contents of the directory as an array of strings.
// If the API returns an error, an exception is thrown.
// UPDATED: 2016/06/21 14:33 PDT
function directoryContents(strPath) {
	var error;
	var contents = ObjC.deepUnwrap(
		$.NSFileManager.defaultManager
		.contentsOfDirectoryAtPathError(
			$(strPath)
			.stringByStandardizingPath, error
		)
	);
	if (error) {
		throw Error('Could not get contents of "' + strPath + '"');
	}
	return contents;
}
```