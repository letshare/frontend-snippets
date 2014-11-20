//一般点击空连接，页面重置到首页是因为再链接中加入了锚点"#"，或者为空字符等
var as = document.getElementsByTagName("a"),
    i = 0,
    l = as.length,
    h = "";
while (i < l) { //遍历所有a链接
    h = as[i].getAttribute("href");
    if (h = "#" || !h) as[i].href = "javascript:void(0)"; //修改a链接
    i++;
}