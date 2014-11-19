document.getElementById("enterSubmit").onkeyup = function(e) {
    e = e || window.event;
    var keycode = e.keyCode || e.which || e.charCode;
    if (keycode === 13) {
        alert("回车提交成功");
    }
}