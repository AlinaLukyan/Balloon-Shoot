define(['entity', 'loader', 'gameCanvas'], function(Entity, loader, gameCanvas) {

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

	function Special(obj) {
		Entity.call(this, obj);
		this.name = '';
		this.sprite = '';
		this.type = 'Special'
		this.sheet = null;
		this.currentSprite = null;
		this.sprites = [];
		this.polygon = 	[];
		this._defferedDeath = false;
		this.isDead = false;
		this._animationCount = 4;
		this.scale = obj.scale;
		if (!this.width || !this.height) {
			this.width = 211 * obj.scale;
			this.Iwidth = 211 * obj.scale;
			this.height = 211 * obj.scale;
			this.Iheight = 211 * obj.scale;
		}
		this.y = this.y + this.height;
		this.cx;
		this.cy;
		this.Icx;
		this.Icy;
		this.cost = Math.floor(200 - 100 * obj.scale);
		this.point = false;
		this.additionalSprite;
		this.additionalSheet;
	};

	Special.prototype = Object.create(Entity.prototype);
	Special.prototype.constructor = Special;
	Special.prototype.updatePolygon = function() {
		this.cx = this.x - this.width/2;
		this.cy = this.y - this.height/2;
		this.Icx = this.x - this.Iwidth / 2;
		this.Icy = this.y - this.Iheight / 2;
		this.polygon = 	[{x: Math.floor(this.cx + (this.width / 2 * 0.45)), y: Math.floor(this.cy + (this.height / 2 * 1.2))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.03)),  y: Math.floor(this.cy + (this.height / 2))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.1)), y: Math.floor(this.cy + (this.height / 2 * 0.7))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.9)), y: Math.floor(this.cy + (this.height / 2 * 0.55))},
						{x: Math.floor(this.cx + (this.width / 2 * 1.6)), y: Math.floor(this.cy + (this.height / 2 * 0.87))},
						{x: Math.floor(this.cx + (this.width / 2 * 1.9)), y: Math.floor(this.cy + (this.height / 2))},
						{x: Math.floor(this.cx + (this.width / 2 * 1.4)), y: Math.floor(this.cy + (this.height / 2 * 1.45))},
						{x: Math.floor(this.cx + (this.width / 2 * 0.9)), y: Math.floor(this.cy + (this.height / 2 * 1.25))}];
	};
	Special.prototype.render = function (ctx) {

	    if(this.additionalSprite) {
	    	var addSpt = this.additionalSprite;
	    	ctx.drawImage(loader.get(this.additionalSheet), addSpt.x, addSpt.y, addSpt.w, addSpt.h, this.Icx, this.Icy, this.Iwidth, this.Iheight);
	    }

	    var spt = this.currentSprite;
	    if (this.currentSheet && this.currentSprite) {
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

	Special.prototype.detectCollision = function (pt) {
		for(var c = false, i = -1, l = this.polygon.length, j = l - 1; ++i < l; j = i)
	        ((this.polygon[i].y <= pt.y && pt.y < this.polygon[j].y) || (this.polygon[j].y <= pt.y && pt.y < this.polygon[i].y))
	        && (pt.x < (this.polygon[j].x - this.polygon[i].x) * (pt.y - this.polygon[i].y) / (this.polygon[j].y - this.polygon[i].y) + this.polygon[i].x)
	        && (c = !c);
	    if(c) {    	
	    	this.playAnimation(65, 48);
	    }
	    return c;
	};

	Special.prototype.falling = function(dt) {
		this.y += this.getFallingSpeed(dt) * dt;
		this.x += this.velocity * dt;


		this.cx = this.x - (this.width/2);
		this.cy = this.y - (this.height/2);
		this.Icx = this.x - this.Iwidth / 2;
		this.Icy = this.y - this.Iheight / 2;

		if (this.y > gameCanvas.canvas.height + this.height || 
			this.x > gameCanvas.canvas.width + this.width) {
			this.isDead = true;
		}
	};

	Special.prototype.getFallingSpeed = function(dt) {
		if (!this.initailFallingHeight) {
			this.initailFallingHeight = gameCanvas.canvas.height - this.y + this.Iheight;
		}
		this.fallingDelta = this.initailFallingHeight - (gameCanvas.canvas.height - this.y + this.Iheight);
		console.log(this.initailFallingHeight, this.fallingDelta)
		return Math.sqrt(2 * 9.81 * (this.initailFallingHeight + this.fallingDelta * 2800 * dt)); //free fall
	};

	Special.prototype.setAnimationSprite = function(stop) {
			this.currentSheet = this.sheets[1];
			this.width = this.height * 1.01;
			this.height = this.width;
			this.updatePolygon();
			if(this._animationCount >= stop) {
				this.currentSprite = undefined;
				// this._animationCount = 4;
				return;
			}
			if(this._animationCount == Math.floor(stop/4)) {
				this.update = this.falling;
			}
			if(this._animationCount == Math.floor(stop/2)) {
				this.setDestroySprite();
				//this.update = this.falling;
			}
			if(this._animationCount == Math.floor(stop-5)) {
				this.setDestroySprite(true);
				//this.update = this.falling;
			}
			
			console.log(this.getFallingSpeed());
			this.currentSprite = this.sprites[this._animationCount];
			return this._animationCount++;
		};

	Special.prototype.dying = function() {
			this._defferedDeath = true;
		};


	Special.prototype.playAnimation = function (speed, numOfFrames) {
		this.dying();
		var self = this;
		var interval = setInterval(function() { self.setAnimationSprite.call(self, numOfFrames) } , 1000 / speed)
		this.additionalSprite = this.sprites[0];
		setTimeout(function(){ 
			clearInterval(interval);
			
		}, 1000 / speed * numOfFrames + 1);
	};

	return Special;

});