
```js
// Writes a property list text file to disk.
// UPDATED: 2016/07/08 15:35 PDT
function writePlistTextFile(jsObject, strPath) {
    $(jsObject).writeToFileAtomically($(strPath).stringByStandardizingPath, true);
}
```