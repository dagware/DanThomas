# PathNameUtils
Methods for manipulating Path and File names.
### NOTE: ###
This class uses the "Module" Design Pattern. Basically, anything in the "return" statement is public, everything before it is private.

See https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

## [Jump to the Source Code](#source)

---

## Functions and Usage

* [appendBeforeFileExtension()](#appendBeforeFileExtension)
* [combinePathComponents()](#combinePathComponents)
* [expandLeadingPathTilde()](#expandLeadingPathTilde)
* [getFileExtension()](#getFileExtension)
* [getHomeFolder()](#getHomeFolder)
* [getLastPathComponent()](#getLastPathComponent)
* [indexOfFileExtension()](#indexOfFileExtension)
* [removeLastPathComponent()](#removeLastPathComponent)
* [removeTrailingSlash()](#removeTrailingSlash)
* [replaceFileExtension()](#replaceFileExtension)
---

### <a name="appendBeforeFileExtension"></a>PathNameUtils.appendBeforeFileExtension(path, value)
**PURPOSE:**
Appends a value before the file extension. If no file extension, the value is added to the end of the file name.

This is useful for adding trailing sequence numbers or timestamps, for example.

---

### <a name="combinePathComponents"></a>PathNameUtils.combinePathComponents(path1, path2)

**PURPOSE:**
Combines the two path components in such a way as to make sure the is one and only one slash between the two components.

---

### <a name="expandLeadingPathTilde"></a>PathNameUtils.expandLeadingPathTilde(path)
**PURPOSE:**
If the path has a leading tilde ("~"), this expands the path to a fully-qualified path, otherwise it returns the path as is.

---

### <a name="getFileExtension"></a>PathNameUtils.getFileExtension(path)
**PURPOSE:**
Returns the file extension including the leading period, if any, otherwise returns "".

If the file name starts with a period, it is considered to have no extension.

---

### <a name="getHomeFolder"></a>PathNameUtils.getHomeFolder()
**PURPOSE:**
Returns the user's home folder, like "/Users/Dan". This does NOT have a trailing slash, but see [combinePathComponents](#combinePathComponents).

---

### <a name="getLastPathComponent"></a>PathNameUtils.getLastPathComponent(path)
**PURPOSE:**
Retrieves the last path component, which is typically the name of the fiile, but it doesn't have to be.

If "path" ends with a slash, it is removed before the last component is removed.

---

### <a name="indexOfFileExtension"></a>PathNameUtils.indexOfFileExtension(path)
**PURPOSE:**
Returns the index of the period that starts the file extension, if any, otrherwise -1.

If the file name starts with a period, it is considered to have no extension.

---

### <a name="removeLastPathComponent"></a>PathNameUtils.removeLastPathComponent(path)
**PURPOSE:**
Removes the last past path component. Result includes the trailing slash.

If "path" ends with a slash, it is removed before the last component is removed.

---

### <a name="removeTrailingSlash"></a>PathNameUtils.removeTrailingSlash(path)
**PURPOSE:**
Removes the trailing slash, if any.

---

### <a name="replaceFileExtension"></a>PathNameUtils.replaceFileExtension(path, newExt)
**PURPOSE:**
Replaces the file extension, if any, otherwise does nothing.

To remove the extension completely, omit "newExt or pass an empty string.

Otherwise, "newExt" can include the leading period, but if it doesn't, it is added for you.

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

			getHomeFolder: function() {
				return this.expandLeadingPathTilde("~");
			},

			getLastPathComponent: function(path) {
				path = this.removeTrailingSlash(path);
				var i = path.lastIndexOf("/");
				return i < 0 ? path : path.substring(i + 1);
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

	test("PathNameUtils.getLastPathComponent('/folder/test.txt')", "test.txt");
	test("PathNameUtils.getLastPathComponent('/folder/test')", "test");
	test("PathNameUtils.getLastPathComponent('/folder/test/')", "test");

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