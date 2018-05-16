// 圣杯模式(继承)
	function inherit(Target,Origin) {
		function F() {}
		F.prototype = Origin.prototype;
		Target.prototype = new F();
		Target.prototype.constuctor = Target;
		Target.prototype.uber = Origin.prototype;
	}// Target继承Origin

	// 立即执行函数写法
	// var inherit = (function() {
	// 	var F = function () {};
	// 	return function(Target,Origin) {
	// 	F.prototype = Origin.prototype;
	// 	Target.prototype = new F();
	// 	Target.prototype.constuctor = Target;
	// 	Target.prototype.uber = Origin.prototype;
	// 	}
	// }());

	// Father.prototype.lastName = 'wang';
	// function Father() {		
	// }
	// function Son() {
	// }
	// inherit(Son,Father);
	// var son = new Son();
	// var father = new Father();

// 深度克隆
	// function deepClone(Target,Origin) {
	// 	var Origin = Origin || {};
	// 	for (var prop in Target) {
	// 		if (Target.hasOwnProperty(prop)) {
	// 			if (Target[prop] !== 'null' && typeof(Target[prop]) === 'object') {
	// 				if (Object.prototype.toString.call(Target[prop]) === '[object Array]') {
	// 					Origin[prop] = [];
	// 				}else {
	// 					Origin[prop] = {};
	// 				}
	// 		//Origin[prop] = Object.prototype.toString.call(Target[prop]) === '[object Array]' ? [] :{}//
	// 				deepClone(Target[prop],Origin[prop]);
	// 			}else {
	// 				Origin[prop] = Target[prop];
	// 			}
	// 		}
	// 	}
	// 	return Origin;
	// }

//保留同名数据的深度克隆
	function deepClone(Target, Origin) {
		var src,
			copy,
			prop;
		if(Origin != null) {
			for(prop in Origin) {
				src = Target[prop];
				copy = Origin[prop];
				if(copy && typeof copy == 'object') {
					if(Object.prototype.toString.call(copy) == '[object Array]') {
						src = src ? src : [];
					}else {
						src = src ? src : {};
					}
					Target[prop] = deepClone(src, copy);
				}else {
					Target[prop] = copy;
				}
			}
			return Target;
		}
	}

	//Origin深度克隆Target//

	// var obj = {
	// 	name : 'wang',
	// 	age : 21,
	// 	card : ['gongshang','youzheng'],
	// 	school : {
	// 		middle : '69',
	// 		high : 'songlei',
	// 		university : 'haligong'
	// 	}
	// }
	// var Cobj = {
	// }
	// deepClone(obj,Cobj);


// type类型判断
	function type(Target) {
		var template = {
			'[object Array]' : 'array',
			'[object Object]' : 'object',
			'[object String]' : 'string - object',
			'[object Nember]' : 'number - object',
			'[object Boolean]' : 'boolean - object'
		}
		if (Target == null) {
			return 'null';
		}else if (typeof(Target) == 'object') {
			return template[Object.prototype.toString.call(Target)];
		}else {
			return typeof(Target);
		}
	}


//查看滚动条滚动距离
	function getScrollOffset() {
		if (window.pageXOffset) {
			return {
				x : window.pageXOffset,
				y : window.pageYOffset
			}
		}else {
			return {
				x : document.documentElement.scrolLeft + document.body.scrolLeft,
				y : document.documentElement.scrolTop + document.body.scrolTop
			}
		}
	}

// 查看屏幕尺寸
	function getViewportOffset() {
		if (window.innerWidth) {
			return {
				width : window.innerWidth,
				height : window.innerHight
			}
		}
		if (window.compatMode == 'CSS1Compat') {
			return {
				width : document.documentElement.clientWidth,
				height : document.documentElement.clientHight
			}
		}else if (window.compatMode == 'BackCompat') {
			return {
				width : document.body.clientWidth,
				height : document.body.clientHight
			}
		}
	}


// 获取DOM样式（ie兼容）
	function getStyle(elem, style) {
	    if (window.getComputedStyle) {
	        return window.getComputedStyle(elem, null)[style];
	    }else{
	        return elem.currentStyle[style];
	    }
	}


