//获取指定类型的节点
        function getTypeElement(es, type){
            var esLen = es.length,
                    i = 0,
                    eArr = [],
                    esI = null;
            for(; i < esLen ; i++){
                esI = es[i];
                if(esI.nodeName.replace("#", "").toLocaleLowerCase() == type){
                    eArr.push(esI);
                }
            }
            return eArr;
        }
        function picLists(){//    随图片快速翻动幻灯代码===========================start

            var imgs = getTypeElement(document.getElementById("picLists").childNodes, "div"),//获取所有待点击的图片对象
                    l = imgs.length,//图片对象个数
                    i = 0,//遍历初始位置
                    src = "",
                    firstUi = document.getElementById("firstUi"),  //第一个节点
                    firstUiimg = document.getElementById("firstUiimg"),//第一个节点的图片对象
                    secondUi = document.getElementById("secondUi"),//第二个节点
                    secondUiimg = document.getElementById("secondUiimg"),//第二个节点图片对象
                    t = 1, //切换节点类型
                    main = document.getElementById("main");

            for(; i < l ; i++){

                imgs[i].onclick = function(){ //为图片绑定点击事件，响应切换图片
                    src = getTypeElement(this.childNodes, "img")[0].src;//被点击事件的图片对象
                    if(t == 1){ //如果等于1，则修改第二个节点的src
                        secondUiimg.src = src;
                    }else{
                        firstUiimg.src = src;
                    }

                    new animateManage({//播放动画
                        "context" : t == 1 ? firstUi : secondUi,//被操作的元素
                        "effect":"linear",
                        "time": 300, //持续时间
                        "starCss":{//元素的起始值偏移量
                            "width":208
                        },
                        "css" :{//元素的结束值偏移量
                            "width":0
                        },
                        "callback":function(){
                            if(t == 1){
                                t = 2;
                                firstUi.style.width = "208px";    //回复第1个节点的宽度
                                main.appendChild(firstUi);//将第1个节点设置成最后节点
                            } else{
                                t = 1;
                                main.appendChild(secondUi);//将第2个节点设置成最后节点
                                secondUi.style.width = "208px";//回复第2个节点的宽度
                            }
                        }
                    }).init();
                }
            }
        }
        picLists();