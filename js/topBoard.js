define(['gameCanvas', 'levelTimer'], function(gameCanvas, LevelTimer) {

	/*
	*	takes as argument Object
	*	{
	*		timer = minutes,
	*		bullets = integer,
	*		score = integer
	*	}
	*/
	function TopBoard(obj) {
		this.fontSize = 40;
		this.levelTimer = new LevelTimer(obj.timer, gameCanvas.canvas.width / 4 * 3, this.fontSize);
		this.name = 'TopBoard';
	};

	TopBoard.prototype.update = function() {
		this.levelTimer.update();
	};

	TopBoard.prototype.render = function(ctx) {
		this.levelTimer.render(ctx);
	};

	return TopBoard;
});