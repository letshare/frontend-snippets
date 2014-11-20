function clearPrintHeadFoot() { //去掉打印时的页眉页脚
    try //IE---设置网页打印的页眉页脚为空
    {
        var hkey_root = "HKEY_CURRENT_USER",
            hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\",
            hkey_ = hkey_root + hkey_path,
            //通过ActiveXObject可以访问windows的本地文件系统和应用程序，创建WScript.Shell服务系统组件对象
            ws = new ActiveXObject("WScript.Shell"),
            hkey_key = "header"; //设置头部为根键
        ws.RegWrite(hkey_ + hkey_key, "");
        hkey_key = "footer"; //设置底部为根键
        ws.RegWrite(hkey_ + hkey_key, "");
    } catch (e) {
        alert("您的浏览器不支持脚本去除页眉与页脚，请手动设置！")
    }
}