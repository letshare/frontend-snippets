var langUtil = {
	loadScript:function(url){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.appendChild(script);
	},
	loadStyles:function(url){
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
	},
	getQueryStringArgs:function(){
		var qs = location.search.length>0?location.search.substring(1):"";
		var args = [];
		var items = qs.split("&");
		var item = null,name=null,value=null;
		for(var i=0,len=items.length;i<len;i++){
			item = items[i].split("=");
			name = decodeURIComponent(item[0]);
			value = decodeURIComponent(item[1]);
			args[name] = value;
		}
		return args;
	},
	hasPlugin:function(name){
		name = name.toLowerCase();
		for(var i=0,len=navigator.plugins.length;i<len;i++){
			if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
				return true;
			}
		}
		try{
			new ActiveXObject(name);
			return true;
		}catch(e){
			return false;
		}		
	},
	serialize:function(form){
		var parts = [];
		var field = null;
		for(var i=0,len=form.elements.length;i<len;i++){
			field = form.elements[i];
			switch(field.type){
				case "select-one":
				case "select-multiple":
					for(var j=0,optLen=field.options.length;j<optLen;j++){
						var option = field.option[j];
						if(option.selected){
							var optValue = "";
							if(option.hasAttribute){
								optValue = (option.hasAttribute("value")?option.value:option.text);
							}else{
								optValue = option.attributes["value"].specified?option.value:option.text;
							}
							parts.push(encodeUIRComponent(field.name)+"="+encodeUIRComponent(optValue));
						}
					}
					break;
				case undefined:
				case "file":
				case "submit":
				case "reset":
				case "button":
					break;
				case "radio":
				case "checkbox":
					if(!field.checked){
						break;
					}
				default:
					parts.push(encodeUIRComponent(field.name)+"="+encodeUIRComponent(field.value));
			}
		}
		return parts.join("&");
	},
	createXHR:function(){
		if(typeof XMLHttpRequest != "undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != "undefined"){
			if (typeof arguments.callee.ActiveXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
				for(var i=0,len=versions.length;i<len;i++){
					try{
						var xhr = new ActiveXObject(versions[i]);
						arguments.callee.ActiveXString = versions[i];
						return xhr;
					}catch(ex){}
				}
			}
			return new ActiveXObject(arguments.callee.ActiveXString);
		}else{
			throw new Error("No  XHR object available.");
		}		
	},
	getLocalStorage:function(){
		if(typeof localStorage == "object"){
			return localStorage;
		}else if(typeof globalStorage == "object"){
			return globalStorage;
		}else{
			throw new Error("local storage not available.");
		}
	}
};

function EventTarget(){
	this.handlers = {};
}

EventTarget.prototype = {
	constructor:EventTarget,
	addHandler:function(type,handler){
		if(typeof this.handlers[type] == "undefined"){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	fire:function(event){
		if(!event.target){
			event.target = this;
		}
		if(this.handlers[event.type] instanceof Array){
			var handlers = this.handlers[event.type];
			for (var i = handlers.length - 1; i >= 0; i--) {
				handlers[i](event);
			};
		}
	},
	removeHandler:function(type,handler){
		if(this.handlers[type] instanceof Array){
			var handlers = this.handlers[type];
			for (var i = handlers.length - 1; i >= 0; i--) {
				if(handlers[i] == handler){
					break;
				}
			}
			handlers.splice(i,1);
		}
	}
};

var DragDrop = function(){
	var dragdrop = new EventTarget();
	var dragging = null;
	var diffX = 0 ;
	var diffY = 0;

	function handleEvent(type){
		event = event || window.event;
		var target = eventUtil.getTarget(event);
		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("draggable")>-1){
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					dragdrop.fire({type:"dragstart",target:dragging,x:event.clientX,y:event.clientY});
				}
				break;
			case "mousemove":
				if(dragging!==null){
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";
					dragdrop.fire({type:"drag",target:dragging,x:event.clientX,y:event.clientY});
				}
				break;
			case "mouseup":
				dragdrop.fire({type:"dragend",target:dragging,x:event.clientX,y:event.clientY});
				dragging = null;
				break;
		}
	}

	dragdrop.enable = function(){
		eventUtil.addEventListener(document,"mousedown",handleEvent);
		eventUtil.addEventListener(document,"mousemove",handleEvent);
		eventUtil.addEventListener(document,"mouseup",handleEvent);
	};
	dragdrop.disable = function(){
		eventUtil.removeEventListener(document,"mousedown",handleEvent);
		eventUtil.removeEventListener(document,"mousemove",handleEvent);
		eventUtil.removeEventListener(document,"mouseup",handleEvent);
	};
	return dragdrop;
}();

var cookieUtil = {
	get:function(name){
		var cookieName = encodeUIRComponent(name)+"=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieStart>-1){
			var cookieEnd = document.cookie.indexOf(";",cookieStart);
			if(cookieEnd == -1){
				cookieEnd = document.cookie.length;
			}
			cookieValue = encodeUIRComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
		}
		return cookieValue;
	},
	set:function(name,value,expires,path,domain,secure){
		var cookieText = encodeUIRComponent(name)+"="+encodeUIRComponent(value);
		if(expires instanceof Date){
			cookieText += "; expires="+expires.toGMTString();
		}
		if(path){
			cookieText += "; path="+path;
		}
		if(domain){
			cookieText += "; domain="+domain;
		}
		if(secure){
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	},
	unset:function(name,path,domain,secure){
		this.set(name,"",new Date(0),path,domain,secure);
	}
};

var subCookieUtil = {
	get:function(name,subName){
		var subCookies = this.getAll(name);
		if(subCookies){
			return subCookies[subName];
		}else{
			return null;
		}
	},
	getAll:function(name){
		var cookieName = encodeUIRComponent(name)+"=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			result = {};
		if(cookieStart>-1){
			var cookieEnd = document.cookie.indexOf(";",cookieStart);
			if(cookieEnd == -1){
				cookieEnd = document.cookie.length;
			}
			cookieValue = document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
			if(cookieValue.length>0){
				var subCookies = cookieValue.split("&");
				for(var i=0,len=subCookies.length;i<len;i++){
					var parts = subCookies[i].split("=");
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
				return result;
			}
		}
		return null;
	},
	set:function(name,subName,value,expires,path,domain,secure){
		var subcookies = this.getAll(name) || {};
		subcookies[subName] = value;
		this.setAll(name,subcookies,expires,path,domain,secure);
	},
	setAll:function(name,subcookies,expires,path,domain,secure){
		var cookieText = encodeUIRComponent(name)+"=";
		var subcookieParts = new Array();
		for(var subName in subcookies){
			if(subName.length>0 && subcookies.hasOwnProperty(subName)){
				subcookieParts.push(encodeUIRComponent(subName)+"="+encodeUIRComponent(subcookies));
			}
		}
		if(cookieParts.length>0){
			var cookieText += subcookieParts.join("&");
			if(expires instanceof Date){
				cookieText += "; expires="+expires.toGMTString();
			}
			if(path){
				cookieText += "; path="+path;
			}
			if(domain){
				cookieText += "; domain="+domain;
			}
			if(secure){
				cookieText += "; secure";
			}
		}else{
			cookieText += "; expires="+(new Date(0)).toGMTString();
		}
		document.cookie = cookieText;		
	},
	unset:function(name,subName,path,domain,secure){
		var subcookies = this.getAll(name);
		if(subcookies){
			delete subcookies[subName];
			this.setAll(name,subcookies,null,path,domain,secure);
		}
	},
	unsetAll:function(name,path,domain,secure){
		this.setAll(name,null,new Date(0),path,domain,secure);
	}
};