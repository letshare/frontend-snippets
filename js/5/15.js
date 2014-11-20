/*禁止查看源代码
          本节讨论禁止源代码是在JavaScript的基础上执行的，绝对的禁止不存在，因为可以采用很多其它的特殊手段获取源代码*/
banViewSource = function(e) {
    //以打开新窗口的形式禁止查看源代码，关闭浏览器的工具栏等，但是一些浏览器的调试工具无法屏蔽
    e.onclick = function() {
        window.open("../banViewSource.html", "", "menubar=no,location=no,scrollbars=yes,resizable=yes")
    }
}
banViewSource(document.getElementById("banViewSource"));