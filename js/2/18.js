var strToJson = function(str) { //将字符转换为json对象
    return typeof JSON == "object" ? JSON.parse(str) : (new Function("return " + str))();
},
    setCss = function(_this, cssOption) { //设置样式
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) {
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    },
    autoUpdateCss = document.getElementById("autoUpdateCss"),
    fCss = autoUpdateCss.getAttribute("data-fCss"),
    fClass = autoUpdateCss.getAttribute("data-fClass"),
    bClass = autoUpdateCss.getAttribute("data-bClass"),
    bCss = autoUpdateCss.getAttribute("data-bCss");
autoUpdateCss.onfocus = function() {
    fCss && setCss(this, strToJson(fCss));
    fClass && (this.className = fClass);
}
autoUpdateCss.onblur = function() {
    bCss && setCss(this, strToJson(bCss));
    bClass && (this.className = bClass);
}