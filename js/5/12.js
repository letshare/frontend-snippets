//自动检测，然后跳出  ---top表示最顶级的窗口，也就是最外层的窗口，self指代当前窗口对象,属于window最上层的对象
if (top.location != self.location) { //判断有没有frame
    top.location = self.location;
}