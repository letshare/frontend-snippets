var _keyWordsFiltering = document.getElementById("keyWordsFiltering");
_keyWordsFiltering.onclick = function() {
    var //关键词库
    keyWordsLibs = ["JavaScript", "美女", /[外]{1}.{0,3}[挂]{1}/],
        keyWordsLibsLen = keyWordsLibs.length;
    for (var i = 0; i < keyWordsLibsLen; i++) { //正则过滤
        _keyWordsFiltering.value = _keyWordsFiltering.value.replace(keyWordsLibs[i], "***")
    }
}