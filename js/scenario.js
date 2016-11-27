define(['gameEngine', 'gameCanvas', 'data/lvl1'], function(gameEngine, gameCanvas, lvl1) {
	function Scenario(obj) {
		this.botSpawnMap = [];
		this.leftSpawnMap = [];
		this.rightSpawnMap = [];
		this.topSpawnMap = [];
		this.sInterval;
		this.sTimeout;
		this.tempBotSpawnMap = [];
	};

	Scenario.prototype.getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	Scenario.prototype.run = function (lvl) {
		this.getSpawnPoints();

		var lvlEntities = lvl1.entities;
		var lvlSpecials = lvl1.specials;
		var lvlEnv = lvl1.environment;
		var lvlTime = lvl1.time;
		var total = lvl1.sum;
		var self = this;

		gameEngine.spawnTopBoard({
			timer: lvlTime,
			bullets: 8,
			score: 0
		});

		for(var i = 0; i < lvlEnv.length; i++) {
			gameEngine.spawnEntity(lvlEnv[i].name, {
			y: this.leftSpawnMap[lvlEnv[i].position].y,
			x: this.leftSpawnMap[lvlEnv[i].position].x,
			type: lvlEnv[i].type,
			scale: lvlEnv[i].scale,
			zIndex: 1,
			velocity: lvlEnv[i].velocity
			});
		}

		this.sInterval = setInterval(function() {
			var randomIndex = Math.floor(Math.random() * (lvlEntities.length - 0)) + 0;
			var randomIndexSpecials = Math.floor(Math.random() * (lvlSpecials.length - 0)) + 0;
			var randomPoint = Math.floor(Math.random() * (self.tempBotSpawnMap.length - 0)) + 0;

			if(self.getRandomInt(1, 10) === 3) {

				gameEngine.spawnEntity(lvlSpecials[randomIndexSpecials].name, {
					y: self.leftSpawnMap[randomPoint].y,
					x: self.leftSpawnMap[randomPoint].x,
					scale: lvlSpecials[randomIndexSpecials].scale,
					theta: lvlSpecials[randomIndexSpecials].theta,
					zIndex: Math.floor(10 * lvlSpecials[randomIndexSpecials].scale),
					velocity: lvlSpecials[randomIndexSpecials].velocity
				});

			}
			gameEngine.spawnEntity(lvlEntities[randomIndex].name, {
				y: self.tempBotSpawnMap[randomPoint].y,
				x: self.tempBotSpawnMap[randomPoint].x,
				scale: lvlEntities[randomIndex].scale,
				theta: lvlEntities[randomIndex].theta,
				zIndex: Math.floor(10 * lvlEntities[randomIndex].scale),
				velocity: lvlEntities[randomIndex].velocity
			});
			self.tempBotSpawnMap.splice(randomPoint, 1);
			if (self.tempBotSpawnMap.length ===0) {
				self.tempBotSpawnMap = self.tempBotSpawnMap.concat(self.botSpawnMap);
			}
		}, (lvlTime * 60 * 1000) / total);
		this.sTimeout = setTimeout(function() {
			clearInterval(self.sInterval);
		}, lvlTime * 60 * 1000)
	};

	Scenario.prototype.stop = function () {
		clearInterval(this.sInterval);
		clearTimeout(this.sTimeout);
	}

	Scenario.prototype.getSpawnPoints = function () {
		var widthInteral =  gameCanvas.canvas.width / 12;
		var heightInteral =  gameCanvas.canvas.height / 12;
		var outsetWidth = widthInteral / 2;
		var outsetHeight = heightInteral / 2;
		for (var i = 1; i <= 12; i++) {
			this.topSpawnMap.push({x: widthInteral * i - outsetWidth, y: 0});
			this.botSpawnMap.push({x: widthInteral * i - outsetWidth, y: gameCanvas.canvas.height});
			this.leftSpawnMap.push({x: 0, y: heightInteral * i - outsetHeight});
			this.rightSpawnMap.push({x: gameCanvas.canvas.width, y: heightInteral * i - outsetHeight});
		}
		this.tempBotSpawnMap = this.tempBotSpawnMap.concat(this.botSpawnMap);
	};
	var scenario = new Scenario();
	return scenario;
});
