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

	function RedBalloon(obj) {
		Balloon.call(this, obj);
		this.name = 'RedBalloon';
		this.sheets = ['./img/balloons2.png', './img/explosion.png']
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [5]).concat(sprites.getParticularSprites(this.sheets[1], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]));
		this.currentSprite = this.sprites[0];
		this.velocity;
		this.initialY = this.y;
		this.initialTheta = obj.theta;
		this.theta = obj.theta;
		this.cost = Math.floor(this.cost * 1.1);
	};
	RedBalloon.prototype = Object.create(Balloon.prototype);
	RedBalloon.prototype.constructor = RedBalloon;

	RedBalloon.prototype.update = function (dt) {
		this.velocity = Math.pow(this.theta, 2) * 0.01;
		this.y -= this.velocity * dt;
		this._move();

		if (Math.pow(this.theta, 2) * 0.01 > 300) {
			this._move = this._decrement;
		} else if (this.theta <= this.initialTheta) {
			this._move = this._increment;
		}
		

		this.updatePolygon();
		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
	};
	RedBalloon.prototype._increment = function () {
		this.theta +=1.5;
	};
	RedBalloon.prototype._decrement = function () {
		this.theta -=1.5;
	};
	RedBalloon.prototype._move = RedBalloon.prototype._increment;


	return RedBalloon;

});