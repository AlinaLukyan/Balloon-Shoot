define(['gameCanvas', 'player','cloud', 'point', 'topBoard', 'blueBalloon', 'orangeBalloon', 'greenBalloon', 'redBalloon'], 
	function(gameCanvas, player, Cloud, Point, TopBoard, BlueBalloon, OrangeBalloon, GreenBalloon, RedBalloon) {

	function GameEngine() {
		this.entities = {};
		this.factory = {};
		this.layers = {};
		this.balloons = {};
		this.topBoard;
	};

	GameEngine.prototype.addToFactory = function(name, creator) {
		this.factory[name] = creator;
	};

	GameEngine.prototype.enableShooting = function() {
		var balloons = this.balloons;
		var self = this;
		gameCanvas.canvas.addEventListener("click", function(event){
			if (self.topBoard.bullets.value && !self.topBoard.bullets.pending) {
				self.topBoard.bullets.reduce();
		    	player.eventListnerGame(event, balloons);
		    }
		}, false);
		gameCanvas.canvas.addEventListener('contextmenu', function(event){
			event.preventDefault();		    	
	    	self.topBoard.bullets.reload();
	    	return false;
		}, false);
	}

	GameEngine.prototype.spawnEntity = function(name, obj, velocity) {
		var entityID = GameEngine.guid();
		this.entities[entityID] = new this.factory[name](obj, velocity);
		this.entities[entityID].ID = entityID;
		this.addToLayer(this.entities[entityID]);
		if(this.entities[entityID].type === 'Balloon') {
			this.balloons[entityID] = this.entities[entityID];
		}
	};

	GameEngine.prototype.spawnTopBoard = function(obj) {
		var entityID = GameEngine.guid();
		this.entities[entityID] = new this.factory["TopBoard"](obj);
		this.entities[entityID].ID = entityID;
		this.addToLayer(this.entities[entityID]);
		this.topBoard = this.entities[entityID];
	};

	GameEngine.prototype.removeTopBoard = function() {
		this.removeFromLayer(this.topBoard);
		delete this.entities[this.topBoard.ID];
		this.topBoard = undefined;
	};

	GameEngine.prototype.initFactory = function(arr) {
		for(var i = 2; i < arr.length; i++) {
			var construct = arr[i];
			this.factory[construct.name] = construct;
		}
	};

	GameEngine.prototype.clearFactory = function() {
		this.factory = {};
	};

	GameEngine.prototype.removeEntity = function(entity) {
		this.removeFromLayer(entity);
		if(this.balloons[entity.ID]) {
			delete this.balloons[entity.ID];
		}
		delete this.entities[entity.ID];
	};

	GameEngine.prototype.update = function(dt) {
		var keys = Object.keys(this.entities);
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this.entities[key].update(dt);
			if(this.entities[key]._defferedDeath && !this.entities[key].point) {
					this.entities[key].point = true;
					this.topBoard.score.addToScore(this.entities[key].cost);
					this.spawnEntity('Point', {
					y: this.entities[key].y - this.entities[key].height / 3,
					x: this.entities[key].x + this.entities[key].width * 0.7,
					cost: this.entities[key].cost,
					scale: this.entities[key].scale,
				});
			}
			if(this.entities[key].isDead) {				
				this.removeEntity(this.entities[key]);
			}
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
	gameEngine.enableShooting();

	/*gameEngine.spawnEntity("Cloud", {
			y: 100,
			width: 200,
			height: 100,
			zIndex: 1,
			velocity: -20
			});
	gameEngine.spawnEntity("BlueBalloon", {
				y: 600,
				x: 600,
				width: 75,
				height: 100,
				zIndex: 6,
				velocity: -50
			});
	gameEngine.spawnEntity("OrangeBalloon", {
				y: 600,
				x: 800,
				width: 75,
				height: 100,
				zIndex: 5,
				velocity: -80
			});
	gameEngine.spawnEntity("OrangeBalloon", {
				y: 600,
				x: 850,
				width: 75,
				height: 100,
				zIndex: 5,
				velocity: -50
			});
	gameEngine.spawnEntity("Cloud", {
			y: 150,
			width: 150,
			height: 75,
			zIndex: -1,
			velocity: 30
			});
	gameEngine.spawnEntity("Cloud", {
			y: 200,
			width: 200,
			height: 100,
			zIndex: 2,
			velocity: 20
			});*/

	return gameEngine;
});