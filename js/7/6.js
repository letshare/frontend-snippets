function floatingAd(){

            var animateFloat = function(){//运动行动画

                var floatingAd = document.getElementById("floatingAd"),//浮动的动画
                        bodyW = window.innerWidth || document.documentElement.offsetWidth,//浮动的最大范围
                        maxLeft = bodyW -120,//浮动的最大范围修正
                        thisLeft = parseInt(floatingAd.style.left);//元素的left值

                new animateManage({
                    "context" : floatingAd,//被操作的元素
                    "effect":"linear",
                    "time": 10000,//持续时间
                    "starCss":{//元素的起始值偏移量
                        "left":thisLeft
                    },
                    "css" :{//元素的结束值偏移量
                        "left":thisLeft >=  maxLeft ? 0 : maxLeft//检测是否达到最左边或右边，开始反向运动
                    }
                }).init();
            }

            animateFloat();

            setInterval(function(){//更新动画
                animateFloat();
            }, 10100);
        }
        floatingAd();