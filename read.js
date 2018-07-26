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
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, //确保去除BOM(字节顺序标记)和 &nbsp,支持Android<4.1, IE<9。\uFEFF是utf8的字节序标记，\xA0是全角空格，详见字节顺序标记 https://zh.wikipedia.org/wiki/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F
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

	jQuery.extend({ //一些工具函数，jQuery.extend(object) 为扩展jQuery类本身，为类添加新的方法, jQuery.fn.extend(object)给jQuery对象添加方法
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
		camelCase: function (string) { //转换到驼峰拼写法，例如将font-size变为fontSize。由CSS和数据模块使用，例如element.currentStyle.getAttribute(camelCase(style)) 传入的参数必须是驼峰表示法。微软忘记驼峰他们的供应商前缀,在很多需要兼容IE的地方用得上
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},
		nodeName: function (elem, name) {// 获取DOM节点的节点名字或者判断其名字跟传入参数是否匹配
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();// IE下，DOM节点的nodeName是大写的，例如DIV，所以统一转成小写再判断，这里不直接return elem.nodeName.toLowerCase()，原因可能是为了保持浏览器自身的对外的规则，避免所有引用nodeName都要做转换的动作
		},
		each: function (obj, callback, args) {//仅供内部使用的数组。遍历一个数组或者对象，obj是需要遍历的数组或者对象，callback 是处理数组/对象的每个元素的回调函数，它的返回值实际会中断循环的过程， args是额外的参数数组
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);//判断是不是数组
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
			} else {//一个特殊、快速、最常用的例子
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
		trim: function (text) {//支持安卓4.1以下，IE9以下。去除字符串两端空格
			return text == null ?
				"" :
				(text + "").replace(rtrim, "");
		},
		makeArray: function (arr, results) {//结果仅供内部使用。此方法为内部方法。将类数组对象转换为数组对象
			var ret = results || [];
			if (arr != null) {
				if (isArraylike(Object(arr))) {//如果arr是一个类数组对象，调用merge合到返回值
					jQuery.merge(ret,
						typeof arr === "string" ?
							[arr] : arr
					);
				} else {
					push.call(ret, arr);//如果不是数组，则将其放到返回数组末尾,这里等同于ret.push(arr);
				}
			}
			return ret;
		},

		inArray: function (elem, arr, i) {//在数组中查找指定值并返回它的索引（如果没有找到，则返回-1），elem规定需检索的值，arr表示数组，i为可选的整数参数，规定在数组中开始检索的位置，它的合法取值是 0 到 arr.length - 1，如省略该参数，则将从数组首元素开始检索。
			var len;
			if (arr) {
				if (indexOf) {//如果支持原生的indexOf方法，直接调用
					return indexOf.call(arr, elem, i);
				}
				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
				for (; i < len; i++) {
					if (i in arr && arr[i] === elem) {//jQuery这里的(i in arr)判断是为了跳过稀疏数组中的元素
						return i;
					}
				}
			}
			return -1;
		},
		merge: function (first, second) {//merge的两个参数必须为数组，作用就是修改第一个数组，使得它末尾加上第二个数组
			var len = +second.length,
				j = 0,
				i = first.length;
			while (j < len) {
				first[i++] = second[j++];
			}
			if (len !== len) { //兼容IE<9, 在其他类数组对象(例如NodeLists)中取 .length 取到的是NaN
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}
			first.length = i;
			return first;
		},
		grep: function (elems, callback, invert) {//查找满足过滤函数的数组元素,原始数组不受影响， elems是传入的数组，callback是过滤器，inv为true则返回那些被过滤掉的值
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			for (; i < length; i++) { //通过数组，只保存通过验证函数的项
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}
			return matches;
		},
		map: function (elems, callback, arg) {//数组仅供内部使用。把数组每一项经过callback处理后的值依次加入到返回数组中
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			if (isArray) {//遍历数组，将每个项转换为新值
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
			} else {//遍历对象中的每一个键
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
			}
			return concat.apply([], ret);//将结果集扁平化
		},
		guid: 1,//对象的全局GUID计数器
		proxy: function (fn, context) {//将函数绑定到上下文，随意的部分应用任何参数。接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境, fn--将要改变上下文语境的函数, context--函数的上下文语境(this)会被设置成这个object对象
			var args, proxy, tmp;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}
			if (!jQuery.isFunction(fn)) {//快速检查以确定目标是否可调用，在规范中，这会抛出一个TypeError，但是我们将返回undefined。
				return undefined;
			}
			args = slice.call(arguments, 2);//模拟绑定，将参数转化为数组
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;//将唯一处理程序的GUID设置为原始处理程序的相同，以便可以移除
			return proxy;
		},
		now: function () {
			return +(new Date()); //返回当前时间
		},
		support: support //jQuery.support在Core中不使用，但其他项目将它们的属性附加到它，因此它需要存在。
	});
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {//填充class2type的映射。typeof并不能区分出它是Array、RegExp等object类型，jQuery为了扩展typeof的表达力，因此有了$.type方法。针对一些特殊的对象（例如 null，Array，RegExp）也进行精准的类型判断。运用了钩子机制，判断类型前，将常见类型打表，先存于一个Hash表class2type里边。
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	function isArraylike(obj) {//返回对象是否是类数组对象。支持iOS8.2（模拟器不可复现），内部检查防止JIT（即时编译器）错误，因为会漏报所以hasOwn不在这里使用，关于IE中的Nodelist长度
		var length = "length" in obj && obj.length,//如果obj里面有length键，则length等于obj.lenght;否则等于false
			type = jQuery.type(obj);//检测obj的类型
		if (type === "function" || jQuery.isWindow(obj)) {//如果obj是function类型 或者是window对象 则返回false;
			return false;
		}
		if (obj.nodeType === 1 && length) {//如果是dom元素，则为if(length)；若length为true；则返回true
			return true;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;  //如果obj的类型是"array";或者length为0; 或者length的属性是number为true 且 length大于0 且 length-1在obj里面存在
	}
	var Sizzle = (function( window ) {//Sizzle CSS选择器引擎http://sizzlejs.com/	
		var i,
			support, //用于检测浏览器对一些原生方法是否支持（ document.getElementsByClassName 这些）
			Expr,
			getText, //记录跟选择器相关的属性以及操作
			isXML, //是否是XML
			tokenize, 
			compile, //编译函数机制
			select,
			outermostContext, //最大的上下文环境
			sortInput,
			hasDuplicate,// 是否重复
			setDocument, //本地document定义
			document, //本地document定义
			docElem,//本地document定义
			documentIsHTML,//本地document定义
			rbuggyQSA,//本地document定义
			rbuggyMatches,//本地document定义
			matches,//本地document定义
			contains,//本地document定义
			expando = "sizzle" + 1 * new Date(),//实例特定数据---用来对特殊的函数进行标记
			preferredDoc = window.document,//实例特定数据---保存复用的 document 变量，提高效率
			dirruns = 0,//实例特定数据
			done = 0,//实例特定数据
			classCache = createCache(),//实例特定数据---缓存函数，通过classCache(key, value)的形式进行存储，通过classCache[key+ ' ']来进行获取
			tokenCache = createCache(),//实例特定数据---缓存函数，通过classCache(key, value)的形式进行存储，通过classCache[key+ ' ']来进行获取
			compilerCache = createCache(),//实例特定数据---缓存函数，通过classCache(key, value)的形式进行存储，通过classCache[key+ ' ']来进行获取
			sortOrder = function( a, b ) {//实例特定数据---刚检查完的两个元素是否重复
				if ( a === b ) {
					hasDuplicate = true;
				}
				return 0;
			},
			MAX_NEGATIVE = 1 << 31, //通用常数---最大负数为1左移31位等于-2147483648
			hasOwn = ({}).hasOwnProperty, //实例方法---hasOwn
			arr = [], //实例方法---arr
			pop = arr.pop, //实例方法---pop
			push_native = arr.push, //实例方法---push
			push = arr.push, //实例方法---push
			slice = arr.slice, //实例方法---slice
			indexOf = function( list, elem ) {//使用简化索引indexOf，因为它比原生更快。 http://jsperf.com/thor-indexof-vs-for/5
				var i = 0,
					len = list.length;
				for ( ; i < len; i++ ) {
					if ( list[i] === elem ) {
						return i;
					}
				}
				return -1;
			},		
			booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",//用来在做属性选择的时候进行判断		
			// Regular expressions 正则表达式		 
			whitespace = "[\\x20\\t\\r\\n\\f]", //正则---空白字符 http://www.w3.org/TR/css3-selectors/#whitespace 。 \t 制表符；\r 回车；\n 换行；\f 换页；\xnn由十六进制数nn指定的拉丁字符-->\uxxxx由十六进制数xxxx指定的Unicode字符,\x20化为二进制数为0010 0000 ,对照表格http://ascii.911cha.com/，表示空格；
			characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", //正则---字符编码 http://www.w3.org/TR/css3-syntax/#characters。 一段正则规则（这里并非完整的正则表达式，只是一段）匹配符合 css 命名的字符串，\\\\. 转换到正则表达式中就是 \\.+ 用来兼容带斜杠的 css，三种匹配字符的方式：\\.+ ，[\w-]+ , 大于\xa0的字符+
			identifier = characterEncoding.replace( "w", "w#" ), //正则，相当于identifier = "(?:\\.|[\w#-]|[^\x00-\xa0])+"，不精确地模拟CSS标识符字符，未引用的值应该是CSS标识符http://www.w3.org/TR/css3-selectors/#attribute-selectors，正确的语法http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		
			// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors 属性选择器
			attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
				// Operator (capture 2) 操作符
				"*([*^$|!~]?=)" + whitespace +
				// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"  属性值必须是CSS标识符或字符串
				"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
				"*\\]",
		
			pseudos = ":(" + characterEncoding + ")(?:\\((" +
				// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments: 为了减少预过滤器中需要标记的选择器的数量，请选择参数：
				// 1. quoted (capture 3; capture 4 or capture 5) 引用
				"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
				// 2. simple (capture 6) 简单（捕获6）
				"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
				// 3. anything else (capture 2) 其他
				".*" +
				")\\)|)",
		
			// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter 引导和非逃逸尾随空白，在后者之前捕获一些非空白字符
			rwhitespace = new RegExp( whitespace + "+", "g" ),
			rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
		
			rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
			rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
		
			rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
		
			rpseudo = new RegExp( pseudos ),
			ridentifier = new RegExp( "^" + identifier + "$" ),
		
			matchExpr = {
				"ID": new RegExp( "^#(" + characterEncoding + ")" ),
				"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
				"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
				"ATTR": new RegExp( "^" + attributes ),
				"PSEUDO": new RegExp( "^" + pseudos ),
				"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
					"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
					"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
				"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
				// For use in libraries implementing .is()
				// We use this for POS matching in `select`
				"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
					whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
			},
		
			rinputs = /^(?:input|select|textarea|button)$/i,
			rheader = /^h\d$/i,
		
			rnative = /^[^{]+\{\s*\[native \w/,
		
			// Easily-parseable/retrievable ID or TAG or CLASS selectors
			rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		
			rsibling = /[+~]/,
			rescape = /'|\\/g,
		
			// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
			runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
			funescape = function( _, escaped, escapedWhitespace ) {
				var high = "0x" + escaped - 0x10000;
				// NaN means non-codepoint
				// Support: Firefox<24
				// Workaround erroneous numeric interpretation of +"0x"
				return high !== high || escapedWhitespace ?
					escaped :
					high < 0 ?
						// BMP codepoint
						String.fromCharCode( high + 0x10000 ) :
						// Supplemental Plane codepoint (surrogate pair)
						String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
			},
		
			// Used for iframes
			// See setDocument()
			// Removing the function wrapper causes a "Permission Denied"
			// error in IE
			unloadHandler = function() {
				setDocument();
			};
		
		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(
				(arr = slice.call( preferredDoc.childNodes )),
				preferredDoc.childNodes
			);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[ preferredDoc.childNodes.length ].nodeType;
		} catch ( e ) {
			push = { apply: arr.length ?
		
				// Leverage slice if possible
				function( target, els ) {
					push_native.apply( target, slice.call(els) );
				} :
		
				// Support: IE<9
				// Otherwise append directly
				function( target, els ) {
					var j = target.length,
						i = 0;
					// Can't trust NodeList.length
					while ( (target[j++] = els[i++]) ) {}
					target.length = j - 1;
				}
			};
		}
		
		function Sizzle( selector, context, results, seed ) {
			var match, elem, m, nodeType,
				// QSA vars
				i, groups, old, nid, newContext, newSelector;
		
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
		
			context = context || document;
			results = results || [];
			nodeType = context.nodeType;
		
			if ( typeof selector !== "string" || !selector ||
				nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
		
				return results;
			}
		
			if ( !seed && documentIsHTML ) {
		
				// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
					// Speed-up: Sizzle("#ID")
					if ( (m = match[1]) ) {
						if ( nodeType === 9 ) {
							elem = context.getElementById( m );
							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document (jQuery #6963)
							if ( elem && elem.parentNode ) {
								// Handle the case where IE, Opera, and Webkit return items
								// by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
						} else {
							// Context is not a document
							if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
								contains( context, elem ) && elem.id === m ) {
								results.push( elem );
								return results;
							}
						}
		
					// Speed-up: Sizzle("TAG")
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
		
					// Speed-up: Sizzle(".CLASS")
					} else if ( (m = match[3]) && support.getElementsByClassName ) {
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
		
				// QSA path
				if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
					nid = old = expando;
					newContext = context;
					newSelector = nodeType !== 1 && selector;
		
					// qSA works strangely on Element-rooted queries
					// We can work around this by specifying an extra ID on the root
					// and working up from there (Thanks to Andrew Dupont for the technique)
					// IE 8 doesn't work on object elements
					if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
						groups = tokenize( selector );
		
						if ( (old = context.getAttribute("id")) ) {
							nid = old.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", nid );
						}
						nid = "[id='" + nid + "'] ";
		
						i = groups.length;
						while ( i-- ) {
							groups[i] = nid + toSelector( groups[i] );
						}
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
						newSelector = groups.join(",");
					}
		
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch(qsaError) {
						} finally {
							if ( !old ) {
								context.removeAttribute("id");
							}
						}
					}
				}
			}
		
			// All others
			return select( selector.replace( rtrim, "$1" ), context, results, seed );
		}
		
		/**
		 * Create key-value caches of limited size
		 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
		 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
		*	deleting the oldest entry
		*/
		function createCache() {
			var keys = [];
		
			function cache( key, value ) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if ( keys.push( key + " " ) > Expr.cacheLength ) {
					// Only keep the most recent entries
					delete cache[ keys.shift() ];
				}
				return (cache[ key + " " ] = value);
			}
			return cache;
		}
		
		/**
		 * Mark a function for special use by Sizzle
		 * @param {Function} fn The function to mark
		 */
		function markFunction( fn ) {
			fn[ expando ] = true;
			return fn;
		}
		
		/**
		 * Support testing using an element
		 * @param {Function} fn Passed the created div and expects a boolean result
		 */
		function assert( fn ) {
			var div = document.createElement("div");
		
			try {
				return !!fn( div );
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if ( div.parentNode ) {
					div.parentNode.removeChild( div );
				}
				// release memory in IE
				div = null;
			}
		}
		
		/**
		 * Adds the same handler for all of the specified attrs
		 * @param {String} attrs Pipe-separated list of attributes
		 * @param {Function} handler The method that will be applied
		 */
		function addHandle( attrs, handler ) {
			var arr = attrs.split("|"),
				i = attrs.length;
		
			while ( i-- ) {
				Expr.attrHandle[ arr[i] ] = handler;
			}
		}
		
		/**
		 * Checks document order of two siblings
		 * @param {Element} a
		 * @param {Element} b
		 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
		 */
		function siblingCheck( a, b ) {
			var cur = b && a,
				diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
					( ~b.sourceIndex || MAX_NEGATIVE ) -
					( ~a.sourceIndex || MAX_NEGATIVE );
		
			// Use IE sourceIndex if available on both nodes
			if ( diff ) {
				return diff;
			}
		
			// Check if b follows a
			if ( cur ) {
				while ( (cur = cur.nextSibling) ) {
					if ( cur === b ) {
						return -1;
					}
				}
			}
		
			return a ? 1 : -1;
		}
		
		/**
		 * Returns a function to use in pseudos for input types
		 * @param {String} type
		 */
		function createInputPseudo( type ) {
			return function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}
		
		/**
		 * Returns a function to use in pseudos for buttons
		 * @param {String} type
		 */
		function createButtonPseudo( type ) {
			return function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}
		
		/**
		 * Returns a function to use in pseudos for positionals
		 * @param {Function} fn
		 */
		function createPositionalPseudo( fn ) {
			return markFunction(function( argument ) {
				argument = +argument;
				return markFunction(function( seed, matches ) {
					var j,
						matchIndexes = fn( [], seed.length, argument ),
						i = matchIndexes.length;
		
					// Match elements found at the specified indexes
					while ( i-- ) {
						if ( seed[ (j = matchIndexes[i]) ] ) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}
		
		/**
		 * Checks a node for validity as a Sizzle context
		 * @param {Element|Object=} context
		 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
		 */
		function testContext( context ) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}
		
		// Expose support vars for convenience
		support = Sizzle.support = {};
		
		/**
		 * Detects XML nodes
		 * @param {Element|Object} elem An element or a document
		 * @returns {Boolean} True iff elem is a non-HTML XML node
		 */
		isXML = Sizzle.isXML = function( elem ) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};
		
		/**
		 * Sets document-related variables once based on the current document
		 * @param {Element|Object} [doc] An element or document object to use to set the document
		 * @returns {Object} Returns the current document
		 */
		setDocument = Sizzle.setDocument = function( node ) {
			var hasCompare, parent,
				doc = node ? node.ownerDocument || node : preferredDoc;
		
			// If no document and documentElement is available, return
			if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
				return document;
			}
		
			// Set our document
			document = doc;
			docElem = doc.documentElement;
			parent = doc.defaultView;
		
			// Support: IE>8
			// If iframe document is assigned to "document" variable and if iframe has been reloaded,
			// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
			// IE6-8 do not support the defaultView property so parent will be undefined
			if ( parent && parent !== parent.top ) {
				// IE11 does not have attachEvent, so all must suffer
				if ( parent.addEventListener ) {
					parent.addEventListener( "unload", unloadHandler, false );
				} else if ( parent.attachEvent ) {
					parent.attachEvent( "onunload", unloadHandler );
				}
			}
		
			/* Support tests
			---------------------------------------------------------------------- */
			documentIsHTML = !isXML( doc );
		
			/* Attributes
			---------------------------------------------------------------------- */
		
			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function( div ) {
				div.className = "i";
				return !div.getAttribute("className");
			});
		
			/* getElement(s)By*
			---------------------------------------------------------------------- */
		
			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function( div ) {
				div.appendChild( doc.createComment("") );
				return !div.getElementsByTagName("*").length;
			});
		
			// Support: IE<9
			support.getElementsByClassName = rnative.test( doc.getElementsByClassName );
		
			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function( div ) {
				docElem.appendChild( div ).id = expando;
				return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
			});
		
			// ID find and filter
			if ( support.getById ) {
				Expr.find["ID"] = function( id, context ) {
					if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
						var m = context.getElementById( id );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						return m && m.parentNode ? [ m ] : [];
					}
				};
				Expr.filter["ID"] = function( id ) {
					var attrId = id.replace( runescape, funescape );
					return function( elem ) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];
		
				Expr.filter["ID"] =  function( id ) {
					var attrId = id.replace( runescape, funescape );
					return function( elem ) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}
		
			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ?
				function( tag, context ) {
					if ( typeof context.getElementsByTagName !== "undefined" ) {
						return context.getElementsByTagName( tag );
		
					// DocumentFragment nodes don't have gEBTN
					} else if ( support.qsa ) {
						return context.querySelectorAll( tag );
					}
				} :
		
				function( tag, context ) {
					var elem,
						tmp = [],
						i = 0,
						// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
						results = context.getElementsByTagName( tag );
		
					// Filter out possible comments
					if ( tag === "*" ) {
						while ( (elem = results[i++]) ) {
							if ( elem.nodeType === 1 ) {
								tmp.push( elem );
							}
						}
		
						return tmp;
					}
					return results;
				};
		
			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
				if ( documentIsHTML ) {
					return context.getElementsByClassName( className );
				}
			};
		
			/* QSA/matchesSelector
			---------------------------------------------------------------------- */
		
			// QSA and matchesSelector support
		
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];
		
			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];
		
			if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function( div ) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
						"<select id='" + expando + "-\f]' msallowcapture=''>" +
						"<option selected=''></option></select>";
		
					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if ( div.querySelectorAll("[msallowcapture^='']").length ) {
						rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
					}
		
					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if ( !div.querySelectorAll("[selected]").length ) {
						rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
					}
		
					// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
					if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
						rbuggyQSA.push("~=");
					}
		
					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if ( !div.querySelectorAll(":checked").length ) {
						rbuggyQSA.push(":checked");
					}
		
					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibing-combinator selector` fails
					if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});
		
				assert(function( div ) {
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = doc.createElement("input");
					input.setAttribute( "type", "hidden" );
					div.appendChild( input ).setAttribute( "name", "D" );
		
					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if ( div.querySelectorAll("[name=d]").length ) {
						rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
					}
		
					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if ( !div.querySelectorAll(":enabled").length ) {
						rbuggyQSA.push( ":enabled", ":disabled" );
					}
		
					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}
		
			if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
				docElem.webkitMatchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector) )) ) {
		
				assert(function( div ) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call( div, "div" );
		
					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call( div, "[s!='']:x" );
					rbuggyMatches.push( "!=", pseudos );
				});
			}
		
			rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
			rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
		
			/* Contains
			---------------------------------------------------------------------- */
			hasCompare = rnative.test( docElem.compareDocumentPosition );
		
			// Element contains another
			// Purposefully does not implement inclusive descendent
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test( docElem.contains ) ?
				function( a, b ) {
					var adown = a.nodeType === 9 ? a.documentElement : a,
						bup = b && b.parentNode;
					return a === bup || !!( bup && bup.nodeType === 1 && (
						adown.contains ?
							adown.contains( bup ) :
							a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
					));
				} :
				function( a, b ) {
					if ( b ) {
						while ( (b = b.parentNode) ) {
							if ( b === a ) {
								return true;
							}
						}
					}
					return false;
				};
		
			/* Sorting
			---------------------------------------------------------------------- */
		
			// Document order sorting
			sortOrder = hasCompare ?
			function( a, b ) {
		
				// Flag for duplicate removal
				if ( a === b ) {
					hasDuplicate = true;
					return 0;
				}
		
				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if ( compare ) {
					return compare;
				}
		
				// Calculate position if both inputs belong to the same document
				compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
					a.compareDocumentPosition( b ) :
		
					// Otherwise we know they are disconnected
					1;
		
				// Disconnected nodes
				if ( compare & 1 ||
					(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
		
					// Choose the first element that is related to our preferred document
					if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
						return -1;
					}
					if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
						return 1;
					}
		
					// Maintain original order
					return sortInput ?
						( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
						0;
				}
		
				return compare & 4 ? -1 : 1;
			} :
			function( a, b ) {
				// Exit early if the nodes are identical
				if ( a === b ) {
					hasDuplicate = true;
					return 0;
				}
		
				var cur,
					i = 0,
					aup = a.parentNode,
					bup = b.parentNode,
					ap = [ a ],
					bp = [ b ];
		
				// Parentless nodes are either documents or disconnected
				if ( !aup || !bup ) {
					return a === doc ? -1 :
						b === doc ? 1 :
						aup ? -1 :
						bup ? 1 :
						sortInput ?
						( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
						0;
		
				// If the nodes are siblings, we can do a quick check
				} else if ( aup === bup ) {
					return siblingCheck( a, b );
				}
		
				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while ( (cur = cur.parentNode) ) {
					ap.unshift( cur );
				}
				cur = b;
				while ( (cur = cur.parentNode) ) {
					bp.unshift( cur );
				}
		
				// Walk down the tree looking for a discrepancy
				while ( ap[i] === bp[i] ) {
					i++;
				}
		
				return i ?
					// Do a sibling check if the nodes have a common ancestor
					siblingCheck( ap[i], bp[i] ) :
		
					// Otherwise nodes in our document sort first
					ap[i] === preferredDoc ? -1 :
					bp[i] === preferredDoc ? 1 :
					0;
			};
		
			return doc;
		};
		
		Sizzle.matches = function( expr, elements ) {
			return Sizzle( expr, null, null, elements );
		};
		
		Sizzle.matchesSelector = function( elem, expr ) {
			// Set document vars if needed
			if ( ( elem.ownerDocument || elem ) !== document ) {
				setDocument( elem );
			}
		
			// Make sure that attribute selectors are quoted
			expr = expr.replace( rattributeQuotes, "='$1']" );
		
			if ( support.matchesSelector && documentIsHTML &&
				( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
				( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
		
				try {
					var ret = matches.call( elem, expr );
		
					// IE 9's matchesSelector returns false on disconnected nodes
					if ( ret || support.disconnectedMatch ||
							// As well, disconnected nodes are said to be in a document
							// fragment in IE 9
							elem.document && elem.document.nodeType !== 11 ) {
						return ret;
					}
				} catch (e) {}
			}
		
			return Sizzle( expr, document, null, [ elem ] ).length > 0;
		};
		
		Sizzle.contains = function( context, elem ) {
			// Set document vars if needed
			if ( ( context.ownerDocument || context ) !== document ) {
				setDocument( context );
			}
			return contains( context, elem );
		};
		
		Sizzle.attr = function( elem, name ) {
			// Set document vars if needed
			if ( ( elem.ownerDocument || elem ) !== document ) {
				setDocument( elem );
			}
		
			var fn = Expr.attrHandle[ name.toLowerCase() ],
				// Don't get fooled by Object.prototype properties (jQuery #13807)
				val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
					fn( elem, name, !documentIsHTML ) :
					undefined;
		
			return val !== undefined ?
				val :
				support.attributes || !documentIsHTML ?
					elem.getAttribute( name ) :
					(val = elem.getAttributeNode(name)) && val.specified ?
						val.value :
						null;
		};
		
		Sizzle.error = function( msg ) {
			throw new Error( "Syntax error, unrecognized expression: " + msg );
		};
		
		/**
		 * Document sorting and removing duplicates
		 * @param {ArrayLike} results
		 */
		Sizzle.uniqueSort = function( results ) {
			var elem,
				duplicates = [],
				j = 0,
				i = 0;
		
			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice( 0 );
			results.sort( sortOrder );
		
			if ( hasDuplicate ) {
				while ( (elem = results[i++]) ) {
					if ( elem === results[ i ] ) {
						j = duplicates.push( i );
					}
				}
				while ( j-- ) {
					results.splice( duplicates[ j ], 1 );
				}
			}
		
			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;
		
			return results;
		};
		
		/**
		 * Utility function for retrieving the text value of an array of DOM nodes
		 * @param {Array|Element} elem
		 */
		getText = Sizzle.getText = function( elem ) {
			var node,
				ret = "",
				i = 0,
				nodeType = elem.nodeType;
		
			if ( !nodeType ) {
				// If no nodeType, this is expected to be an array
				while ( (node = elem[i++]) ) {
					// Do not traverse comment nodes
					ret += getText( node );
				}
			} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if ( typeof elem.textContent === "string" ) {
					return elem.textContent;
				} else {
					// Traverse its children
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
						ret += getText( elem );
					}
				}
			} else if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes
		
			return ret;
		};
		
		Expr = Sizzle.selectors = {
		
			// Can be adjusted by the user
			cacheLength: 50,
		
			createPseudo: markFunction,
		
			match: matchExpr,
		
			attrHandle: {},
		
			find: {},
		
			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},
		
			preFilter: {
				"ATTR": function( match ) {
					match[1] = match[1].replace( runescape, funescape );
		
					// Move the given value to match[3] whether quoted or unquoted
					match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
		
					if ( match[2] === "~=" ) {
						match[3] = " " + match[3] + " ";
					}
		
					return match.slice( 0, 4 );
				},
		
				"CHILD": function( match ) {
					/* matches from matchExpr["CHILD"]
						1 type (only|nth|...)
						2 what (child|of-type)
						3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
						4 xn-component of xn+y argument ([+-]?\d*n|)
						5 sign of xn-component
						6 x of xn-component
						7 sign of y-component
						8 y of y-component
					*/
					match[1] = match[1].toLowerCase();
		
					if ( match[1].slice( 0, 3 ) === "nth" ) {
						// nth-* requires argument
						if ( !match[3] ) {
							Sizzle.error( match[0] );
						}
		
						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
						match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
		
					// other types prohibit arguments
					} else if ( match[3] ) {
						Sizzle.error( match[0] );
					}
		
					return match;
				},
		
				"PSEUDO": function( match ) {
					var excess,
						unquoted = !match[6] && match[2];
		
					if ( matchExpr["CHILD"].test( match[0] ) ) {
						return null;
					}
		
					// Accept quoted arguments as-is
					if ( match[3] ) {
						match[2] = match[4] || match[5] || "";
		
					// Strip excess characters from unquoted arguments
					} else if ( unquoted && rpseudo.test( unquoted ) &&
						// Get excess from tokenize (recursively)
						(excess = tokenize( unquoted, true )) &&
						// advance to the next closing parenthesis
						(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
		
						// excess is a negative index
						match[0] = match[0].slice( 0, excess );
						match[2] = unquoted.slice( 0, excess );
					}
		
					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice( 0, 3 );
				}
			},
		
			filter: {
		
				"TAG": function( nodeNameSelector ) {
					var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
					return nodeNameSelector === "*" ?
						function() { return true; } :
						function( elem ) {
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
						};
				},
		
				"CLASS": function( className ) {
					var pattern = classCache[ className + " " ];
		
					return pattern ||
						(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
						classCache( className, function( elem ) {
							return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
						});
				},
		
				"ATTR": function( name, operator, check ) {
					return function( elem ) {
						var result = Sizzle.attr( elem, name );
		
						if ( result == null ) {
							return operator === "!=";
						}
						if ( !operator ) {
							return true;
						}
		
						result += "";
		
						return operator === "=" ? result === check :
							operator === "!=" ? result !== check :
							operator === "^=" ? check && result.indexOf( check ) === 0 :
							operator === "*=" ? check && result.indexOf( check ) > -1 :
							operator === "$=" ? check && result.slice( -check.length ) === check :
							operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
							operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
							false;
					};
				},
		
				"CHILD": function( type, what, argument, first, last ) {
					var simple = type.slice( 0, 3 ) !== "nth",
						forward = type.slice( -4 ) !== "last",
						ofType = what === "of-type";
		
					return first === 1 && last === 0 ?
		
						// Shortcut for :nth-*(n)
						function( elem ) {
							return !!elem.parentNode;
						} :
		
						function( elem, context, xml ) {
							var cache, outerCache, node, diff, nodeIndex, start,
								dir = simple !== forward ? "nextSibling" : "previousSibling",
								parent = elem.parentNode,
								name = ofType && elem.nodeName.toLowerCase(),
								useCache = !xml && !ofType;
		
							if ( parent ) {
		
								// :(first|last|only)-(child|of-type)
								if ( simple ) {
									while ( dir ) {
										node = elem;
										while ( (node = node[ dir ]) ) {
											if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
												return false;
											}
										}
										// Reverse direction for :only-* (if we haven't yet done so)
										start = dir = type === "only" && !start && "nextSibling";
									}
									return true;
								}
		
								start = [ forward ? parent.firstChild : parent.lastChild ];
		
								// non-xml :nth-child(...) stores cache data on `parent`
								if ( forward && useCache ) {
									// Seek `elem` from a previously-cached index
									outerCache = parent[ expando ] || (parent[ expando ] = {});
									cache = outerCache[ type ] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = cache[0] === dirruns && cache[2];
									node = nodeIndex && parent.childNodes[ nodeIndex ];
		
									while ( (node = ++nodeIndex && node && node[ dir ] ||
		
										// Fallback to seeking `elem` from the start
										(diff = nodeIndex = 0) || start.pop()) ) {
		
										// When found, cache indexes on `parent` and break
										if ( node.nodeType === 1 && ++diff && node === elem ) {
											outerCache[ type ] = [ dirruns, nodeIndex, diff ];
											break;
										}
									}
		
								// Use previously-cached element index if available
								} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
									diff = cache[1];
		
								// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
								} else {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
		
										if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
											// Cache the index of each encountered element
											if ( useCache ) {
												(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
											}
		
											if ( node === elem ) {
												break;
											}
										}
									}
								}
		
								// Incorporate the offset, then check against cycle size
								diff -= last;
								return diff === first || ( diff % first === 0 && diff / first >= 0 );
							}
						};
				},
		
				"PSEUDO": function( pseudo, argument ) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
						fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
							Sizzle.error( "unsupported pseudo: " + pseudo );
		
					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if ( fn[ expando ] ) {
						return fn( argument );
					}
		
					// But maintain support for old signatures
					if ( fn.length > 1 ) {
						args = [ pseudo, pseudo, "", argument ];
						return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
							markFunction(function( seed, matches ) {
								var idx,
									matched = fn( seed, argument ),
									i = matched.length;
								while ( i-- ) {
									idx = indexOf( seed, matched[i] );
									seed[ idx ] = !( matches[ idx ] = matched[i] );
								}
							}) :
							function( elem ) {
								return fn( elem, 0, args );
							};
					}
		
					return fn;
				}
			},
		
			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function( selector ) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
						results = [],
						matcher = compile( selector.replace( rtrim, "$1" ) );
		
					return matcher[ expando ] ?
						markFunction(function( seed, matches, context, xml ) {
							var elem,
								unmatched = matcher( seed, null, xml, [] ),
								i = seed.length;
		
							// Match elements unmatched by `matcher`
							while ( i-- ) {
								if ( (elem = unmatched[i]) ) {
									seed[i] = !(matches[i] = elem);
								}
							}
						}) :
						function( elem, context, xml ) {
							input[0] = elem;
							matcher( input, null, xml, results );
							// Don't keep the element (issue #299)
							input[0] = null;
							return !results.pop();
						};
				}),
		
				"has": markFunction(function( selector ) {
					return function( elem ) {
						return Sizzle( selector, elem ).length > 0;
					};
				}),
		
				"contains": markFunction(function( text ) {
					text = text.replace( runescape, funescape );
					return function( elem ) {
						return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
					};
				}),
		
				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction( function( lang ) {
					// lang value must be a valid identifier
					if ( !ridentifier.test(lang || "") ) {
						Sizzle.error( "unsupported lang: " + lang );
					}
					lang = lang.replace( runescape, funescape ).toLowerCase();
					return function( elem ) {
						var elemLang;
						do {
							if ( (elemLang = documentIsHTML ?
								elem.lang :
								elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
		
								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
							}
						} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
						return false;
					};
				}),
		
				// Miscellaneous
				"target": function( elem ) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice( 1 ) === elem.id;
				},
		
				"root": function( elem ) {
					return elem === docElem;
				},
		
				"focus": function( elem ) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},
		
				// Boolean properties
				"enabled": function( elem ) {
					return elem.disabled === false;
				},
		
				"disabled": function( elem ) {
					return elem.disabled === true;
				},
		
				"checked": function( elem ) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
				},
		
				"selected": function( elem ) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if ( elem.parentNode ) {
						elem.parentNode.selectedIndex;
					}
		
					return elem.selected === true;
				},
		
				// Contents
				"empty": function( elem ) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
						if ( elem.nodeType < 6 ) {
							return false;
						}
					}
					return true;
				},
		
				"parent": function( elem ) {
					return !Expr.pseudos["empty"]( elem );
				},
		
				// Element/input types
				"header": function( elem ) {
					return rheader.test( elem.nodeName );
				},
		
				"input": function( elem ) {
					return rinputs.test( elem.nodeName );
				},
		
				"button": function( elem ) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},
		
				"text": function( elem ) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" &&
						elem.type === "text" &&
		
						// Support: IE<8
						// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
						( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
				},
		
				// Position-in-collection
				"first": createPositionalPseudo(function() {
					return [ 0 ];
				}),
		
				"last": createPositionalPseudo(function( matchIndexes, length ) {
					return [ length - 1 ];
				}),
		
				"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
					return [ argument < 0 ? argument + length : argument ];
				}),
		
				"even": createPositionalPseudo(function( matchIndexes, length ) {
					var i = 0;
					for ( ; i < length; i += 2 ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				}),
		
				"odd": createPositionalPseudo(function( matchIndexes, length ) {
					var i = 1;
					for ( ; i < length; i += 2 ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				}),
		
				"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
					var i = argument < 0 ? argument + length : argument;
					for ( ; --i >= 0; ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				}),
		
				"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
					var i = argument < 0 ? argument + length : argument;
					for ( ; ++i < length; ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				})
			}
		};
		
		Expr.pseudos["nth"] = Expr.pseudos["eq"];
		
		// Add button/input type pseudos
		for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
			Expr.pseudos[ i ] = createInputPseudo( i );
		}
		for ( i in { submit: true, reset: true } ) {
			Expr.pseudos[ i ] = createButtonPseudo( i );
		}
		
		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();
		
		tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
			var matched, match, tokens, type,
				soFar, groups, preFilters,
				cached = tokenCache[ selector + " " ];
		
			if ( cached ) {
				return parseOnly ? 0 : cached.slice( 0 );
			}
		
			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;
		
			while ( soFar ) {
		
				// Comma and first run
				if ( !matched || (match = rcomma.exec( soFar )) ) {
					if ( match ) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice( match[0].length ) || soFar;
					}
					groups.push( (tokens = []) );
				}
		
				matched = false;
		
				// Combinators
				if ( (match = rcombinators.exec( soFar )) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace( rtrim, " " )
					});
					soFar = soFar.slice( matched.length );
				}
		
				// Filters
				for ( type in Expr.filter ) {
					if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
						(match = preFilters[ type ]( match ))) ) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice( matched.length );
					}
				}
		
				if ( !matched ) {
					break;
				}
			}
		
			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ?
				soFar.length :
				soFar ?
					Sizzle.error( selector ) :
					// Cache the tokens
					tokenCache( selector, groups ).slice( 0 );
		};
		
		function toSelector( tokens ) {
			var i = 0,
				len = tokens.length,
				selector = "";
			for ( ; i < len; i++ ) {
				selector += tokens[i].value;
			}
			return selector;
		}
		
		function addCombinator( matcher, combinator, base ) {
			var dir = combinator.dir,
				checkNonElements = base && dir === "parentNode",
				doneName = done++;
		
			return combinator.first ?
				// Check against closest ancestor/preceding element
				function( elem, context, xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							return matcher( elem, context, xml );
						}
					}
				} :
		
				// Check against all ancestor/preceding elements
				function( elem, context, xml ) {
					var oldCache, outerCache,
						newCache = [ dirruns, doneName ];
		
					// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
					if ( xml ) {
						while ( (elem = elem[ dir ]) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								if ( matcher( elem, context, xml ) ) {
									return true;
								}
							}
						}
					} else {
						while ( (elem = elem[ dir ]) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								outerCache = elem[ expando ] || (elem[ expando ] = {});
								if ( (oldCache = outerCache[ dir ]) &&
									oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
		
									// Assign to newCache so results back-propagate to previous elements
									return (newCache[ 2 ] = oldCache[ 2 ]);
								} else {
									// Reuse newcache so results back-propagate to previous elements
									outerCache[ dir ] = newCache;
		
									// A match means we're done; a fail means we have to keep checking
									if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
										return true;
									}
								}
							}
						}
					}
				};
		}
		
		function elementMatcher( matchers ) {
			return matchers.length > 1 ?
				function( elem, context, xml ) {
					var i = matchers.length;
					while ( i-- ) {
						if ( !matchers[i]( elem, context, xml ) ) {
							return false;
						}
					}
					return true;
				} :
				matchers[0];
		}
		
		function multipleContexts( selector, contexts, results ) {
			var i = 0,
				len = contexts.length;
			for ( ; i < len; i++ ) {
				Sizzle( selector, contexts[i], results );
			}
			return results;
		}
		
		function condense( unmatched, map, filter, context, xml ) {
			var elem,
				newUnmatched = [],
				i = 0,
				len = unmatched.length,
				mapped = map != null;
		
			for ( ; i < len; i++ ) {
				if ( (elem = unmatched[i]) ) {
					if ( !filter || filter( elem, context, xml ) ) {
						newUnmatched.push( elem );
						if ( mapped ) {
							map.push( i );
						}
					}
				}
			}
		
			return newUnmatched;
		}
		
		function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
			if ( postFilter && !postFilter[ expando ] ) {
				postFilter = setMatcher( postFilter );
			}
			if ( postFinder && !postFinder[ expando ] ) {
				postFinder = setMatcher( postFinder, postSelector );
			}
			return markFunction(function( seed, results, context, xml ) {
				var temp, i, elem,
					preMap = [],
					postMap = [],
					preexisting = results.length,
		
					// Get initial elements from seed or context
					elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
		
					// Prefilter to get matcher input, preserving a map for seed-results synchronization
					matcherIn = preFilter && ( seed || !selector ) ?
						condense( elems, preMap, preFilter, context, xml ) :
						elems,
		
					matcherOut = matcher ?
						// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
						postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
		
							// ...intermediate processing is necessary
							[] :
		
							// ...otherwise use results directly
							results :
						matcherIn;
		
				// Find primary matches
				if ( matcher ) {
					matcher( matcherIn, matcherOut, context, xml );
				}
		
				// Apply postFilter
				if ( postFilter ) {
					temp = condense( matcherOut, postMap );
					postFilter( temp, [], context, xml );
		
					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while ( i-- ) {
						if ( (elem = temp[i]) ) {
							matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
						}
					}
				}
		
				if ( seed ) {
					if ( postFinder || preFilter ) {
						if ( postFinder ) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while ( i-- ) {
								if ( (elem = matcherOut[i]) ) {
									// Restore matcherIn since elem is not yet a final match
									temp.push( (matcherIn[i] = elem) );
								}
							}
							postFinder( null, (matcherOut = []), temp, xml );
						}
		
						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) &&
								(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
		
								seed[temp] = !(results[temp] = elem);
							}
						}
					}
		
				// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(
						matcherOut === results ?
							matcherOut.splice( preexisting, matcherOut.length ) :
							matcherOut
					);
					if ( postFinder ) {
						postFinder( null, results, matcherOut, xml );
					} else {
						push.apply( results, matcherOut );
					}
				}
			});
		}
		
		function matcherFromTokens( tokens ) {
			var checkContext, matcher, j,
				len = tokens.length,
				leadingRelative = Expr.relative[ tokens[0].type ],
				implicitRelative = leadingRelative || Expr.relative[" "],
				i = leadingRelative ? 1 : 0,
		
				// The foundational matcher ensures that elements are reachable from top-level context(s)
				matchContext = addCombinator( function( elem ) {
					return elem === checkContext;
				}, implicitRelative, true ),
				matchAnyContext = addCombinator( function( elem ) {
					return indexOf( checkContext, elem ) > -1;
				}, implicitRelative, true ),
				matchers = [ function( elem, context, xml ) {
					var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
						(checkContext = context).nodeType ?
							matchContext( elem, context, xml ) :
							matchAnyContext( elem, context, xml ) );
					// Avoid hanging onto element (issue #299)
					checkContext = null;
					return ret;
				} ];
		
			for ( ; i < len; i++ ) {
				if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
					matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
				} else {
					matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
		
					// Return special upon seeing a positional matcher
					if ( matcher[ expando ] ) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for ( ; j < len; j++ ) {
							if ( Expr.relative[ tokens[j].type ] ) {
								break;
							}
						}
						return setMatcher(
							i > 1 && elementMatcher( matchers ),
							i > 1 && toSelector(
								// If the preceding token was a descendant combinator, insert an implicit any-element `*`
								tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
							).replace( rtrim, "$1" ),
							matcher,
							i < j && matcherFromTokens( tokens.slice( i, j ) ),
							j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
							j < len && toSelector( tokens )
						);
					}
					matchers.push( matcher );
				}
			}
		
			return elementMatcher( matchers );
		}
		
		function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
			var bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function( seed, context, xml, results, outermost ) {
					var elem, j, matcher,
						matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						setMatched = [],
						contextBackup = outermostContext,
						// We must always have either seed elements or outermost context
						elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
						// Use integer dirruns iff this is the outermost matcher
						dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
						len = elems.length;
		
					if ( outermost ) {
						outermostContext = context !== document && context;
					}
		
					// Add elements passing elementMatchers directly to results
					// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
					// Support: IE<9, Safari
					// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
					for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
						if ( byElement && elem ) {
							j = 0;
							while ( (matcher = elementMatchers[j++]) ) {
								if ( matcher( elem, context, xml ) ) {
									results.push( elem );
									break;
								}
							}
							if ( outermost ) {
								dirruns = dirrunsUnique;
							}
						}
		
						// Track unmatched elements for set filters
						if ( bySet ) {
							// They will have gone through all possible matchers
							if ( (elem = !matcher && elem) ) {
								matchedCount--;
							}
		
							// Lengthen the array for every element, matched or not
							if ( seed ) {
								unmatched.push( elem );
							}
						}
					}
		
					// Apply set filters to unmatched elements
					matchedCount += i;
					if ( bySet && i !== matchedCount ) {
						j = 0;
						while ( (matcher = setMatchers[j++]) ) {
							matcher( unmatched, setMatched, context, xml );
						}
		
						if ( seed ) {
							// Reintegrate element matches to eliminate the need for sorting
							if ( matchedCount > 0 ) {
								while ( i-- ) {
									if ( !(unmatched[i] || setMatched[i]) ) {
										setMatched[i] = pop.call( results );
									}
								}
							}
		
							// Discard index placeholder values to get only actual matches
							setMatched = condense( setMatched );
						}
		
						// Add matches to results
						push.apply( results, setMatched );
		
						// Seedless set matches succeeding multiple successful matchers stipulate sorting
						if ( outermost && !seed && setMatched.length > 0 &&
							( matchedCount + setMatchers.length ) > 1 ) {
		
							Sizzle.uniqueSort( results );
						}
					}
		
					// Override manipulation of globals by nested matchers
					if ( outermost ) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup;
					}
		
					return unmatched;
				};
		
			return bySet ?
				markFunction( superMatcher ) :
				superMatcher;
		}
		
		compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
			var i,
				setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[ selector + " " ];
		
			if ( !cached ) {
				// Generate a function of recursive functions that can be used to check each element
				if ( !match ) {
					match = tokenize( selector );
				}
				i = match.length;
				while ( i-- ) {
					cached = matcherFromTokens( match[i] );
					if ( cached[ expando ] ) {
						setMatchers.push( cached );
					} else {
						elementMatchers.push( cached );
					}
				}
		
				// Cache the compiled function
				cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
		
				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};
		
		/**
		 * A low-level selection function that works with Sizzle's compiled
		 *  selector functions
		 * @param {String|Function} selector A selector or a pre-compiled
		 *  selector function built with Sizzle.compile
		 * @param {Element} context
		 * @param {Array} [results]
		 * @param {Array} [seed] A set of elements to match against
		 */
		select = Sizzle.select = function( selector, context, results, seed ) {
			var i, tokens, token, type, find,
				compiled = typeof selector === "function" && selector,
				match = !seed && tokenize( (selector = compiled.selector || selector) );
		
			results = results || [];
		
			// Try to minimize operations if there is no seed and only one group
			if ( match.length === 1 ) {
		
				// Take a shortcut and set the context if the root selector is an ID
				tokens = match[0] = match[0].slice( 0 );
				if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						support.getById && context.nodeType === 9 && documentIsHTML &&
						Expr.relative[ tokens[1].type ] ) {
		
					context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
					if ( !context ) {
						return results;
		
					// Precompiled matchers will still verify ancestry, so step up a level
					} else if ( compiled ) {
						context = context.parentNode;
					}
		
					selector = selector.slice( tokens.shift().value.length );
				}
		
				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
				while ( i-- ) {
					token = tokens[i];
		
					// Abort if we hit a combinator
					if ( Expr.relative[ (type = token.type) ] ) {
						break;
					}
					if ( (find = Expr.find[ type ]) ) {
						// Search, expanding context for leading sibling combinators
						if ( (seed = find(
							token.matches[0].replace( runescape, funescape ),
							rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
						)) ) {
		
							// If seed is empty or no tokens remain, we can return early
							tokens.splice( i, 1 );
							selector = seed.length && toSelector( tokens );
							if ( !selector ) {
								push.apply( results, seed );
								return results;
							}
		
							break;
						}
					}
				}
			}
		
			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			( compiled || compile( selector, match ) )(
				seed,
				context,
				!documentIsHTML,
				results,
				rsibling.test( selector ) && testContext( context.parentNode ) || context
			);
			return results;
		};
		
		// One-time assignments
		
		// Sort stability
		support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
		
		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;
		
		// Initialize against the default document
		setDocument();
		
		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function( div1 ) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition( document.createElement("div") ) & 1;
		});
		
		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if ( !assert(function( div ) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#" ;
		}) ) {
			addHandle( "type|href|height|width", function( elem, name, isXML ) {
				if ( !isXML ) {
					return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
				}
			});
		}
		
		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if ( !support.attributes || !assert(function( div ) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute( "value", "" );
			return div.firstChild.getAttribute( "value" ) === "";
		}) ) {
			addHandle( "value", function( elem, name, isXML ) {
				if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
					return elem.defaultValue;
				}
			});
		}
		
		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if ( !assert(function( div ) {
			return div.getAttribute("disabled") == null;
		}) ) {
			addHandle( booleans, function( elem, name, isXML ) {
				var val;
				if ( !isXML ) {
					return elem[ name ] === true ? name.toLowerCase() :
							(val = elem.getAttributeNode( name )) && val.specified ?
							val.value :
						null;
				}
			});
		}
		
		return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
}));