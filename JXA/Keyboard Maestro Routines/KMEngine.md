
# KMEngine
Methods for using the [Keyboard Maestro](https://www.keyboardmaestro.com/main/) Engine's Automation features.

[Visit the forum](https://forum.keyboardmaestro.com/) for active discussions.
### NOTE: ###
This class uses the "Module" Design Pattern. Basically, anything in the "return" statement is public, everything before it is private.

See https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

## [Jump to the Source Code](#source)

---

## Functions and Usage
NOTE: The source is complete (barring any sudden inspiration), but this documentation is a

![wip-sign.png](resources/CCB7AEA96395B800A043B776CB42F3D6.png)
* [getEngineApp()](#getEngineApp)
* [calculate()](#calculate)
* [convertStringToPlist()](#convertStringToPlist)
* [Source Code](#source)

---

### <a name="getEngineApp"></a>KMEngine.getEngineApp()
**PURPOSE:**
Returns an Application object for the KM Engine. The object is cached, so subsequent calls return the same object.
**NOTES:**
This is used mostly internally. You won't normally access this yourself, but you can if you ever need to.

---

### <a name="calculate"></a>KMEngine.calculate(str)
**PURPOSE:**
Asks the KM Engine to calculate something for you, and returns the result. See this [Wiki entry](https://wiki.keyboardmaestro.com/function/CALCULATE) for more information.
**USAGE:**

```js
console.log(KMEngine.calculate("2 * 3"));
// Output: 6
```

---

### <a name="convertStringToPlist"></a>KMEngine.convertStringToPlist(str)
**PURPOSE:**
Converts a Property List (plist) string to a JS object that can be accessed like a dictionary, or an array of dictionaries. Keyboard Maestro uses plists for defining Groups and Macros.
**NOTES:**
While there may be times you'll use this yourself, be aware that there are many functions that have an "...AsPlist" version that call this for you.
**USAGE:**
See the various "...AsPlist" functions for examples of how to use the output.

---

## <a name="source"></a>Source Code

```js
var KMEngine = (function() {
	var _actionsClipboardType = "com.stairways.keyboardmaestro.actionarray";
	var _macrosClipboardType = "com.stairways.keyboardmaestro.macrosarray";
	var _engineAppName = "Keyboard Maestro Engine";

	var _engineApp = undefined;

	return {
		getActionsClipboardType: function() {return _actionsClipboardType;},
		getMacrosClipboardType: function() {return _macrosClipboardType;},
		getEngineAppName: function() {return _engineAppName;},
		getEngineApp: function() {
			return _engineApp ? _engineApp : _engineApp = Application(_engineAppName);
		},

		calculate: function(str) {
			return this.getEngineApp().calculate(str);
		},

		convertStringToPlist: function(str) {
			return ObjC.deepUnwrap(
				$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
					$(str).dataUsingEncoding($.NSUTF8StringEncoding), 0, 0, null));
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

		getHotKeys: function(asString, getAll) {
			return this.getEngineApp().gethotkeys({ asstring: !!asString, getall: !!getAll});
		},

		getHotKeysAsPlist: function(getAll) {
			return this.convertStringToPlist(this.getHotKeys(true, getAll));
		},

		getMacros: function(binary) {
			return this.getEngineApp().getmacros({
				asstring: !binary
			});
		},

		getMacrosAsPlist: function(binary) {
			return this.convertStringToPlist(this.getMacros(false));
		},

		getVariable: function(name, required) {
			var result = this.getEngineApp().getvariable(name);
			if (!result && required)
				throw Error("Variable '" + name + "' is empty");
			return result;
		},

		playSound: function(file, soundEffect, volume) {
			var options = {};
			if (soundEffect != undefined)
				options.soundeffect = soundEffect;
			if (volume != undefined)
				options.volume = volume;
			this.getEngineApp().playSound(file, options);
		},

		processTokens: function(str) {
			return this.getEngineApp().processTokens(str);
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