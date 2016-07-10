define(['renderer'], function(renderer){

	function Game(renderer) {
		this.renderer = renderer;
	};

	Game.prototype.start = function() {
		function main() {
			renderer.main()
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