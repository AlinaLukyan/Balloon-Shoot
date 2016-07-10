define(function() {

	/******************************
	*	takes Object as argument:		
	*	obj = {
	*		x: x,
	*		y: y,
	*		width: width,
	*		height: height,
	*		zIndex: zIndex
	*	};
	*	
	******************************/

	function Entity(obj) {
		this.x = obj.x;
		this.y= obj.y;
		this.width = obj.width;
		this.height = obj.height;
		this.zIndex = obj.zIndex;
	};

	Entity.prototype.update = function () {
 		
	};
	return Entity;
});