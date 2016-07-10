define(['renderer', 'gameEngine'], function(renderer, gameEngine) {
	function Game(renderer) {
		this.renderer = renderer;
	};

	Game.prototype.start = function() {

		function main() {
			renderer.main();
			gameEngine.update();
			this.reqID = requestAnimationFrame(main);
		}
		main();
	};

	Game.prototype.end = function() {
        console.log('END');
		window.cancelAnimationFrame(reqID);
	}

	var game = new Game(renderer);

	return game;
});