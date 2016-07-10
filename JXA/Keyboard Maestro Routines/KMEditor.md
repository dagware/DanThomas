# KMEditor
Methods for manipulating the [Keyboard Maestro](https://www.keyboardmaestro.com/main/) Editor's Automation features.

[Visit the forum](https://forum.keyboardmaestro.com/) for active discussions.
### NOTE: ###
This class uses the "Module" Design Pattern. Basically, anything in the "return" statement is public, everything before it is private.

See https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

## [Jump to the Source Code](#source)

---

## Functions and Usage
NOTE: The source is complete (barring any sudden inspiration), but this documentation is a

![wip-sign.png](resources/CCB7AEA96395B800A043B776CB42F3D6.png)

---

## <a name="source"></a>Source Code

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