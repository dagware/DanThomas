
```js
// Will make a new RegExp if the flags don't match, unless
// throwIfFlagsDontMatch is true, in which case an exception
// is thrown. Also, when used with String.prototype.toRegExp,
// you can guarantee that an object is a RegExp with the expected
// flags.
// UPDATED: 2016/07/20 02:12 PDT
RegExp.prototype.toRegExp = function(flags, throwIfFlagsDontMatch) {
	if (flags !== undefined && this.flags !== flags) {
		if (this.flags && throwIfFlagsDontMatch)
			throw Error("Regular expression flags don't match required flags");
		console.log("** made new regexp");
		return new RegExp(this.source, flags);
	}
	return this;
}
```

Also See:
* [String.prototype.toRegExp](String.prototype.toRegExp.md)