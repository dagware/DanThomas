
```js
// ======= BEGIN CLASS SOURCE CODE =========================================
// THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
var FileUtils = (function() {
	return {
		chooseFile: function(prompt, type) {
			try {
				var options = {};
				if (prompt) options.withPrompt = prompt;
				if (type) options.ofType = type;
				return this.getCurrentApp().chooseFile(options).toString();
			} catch (e) {
				return "";
			}
		},

		copyFile: function(fromPath, toPath, throwIfFail) {
			var error;
			var result = ObjC.unwrap(
				$.NSFileManager.defaultManager
				.copyItemAtPathToPathError(
					$(fromPath).stringByStandardizingPath,
					$(toPath).stringByStandardizingPath,
					error
				)
			);
			if (error || (!result && throwIfFail))
				throw Error('Could not copy "' + fromPath + '" to "' + toPath + '"');
			return result;
		},

		createFolder: function(path, createIntermediateDirectories) {
			var error = $();
			if (!$.NSFileManager.defaultManager
				.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(
					$(path).stringByStandardizingPath,
					createIntermediateDirectories,
					$(), error)) {
				throw Error("Could not create folder '" + path + "'");
			}
		},

		createFolderIfNeeded: function(path, createIntermediateDirectories) {
			if (!this.folderExists(path))
				this.createFolder(path, createIntermediateDirectories);
		},

		fileExists: function(path) {
			var result = this.getFileOrFolderExists(path);
			return result.exists && result.isFile;
		},

		folderExists: function(path) {
			var result = this.getFileOrFolderExists(path);
			return result.exists && !result.isFile;
		},

		getCurrentApp: function() {
			var app = Application.currentApplication();
			app.includeStandardAdditions = true;
			return app;
		},

		getDirectoryContents: function(strPath, includeSubfolders, includeDotFiles) {
			var method = includeSubfolders ?
				"subpathsOfDirectoryAtPathError" :
				"contentsOfDirectoryAtPathError";
			var error;
			var contents =
				ObjC.deepUnwrap(
					$.NSFileManager.defaultManager[method](
						$(strPath)
						.stringByStandardizingPath, error
					)
				);
			if (error)
				throw Error('Could not get contents of "' + strPath + '"');
			if (!includeDotFiles) {
				contents = contents.filter(function(item) {
					return !item.startsWith(".") && !item.includes("/.");
				});
			}
			return contents;
		},

		getFileOrFolderExists: function(path) {
			var isDirectory = Ref();
			var exists = $.NSFileManager.defaultManager
				.fileExistsAtPathIsDirectory(path, isDirectory);
			return {
				exists: exists,
				isFile: isDirectory[0] !== 1
			};
		},

		readTextFile: function(strPath) {
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
		},

		trashFile: function(path, throwIfFail) {
			return this.trashFileOrFolder(path, true, throwIfFail);
		},

		trashFileOrFolder: function(path, isFile, throwIfFail) {
			var fileOrFolderText = isFile ? "file" : "folder";
			if (!path)
				throw Error("Path is required in trashFileOrFolder");
			if (isFile === undefined)
				throw Error("isFile is required in trashFileOrFolder");

			if (!isFile && path.endsWith("/"))
				path = path.substring(0, path.length - 1);

			var exists = this.getFileOrFolderExists(path);
			if (!exists.exists)
				return false;
			if (exists.isFile !== isFile) {
				if (throwIfFail)
					throw Error("Path to be deleted '" + path + "' is not a " +
						fileOrFolderText);
				return false;
			}

			var fileURL = $.NSURL.fileURLWithPathIsDirectory($(path), !isFile);
			var error;
			var result = ObjC.unwrap(
				$.NSFileManager.defaultManager
				.trashItemAtURLResultingItemURLError(
					fileURL,
					null,
					error
				)
			);
			if (error || (!result && throwIfFail))
				throw Error("Could not trash " + fileOrFolderText + "'" + path + "'");
			return result;
		},

		trashFolder: function(path, throwIfFail) {
			return this.trashFileOrFolder(path, false, throwIfFail);
		},

		writeTextFile: function(strContent, strPath) {
			var str = $.NSString.alloc.initWithUTF8String(strContent);
			var result = str.writeToFileAtomicallyEncodingError(
				$(strPath).stringByStandardizingPath,
				true,
				$.NSUTF8StringEncoding,
				null);
			if (!result)
				throw Error("Could not write file '" + strPath + "'");
		}
	};
})();

```