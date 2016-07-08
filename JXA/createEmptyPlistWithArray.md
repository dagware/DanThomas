
```js
// Creates an empty plist file with a
// trop-level array.
// UPDATED: 2016/07/07 18:29 PDT
function createEmptyPlistWithArray() {
	return convertStringToPlist(
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\
	<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\
	<plist version=\"1.0\">\
	<array>\
	</array>\
	</plist>"
	);
}
```

Uses:
* [convertStringToPlist](JXA%2FconvertStringToPlist.md)