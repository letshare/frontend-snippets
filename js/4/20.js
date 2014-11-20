function setCss(_this, cssOption) { //设置元素样式
    //判断节点类型
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) { //遍历设置样式
        _this.style[cs] = cssOption[cs];
    }
    return _this;
}
document.getElementById("showMaskLayer").onclick = function() { //获取响应元素
    var b = document.body.parentNode,
        maskLayer = document.getElementById("maskLayer");
    setCss(maskLayer, { //初始化遮罩的样式
        "position": "absolute", //绝对
        "left": "0px",
        "display": "block",
        "top": "0px",
        "zIndex": 1000, //Z层级
        "backgroundColor": "#ccc",
        "height": b.scrollHeight + "px",
        "width": b.offsetWidth + "px",
        /*为了兼容各种浏览器的透明层效果*/
        "filter": "alpha(Opacity=60)",
        "opacity": "0.6",
        "-moz-opacity": "0.6",
        "filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
        "-MS-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    })
}