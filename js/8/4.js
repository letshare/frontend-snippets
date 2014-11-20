/*防止网页触摸滚动*/
function notouchmove(event) {
    document.body.ontouchmove = function(event) { //body中增加触摸事件
        event.preventDefault(); //该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    }
}
notouchmove();