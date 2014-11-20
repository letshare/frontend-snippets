//URL传参中文出现乱码
document.getElementById("getURL").onclick = function() {
    //为了解决中文字符传递，乱码的问题，一般都将传递的参数利用 encodeURIComponent 进行utf-8格式的url编码，服务端可以进行再解码，这样就解决中文乱码问题了
    var cencodeStr = encodeURIComponent("我是Qingjs");
    alert("调用encodeURIComponent对‘我是Qingjs’编码：" + cencodeStr + "\n"
        //decodeURIComponent返回统一资源标识符 (URI) 的一个已编码组件的非编码形式
        + "调用decodeURIComponent对解码后：" + decodeURIComponent(cencodeStr));
}