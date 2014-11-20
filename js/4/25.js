document.getElementById("linkConfirmation").onclick = function() { //点击链接
    if (window.confirm(this.getAttribute("data-msg"))) { //弹出确认框
        window.open(this.getAttribute("data-target")); //如果确认在跳转
    }
}