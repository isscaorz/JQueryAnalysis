//------------------------------------------------------------------------
//一万多行代码，各种JQ功能函数
//------------------------------------------------------------------------

/*!
 * 注册成一个名为AMD的模块，因为jQuery能被其他可能使用define的文件连接，但是不能通过一个能理解匿名AMD模块的适当脚本连接。
 * 命名为AMD是最安全和最稳健的注册方式。
 * 使用小写的jquery，因为AMD模块名称是从文件名派生的，jQuery通常以小写文件名交付。
 * 在创建全局之后执行此操作，以便如果AMD模块想要调用noConflict来隐藏此版本的jQuery，这个操作可以生效。
 * 请注意为了最大限度地提高可移植性，如果AMD加载程序存在，非jQuery的库应将自己声明为匿名模块，并避免设置全局 ，jQuery是一个特例。
 */
if(typeof define === "function" && define.amd) {
	define("jquery", [], function() {
		return jQuery;
	});
}

var _jQuery = window.jQuery,//在覆盖的情况下通过jQuery进行映射
	_$ = window.$;//在覆盖的情况下通过$进行映射

jQuery.noConflict = function(deep) {
	if(window.$ === jQuery) {
		window.$ = _$;
	}
	if(deep && window.jQuery === jQuery) {
		window.jQuery = _jQuery;
	}
	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if(typeof noGlobal === strundefined) { //strundefined = typeof undefined
	window.jQuery = window.$ = jQuery;
}