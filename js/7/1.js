var suspendNavigation = document.getElementById("suspendNavigation");//获取待定位的元素
        window.onscroll = function(){ //绑定滚轴事件
            suspendNavigation.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + "px";//将元素top定位
        }