var _inhibitingInput = document.getElementById("inhibitingInput");
//第一种写法  控制失去焦点
_inhibitingInput.onfocus = function() {
    _inhibitingInput.blur();
}
//第二中写法 通过keyup 与blur 组合使用
/*      var noText = function (){
         _inhibitingInput.value = "";
         }

         _inhibitingInput.onkeyup =
         _inhibitingInput.onblur = noText; */