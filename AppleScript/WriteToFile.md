
```applescript
(***************************************************************************
WriteToFile

PURPOSE:	Writes data to a file.

PARAMETERS:

	theData:		The data to write to the file.
	
	fileName:		The file name of the file.
	
	appendToEOF:	If true, append to the end of the file, otherwise
					overwrite existing data, if any.
	
RETURNS:		Nothing

Updated:		2016/06/08 16:34 PDT
***************************************************************************)
on WriteToFile(theData, fileName, appendToEOF)
	set _file to open for access fileName with write permission
	try
		if appendToEOF is false then set eof of _file to 0
		write theData to _file as «class utf8» starting at eof
		close access _file
	on error errMsg number errNum
		try
			close access _file
		end try
		error errMsg number errNum
	end try
end WriteToFile

```