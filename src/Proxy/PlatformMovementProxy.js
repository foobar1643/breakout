define(['./MovementProxy', '../Collision/PlatformCollisionManager'], function(MovementProxy, CollisionManager) {
    var PlatformMovementProxy = function(platform, hashMap) {
        this.platform = platform;
        this.detector = new CollisionManager(platform, hashMap);
        MovementProxy.call(this, this.platform, this.detector);
    }

    PlatformMovementProxy.prototype = Object.create(MovementProxy.prototype);

    return PlatformMovementProxy;

});