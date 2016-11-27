define(['entity', 'loader', 'sprites', "gameCanvas"], function(Entity, loader, sprites, gameCanvas) {

	/******************************
	*	takes as argument:		
	*	obj = {
	*		x: x,
	*		y: y,
	*		width: width,
	*		height: height,
	*		zIndex: zIndex,
	*		velocity: velocity
	*	},
	*	
	******************************/

	function Cloud(obj) {
		Entity.call(this, obj);
		this.name = 'Cloud';
		this.velocity = obj.velocity;
		this.scale = obj.scale;
		if (!this.width || !this.height) {
			this.width = 150 * obj.scale;
			this.height = 100 * obj.scale;
		}
		if(this.velocity < 0) {
			this.x = gameCanvas.canvas.width + this.width/2;
		} else {
			this.x = -this.width;
		}
		console.log(this.x)
		this.initialX = this.x;
		this.sheets = ['./img/inv.png'];
		this.currentSheet = this.sheets[0];
		this.type = obj.type;
		this.sprites = sprites.getParticularSprites(this.sheets[0], [this.type]);
		this.currentSprite = this.sprites[0];
		this.cx = this.x - this.width/2;
		this.cy = this.y - this.height/2;
	};

	Cloud.prototype = Object.create(Entity.prototype);
	Cloud.prototype.constructor = Cloud;

	Cloud.prototype.update = function (dt) {
		this.x += this.velocity * dt;

		if(this.x > gameCanvas.canvas.width + this.width/2 || this.x < 0 - this.width) {
			this.x = this.initialX;
		}
		this.cx = this.x - this.width/2;
		this.cy = this.y - this.height/2;
	};

	Cloud.prototype.render = function (ctx) {
		if (this.currentSprite === null || this.currentSheet === null) {
	        return;
	    }
	    var spt = this.currentSprite;
	    if (this.currentSheet) {
	    	ctx.drawImage(loader.get(this.currentSheet), spt.x, spt.y, spt.w, spt.h, this.cx, this.cy, this.width, this.height);
	    }
	};

	return Cloud;

});