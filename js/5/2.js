var openwindow = function(w, h, href) {
    w = w || "";
    h = h || "";
    /*window.open(
             "可选，将要跳转的页面",
             "可选，新窗口的名称",
             "可选，设置新窗口的一些特征，默认为浏览器的标准特征，可选参数---channelmode、directories、fullscreen、height、width等"
             "可选，规定装载到窗口的URL，是替换浏览器当前历史条目还是新创建一个新条目，true为替换，false为创建新条目"
             ) */
    window.open(href, '', 'width=' + w + ',height=' + h); //打开指定尺寸的新页面
}
document.getElementById("openwindow").onclick = function() { //跳转页面的响应按钮
    openwindow(document.getElementById("windowWidth").value, document.getElementById("windowHeight").value, this.getAttribute("data-href"));
}