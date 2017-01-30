define(['./Item', './DOMGameField', './Ball'], function(Item, GameField, Ball) {
    var Platform = function(width, height) {
        var platformY = (GameField.HEIGHT - (GameField.HEIGHT - (GameField.HEIGHT - height))) - height; // Find a better way to do this
        var platformX = (GameField.WIDTH / 2) - (width / 2);
        var ballSticker = null;
        Item.call(this, platformX, platformY, width, height, 'rgb(255, 255, 255)', 15);
    }

    Platform.prototype = Object.create(Item.prototype);

    Platform.prototype.move = function(direction) {
        var previousPos = this.x;
        var nextPos = Item.prototype.move.call(this, direction);

        if(this.hasStickedBall() && previousPos != nextPos) {
            this.ballSticker.moveSticked(this.speed, direction);
        }
    }

    Platform.prototype.stickBall = function(ball) {
        this.ballSticker = ball;
    }

    Platform.prototype.unstickBall = function() {
        if(this.hasStickedBall()) {
            this.ballSticker.setFreeState();
            this.ballSticker = null;
        }
    }

    Platform.prototype.hasStickedBall = function() {
        return (this.ballSticker != null);
    }

    return Platform;
});

