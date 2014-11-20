//弹出窗口关闭时，刷新父窗口---请查看updateParentWindow.html相关代码======================
document.getElementById("openChildWin").onclick = function() {
    window.open("../updateParentWindow.html", 'openChildWin', 'width=500,height=500')
}