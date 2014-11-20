function getTypeElement(es, type) { //获取指定类型的节点
    var esLen = es.length,
        i = 0,
        eArr = [],
        esI = null;
    for (; i < esLen; i++) {
        esI = es[i];
        if (esI.nodeName.replace("#", "").toLocaleLowerCase() == type) {
            eArr.push(esI);
        }
    }
    return eArr;
}

function tabSwitch(e) {
    var divs = getTypeElement(e.childNodes, "div"),
        l = divs.length,
        i = 0;
    for (; i < l; i++) {
        divs[i].onclick = function() { //单击切换按钮
            for (var ii = 0; ii < l; ii++) { //改为未被选中状态
                divs[ii].className = ""; //删除选项卡的边框
                //隐藏内容
                document.getElementById("tabSwitch" + (ii + 1)).style.display = "none";
            }
            this.className = "on"; //设置当前元素的选中样式
            //获取指定内容的对象，并显示
            document.getElementById(this.getAttribute("data-targent")).style.display = "block";
        }
    }
}
tabSwitch(document.getElementById("tabSwitch")); //Tab选项卡切换