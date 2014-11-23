var asyncRequest = (function(){
	var handleReadyState = function(o,handle){
		var poll = setInterval(function(){
			if(o && o.readyState == 4){
				clearInterval(poll);
				if(handle){
					handle(o);
				}
			}
		},50);
	};
	var getXHR = function(){
		var http;
		try{
			http = new XMLHttpRequest();
			getXHR = function(){
				return http;
			};
		}catch(e){
			var msxml = ["MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
			for(var i=0,len=msxml.length;i<len;i++){
				try{
					http = new ActiveObject(msxml[i]);
					getXHR = function(){
						return http;
					};
				}catch(e){
					break;
				}
			}
		}
		return http;
	};
	return function(method,url,callback,postData){
		var http = getXHR();
		http.open(method,url,true);
		handleReadyState(http,callback);
		http.send(postData);
		return http;
	};
})();

asyncRequest("post","../server/json.php",function(http){
	if(typeof JSON == 'undefined'){
		var data = eval("("+http.responseText+")");
	}else{
		data = JSON.parse(http.responseText);
	}
	
	alert(data.msg);
});