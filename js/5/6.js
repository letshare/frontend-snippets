document.getElementById("updatePage").onclick = function() {
    /*在JavaScript用很多刷新当前页面的方法，本节介绍3种---window为当前的窗口对象*/
    window.location.reload(); //方法1 直接调用reload()方法，
    /*
            方法2 让页面跳转至原有的页面，也是刷新的一种实现方案
            window.location.href = window.location.href;

            方法3 利用新的页面替换当前的页面 ，会替换历史中的痕迹
            window.location.replace(window.location.href);
            */
}