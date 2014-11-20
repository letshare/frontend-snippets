function isIE() { //是否IE
    return !!window.ActiveXObject;
}

function getClassName(className) { //通过类获取元素的样式
    var all = document.all ? document.all : document.getElementsByTagName('*'),
        es = new Array(),
        l = all.length;
    for (var e = 0; e < l; e++) {
        if (all[e].className == className) {
            es[es.length] = all[e];
        }
    }
    return es;
}
//页面打印及预览指定区域=====Chrome 可以，其它等待打印机测试
function printAndpreview() {
    var styleId = document.getElementById("styleId"),
        _noprint = getClassName("noprint"),
        _l = _noprint.length,
        displayFun = function(dis) {
            for (var i = 0; i < _l; i++) {
                _noprint[i].style.display = dis;
            }
        }
    displayFun("none"); //将不被打印的区域隐藏
    if (isIE()) { //是否是IE
        /*注意有可能执行时，会出现没有效果的错误，
                这时原因是可能你的浏览器限制了active对象的创建，只要取消限制就好了，取消方法如下：
                打开你的ie浏览器internet选项—— 安全—— 自定义级别——
                把对没有标记为安全的activex控件进行初始化和脚本运行设置为启用，这样在加打印按钮的时候，只要加个事件触发就好了。*/
        wb.execwb(6, 6)
    } else {
        window.print(); //非IE支持的方案
    }
    //将不被打印的区域显示
    displayFun("block");
}
//页面打印及预览指定区域
document.getElementById("printAndpreview").onclick = function() {
    printAndpreview();
}