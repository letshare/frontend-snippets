function dateFormat() { //日期格式化成字符串
    Date.prototype.format = function(f) {
        var date = { //获取对象中的日期
            "Y": this.getFullYear(), //获取年
            "M": (this.getMonth() + 1), //获取月
            "D": this.getDate(), //获取日
            "h": this.getHours(), //获取小时
            "m": this.getMinutes(), //获取分钟
            "s": this.getSeconds() //获取秒
        },
            d = "", //初始化接受日期变量的对象
            r = false, //判断是否存在待替换的字符
            reg = null, //正则
            _d = ""; //日期
        for (d in date) { //过滤日期标示符
            //判断是否有待格式化的字符
            reg = new RegExp("[" + d + "]{1,}", "g");
            r = reg.test(f);
            if (r) //验证是否存在
            {
                _d = date[d]; //被替换的日期
                f = f.replace(reg, _d < 10 ? ("0" + _d) : _d);
            }
        }
        return f;
    }
}
dateFormat();
//获取短日期格式
function getMinDate() {
    return new Date().format("YYYY-MM-DD");
}
//获取短日期格式
document.getElementById("getMinDate").innerHTML = getMinDate();