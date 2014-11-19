var _inOption = document.getElementById("inOption"),
    _inIpnut = document.getElementById("inInput"),
    addOptions = function(target, optons) { //添加option
        var _option = null,
            ol = optons.length,
            i = 0,
            _v = "",
            _t = "";
        for (; i < ol; i++) {
            _v = optons[i].value;
            _t = optons[i].text;
            _option = document.createElement("OPTION"); //创建空option
            _option.value = _v;
            _option.text = _t;
            target.options.add(_option);
        }
    };
_inIpnut.onkeyup = function() {
    var key = event.keyCode,
        _v = _inIpnut.value;
    if (key == 13) { //如果为回车键，则添加值
        addOptions(_inOption, [ //添加新option
            {
                "value": _v,
                "text": _v
            }
        ])
    }
}
_inOption.onchange = function() { //值变更事件
    _inIpnut.value = this.value;
}