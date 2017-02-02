define(['../Entity/Item'], function(Item) {
    var KeyboardController = function(platform, game) {
        this.game = game;
        this.platform = platform;
        this.platformProxy = this.game.gameLoader.loadPlatformProxy(this.platform, this.game.hashMap);

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    KeyboardController.prototype.keyDownEvent = function(event) {
        switch(event.code) { // Check collisions here
            case 'KeyP':
                //this.View.togglePause();
                break;
            case 'KeyR':
                var items = this.game.gameLoader.loadGame();// This is broken
                this.platform = items[0];
                break;
            case 'KeyD':
                this.platformProxy.moveItem(Item.DIRECTION_NONE, Item.DIRECTION_RIGHT);
                break;
            case 'KeyA':
                this.platformProxy.moveItem(Item.DIRECTION_NONE, Item.DIRECTION_LEFT);
                break;
            /*case 'KeyW':
                this.platform.move(Item.DIRECTION_UP);
                break;
            case 'KeyS':
                this.platform.move(Item.DIRECTION_DOWN);*/
                break;
            case 'Space':
                this.platform.unstickBall();
                break;
        }
    }

    return KeyboardController;
});