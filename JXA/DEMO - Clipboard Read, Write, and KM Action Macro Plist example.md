
```js
(function() {
	'use strict';
	ObjC.import('AppKit');

// ********************* Keyboard Maestro Constants ****************************

	// Keyboard Maestro Constants
	// UPDATED: 2016/07/05 07:51 PDT
	var kmConstants = {
		macrosClipboardType: "com.stairways.keyboardmaestro.macrosarray",
		actionsClipboardType: "com.stairways.keyboardmaestro.actionarray",
		engineAppName: "Keyboard Maestro Engine",
		editorAppName: "Keyboard Maestro"
	}

	// *************** Clipboard Read Methods **********************************

	// Returns an array of strings containing all the clipboard
	// types currently present on the clipboard.
	// UPDATED: 2016/07/05 08:02 PDT
	function getClipboardTypes() {
		return ObjC.deepUnwrap(
			$.NSPasteboard.generalPasteboard.pasteboardItems.js[0].types);
	}

	// Returns true if the specified "type" is on the clipboard.
	// PARAMETERS:
	//   type   The type, like "public.utf8-plain-text".
	//   types  OPTIONAL. You can pass the available clipboard types, usually
	//          retrieved from getClipboardTypes(), if you want. You would do
	//          this if you had already called getClipboardTypes() for some
	//          other reason, and wanted to eliminate calling it again. No big
	//          deal either way.
	// UPDATED: 2016/07/05 08:09 PDT
	function clipboardContainsType(type, types) {
		return (types || getClipboardTypes()).indexOf(type) >= 0;
	}

	// Returns the string value of the specified clipboard type from the
	// clipboard if present, otherwise returns undefined.
	// PARAMETERS:
	//   type   The type, like "public.utf8-plain-text".
	//   types  OPTIONAL. You can pass the available clipboard types, usually
	//          retrieved from getClipboardTypes(), if you want. You would do
	//          this if you had already called getClipboardTypes() for some
	//          other reason, and wanted to eliminate calling it again. No big
	//          deal either way.
	// UPDATED: 2016/07/05 08:12 PDT
	function getClipboardStringForType(type, types) {
		if (clipboardContainsType(type, types))
			return ObjC.unwrap(
				$.NSPasteboard.generalPasteboard
				.stringForType(type));
		return undefined;
	}

	// ************* Clipboard KM Read Methods *********************************

	// Returns a string containing the "source code" (aka plist) of the Keyboard
	// Maestro Action(s) on the clipboard, if any, otherwise returns undefined.
	// PARAMETERS:
	//   types  OPTIONAL. You can pass the available clipboard types, usually
	//          retrieved from getClipboardTypes(), if you want. You would do
	//          this if you had already called getClipboardTypes() for some
	//          other reason, and wanted to eliminate calling it again. No big
	//          deal either way.
	// UPDATED: 2016/07/05 08:44 PDT
	function getKMActionsPlistStringFromClipboard(types) {
		return getClipboardStringForType(kmConstants.actionsClipboardType, types);
	}

	// Returns a string containing the "source code" (aka plist) of the Keyboard
	// Maestro Macro(s) on the clipboard, if any, otherwise returns undefined.
	// PARAMETERS:
	//   types  OPTIONAL. You can pass the available clipboard types, usually
	//          retrieved from getClipboardTypes(), if you want. You would do
	//          this if you had already called getClipboardTypes() for some
	//          other reason, and wanted to eliminate calling it again. No big
	//          deal either way.
	// UPDATED: 2016/07/05 08:44 PDT
	function getKMMacrosPlistStringFromClipboard(types) {
		return getClipboardStringForType(kmConstants.macrosClipboardType, types);
	}

	// Returns a string containing the "source code" (aka plist) of the Keyboard
	// Maestro Macro(s) or Action(s) on the clipboard, if any, otherwise returns
	// undefined.
	// PARAMETERS:
	//   types  OPTIONAL. You can pass the available clipboard types, usually
	//          retrieved from getClipboardTypes(), if you want. You would do
	//          this if you had already called getClipboardTypes() for some
	//          other reason, and wanted to eliminate calling it again. No big
	//          deal either way.
	// UPDATED: 2016/07/05 08:44 PDT
	function getKMPlistStringFromClipboard(types) {
		var result = getKMActionsPlistStringFromClipboard(types);
		if (result) return result;
		return getKMMacrosPlistStringFromClipboard(types);
	}

	// **************** Clipboard Write Methods ********************************

	// Sets the clipboard to the string of the specified type.
	// PARAMETERS:
	//   str    The string to put on the clipboard.
	//   type   The type, like "public.utf8-plain-text".
	// UPDATED: 2016/07/05 08:12 PDT
	function setClipboardStringForType(str, type) {
		var clipboard = $.NSPasteboard.generalPasteboard;
		clipboard.clearContents;
		clipboard.setStringForType($(str), $(type));
	}

	// **************** Clipboard KM Write Methods *****************************

	// Sets the clipboard to the KM Actions Plist string, so it can be pasted
	// into the KM editor as one or more actions.
	function setClipboardToKMActionsPlistString(str) {
		setClipboardStringForType(str, kmConstants.actionsClipboardType);
	}

	// Sets the clipboard to the KM Macros Plist string, so it can be pasted
	// into the KM editor as one or more macros.
	function setClipboardToKMMacrosPlistString(str) {
		setClipboardStringForType(str, kmConstants.macrosClipboardType);
	}

	// **************** Example Code *******************************************

	// Change the "if (false)" to true or comment it out to set the clipboard to
	// this action, which you can then paste into the KM Editor.
	if (false)
	{
		var action = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><array>	<dict>		<key>MacroActionType</key>		<string>Notification</string>		<key>SoundName</key>		<string></string>		<key>Subtitle</key>		<string></string>		<key>Text</key>		<string></string>		<key>Title</key>		<string>Hello World!</string>	</dict></array></plist>";
		setClipboardToKMActionsPlistString(action);
		return "Clipboard set to Action";
	}

	// Change the "if (false)" to true or comment it out to set the clipboard to
	// this macro which you can then paste into the KM editor. The macro will be
	// named "Hello World" and will go into the "Examples" group.
	if (false)
	{
		var macro = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><array>	<dict>		<key>Actions</key>		<array>			<dict>				<key>MacroActionType</key>				<string>Notification</string>				<key>SoundName</key>				<string></string>				<key>Subtitle</key>				<string></string>				<key>Text</key>				<string></string>				<key>Title</key>				<string>Hello World</string>			</dict>		</array>		<key>CreationDate</key>		<real>489428051.72850603</real>		<key>ModificationDate</key>		<real>489428065.93915898</real>		<key>Name</key>		<string>Hello World</string>		<key>Triggers</key>		<array/>		<key>UID</key>		<string>1F68D94D-FB9F-4466-B651-496EEF5831C2</string>	</dict></array></plist>";
		setClipboardToKMMacrosPlistString(macro);
		return "Clipboard set to macro";
	}

	// We don't need to do this, but this allows us to call this only once.
	var types = getClipboardTypes();

	// Change the "if (false)" to true or comment it out to retrieve the
	// Actions(s) you've copied to the clipboard, if any.
	if (false)
	{
		var result = getKMActionsPlistStringFromClipboard(types);
		if (result) {
			return result;
		}
		else {
			return "No actions on the clipboard";
		}
	}

	// Change the "if (false)" to true or comment it out to retrieve the
	// Macro(s) you've copied to the clipboard, if any.
	if (false)
	{
		var result = getKMMacrosPlistStringFromClipboard(types);
		if (result) {
			return result;
		}
		else {
			return "No macros on the clipboard";
		}
	}

	// Change the "if (false)" to true or comment it out to retrieve the
	// Macro(s) or Action(s) you've copied to the clipboard, if any.
	if (false)
	{
		var result = getKMPlistStringFromClipboard(types);
		if (result) {
			return result;
		}
		else {
			return "No macros or actions on the clipboard";
		}
	}

})()
```