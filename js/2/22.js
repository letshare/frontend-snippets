var isNumber = function(_number) {
    return typeof _number == "number"; //
},
    _number1 = "1",
    _number2 = 1,
    _number3 = 1.22,
    _number4 = null,
    _html = "";
_html += isNumber(_number1) ? "_number1是数值型<br />" : "_number2不是数值型<br />";
_html += isNumber(_number2) ? "_number2是数值型<br />" : "_number2不是数值型<br />";
_html += isNumber(_number3) ? "_number3是数值型<br />" : "_number3不是数值型<br />";
_html += isNumber(_number4) ? "_number4是数值型<br />" : "_number4不是数值型<br />";
document.getElementById("isNumber").innerHTML = _html;