define(function() {

	function Score(value, x, fontSize) {
		this.value = value;
		this.fontSize = fontSize;
		this.x = x;
		this.y = 40;
		this.zIndex = 100;
	};
	Score.prototype.addToScore = function (num) {
		this.value += num;
	};

	Score.prototype.update = function() {
		
	};

	Score.prototype.render = function(ctx) {
		ctx.font = this.fontSize + "px Baloo";
		ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
		ctx.fillText('Score: ' + this.value, this.x, this.y);
		ctx.strokeStyle = "rgba(2, 151, 255, 1.0)";
		ctx.strokeText('Score: ' + this.value, this.x, this.y);		
	};

	return Score;
});