// 绑定事件
	function addEvent(elem, type, handler) {
	    if (elem.addEventListener) {
	        elem.addEventListener(type, handler, false);
	    }else if (elem.attachEvent) {
	        elem['temp' + type + handler] = handler;
	        elem['temp' + type] = function () {
	            handler.call(elem);
	        }
	        elem.attachEvent('on' + type, elem['temp' + type]);
	    }else {
	        elem['on' + type] = handler;
	    }
	}

// 解绑事件
	function removeEvent(elem, type, handler) {
	    if (elem.removeEventListener) {
	        elem.removeEventListener(type, handler, false);
	    }else if (elem.detachEvent) {
	        elem.detachEvent('on' + type,handler);
	    }else {
	        elem['on' + type] = false;
	    }
	}


// 取消冒泡
	function stopBubble (e) {
	    var event = e || window.event;
	    if(e.stopPropagation) {
	        e.stopPropagation();
	    }else{
	        e.cancelBubble = true;
	    }
	}
	// elem.addEventListener('click', function(e) {
	// 	.....
	// 	stopBubble(e);
	// }, false)

// 阻止默认事件
	function cancelHandler (e) {
	    var event = e || window.event;
	    if(e.preventDefault) {
	        e.preventDefault();
	    }else if(e.returnValue) {
	        e.returnValue = false;
	    }
	}

// 事件委托
	// function() {
	// 	var event = event || window.event;
	// 	var target = event.target || event.srcElement;
	// 	//获取源生事件兼容写法
	// 	......
	// }
	

//拖拽函数
	function drag (elem) {
	    elem.onmousedown = function (e) {
	    	var event = e || window.event,
	        	elemX = event.offsetX,
	            elemY = event.offsetY;
	    	document.onmousemove = function (e) {
	        	var event = e || window.event;
	            elem.style.top = e.clientY - elemY + 'px';
	            elem.style.left = e.clientX - elemX + 'px';
	        };
	    };
	    document.onmouseup = function (e) {
	    	var event = e || window.event;
	        document.onmousemove = false;   
	    };
	}


//多物体 多值 链式变动框架  
	function move (elem, data, func) {
		var iSpeed, iCur;
		clearInterval(elem.timer);
		elem.timer = setInterval(function () {
			for(var prop in data) {
				var key = true;
				if(prop == 'opacity') {
					iCur = parseFloat(getStyle(elem, prop)) * 100;
				}else {
					iCur = parseInt(getStyle(elem, prop));
				}
				iSpeed = (data[prop] - iCur) / 7;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(prop == 'opacity') {
					elem.style[prop] = (iCur + iSpeed) / 100;
				}else {
					elem.style[prop] = iCur + iSpeed + 'px';
				}
				if(iCur != data[prop]) {
					key = false;
				}
				if(key) {
					clearInterval(elem.timer);
					func = typeof func == 'function' ? func() : '';
				}
			}
		}, 30)
	}


// 弹性运动
	function elasticMove (elem, end) {
		var speed = 0, cur, a, u = 0.8;
		clearInterval(elem.timer);
		elem.timer = setInterval(function () {
			cur = parseInt(elem.offsetLeft);
			a = (end - cur) / 5;
			speed += a;
			speed *= u
			if(Math.abs(speed) <= 1 && Math.abs(elem.offsetLeft - end) <= 1) {
				elem.style.left = end + 'px';
				clearInterval(elem.timer);
			}else {
				elem.style.left = cur + speed + 'px';
			}
		}, 30)
	}


// 封装高兼容性的getByClassName函数
	Document.prototype.getByClassName = function (className) {
		var allElement = document.getElementsByTagName('*'),
			allElementArr = Array.prototype.slice.call(allElement),
			filterElement = [];
			
		function dealClass (dom) {
			var reg = /\s+/g;
			var arrClassName = dom.className.replace(reg, ' ').trim();
			return arrClassName;
		}

		allElementArr.forEach(function (elem, index) {
			var itemClassArr = dealClass(elem).split(' ');
			for(var i = 0; i < itemClassArr.length; i++) {
				if(itemClassArr[i] == className)
					filterElement.push(elem);
					break;
			}
		})

		return filterElement;
	}





