(function (global, factory) {   //整个jquery是一个立即调用的匿名函数
    if (typeof module === "object" && typeof module.exports === "object") { //判断是否是CommonJS规范

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
    console.log(typeof null)
}));
console.log(window !== "undefined" )