
```applescript
(****************************************
GetSortedListOfStrings

PURPOSE:	Sorts a list of strings.

PARAMETERS:

	theList:	A list of strings.
	
RETURNS:	The sorted list.

Updated:		2016/06/05 15:19 PDT
******************************************)
on GetSortedListOfStrings(theList)
	set _objcArray to current application's NSArray's arrayWithArray:theList
	set _sortedItems to _objcArray's sortedArrayUsingSelector:"localizedStandardCompare:"
	return (_sortedItems as list)
end GetSortedListOfStrings

```