document.getElementById("windowFullScreen").onclick = function() {
    /*设置新打开的页面：
             toolbar不显示浏览器的工具栏、
             location不显示地址字段、
             menubar不显示菜单栏、
             directories不显示目录添加按钮、
             scrollbars窗体中内部超出窗口可视范围时不存在有滚动条 */
    var win = window.open("../child.html", "_blank", "resizable=yes;status=yes;toolbar=no;location=no;menubar=no;directories=no;scrollbars=no;");
    win.moveTo(0, 0); //设置新窗口的位置(0,0)
    win.resizeTo(screen.availWidth, screen.availHeight); //设置新打开窗口的宽、高
}