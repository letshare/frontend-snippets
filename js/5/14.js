//禁止滚动条 ====================
document.getElementById("banScrollBar").onclick = function() {
    /*css的方案，兼容性有问题
            //document.body.style.overflow = "hidden";*/
    document.onmousewheel = function(event) {
        event = event || window.event;
        //检测浏览器是否存在，取消浏览器默认事件的接口preventDefault
        if (event && event.preventDefault) {
            event.preventDefault(); //取消默认事件
            event.stopPropagation(); //阻止事件的传播
        } else {
            return false; //返回false阻止事件
        }
    }
}