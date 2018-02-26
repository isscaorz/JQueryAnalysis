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
	//具体的库函数factory见下文	
}));
//------------------------------------------------------------------------
//具体的库函数factory
//------------------------------------------------------------------------

var deletedIds = [];
var slice = deletedIds.slice;
var concat = deletedIds.concat;
var push = deletedIds.push;
var indexOf = deletedIds.indexOf;
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var support = {};