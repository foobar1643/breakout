define(function() {

    var Item = function(type, x, y, width, height, color, hSpeed, vSpeed) {
        this.type = type;
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

    Item.prototype.onCollision = function(collision) {
        return;
    }

    Item.prototype.move = function(vDirection, hDirection) { // Moving code shouldn't be in Entity class
        var vMathOperation = this.movingMathOperation(vDirection);
        var hMathOperation = this.movingMathOperation(hDirection);

        this.y = vMathOperation(this.y, this.verticalSpeed);
        this.x = hMathOperation(this.x, this.horizontalSpeed);

        return [this.x, this.y];
    }

    // TODO: Throw a type error if switch wasn't triggered
    Item.prototype.movingMathOperation = function(direction) {
        switch(direction) {
            case Item.DIRECTION_UP:
            case Item.DIRECTION_LEFT:
                return function(axis, speed) { return axis - speed };
            case Item.DIRECTION_DOWN:
            case Item.DIRECTION_RIGHT:
                return function(axis, speed) { return axis + speed };
            case Item.DIRECTION_NONE:
                return function(axis, speed) { return axis };
        }
        throw new TypeError("Can't find math operation for direction " + direction);
    }

    return Item;
});

/*switch(direction) { // Combine this with movingMathOperation()
    case Item.DIRECTION_UP:
        return this.y = mathOperation(this.y, this.verticalSpeed);
    case Item.DIRECTION_DOWN:
        return this.y = mathOperation(this.y, this.verticalSpeed);
    case Item.DIRECTION_LEFT:
        return this.x = mathOperation(this.x, this.horizontalSpeed);
    case Item.DIRECTION_RIGHT:
        return this.x = mathOperation(this.x, this.horizontalSpeed);
}*/