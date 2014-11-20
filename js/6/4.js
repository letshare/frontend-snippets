function getNowTime() {
    var date = new Date(); //获取日期对象
    /*获取年、月、日、时、分、秒，本地系统的时间*/
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + " " + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
}
setInterval(function() { //间时调用，不断的修改为当前时间
    document.getElementById("showNowTime").innerHTML = "时间：" + getNowTime();
}, 1000);