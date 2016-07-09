
```js
// Reads a Property List text file.
// UPDATED: 2016/07/08 15:34 PDT
function readPlistTextFile(strPath) {
    var strFullPath = $(strPath).stringByStandardizingPath;
	var result = ObjC.deepUnwrap($.NSDictionary.dictionaryWithContentsOfFile(strFullPath));
	if (result)
		return result;
    return ObjC.deepUnwrap($.NSArray.arrayWithContentsOfFile(strFullPath));
}
```