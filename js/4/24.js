//修改浏览器title
document.getElementById("titleNewline").onclick = function() {
    document.title = this.getAttribute("data-title"); //修改为目标title
}