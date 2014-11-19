 var _clearText = document.getElementById("clearText");
 _clearText.onclick = function() { //为清空的文本绑定时间事件
     var _elements = document.getElementById("clearFrom").elements, //设置表单中所有文本型的成员的值为空
         _elementsLen = _elements.length,
         _ei = null,
         i = 0;
     for (; i < _elementsLen; i++) { //遍历元素
         _ei = _elements[i];
         (_ei.type == "text" || _ei.type == "textarea") && (_ei.value = "");
     }
 }