
```js
// Converts an Array (usually an array of dictionaries) to a property list.
// UPDATED: 2016/06/21 13:10 PDT
function convertStringToPlist(str) {
	return ObjC.deepUnwrap(
		$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
			$(str).dataUsingEncoding($.NSUTF8StringEncoding), 0, 0, null));
};
```