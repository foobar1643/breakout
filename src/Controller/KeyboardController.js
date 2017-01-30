define(['../Entity/Item'], function(Item) {
    var KeyboardController = function(platform) {
        this.platform = platform;

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    KeyboardController.prototype.keyDownEvent = function(event) {
        switch(event.code) {
            case 'KeyD':
                this.platform.move(Item.DIRECTION_RIGHT);
                break;
            case 'KeyA':
                this.platform.move(Item.DIRECTION_LEFT);
                break;
            case 'Space':
                this.platform.unstickBall();
                break;
        }
    }

    return KeyboardController;
});