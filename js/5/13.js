//判断网页是否在框架中，如果不在框架中，自动套上框架
if (window.location.href == top.location.href) {
    top.location.href = "../frames.html"; //frames.html为框架网页
}