/*
         使用JavaScript代码调用百度地图
         */
var baiduMap = null, //百度地图对象
    intBaiduMap = function(m) {
        baiduMap = new BMap.Map(m); // 创建 BMap 实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        baiduMap.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别。
        baiduMap.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        baiduMap.disableDragging(); //禁用地图拖拽
    };
intBaiduMap("baiduMap");