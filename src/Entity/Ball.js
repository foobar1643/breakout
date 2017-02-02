define(['./Item', '../Settings'], function(Item, Settings) {
    var Ball = function() {
        Item.call(this, 'circle', 0, 0, 0, 0, 'green', Ball.H_SPEED, Ball.V_SPEED);

        this.radius = 7;
        this.height = this.radius;
        this.width = this.radius;

        this.state = Ball.STATE_PAUSED;
        this.directionHorizontal = Item.DIRECTION_LEFT;
        this.directionVertical = Item.DIRECTION_NONE;
    }

    Ball.H_SPEED = 0.5;
    Ball.V_SPEED = 2;

    Ball.STATE_PAUSED = 'paused';
    Ball.STATE_STICKED = 'sticked';
    Ball.STATE_FREE = 'free';

    Ball.prototype = Object.create(Item.prototype);

    Ball.prototype.setFreeState = function() {
        this.horizontalSpeed = Ball.H_SPEED;
        this.verticalSpeed = Ball.V_SPEED;

        this.directionHorizontal = this.determineHorizontalDirection();
        this.directionVertical = Item.DIRECTION_UP;
        this.state = Ball.STATE_FREE;
    }

    Ball.prototype.onCollision = function(collisionType) {
        console.log(collisionType);
        switch(collisionType) { // TODO: Fix wierd behavior when two types of collisions occur simultaneously
            case 'horizontal':
                return this.flipHorizontalDirection();
            case 'vertical':
                return this.flipVerticalDirection();
        }
    }

    Ball.prototype.determineHorizontalDirection = function() {
        return (this.x <= (Settings.SCREEN_WIDTH / 2) ) ?
            Item.DIRECTION_RIGHT : Item.DIRECTION_LEFT ;
    }

    Ball.prototype.flipHorizontalDirection = function() {
        this.directionHorizontal = (this.directionHorizontal == Item.DIRECTION_LEFT) ?
            Item.DIRECTION_RIGHT : Item.DIRECTION_LEFT;
    }

    Ball.prototype.flipVerticalDirection = function() {
        this.directionVertical = (this.directionVertical == Item.DIRECTION_UP) ?
            Item.DIRECTION_DOWN : Item.DIRECTION_UP;
    }

    Ball.prototype.stickToPlatform = function(platform) {
        this.horizontalSpeed = platform.horizontalSpeed;
        this.state = Ball.STATE_STICKED;
        platform.stickBall(this);
        this.x = platform.x + (platform.width / 2);
        this.y = platform.y - (platform.height / 2);
    }

    return Ball;
});