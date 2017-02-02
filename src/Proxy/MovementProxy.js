define(function() {
    var MovementProxy = function(object, collisionManager) {
        this.object = object;
        this.detector = collisionManager;
    }

    // TODO:
    // 1. Calculate next position of an object
    // 2. Check if it collides with something
    // 3. If there is collision - do nothing
    // 4. If there was no collision - move object
    MovementProxy.prototype.moveItem = function(vDirection, hDirection) {
        var collision = this.detector.collision(vDirection, hDirection);

        if(collision != false) {
            //console.log('collision!');
            this.object.onCollision(collision);
            return;
        }

        this.object.move(vDirection, hDirection);
    }

    return MovementProxy;

});