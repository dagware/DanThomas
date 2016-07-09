
```applescript
(****************************************************************
GetKMMacroListFromClipboard

PURPOSE:	Gets a Keyboard Maestro Macro Array from the
			clipboard, as a list.
	
RETURNS:	The Macro list, or an empty list.

Updated:	2016/06/06 11:23 PDT
*****************************************************************)
on GetKMMacroListFromClipboard()
	set _generalPasteboard to current application's NSPasteboard's generalPasteboard()
	
	try
		if (_generalPasteboard's canReadItemWithDataConformingToTypes:{"com.stairways.keyboardmaestro.macrosarray"}) as boolean then
			set _clipping to _generalPasteboard's stringForType:"com.stairways.keyboardmaestro.macrosarray"
		else
			return {}
		end if
		
		set _data to _clipping's dataUsingEncoding:(current application's NSUTF8StringEncoding)
		
		set {_object, _error} to current application's NSPropertyListSerialization's propertyListWithData:_data options:0 format:(missing value) |error|:(reference)
		if _object is missing value then return {}
		
		return _object as list
	on error
		return {}
	end try
end GetKMMacroListFromClipboard

```