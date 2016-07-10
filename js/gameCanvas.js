define(function(){

    function GameCanvas() {
        this.canvas = document.createElement('canvas'),
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1280;
        this.canvas.height = 576;
        this.canvas.id = 'my_canvas';
    };

    GameCanvas.prototype.setup = function() {
        document.body.appendChild(this.canvas);
    };

    var gameCanvas = new GameCanvas();

    return gameCanvas;
});