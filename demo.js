var oUl = document.getElementsByTagName('ul')[0];
var oIndex = document.getElementsByTagName('ul')[1].children;
var btnLeft = document.getElementsByTagName('span')[0];
var btnRight = document.getElementsByTagName('span')[1];
var wrapper = document.getElementsByClassName('wrapper')[0];
var len = oUl.children.length - 1;
var oWidth = oUl.children[0].offsetWidth;
var lock = true;
var count = 0;
var timer;
var index = 0;

//自动轮播
timer = setInterval(omove, 1500);

//按钮点击轮播
btnLeft.onclick = function () {
	omove('<');
}
btnRight.onclick = function () {
	omove('>');
}

//鼠标进入暂停轮播 离开继续轮播
wrapper.onmouseenter = function () {
	clearInterval(timer);
}
wrapper.onmouseleave = function () {
	timer = setInterval(omove, 1500);
}

 //点击小圆标进行跳转
 for(var j = 0; j < len; j++) {
 	(function (j) {	
	 	oIndex[j].onclick = function () {
	 		lock = false;
	 		move(oUl, {left : -j * oWidth}, function () {
	 			lock = true;
	 		})
	 		index = j
	 		indexChange(index);
	 	}
 	}(j));
  }

//基础运动
function omove(demo){
	if (lock) {
		lock = false;
		if (demo == '<' || !demo) {
			if (oUl.offsetLeft <= -len * oWidth) {
				oUl.style.left = '0px';
			}
			move(oUl, {left : oUl.offsetLeft - oWidth}, function () {
				lock = true;
				index ++;
				if (oUl.offsetLeft <= -len * oWidth) {
					index = 0;
				}
				indexChange(index);
			});
		}else if(demo == '>') {
			if (oUl.offsetLeft == 0) {
				index = len;
				oUl.style.left = (-len * oWidth) + 'px';
			}
			move(oUl, {left : oUl.offsetLeft + oWidth}, function () {
				lock = true;
				index --;
				if (oUl.offsetLeft <= -len * oWidth) {
					index = len;
				}
				indexChange(index);
			});
		}
	}
}

//小圆标移动
function indexChange (index) {
	document.getElementsByClassName('active')[0].className = '';
	oIndex[index].className = 'active';
 }


