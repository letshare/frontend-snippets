//屏蔽右键
document.getElementById("shieldingRight").onclick = function() {
    if (this.value == '已经开启屏蔽') { //判断是否开启过屏蔽功能
        return;
    }
    this.value = '已经开启屏蔽';
    //禁止右键菜单的事件,一般情况下，IE、FF、Chrome都会支持，在一些其它个别浏览器下会不支持
    document.oncontextmenu = function() {
        alert('禁止鼠标右键菜单!');
        return false; //返回false 则会禁止
    }
}