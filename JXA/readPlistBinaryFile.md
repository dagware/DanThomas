
```js
ObjC.import('AppKit');

// Reads a property list file that was stored as binary.
// UPDATED: 2016/06/22 08:13 PDT
function readPlistBinaryFile(filePath) {
	var data = $.NSData.dataWithContentsOfFile(filePath);
	return ObjC.deepUnwrap(
		$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
			data, $.NSPropertyListBinaryFormat_v1_0, 0, null));
}
```