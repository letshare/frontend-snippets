var _forbidcheckSelects = document.getElementsByName("forbidcheckSelects"),
    //限制复选框最多选择3项
    banNums = 3;
for (var i in _forbidcheckSelects) {
    _forbidcheckSelects[i].onclick = function() {
        var __forbidcheckSelects = document.getElementsByName("forbidcheckSelects"),
            selectNum = 0;
        for (var i in __forbidcheckSelects) {
            if (i == "length") break;
            if (__forbidcheckSelects[i].checked) {
                selectNum++;
            }
        }
        //如果选中的复选项，超过限制最大数，将当前的选中选项设置为没选中false
        if (selectNum > banNums) {
            this.checked = false;
        }
    }
}