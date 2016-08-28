
```js
function getMacroFromKMMacrosFile(path) {
	var plist = PlistUtils.readPlistArrayTextFile(path);
	if (!plist)
		throw Error("Could not read file '" + path + "'");
	if (plist.length === 0)
		throw Error("No macros were found in '" + path + "'");
	if (plist.length > 1)
		throw Error("Multiple macros were found in '" + path + "'");
	var group = plist[0];

	if (!group.Macros || group.Macros.count === 0)
		throw Error("No macros were found in '" + path + "'");
	if (group.Macros.length > 1)
		throw Error("Multiple macros were found in '" + path + "'");
	return group.Macros[0];
}
```