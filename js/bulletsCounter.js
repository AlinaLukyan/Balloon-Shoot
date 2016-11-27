define(["loader", "sprites"], function(loader, sprites) {

	function BulletsCounter(value, x) {
		this.value = value;
		this.initial = value;
		this.x = x;
		this.y = 35;
		this.zIndex = 100;
		this.pending = false;
		this.width = 20;
		this.height = 45;
		this.cx = this.x - this.width/2;
		this.cy = this.y - this.height/2;
		this.sheets = ['./img/inv.png'];
		this.currentSheet = this.sheets[0];
		this.sprites = sprites.getParticularSprites(this.sheets[0], [0]);
		this.currentSprite = this.sprites[0];
	};
	BulletsCounter.prototype.reduce = function () {
		if(this.value > 0 && !this.pending) this.value--;
		console.log('B', this.value);
	};

	BulletsCounter.prototype.reload = function () {

		if (!this.pending) {
			this.pending = true;
			var self = this;		
			setTimeout(function(){
				self.value = self.initial;
				self.pending = false;
			}, 500)		

		}
	};

	BulletsCounter.prototype.update = function() {
		
	};

	BulletsCounter.prototype.render = function(ctx) {
		if (this.currentSprite === null || this.currentSheet === null) {
	        return;
	    }
	    var spt = this.currentSprite;
	    if (this.currentSheet) {
	    	var i = 0;
	    	while(i < this.value) {
	    		i++;
	    		ctx.drawImage(loader.get(this.currentSheet), spt.x, spt.y, spt.w, spt.h, this.cx + (50 * i), this.cy, this.width, this.height);
	    	}
	    	
	    }
	};

	return BulletsCounter;
});