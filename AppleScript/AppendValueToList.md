
```applescript
(***************************************************
AppendValueToList

PURPOSE:	Appends the value to the list, if the
			value is not "".

Updated:	2016/06/05 15:19 PDT
****************************************************)
on AppendValueToList(value, theList)
	set _value to value as text
	if _value ≠ "" then
		copy _value to the end of theList
	end if
end AppendValueToList
```