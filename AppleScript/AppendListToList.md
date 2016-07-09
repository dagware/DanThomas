
```applescript
(***************************************************
AppendListToList

PURPOSE:	Appends the source list to the dest list,
			skipping any values of ""

Updated:	2016/06/05 15:19 PDT
****************************************************)
on AppendListToList(sourceList, destList)
	repeat with _item in sourceList
		my AppendValueToList(_item, destList)
	end repeat
end AppendListToList
```

See also: [AppendValueToList](AppendValueToList.md)