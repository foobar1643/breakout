define(function (require) {
    var Settings = require('./Settings');
    var Loader = require('./ResourceLoader');
    var HashMap = require('./Utility/HashMap');
    var Render = require('./Render/GameRender');
    var KeyboardController = require('./Controller/KeyboardController');

    var Game = function() {
        this.gameLoader = new Loader();
        this.hashMap = new HashMap();
        this.render = new Render();

        this.items = this.gameLoader.loadGame();
        this.hashMap.addGameItems(this.items);
        this.movingItems = [this.gameLoader.loadBallProxy(this.items[1], this.hashMap)];

        this.keyboard = new KeyboardController(this.items[0], this);

        this.gameState = Game.GAME_GOING;
        this.frameMs = null;
    }

    Game.GAME_PAUSED = 'paused';
    Game.GAME_GOING = 'going';

    Game.prototype.gameLoop = function(time) {
        if(this.gameState == Game.GAME_GOING) {
            // Clear every bucket in the spatial hash map
            this.hashMap.clearBuckets();
            // Add game items to the spatial hash map
            this.hashMap.addGameItems(this.items);
            // Move items
            this.moveActive();
            // Prepare the screen for rendering game items
            this.render.prepareScreen();
            // Render game items on the screen
            this.render.renderItems(this.items);
        }

        // Iterate game loop
        if(time < this.frameMs + (1000 / Settings.MAX_FPS)) {
            window.requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }

        this.frameMs = time;
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    Game.prototype.moveActive = function() {
        for(var i = 0; i < this.movingItems.length; i++) {
            this.movingItems[i].moveItem();
        }
    }

    Game.prototype.togglePause = function() {
        this.gameState = (this.gameState == Game.GAME_GOING) ? Game.GAME_PAUSED : Game.GAME_GOING;
    }

    Game.prototype.reset = function() {
        this.gameLoader.resetItems();
        this.items = this.gameLoader.loadGame();
    }

    Game.prototype.startGameLoop = function() {
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    var main = new Game();
    main.startGameLoop();
});