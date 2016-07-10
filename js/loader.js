define(function() {
    function Loader() {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];    
    };

    Loader.prototype._load = function (url) {
        if(this.resourceCache[url]) {
            return this.resourceCache[url];
        } else {
            var img = new Image();
            var self = this;
            img.onload = function() {
                self.resourceCache[url] = img;
                if(self.isReady()) {
                    self.readyCallbacks.forEach(function(func) { func(); });
                }
            };
            this.resourceCache[url] = false;
            img.src = url;
        }
    };

    Loader.prototype.load = function (urlOrArr) {
        if(urlOrArr instanceof Array) {
            var self = this;
            urlOrArr.forEach(function(url) {
                self._load(url);
            });
        } else {
            this._load(urlOrArr);
        }
    };


    Loader.prototype.get = function (url) {
        return this.resourceCache[url];
    };

    Loader.prototype.isReady = function() {
        var ready = true;
        for(var k in this.resourceCache) {
            if(this.resourceCache.hasOwnProperty(k) &&
               !this.resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    };

    Loader.prototype.onReady = function (func) {
        this.readyCallbacks.push(func);
    };

    var loader = new Loader();

    return loader;
});
