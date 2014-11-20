var
        _mousepos = {//鼠标在页面上的位置
            "top":0,
            "left":0
        },

        /**
         * 获取鼠标在页面上的位置
         * _e		触发的事件
         * left:鼠标在页面上的横向位置, top:鼠标在页面上的纵向位置
         */
        getMousePoint = function (_e) {
            var _body = document.body,
                    _left = 0,
                    _top = 0;
            //浏览器支持 pageYOffset, 那么可以使用pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
            if(typeof window.pageYOffset != 'undefined') {
                _left = window.pageXOffset;
                _top = window.pageYOffset;
            }
            //如果浏览器指定了DOCTYPE并且支持compatMode
            else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                _left = document.documentElement.scrollLeft;
                _top = document.documentElement.scrollTop;
            }
            //其他的如果浏览器支持document.body
            else if(typeof _body != 'undefined') {
                _left = _body.scrollLeft;
                _top = _body.scrollTop;
            }
            _left += _e.clientX;
            _top += _e.clientY;
            _mousepos.left = _left;
            _mousepos.top = _top;

            return _mousepos;
        },

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

        getAbsoluteLeft = function (_e){//获取元素的绝对left
            var _left = _e.offsetLeft,
                    _current = _e.offsetParent;
            while (_current !== null){
                _left += _current.offsetLeft;
                _current = _current.offsetParent;
            }
            return _left;
        },

        QQPhotoAlbum = function(options){

            var scrollLine = options.scrollLine,//线轴运动
                    minLeft = getAbsoluteLeft(scrollLine),
                    maxLeft = options.width - 100,
                    childDivs = getTypeElement(options.photoStreamMain.childNodes, "div"),
                    childDivsLen = childDivs.length,
                    cW = 0,
                    ve = [],//横向浮动元素
                    initChilds = (function(){//初始化图片节点
                        var i = 0,
                                imge = null;
                        while(childDivs[i]){
                            imge = getTypeElement(childDivs[i].childNodes, "img")[0];
                            if(i%2 == 0){
                                ve.push(imge);
                                cW += 150;
                                childDivs[i].style.width = "150px";
                            }else{
                                cW += 300;
                                childDivs[i].style.width = "300px";
                            }
                            i++;
                        }
                    })(),
                    s = cW/options.width;

            scrollLine.onmousedown = function(e){//开启
                bodyscrollLineingE.scrollLineing = true;
                e = e || window.event;
                var _pos = getMousePoint(e);
                bodyscrollLineingE.vx = _pos.left - minLeft - (parseInt(this.style.left) || 0);

            }

            document.body.onmouseup = function(){//关闭
                bodyscrollLineingE.scrollLineing = false;
            }

            options.photoStreamMain.style.width = cW;//主流宽度

            mainScrollLine = function(ml){//主流的left
                var _ml = -1 * ml * s;
                options.photoStreamMain.style.left = _ml+"px";
            }

            bodyscrollLineingE = {//移动
                minLeft:minLeft,
                maxLeft:maxLeft,
                scrollLine:scrollLine,
                mainScrollLine:mainScrollLine
            }

            setInterval(function(){//图片动态浮动
                var veLen = ve.length,
                        l = 0;
                for(; l < veLen ; l++){
                    new animateManage({
                        "context":ve[l],//被操作的元素
                        "effect":"linear",
                        "time": 5000,//持续时间
                        "starCss":{//元素的起始值偏移量
                            "left":ve[l].style.left || 0
                        },
                        "css" :{//元素的结束值偏移量
                            "left":(parseInt(ve[l].style.left, 10) == -150 ? 0 : -150)
                        }
                    }).init();
                }
            },6000)
        },
        bodyscrollLineingE = {
            scrollLineing:false,
            minLeft:0,
            maxLeft:0,
            scrollLine:null,
            vx:0,
            mainScrollLine:0
        },

        bodyscrollLineing = function(e){
            var _ee =  bodyscrollLineingE;
            if(_ee.scrollLineing){
                e = e || window.event;
                var _pos = getMousePoint(e),
                        _l = _pos.left - _ee.minLeft- _ee.vx;
                if(_l < 0) _l = 0;
                if(_l > _ee.maxLeft) _l = _ee.maxLeft;
                _ee.scrollLine.style.left = (_l || 0) +"px";
                _ee.mainScrollLine(_l);//横式布局left转换
            }
        };

        document.body.onmousemove = function(e){//body 移动事件
            bodyscrollLineing(e);
        }

        QQPhotoAlbum({//类似QQ相册效果
            "scrollLine":document.getElementById("scrollLine"),
            "photoStreamMain":document.getElementById("photoStreamMain"),
            /*"minLeft":580,*/
            "width":334
        })