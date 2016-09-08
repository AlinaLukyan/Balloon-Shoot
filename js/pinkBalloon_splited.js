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

	function PinkBalloon_splited(obj) {
		Balloon.call(this, obj);
		this.name = 'PinkBalloon_splited';
		this.sheets = ['./img/balloons2.png', './img/explosion.png']
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [6]).concat(sprites.getParticularSprites(this.sheets[1], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]));
		this.currentSprite = this.sprites[0];
		this.velocity = obj.velocity;
		this.initialY = this.y;
		this.direction = obj.direction;
		this.theta = 145;
		this.initialTheta = 145;
	};
	PinkBalloon_splited.prototype = Object.create(Balloon.prototype);
	PinkBalloon_splited.prototype.constructor = PinkBalloon_splited;

	PinkBalloon_splited.prototype.update = function (dt) {
		this.velocityX = Math.pow(this.theta, 2) * 0.01;
		this.y += this.velocity * dt;
		
		if (this.velocityX > 1) {
			if (this.direction === 1) {
				this.x -= this.velocityX * dt;
			} else {
				this.x += this.velocityX * dt;
			}
			this._move();
		}

		if(this.y + this.height < 0) {
			this.isDead = true;
		}
		this.updatePolygon();
		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
	};

	PinkBalloon_splited.prototype._decrement = function () {
		this.theta -=1.5;
	};

	PinkBalloon_splited.prototype._move = PinkBalloon_splited.prototype._decrement;

	return PinkBalloon_splited;

});