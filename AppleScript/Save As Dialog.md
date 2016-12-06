
```applescript
try	set a to alias "Macintosh HD:Users:Dan:Desktop:Misc:"	set resultFile to (choose file name with prompt "Save As File" default name "1.jpg" default location a) as text	return POSIX path of resultFileon error	return ""end try
```