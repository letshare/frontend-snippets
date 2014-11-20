var e = document.getElementById("slowlyEnlarge");
e.onclick = function() {
    if (e.offsetWidth + 50 >= 300) {
        return;
    }
    new animateManage({
        "context": e, //被操作的元素
        "effect": "linear",
        "time": 200, //持续时间
        "starCss": { //元素的起始值偏移量
            "width": e.offsetWidth
        },
        "css": { //元素的结束值偏移量
            "width": e.offsetWidth + 50
        }
    }).init();
}