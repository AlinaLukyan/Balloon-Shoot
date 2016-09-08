define(['entity', 'loader'], function(Entity, loader) {

	/******************************
	*	takes Object as argument:		
	*	obj = {
	*		x: x,
	*		y: y,
	*		width: width,
	*		height: height,
	*		zIndex: zIndex,
	*		scale: scale
	*	};
	*	
	******************************/

	function Balloon(obj) {
		Entity.call(this, obj);
		this.name = '';
		this.sprite = '';
		this.type = 'Balloon'
		this.sheet = null;
		this.currentSprite = null;
		this.sprites = [];
		this.polygon = 	[];
		this._defferedDeath = false;
		this.isDead = false;
		this._animationCount = 1;
		this.scale = obj.scale;
		if (!this.width || !this.height) {
			this.width = 75 * obj.scale;
			this.height = 100 * obj.scale;
		}
		this.y = this.y + this.height;
		this.cx;
		this.cy;
		this.cost = Math.floor(200 - 100 * obj.scale);
		this.point = false;
	};

	Balloon.prototype = Object.create(Entity.prototype);
	Balloon.prototype.constructor = Balloon;
	Balloon.prototype.updatePolygon = function() {
		this.cx = this.x - this.width/2;
		this.cy = this.y - this.height/2;
		this.polygon = 	[{x: Math.floor(this.cx + (this.width / 2 * 0.45)), y: Math.floor(this.cy + (this.height / 2 * 1.5))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.03)),  y: Math.floor(this.cy + (this.height / 2))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.1)), y: Math.floor(this.cy + (this.height / 2 * 0.36))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.9)), y: Math.floor(this.cy + (this.height / 2 * 0.01))},
						{x: Math.floor(this.cx + (this.width / 2 * 1.8)), y: Math.floor(this.cy + (this.height / 2 * 0.36))},
						{x: Math.floor(this.cx + (this.width / 2 * 1.9)), y: Math.floor(this.cy + (this.height / 2))},
						{x: Math.floor(this.cx + (this.width / 2 * 1.5)), y: Math.floor(this.cy + (this.height / 2 * 1.5))},
						{x: Math.floor(this.cx + (this.width / 2)), y: Math.floor(this.cy + (this.height / 2 * 1.74))}];
	};
	Balloon.prototype.render = function (ctx) {
		if (this.currentSprite === null || this.currentSheet === null) {
	        return;
	    }
	    var spt = this.currentSprite;
	    if (this.currentSheet) {
	    	ctx.drawImage(loader.get(this.currentSheet), spt.x, spt.y, spt.w, spt.h, this.cx, this.cy, this.width, this.height);
	    }
	    // if(this.polygon.length) {
	    // 	var i;
	    // 	var l = this.polygon.length;
	    // 	for(i = 0; i < l; i++) {
	    // 		ctx.fillRect(this.polygon[i].x, this.polygon[i].y,3,3);
	    // 	}	    	
	    // }
	};

	Balloon.prototype.detectCollision = function (pt) {
		for(var c = false, i = -1, l = this.polygon.length, j = l - 1; ++i < l; j = i)
	        ((this.polygon[i].y <= pt.y && pt.y < this.polygon[j].y) || (this.polygon[j].y <= pt.y && pt.y < this.polygon[i].y))
	        && (pt.x < (this.polygon[j].x - this.polygon[i].x) * (pt.y - this.polygon[i].y) / (this.polygon[j].y - this.polygon[i].y) + this.polygon[i].x)
	        && (c = !c);
	    if(c) {    	
	    	this.playAnimation(55, 48);
	    }
	    return c;
	};

	Balloon.prototype.setAnimationSprite = function(stop) {
			this.currentSheet = this.sheets[1];
			this.width = this.height * 1.01;
			this.height = this.width;
			this.updatePolygon();
			this.update = function() {
				return false;
			};
			if(this._animationCount === stop) {
				this.currentSheet = this.sheets[0];
				this._animationCount = 1;
				return;
			}		
			this.currentSprite = this.sprites[this._animationCount];
			return this._animationCount++;
		};

	Balloon.prototype.playAnimation = function (speed, numOfFrames) {
		this._defferedDeath = true;
		var self = this;
		var interval = setInterval(function() { self.setAnimationSprite.call(self, numOfFrames) } , 1000 / speed)
		setTimeout(function(){ 
			clearInterval(interval);
			self.isDead = true;
		}, 1000 / speed * numOfFrames + 1);
	};

	return Balloon;

});