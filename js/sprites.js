define(['data/balloonsAtlas', 'data/balloons2', 'data/explosion'], function(balloonsAtlas) {
	function Sprites(arr) {
		this.sprites = {};
		this.atlases = arr;
	};

	Sprites.prototype.defSprite = function (name, atlasKey, x, y, w, h, cx, cy) {   
		var spt = {
			"id": name,
			"x": x,
			"y": y,
			"w": w,
			"h": h,
			"cx": cx === null ? 0 : cx,
			"cy": cy === null ? 0 : cy
		};
		this.sprites[atlasKey] = this.sprites[atlasKey] ? this.sprites[atlasKey] : [];
		this.sprites[atlasKey].push(spt);
	};

	Sprites.prototype.parseAtlasDefinition = function (atlasIndex, key) {
		var atlas = this.atlases[atlasIndex];
		for(var pic in atlas.frames) {
			var sprite = atlas.frames[pic];
			var cx = -sprite.frame.w * 0.5;
			var cy = -sprite.frame.h * 0.5;
			this.defSprite(pic, key, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy);
		}       
	};

	Sprites.prototype.getParticularSprites = function (atlasKey, arrOfIDs) {
		if (!Array.isArray(arrOfIDs)) {
			return this.sprites[atlasKey][arrOfIDs];
		}
		var neededSprites = [];
		for(var i = 0; i < arrOfIDs.length; i++) {
			var key = arrOfIDs[i];
			neededSprites.push(this.sprites[atlasKey][key]);
		}
		return neededSprites;
	};

	Sprites.prototype.sheetIsFound = function (atlasKey) {
		if(this.sprites[atlasKey]) {
			return true;
		}
		return false;
	};

	var spriteCollection = new Sprites(arguments);
	
	var keys = Object.keys(spriteCollection.atlases);
	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var atlasKey = spriteCollection.atlases[key].meta.image;

		spriteCollection.parseAtlasDefinition(i, atlasKey);
		
	}
	console.log(spriteCollection)
	return spriteCollection;

});