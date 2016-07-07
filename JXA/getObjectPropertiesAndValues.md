
```js
// Returns a multi-line string with the name and value of each
// of the onject's "own" properties (not inherited properties),
// and functions also, unless "propertiesOnly" is not falsey.
// UPDATED: 2016/07/06 08:09 PDT
function getObjectPropertiesAndValues(obj, propertiesOnly) {
	var propNames = Object.getOwnPropertyNames(obj);
	var list = [];
	for (var i = 0; i < propNames.length; i++) {
		var propName = propNames[i];
		var propValue = obj[propName];
		if (!propertiesOnly || typeof(propValue) !== "function")
			list.push(propName + " = '" + propValue + "'");
	}
	return list.join("\n");
}
```