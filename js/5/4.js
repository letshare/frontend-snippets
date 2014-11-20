document.getElementById("opentChildWindowValue").onclick = function() {
    var returnV = window.showModalDialog("../child.html"); //子窗口的引用
    if (returnV) { //监听子窗口返回值
        alert("返回值为：" + returnV);
    }
}