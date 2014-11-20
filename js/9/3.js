/*============Js解析 JSON 数据start============*/
var jsonStr = '{ "friends" : [' + '{ "firstName":"Bills" , "lastName":"Gates" },' + '{ "firstName":"George" , "lastName":"Bush" },' + '{ "firstName":"Thomas" , "lastName":"Carter" } ]}',
    /*
         Js解析JSON数据
         */
    trim = function(chars) { //去除字符串左右两边的空格
        return (chars || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
    },
    parseJSON = function(jsonData) { //解析函数
        if (typeof jsonData === 'object') { //判断是否为对象
            return jsonData; //直接返回对象
        }
        if (window.JSON && window.JSON.parse) { //如果存在原生的JSON解析API，则使用原生的解析API
            return window.JSON.parse(jsonData); //解析JSON字符
        }
        if (typeof jsonData === "string") {
            jsonData = trim(jsonData); //简单的过滤字符，保证前后没有空格
            if (jsonData) { //如果不是空字符
                return (new Function("return " + jsonData))(); //利用Function的特性，构造 JSON 对象
            }
        }
    }
console.log(parseJSON(jsonStr));