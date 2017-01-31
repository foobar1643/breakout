define(function() {
    var View = function(gameField, gameItems, hashMap) {
        this.canvas = gameField.canvas;
        this.context = this.canvas.getContext('2d');

        this.hashMap = hashMap;

        document.getElementById('game-container').appendChild(this.canvas); // Draw a canvas on the screen

        this.gameItems = gameItems;
        this.lastFrameTime = 0;

        // Start a game loop
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    View.DRAW_HASHMAP = true;
    View.HASHMAP_STYLE = 'blue';
    View.MAX_FPS = 60;

    View.prototype.line = function(fromX, fromY, toX, toY) {
        this.context.beginPath();
        this.context.strokeStyle = View.HASHMAP_STYLE;
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.stroke();
    }

    View.prototype.drawHashMap = function() {
        //console.log(View.DRAW_HASHMAP);
        if(View.DRAW_HASHMAP) {
            var y = 0; var x = 0;

            for(var i = 0; i < Math.floor(this.canvas.height / this.hashMap.cellSize); i++) { // Rows
                this.line(0, y, this.canvas.width, y);
                y = y + this.hashMap.cellSize;
            }

            for(var i = 0; i < Math.floor(this.canvas.width / this.hashMap.cellSize); i++) { // Cols
                this.line(x, 0, x, this.canvas.width);
                x = x + this.hashMap.cellSize;
            }
        }
        return;
    }

    View.prototype.prepareScene = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = 'rgb(255, 255, 255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawHashMap();
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
        // Clear every bucket in hashmap
        this.hashMap.clearBuckets();
        // Add game items to the buckets
        this.hashMap.addGameItems(this.gameItems);
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