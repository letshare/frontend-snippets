//日期合法性验证
function verifyDate(vDate) {
    //验证格式必须为  "YYYY-MM-DD hh:mm:ss" 格式，类似“2014-02-12 16:34:57”
    return /^(\d{4}-\d{2}-\d{2})\s{1}(\d{2}:\d{2}:\d{2})$/.test(vDate);
}
//日期合法性验证=============start
document.getElementById("verifyDate1").innerHTML = "2021-02-19 16:21:51的日期格式：" + (verifyDate("2021-02-19 16:21:51") ? "正确" : "错误");
document.getElementById("verifyDate2").innerHTML = "2021-02-19的日期格式：" + (verifyDate("2021-02-19") ? "正确" : "错误");