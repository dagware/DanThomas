
```js
// Writes a property list file to disk.
// UPDATED: 2016/06/22 08:22 PDT
function writePlistFile(jsObject, strPath) {
    $(jsObject).writeToFileAtomically($(strPath).stringByStandardizingPath, true);
}
```