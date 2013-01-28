/**
* lufylegend
* @version 1.3.1
* @Explain lufylegend是一个HTML5开源引擎，原名是legendForHtml5Programming，它实现了利用仿AS的语法进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
*/

var LEGEND_FILE_PHP = './php/file.php';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * LEvent.js
 **/
var LEvent = function (){this.type="LEvent";};
LEvent.COMPLETE = "complete";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.currentTarget = null;
LEvent.addEventListener = function (node, type, fun,boo){
	if(boo==null)boo=false;
	if(node.addEventListener){
		node.addEventListener(type, fun, false);
	}else if(node.attachEvent){
		node['e' + type + fun] = fun;
		node[type + fun] = function(){node['e' + type + fun]();};
		node.attachEvent('on' + type, node[type + fun]);
	}
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * LMouseEvent.js
 **/
var LMouseEvent = function (){this.type="LMouseEvent";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OUT = "mouseout";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * LKeyboardEvent.js
 **/
var LKeyboardEvent = function (){this.type="LKeyboardEvent";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PASS = "keypass";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * LAccelerometerEvent.js
 **/
var LAccelerometerEvent = function (){this.type="LAccelerometerEvent";};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * LString.js
 **/
var LString = function (){};
LString.trim = function (str){
	return str.replace(/(^\s*)|(\s*$)|(\n)/g, "");
};
LString.leftTrim = function (str){
	return str.replace(/(^\s*)|(^\n)/g, "");
};
LString.rightTrim = function (str){
	return str.replace(/(\s*$)|(\n$)/g, "");
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * LGlobal.js
 **/
var LGlobal = function (){};
LGlobal.type = "LGlobal";
LGlobal.traceDebug = false;
LGlobal.script = null;
LGlobal.stage = null;
LGlobal.isreading = "";
LGlobal.canvas = null;
LGlobal.width = 0;
LGlobal.height = 0;
LGlobal.objectIndex = 0;
LGlobal.childList = new Array();
LGlobal.buttonList = new Array();
LGlobal.isString = function (s){
	var patrn=/^([a-z]|[A-Z])+$/;
	return patrn.exec(s); 
};
LGlobal.isNumber = function (s){
	var patrn=/^\d+\.\d+$/;
	return patrn.exec(s); 
};
LGlobal.isInt = function (s){
	var patrn=/^\d+$/;
	return patrn.exec(s); 
};
LGlobal.setCanvas = function (id,width,height){
	LGlobal.canTouch = false;
	LGlobal.os = "pc";
	if (navigator.userAgent.indexOf('iPhone') > 0) {
		LGlobal.os = "iPhone";
		LGlobal.canTouch = true;
	}else if (navigator.userAgent.indexOf('iPod') > 0) {
		LGlobal.os = "iPod";
		LGlobal.canTouch = true;
	}else if (navigator.userAgent.indexOf('iPad') > 0) {
		LGlobal.os = "iPad";
		LGlobal.canTouch = true;
	}else if (navigator.userAgent.indexOf('Android') > 0) {
		LGlobal.os = "Android";
		LGlobal.canTouch = true;
	}
	LGlobal.id = id;
	LGlobal.window = window;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div id="' + LGlobal.id + '_inittxt" style="position:absolute;margin:0px 0px 0px 0px;width:'+width+'px;height:'+height+'px;background-color:#000000;">onloading……</div>' + 
	'<div style="position:absolute;margin:0px 0px 0px 0px;width:'+width+'px;height:'+height+'px;z-index:0;"><canvas id="' + LGlobal.id + '_canvas">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsofthates the Web and doesn't support HTML5 :(</p>"+ 
	'<p>'+ 
		'To play this game you need a good Browser, like'+ 
		'<a href="http://www.opera.com/">Opera</a>,'+ 
		'<a href="http://www.google.com/chrome">Chrome</a>,'+ 
		'<a href="http://www.mozilla.com/firefox/">Firefox</a> or'+ 
		'<a href="http://www.apple.com/safari/">Safari</a>.'+ 
	'</p>'+  
	'</div>'+  
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;"><textarea rows="1" id="' + LGlobal.id + '_InputTextBox" /></div>';
	LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextBox = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.inputTextField = null;
	if(width)LGlobal.canvasObj.width = width;
	if(height)LGlobal.canvasObj.height = height;
	LGlobal.width = LGlobal.canvasObj.width;
	LGlobal.height = LGlobal.canvasObj.height;
	LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
	LGlobal.offsetX = 0;
	LGlobal.offsetY = 0;
    //LGlobal.canvas.scale(-1,1);
	//LGlobal.canvas.translate(LGlobal.width/2,LGlobal.height/2); 
    //LGlobal.canvas.rotate(-Math.PI/8);
    if(LGlobal.canTouch){
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
    		if(LGlobal.inputBox.style.display != "none"){
    			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
    			LGlobal.inputBox.style.display = "none";
    		}
    		var eve = {offsetX:event.touches[0].pageX,offsetY:event.touches[0].pageY};
        	LGlobal.offsetX = eve.offsetX;
        	LGlobal.offsetY = eve.offsetY;
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
        	LGlobal.touchHandler(event);
    	});
	    LEvent.addEventListener(document,LMouseEvent.TOUCH_END,function(event){
    		var eve = {offsetX:LGlobal.offsetX,offsetY:LGlobal.offsetY};
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_UP);
        	LGlobal.touchHandler(event);
    	});
        LEvent.addEventListener(document,LMouseEvent.TOUCH_MOVE,function(event){
    		var eve = {offsetX:event.touches[0].pageX,offsetY:event.touches[0].pageY};
        	LGlobal.mouseMoveEvent = eve;
        	LGlobal.offsetX = eve.offsetX;
        	LGlobal.offsetY = eve.offsetY;
        	LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
        	LGlobal.touchHandler(event);
    	});
    }else{
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(event){
        	if(event.offsetX == null && event.clientX != null){
        		event.offsetX = event.clientX - 8;
        		event.offsetY = event.clientY - 8;
        	}
    		if(LGlobal.inputBox.style.display != "none"){
    			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
    			LGlobal.inputBox.style.display = "none";
    		}    		
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_DOWN);
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(event){
        	if(event.offsetX == null && event.clientX != null){
        		event.offsetX = event.clientX - 8;
        		event.offsetY = event.clientY - 8;
        	}
        	LGlobal.mouseMoveEvent = event;
        	LGlobal.offsetX = event.offsetX;
        	LGlobal.offsetY = event.offsetY;
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_MOVE);
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(event){
        	if(event.offsetX == null && event.clientX != null){
        		event.offsetX = event.clientX - 8;
        		event.offsetY = event.clientY - 8;
        	}
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_UP);
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(event){
        	if(event.offsetX == null && event.clientX != null){
        		event.offsetX = event.clientX - 8;
        		event.offsetY = event.clientY - 8;
        	}
        	LGlobal.mouseEvent(event,LMouseEvent.MOUSE_OUT);
    	});
    }
} ;
LGlobal.touchHandler = function(event){
	event.stopPropagation();
	event.preventDefault();
	if(event.stopImmediatePropagation){
		event.stopImmediatePropagation();
	}
	return event;
};
LGlobal.mouseEvent = function(event,type){
	var key = null;
	for(key in LGlobal.childList){
		if(LGlobal.childList[key].mouseEvent){
			LGlobal.childList[key].mouseEvent(event,type);
		}
	}
};
LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
    LGlobal.canvas.clearRect(0,0,LGlobal.width,LGlobal.height);	
	LGlobal.buttonShow(LGlobal.buttonList);    
	LGlobal.show(LGlobal.childList);
};
LGlobal.buttonShow = function(buttonlist){
	var key = null;
	for(key in buttonlist){
		if(buttonlist[key].buttonModeChange){
			buttonlist[key].buttonModeChange();
		}
   }
};
LGlobal.show = function(showlist,cood){
	if(cood == null)cood={x:0,y:0};
	var key = null;
	for(key in showlist){
		if(showlist[key].show){
			showlist[key].show(cood);
		}
	}
};
LGlobal.divideCoordinate = function (w,h,row,col){
	var i,j;
	var cWidth = w/col;
	var cHeight = h/row;
	var resultArray = new Array();
	for(i=0;i<row;i++){
		var childArray=new Array();
		for(j=0;j<col;j++){
			childArray.push({x:cWidth*j,y:cHeight*i});
		}
		resultArray.push(childArray);
	}
	return resultArray;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* PageProperty.js
**/
var ON = "on";
function legendLoadOver(){
	document.getElementById(LGlobal.id+"_inittxt").innerHTML="";
}
function trace(){
	if(!LGlobal.traceDebug)return;
	var traceObject = document.getElementById("traceObject");
	if(trace.arguments.length > 0 && traceObject == null){
		traceObject = document.createElement("div");
		traceObject.id = "traceObject";
		traceObject.style.position = "absolute";
		traceObject.style.top = (LGlobal.height + 20) + "px";
		document.body.appendChild(traceObject);
	}
	for(var i=0; i < trace.arguments.length; i++){
	   traceObject.innerHTML=traceObject.innerHTML+trace.arguments[i] + "<br />";
	}
}
function addChild(DisplayObject){
	DisplayObject.parent = "root";
	LGlobal.childList.push(DisplayObject);
}
function removeChild(DisplayObject){
	for(var i=0;i<LGlobal.childList.length;i++){
		if(DisplayObject.objectindex == LGlobal.childList[i].objectindex){
			if(DisplayObject.die)DisplayObject.die();
			LGlobal.childList.splice(i,1);
			break;
		}
	}
}
function init(speed,canvasname,width,height,func){
	LEvent.addEventListener(window,"load",function(){
		setInterval(function(){LGlobal.onShow();}, speed);
		LGlobal.setCanvas(canvasname,width,height);
		func();
	});
}
function base(derive,baseSprite,baseArgs){
	baseSprite.apply(derive,baseArgs);
	for(prop in baseSprite.prototype){
		var proto = derive.constructor.prototype;
		if(!proto[prop]){
			proto[prop] = baseSprite.prototype[prop];
		}
		proto[prop]["super"] = baseSprite.prototype;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LLoader.js
**/
function LLoader(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type="LLoader";
	self.loadtype = "";
	self.content = null;
	self.oncomplete = null;
	self.event = {};
}
LLoader.prototype = {
	addEventListener:function(type,listener){
		var self = this;
		if(type == LEvent.COMPLETE){
			self.oncomplete = listener;
		}
	},
	load:function (src,loadtype){
		var self = this;
		self.loadtype = loadtype;
		if(self.loadtype == "bitmapData"){
			self.content = new Image();
			self.content.onload = function(){
				if(self.oncomplete){
					self.event.currentTarget = self.content;
					self.oncomplete(self.event);
				}
			};
			self.content.src = src; 
		}
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LURLLoader.js
**/
function LURLLoader(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type="LURLLoader";
	self.loadtype = "";
	self.content = null;
	self.oncomplete = null;
	self.event = {};
}
LURLLoader.prototype = {
	addEventListener:function(type,listener){
		var self = this;
		if(type == LEvent.COMPLETE){
			self.oncomplete = listener;
		}
	},
	load:function (path,loadtype){
		var self = this;
		self.loadtype = loadtype;
		if(self.loadtype == "text"){
			$.post(LEGEND_FILE_PHP, {
				flg:"read",
				file:path
			},function(data){
				if(self.oncomplete){
					self.event.currentTarget = data;
					self.event.target = self;
					self.data = data;
					self.oncomplete(self.event);
				}
			});
		}
	},
	die:function (){
		
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LGraphics.js
**/
function LGraphics(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LGraphics";
	self.color = "#000000";
	self.i = 0;
	self.alpha = 1;
	self.setList = new Array();
	self.showList = new Array();
}
LGraphics.prototype = {
	show:function (cood){
		if(cood==null || cood == "undefined")cood={x:0,y:0};
		var self = this;
		if(self.setList.length == 0)return;
		var key = null;
		for(key in self.setList){
			self.setList[key](cood.x,cood.y);
		}
	},
	lineWidth:function (thickness){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.lineWidth = thickness;});
	},
	strokeStyle:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.strokeStyle = color;});
	},
	stroke:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.moveTo(x,y);});
	},
	lineTo:function (x,y){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.lineTo(x,y);});
	},
	clear:function (){
		var self = this;
		self.setList.splice(0,self.setList.length);
		self.showList.splice(0,self.showList.length);
	},
	rect:function (x,y,width,height){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.rect(x, y, width, height);});
		self.showList.push({type:"rect",value:[x,y,width,height]});
	},
	fillStyle:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.fillStyle = color;});
	},
	fill:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,radius,startAngle,endAngle,anticlockwise){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.arc(x,y,radius,startAngle,endAngle,anticlockwise);});
	},
	drawArc:function(thickness,lineColor,pointArray,isfill,color){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.arc(pointArray[0]+cx,pointArray[1]+cy,pointArray[2],pointArray[3],pointArray[4],pointArray[5]);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"arc",value:pointArray});
	},
	drawRect:function (thickness,lineColor,pointArray,isfill,color){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.rect(pointArray[0]+cx,pointArray[1]+cy,pointArray[2],pointArray[3]);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"rect",value:pointArray});
	},
	drawLine:function (thickness,lineColor,pointArray){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.moveTo(pointArray[0]+cx,pointArray[1]+cy);
			LGlobal.canvas.lineTo(pointArray[2]+cx,pointArray[3]+cy);
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.closePath();
			LGlobal.canvas.stroke();
		});
	},
	lineStyle:function (thickness,color,alpha){
		var self = this; 
		if(color==null)color=self.color;
		if(alpha==null)alpha=self.alpha;
		self.color = color;
		self.alpha = alpha;
		self.setList.push(function(){
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = color;
		});
	},
	add:function (fun){
		var self = this;
		self.setList.push(fun);
	},
	ismouseon:function(event,cood){
		var self = this;
		var key = null;
		if(event==null || event == "undefined")return false;
		if(cood==null || cood == "undefined")cood={x:0,y:0};
		var ox,oy;
		if(event.offsetX == "undefined"){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(ox >= self.showList[key].value[0] + cood.x && ox <= self.showList[key].value[0] + cood.x + self.showList[key].value[2] && 
					oy >= self.showList[key].value[1] + cood.y && oy <= self.showList[key].value[1] + cood.y + self.showList[key].value[3]){
					return true;
				}
			}else if(self.showList[key].type == "arc"){
				var xl = self.showList[key].value[0] + cood.x - ox;
				var yl = self.showList[key].value[1] + cood.y - oy;
				return xl*xl+yl*yl <= self.showList[key].value[2]*self.showList[key].value[2];
			}
		}		
		return false;
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LSprite.js
**/
function LSprite(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LSprite";
	self.x = 0;
	self.y = 0;
	self.alpha = 1;
	self.visible=true;
	self.childList = new Array();
	self.frameList = new Array();
	self.mouseList = new Array();
	self.graphics = new LGraphics();
	self.graphics.parent = self;
	self.width = 0;
	self.height = 0;
}
LSprite.prototype = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(!self.visible)return;
		self.graphics.show({x:self.x+cood.x,y:self.y+cood.y});
		if(self.alpha < 1){
			LGlobal.canvas.save();  
			LGlobal.canvas.globalAlpha = self.alpha;
		}
		LGlobal.show(self.childList,{x:self.x+cood.x,y:self.y+cood.y});
		if(self.alpha < 1){
			LGlobal.canvas.restore(); 
		}
		self.loopframe();
	},
	loopframe:function (){
		var self = this;
		var key = null;
		for(key in self.frameList){
			self.frameList[key]();
		}
	},
	addChild:function (DisplayObject){
		var self  = this;
		DisplayObject.parent = self;
		self.childList.push(DisplayObject);
		self.resize();
	},
	removeChild:function(DisplayObject){
		var self  = this;
		for(var i=0;i<self.childList.length;i++){
			if(DisplayObject.objectindex == self.childList[i].objectindex){
				if(DisplayObject.die)DisplayObject.die();
				self.childList.splice(i,1);
				break;
			}
		}
		self.resize();
	},
	getChildAt:function(i){
		var self  = this;
		if(self.childList.length == 0 || self.childList.length <= i)return null;
		return self.childList[i];
	},
	removeChildAt:function(i){
		var self  = this;
		if(self.childList.length >= i)return;
		self.childList[i].die();
		self.childList.splice(i,1);
		self.resize();
	},
	resize:function(){
		var self  = this;
		var sx = 0,sy = 0,ex = 0,ey = 0;
		for(var i=0;i<self.childList.length;i++){
			if(sx > self.childList[i].x){
				sx = self.childList[i].x;
			}
			if(ex < self.childList[i].width + self.childList[i].x){
				ex = self.childList[i].width + self.childList[i].x;
			}
			if(sy > self.childList[i].y){
				sy = self.childList[i].y;
			}
			if(ey < self.childList[i].height + self.childList[i].y){
				ey = self.childList[i].height + self.childList[i].y;
			}
		}
		self.width = ex - sx;
		self.height = ey - sy;
	},
	removeAllChild:function(){
		var self  = this;
		for(var i=0;i<self.childList.length;i++){
			if(self.childList[i].die)self.childList[i].die();
		}
		self.childList.splice(0,self.childList.length);
		self.width = 0;
		self.height = 0;
	},
	addEventListener:function (type,listener){
		var self = this;
		if(type == LEvent.ENTER_FRAME){
			self.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0){
			self.mouseList.push({listener:listener,type:type});
		}else if(type.indexOf("touch")>=0){
			self.mouseList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function (type,listener){
		var self = this;
		var i,length = self.frameList.length;
		for(i=0;i<length;i++){
			if(type == LEvent.ENTER_FRAME && self.frameList[i] == listener){
				self.frameList.splice(i,1);
				break;
			}
		}
		length = self.mouseList.length;
		for(i=0;i<length;i++){
			if(type == self.mouseList[i].type && self.mouseList[i].listener == listener){
				self.mouseList.splice(i,1);
				break;
			}
		}
	},
	mouseEvent:function (event,type,cood){
		if(event==null || event == "undefined")return false;
		if(cood==null)cood={x:0,y:0};
		var self = this;
		var isok;
		var ox,oy;
		if(event.offsetX == "undefined"){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		for(key in self.childList){
			if(self.childList[key].mouseEvent){
				isok = self.childList[key].mouseEvent(event,type,{x:self.x+cood.x,y:self.y+cood.y});
				if(isok)return true;
			}
		}
		if(self.mouseList.length == 0){
			return false;
		}
		var key = null;
		var isclick = self.ismouseon(event, cood);
		if(isclick){
			for(key in self.mouseList){
				var obj = self.mouseList[key];
				if(obj.type == type){
					event.selfX = ox - (self.x+cood.x);
					event.selfY = oy - (self.y+cood.y);
					event.currentTarget = self;
					obj.listener(event,self);
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(event,cood){
		var self = this;
		if(!self.visible || event==null )return false;
		var key = null;
		var isclick = false;
		for(key in self.childList){
			if(self.childList[key].ismouseon)isclick = self.childList[key].ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y});
			if(isclick)break;
		}
		if(!isclick && self.graphics){
			isclick = self.graphics.ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y});
		}
		return isclick;
	},
	die:function (){
		var self = this;
		self.graphics.clear();
		self.frameList.splice(0,self.frameList.length);
		self.mouseList.splice(0,self.mouseList.length);
		var key = null;
		for(key in self.childList){
			if(self.childList[key].die)self.childList[key].die();
		}
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LButton.js
**/
function LButton(bitmap_up,bitmap_over){
	base(this,LSprite,[]);
	var self = this;
	self.type = "LButton";
	self.bitmap_up = bitmap_up;
	self.addChild(bitmap_up);
	if(bitmap_over == null){
		bitmap_over = bitmap_up;
	}else{
		self.addChild(bitmap_over);
	}
	self.bitmap_over = bitmap_over;
	self.bitmap_over.visible = false;
	self.bitmap_up.visible = true;
	LGlobal.buttonList.push(self);
}
LButton.prototype.buttonModeChange = function (){
	var self = this;
	var cood={x:0,y:0};
	var parent = self.parent;
	while(parent != "root"){
		cood.x += parent.x;
		cood.y += parent.y;
		parent = parent.parent;
	}
	if(self.ismouseon(LGlobal.mouseMoveEvent,cood)){
		self.bitmap_up.visible = false;
		self.bitmap_over.visible = true;
	}else{
		self.bitmap_over.visible = false;
		self.bitmap_up.visible = true;
	}
};
LButton.prototype.die = function (){
	var self = this;
	arguments.callee["super"].die.call(this);
	for(var i=0;i<LGlobal.buttonList.length;i++){
		if(LGlobal.buttonList[i].objectindex == self.objectindex){
			LGlobal.buttonList.splice(i,1);
			break;
		}
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LTextFieldType.js
**/
var LTextFieldType = function (){};
LTextFieldType.type = "LTextFieldType";
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LTextField.js
**/
function LTextField(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LTextField";
	self.texttype = null;
	self.x = 0;
	self.y = 0;
	self.text = "";
	self.font = "utf-8";
	self.size = "11";
	self.color = "#000000";
	self.textAlign = "left";
	self.textBaseline = "middle";
	self.lineWidth = 1;
	self.width = 150;
	self.height = 20;
	self.stroke = false;
	self.visible=true;
}
LTextField.prototype = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(!self.visible)return;
		if(self.texttype == LTextFieldType.INPUT){
			self.inputBackLayer.show({x:self.x+cood.x,y:self.y+cood.y});
	    	if(LGlobal.inputBox.name == "input"+self.objectindex){
	    		LGlobal.inputBox.style.marginTop = (self.y+cood.y) + "px";
	    		LGlobal.inputBox.style.marginLeft = (self.x+cood.x) + "px";
	    	}
		}
	    LGlobal.canvas.font = self.size+"pt "+self.font;  
	    LGlobal.canvas.textAlign = self.textAlign;
	    LGlobal.canvas.textBaseline = self.textBaseline;
	    LGlobal.canvas.lineWidth = self.lineWidth;  
	    if(self.stroke){
		    LGlobal.canvas.strokeStyle = self.color;
	    	LGlobal.canvas.strokeText(self.text,parseFloat(cood.x) + parseFloat(self.x),
	    		parseFloat(cood.y) + parseFloat(self.y) + parseFloat(self.size),
	    		LGlobal.canvas.measureText(self.text).width);  
	    }else{
		    LGlobal.canvas.fillStyle = self.color;
	    	LGlobal.canvas.fillText(self.text,parseFloat(cood.x) + parseFloat(self.x),
		    		parseFloat(cood.y) + parseFloat(self.y) + parseFloat(self.size),
		    		LGlobal.canvas.measureText(self.text).width);
	    }
	    if(self.wind_flag){
	    	self.windRun();
	    }
	},
	setType:function(type){
		var self = this;
		if(self.texttype != type && type == LTextFieldType.INPUT){
			self.inputBackLayer = new LSprite();
			self.inputBackLayer.graphics.drawRect(1,"black",[0, 0, self.width, self.height],true,"#cccccc");
			self.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(self.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+self.objectindex;
	    		LGlobal.inputTextField = self;
	    		LGlobal.inputTextBox.value = self.text;
	    		LGlobal.inputTextBox.style.height = self.height+"px";
	    		LGlobal.inputTextBox.style.width = self.width+"px";
			});
		}else{
			self.inputBackLayer = null;
		}
		self.texttype = type;
	},
	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(self.inputBackLayer == null)return;
		self.inputBackLayer.mouseEvent(event,type,{x:self.x+cood.x,y:self.y+cood.y});
	},
	wind:function(listener){
		var self = this;
		self.wind_over_function = listener;
		self.wind_flag = true;
		self.wind_text = self.text;
		self.text = "";
		self.wind_length = 0;
	},
	windRun:function(){
		var self = this;
		if(self.wind_length > self.wind_text.length){
			self.wind_flag = false;
			if(self.wind_over_function)self.wind_over_function();
			return;
		}
		self.text = self.wind_text.substring(0,self.wind_length);
		self.wind_length++;
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LLabel.js
**/
function LLabel(){
	var self = this;
	base(self,LTextField,[]);
	self.width = LGlobal.width;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LBitmap.js
**/
function LBitmap(bitmapdata){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LBitmap";
	self.x = 0;  
	self.y = 0;  
	self.width = 0;  
	self.height = 0;  
	self.scaleX=1;
	self.scaleY=1;
	self.alpha = 1;
	self.visible=true;
	self.rotate = 0;
	self.bitmapData = bitmapdata; 
	if(self.bitmapData){
		self.width = self.bitmapData.width;
		self.height = self.bitmapData.height;
	}
}
LBitmap.prototype = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(!self.visible)return;
		if(self.rotate != 0){
			var rx,ry ;
			rx = cood.x + self.x+self.bitmapData.width*self.scaleX/2;
			ry = cood.y + self.y+self.bitmapData.height*self.scaleY/2;
			LGlobal.canvas.save();  
			LGlobal.canvas.translate( rx, ry); 
			LGlobal.canvas.rotate(self.rotate * Math.PI / 180);
			LGlobal.canvas.translate(0-rx,0-ry); 
			if(self.alpha < 1){ 
				LGlobal.canvas.globalAlpha = self.alpha;
			}
			LGlobal.canvas.drawImage(self.bitmapData.image,
					self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
					cood.x + self.x ,cood.y + self.y ,self.width*self.scaleX,self.height*self.scaleY);
			LGlobal.canvas.restore();  
		}else{
			if(self.alpha < 1){
				LGlobal.canvas.save();  
				LGlobal.canvas.globalAlpha = self.alpha;
			}
			LGlobal.canvas.drawImage(self.bitmapData.image,
				self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
				cood.x + self.x,cood.y + self.y,self.width*self.scaleX,self.height*self.scaleY);
			if(self.alpha < 1){
				LGlobal.canvas.restore(); 
			}
		}
	},
	ismouseon:function(event,cood){
		var self = this;
		if(cood==null)cood={x:0,y:0};
		if(event==null || event == "undefined")return false;
		var ox,oy;
		if(event.offsetX == "undefined"){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		if(event.offsetX >= self.x + cood.x && ox <= self.x + cood.x + self.bitmapData.width*self.scaleX && 
			event.offsetY >= self.y + cood.y && oy <= self.y + cood.y + self.bitmapData.height*self.scaleY){
			return true;
		}else{
			return false;
		}
	},
	getWidth:function(){
		var self = this;
		return self.bitmapData != null?self.bitmapData.width*self.scaleX:0;
	},
	getHeight:function(){
		var self = this;
		return self.bitmapData != null?self.bitmapData.height*self.scaleY:0;
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LBitmapData.js
**/
function LBitmapData(image,x,y,width,height){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LBitmapData";
	self.oncomplete = null;
	if(image){
		self.image = image;
		self.x = (x==null?0:x);  
		self.y = (y==null?0:y);  
		self.width = (width==null?self.image.width:width);  
		self.height = (height==null?self.image.height:height);
	}else{
		self.x = 0;  
		self.y = 0;  
		self.width = 0;  
		self.height = 0;
		self.image = new Image();
	}
}
LBitmapData.prototype = {
	setProperties:function (x,y,width,height){
		var self = this;
		self.x = x;
		self.y = y;
		self.width = width;
		self.height = height;
	},
	setCoordinate:function (x,y){
		var self = this;
		self.x = x;
		self.y = y;
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LAnimation.js
**/
function LAnimation(layer,data,list){
	base(this,LSprite,[]);
	var self = this;
	self.rowIndex = 0;
	self.colIndex = 0;
	self.overActionFun = null;
	self.bitmap =  new LBitmap(data);
	self.imageArray = list;
	self.addChild(self.bitmap);
	if(layer != null)layer.addChild(self);
};
LAnimation.prototype.setAction = function (rowIndex,colIndex){
	var self = this;
	if(rowIndex != null && rowIndex >= 0 && rowIndex < self.imageArray.length)self.rowIndex = rowIndex;
	if(colIndex != null && colIndex >= 0 && colIndex < self.imageArray[rowIndex].length)self.colIndex = colIndex;
};
LAnimation.prototype.getAction = function (){
	var self = this;
	return [self.rowIndex,self.colIndex];
};
LAnimation.prototype.onframe = function (){
	var self = this;
	self.bitmap.bitmapData.setCoordinate(self.imageArray[self.rowIndex][self.colIndex].x,self.imageArray[self.rowIndex][self.colIndex].y);
	self.colIndex++;
	if(self.colIndex >= self.imageArray[self.rowIndex].length){
		self.colIndex = 0;
		if(self.overActionFun != null)self.overActionFun(self);
	}
};
LAnimation.prototype.addEventListener = function (type,listener){
	var self = this;
	arguments.callee["super"].die.call(this);
	if(type == LEvent.COMPLETE){
		self.overActionFun = listener;
	}
};
LAnimation.prototype.removeEventListener = function (type,listener){
	var self = this;
	arguments.callee["super"].die.call(this);
	if(type == LEvent.COMPLETE){
		self.overActionFun = null;
	}
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LAnimationMovie.js
**/
function LAnimationMovie(data,imgArray,speed){
	if(speed == null)speed = 1;
	base(this,LSprite,[]);
	var self = this;
	trace("LAnimationMovie.js");
	self.animation = new LAnimation(self,data,imgArray);
	self.speedIndex = 1;
	self.speed = speed;
	trace("LAnimationMovie.js onFrame self.speedIndex="+self.speedIndex + ",self.speed="+self.speed);
	self.addEventListener(LEvent.ENTER_FRAME,self.onFrame);
};
LAnimationMovie.prototype.onFrame = function (event){
	var self = this;
	trace("LAnimationMovie onFrame event="+self);
	if(!(self.speedIndex++ % self.speed == 0))return;
	self.speedIndex -= self.speed;
	self.animation.onframe();
	trace("LAnimationMovie onFrame");
};
LAnimationMovie.prototype.action = function (value){
	var self = this;
	self.animation.setAction(value);
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* LDisplay.js
**/
function LDisplay(){}
LDisplay.drawRect = function (_target,pointArray,fill,color,alpha,thickness){
	if(fill==null)fill=false;
	if(color==null)color="#000000";
	if(alpha==null)alpha=1;
	if(thickness==null)thickness=1;
	_target.drawRect(1,color,pointArray,fill,color);
	/**
	if(fill){
		_target.drawRect(1,"black",[20, 20, 150, 20],true,"#cccccc");
		_target.lineStyle(thickness,color,alpha);
		_target.beginFill(color,alpha);
	}else{
		_target.lineStyle(thickness,color,alpha);
	}
	_target.drawRect(pointArray[0],pointArray[1],pointArray[2],pointArray[3]);
	if(fill){
		_target.endFill();
	}*/
};
