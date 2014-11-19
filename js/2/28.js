var contentCheckbox = document.getElementById("contentCheckbox"),
    _targets = document.getElementsByName(contentCheckbox.getAttribute("data-target")),
    targetsLen = _targets.length,
    i = 0;
contentCheckbox.onkeyup = function() {
    for (i = 0; i < targetsLen; i++) {
        var _t = _targets[i],
            _v = this.value;
        //如果内容与复选框的关键词匹配，选择当前的复选框
        //三元运算写法
        /*_v.search(_t.getAttribute("data-k")) != -1 ?
                 _t.checked = true :
                 _t.checked = false;*/
        //单链式条件写法
        _t.checked = _v.search(_t.getAttribute("data-k")) != -1 && true || false;
    }
}