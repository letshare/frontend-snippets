//多少毫秒之后关闭
timeClosePageT = -1;

function timeClosePage(t) { //关闭页面，t表示时间
    timeClosePageT = t || -1;
    if (timeClosePageT != -1) {
        setTimeout(function() { //定时关闭
            window.open('', '_self', '');
            window.close();
        }, timeClosePageT)
    }
}
document.getElementById("timeClosePage").onclick = function() {
    timeClosePage(3000);
}