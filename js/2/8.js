var limitLength = document.getElementById("limitLength"), //获取限制对象
    clearNonumber = function(tThis) { //清除数字
        var _v = tThis.value,
            _vLen = _v.length,
            dataLength = tThis.getAttribute("data-length"), //获取长度属性
            dataModel = tThis.getAttribute("data-model"),
            subLen = dataLength;
        if (_vLen > dataLength) tThis.value = _v.substr(0, subLen); //判断长度
        if (remainingCharacters) {
            self.showRemainingCharacters(!_vLen ? dataLength : (_vLen > dataLength ? 0 : dataLength - _vLen), remainingCharacters);
        }
    };
limitLength.onfocus = function() { //获取焦点事件
    clearNonumber(this);
}
limitLength.onkeyup = function() { //键盘事件
    clearNonumber(this);
}
limitLength.onblur = function() { //失去焦点事件
    clearNonumber(this);
}