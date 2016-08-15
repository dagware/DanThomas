
```js
var KMEngine = (function() {
	var _engineApp;

	return {
		calculate: function(str) {
			return this.getEngineApp().calculate(str);
		},

		convertStringToPlist: function(str) {
			return ObjC.deepUnwrap(
				$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
					$(str).dataUsingEncoding($.NSUTF8StringEncoding), 0, 0, null));
		},

		deleteVariable: function(name) {
			this.setVariable(name, "%Delete%");
		},

		doScript: function(uuidOrUniqueNameOrScript, parameter) {
			if (parameter) {
				this.getEngineApp().doScript(uuidOrUniqueNameOrScript, { withParameter: parameter });
			} else {
				this.getEngineApp().doScript(uuidOrUniqueNameOrScript);
			}
		},

		executing: function() {
			return this.getEngineApp().executing();
		},

		getActionsClipboardType: function() {
			return "com.stairways.keyboardmaestro.actionarray";
		},
		getAllMacrosSourceFileName: function() {
			return this.getAppSupportFolderName() + "Keyboard Maestro Macros.plist";
		},

		getAllVariableNames: function() {
			return this.getEngineApp().variables.name();
		},

		getAppSupportFolderName: function() {
			var app = Application.currentApplication();
			app.includeStandardAdditions = true;
			return app.pathTo('application support', { from: 'user domain' }) +
				"/Keyboard Maestro/";
		},

		getEngineAppName: function() {
			return "Keyboard Maestro Engine";
		},

		getEngineApp: function() {
			if (!_engineApp)
				_engineApp = Application(this.getEngineAppName());
			return _engineApp;
		},

		getHotKeys: function(asString, getAll) {
			return this.getEngineApp().gethotkeys({ asstring: !!asString, getall: !!getAll });
		},

		getHotKeysAsPlist: function(getAll) {
			return this.convertStringToPlist(this.getHotKeys(true, getAll));
		},
		getMacrosClipboardType: function() {
			return "com.stairways.keyboardmaestro.macrosarray";
		},

		getMacros: function(binary) {
			return this.getEngineApp().getmacros({
				asstring: !binary
			});
		},

		getMacrosAsPlist: function(binary) {
			return this.convertStringToPlist(this.getMacros(false));
		},

		getNamedClipboardInfo: function() {
			var path = this.getNamedClipboardsSourceFileName();
			var plist = this.readPlistBinaryFile(path);

			var result = plist.map(function(item) {
				return {name: item.Name, UID: item.UID};
			});
			result = result.sort(function(a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
			return result;
		},

		getNamedClipboardsSourceFileName: function() {
			return this.getAppSupportFolderName() +
				"Keyboard Maestro Clipboards.plist";
		},

		getVariable: function(name, required) {
			var result = this.getEngineApp().getvariable(name);
			if (!result && required)
				throw Error("Variable '" + name + "' is empty");
			return result;
		},

		playSound: function(file, soundEffect, volume) {
			var options = {};
			if (soundEffect !== undefined)
				options.soundeffect = soundEffect;
			if (volume !== undefined)
				options.volume = volume;
			this.getEngineApp().playSound(file, options);
		},

		processTokens: function(str) {
			return this.getEngineApp().processTokens(str);
		},

		readPlistBinaryFile: function(path) {
			var data = $.NSData.dataWithContentsOfFile(path);
			return ObjC.deepUnwrap(
				$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
					data, $.NSPropertyListBinaryFormat_v1_0, 0, null));
		},

		reload: function() {
			this.getEngineApp().reload();
		},

		setVariable: function(name, value) {
			this.getEngineApp().setvariable(name, {
				to: value
			});
		},
	};

})();
```