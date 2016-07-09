
```applescript
(***************************************************
ConvertListToMultiLineString

PURPOSE:	Convert a list to a multi-line string.

PARAMETERS:

	theList:	The list of strings to convert.
	
RETURNS:	A string containing the converted list.

Updated:	2016/06/06 09:29 PDT
*****************************************************)
on ConvertListToMultiLineString(theList)
	set TIDS to AppleScript's text item delimiters
	try
		set AppleScript's text item delimiters to linefeed
		set _result to theList as text
		set AppleScript's text item delimiters to TIDS
		return _result
	on error errMsg number errNum
		set AppleScript's text item delimiters to TIDS
		error errMsg number errNum
	end try
end ConvertListToMultiLineString

```