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
(function (global, factory) { //整个jquery是一个立即调用的匿名函数
	if (typeof module === "object" && typeof module.exports === "object") { //判断是否是CommonJS规范
		module.exports = global.document ? //判断是否有document（这里已经开启没有window模式）
			factory(global, true) : //有document则调用库函数factory
			function (w) { //没有document则返回一个等待传入window的匿名函数
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else { //不是CommonJS规范则调用库函数factory
		factory(global);
	}
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) { //库函数factory
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
		jQuery = function (selector, context) { //实例化jQuery对象 ,selector是选择器，context是上下文			
			return new jQuery.fn.init(selector, context); //jQuery对象实际上只是init构造函数增强,如果调用jQuery就需要初始化（如果不包括，则允许抛出错误）
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, //确保去除BOM(字节顺序标记)和 &nbsp,支持Android<4.1, IE<9。
		rmsPrefix = /^-ms-/, //匹配用于驼峰命名化的虚线，IE中的前缀 -ms 转成： Ms  
		rdashAlpha = /-([\da-z])/gi, //匹配用于驼峰命名化的虚线，转大小写-left转成 Left
		fcamelCase = function (all, letter) { //被jQuery.camelCase用作回调函数来replace()
			return letter.toUpperCase(); //字符串letter转换为大写
		};

	jQuery.fn = jQuery.prototype = {//给jQuery.prototype设置别名jQuery.fn
		jquery: version, //当前使用的jQuery版本
		constructor: jQuery, //手动让jQuery.prototype.constructor指回 jQuery
		selector: "", //定义一个空的选择器selector
		length: 0,//jQuery对象的长度，默认为 0
		toArray: function () {//将jQuery对象转换成数组类型
			return slice.call(this); //[].slice.call(this), 相当于Array.prototype.slice.call(this)
		},
		get: function (num) {//获取jQuery对象中索引为num的元素
			return num != null ? //判断num是否不为null 
				(num < 0 ? this[num + this.length] : this[num]) : //如果num不为null，从集合中返回一个元素，如果num为负数，从数组尾巴倒数索引，num不为负数则返回索引为num的元素
				slice.call(this); //如果num为null，在一个干净的数组里返回所有元素，即将jQuery对象转换成数组类型
		},
		pushStack: function (elems) {//将一个元素集合（一般为dom）推入堆栈（并返回新的匹配元素集）
			var ret = jQuery.merge(this.constructor(), elems); //构建一个新的jQuery对象(this.constructor就是jQuery的构造函数jQuery.fn.init，所以this.constructor()返回一个jQuery对象,无参的this.constructor(),只是返回引用this), jQuery.merge 把elems节点，合并到新的jQuery对象,由于jQuery.merge函数返回的对象是第二个元素附加到第一个上面，所以ret也是一个jQuery对象
			ret.prevObject = this; //给返回的新jQuery对象ret添加属性prevObject，ret的prevObject属性指向上一个对象，所以可以通过prevObject属性找到栈的上一个对象，即通过prevObject取到上一个合集的引用
			ret.context = this.context;
			return ret; //返回新形成的元素集(新jQuery对象)ret
		},
		each: function (callback, args) {// 为匹配集合中的每个元素执行回调（可以使用一个args数组对参数进行种子处理，但仅在内部使用）。
			return jQuery.each(this, callback, args);
		},
		map: function (callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},
		slice: function () {
			return this.pushStack(slice.apply(this, arguments));
		},
		first: function () {
			return this.eq(0);
		},
		last: function () {
			return this.eq(-1);
		},
		eq: function (i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},
		end: function () {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: deletedIds.sort,
		splice: deletedIds.splice
	};

}));