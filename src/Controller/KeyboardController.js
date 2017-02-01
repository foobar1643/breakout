define(['../Entity/Item', '../Bootstrap'], function(Item, Bootstrap) {
    var KeyboardController = function(platform, view) {
        this.View = view;
        this.platform = platform;

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    KeyboardController.prototype.keyDownEvent = function(event) {
        switch(event.code) {
            case 'KeyQ':
                this.View.requestAnimationFrameX();
                break;
            case 'KeyP':
                this.View.togglePause();
                break;
            case 'KeyR':
                var gameItems = Bootstrap();
                this.platform = gameItems[0];
                this.View.resetGameItems(gameItems);
                break;
            case 'KeyD':
                this.platform.move(Item.DIRECTION_RIGHT);
                break;
            case 'KeyA':
                this.platform.move(Item.DIRECTION_LEFT);
                break;
            case 'KeyW':
                this.platform.move(Item.DIRECTION_UP);
                break;
            case 'KeyS':
                this.platform.move(Item.DIRECTION_DOWN);
                break;
            case 'Space':
                this.platform.unstickBall();
                break;
        }
    }

    return KeyboardController;
});