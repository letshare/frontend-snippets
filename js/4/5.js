/************************************
 * 表格内容的展开和折叠效果   start *
 ************************************/
tableOutIn = function(e, type) {
    if (type != "open") {
        e.style.display = "none" //隐藏指定的行元素
    } else {
        e.style.display = "table-row" //table-row设置此元素会作为一个表格行显示
    }
}
var _tableOutIn = document.getElementById("tableOutIn");
document.getElementById("openRow").onclick = function() { //展开一行 openRow
    tableOutIn(_tableOutIn.rows[0], "open")
}
document.getElementById("inRow").onclick = function() { //收缩一行 inRow
    tableOutIn(_tableOutIn.rows[0])
}