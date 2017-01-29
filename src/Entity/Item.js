define(['./DOMGameField'], function(gameField) {
    var domField = new gameField();

    var Item = function(x, y, width, height, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    Item.ITEM_MOVE_LEFT = 'left';
    Item.ITEM_MOVE_RIGHT = 'right';

    Item.COLLISION_BOX_Y = domField.height;
    Item.COLLISION_BOX_X = domField.width;

    Item.prototype.render = function(context) {
        context.fillStyle = this.color;
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    Item.prototype.move = function(direction) {
        switch(direction) {
            case Item.ITEM_MOVE_LEFT:
                this.x = this.calculateLeftCollisionLength();
                break;
            case Item.ITEM_MOVE_RIGHT:
                this.x = this.calculateRightCollisionLength();
                break;
        }
    }

    Item.prototype.calculateLeftCollisionLength = function() {
        var nextX = this.x - this.speed;
        return (nextX < 0) ? 0 : nextX;
    }

    Item.prototype.calculateRightCollisionLength = function() {
        var nextX = this.x + this.speed;
        return (nextX >= Item.COLLISION_BOX_X - this.width) ? Item.COLLISION_BOX_X - this.width : nextX;
    }

    return Item;
});