//获取指定类型的节点
function getTypeElement(es, type) {
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
var llis = [], //间歇滚动的li元素
    rollingE = null, //目标元素
    rollingID = -1, //滚动的线程ID
    rolling = "up"; //滚动的形式 up/down
function rollingSubtitles(e) { //初始化滚动层的数据
    rollingE = e;
    llis = getTypeElement(e.childNodes, "li"); //绑定滚动的元素
    e.onmouseover = function() { //当进入滚动层，停止滚动
        clearInterval(rollingID);
    }
    e.onmouseout = function() { //当离开滚动层，开启滚动
        if (rolling == "down") { //根据滚动的形式，选择up/down
            downSubtitles();
        } else {
            upSubtitles();
        }
    }
    return this;
}
//向上滚动，参数---manualOperation如果为true，则手动按钮操作
function upSubtitles(manualOperation) {
    clearInterval(rollingID);
    rolling = "up";
    var up = function() {
        new animateManage({
            "context": rollingE, //被操作的元素
            "effect": "linear",
            "time": 200, //持续时间
            "starCss": { //元素的起始值偏移量
                "marginTop": rollingE.style.marginTop || 0
            },
            "css": { //元素的结束值偏移量
                "marginTop": -103
            },
            "callback": function() {
                llis = getTypeElement(rollingE.childNodes, "li");
                rollingE.style.marginTop = "0px";
                var cloneE = null;
                for (var i = 0; i < 4; i++) {
                    cloneE = llis[i].cloneNode(true);
                    rollingE.removeChild(llis[i]);
                    rollingE.appendChild(cloneE);
                }
            }
        }).init();
    }
    if (manualOperation) {
        up();
    }
    rollingID = setInterval(function() {
        up();
    }, 3000)
}
//向下滚动，参数---manualOperation如果为true，则手动按钮操作
function downSubtitles(manualOperation) {
    clearInterval(rollingID);
    rolling = "down";
    var down = function() {
        llis = getTypeElement(rollingE.childNodes, "li");
        var len = llis.length - 1, //获取最大循环位置
            l = len - 4, //获取最小循环位置
            cloneE = null; //克隆的li对象
        for (var i = len; i > l; i--) { //在最大li逆向循环   ，补齐节点
            //动态获取每次变更的li
            llis = getTypeElement(rollingE.childNodes, "li");
            cloneE = llis[len].cloneNode(true); //克隆节点
            rollingE.removeChild(llis[len]); //删除原有的节点
            rollingE.insertBefore(cloneE, llis[0]); //在新的0点位置，插入节点
        }
        rollingE.style.marginTop = "-103px";
        new animateManage({
            "context": rollingE, //被操作的元素
            "effect": "linear",
            "time": 200, //持续时间
            "starCss": { //元素的起始值偏移量
                "marginTop": rollingE.style.marginTop || 0
            },
            "css": { //元素的结束值偏移量
                "marginTop": -2
            },
            "callback": function() {}
        }).init();
    }
    if (manualOperation) {
        down();
    }
    rollingID = setInterval(function() {
        down();
    }, 3000)
}
var _downSubtitles = document.getElementById("downSubtitles");
/*字幕上下间歇滚动*/
rollingSubtitles(document.getElementById("rollingSubtitles"))
downSubtitles();
document.getElementById("upSubtitles").onclick = function() { //向上滚动
    upSubtitles(true)
}
document.getElementById("upSubtitles").onmouseover = function() { //移入清空定时
    clearInterval(rollingID);
}
document.getElementById("upSubtitles").onmouseout = function() { //移出开启定时
    upSubtitles();
}
_downSubtitles.onclick = function() { //向下滚动
    downSubtitles(true)
}
_downSubtitles.onmouseover = function() { //移入清空定时
    clearInterval(rollingID);
}
_downSubtitles.onmouseout = function() { //移出开启定时
    downSubtitles();
}