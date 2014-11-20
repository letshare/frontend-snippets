document.getElementById("fullscreen").onclick = function() { //全屏交互按钮
    window.moveTo(0, 0); //定位坐标
    window.resizeTo(screen.availWidth, screen.availHeight); //修改大小
}