var targets = document.getElementsByName("actionSelects"),
    targetsLen = targets.length,
    i = 0;
document.getElementById("allSelect").onclick = function() {
    for (i = 0; i < targetsLen; i++) {
        targets[i].checked = true;
    }
}
document.getElementById("canelallSelect").onclick = function() {
    for (i = 0; i < targetsLen; i++) {
        targets[i].checked = false;
    }
}
document.getElementById("_select").onclick = function() {
    for (i = 0; i < targetsLen; i++) {
        targets[i].checked = !targets[i].checked;
    }
}