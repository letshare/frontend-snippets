//添加到收藏夹=======================start
function addFavorite(fURL, fTitle) {
    try { //IE支持的API
        window.external.AddFavorite(fURL, fTitle);
    } catch (e) { //FF支持的API
        try {
            window.sidebar.addPanel(fTitle, fURL, "");
        } catch (error) {
            //如果不支持以上两种方案，采用 提示性收藏
            alert("加入收藏失败，请用Ctrl+D 或 手动设置！");
        }
    }
}
document.getElementById("addFavorite").onclick = function() {
    addFavorite("http://qingjs.com", "QingJs框架");
};