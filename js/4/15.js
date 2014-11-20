function setCss(_this, cssOption) { //设置元素样式
    //判断节点类型
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) {
        _this.style[cs] = cssOption[cs];
    }
}

function setPopup(e, openPop, closePop) {
    setCss(e, { //初始化样式
        "position": "absolute",
        "zIndex": 100,
        "backgroundColor": "#EBEDF3"
    });
    openPop.onclick = function() {
        e.style.display = "block";
        setCss(e, { //修改弹出层的位置，将其定位于屏幕的可见区域中间位置
            "left": "50%",
            "marginLeft": -e.offsetWidth / 2 + "px",
            "top": ((document.body.scrollTop || document.documentElement.scrollTop) + window.screen.availHeight / 2 - e.offsetHeight) + "px"
        });
    }
    closePop.onclick = function() {
        e.style.display = "none";
    }
}
//弹出层*******************************************************
setPopup(document.getElementById("popupDiv"), document.getElementById("popupOpen"), document.getElementById("popupClose"));