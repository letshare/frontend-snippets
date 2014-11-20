var trE = document.getElementById("lightBar").rows,
    trLen = trE.length, //获取被遍历的节点长度
    i = 0;
for (; i < trLen; i++) { //遍历被提示的对象
    var trEi = trE[i];
    trEi.onmousemove = function(event) { //设置光棒效果的样式
        this.style.backgroundColor = "#a5e5aa"; //光棒样式 background-color:#a5e5aa;
    }
    trEi.onmouseout = function() { //还原初始的样式
        this.style.backgroundColor = "#fff";
    }
}