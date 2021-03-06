//必须值是以“px”为单位的属性或者opacity属性
//obj：要操作的DOM对象
//attr：对象的属性
//iTarget：属性的目标值
//fn：传入的匿名函数
function startMove(obj, attr, iTarget,fn) {
	//清除定时器
	clearInterval(obj.timer);
	//开启定时器
	obj.timer = setInterval(function () {
		// 当属性是opacity时，获取特殊icur（当前值，获得的数据是小数先放大后转换为整数）
		// 否则获取普通icur
		if (attr == "opacity") {
			var icur = Math.round(parseFloat(getStyle(obj, attr) * 100));
		} else {
			var icur = parseInt(getStyle(obj, attr));
		}
		// speed速度值（增加/减小量）
		// 随当前值越来越接近目标值而减小，使得元素做缓冲动画
		var speed = (iTarget - icur) / 8;
		// speed大于0时向上取整，反之向下取整，防止出现小数发生错误
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		// 当前值达到目标值时任务完成，清除定时器停止运动
		// 否则继续增加或减小
		if (iTarget == icur) {
			clearInterval(obj.timer);
			//如果传入了匿名函数则执行
			if(fn){
				fn();
			}
			
		} else {
			//当属性是opacity时，执行兼容性代码，否则执行普通代码
			if (attr == "opacity") {
				icur += speed;
				obj.style[attr] = icur / 100;
				obj.style.filter = "alpha(opacity:" + icur + ")";
			} else {
				obj.style[attr] = icur + speed + "px";
			}
		}
	}, 30);
}
//得到元素obj中属性attr的值(兼容性写法)
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr]; //针对IE
	} else {
		return getComputedStyle(obj, false)[attr]; //针对火狐
	}
}