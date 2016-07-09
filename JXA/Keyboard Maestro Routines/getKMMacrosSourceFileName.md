
```js
// Returns the full file path to the user's Keyboard Maestro
// macros source file (plist).
// UPDATED: 2016/06/21 14:49 PDT
function getKMMacrosSourceFileName() {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	return app.pathTo(
		'application support', {
			from: 'user domain'
		}
	) + "/Keyboard Maestro/Keyboard Maestro Macros.plist";
}
```