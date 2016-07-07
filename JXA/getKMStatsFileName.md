
```js
// Returns the full file path to the user's Keyboard Maestro
// statistics file (plist).
// UPDATED: 2016/07/06 08:06 PDT
function getKMStatsFileName() {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	return app.pathTo(
		'application support', {
			from: 'user domain'
		}
	) + "/Keyboard Maestro/Keyboard Maestro Macro Stats.plist";
}
```