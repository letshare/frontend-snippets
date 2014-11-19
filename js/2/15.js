var cursorPos = document.getElementById("cursorPos"); //绑定两种事件，已达到最大兼容性
cursorPos.onclick = cursorPos.onkeyup = function() { //绑定处理事件的函数
    var _vLen = this.value.length;
    if (this.setSelectionRange) { //非IE
        this.setSelectionRange(_vLen, _vLen);
    } else { //IE中
        var a = this.createTextRange();
        a.moveStart('character', _vLen);
        a.collapse(true);
        a.select();
    }
}