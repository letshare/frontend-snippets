//参数---context，被绑定操作的元素；out展开的元素；roundin收缩的元素
function textOutIn(options) {
    var e = options.e;
    options.out.onclick = function() { //展开事件
        if (e.style.height == "") return;
        new animateManage({
            "context": e, //被操作的元素
            "effect": "linear",
            "time": 100, //持续时间
            "starCss": { //元素的起始值偏移量
                "height": e.style.height || 35
            },
            "css": { //元素的结束值偏移量
                "height": 203
            }
        }).init();
    }
    options.roundin.onclick = function() { //收缩事件
        new animateManage({
            "context": e, //被操作的元素
            "effect": "linear",
            "time": 100, //持续时间
            "starCss": { //元素的起始值偏移量
                "height": e.style.height || 203
            },
            "css": { //元素的结束值偏移量
                "height": 35
            }
        }).init();
    }
}
textOutIn({ //初始化对象
    "e": document.getElementById("textOutIn"),
    "out": document.getElementById("textOut"),
    "roundin": document.getElementById("textRoundin")
});