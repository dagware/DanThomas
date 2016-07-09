
```applescript
tell application "Keyboard Maestro"	set macroUUIDs to selectedMacros	if (count of macroUUIDs) is 0 then		return ""	end if	return item 1 of macroUUIDsend tell
```