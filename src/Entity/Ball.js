define(['./Item', './DOMGameField'], function(Item, GameField) {
    var Ball = function() {
        this.x = 500;
        this.y = 300;
        this.radius = 7;
        this.speed = 2;
        this.state = Ball.STATE_PAUSED;
        this.directionHorizontal = Item.DIRECTION_NONE;
        this.directionVertical = Item.DIRECTION_NONE;
    }

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
        this.directionVertical = Item.DIRECTION_UP;
        this.state = Ball.STATE_FREE;
    }

    Ball.prototype.determineHorizontalDirection = function() {
        return (this.x <= (GameField.WIDTH / 2) ) ?
            Item.DIRECTION_RIGHT : Item.DIRECTION_LEFT ;
    }

    Ball.prototype.move = function() {
        switch(this.directionHorizontal) {
            case Item.DIRECTION_LEFT:
                this.x = this.x - (this.speed / 2);
                break;
            case Item.DIRECTION_RIGHT:
                this.x = this.x + (this.speed / 2);
                break;
        }

        switch(this.directionVertical) {
            case Item.DIRECTION_UP:
                this.y = this.y - this.speed;
                break;
            case Item.DIRECTION_DOWN:
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

    Ball.prototype.moveSticked = function(speed, direction) {
        this.x = (direction == 'left') ? this.x - speed : this.x + speed;
    }

    return Ball;
});