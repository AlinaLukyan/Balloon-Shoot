define(['renderer', 'gameEngine', 'loader', 'sprites', 'scenario'], function(renderer, gameEngine, loader, sprites, scenario) {
	function Game(renderer) {
		this.renderer = renderer;
		this.lastTime = Date.now();
		this.now;
		this.dt;
	};

	Game.prototype.start = function() {
		var self = this;
		function main() {
			self.now = Date.now();
			self.dt = (self.now - self.lastTime) / 1000.0;
			renderer.main();
			gameEngine.update(self.dt);
			gameEngine.render();
			self.lastTime = self.now;
			this.reqID = requestAnimationFrame(main);
		}
		loader.load([
	        './img/cloud.png',
	        './img/balloons.png',
	        './img/balloons2.png',
	        './img/explosion.png'
	    ]);
	    loader.onReady(function(){
	    	main();
	    	scenario.run();
	    });
	};

	Game.prototype.end = function() {
        console.log('END');
		window.cancelAnimationFrame(reqID);
	}

	var game = new Game(renderer);

	return game;
});