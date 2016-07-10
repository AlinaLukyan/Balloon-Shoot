define(function() {

	function GameEngine() {
		this.entities = {};
		this.factory = {};
	};

	GameEngine.prototype.addToFactory = function(name, creator) {
		this.factory[name] = creator;
	};

	GameEngine.prototype.spawnEntity = function(name, x, y, speed) {
		var entityID = guid();
		this.entities[entityID] = new this.factory[name](x, y, speed);
		this.entities[entityID].ID = entityID;

	};

	GameEngine.prototype.removeEntity = function(entity) {
		delete this.entities[entity.ID];
	};

	GameEngine.prototype.update = function() {
		var keys = Object.keys(this.entities);
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this.entities[key].update();
		}
	};

	GameEngine.prototype.render = function() {
		var keys = Object.keys(this.entities);
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this.entities[key].render();
		}
	};

	GameEngine.prototype.guid = function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	var gameEngine = new GameEngine();

	return gameEngine;
});