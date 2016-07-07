
```applescript
(*************************************
LoadPlistFile

PURPOSE:	Loads a property list from disk.

PARAMETERS:

	fileName: The name of the file to load.
	
RETURNS:	The plist object.

Updated:		2016/06/06 09:44 PDT
**************************************)
on LoadPlistFile(fileName)
	tell application "System Events" to set _plist to (value of property list file fileName)
	return _plist
end LoadPlistFile

```