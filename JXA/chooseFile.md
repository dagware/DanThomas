
```js
(function() {
	'use strict';

	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	try {
		return app.chooseFile({
			withPrompt: "Select a KMMacros File",
			ofType: "kmmacros"
		}).toString();
	} catch (e) {
		return "";
	}
})();
```