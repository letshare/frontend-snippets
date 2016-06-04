var input = document.getElementById('input');
var txt = input.value;
txt = txt.replace(/^(\s|u00A0)+/,'').replace(/(\s|u00A0)+$/,'');

input.onkeyup = function  (event) {
	var ele  = event.currentTarget;
	if(ele.value) isInput = true;
	else  isInput = false;
}

input.onkeyup = input.onblur = function(event){
	ele.value = '';
	ele.value = ele.value.replace(/[\u4e00-\u9fa5]/g,'');
}

input.onfocus  = function(){
	this.style.imeMode = 'disable';

}

input.oncopy = input.onpaste = function(){
	return false;
}

input.onkeyup = input.onblur = function(){
	input.value = input.value.replace(/\D/g,'');
}

password.onkeyup = password.onblur = function(){
	if(input.value.length){
		tip.innerHTML = 'xx';
	}
}

submit.onkeyup = function(e){
	e = e || window.event;
	var keycode = e.keyCode || e.which || e.charCode;
	if(keycode == 13){
		some.submit();
	}
}

cursorPos.onclick = cursorPos.onkeyup = function(){
	var len = this.value.length;
	if(this.setSelectionRange){
		this.setSelectionRange(len,len);
	}else{
		var a = this.createTextRange();
		a.moveStart('character',len);
		a.collapse();
		a.select();
	}

}


banAutocomplete.setAttribute('autocomplete','off');

autoSelect.select();

setCss = function(ele,styles){
	if(!ele || ele.nodeType ==3 || ele.nodeType == 8 || ele.style)return ele;
	for(var css in styles){
		ele.style[css] = styles[css];
	}
	return ele;
}

strToJson = function(str){
	return type JSON == 'object' ? JSON.parse(str) : (new Function('return '+str))();
}

filterWord = function(ele){
  var txt = ele.value.trim();
  for(var i in banWords){
  	 var word = banWords[i];
  	 txt = txt.replace(word,'');
  }
}

autoRow.style.overflowY = 'hidden';
autoRow.onkeyup = function(){
	this.style.height = this.scrollHeight;
}

selectOptions.onchange = function(){
	this.value == '';
}

addOption = function(target,option){
	var ele = document.createElement('OPTION');
	ele.value = option.value;
	ele.text = option.text;
	target.options.add(ele);
}

removeOption = function(target,option){
	target.options.remove(option);
}

