var autoRow = document.getElementById("autoRow");
autoRow.style.overflowY = "hidden";
autoRow.onkeyup = function() {
    autoRow.style.height = autoRow.scrollHeight;
};