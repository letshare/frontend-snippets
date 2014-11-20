//刷新iframe窗口===========
document.getElementById("updateIframeBtn").onclick = function() {
    //第1种获取iframe --- 用iframe的id属性定位，用location.href可以解决跨域的问题，网上流传用location.reload()，这个会有域的限制
    updateIframe.location.href = "../child.html";
}