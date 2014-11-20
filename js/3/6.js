setCss = function(_this, cssOption) { //设置元素样式
    //判断节点类型
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) {
        _this.style[cs] = cssOption[cs];
    }
    return _this;
}

function getTypeElement(es, type) { //获取指定类型的节点
    var esLen = es.length,
        i = 0,
        eArr = [],
        esI = null;
    for (; i < esLen; i++) {
        esI = es[i];
        if (esI.nodeName.replace("#", "").toLocaleLowerCase() == type) {
            eArr.push(esI);
        }
    }
    return eArr;
}

function horizontalShuffling(options) {
    var e = options.e;
    var child = getTypeElement(e.childNodes, "li"),
        childLen = child.length,
        w = 300,
        _w = childLen * w;
    this.setCss(e, { //初始化样式
        "width": _w
    });
    var move = function(type, callback) { //节点移动
        var v = 0,
            _left = parseInt((e.style.left || e.offsetLeft), 10);
        if (type == "l") { //向左移动
            v = w;
            if (_left <= -(_w - w)) {
                return;
            }
        } else { //向右移动
            v = -w;
            if (_left >= 0) {
                return;
            }
        }
        var __left = Math.ceil((_left - v) / 300) * 300; //防止产生不是300的整数，导致横向轮播不准确
        if (__left > 0) { //修正左偏向值
            __left = 0;
        }
        new animateManage({
            "context": e, //被操作的元素
            "effect": "linear",
            "time": 200, //持续时间
            "starCss": { //元素的起始值偏移量
                "left": _left
            },
            "css": { //元素的结束值偏移量
                "left": __left
            },
            "callback": function() {
                callback && callback();
            }
        }).init();
    }
    var direction = "l", //横向轮播 ，间时调用
        horizontalID = -1,
        closeHorizontal = function() {
            horizontalID != -1 && clearInterval(horizontalID);
        },
        openHorizontal = function() {
            horizontalID = setInterval(function() { //循环调用
                var _left = parseInt((e.style.left || e.offsetLeft), 10);
                if (_left == -(_w - w)) {
                    direction = "r";
                }
                if (_left == 0) {
                    direction = "l";
                }
                move(direction);
            }, 2000)
        };
    openHorizontal();
    options.left.onclick = function() { //左按钮单击执行左轮播
        move("l");
    }
    options.left.onmouseover = function() { //左按钮移入停止轮播
        closeHorizontal();
    }
    options.left.onmouseout = function() { //左按钮移出开始轮播
        openHorizontal();
    }
    options.right.onclick = function() { //右按钮单击执行左轮播
        move("r");
    }
    options.right.onmouseover = function() { //右按钮移入停止轮播
        closeHorizontal();
    }
    options.right.onmouseout = function() { //右按钮移出开始轮播
        openHorizontal();
    }
}
//图片轮播---一般轮播效果
horizontalShuffling({
    "e": document.getElementById("horizontalShuffling"),
    "left": document.getElementById("horizontalShufflingBtnLeft"),
    "right": document.getElementById("horizontalShufflingBtnRight")
});