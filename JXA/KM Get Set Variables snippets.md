
```js
var _kme = Application("Keyboard Maestro Engine");

var _var = _kme.getvariable('GMNU__macroUUID');

_kme.setvariable("GMNU__MacroName", {
	to: _match.macro.Name
});

```