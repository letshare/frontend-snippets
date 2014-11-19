var selectContents = "", //待填充的文本
    _selectContent = document.getElementsByName("getSelectContent"),
    i = 0,
    sl = _selectContent.length; //获取元素的长度即个数
for (; i < sl; i++) { //限制复选框最多选择3项
    _selectContent[i].onclick = function() {
        var _t = this.nextSibling.innerText;
        if (this.checked) { //如果内容被选中，则填充文本，否则删除
            selectContents += "<br />" + _t;
        } else {
            selectContents = selectContents.replace("<br />" + _t, "")
        }
        document.getElementById("selectedContents").innerHTML = "被选择的内容：" + selectContents; //填充html文本
    }
}