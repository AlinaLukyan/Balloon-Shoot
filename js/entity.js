define(function() {

	/******************************
	*	takes Object as argument:		
	*	obj = {
	*		x: x,
	*		y: y,
	*		width: width,
	*		height: height,
	*		zIndex: zIndex,
	*		sprite: sprite
	*	};
	*	
	******************************/

	function Entity(obj) {
		this.x = obj.x;
		this.y= obj.y;
		this.width = obj.width;
		this.height = obj.height;
		this.zIndex = obj.zIndex;
		this.sprite = obj.sprite
	};

	Entity.prototype.update = function () {
		
	};

});