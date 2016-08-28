
```js
var PlistUtils = (function() {
	function readTextFile(strPath) {
		var error;
		var str = ObjC.unwrap(
			$.NSString.stringWithContentsOfFileEncodingError(
				$(strPath).stringByStandardizingPath,
				$.NSUTF8StringEncoding,
				error
			)
		);
		if (error)
			throw Error('Could not read file "' + strPath + '"');
		return str;
	}

	return {
		convertPlistPartToString: function(plistPart) {
			var data = $.NSPropertyListSerialization.dataWithPropertyListFormatOptionsError(
				$(plistPart), $.NSPropertyListXMLFormat_v1_0, 0, null);
			var nsstring = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
			return $(nsstring).js;
		},

		convertStringToPlist: function(str) {
			return ObjC.deepUnwrap(
				$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
					$(str).dataUsingEncoding($.NSUTF8StringEncoding), 0, 0, null));
		},

		createEmptyGroupAction: function(actionName) {
			return this.convertStringToPlist(
				"<plist version='1.0'> \n" +
				"<dict> \n" +
				"	<key>" + (actionName || "") + "</key> \n" +
				"	<string>Installer</string> \n" +
				"	<key>Actions</key> \n" +
				"	<array/> \n" +
				"	<key>MacroActionType</key> \n" +
				"	<string>Group</string> \n" +
				"	<key>TimeOutAbortsMacro</key> \n" +
				"	<true/> \n" +
				"</dict> \n" +
				"</plist>");
		},

		getInitialCommentFromMacro: function(macro) {
			var results = [];
			if (!macro.Actions || macro.Actions.length === 0)
				return null;

			var action = macro.Actions[0];
			if (action.MacroActionType !== "Comment")
				return null;

			return {
				name: action.ActionName || action.Title || "",
				title: action.Title || "",
				text: action.Text || ""
			};
		},

		// File must contain one macro only, or exception is thrown.
		getMacroFromKMMacrosFile: function(path) {
			var plist = this.readPlistArrayTextFile(path);
			if (!plist)
				throw Error("Could not read file '" + path + "'");
			if (plist.length === 0)
				throw Error("No macros were found in '" + path + "'");
			if (plist.length > 1)
				throw Error("Multiple macros were found in '" + path + "'");
			var group = plist[0];

			if (!group.Macros || group.Macros.count === 0)
				throw Error("No macros were found in '" + path + "'");
			if (group.Macros.length > 1)
				throw Error("Multiple macros were found in '" + path + "'");
			return group.Macros[0];
		},

		readPlistArrayTextFile: function(strPath) {
			// var str = readTextFile(strPath);
			// return this.convertStringToPlist(str);
			var strFullPath = $(strPath).stringByStandardizingPath;
			return ObjC.deepUnwrap($.NSArray.arrayWithContentsOfFile(strFullPath));
		},

		readPlistBinaryFile: function(path) {
			var data = $.NSData.dataWithContentsOfFile(path);
			return ObjC.deepUnwrap(
				$.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(
					data, $.NSPropertyListBinaryFormat_v1_0, 0, null));
		},

		readPlistDictionaryTextFile: function(strPath) {
			var strFullPath = $(strPath).stringByStandardizingPath;
			return ObjC.deepUnwrap($.NSDictionary.dictionaryWithContentsOfFile(strFullPath));
		},

		writePlistTextFile: function(plist, strPath) {
			var str = this.convertPlistPartToString(plist);
			$(str).writeToFileAtomically($(strPath).stringByStandardizingPath, true);
		}
	};
})();
```