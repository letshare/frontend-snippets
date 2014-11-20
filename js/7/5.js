function getTypeElement(es, type){//获取指定类型的节点
            var esLen = es.length,
                    i = 0,
                    eArr = [],
                    esI = null;
            for(; i < esLen ; i++){//获取所有元素
                esI = es[i];
                if(esI.nodeName.replace("#", "").toLocaleLowerCase() == type){
                    eArr.push(esI);
                }
            }
            return eArr;
        }
        function likeQQMenue(){//QQ菜单
            var ls = document.getElementById("likeQQMenue").childNodes,
                    li = 0,
                    ll = ls.length,
                    lo = null;
            for(; li < ll ; li++){
                lo = ls[li];
                if(lo.className == "likeQQMenueLists"){
                    lo.onclick = function(){
                        var divs = getTypeElement(this.childNodes, "div"),
                                dis = "block",
                                classNames = divs[0].className,
                                target = document.getElementById(this.getAttribute("data-targetID"));

                        if(classNames == "relationMenu on"){//展开列表
                            divs[0].className = "relationMenu";
                            target.style.display = "block";
                        }
                        else{ //收缩列表
                            divs[0].className = "relationMenu on";
                            target.style.display = "none";
                        }
                    }
                }
            }
        }
        likeQQMenue();