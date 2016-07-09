
```js
// Calls the Keyboard Maestro "getmacros" function to return
// a plist containing all groups and macros (but not the
// macros' actions). 
// NOTE: The keys are all lowercase in the plist, unlike
// other KM plists.
// UPDATED: 2016/06/27 03:02 PDT
function getAllKMGroupsAndMacrosPlist(kme) {
	var _kme = kme || Application("Keyboard Maestro Engine");
	var _macros = _kme.getmacros({
			asstring: true
		});
	return convertStringToPlist(_macros);
}
```

Also needed:
* [convertStringToPlist](JXA%2FProperty%20List%20(plist)%20Utilities%2FconvertStringToPlist.md)