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

	function WhiteBalloon(obj) {
		Balloon.call(this, obj);
		this.name = 'WhiteBalloon';
		this.sheets = ['./img/balloons2.png', './img/explosion.png']
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [10]).concat(sprites.getParticularSprites(this.sheets[1], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]));
		this.currentSprite = this.sprites[0];
		this.velocity = obj.velocity;
		this.initialY = this.y;
		this.alpha = 0.01;
		this.increment = 0.01;
	};
	WhiteBalloon.prototype = Object.create(Balloon.prototype);
	WhiteBalloon.prototype.constructor = WhiteBalloon;

	WhiteBalloon.prototype.render = function(ctx) {
		ctx.globalAlpha = this.alpha;
		this.__proto__.__proto__.render.call(this, ctx);
		ctx.globalAlpha = 1.0;
	};

	WhiteBalloon.prototype.detectCollision = function(pt) {
		if (this.alpha > 0.75) this.__proto__.__proto__.detectCollision.call(this, pt);
		else return false;
	};

	WhiteBalloon.prototype.update = function (dt) {
		if (this.alpha < 0.01 || this.alpha >= 1.0) this.increment = -this.increment;
		this.alpha += this.increment;
		this.y += this.velocity * dt;

		if(this.y + this.height < 0) {
			this.isDead = true;
		}
		this.updatePolygon();
		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
	};

	return WhiteBalloon;

});