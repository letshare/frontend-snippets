document.getElementById("showQQMsg").onclick = function() { //类似QQ消息窗口提示
    var setCss = function(_this, cssOption) { //设置元素样式
        //判断节点类型
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) {
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    },
        QQMsgE = null,
        QQMsgTop = function() { //设置QQ窗口的top
            if (QQMsgE && QQMsgE.style.display != "none") { //判断是否隐藏
                var bodyHeight = (document.body.scrollTop || document.documentElement.scrollTop) + window.screen.availHeight;
                this.setCss(QQMsgE, {
                    "top": (bodyHeight - 260) + "px",
                    "left": "100%",
                    "marginLeft": "-244px"
                });
            }
        },
        QQMsg = function(e, closeQQMsg) {
            QQMsgE = e;
            //top的值 = 滚轴的高度top+窗口的高度 ，目的是隐藏窗口
            var bodyHeight = (document.body.scrollTop || document.documentElement.scrollTop) + window.screen.availHeight;
            QQMsgE.style.display = "block";
            setCss(QQMsgE, {
                "top": bodyHeight + "px",
                "left": "100%",
                "marginLeft": "-244px"
            });
            new animateManage({
                "context": e, //被操作的元素
                "effect": "linear",
                "time": 200, //持续时间
                "starCss": { //元素的起始值偏移量
                    "top": bodyHeight
                },
                "css": { //元素的结束值偏移量
                    "top": bodyHeight - 260
                },
                "callback": function() {}
            }).init();
            closeQQMsg.onclick = function() {
                new animateManage({
                    "context": e, //被操作的元素
                    "effect": "linear",
                    "time": 200, //持续时间
                    "starCss": { //元素的起始值偏移量
                        "top": bodyHeight - 260
                    },
                    "css": { //元素的结束值偏移量
                        "top": bodyHeight
                    },
                    "callback": function() {
                        e.style.display = "none";
                    }
                }).init();
            }
        };
    QQMsg(document.getElementById("QQMsg"), document.getElementById("closeQQMsg"));
}