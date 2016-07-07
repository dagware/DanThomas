
```js
// Searches the specified Keyboard Maestro plist group array for
// the a Group with the specified name, and if found, returns
// the UUID of the group. If not foumd, returns 'undefined'.
// UPDATED: 2016/06/21 14:40 PDT
function getKMGroupUUIDByName(groupName, groupArray) {
	var group = groupArray.find(function(dict) {
		return dict.Name === groupName;
	});
	if (group == undefined) {
		throw Error("\"" + groupName + "\" does not appear to be a macro group");
	}
	return group.UID;
}
```