# PathNameUtils
Methods for manipulating Path and File names.
### NOTE: ###
This class uses the "Module" Design Pattern. Basically, anything in the "return" statement is public, everything before it is private.

See https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

## [Jump to the Source Code](#source)

---

## Functions and Usage

* [addTrailingSlash()](#addTrailingSlash)
* [appendBeforeFileExtension()](#appendBeforeFileExtension)
* [combinePathComponents()](#combinePathComponents)
* [expandLeadingPathTilde()](#expandLeadingPathTilde)
* [getFileExtension()](#getFileExtension)
* [getHomeFolder()](#getHomeFolder)
* [getLastPathComponent()](#getLastPathComponent)
* [getStandardizedPath()](#getStandardizedPath)
* [indexOfFileExtension()](#indexOfFileExtension)
* [removeLastPathComponent()](#removeLastPathComponent)
* [removeTrailingSlash()](#removeTrailingSlash)
* [replaceFileExtension()](#replaceFileExtension)

---

### <a name="addTrailingSlash"></a>PathNameUtils.addTrailingSlash(_path_)
**PURPOSE:**
Adds a trailing slash tp _path_ if there isn't one already, and returns the result.

**PARAMETERS:**
_path_: The path.

---

### <a name="appendBeforeFileExtension"></a>PathNameUtils.appendBeforeFileExtension(_path_, _value_)
**PURPOSE:**
Appends _value_ to _path_, before the file extension, and returns the result. If no file extension, then _value_ is added to the end of _path_.

This is useful for adding trailing sequence numbers or timestamps, for example.

**PARAMETERS:**
_path_: The path.
_value_: The value to be appended.

---

### <a name="combinePathComponents"></a>PathNameUtils.combinePathComponents(_path1_, _path2_)

**PURPOSE:**
Combines the two path components in such a way as to make sure there is one and only one slash between the two components, and returns the result.

**PARAMETERS:**
_path1_: The first path component.
_path_: The second path component.

---

### <a name="expandLeadingPathTilde"></a>PathNameUtils.expandLeadingPathTilde(_path_)
**PURPOSE:**
If _path_ has a leading tilde ("~"), returns _path_ to a fully-qualified path, otherwise returns _path_ as is.

**PARAMETERS:**
_path_: The path.

---

### <a name="getFileExtension"></a>PathNameUtils.getFileExtension(_path_)
**PURPOSE:**
Returns the file extension including the leading period, if any, otherwise returns "".

If the file name starts with a period, it is considered to have no extension.

**PARAMETERS:**
_path_: The path.

---

### <a name="getHomeFolder"></a>PathNameUtils.getHomeFolder(_addTrailingSlash_)
**PURPOSE:**
Returns the user's home folder, like "/Users/Dan".

**PARAMETERS:**
_addTrailingSlash_: OPTIONAL. Default **false**. If **true**, a trailing slash is included in the result, like "/Users/Dan/".

---

### <a name="getStandardizedPath"></a>PathNameUtils.getStandardizedPath(_path_, _keepTrailingSlash_)
**PURPOSE:**
Same as [NSString:stringByStandardizingPath](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSString_Class/index.html#//apple_ref/occ/instp/NSString/stringByStandardizingPath), except you have the option to keep the trailing slash, if there was one.

**PARAMETERS:**
_path_: The path.
_keepTrailingSlash_: OPTIONAL, default **false**. If **true** and _path_ had a trailing slash, then _result_ will have a trailing slash also.

---

### <a name="getLastPathComponent"></a>PathNameUtils.getLastPathComponent(_path_)
**PURPOSE:**
Returns the last component of _path_, which is typically the name of the fiile, but it doesn't have to be.

The does not include a trailing slash. If _path_ had a trailing slash, it is removed first, then the last component is returned.

**PARAMETERS:**
_path_: The path.

---

### <a name="indexOfFileExtension"></a>PathNameUtils.indexOfFileExtension(_path_)
**PURPOSE:**
Returns the index of the period that starts the file extension, if any, otherwise -1.

If the file name starts with a period, it is considered to have no extension.

**PARAMETERS:**
_path_: The path.

---

### <a name="removeLastPathComponent"></a>PathNameUtils.removeLastPathComponent(_path_)
**PURPOSE:**
Removes the last path component, and returns the result, which includes the trailing slash.

If "_path_" ends with a slash, it is removed before the last component is removed.

---

### <a name="removeTrailingSlash"></a>PathNameUtils.removeTrailingSlash(_path_)
**PURPOSE:**
Removes the trailing slash, if any.

**PARAMETERS:**
_path_: The path.

---

### <a name="replaceFileExtension"></a>PathNameUtils.replaceFileExtension(_path_, _newExt_)
**PURPOSE:**
Replaces the file extension, or appends _newExt_ as the new extension if _path_ did not have an extension, and returns the result.

To remove the extension completely, omit "newExt or pass an empty string.

**PARAMETERS:**
_path_: The path.
_newExt_: OPTIONAL. If not specified (or is an empty string), the extension (if present) is removed. If _newExt_ is supplied and is not an empty string, a leading period will automatically be added if you didn't include it.

---

## <a name="source"></a>Source Code

### NOTES:
The class itself is between the first set of "===========" comments.

The "test" section at the end contains examples of how to use each function.
Example:

```js
test("PathNameUtils.appendBeforeFileExtension('test.txt', '.abc')", "test.abc.txt");
```

The text between the first set of double-quotes is an example of how to call the function. So in this case, the example becomes:

```js
PathNameUtils.appendBeforeFileExtension('test.txt', '.abc')
```

### Source Code:

```js
(function() {
	'use strict';

	// ======= BEGIN CLASS SOURCE CODE =========================================
	var PathNameUtils = (function() {
		return {
			addTrailingSlash: function(path) {
				return path.endsWith("/") ? path : path + "/";
			},

			appendBeforeFileExtension: function(path, value) {
				var i = this.indexOfFileExtension(path);
				return i > 0 ?
					path.substring(0, i) + value + path.substring(i) :
					path + value;
			},

			combinePathComponents: function(path1, path2) {
				if (path1.endsWith("/"))
					path1 = path1.substring(0, path1.length - 1);
				if (path2.startsWith("/"))
					path2 = path2.substring(1);
				return path1 + "/" + path2;
			},

			expandLeadingPathTilde: function(path) {
				return path.startsWith("~") ?
					ObjC.unwrap($(path).stringByExpandingTildeInPath) :
					path;
			},

			getFileExtension: function(path) {
				var i = this.indexOfFileExtension(path);
				return (i <= 0) ? "" : path.substring(i);
			},

			getHomeFolder: function(addTrailingSlash) {
				var result = this.expandLeadingPathTilde("~");
				if (addTrailingSlash)
					result = this.addTrailingSlash(result);
				return result;
			},

			getLastPathComponent: function(path) {
				path = this.removeTrailingSlash(path);
				var i = path.lastIndexOf("/");
				return i < 0 ? path : path.substring(i + 1);
			},

			getStandardizedPath: function(path, keepTrailingSlash) {
				var hadTrailingSlash = path.endsWith("/");
				var result = $(path).stringByStandardizingPath.js;
				if (keepTrailingSlash && hadTrailingSlash && !result.endsWith("/"))
					result = result + "/";
				return result;
			},

			indexOfFileExtension: function(path) {
				var i = path.lastIndexOf(".");
				return (i <= 0 || path[i - 1] === "/") ? -1 : i;
			},

			removeLastPathComponent: function(path) {
				path = this.removeTrailingSlash(path);
				var last = this.getLastPathComponent(path);
				if (!last)
					return path;
				return path.substring(0, path.length - last.length);
			},

			removeTrailingSlash: function(path) {
				if (path.endsWith("/"))
					return path = path.substring(0, path.length - 1);
				return path;
			},

			replaceFileExtension: function(path, newExt) {
				if (!newExt) {
					newExt = ""
				} else if (!newExt.startsWith(".")) {
					newExt = "." + newExt;
				}
				var i = this.indexOfFileExtension(path);
				return (i <= 0) ? path + newExt : path.substring(0, i) + newExt;
			}
		}
	})();
	// ======= END CLASS SOURCE CODE ===========================================




	// ======= BEGIN TEST AND DEMO CODE ========================================
	function test(expression, expectedResult, isRegex) {
		var result = eval(expression);
		var hasExpectedResult = expectedResult != undefined;
		if (!hasExpectedResult ||
			(!isRegex && result === expectedResult) ||
			(isRegex && result.search(expectedResult) >= 0)) {
			console.log(expression + ' --> "' + result + '"');
		} else {
			console.log(' \n** UNEXPECTED RESULT ***********\n' +
				expression + '\nactual/expected:\n' + result + '\n' +
				(isRegex ? "regex: " : "") +
				expectedResult + '\n********************************\n ');
		}
	}

	test("PathNameUtils.appendBeforeFileExtension('test.txt', '.abc')", "test.abc.txt");
	test("PathNameUtils.appendBeforeFileExtension('test', '.abc')", "test.abc");

	test("PathNameUtils.combinePathComponents('/folder/name', 'folder/file.txt')", "/folder/name/folder/file.txt");
	test("PathNameUtils.combinePathComponents('/folder/name/', 'folder/file.txt')", "/folder/name/folder/file.txt");
	test("PathNameUtils.combinePathComponents('/folder/name/', '/folder/file.txt')", "/folder/name/folder/file.txt");
	test("PathNameUtils.combinePathComponents('/folder/name', '/folder/file.txt')", "/folder/name/folder/file.txt");

	test("PathNameUtils.expandLeadingPathTilde('~/Documents')", /^\/Users\/[^\/]*\/Documents$/, true);
	test("PathNameUtils.expandLeadingPathTilde('/Documents')", "/Documents");

	test("PathNameUtils.getFileExtension('test.txt')", ".txt");
	test("PathNameUtils.getFileExtension('test')", "");

	test("PathNameUtils.getHomeFolder()", /^\/Users\/[^\/]*$/, true);
	test("PathNameUtils.getHomeFolder(true)", /^\/Users\/[^\/]*\/$/, true);

	test("PathNameUtils.getLastPathComponent('/folder/test.txt')", "test.txt");
	test("PathNameUtils.getLastPathComponent('/folder/test')", "test");
	test("PathNameUtils.getLastPathComponent('/folder/test/')", "test");

	test("PathNameUtils.getStandardizedPath('~/Documents/')", /^\/Users\/[^\/]*\/Documents$/, true);
	test("PathNameUtils.getStandardizedPath('~/Documents', true)", /^\/Users\/[^\/]*\/Documents$/, true);
	test("PathNameUtils.getStandardizedPath('~/Documents/', true)", /^\/Users\/[^\/]*\/Documents\/$/, true);

	test("PathNameUtils.indexOfFileExtension('test.txt')", 4);
	test("PathNameUtils.indexOfFileExtension('test')", -1);
	test("PathNameUtils.indexOfFileExtension('.test')", -1);
	test("PathNameUtils.indexOfFileExtension('/path/.test')", -1);

	test("PathNameUtils.removeLastPathComponent('/folder/test.txt')", "/folder/");
	test("PathNameUtils.removeLastPathComponent('/folder/test/')", "/folder/");

	test("PathNameUtils.replaceFileExtension('/folder/test.txt', '.bak')", "/folder/test.bak");
	test("PathNameUtils.replaceFileExtension('/folder/test.txt', '')", "/folder/test");
	test("PathNameUtils.replaceFileExtension('/folder/test.txt')", "/folder/test");
	test("PathNameUtils.replaceFileExtension('/folder/test', '.txt')", "/folder/test.txt");
	// ======= END TEST AND DEMO CODE ==========================================

})()
```