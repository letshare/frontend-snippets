document.getElementById("popWinMaxTop").onclick = function() { //让弹出窗口总是在最上面
    //1,在支持模式对话框的浏览器中，用 showModalDialog 方法建立模式对话框 或 showModelessDialog方法建立无模式对话框（参数与模式对话框一样），即可实现窗口最上边，请参考
    //2 打开新窗口
    var self = window.open("../closeParent.html", "newWindow", "width=100,height=100");
    self.focus(); //新窗口，获取焦点即可在最前面
}