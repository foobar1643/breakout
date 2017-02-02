define(['./CollisionManager'], function(CollisionDetector) {
    var CollisionManager = function(ball, hashMap) {
        CollisionDetector.call(this);
        this.ball = ball;
        this.hashMap = hashMap;
    }

    CollisionManager.prototype = Object.create(CollisionDetector.prototype);

    CollisionManager.prototype.collision = function(vDirection, hDirection) { // Combine this with collisionType()
        var collisionType = false;
        if(this.verticalCollision(vDirection, hDirection) || this.horizontalCollision(hDirection, vDirection)) {
            collisionType = this.collisionType(vDirection, hDirection);
        }
        return collisionType;
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
        //console.log(this.ball);
        var mathOperation = this.ball.movingMathOperation(direction);
        return mathOperation(axis, speed);
    }

    CollisionManager.prototype.collisionType = function(vDirection, hDirection) { // Combine this with collision()
        if(this.horizontalCollision(hDirection, vDirection)) {
            return 'horizontal';
        } else if(this.verticalCollision(vDirection, hDirection)) {
            return 'vertical';
        }

        return 'none';
    }

    return CollisionManager;

});


/*CollisionManager.prototype.verticalCollision = function(direction) {
    var nextPos = this.getNextPos(direction, this.ball.y, this.ball.verticalSpeed);

    var nearby = this.hashMap.getNearbyObjects(this.ball);

    var topBox = 0 + this.ball.radius;
    var bottomBox = this.gameHeight - this.ball.radius - 5;
    //var hsMapCollision = this.hashMapCollision(nextPos, );
    var hashMapCollision = false;

    for(var i = 0; i < nearby.length; i++) {
        if(!hashMapCollision) {
            var hBoxStart = nearby[i].y - this.ball.radius;
            var hBoxEnd = nearby[i].y + nearby[i].height + this.ball.radius;

            if(nextPos >= hBoxStart && nextPos <= hBoxEnd) {
                var xStart = nearby[i].x - this.ball.radius;
                var xEnd = nearby[i].x + nearby[i].width;
                if(this.ball.x >= xStart && this.ball.x <= xEnd) hashMapCollision = true;
            }

        }
    }

    var gameFieldCollision = (nextPos >= bottomBox || nextPos <= topBox);
    return gameFieldCollision || hashMapCollision;
}

CollisionManager.prototype.horizontalCollision = function(direction) {
        var nextPos = this.getNextPos(direction, this.ball.x, this.ball.verticalSpeed);

        var nearby = this.hashMap.getNearbyObjects(this.ball);

        var topBox = 0 + this.ball.radius;
        var bottomBox = this.gameWidth - this.ball.radius - 5;
        var hashMapCollision = false;

        for(var i = 0; i < nearby.length; i++) {
            if(!hashMapCollision) {
                var hBoxStart = nearby[i].x - this.ball.radius;
                var hBoxEnd = nearby[i].x + nearby[i].width + this.ball.radius;

                if(nextPos >= hBoxStart && nextPos <= hBoxEnd) {
                    var xStart = nearby[i].y;
                    var xEnd = nearby[i].y + nearby[i].height;
                    if(this.ball.y >= xStart && this.ball.y <= xEnd) hashMapCollision = true;
                }

            }
        }

        var gameFieldCollision = (nextPos >= bottomBox || nextPos <= topBox);
        return gameFieldCollision || hashMapCollision;
}*/