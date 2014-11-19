var banNumber = document.getElementById("banNumber"),
    clearNonumber = function(tThis) { //过滤数字
        var _v = tThis.value;
        tThis.value = _v.replace(/\D/g, "");
    }
banNumber.onfocus = function() { //绑定获取焦点事件
    clearNonumber(this);
}
banNumber.onkeyup = function() { //绑定键盘事件
    clearNonumber(this);
}
banNumber.onblur = function() { //失去焦点事件
    clearNonumber(this);
}