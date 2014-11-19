var _selectOptios = document.getElementById("selectOptios");
_selectOptios.onchange = function() {
    if (this.value === "") { //判断选项是否为空
        alert("您没有选中选项"); //为空，弹出提示
    } else {
        alert(this.value); //不为空弹出被选中的值
    }
}