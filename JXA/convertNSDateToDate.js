ObjC.import('AppKit');

// Converts an NSDate to a Javascript date. Works for timestamps
// in plist files.
function convertNSDateToDate(timestamp) {
	var result = ObjC.unwrap($.NSDate.dateWithTimeIntervalSinceReferenceDate(timestamp));
	return result;
}