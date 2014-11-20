function getTypeElement(es, type){//获取指定类型的节点
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

        function treeMenuNav(){//树形菜单导航

            var as = document.getElementsByTagName('a'),//获取所有a元素
                    ai = 0,//循环变量初始引导值
                    al = as.length,//a的个数
                    ao = null;    //被遍历的当前元素

            for(; ai < al ; ai++){
                ao = as[ai];

                if(ao.className == "treeIcon"){//判断是否是树形节点被点击的地方
                    ao.onclick = function(){//绑定点击事件

                        var iconType = this.innerHTML,//获取展示类型
                                uls = getTypeElement(this.parentNode.parentNode.childNodes, "ul"),//所有将要设置是否显示的元素
                                uli = 0,//元素初始值
                                ull = uls.length,//子菜单个数
                                dis = "block";//默认显示（展开）子菜单

                        if(iconType == "-"){
                            this.innerHTML = "+";
                            dis = "none";
                        }
                        else{
                            this.innerHTML = "-";
                        }
                        for(; uli < ull ; uli++){
                            uls[uli].style.display = dis;
                        }
                    }
                }
            }
        }
        treeMenuNav();