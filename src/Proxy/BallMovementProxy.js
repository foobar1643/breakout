define(['./MovementProxy', '../Collision/BallCollisionManager', '../Entity/Ball'], function(MovementProxy, CollisionManager, Ball) {
    var BallMovementProxy = function(ball, hashMap) {
        this.ball = ball;
        this.detector = new CollisionManager(ball, hashMap);
        MovementProxy.call(this, this.ball, this.detector);
    }

    BallMovementProxy.prototype = Object.create(MovementProxy.prototype);

    BallMovementProxy.prototype.moveItem = function() {
        if(this.ball.state == Ball.STATE_FREE) {
            MovementProxy.prototype.moveItem.call(this, this.ball.directionVertical, this.ball.directionHorizontal);
        }
    }

    return BallMovementProxy;

});