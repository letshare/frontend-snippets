//删除时弹出确认对话框*******************************************
document.getElementById("deleteConfirmation").onclick = function() { //删除单击
    if (document.getElementById("deleteElement")) { //是否存在被删除的元素
        if (window.confirm(this.getAttribute("data-msg"))) { //弹出删除确认框
            document.body.removeChild(document.getElementById("deleteElement")); //删除执行
            alert("删除成功！");
        }
    } else {
        alert("元素已经删除过！");
    }
}