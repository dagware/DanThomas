
```js
// Converts any part of a property list to a string.
// PARAMETERS:
// 'plistPart' can contain any part of the property list,
// from the outer-most node, down to the inner-most node.
// UPDATED: 2016/06/21 14:32 PDT
function convertPlistPartToString(plistPart) {
	var _data = $.NSPropertyListSerialization.dataWithPropertyListFormatOptionsError(
		$(plistPart), $.NSPropertyListXMLFormat_v1_0, 0, null);
	var _nsstring = $.NSString.alloc.initWithDataEncoding(_data, $.NSUTF8StringEncoding);
	return $(_nsstring).js;
}
```