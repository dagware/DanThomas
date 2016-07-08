
```js
// Utilities for working with file names.
// UPDATED: 2016/07/08 10:38 PDT
var FileNameUtils = {

	// Appends a value before the file extension. If no file extension, the
	// value is added to the end of the file name. This is useful for adding
	// trailing sequence numbers or timestamps, for example.
	appendBeforeFileExtension: function(path, value) {
		var i = this.indexOfFileExtension(path);
		return ((i <= 0) ? path + value : path.substring(0, i) + value) +
			this.getFileExtension(path);
	},

	// Combines 2 path components, making sure there is one and only one "/"
	// between them.
	combinePathComponents: function(path1, path2) {
		if (path1.endsWith("/"))
			path1 = path1.substring(0, path1.length - 1);
		if (path2.startsWith("/"))
			path2 = path2.substring(1);
		return path1 + "/" + path2;
	},

	// If the path has a leading tilde ("~"), this expands the path to a
	// fully-qualified path, otherwise it returns the path as is.
	expandLeadingTilde: function(path) {
		return path.charCodeAt(0) === 126 ?
			ObjC.unwrap($(path).stringByExpandingTildeInPath) :
			path;
	},

	// Returns the extension of the file name, or an empty string if none.
	getFileExtension: function(path) {
		var i = this.indexOfFileExtension(path);
		return (i <= 0) ? "" : path.substring(i);
	},

	// Returns the current user's home folder, without a trailing "/".
	getHomeFolder: function() {
		return ObjC.unwrap($('~').stringByExpandingTildeInPath);
	},

	// Returns the last component of the path, which is often the file
	// name, but could be a folder name.
	getLastPathComponent: function(path) {
		var i = path.lastIndexOf("/");
		return i < 0 ? path : path.substring(i + 1);
	},

	// Returns the index of the start of the extension in a file name,
	// or -1 if not found. Also returns -1 if the file name starts with
	// a ".", as in ".something", or the period immediately follows a "/",
	// like "//machine/user/.something".
	indexOfFileExtension: function(path) {
		var i = path.lastIndexOf(".");
		return (i <= 0 || path[i - 1] === "/") ? -1 : i;
	},

	// Replaces the current file name's extension with a new one. If "newExt"
	// is blank, the extension is removed. Otherwise, "newExt" can include
	// the leading ".", but it doesn't have to.
	replaceFileExtension: function(path, newExt) {
		if (!newExt) {
			newExt = ""
		} else if (!newExt.startsWith(".")) {
			newExt = "." + newExt;
		}
		var i = this.indexOfFileExtension(path);
		return (i <= 0) ? path + newExt : path.substring(0, i) + newExt;
	},

	// Removes the last component of the path, which is often the file name.
	// Leaves the trailing "/" if any.
	removeLastPathComponent: function(path) {
		var i = path.lastIndexOf("/");
		return i < 0 ? "" : path.substring(0, i + 1);
	},
};
```