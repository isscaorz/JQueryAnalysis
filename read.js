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
			var ret = jQuery.merge(this.constructor(), elems); //构建一个新的jQuery对象(this.constructor就是jQuery的构造函数jQuery.fn.init，所以this.constructor()返回一个jQuery对象,无参的this.constructor(),只是返回引用this, jQuery.merge 把elems节点，合并到新的jQuery对象,由于jQuery.merge函数返回的对象是第二个元素附加到第一个上面，所以ret也是一个jQuery对象
			ret.prevObject = this; //给返回的新jQuery对象ret添加属性prevObject，ret的prevObject属性指向上一个对象，所以可以通过prevObject属性找到栈的上一个对象，即通过prevObject取到上一个合集的引用
			ret.context = this.context;
			return ret; //返回新形成的元素集(新jQuery对象)ret
		},
		each: function (callback, args) {// 为匹配集合中的每个元素执行回调（可以使用一个args数组对参数进行种子处理，但仅在内部使用）。 
			return jQuery.each(this, callback, args);
		},
		map: function (callback) {//???为了实现遍历获得元素，实现过程看不懂
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},
		slice: function () {//???为什么要推入堆栈再切割数组
			return this.pushStack(slice.apply(this, arguments));
		},
		first: function () {//取当前jQuery对象的第一个
			return this.eq(0);
		},
		last: function () {//取当前jQuery对象的最后一个
			return this.eq(-1);
		},
		eq: function (i) {//通过堆栈链索指定序号的元素
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},
		end: function () {//回溯链式调用的上一个对象（每个对象里边的prevObject保存着链中的上一个jQ对象），弹出到document之后就恒为jQuery.fn.init不变。
			return this.prevObject || this.constructor(null);
		},
		push: push,//在此定义push()方法。只供内部使用。使行为类似于数组的方法，而不是像jQuery方法那样。
		sort: deletedIds.sort,//在此定义sort()方法。只供内部使用。使行为类似于数组的方法，而不是像jQuery方法那样。
		splice: deletedIds.splice//在此定义splice()方法。只供内部使用。使行为类似于数组的方法，而不是像jQuery方法那样。
	};
	jQuery.extend = jQuery.fn.extend = function () {//扩展合并函数，合并两个或更多对象的属性到第一个对象中，jQuery后续的大部分功能都通过该函数扩展
		var src, copyIsArray, copy, name, options, clone, //单var模式定义之后会用的局部变量
			target = arguments[0] || {}, //target为第一个参数
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {//处理深拷贝的情况，如果第一个参数为布尔值，表示是否要深度递归
			deep = target;//记录第一个参数到deep
			target = arguments[i] || {};//调整target的值
			i++;//调整i的值，i值表示第一个src对象的索引
		}
		if (typeof target !== "object" && !jQuery.isFunction(target)) { //如果传入的第一个参数不是对象或函数，而是字符串或者其他(可能正在深拷贝)（基本类型）
			target = {};//第一个参数修正为一个空的对象字面量{}
		}
		if (i === length) { //如果仅传递一个参数，则扩展jQuery本身
			target = this;
			i--;
		}
		for (; i < length; i++) {
			if ((options = arguments[i]) != null) { //只处理非 空/未定义 的值, 从i开始遍历获得传入的参数
				for (name in options) { //扩展基本对象
					src = target[name]; //src是源（即本身）的值
					copy = options[name]; //copy是即将要复制过去的值
					if (target === copy) { //防止有无限循环，例如 extend(true, target, {'target':target});
						continue;
					}
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {//如果我们合并纯对象或数组，则递归。纯粹的对象指的是 通过 "{}" 或者 "new Object" 创建的
						if (copyIsArray) { 
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
						target[name] = jQuery.extend(deep, clone, copy); //不要移动原始对象，而是克隆它们
					} else if (copy !== undefined) { //不要引入未定义的值。最终都会到这条分支
						target[name] = copy;
					}
				}
			}
		}
		return target; //返回修改后的对象，如果 i < length ，是直接返回没经过处理的 target，也就是 arguments[0]，也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 jQuery 的静态方法
	};

	jQuery.extend({		
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),// 产生jQuery随机数，来ba页面上的jQuery的每个副本都是唯一的
		isReady: true, //DOM ready是否已经完成。假定jQuery在模块没就绪之前就已经就绪
		error: function (msg) {//为JavaScript的 "error" 事件绑定一个处理函数
			throw new Error(msg);
		},
		noop: function () { },//空函数。
		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function (obj) {//判断传入对象是否为 function。从1.3版本开始，dom方法或者类似alert的函数不再支持，在IE中返回false
			return jQuery.type(obj) === "function";
		},
		isArray: Array.isArray || function (obj) {//判断传入对象是否为数组
			return jQuery.type(obj) === "array";
		},
		isWindow: function (obj) {//判断传入对象是否为 window 对象
			return obj != null && obj == obj.window;
		},
		isNumeric: function (obj) {// 确定它的参数是否是一个数字
			return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;//加1是为了弥补精度损失，但是超大数如9999999999999999还是会有问题
		},
		isEmptyObject: function (obj) { //检查对象是否为空（不包含任何属性）
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},
		isPlainObject: function (obj) {// 测试对象是否是纯粹的对象,通过"{}"或者"new Object"创建的
			var key;
			if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {//obj必须为一个Object，并且必须不是DOM节点或者window对象
				return false;
			}
			try {//由于IE,我们必须检测构造函数属性的存在，没有自己的构造函数属性一定是对象
				if (obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch (e) {//IE8，9将在某些主机对象上抛出异常
				return false;
			}
			if (support.ownLast) {//支持<IE9,在自身属性之前处理继承属性的迭代。
				for (key in obj) {
					return hasOwn.call(obj, key);
				}
			}
			for (key in obj) { }//首先列举了自己的属性，以便加快速度，如果最后一个是自己的，那么所有的属性都是自己的。
			return key === undefined || hasOwn.call(obj, key);
		},
		type: function (obj) { // 确定JavaScript对象的类型, 关键之处在于class2type[core_toString.call(obj)], 可以使得typeof obj 为 "object" 类型的得到更进一步的精确判断
			if (obj == null) { //如果传入null
				return obj + "";
			}
			return typeof obj === "object" || typeof obj === "function" ?  // 利用事先存好的hash表class2type作精准判断
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},
		globalEval: function (data) { //一个eval的变种（eval()：函数可计算某个字符串，并执行其中的的 JavaScript 代码），globalEval()函数用于全局性地执行一段JavaScript代码，该方法跟eval方法相比有一个作用域的范围差异即始终处于全局作用域下面
			//在全局上下文中评估脚本,参见http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context.
			if (data && jQuery.trim(data)) {// 如果data不为空
				//在Internet Explorer上使用Excript脚本,	在Firefox中使用匿名函数使得上下文是窗口而不是jQuery
				(window.execScript || function (data) {//如果window.execScript存在，则直接 window.execScript(data)，window.execScript 方法会根据提供的脚本语言执行一段脚本代码，现在是在IE跟旧版本的Chrome是支持此方法的，新版浏览器没有 window.execScript 这个API
					window["eval"].call(window, data);//在chrome一些旧版本里eval.call(window, data)无效，所以这里不能直接：eval.call(window, data);
				})(data);
			}
		},
		camelCase: function (string) { //转换到驼峰拼写法。由CSS和数据模块使用。微软忘记驼峰他们的供应商前缀
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},
		nodeName: function (elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
		// args is for internal usage only
		each: function (obj, callback, args) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				}
				// A special, fast, case for the most common use of each
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					}
				}
			}
			return obj;
		},

		// Support: Android<4.1, IE<9
		trim: function (text) {
			return text == null ?
				"" :
				(text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function (arr, results) {
			var ret = results || [];
			if (arr != null) {
				if (isArraylike(Object(arr))) {
					jQuery.merge(ret,
						typeof arr === "string" ?
							[arr] : arr
					);
				} else {
					push.call(ret, arr);
				}
			}
			return ret;
		},

		inArray: function (elem, arr, i) {
			var len;
			if (arr) {
				if (indexOf) {
					return indexOf.call(arr, elem, i);
				}
				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
				for (; i < len; i++) {
					// Skip accessing in sparse arrays
					if (i in arr && arr[i] === elem) {
						return i;
					}
				}
			}
			return -1;
		},

		merge: function (first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;
			while (j < len) {
				first[i++] = second[j++];
			}
			// Support: IE<9
			// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
			if (len !== len) {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}
			first.length = i;
			return first;
		},
		grep: function (elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}
			return matches;
		},
		// arg is for internal usage only
		map: function (elems, callback, arg) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			// Go through the array, translating each of the items to their new values
			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
			}
			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function (fn, context) {
			var args, proxy, tmp;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: function () {
			return +(new Date());
		},

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArraylike(obj) {
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type(obj);
		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}
		if (obj.nodeType === 1 && length) {
			return true;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}
}));