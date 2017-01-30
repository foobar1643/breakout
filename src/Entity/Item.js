define(['./DOMGameField'], function(GameField) {

    var Item = function(x, y, width, height, color, hSpeed, vSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.horizontalSpeed = hSpeed;
        this.verticalSpeed = vSpeed;
    }

    // Direction constants for moving code
    Item.DIRECTION_NONE = 'none';
    Item.DIRECTION_UP = 'up';
    Item.DIRECTION_DOWN = 'down';
    Item.DIRECTION_LEFT = 'left';
    Item.DIRECTION_RIGHT = 'right';

    Item.prototype.render = function(context) {
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        context.strokeRect(this.x, this.y, this.width, this.height);

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }


        /**
         *
             switch(direction) {
                 case Item.DIRECTION_UP:
                     return this.y = this.y - this.verticalSpeed;
                 case Item.DIRECTION_DOWN:
                     return this.y = this.y + this.verticalSpeed;
                 case Item.DIRECTION_LEFT:
                     return this.x = this.x - this.horizontalSpeed;
                 case Item.DIRECTION_RIGHT:
                     return this.x = this.x + this.horizontalSpeed;
             }
         */

    Item.prototype.move = function(direction) {
        var mathOperation = this.movingMathOperation(direction);
        switch(direction) {
            case Item.DIRECTION_UP:
                return this.y = mathOperation(this.y, this.verticalSpeed);
            case Item.DIRECTION_DOWN:
                return this.y = mathOperation(this.y, this.verticalSpeed);
            case Item.DIRECTION_LEFT:
                return this.x = mathOperation(this.x, this.horizontalSpeed);
            case Item.DIRECTION_RIGHT:
                return this.x = mathOperation(this.x, this.horizontalSpeed);
        }
    }

    Item.prototype.movingMathOperation = function(direction) {
        switch(direction) {
            case Item.DIRECTION_UP:
            case Item.DIRECTION_LEFT:
                return function(axis, speed) { return axis - speed };
            case Item.DIRECTION_DOWN:
            case Item.DIRECTION_RIGHT:
                return function(axis, speed) { return axis + speed };
        }
    }

    /*Item.prototype.move = function(direction) {
        switch(direction) {
            case Item.DIRECTION_LEFT:
                return this.x = this.calculateLeftCollisionLength();
            case Item.DIRECTION_RIGHT:
                return this.x = this.calculateRightCollisionLength();
        }
        return false;
    }

    Item.prototype.calculateLeftCollisionLength = function() {
        var nextPos = this.x - this.speed;
        return (nextPos < 0) ? 2 : nextPos;
    }

    Item.prototype.calculateRightCollisionLength = function() {
        var nextPos = this.x + this.speed;
        return (nextPos >= GameField.WIDTH - this.width) ? GameField.WIDTH - (this.width + 2) : nextPos;
    }*/

    return Item;
});