var chineseStr = document.getElementById("chineseStr"),
    clearNonumber = function(tThis) { //过滤字符
        var _v = tThis.value;
        tThis.value = _v.replace(/[^\u4e00-\u9fa5]/g, ""); //正则替换
    }
chineseStr.onfocus = function() { //获取焦点事件
    clearNonumber(this);
}
chineseStr.onkeyup = function() { //键盘事件
    clearNonumber(this);
}
chineseStr.onblur = function() { //失去焦点事件
    clearNonumber(this);
}