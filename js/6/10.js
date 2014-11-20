function getDateDifferenceValue(date1, date2) {
    //第1个时间
    var d1 = new Date(date1.Y || 0, (date1.M - 1) || 0, date1.D || 1, date1.h || 0, date1.m || 0, date1.s || 0).getTime(),
        //第2个时间
        d2 = new Date(date2.Y || 0, (date2.M - 1) || 0, date2.D || 1, date2.h || 0, date2.m || 0, date2.s || 0).getTime();
    return (d1 - d2) / 1000; //计算时间差值
}
//比较两个日期的差
document.getElementById("getDateDifferenceValue").innerHTML = "2014年6月3日与2014年6月4日差值" + getDateDifferenceValue({
    "Y": "2014",
    "M": "6",
    "D": "3"
}, {
    "Y": "2014",
    "M": "6",
    "D": "4"
}) + "秒";