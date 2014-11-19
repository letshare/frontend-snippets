var _removeOptions = document.getElementById("removeOptions"), //获取元素对象
    removeOptions = function(target, optons) { //删除option
        var ol = optons.length,
            i = 0;
        for (; i < ol; i++) {
            target.options[i] && target.options.remove(target.options[i]); //如果存在option对象，则调用remove删除
        }
    };
_removeOptions.onclick = function() { //绑定事件，执行删除
    removeOptions(document.getElementById("removeOption"), [1, 2])
}