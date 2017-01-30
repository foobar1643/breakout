define(['./Item', './DOMGameField', '../Collision/BallCollisionDetection'], function(Item, GameField, CollisionDetection) {
    var Ball = function() {
        Item.call(this, 0, 0, 0, 0, 'green', Ball.H_SPEED, Ball.V_SPEED);

        this.detector = new CollisionDetection(this);
        this.radius = 7;

        this.state = Ball.STATE_PAUSED;
        this.directionHorizontal = Item.DIRECTION_NONE;
        this.directionVertical = Item.DIRECTION_NONE;
    }

    Ball.H_SPEED = 1.5;
    Ball.V_SPEED = 3;

    Ball.STATE_PAUSED = 'paused';
    Ball.STATE_STICKED = 'sticked';
    Ball.STATE_FREE = 'free';

    Ball.prototype = Object.create(Item.prototype);

    Ball.prototype.render = function(context) {
        if(this.state == Ball.STATE_FREE) {
            this.freeStateMove();
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
        this.horizontalSpeed = Ball.H_SPEED;
        this.verticalSpeed = Ball.V_SPEED;

        this.directionHorizontal = this.determineHorizontalDirection();
        this.directionVertical = Item.DIRECTION_UP;
        this.state = Ball.STATE_FREE;
    }

    Ball.prototype.determineHorizontalDirection = function() {
        return (this.x <= (GameField.WIDTH / 2) ) ?
            Item.DIRECTION_RIGHT : Item.DIRECTION_LEFT ;
    }

    Ball.prototype.freeStateMove = function() {
        if(this.detector.collision(this.directionHorizontal, this.directionVertical)) {
            var collisionType = this.detector.collisionType(this.directionHorizontal, this.directionVertical);
            switch(collisionType) {
                case 'horizontal':
                    this.flipHorizontalDirection();
                    break;
                case 'vertical':
                    this.flipVerticalDirection();
                    break;
            }
        }

        this.move(this.directionHorizontal);
        this.move(this.directionVertical);
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