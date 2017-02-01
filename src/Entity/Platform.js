define(['./Item', './DOMGameField', './Ball', '../Collision/PlatformCollisionDetection'], function(Item, GameField, Ball, CollisionDetector) {
    var Platform = function(width, height) {
        var platformY = (GameField.HEIGHT - (GameField.HEIGHT - (GameField.HEIGHT - height))) - height; // Find a better way to do this
        //var platformY = 315;
        var platformX = (GameField.WIDTH / 2) - (width / 2);
        Item.call(this, platformX, platformY, width, height, 'rgb(255, 255, 255)', 10, 2);
        this.ballSticker = null;
        this.detector = new CollisionDetector(this);
    }

    Platform.prototype = Object.create(Item.prototype);

    Platform.prototype.move = function(direction) {
        if(this.detector.collision(direction)) {
            return;
        }

        var previousPos = this.x;
        var nextPos = Item.prototype.move.call(this, direction);

        if(this.hasStickedBall() && previousPos != nextPos) {
            this.ballSticker.move(direction);
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

