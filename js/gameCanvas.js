define(function(){

    function GameCanvas() {
        this.canvas = document.createElement('canvas'),
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1630;
        this.canvas.height = 768;
        this.canvas.id = 'my_canvas';
    };

    GameCanvas.prototype.setup = function() {
        document.querySelector('#canvas-wrapper').appendChild(this.canvas);
    };

    var gameCanvas = new GameCanvas();

    return gameCanvas;
});