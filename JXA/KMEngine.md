
```js
var KMEngine = (function() {
	var _engineApp;

	function _escapeXml(str) {
	    return str.replace(/[<>&'"]/g, function (c) {
	        switch (c) {
	            case '<': return '&lt;';
	            case '>': return '&gt;';
	            case '&': return '&amp;';
	            case '\'': return '&apos;';
	            case '"': return '&quot;';
	        }
	    });
	}

	function _replaceAll(str, find, replace) {
		return str.replace(new RegExp(_escapeXml(find), 'g'), replace);
	}

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

		doScript: function(uuidOrUniqueNameOrScript, parameter, timeout) {
			if (parameter) {
				if (timeout) {
					this.getEngineApp().doScript(uuidOrUniqueNameOrScript, { withParameter: parameter }, { timeout: timeout });
				} else {
					this.getEngineApp().doScript(uuidOrUniqueNameOrScript, { withParameter: parameter });
				}
			} else {
				if (timeout) {
					this.getEngineApp().doScript(uuidOrUniqueNameOrScript, { timeout: timeout });
				} else {
					this.getEngineApp().doScript(uuidOrUniqueNameOrScript);
				}
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

		// You should pass values for "title" and "message". The rest have default values.
		showOkCancelMessagePrompt: function(title, message, okButtonText, cancelButtonText, resultVariableName) {
			title = title || "";
			message = message || "";
			okButtonText = okButtonText || "OK";
			cancelButtonText = cancelButtonText || "Cancel";
			resultVariableName = resultVariableName || "showOkCancelMessagePromptResult";
			var script =
				'<dict> \n' +
				'	<key>Actions</key> \n' +
				'	<array> \n' +
				'		<dict> \n' +
				'			<key>MacroActionType</key> \n' +
				'			<string>SetVariableToText</string> \n' +
				'			<key>Text</key> \n' +
				'			<string>##cancelButtonText##</string> \n' +
				'			<key>Variable</key> \n' +
				'			<string>##resultVariableName##</string> \n' +
				'		</dict> \n' +
				'		<dict> \n' +
				'			<key>Buttons</key> \n' +
				'			<array> \n' +
				'				<dict> \n' +
				'					<key>Button</key> \n' +
				'					<string>##okButtonText##</string> \n' +
				'					<key>Cancel</key> \n' +
				'					<false/> \n' +
				'				</dict> \n' +
				'				<dict> \n' +
				'					<key>Button</key> \n' +
				'					<string>##cancelButtonText##</string> \n' +
				'					<key>Cancel</key> \n' +
				'					<true/> \n' +
				'				</dict> \n' +
				'			</array> \n' +
				'			<key>MacroActionType</key> \n' +
				'			<string>PromptForUserInput</string> \n' +
				'			<key>Prompt</key> \n' +
				'			<string>##message##</string> \n' +
				'			<key>TimeOutAbortsMacro</key> \n' +
				'			<true/> \n' +
				'			<key>Title</key> \n' +
				'			<string>##title##</string> \n' +
				'			<key>Variables</key> \n' +
				'			<array/> \n' +
				'		</dict> \n' +
				'		<dict> \n' +
				'			<key>MacroActionType</key> \n' +
				'			<string>SetVariableToText</string> \n' +
				'			<key>Text</key> \n' +
				'			<string>%Variable%Result Button%</string> \n' +
				'			<key>Variable</key> \n' +
				'			<string>##resultVariableName##</string> \n' +
				'		</dict> \n' +
				'	</array> \n' +
				'	<key>MacroActionType</key> \n' +
				'	<string>Group</string> \n' +
				'	<key>TimeOutAbortsMacro</key> \n' +
				'	<true/> \n' +
				'</dict>';
			script = _replaceAll(script, "##title##", _escapeXml(title));
			script = _replaceAll(script, "##message##", _escapeXml(message));
			script = _replaceAll(script, "##okButtonText##", _escapeXml(okButtonText));
			script = _replaceAll(script, "##cancelButtonText##", _escapeXml(cancelButtonText));
			script = _replaceAll(script, "##resultVariableName##", _escapeXml(resultVariableName));
			this.doScript(script);
			var result = this.getVariable(resultVariableName);
			this.deleteVariable(resultVariableName);
			return result;
		},

		// You should pass values for "title" and "message". The rest have default values.
		showOkMessagePrompt: function(title, message, okButtonText) {
			title = title || "";
			message = message || "";
			okButtonText = okButtonText || "OK";
			var script =
				'<dict> \n' +
				'	<key>Buttons</key> \n' +
				'	<array> \n' +
				'		<dict> \n' +
				'			<key>Button</key> \n' +
				'			<string>##okButtonText##</string> \n' +
				'		</dict> \n' +
				'	</array> \n' +
				'	<key>MacroActionType</key> \n' +
				'	<string>PromptForUserInput</string> \n' +
				'	<key>Prompt</key> \n' +
				'	<string>##message##</string> \n' +
				'	<key>TimeOutAbortsMacro</key> \n' +
				'	<true/> \n' +
				'	<key>Title</key> \n' +
				'	<string>##title##</string> \n' +
				'	<key>Variables</key> \n' +
				'	<array/> \n' +
				'</dict>';
				script = script
					.replace("##title##", _escapeXml(title))
					.replace("##message##", _escapeXml(message))
					.replace("##okButtonText##", _escapeXml(okButtonText));
			this.doScript(script);
		}

	};

})();
```