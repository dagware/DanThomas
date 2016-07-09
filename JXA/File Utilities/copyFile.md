
```js
ObjC.import('AppKit');

// Copies the specified file to the destination.
// If successful, the function returns true.
//
// If the function fails due to something like the file
// already exists, then the function returns false unless
// "throwIfFail" is true, in which case an exception is thrown.
//
// If the API call returns an error, then an exception is
// thrown regardless of the value of "throwIfFail".
// UPDATED: 2016/06/21 14:32 PDT
function copyFile(fromPath, toPath, throwIfFail) {
	var error;
	var result = ObjC.unwrap(
		$.NSFileManager.defaultManager
		.copyItemAtPathToPathError(
			$(fromPath).stringByStandardizingPath,
			$(toPath).stringByStandardizingPath,
			error
		)
	);
	if (error || (!result && throwIfFail)) {
		throw Error('Could not copy "' + fromPath + '" to "' + toPath + '"');
	}
	return result;
}
```