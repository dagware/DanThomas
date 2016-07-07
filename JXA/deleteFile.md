
```js
ObjC.import('AppKit');

// Deletes the specified file. If successful, the function
// returns true.
//
// If the function fails due to something like the file
// doesn't exists, then the function returns false unless
// "throwIfFail" is true, in which case an exception is thrown.
//
// If the API call returns an error, then an exception is
// thrown regardless of the value of "throwIfFail".
// UPDATED: 2016/06/21 14:32 PDT
function deleteFile(filePath, throwIfFail) {
	var error;
	var result = ObjC.unwrap(
		$.NSFileManager.defaultManager
		.removeItemAtPathError(
			$(filePath).stringByStandardizingPath,
			error
		)
	);
	if (error || (!result && throwIfFail)) {
		throw Error('Could not delete file "' + filePath + '"');
	}
	return result;
}
```