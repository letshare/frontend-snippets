var _fontSize = document.getElementById("fontSize"), //获取元素对象
    fontSize = function(e, unit) { //设置元素字体大小
        e.style.fontSize = unit;
    };
document.getElementById("fontSizeBig").onclick = function() { //大字体设置
    fontSize(_fontSize, "16px");
}
document.getElementById("fontSizeMedium").onclick = function() { //中字体设置
    fontSize(_fontSize, "14px");
}
document.getElementById("fontSizeSmall").onclick = function() { //小字体设置
    fontSize(_fontSize, "12px");
}