
```applescript
(***********************************************************
ConvertListOfRecordsToListOfStrings

PURPOSE:	Convert a list of records with multiple fields
			to a list of strings. Uses the supplied delimiter
			to delimit the fields in eacn string.

PARAMETERS:

	theList:		The list of records to convert.
	fieldDelimiter:	How to delimit each field in the record.
					Tab is a common choice.
	
RETURNS:	A list of strings.

Updated:	2016/06/06 09:27 PDT
**************************************************************)
on ConvertListOfRecordsToListOfStrings(theList, fieldDelimiter)
	set TIDS to AppleScript's text item delimiters
	set AppleScript's text item delimiters to fieldDelimiter
	try
		set _list to {}
		repeat with _record in theList
			set _line to _record as text
			copy _line to end of _list
		end repeat
		
		set AppleScript's text item delimiters to TIDS
		
		return _list
	on error errMsg number errNum
		set AppleScript's text item delimiters to TIDS
		error errMsg number errNum
	end try
end ConvertListOfRecordsToListOfStrings

```