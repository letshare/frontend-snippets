var forElementArr = function(_elementArr, callBack) { //遍历节点
    var arr = _elementArr, //所有节点对象
        self = this //外层环境
        ;
    if (!(_elementArr instanceof Array)) { //如果不是数组，变成数组对象方便处理
        arr = [_elementArr];
    };
    for (var i = 0, arrLen = arr.length; i < arrLen; i++) { //遍历数组
        var arrI = arr[i];
        if (typeof arrI == "string") { //判断是否为字符串
            arrI = document.getElementById(arrI);
        }
        callBack && callBack(i, arrI); //如果存在回调则执行回调
    }
},
    showRemainingCharacters = function(_nums, _remainingCharacters) {
        if (_remainingCharacters.search(",") != -1) {
            _remainingCharacters = _remainingCharacters.split(","); //英文字符串分割
        }
        forElementArr(_remainingCharacters, function(_index, _this) {
            _this.innerHTML = (_nums && _nums.toString()) || "0";
        });
    },
    strLen = (function() { //统计中英文字符数
        var trim = function(chars) {
            return (chars || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
        }
        return function(_str, _model) { //返回字符处理的函数
            _str = trim(_str),
            _model = _model || "Ch"; //默认为中文模式
            var _strLen = _str.length; //获取字符长度
            if (_strLen == 0) { //如果字符长度为0直接返回
                return 0;
            } else {
                var chinese = _str.match(/[\u4e00-\u9fa5]/g); //匹配中文
                return _strLen + (chinese && _model == "Ch" ? chinese.length : 0);
            }
        };
    })(),
    //获取限制对象
    remainingCharacters = document.getElementById("remainingCharacters"),
    clearNonumber = function(tThis) { //清除数字字符
        var _v = tThis.value,
            _vLen = _v.length,
            dataLength = tThis.getAttribute("data-length"),
            remainingCharacters = tThis.getAttribute("data-remainingCharacters"); //如果有实时显示的属性，则在指定元素上显示
        /*区分中英文前                if(_v.length > dataLength) tThis.value = _v.substr(0, dataLength);*/
        var dataModel = tThis.getAttribute("data-model"); //区分中英文后
        var subLen = dataLength;
        if (dataModel == "Ch") { //如果为中文模式
            _vLen = strLen(_v, dataModel); //获取长度
            var vv = _v.match(/[\u4e00-\u9fa5]/g);
            subLen = dataLength - (!vv ? 0 : vv.length);
        }
        if (_vLen > dataLength) tThis.value = _v.substr(0, subLen);
        if (remainingCharacters) {
            showRemainingCharacters(!_vLen ? dataLength : (_vLen > dataLength ? 0 : dataLength - _vLen), remainingCharacters);
        }
    };
remainingCharacters.onfocus = function() { //获取焦点
    clearNonumber(this);
}
remainingCharacters.onkeyup = function() { //键盘事件
    clearNonumber(this);
}
remainingCharacters.onblur = function() { //失去焦点
    clearNonumber(this);
}