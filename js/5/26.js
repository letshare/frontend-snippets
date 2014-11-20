// 检测某个网站的链接速度
var linkSpeedTime = 0,
    linkSpeedInterl = -1,
    linkSpeedE = null,
    linkSpeedURL = "",
    getLinkSpeed = function() { //计算、显示才而是结果
        linkSpeedE.value = (linkSpeedTime / 10) + "秒";
        window.clearInterval(linkSpeedInterl); //关闭线程
    },
    linkSpeed = function(e, t) {
        linkSpeedTime = 1;
        window.clearInterval(linkSpeedInterl); //关闭线程
        linkSpeedInterl = setInterval(function() { //开启线程
            linkSpeedTime++;
            console.log(linkSpeedTime);
        }, 100)
        linkSpeedURL = e.value;
        linkSpeedE = t;
        var img = new Image(); //创建一个Image对象，创建一个img请求连接，实现图片的预下载
        img.src = linkSpeedURL + "/" + Math.random();
        img.onerror = function(call) { //检测测试结果，图片下载完毕时异步调用callback函数。
            window.event
            console.log(call)
            if (linkSpeedURL) {
                getLinkSpeed();
            }
        };
    };
//检测某个网站的链接速度
document.getElementById("linkSpeed").onclick = function() {
    linkSpeed(document.getElementById("linkSpeedWeb"), document.getElementById("linkSpeedTime"));
}