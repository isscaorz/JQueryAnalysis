(function () {
    // var first = ['a', 'b', 'c'];
    // var first1 = { "hello": 'hello' };
    // var second = ['d', 'e', 'f'];
    // var arr = $.merge(first1, second);
    // console.log(arr);
    var arr = ["one", "two", "three", "four", "five"];

    var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };

    // jQuery.each(arr, function (el,i) {
    //     console.log(el,i);
    // });
    // console.log(jQuery.fn);
    $('ul.first').find('.foo').css('background-color', 'red')
    .end().end().find('.bar').css('background-color', 'green');
    console.log( $('ul.first').find('.foo').end().end().end());
}());