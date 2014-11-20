//获取指定日期所在周是第几周====================start
function getHowManyWeeks(Y, M, D) {
    var totalDays = 0, //总天数
        i = 1; //默认开始为第1个月
    for (; i < M; i++) { //计算总天数
        totalDays += this.getMonthDays(Y, M);
    }
    totalDays += D;
    return Math.ceil(totalDays / 7); //除以7，向上取数，计算第几周
}
//获取指定日期所在周是第几周
document.getElementById("getHowManyWeeks").innerHTML = "第" + getHowManyWeeks("2014", "1", "6") + "周";