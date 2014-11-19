var setCss = function(_this, cssOption) { //设置样式
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) {
        _this.style[cs] = cssOption[cs];
    }
    return _this;
},
    hintInput = document.getElementById("hintInput"),
    _span = document.createElement("span"),
    dataHint = hintInput.getAttribute("data-hint");
_span.innerText = dataHint;
setCss(_span, {
    "position": "absolute",
    "left": hintInput.offsetLeft + 2,
    "top": hintInput.offsetTop,
    "zIndex": 2
});
_span.className = "hintInput";
hintInput.value = "";
_span.setAttribute("id", "hint0");
hintInput.parentNode.insertBefore(_span, hintInput);
var onhint = function(e) { //隐藏元素
    setCss(_span, {
        "display": "none"
    })
    hintInput.focus();
}
hintInput.onblur = function(e) { //失去焦点显示元素
    if (!hintInput.value.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")) {
        setCss(_span, {
            "display": "block"
        })
    }
}
_span.onclick = hintInput.onfocus = onhint; //单击事件与获取焦点事件使用同一个函数处理