var _isContent = document.getElementById("isContent"),
    _strs = document.getElementById("strs");
_isContent.onclick = function() {
    if (!_strs.value.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")) {
        alert("您的输入为空！");
    } else {
        alert("您的输入不为空！");
    }
}