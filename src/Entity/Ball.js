define(['./Item', './DOMGameField'], function(Item, GameField) {

    var domField = new GameField();

    var Ball = function() {
        this.x = 500;
        this.y = 300;
        this.radius = 7;
        this.speed = 1;
        this.state = Ball.STATE_PAUSED;
        this.directionHorizontal = Ball.DIRECTION_NONE;
        this.directionVertical = Ball.DIRECTION_NONE;
    }

    Ball.DIRECTION_NONE = 'none';
    Ball.DIRECTION_UP = 'up';
    Ball.DIRECTION_DOWN = 'down';
    Ball.DIRECTION_LEFT = Item.ITEM_MOVE_LEFT;
    Ball.DIRECTION_RIGHT = Item.ITEM_MOVE_RIGHT;

    Ball.STATE_PAUSED = 'paused';
    Ball.STATE_STICKED = 'sticked';
    Ball.STATE_FREE = 'free';

    Ball.prototype = Object.create(Item.prototype);

    Ball.prototype.render = function(context) {
        if(this.state == Ball.STATE_FREE) {
            this.move();
        }
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#000000';
        context.stroke();
    }

    Ball.prototype.setFreeState = function() {
        this.directionHorizontal = this.determineHorizontalDirection();
        this.directionVertical = Ball.DIRECTION_UP;
        this.state = Ball.STATE_FREE;
    }

    Ball.prototype.determineHorizontalDirection = function() {
        var halfScreen = domField.width / 2;
        if(this.x <= halfScreen) {
            return Ball.DIRECTION_RIGHT;
        }
        return Ball.DIRECTION_LEFT;
    }

    Ball.prototype.move = function() {
        switch(this.directionHorizontal) {
            case Ball.DIRECTION_LEFT:
                this.x = this.x - (this.speed / 2);
                break;
            case Ball.DIRECTION_RIGHT:
                this.x = this.x + (this.speed / 2);
                break;
        }

        switch(this.directionVertical) {
            case Ball.DIRECTION_UP:
                this.y = this.y - this.speed;
                break;
            case Ball.DIRECTION_DOWN:
                this.y = this.y + this.speed;
                break;
        }
    }

    Ball.prototype.stickToPlatform = function(platform) {
        this.state = Ball.STATE_STICKED;
        platform.stickBall(this);
        this.x = platform.x + (platform.width / 2);
        this.y = platform.y - (platform.height / 2);
    }

    Ball.prototype.moveSticked = function(speed, direction, isMoved) {
        if(isMoved == true) {
            this.x = (direction == 'left') ? this.x - speed : this.x + speed;
        }
    }

    return Ball;
});