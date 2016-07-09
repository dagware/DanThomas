
```actionscript
set theTitle to "Select a folder"try	set f to choose folder with prompt theTitle	return POSIX path of fon error	return ""end try
```