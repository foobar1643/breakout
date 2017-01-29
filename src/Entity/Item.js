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
        context.strokeStyle = '#000000';
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
        var nextPos = this.x - this.speed;
        return (nextPos < 0) ? 0 : nextPos;
    }

    Item.prototype.calculateRightCollisionLength = function() {
        var nextPos = this.x + this.speed;
        return (nextPos >= Item.COLLISION_BOX_X - this.width) ? Item.COLLISION_BOX_X - this.width : nextPos;
    }

    return Item;
});