define(function() {

	function LevelTimer(time, x, fontSize) {
		this.time = time * 60 * 1000;
		this.endtime = Date.parse(new Date()) + this.time;
		this.timeLeft = {};
		this.fontSize = fontSize;
		this.x = x;
		this.y = 40;
		this.zIndex = 100;
	};
	LevelTimer.prototype.getTimeRemaining = function () {
		var t = this.endtime - Date.parse(new Date());
		if (t <= 0) {
			return {
				'total': 0,
				'minutes': 0,
				'seconds': '00'
			}
		};
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		seconds = seconds > 9 ? String(seconds) : '0' + seconds;
		return {
				'total': t,
				'minutes': minutes,
				'seconds': seconds
			};
	};

	LevelTimer.prototype.update = function() {
		this.timeLeft = this.getTimeRemaining();
	};

	LevelTimer.prototype.render = function(ctx) {
		ctx.font = this.fontSize + "px Baloo";	
		ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
		ctx.fillText('Time: ' + this.timeLeft.minutes + ':' + this.timeLeft.seconds, this.x, this.y);
		ctx.strokeStyle = "rgba(2, 151, 255, 1.0)";
		ctx.strokeText('Time: ' + this.timeLeft.minutes + ':' + this.timeLeft.seconds, this.x, this.y);	
	};

	return LevelTimer;
});