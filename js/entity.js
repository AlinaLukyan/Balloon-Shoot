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
		//this.dt = game.dt;

	};

	Entity.prototype.getCenter = function () {
		return {x: this.x + this.width / 2,
				y: this.y + this.height / 2}
	}

	Entity.prototype.update = function () {
 		
	};
	return Entity;
});