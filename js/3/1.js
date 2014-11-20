document.getElementById("focusPointSource").onclick = function() { //动画管理测试，点击元素会触发闪烁式动画
    new animateManage({
        "context": this, //被操作的元素
        "effect": "linear", //动画的效果，linear 线性运动
        "time": 500, //持续时间
        "starCss": { //元素的起始值偏移量
            "left": this.left
        },
        "css": { //元素的结束值偏移量
            "left": 200
        },
        "callback": function() { //结束之后的回调函数
            alert("动画结束的回调函数执行");
        }
    }).init();
}ß