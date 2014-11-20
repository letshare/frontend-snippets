var
        getTypeElement = function(es, type){//获取指定类型的节点
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
        },
        navs = getTypeElement(document.getElementById("pullDownNavigation").childNodes, "div"),//获取所有下拉式导航菜单
        i = 0,
        l = navs.length,//元素个数
        targetID = null;

        for(; i < l ; i++){
            navs[i].onmousemove = function(){    //显示下拉菜单
                targetID = this.getAttribute("data-targetID");
                document.getElementById(targetID).style.display = "block";
            }

            navs[i].onmouseout = function(){  //隐藏下拉菜单
                document.getElementById(targetID).style.display = "none";
            }
        }