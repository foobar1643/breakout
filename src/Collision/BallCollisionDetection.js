define(['./CollisionDetection'], function(CollisionDetector) {
    var BallCollisionDetection = function(ball) {
        CollisionDetector.call(this);
        this.ball = ball;
    }

    BallCollisionDetection.prototype = Object.create(CollisionDetector.prototype);

    BallCollisionDetection.prototype.collision = function(hDirection, vDirection) {
        return this.gameFieldCollision(hDirection, vDirection);
    }

    BallCollisionDetection.prototype.verticalCollision = function(y) {
        var firstCollisionBox = this.gameHeight - this.ball.radius;
        var secondCollisionBox = 0 + this.ball.radius;
        return (y >= firstCollisionBox || y <= secondCollisionBox) ? true : false;
    }

    BallCollisionDetection.prototype.horizontalCollision = function(x) {
        var firstCollisionBox = this.gameWidth - this.ball.radius;
        var secondCollisionBox = 0 + this.ball.radius;
        return (x >= firstCollisionBox || x <= secondCollisionBox) ? true : false;
    }

    BallCollisionDetection.prototype.getNextY = function(direction, y, vSpeed) {
        var mathOperation = this.ball.movingMathOperation(direction);
        return mathOperation(y, vSpeed);
    }

    BallCollisionDetection.prototype.getNextX = function(direction, x, hSpeed) {
        var mathOperation = this.ball.movingMathOperation(direction);
        return mathOperation(x, hSpeed);
    }

    BallCollisionDetection.prototype.gameFieldCollision = function(hDirection, vDirection) {
        var nextX = this.getNextX(hDirection, this.ball.x, this.ball.horizontalSpeed);
        var nextY = this.getNextY(vDirection, this.ball.y, this.ball.verticalSpeed);

        return (this.horizontalCollision(nextX) || this.verticalCollision(nextY)) ?
            true : false;
    }

    BallCollisionDetection.prototype.collisionType = function(hDirection, vDirection) { // Vertical or Horizontal
        var nextX = this.getNextX(hDirection, this.ball.x, this.ball.horizontalSpeed);
        var nextY = this.getNextY(vDirection, this.ball.y, this.ball.verticalSpeed);

        if(this.horizontalCollision(nextX)) {
            return 'horizontal';
        } else if(this.verticalCollision(nextY)) {
            return 'vertical';
        }

        return Ball.DIRECTION_NONE;
    }

    return BallCollisionDetection;
});