//获得一个窗口的大小
getWinSize = function() {
    return {
        //如果ie7~8不支持采用 后边获取属性的方法
        width: window.innerWidth || document.documentElement.offsetWidth,
        height: window.innerHeight || document.documentElement.offsetHeight
    };
}
var winSize = getWinSize(); //获取大小
document.getElementById("getWinSize").innerHTML = "高：" + winSize.height + "宽：" + winSize.width;