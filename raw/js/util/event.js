var eventUtil = {
	addEventListener:function(dom,type,handle){
		if(dom.addEventListener){
			dom.addEventListener(type,handle,false);
		}else if(dom.attachEvent){
			dom.attachEvent("on"+type,handle);
		}else{
			dom["on"+type] = handle;
		}
	},
	removeEventListener:function(dom,type,handle){
		if(dom.removeEventListener){
			dom.removeEventListener(type,handle);
		}else if(dom.detachEvent){
			dom.detachEvent("on"+type,handle);
		}else{
			dom["on"+type] = null;
		}
	},
	getTarget:function(event){
		return event.target || event.srcElement;
	},
	getRelatedTarget:function(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.fromElement){
			return event.fromElement;
		}else if(event.toElement){
			return event.toElement;
		}else{
			return null;
		}
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	getClipBoardText:function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	setClipboardText:function(event){
		if(event.clipboardData){
			return event.clipboardData.setData("text/plain",value);
		}else if(window.clipboardData){
			return window.clipboardData.setData("text",value);
		}
	},
	tabForward:function(event){
		var target = eventUtil.getTarget(event);
		if(target.value.length == target.maxLength){
			var form = target.form;
			for(var i=0,len=form.elements.length;i<len;i++){
				if(form.elements[i]==target){
					form.elements[i+1].focus();
					return;
				}
			}
		}
	}
};