define(['special','sprites', 'gameCanvas'], function(Special, sprites, gameCanvas) {

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

	function Plane(obj) {
		Special.call(this, obj);
		this.name = 'Plane';
		this.sheets = ['./img/flyer.png', './img/explosion.png']
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [0, 1, 2, 3]).concat(sprites.getParticularSprites(this.sheets[1], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]));
		this.currentSprite = this.sprites[0];
		this.velocity = obj.velocity;
		this.initialY = this.y;
		this.width = 211 * obj.scale;
		this.height = 211 * obj.scale;
		this.interval;
		this.animationSprite = 0;
		this.animate(Math.floor(this.velocity / 40));
		this.additionalSheet = this.sheets[0];
		this.cost = Math.floor(1000 - 500 * obj.scale);
	};
	Plane.prototype = Object.create(Special.prototype);
	Plane.prototype.constructor = Plane;

	Plane.prototype.update = function (dt) {

		this.x += this.velocity * dt;

		if(this.x - this.width > gameCanvas.canvas.width) {
			this.isDead = true;
			this.stopAnimations();
		}
		this.updatePolygon();
		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
	};

	Plane.prototype.dying = function() {
			this.__proto__.__proto__.dying.call(this);	
			this.stopAnimations();
		};

	Plane.prototype.setDestroySprite = function(last) {
		if (last) this.additionalSprite = this.sprites[3];
		else this.additionalSprite = this.sprites[2];	
	};

	Plane.prototype.stopAnimations = function () {
		var self = this;
		clearInterval(self.interval);
	};

	Plane.prototype.setSprite = function () {
		if (this.animationSprite === 0) this.animationSprite = 1;
		else this.animationSprite = 0;
		this.currentSprite = this.sprites[this.animationSprite];
	};

	Plane.prototype.animate = function (speed) {
		var self = this;
		this.interval = setInterval(function() { 
			self.setSprite.call(self)
		} , 1000 / speed)
	};



	return Plane;

});