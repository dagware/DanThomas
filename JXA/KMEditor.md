
```js
var KMEditor = (function() {
	var _editorAppName = "Keyboard Maestro";
	var _editorApp;

	return {
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

		getEditorApp: function() {
			return _editorApp ? _editorApp : _editorApp = Application(_editorAppName);
		},

		getEditorAppName: function() {return _editorAppName;},

		getSelectedMacrosOrGroups: function() {
			return this.getEditorApp().selectedmacros();
		},

		importMacros: function(pathOrPlist) {
			this.getEditorApp().importmacros(pathOrPlist);
		},

		reload: function() {
			this.getEditorApp().reload();
		},
	};
})();
```