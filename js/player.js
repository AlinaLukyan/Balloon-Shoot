define(['gameCanvas'], function(gameCanvas) {

	function Player(canvas) {
		this.canvas = canvas;
	};

	Player.prototype.eventListnerGame = function(e, obj) {
		e.preventDefault(); 
	 	var coorX = e.pageX - this.canvas.canvas.offsetLeft;
	 	var coorY = e.pageY - this.canvas.canvas.offsetTop;
	 	var keys = Object.keys(obj);
	 	for(var i = 0; i < keys.length; i++) {
	 		var key = keys[i];
	 		if (obj[key]._defferedDeath) {
	 			continue;
	 		}
	 		obj[key].detectCollision({x: coorX, y: coorY});
	 	}
	};

	return new Player(gameCanvas);
});