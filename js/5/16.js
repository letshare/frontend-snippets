document.getElementById("deselect").onclick = function() { //取消选区
    /*
             1,document.selection不是W3C的标准，只是一些主流浏览器的API，只有ie支持，代表选中区块，之后可以调用这个API的一些操作方法；
             2,window.getSelection 返回一个由用户选定的表示文本的范围的对象，并可以调用此对象的一些方法进行操作
             * */
    (window.getSelection && window.getSelection().removeAllRanges()) || (document.selection && document.selection.empty && document.selection.empty());
}
var preventCopying = document.getElementById("preventCopying"); //防止复制
/***第1种方法***/
preventCopying.oncopy = function() { //禁止复制
    return false;
}
preventCopying.oncut = function() { //禁止剪切
    return false;
}
/***第2种方法***/
preventCopying.onselectstart = function() { //禁止选取
    return false;
}