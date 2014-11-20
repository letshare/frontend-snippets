function promptMsgBox(options) {
    var e = options.promptMsgBox, //获取元素
        setCss = function(_this, cssOption) { //设置元素样式
            //判断节点类型
            if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
                return;
            }
            for (var cs in cssOption) {
                _this.style[cs] = cssOption[cs];
            }
            return _this;
        };
    setCss(e, { //初始化基本样式
        "position": "absolute",
        "zIndex": 100,
        "top": ((document.body.scrollTop || document.documentElement.scrollTop) + window.screen.availHeight / 2 - e.offsetHeight) + "px",
        "backgroundColor": "#EBEDF3"
    });
    options.promptMsgBoxOpen.onclick = function() { //打开确认按钮
        e.style.display = "block";
        setCss(e, { //设置位置
            "left": "50%",
            "marginLeft": -e.offsetWidth / 2 + "px",
            //计算目标元素的top值：（页面的整体高度） 减去 （文档可见的高一半度） 减去 （元素的一半高度）
            "top": ((document.body.scrollTop || document.documentElement.scrollTop) + window.screen.availHeight / 2 - e.offsetHeight) + "px"
        });
    }
    options.promptMsgBoxAgree.onclick = function() { //确认按钮
        e.style.display = "none"; //隐藏层
        if (options.agreeCallBack) options.agreeCallBack(); //如果存在确认的回调，则执行
    }
    options.promptMsgBoxCancel.onclick = function() { //取消按钮
        e.style.display = "none"; //隐藏层
        if (options.cancelCallBack) options.cancelCallBack(); //如果存在取消的回调，则执行
    }
}
promptMsgBox({ //层模拟的提示消息框
    "promptMsgBox": document.getElementById("promptMsgBox"), //响应的元素
    "promptMsgBoxOpen": document.getElementById("promptMsgBoxOpen"), //打开确认按钮
    "promptMsgBoxAgree": document.getElementById("promptMsgBoxAgree"), //确认按钮
    "agreeCallBack": function() { //确认之后的回调函数
        alert("确认的回调函数！")
    },
    "promptMsgBoxCancel": document.getElementById("promptMsgBoxCancel"), //取消按钮
    "cancelCallBack": function() { //取消之后的回调函数
        alert("取消的回调函数！")
    }
});