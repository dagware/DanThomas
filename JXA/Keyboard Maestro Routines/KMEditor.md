# KMEditor
Methods for manipulating the [Keyboard Maestro](https://www.keyboardmaestro.com/main/) Editor's Automation features.

[Visit the forum](https://forum.keyboardmaestro.com/) for active discussions.

```js
var KMEditor = (function() {
	var _editorAppName = "Keyboard Maestro";
	var _editorApp = undefined;

	return {
		getEditorAppName: function() {return _editorAppName;},

		getEditorApp: function() {
			return _editorApp ? _editorApp : _editorApp = Application(_editorAppName);
		},

		deleteMacro: function(uuidOrUniqueName) {
			this.getEditorApp().deletemacro(uuidOrUniqueName);
		},

		deleteMacroGroup: function(uuidOrUniqueName) {
			this.getEditorApp().deletemacrogroup(uuidOrUniqueName);
		},

		editMacro: function(uuidOrUniqueName) {
			this.getEditorApp().editmacro(uuidOrUniqueName);
		},

		enableMacroOrGroup: function(uuidOrUniqueName, enable) {
			this.getEditorApp().setmacroenable(uuidOrUniqueName, { enable: enable });
		},

		importMacros: function(pathOrPlist) {
			this.getEditorApp().importmacros(pathOrPlist);
		},

		getSelectedMacrosOrGroups: function() {
			return this.getEditorApp().selectedmacros();
		},

		reload: function() {
			this.getEditorApp().reload();
		},
	};
})();
```