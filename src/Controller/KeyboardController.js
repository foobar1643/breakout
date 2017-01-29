define(['../Entity/Item'], function(Item) {
    var KeyboardController = function(platform) {
        this.platform = platform;

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    KeyboardController.prototype.keyDownEvent = function(event) {
        switch(event.code) {
            case 'KeyD':
                this.platform.move(Item.ITEM_MOVE_RIGHT);
                break;
            case 'KeyA':
                this.platform.move(Item.ITEM_MOVE_LEFT);
                break;
        }
    }

    return KeyboardController;
});