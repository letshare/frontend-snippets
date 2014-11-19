getLowerCase = function(str, type) { //小写转大写
    type = type || "locale"; //是否采取本地转换格式
    return type === "locale" && str.toLocaleUpperCase() || str.toUpperCase(); //返回转换后的值
}
getNumbers = function(s) { //字符型转换成数值型
    var n = parseInt(s, 10); //获取转换值
    if (isNaN(n)) return 0; //如果为NaN则转换结果为0
    return n;
}
getString = function(n) { //数字转换成字符型
    return n.toString();
}
console.log(getLowerCase("ASDsssss2asdA")); //小写转大写
/*以下是字符转换数字*/
console.log(getNumbers("ASDsssss2asdA"));
console.log(getNumbers("123123ASDsssss2asdA"));
console.log(getNumbers("ASDsssss2asdA123"));
/*以下是数字转换成字符型*/
console.log(getString(123123) + "类型：" + typeof getString(123123));
console.log(getString(234324) + "类型：" + typeof getString(234324));