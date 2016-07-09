
```applescript
(*****************************************************
GetKMMacroNamesAndUUIDsFromClipboard

PURPOSE:	Retrieves the list of Keyboard Maestro macros and
			their UUIDs from KMMacros data on the clipboard,
			if present.
	
RETURNS:	Returns a list of records that contain each macro
			name and UUID from the clipboard, or an empty list
			if none found.

Updated:	2016/06/06 14:02 PDT
******************************************************)
on GetKMMacroNamesAndUUIDsFromClipboard()
	set _clipboardMacroList to GetKMMacroListFromClipboard()
	if _clipboardMacroList = {} then return {}
	
	set _list to {}
	repeat with _macro in _clipboardMacroList
		set end of _list to {|name| of _macro, UID of _macro}
	end repeat
	
	return _list
end GetKMMacroNamesAndUUIDsFromClipboard

```