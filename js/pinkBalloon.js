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
	function PinkBalloon(obj) {
		Balloon.call(this, obj);
		this.name = 'PinkBalloon';
		this.sheets = ['./img/balloons2.png', './img/explosion.png']
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [6])
		.concat(sprites.getParticularSprites(this.sheets[1], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]));
		this.currentSprite = this.sprites[0];
		this.velocity = obj.velocity;
		this.initialY = this.y;
		this.decay = false;
	};
	PinkBalloon.prototype = Object.create(Balloon.prototype);
	PinkBalloon.prototype.constructor = PinkBalloon;

	PinkBalloon.prototype.detectCollision = function (pt) {
		for(var c = false, i = -1, l = this.polygon.length, j = l - 1; ++i < l; j = i)
	        ((this.polygon[i].y <= pt.y && pt.y < this.polygon[j].y) || (this.polygon[j].y <= pt.y && pt.y < this.polygon[i].y))
	        && (pt.x < (this.polygon[j].x - this.polygon[i].x) * (pt.y - this.polygon[i].y) / (this.polygon[j].y - this.polygon[i].y) + this.polygon[i].x)
	        && (c = !c);
	    if(c) {    	
	    	this.split();
	    }
	    return c;
	};

	PinkBalloon.prototype.split = function (dt) {
		this.decay = [{ 
			name: "PinkBalloon_splited",
			y: this.y - this.height * 0.7,
			x: this.x + (this.width / 8),
			scale: this.scale * 0.7,
			zIndex: this.zIndex - 1,
			velocity: this.velocity,
			direction: 1
		}, { 
			name: "PinkBalloon_splited",
			y: this.y - this.height * 0.7,
			x: this.x + (this.width / 8 * 7),
			scale: this.scale * 0.7,
			zIndex: this.zIndex - 1,
			velocity: this.velocity,
			direction: 2
		}];
	};

	PinkBalloon.prototype.update = function (dt) {

		this.y += this.velocity * dt;

		if(this.y + this.height < 0) {
			this.isDead = true;
		}
		this.updatePolygon();
		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
	};

	return PinkBalloon;

});