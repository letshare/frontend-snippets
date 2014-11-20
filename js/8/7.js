var userAgent = navigator.userAgent; //获取user agent信息
if (userAgent.indexOf('AppleWebKit') > -1) { //判断是否为移动浏览器
    alert('您使用的是移动浏览器');
} else {
    alert('您使用的是普通浏览器');
}