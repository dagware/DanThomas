
By Brian Huisman based on work by David Koelle
Original function name: alphanumCase
See (http://www.davekoelle.com/files/alphanum.js)

```js
function caseInsensitiveNaturalCompareForStrings(a, b) {
	function chunkify(t) {
		var tz = new Array();
		var x = 0,
			y = -1,
			n = 0,
			i, j;

		while (i = (j = t.charAt(x++)).charCodeAt(0)) {
			var m = (i == 46 || (i >= 48 && i <= 57));
			if (m !== n) {
				tz[++y] = "";
				n = m;
			}
			tz[y] += j;
		}
		return tz;
	}

	var aa = chunkify(a.toLowerCase());
	var bb = chunkify(b.toLowerCase());

	for (var x = 0; aa[x] && bb[x]; x++) {
		if (aa[x] !== bb[x]) {
			var c = Number(aa[x]),
				d = Number(bb[x]);
			if (c == aa[x] && d == bb[x]) {
				return c - d;
			} else return (aa[x] > bb[x]) ? 1 : -1;
		}
	}
	return aa.length - bb.length;
}
```