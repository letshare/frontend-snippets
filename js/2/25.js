var _checkSelects = document.getElementsByName("checkSelects");
for (var i in _checkSelects) {
    if (_checkSelects[i].checked) {
        console.log("至少选中了一项");
        return;
    };
}
console.log("没有选中");