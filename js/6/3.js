function getNowTime() {
    var date = new Date(); //获取日期对象
    /*获取年、月、日、时、分、秒，本地系统的时间*/
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + " " + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
}
//显示最后修改时间
document.getElementById("updateContent").onblur = function() {
    document.getElementById("getLastMTime").innerHTML = "显示最后修改时间：" + getNowTime();
}