var rollContent = document.getElementById("rollContent"), //获取元素
    _div = rollContent.innerHTML,
    setCss = function(_this, cssOption) { //设置样式
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) {
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    };
rollContent.innerHTML = "<div id='rollContent_roll'>" + _div + "</div>";
setCss(rollContent, { //初始化样式
    "position": "relative",
    "overflow": "hidden",
    "wordWrap": "break-word",
    "wordBreak": "break-all",
    "width": rollContent.getAttribute("data-rwidth"),
    "height": rollContent.getAttribute("data-rhight")
});
var timeRoll = document.getElementById("rollContent_roll"),
    _h = timeRoll.offsetHeight;
timeoutRoll = function() { //修改top值
    var _h = timeRoll.offsetHeight,
        _t = parseInt(timeRoll.style.top, 10),
        _tt = _h > Math.abs(_t) || _t >= 0 ? _t - 10 : (_h || 0); //是否将top设置为0
    setCss(timeRoll, {
        "top": _tt + "px"
    });
    setTimeout(timeoutRoll, 200); //间时调用，模拟动画
};
if (_h > rollContent.getAttribute("data-rhight")) {
    timeoutRoll();
    setCss(timeRoll, {
        "position": "relative",
        "top": "0px"
    });
}