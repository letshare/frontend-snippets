//对联广告单击显示
document.getElementById("openAbs").onclick = function() {
    var coupletAdsLeft = null,
        coupletAdsRight = null,
        coupletAds = function(absLeft, absRight) {
            coupletAdsLeft = absLeft;
            coupletAdsRight = absRight;
            this.coupletAdsLeft.style.display = "block";
            this.coupletAdsRight.style.display = "block";
            absTop();
        },
        absTop = function() { //两个对联层的top位置
            if (!this.coupletAdsLeft) return;
            //如果 document.body.scrollTop == 0 选则document.documentElement.scrollTop值，
            var top = ((document.body.scrollTop || document.documentElement.scrollTop) + window.screen.availHeight / 2 - this.coupletAdsLeft.offsetHeight) + "px";
            this.coupletAdsLeft.style.top = top;
            this.coupletAdsRight.style.top = top;
        },
        scrollEvent = (function() { //滚轴事件
            window.onscroll = function() {
                absTop(); //重新修正广告top
            }
        })();
    coupletAds(document.getElementById("coupletAdsLeft"), document.getElementById("coupletAdsRight"));
}