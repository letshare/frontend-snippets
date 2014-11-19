 var banCopyPaste = document.getElementById("banCopyPaste");
 banCopyPaste.oncopy = function() { //禁止复制事件
     return false;
 }
 banCopyPaste.onpaste = function() { //禁止粘贴
     return false;
 }