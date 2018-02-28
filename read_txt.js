/*
 * jquery采用一个立即调用函数
 * 判断是否是CommonJS规范（typeof module === "object" && typeof module.exports === "object"）
 * ----------其中module 和 module.exports主要是为了让jQuery能够以模块的形式注入到没有window.document变量的运行环境中
 * ----------例如在Node.js中，就不会在window中设置jQuery$变量，而是使用所返回的jQuery对象： var jQuery = require("jquery")(window);
 * 如果是CommonJS规范，就判断有没有document(走到这步是判断过没有window，开启没有window模式)
 * --如果有document则调用库函数factory
 * --如果没有document则返回一个等待传入window的匿名函数
 * 如果不是CommonJS规范，则调用库函数factory
 */
(function(global, factory) {
	if(typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function(w) {
				if(!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	//------------------------------------------------------------------------
	//具体的库函数factory如下
	//------------------------------------------------------------------------
	/*
	 * deletedIds = [] //定义一个空数组对象deletedIds，储存slice、concat、push、indexOf四个方法入口
	 * class2type = {} //定义一个空对象class2type，储存toString和hasOwnProperty方法
	 */
	var deletedIds = [];
	var slice = deletedIds.slice;
	var concat = deletedIds.concat;
	var push = deletedIds.push;
	var indexOf = deletedIds.indexOf;
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var support = {}; //???
	/*
	 * version是当前版本号
	 * jQuery对象实际上只是init构造函数增强,如果调用jQuery就需要初始化（如果不包括，则允许抛出错误）
	 * --jQuery没有使用new运算符将jQuery显示的实例化，而是直接调用其函数
	 * --要实现这样,那么jQuery就要看成一个类，且返回一个正确的实例，实例还要能正确访问jQuery类原型上的属性与方法
	 * --通过原型传递(jQuery.fn.init.prototype = jQuery.fn)解决问题，把jQuery的原型传递给jQuery.prototype.init.prototype 
	 * --通过这个方法生成的实例this所指向的仍然是jQuery.fn(jQuery.prototype)，能正确访问 jQuery类原型上的属性与方法
	 * rtrim用来确保去除BOM和 &nbsp,支持Android<4.1, IE<9。
	 * --BOM为byte-order mark的缩写，意思是字节顺序标记(https://zh.wikipedia.org/wiki/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F)
	 * rmsPrefix和rdashAlpha: 匹配用于驼峰命名化的虚线
	 * --rmsPrefix: IE中的前缀 -ms 转成  Ms
	 * --rdashAlpha: 转大小写 -left转成  Left
	 * fcamelCase: 被jQuery.camelCase用作回调函数来replace()
	 * --返回第二个参数letter转为大写的值
	 */
	var version = "1.11.3",
		jQuery = function(selector, context) {
			return new jQuery.fn.init(selector, context);
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase();
		};
	/*
	 * jQuery.fn为jQuery的原型(jQuery.prototype)的别名, 挂载在jQuery.prototype上的方法可让所有jQuery对象使用
	 * jQuery.fn.jquery: 当前使用的jQuery版本
	 * jQuery.fn.constructor: 构造函数，手动让jQuery.prototype.constructor指回 jQuery
	 * --由于采用对象字面量的方式 jQuery.prototype = {} 重写了 jQuery.prototype,所以jQuery.prototype.constructor 将指向 Object
	 * jQuery.fn.selector: 定义一个空的选择器selector
	 * jQuery.fn.length: jQuery对象的长度，默认为 0。也即是jQuery对象里边选取的DOM节点数目。
	 * jQuery.fn.toArray: 将jQuery对象转换成数组类型，相当于Array.prototype.slice.call(this)
	 * 
	 * 
	 */
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		length: 0,
		toArray: function() {
			return slice.call(this);
		},
		get: function(num) {
			return num != null ?
				(num < 0 ? this[num + this.length] : this[num]) :
				slice.call(this);
		},
		pushStack: function(elems) {
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObject = this;
			ret.context = this.context;
			return ret;
		},
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
		push: push,
		sort: deletedIds.sort,
		splice: deletedIds.splice
	};
}));