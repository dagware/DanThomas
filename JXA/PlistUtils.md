
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
	};

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