var imgChangeStyle = document.getElementById("imgChangeStyle"),
    setCss = function(_this, cssOption) { //设置元素样式
        //判断节点类型
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) { //遍历设置所有样式
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    };
imgChangeStyle.onmouseover = function() { //鼠标移入事件
    setCss(this, {
        border: "2px solid red"
    })
}
imgChangeStyle.onmouseout = function() { //鼠标移出事件
    setCss(this, {
        border: "0px"
    })
}