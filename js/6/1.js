/*获取日期的指定部分*/
var d = new Date(); //获取日期对象
console.log(d.getFullYear() + "年"); //获取年
console.log((d.getMonth() + 1) + "月"); //获取月函数默认是0~11 所以要+1
console.log(d.getDate() + "日"); //获取日
console.log(d.getHours() + "时"); //获取时
console.log(d.getMinutes() + "分"); //获取分
console.log(d.getSeconds() + "秒"); //获取秒