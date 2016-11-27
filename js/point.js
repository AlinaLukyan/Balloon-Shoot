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
	function Point(obj) {
		this.name = "Point";
		this.x = obj.x;
		this.y = obj.y;
		this.cost = obj.cost;
		this.scale = obj.scale;
		this.isDead = false;
		this.zIndex = obj.scale * 10 + 1;
		this.actived = false;
		this.fontSize = Math.floor(30 * obj.scale);
		this.opacity = 1.00;
		//this.dt = game.dt;

	};

	Point.prototype.active = function () {
		var self = this;
		setTimeout(function(){
			self.isDead = true;
		}, 1000);
	};

	Point.prototype.update = function () {
		if (!this.actived) {
			console.log(this.scale)
			this.active();
			this.actived = true;
		}
		this.opacity = this.opacity - 0.03;
	};


	Point.prototype.render = function (ctx) {
		ctx.font = this.fontSize + "px Baloo";
		ctx.fillStyle = "rgba(2, 151, 49, " + this.opacity + ")";
		ctx.fillText(String(this.cost), this.x, this.y);
	};
	return Point;
});