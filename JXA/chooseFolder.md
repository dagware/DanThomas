
```js
(function() {
	'use strict';
	ObjC.import('AppKit');

	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	try {
		return app.chooseFolder({withPrompt: "Select a Folder"}).toString();
	} catch (e) {
		return "";
	}
})();
```