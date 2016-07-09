
```js
// Given a Keyboard Maestro plist, returns a record with the
// macro and group for the specified macro UUID, or 'undefined'
// if not found.
// UPDATED: 2016/06/21 14:47 PDT
function getKMMacroAndGroupByMacroUUID(macroUUID, plist) {
	var _result = undefined;
	plist.find(function(group) {
		var macros = group.macros;
		if (!macros) {
			return false;
		}

		var macro = macros.find(function(m) {
			return m.UID === macroUUID;
		});
		if (macro) {
			_result = {
				macro: macro,
				group: group
			};
			return true;
		}
		return false;
	});
	return _result;
}
```