function slideNavs(slide){//    滑动门导航===========================start
            var slideId = -1;;
            slide.onmouseover = function(){//打开滑动门
                clearTimeout(slideId);//由于子元素会干扰事件，导致滑动抖动，当再次进入元素，停止隐藏滑动门的线程
                new animateManage({//播放显示元素的动画
                    "context" : slide,//被操作的元素
                    "effect":"linear",
                    "time": 100,//持续时间
                    "starCss":{//元素的起始值偏移量
                        "left":slide.style.left
                    },
                    "css" :{//元素的结束值偏移量
                        "left":0
                    }
                }).init();
            }

            slide.onmouseout = function(){//关闭滑动门
                slideId = setTimeout(function(){
                    new animateManage({//播放隐藏元素的动画
                        "context" : slide,//被操作的元素
                        "effect":"linear",
                        "time": 100,//持续时间
                        "starCss":{//元素的起始值偏移量
                            "left":slide.style.left
                        },
                        "css" :{//元素的结束值偏移量s
                            "left":-72
                        }
                    }).init();
                }, 300)

            }
        }
        slideNavs(document.getElementById("slide"));