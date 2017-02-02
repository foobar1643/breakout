define(['./Item', '../Settings', './Ball', '../Collision/PlatformCollisionManager'], function(Item, Settings, Ball, CollisionDetector) {
    var Platform = function(width, height) {
        var platformY = (Settings.SCREEN_HEIGHT - (Settings.SCREEN_HEIGHT - (Settings.SCREEN_HEIGHT - height))) - height; // Find a better way to do this
        var platformX = (Settings.SCREEN_WIDTH / 2) - (width / 2);

        Item.call(this, 'rectangle', platformX, platformY, width, height, 'rgb(255, 255, 255)', 10, 2);

        this.stickedBall = null;
    }

    Platform.prototype = Object.create(Item.prototype);

    Platform.prototype.move = function(vDirection, hDirection) {
        var previousPos = this.x;
        var nextPos = Item.prototype.move.call(this, vDirection, hDirection)[1];

        if(this.hasStickedBall() && previousPos != nextPos) {
            this.stickedBall.move(vDirection, hDirection);
        }
    }

    Platform.prototype.stickBall = function(ball) {
        this.stickedBall = ball;
    }

    Platform.prototype.unstickBall = function() {
        if(this.hasStickedBall()) {
            this.stickedBall.setFreeState();
            this.stickedBall = null;
        }
    }

    Platform.prototype.hasStickedBall = function() {
        return (this.stickedBall != null);
    }

    return Platform;
});

