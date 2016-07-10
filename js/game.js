define(['renderer', 'gameEngine', 'loader'], function(renderer, gameEngine, loader) {
	function Game(renderer) {
		this.renderer = renderer;
	};

	Game.prototype.start = function() {

		function main() {
			renderer.main();
			gameEngine.update();
			gameEngine.render();
			this.reqID = requestAnimationFrame(main);
		}
		loader.load([
	        './img/cloud.png'
	    ]);
	    loader.onReady(main);
	};

	Game.prototype.end = function() {
        console.log('END');
		window.cancelAnimationFrame(reqID);
	}

	var game = new Game(renderer);

	return game;
});