;(function() {
	// var first = ['a', 'b', 'c'];
	// var first1 = { "hello": 'hello' };
	// var second = ['d', 'e', 'f'];
	// var arr = $.merge(first1, second);
	// console.log(arr);
	var arr = ['one', 'two', 'three', 'four', 'five']

	var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 }

	// jQuery.each(arr, function (el,i) {
	//     console.log(el,i);
	// });
	// console.log(jQuery.fn);

	console.log(typeof 0)
	console.log(getRandom(2))
	console.log(getRandom(2))
	function getRandom(a) {
		for (var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; 1 < c; c--) {
			var d = Math.floor(10 * Math.random()),
				e = b[d]
			console.log('d:' + d)
			console.log('e:' + e)
			b[d] = b[c - 1]
			b[c - 1] = e
		}
		for (c = d = 0; 5 > c; c++) {
			d = 10 * d + b[c]
			console.log('d:' + d)
		}
		return (a || '') + (d + '')
	}
})()
