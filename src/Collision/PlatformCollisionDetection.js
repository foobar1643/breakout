define(['./CollisionDetection'], function(CollisionDetector) {
    var PlatformCollisionDetection = function(platform) {
        CollisionDetector.call(this);
        this.platform = platform;
    }

    PlatformCollisionDetection.prototype = Object.create(CollisionDetector.prototype);
    // TODO: Don't overcomplicate code with multitple position calculations,
    // calculate next position only one time. Use calculated position for both
    // collision detection and moving.
    PlatformCollisionDetection.prototype.collision = function(direction) {
        var mathOperation = this.platform.movingMathOperation(direction);
        var nextPos = mathOperation(this.platform.x, this.platform.horizontalSpeed);

        return (nextPos >= (this.gameWidth - this.platform.width) || nextPos <= 0) ?
            true : false;
    }

    return PlatformCollisionDetection;
});