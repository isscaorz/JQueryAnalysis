(function () {   
    var first = ['a','b','c'];
    var first1 = { "hello":'hello'};
	var second = ['d','e','f'];
    var arr = $.merge(first1, second);
    console.log(arr);
}());