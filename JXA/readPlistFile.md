
```js
ObjC.import('AppKit');

// Reads a Property List file.
// UPDATED: 2016/06/22 08:14 PDT
function readPlistFile(strPath) {
    var strFullPath = $(strPath).stringByStandardizingPath;
    return
    ObjC.deepUnwrap($.NSDictionary.dictionaryWithContentsOfFile(strFullPath)) ||
        ObjC.deepUnwrap($.NSArray.arrayWithContentsOfFile(strFullPath));
}
```