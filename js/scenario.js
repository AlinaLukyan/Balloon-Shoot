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

	Scenario.prototype.run = function (lvl) {
		this.getSpawnPoints();
		
		var lvlEntities = lvl1.entities;
		var lvlTime = lvl1.time;
		var total = lvl1.sum;
		var self = this;

		gameEngine.spawnTopBoard({
			timer: lvlTime,
			bullets: 8,
			score: 0
		});
		
		this.sInterval = setInterval(function() {
			var randomIndex = Math.floor(Math.random() * (lvlEntities.length - 0)) + 0;
			var randomPoint = Math.floor(Math.random() * (self.tempBotSpawnMap.length - 0)) + 0;
			
			gameEngine.spawnEntity(lvlEntities[randomIndex].name, {
				y: self.tempBotSpawnMap[randomPoint].y,
				x: self.tempBotSpawnMap[randomPoint].x,
				scale: lvlEntities[randomIndex].scale,
				theta: lvlEntities[randomIndex].theta,
				zIndex: 10 * lvlEntities[randomIndex].scale,
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