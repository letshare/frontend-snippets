//参数---e代表被绑定的元素，keys关键字数组列表，color设置关键词的高亮颜色
function keyWordsHighlight(e, keys, color) {
    var i = 0,
        l = keys.length, //关键词的长度
        k = "";
    for (; i < l; i++) {
        k = keys[i]; //获取关键词的对象
        //替换关键词的数据
        e.innerHTML = e.innerHTML.replace(k, "<span style='color:" + (color || "#000") + "'>" + k + "</span>")
    }
}
keyWordsHighlight(document.getElementById("keyWordsHighlight"), ["JavaScript", "CSS", "HTML5"], "red")