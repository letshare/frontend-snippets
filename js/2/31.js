 var _addOptions = document.getElementById("addOptions"),
     _addOption = document.getElementById("addOption"),
     addOptions = function(target, optons) { //添加option
         var _option = null,
             ol = optons.length,
             i = 0,
             _v = "",
             _t = "";
         for (; i < ol; i++) {
             _v = optons[i].value;
             _t = optons[i].text;
             _option = document.createElement("OPTION"); //创建空option引用
             _option.value = _v; //添加值
             _option.text = _t; //添加文本
             target.options.add(_option); //增加option
         }
     };
 _addOptions.onclick = function() {
     addOptions(_addOption, [{
         "value": "新添加的元素",
         "text": "新添加的元素"
     }])
 }