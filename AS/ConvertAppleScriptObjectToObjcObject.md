
```applescript
(***********************************************
ConvertAppleScriptObjectToObjcObject

PURPOSE:	Converts an AppleScript object to an ObjcObject.

NOTES:		Currently only supports records and lists.

Updated:	2016/06/05 15:19 PDT
************************************************)
on ConvertAppleScriptObjectToObjcObject(asObject)
	set a to current application
	set cClass to class of asObject
	
	if (cClass is record) then
		return a's NSDictionary's dictionaryWithDictionary:asObject
	else if (cClass is list) then
		return a's NSArray's arrayWithArray:asObject
	else
		error "Unexpected Class Type"
	end if
end ConvertAppleScriptObjectToObjcObject

```