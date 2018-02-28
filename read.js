/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 * 解析开始时间：2018-01-20
 * 解析参考：
 * http://rapheal.sinaapp.com/tag/jquery-2/
 * 
 * 
 * 符号预定义： 
 * //------------------------------------------------------------------------
 * 两行72个'-'号中间夹杂省略的代码（说明）
 * 
 * //???
 * 三个问号表示此处不明 
 */
(function(global, factory) { //整个jquery是一个立即调用的匿名函数
	if(typeof module === "object" && typeof module.exports === "object") { //判断是否是CommonJS规范
		module.exports = global.document ? //判断是否有document（这里已经开启没有window模式）
			factory(global, true) : //有document则调用库函数factory
			function(w) { //没有document则返回一个等待传入window的匿名函数
				if(!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else { //不是CommonJS规范则调用库函数factory
		factory(global);
	}
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) { //库函数factory
	var deletedIds = []; //定义一个空数组对象，储存slice、concat、push、indexOf四个方法入口，节省查找内存地址时间，提高效率
	var slice = deletedIds.slice; //将slice方法储存到deletedIds
	var concat = deletedIds.concat; //将concat方法储存到deletedIds
	var push = deletedIds.push; //将push方法储存到deletedIds
	var indexOf = deletedIds.indexOf; //将indexOf方法储存到deletedIds
	var class2type = {}; //定义一个空对象 {}，储存toString和hasOwnProperty方法
	var toString = class2type.toString; //将toString方法储存到class2type
	var hasOwn = class2type.hasOwnProperty; //将hasOwnProperty方法储存到class2type并缩写为hasOwn
	var support = {}; //???
	var version = "1.11.3", //定义当前版本号
		jQuery = function(selector, context) { //实例化jQuery对象 ,selector是选择器，context是上下文			
			return new jQuery.fn.init(selector, context); //jQuery对象实际上只是init构造函数增强,如果调用jQuery就需要初始化（如果不包括，则允许抛出错误）
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, //确保去除BOM(字节顺序标记)和 &nbsp,支持Android<4.1, IE<9。
		rmsPrefix = /^-ms-/, //匹配用于驼峰命名化的虚线，IE中的前缀 -ms 转成： Ms  
		rdashAlpha = /-([\da-z])/gi, //匹配用于驼峰命名化的虚线，转大小写-left转成 Left
		fcamelCase = function(all, letter) { //被jQuery.camelCase用作回调函数来replace()
			return letter.toUpperCase(); //字符串letter转换为大写
		};

	jQuery.fn = jQuery.prototype = {//给jQuery.prototype设置别名jQuery.fn
		jquery: version, //当前使用的jQuery版本
		constructor: jQuery, //手动让jQuery.prototype.constructor指回 jQuery
		selector: "", //定义一个空的选择器selector
		length: 0,//jQuery对象的长度，默认为 0
		toArray: function() {//将jQuery对象转换成数组类型
			return slice.call(this); //[].slice.call(this), 相当于Array.prototype.slice.call(this)
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function(num) {
			return num != null ?

				// Return just the one element from the set
				(num < 0 ? this[num + this.length] : this[num]) :

				// Return all the elements in a clean array
				slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function(callback, args) {
			return jQuery.each(this, callback, args);
		},

		map: function(callback) {
			return this.pushStack(jQuery.map(this, function(elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function() {
			return this.pushStack(slice.apply(this, arguments));
		},

		first: function() {
			return this.eq(0);
		},

		last: function() {
			return this.eq(-1);
		},

		eq: function(i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: deletedIds.sort,
		splice: deletedIds.splice
	};

}));