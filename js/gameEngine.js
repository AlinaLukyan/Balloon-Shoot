define(['gameCanvas','cloud'] , function(gameCanvas, Cloud) {

	function GameEngine() {
		this.entities = {};
		this.factory = {};
		this.layers = {};
		this.last;
	};

	GameEngine.prototype.addToFactory = function(name, creator) {
		this.factory[name] = creator;
	};

	GameEngine.prototype.spawnEntity = function(name, obj, velocity) {
		var entityID = GameEngine.guid();
		this.entities[entityID] = new this.factory[name](obj, velocity);
		this.entities[entityID].ID = entityID;
		this.addToLayer(this.entities[entityID]);
		this.last = this.entities[entityID];
	};

	GameEngine.prototype.initFactory = function(arr) {
		for(var i = 1; i < arr.length; i++) {
			var construct = arr[i];
			this.factory[construct.name] = construct;
		}
	};

	GameEngine.prototype.removeEntity = function(entity) {
		this.removeFromLayer(entity);
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
		var keys = Object.keys(this.layers);
		keys.sort(function(a, b) {
			return Number(a) - Number(b);
		});
		for(var i = 0; i < keys.length; i++) {
			var layer = this.layers[keys[i]];
			var ids = Object.keys(layer);
			for (var n = 0; n < ids.length; n++) {
				layer[ids[n]].render(gameCanvas.ctx);
			}
		}
	};

	GameEngine.prototype.addToLayer = function(entity) {
		var z = String(entity.zIndex);
		this.layers[z] = this.layers[z] || {};
		this.layers[z][entity.ID] = entity;
	};

	GameEngine.prototype.removeFromLayer = function(entity) {
		delete this.layers[String(entity.zIndex)][entity.ID];
	};

	GameEngine.guid = function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};

	var gameEngine = new GameEngine();

	gameEngine.initFactory(arguments);

	gameEngine.spawnEntity("Cloud", {
			y: 100,
			width: 200,
			height: 100,
			zIndex: 1
			}, -0.5);
	gameEngine.spawnEntity("Cloud", {
			y: 150,
			width: 150,
			height: 75,
			zIndex: -1
			}, 0.5);
	gameEngine.spawnEntity("Cloud", {
			y: 200,
			width: 200,
			height: 100,
			zIndex: 2
			}, 0.5);
	
	setTimeout(function(){
		gameEngine.removeEntity(gameEngine.last);
	}, 2000);

	return gameEngine;
});