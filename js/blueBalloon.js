define(['balloon','sprites'], function(Balloon, sprites) {

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

	function BlueBalloon(obj) {
		Balloon.call(this, obj);
		this.name = 'BlueBalloon';
		this.sheets = ['./img/balloons2.png', './img/explosion.png'];
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [0]).concat(sprites.getParticularSprites(this.sheets[1], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]));
		this.currentSprite = this.sprites[0];
		this.velocity = obj.velocity;
		this.initialY = this.y;
		this.initalWidth = this.width;
		this.initialHeight = this.height;
		this.updateScale = 1.0;
		this.increment = 0.01;
	};
	BlueBalloon.prototype = Object.create(Balloon.prototype);
	BlueBalloon.prototype.constructor = BlueBalloon;

	BlueBalloon.prototype.update = function (dt) {

		this.y += this.velocity * dt;
		this.updateScale += this.increment;
		if (this.updateScale > 1.2) this.increment = -(this.increment);
		if (this.updateScale < 0.3) this.increment = -(this.increment);

		this.width = this.initalWidth * this.updateScale;
		this.height = this.initialHeight * this.updateScale;

		if(this.y + this.height < 0) {
			this.isDead = true;
		}
		this.updatePolygon();
		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
	};

	return BlueBalloon;

});