function adOpenOrShrink(e){//    滑动展开/收缩广告===========================start

            new animateManage({//滑动展开广告
                //被操作的元素
                "context" : e,
                "effect":"linear",
                "time": 1000,//持续时间
                "starCss":{//元素的起始值偏移量
                    "height":0
                },
                "css" :{//元素的结束值偏移量
                    "height":210
                },
                "callback":function(){
                    new animateManage({//滑动收缩广告
                        "context" : e,//被操作的元素
                        "effect":"linear",
                        "time": 1000,//持续时间
                        "starCss":{//元素的起始值偏移量
                            "height":210
                        },
                        "css" :{//元素的结束值偏移量
                            "height":0
                        }
                    }).init();
                }
            }).init();
        }
        document.getElementById("updateAdOpenOrShrink").onclick = function(){//滑动展开/收缩广告===========================start
            adOpenOrShrink(document.getElementById("adOpenOrShrink"));
        }