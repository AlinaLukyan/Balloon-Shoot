define(['gameCanvas', 'levelTimer', 'score', 'bulletsCounter'], function(gameCanvas, LevelTimer, Score, BulletsCounter) {

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
		this.score = new Score(obj.score, gameCanvas.canvas.width / 4 * 2, this.fontSize);
		this.bullets = new BulletsCounter(obj.bullets, gameCanvas.canvas.width / 24 * 1);
		this.name = 'TopBoard';
	};

	TopBoard.prototype.update = function() {
		this.levelTimer.update();
	};

	TopBoard.prototype.render = function(ctx) {
		this.levelTimer.render(ctx);
		this.score.render(ctx);
		this.bullets.render(ctx);
	};

	return TopBoard;
});