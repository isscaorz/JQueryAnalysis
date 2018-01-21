/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * 
 * 解析开始时间：
 * 2018-01-20
 *  
 * 
 * 符号预定义： 
 * //------------------------------------------------------------------------
 * 两行72个'-'号中间夹杂省略的代码（说明）
 * 
 * //???
 * 三个问号表示此处不明
 * 
 */

/*
* line:15~38,10352
* 总体构造
*/
(function (global, factory) {   //整个jquery是一个立即调用的匿名函数

    if (typeof module === "object" && typeof module.exports === "object") { //判断是否是CommonJS规范
        //jquery采用一个立即调用函数，判断是否是CommonJS规范（typeof module === "object" && typeof module.exports === "object"），不是则调用库函数，是则再判断
        //有没有document(走到这步是判断过没有window，开启没有window模式)，有则调用库函数，

        // 无则返回一个等待传入window的匿名函数。
        //module 和 module.exports主要是为了让jQuery能够以模块的形式注入到没有window.document变量的诸如Node.js的运行环境中，
        //当遇到这种情况，就不会在window中设置jQuery$变量。
        //要使用jQuery时，则是使用所返回的jQuery对象，
        //如在Node.js中： var jQuery = require("jquery")(window);
        module.exports = global.document ?  //判断是否有document（这里已经开启没有window模式）
            factory(global, true) :         //有document则调用库函数factory
            function (w) {                  //没有document则返回一个等待传入window的匿名函数
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else { //不是CommonJS规范则调用库函数factory
        factory(global);
    }

    // Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    //------------------------------------------------------------------------
    //一万多行代码，各种JQ功能函数
    //------------------------------------------------------------------------

    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case.
    //注册为一个命名的AMD模块，因为jQuery可以与其他的连接在一起
    //可能使用的文件define，但不能通过正确的连接脚本
    //了解匿名AMD模块。 一个名为AMD是最安全和最健壮的
    //注册方式 使用小写的jquery，因为AMD模块名称是
    //从文件名派生，jQuery通常以小写形式传递
    // 文件名。 在创建全局之后，如果AMD模块需要，请执行此操作
    //调用noConflict来隐藏这个版本的jQuery，它会工作。

    //请注意，为了最大的可移植性，不是jQuery的库应该
    //声明自己是匿名模块，并避免设置一个全局的
    // AMD加载器是存在的。 jQuery是一个特例。 



    //因为jQuery可以与其他可能使用define的文件连接起来，但是不能通过理解匿名AMD模块的适当连接脚本来注册。 一个名为AMD是最安全，最健壮的文件名。 在创建全局之后执行此操作，以便如果AMD模块要调用noConflict来隐藏此版本的jQuery，则它将起作用。
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }




    var
        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // Expose jQuery and $ identifiers, even in
    // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (typeof noGlobal === strundefined) {  //strundefined = typeof undefined
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;
}));
