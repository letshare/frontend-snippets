 var arr = [ //创建节点数组
     document.getElementById("banInputMethodgoogle"),
     document.getElementById("banInputMethod")
 ],
     self = this;
 for (var i = 0, arrLen = arr.length; i < arrLen; i++) { //遍历待处理的节点对象
     var arrI = arr[i];
     arrI.onfocus = function() { //获取焦点事件
         this.style.imeMode = 'disabled'; //样式方案,只兼容除了谷歌浏览器之外的浏览器
     }
     var banInputMethod = arrI.getAttribute("banInputMethod"); //获取banInputMethod属性
     if (banInputMethod) { //判断是否存在banInputMethod
         var clearChinese = function(_this) {
             var _v = _this.value;
             _this.value = _v.replace(/[\u4e00-\u9fa5]/g, ""); //正则替换中文字符
         }
         arrI.onkeyup = function() { //keyup事件
             clearChinese(this);
         }
         arrI.onblur = function() { //blur事件
             clearChinese(this);
         }
     }
 }