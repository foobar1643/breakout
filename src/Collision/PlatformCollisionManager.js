define(['./CollisionManager'], function(CollisionManager) {
    var PlatformCollisionManager = function(platform, hashMap) {
        CollisionManager.call(this);
        this.platform = platform;
        this.hashMap = hashMap;
    }

    PlatformCollisionManager.prototype = Object.create(CollisionManager.prototype);
    // TODO: Don't overcomplicate code with multitple position calculations,
    // calculate next position only one time. Use calculated position for both
    // collision detection and moving.
    PlatformCollisionManager.prototype.collision = function(vDirection, hDirection) {
        //console.log(hDirection);
        var mathOperation = this.platform.movingMathOperation(hDirection);
        var nextPos = mathOperation(this.platform.x, this.platform.horizontalSpeed);
        return (nextPos >= (this.gameWidth - this.platform.width) || nextPos <= 0) ?
            true : false;
    }

    return PlatformCollisionManager;
});