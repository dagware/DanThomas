
```applescript
(************************************************
GetObjcPropertyValueByName

PURPOSE:	Retrieves the value of a dictionary property
			based on the name of the key. Result is
			converted to text.
				
NOTES:		Currently does not support returning lists.

Updated:	2016/06/05 15:19 PDT
*************************************************)
on GetObjcPropertyValueByName(propertyName, objcItem)
	return (objcItem's valueForKey:propertyName) as text
end GetObjcPropertyValueByName

```