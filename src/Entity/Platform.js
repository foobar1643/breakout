define(['./Item', './DOMGameField', './Ball'], function(Item, GameField, Ball) {
    var field = new GameField();

    var Platform = function(width, height) {
        var platformY = (field.height - (field.height - (field.height - height))) - height;
        var platformX = (field.width / 2) - (width / 2);
        var ballSticker = null;
        Item.call(this, platformX, platformY, width, height, 'rgb(255, 255, 255)', 15);
    }

    Platform.prototype = Object.create(Item.prototype);
    Platform.prototype.oldMove = Platform.prototype.move; // TODO: Rename an old function into something appropriate

    Platform.prototype.move = function(direction) { // TODO: Refactor this code
        var previousPos = this.x;
        var isMoved = (this.oldMove(direction) != previousPos);
        if(this.ballSticker != null) {
            this.ballSticker.moveSticked(this.speed, direction, isMoved);
        }
    }

    Platform.prototype.stickBall = function(ball) {
        this.ballSticker = ball;
    }

    Platform.prototype.unstickBall = function() {
        if(this.ballSticker != null) { // TODO: Separate function for checking sticked ball state
            this.ballSticker.setFreeState(); // TODO: Encapsulate this value
            this.ballSticker = null;
        }
    }

    return Platform;
});

