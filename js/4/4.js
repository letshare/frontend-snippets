/*
 * 如果tr存在则是新增操作，否则为删除操作
 * 当为删除操作的时候，参数 --- table为表格的table对象，num为被删除的单元行序列数
 * 当为新增行操作的时候，参数 ---  table为表格的table对象，num是新增单元行的位置，tr为新增行的单元格的字符串型数组，
 * */
trAct = function(table, num, tr) {
    if (!tr) { //如果num不存在则执行删除操作
        var _num = table.rows[num];
        if (_num) { //如果被删除的行对象存在，则删除 ，返回true
            table.deleteRow(_num); //js的原生函数删除行
            return true;
        } else {
            return false; //如果删除的对象不存在，则删除失败，返回false
        }
    } else {
        var r = table.insertRow(num), //在指定的位置创建行对象
            i = 0,
            l = tr.length; //待插入的数据长度
        for (; i < l; i++) { //遍历待插入数据
            r.insertCell(i).innerHTML = tr[i]; //插入新单元格数据
        }
        return true; //新增成功返回 true
    }
}
/*动态插入和删除单元行*/
var _tableAct = document.getElementById("tableAct");
document.getElementById("deleteRow").onclick = function() { //删除第一行
    trAct(_tableAct, 0);
}
document.getElementById("addRow").onclick = function() { //新增一行
    trAct(_tableAct, 0, ["新增单元格1", "新增单元格2"]);
}