//页面慢慢变大
var pageFillOutSize = {
    width: 100,
    height: 100
},
    pageFillOutWin = null,
    pageFillOutId = -1,
    // 页面慢慢变大,支持window.resizeBy方法的浏览器都支持此效果，部分ie支持,Chrome等
    pageFillOut = function() {
        pageFillOutWin = window.open("../closeParent.html", "", "width=100,height=100");
        pageFillOutId = setInterval(function() {
            pageFillOutSize.width += 6; //累加
            pageFillOutSize.height += 6; //累加
            pageFillOutWin.window && pageFillOutWin.window.resizeBy(pageFillOutSize.width, pageFillOutSize.height);
            //如果此对象不存在或大于最大的宽度则停止动画
            if (!pageFillOutWin.window || pageFillOutSize.width >= screen.availWidth) {
                clearInterval(pageFillOutId);
            }
        }, 50)
    };
document.getElementById("pageFillOut").onclick = function() { // 页面慢慢变大
    pageFillOut();
}