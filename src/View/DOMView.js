define(function() {
    var View = function(gameField, gameItems) {
        this.canvas = gameField.canvas;
        this.context = this.canvas.getContext('2d');

        document.getElementById('game-container').appendChild(this.canvas); // Draw a canvas on the screen

        this.gameItems = gameItems;
        this.lastFrameTime = 0;

        // Start a game loop
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    View.MAX_FPS = 60;

    View.prototype.prepareScene = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = 'rgb(255, 255, 255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    View.prototype.renderGame = function() {
        for(var i = 0; i < this.gameItems.length; i++) {
            this.gameItems[i].render(this.context);
        }
    }

    View.prototype.resetGameItems = function(gameItems) {
        this.gameItems = gameItems;
    }

    View.prototype.gameLoop = function(timestamp) {
        // Prepare the scene for rendering a game.
        this.prepareScene();
        // Render an array of game items to the user.
        this.renderGame();

        // Iterate the game loop
        if(timestamp < this.lastFrameMs + (1000 / View.MAX_FPS)) {
            window.requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }

        this.lastFrameMs = timestamp;
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    return View;
});