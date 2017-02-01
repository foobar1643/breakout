define(['./CollisionDetection'], function(CollisionDetector) {
    var CollisionManager = function(ball) {
        CollisionDetector.call(this);
        this.ball = ball;
    }

    CollisionManager.prototype = Object.create(CollisionDetector.prototype);

    CollisionManager.prototype.collision = function(vDirection, hDirection, hashMap) {
        this.hashMap = hashMap;
        return this.verticalCollision(vDirection, hDirection) || this.horizontalCollision(hDirection, vDirection);
    }

    CollisionManager.prototype.getUnitFromText = function(object, unit) {
        switch(unit) {
            case 'x':
                return object.width;
            case 'y':
                return object.height;
        }
    }

    CollisionManager.prototype.getAxisFromText = function(object, axis) {
        switch(axis) {
            case 'x':
                return object.x;
            case 'y':
                return object.y;
        }
    }

    CollisionManager.prototype.hashMapCollision = function(mainNextPos, checkNextPos, mainBoxAxis, checkBoxAxis) {
        var nearby = this.hashMap.getNearbyObjects(this.ball);

        for(var i = 0; i < nearby.length; i++) {
            var mainAxis = this.getAxisFromText(nearby[i], mainBoxAxis);
            var checkAxis = this.getAxisFromText(nearby[i], checkBoxAxis);

            var mainBoxStart = mainAxis - this.ball.radius;
            var mainBoxEnd = mainAxis + this.getUnitFromText(nearby[i], mainBoxAxis) + this.ball.radius;

            var checkBoxStart = checkAxis; // nearby[i].x - this.ball.radius FOR HORIZONTAL
            var checkBoxEnd = checkAxis + this.getUnitFromText(nearby[i], checkBoxAxis); // nearby[i].x + nearby[i].width FOR HORIZONTAL

            if( (mainNextPos >= mainBoxStart && mainNextPos <= mainBoxEnd) &&
                (checkNextPos >= checkBoxStart && mainNextPos <= checkBoxEnd)) {
                return true;
            }
        }
        return false;
    }

    CollisionManager.prototype.gameFieldCollision = function() {

    }

    CollisionManager.prototype.verticalCollision = function(direction, hDirection) {
        var nextPos = this.getNextPos(direction, this.ball.y, this.ball.verticalSpeed);
        var checkNextPos = this.getNextPos(hDirection, this.ball.x, this.ball.horizontalSpeed);

        var topBox = 0 + this.ball.radius;
        var bottomBox = this.gameHeight - this.ball.radius - 5;
        var hashMapCollision = this.hashMapCollision(nextPos, checkNextPos,  'y', 'x');

        return (nextPos >= bottomBox || nextPos <= topBox) || hashMapCollision;
    }

    CollisionManager.prototype.horizontalCollision = function(direction, vDirection) {
            var nextPos = this.getNextPos(direction, this.ball.x, this.ball.horizontalSpeed);
            var checkNextPos = this.getNextPos(vDirection, this.ball.y, this.ball.verticalSpeed);

            var topBox = 0 + this.ball.radius;
            var bottomBox = this.gameWidth - this.ball.radius - 5;
            var hashMapCollision = this.hashMapCollision(nextPos, checkNextPos, 'x', 'y');

            return (nextPos >= bottomBox || nextPos <= topBox) || hashMapCollision;
    }

    CollisionManager.prototype.getNextPos = function(direction, axis, speed) { // to the base class
        var mathOperation = this.ball.movingMathOperation(direction);
        return mathOperation(axis, speed);
    }

    CollisionManager.prototype.collisionType = function(hDirection, vDirection) { // Combine this with collision()
        if(this.horizontalCollision(hDirection, vDirection)) {
            return 'horizontal';
        } else if(this.verticalCollision(vDirection, hDirection)) {
            return 'vertical';
        }

        return 'none';
    }

    return CollisionManager;

});