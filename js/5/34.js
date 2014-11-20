var shieldingFunctionKeys = (function() { // 屏蔽功能键Shift,Alt,Ctrl
    document.onkeydown = function(event) {
        event = event || _W.event;
        if (event.shiftKey || event.altKey || event.ctrlKey) {
            alert("禁止按Shift键、Alt键、Ctrl键!")
        }
    };
})();