var domUtil = {	
	getScreenPos:function(){
		var leftPos = window.screenLeft?window.screenLeft:window.screenX;
		var topPos = window.screenTop?window.screenTop:window.screenY;
		return {x:leftPos,y:topPos};
	},
	getWindowSize:function(){
		var pageWidth = window.innerWidth;
		var pageHeight = window.innerHeight;
		if(!pageWidth){
			if(document.compatMode == "CSS1Compat"){
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
			}else{
				pageWidth = document.body.clientWidth;
				pageHeight = document.body.clientHeight;
			}
		}
		return {width:pageWidth,height:pageHeight};
	},
	getDocumentSize:function(){
		var docHeight = Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
		var docWidth = Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);
		return {height:docHeight,width:docWidth};
	},
	getElementLeft:function(element){
		var left = 0;	
		while(element!=null){
			left += element.offsetLeft;		
			element = element.offsetParent;
		}
		return left;
	},
	getElementTop:function(element){	
		var top = 0;
		while(element!=null){		
			top += element.offsetTop;
			element = element.offsetParent;
		}
		return top;
	},	
	getBoundingClientRect:function(element){
		var scrollLeft = document.documentElement.scrollLeft;
		var scrollTop = document.documentElement.scrollTop;
		if(element.getBoundingClientRect){
			if(typeof arguments.callee.offset != "number"){
				var temp = document.createElement("a");
				temp.style.cssText = "position:absolute;left:0;top:0";
				document.body.insertBefore(temp,document.body.firstChild);
				arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
				document.body.removeChild(temp);
			}
			var rect = element.getBoundingClientRect();
			var offset = arguments.callee.offset;
			
			return {
				left:rect.left+offset,
				right:rect.right+offset,
				top:rect.top+offset,
				bottom:rect.bottom+offset
			};
		}else{
			var actualLeft = getElementLeft(element);
			var actualTop = getElementTop(element);
			
			return {
				left:actualLeft-scrollLeft,
				right:actualLeft+element.offsetWidth - scrollLeft,
				top:actualTop - scrollTop,
				bottom:actualTop + element.offsetHeight - scrollTop
			};
		}
	},
	getElementByClass:function(cls,tag,parent){
		parent = parent || document.body;
		tag = tag.toLowerCase() || "*";
		var childNodes = parent.childNodes;
		var  matchs = [];
		for(var i=0,len=childNodes.length;i<len;i++){
			var node = childNodes[i];
			if (tag !== "*" && tag!==node.nodeName.toLowerCase()){
				continue;
			}
			if(node.className.indexOf(cls)>-1){
				matchs.push(node);
			}
		}
		return matchs;
	},
	getSelectedText:function(textbox){
		if(document.selection){
			return document.selection.createRange().text;
		}else{
			return textbox.value.substring(textbox.selectionStart,text.selectionEnd);
		}
	},
	getInnerText:function(element){
		return (typeof element.textContent == "string")?element.textContent:element.innerText;
	},
	setInnerText:function(element,text){
		if(typeof element.textContent == "string"){
			element.textContent = text;
		}else{
			element.innerText = text;
		}
	},
	getComputedStyle:function(element){
		if (document.defaultView) {
			return document.defaultView.getComputedStyle(element,null);
		}else{
			return element.currentStyle;
		}
	},
	createDocument:function(){
		if(typeof arguments.callee.activeXString !="string"){
			var versions = ["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument"];
			for(var i=0,len=versions.length;i<len;i++){
				try{
					var xmldom = new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					return xmldom;
				}catch(ex){
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	},
	parseXml:function(xml){
		var xmldom = null;
		if(typeof DOMParser != "undefined"){
			xmldom = (new DOMParser()).parseFromString(xml,"text/xml");
			var errors = xmldom.getElementsByTagName("parsererror");
			if(errors.length){
				throw new Error("XML parsing error:"+error[0].textContent);
			}
		}else if(document.implementation.hasFeature("LS","3.0")){
			var implementation = document.implementation;
			var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUS,null);
			var input = implementation.createLSInput();
			input.stringData = xml;
			xmldom = parser.parse(input);
		}else if(typeof ActiveXObject != "undefined"){
			xmldom = createDocument();
			xmldom.loadXML(xml);
			if(xmldom.parseError != 0){
				throw new Error("XML parsing error:"+xmldom.parseError.reason);
			}
		}else{
			throw new Error("No XML parser available");
		}
		return xmldom;
	},
	serializeXml:function(xmldom){
		if(typeof XMLSerailizer != "undefined"){
			return (new XMLSerializer()).serializeToString(xmldom);
		}else if(document.implementation.hasFeature("LS","3.0")){
			var implementation = document.implementation;
			var serializer = implementation.createLSSerailizer();
			return serializer.writeToString(xmldom);
		}else if(typeof xmldom.xml !="undefined"){
			return xmldom.xml;
		}else{
			throw new Error("Could not serialize XML DOM.");
		}
	},
	selectSingleNode:function(context,expression,namespaces){
		var doc = (context.nodeType != 9 ?context.ownerDocument:context);
		if(typeof doc.evaluate != "undefined"){
			var nsresolver = null;
			if(namespaces instanceof object){
				nsresolver = function(prefix){
					return namespaces[prefix];
				};
			}
			var result = doc.evaluate(expression,context,nsresolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			return (result!==null?result.singleNodeValue:null);
		}else if(typeof context.selectSingleNode !="undefined"){
			if(namespaces instanceof Object){
				var ns = "";
				for(var prefix in namespaces){
					if(namespaces.hasOwnProperty(prefix)){
						ns += "xmlns:"+prefix + "='"+namespaces[prefix]+"'";
					}
				}
				doc.setProperty("SelectionNamespaces",ns);
			}
			return context.selectSingleNode(expression);
		}else{
			throw new Error('No XPath engine found.');
		}		
	},
	selectNodes:function(context,expression,namespaces){
		var doc = (context.nodeType != 9?context.ownerDocument:context)
		if(typeof doc.evaluate != "undefined"){	
			var nsresolver = null;
			if(namespaces instanceof Object){
				nsresolver = function(prefix){
					return namespaces[prefix];
				};
			}
			var result = doc.evaluate(expression,context,nsresolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var nodes = [];
			if(result !== null){
				for(var i=0,len=result.snapshotLength;i<len;i++){
					nodes.push(result.snapshotItem(i));
				}
			}
			return nodes;
		}else if(typeof context.selectNodes !="undefined"){
			if(namespaces instanceof Object){
				var ns = "";
				for(var prefix in namespaces){
					if(namespaces.hasOwnProperty(prefix)){
						ns += "xmlns:"+prefix+"='"+namespaces[prefix]+"'";
					}
				}
				doc.setProperty("SelectionNamespaces",ns);
			}
			var result = context.selectNodes(expression);
			var node = [];
			for(var i=0,len = result.length;i<len;i++){
				nodes.push(result[i]);
			}
			return nodes;
		}else{
			throw new Error('No XPath engine found.');
		}
	},
	transform:function(context,xslt){
		if(typeof XSLTProcessor != "undefined"){
			var processor = new XSLTProcessor();
			processor.importStylesheet(xslt);
			var result = processor.transformToDocument(context);
			return (new XMLSerializer()).serializeToString(result);
		}else if(typeof context.transformNode != "undefined"){
			return context.transformNode(xslt);
		}else{
			throw new Error("No XSLT processor available.");
		}
	}
};