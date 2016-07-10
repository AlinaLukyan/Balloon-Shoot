define(['gameCanvas', 'map'], function(gameCanvas, map){

	function Renderer(canvas, map) {

		canvas.setup();
		this.ctx = canvas.ctx;
		this.dt;
		this.map = map;
		//this.updater = updater;
	};

	Renderer.prototype.main = function() {
		this.map.draw(this.ctx);
	};

	var renderer = new Renderer(gameCanvas, map);

	return renderer;
});