import CollisionManager from './CollisionManager';

export default class BallCollisionManager extends CollisionManager {

    constructor(ball, hashMap) {
        super(ball, hashMap);
        this._ball = ball;
    }

    _collides(position, item) {

        if( (position.x >= item.x - this._ball.width - 1 && position.x <= item.x + item.width + this._ball.width + 1) &&
            (position.y >= item.y && position.y <= item.y + item.height)) {
                return true;
        }

        return false;
    }

    _collidesV(position, item) {

        if( (position.y >= item.y - this._ball.height && position.y <= item.y + item.height + this._ball.height) &&
            (position.x >= item.x - this._ball.width && position.x <= item.x + item.width + this._ball.width)) {
                return true;
        }

        return false;
    }

    collision(position) {
        let nearby = this._hashMap.getNearbyItems(this._ball);

        for(let item of nearby) {
            switch(true) {
                case this._collidesV(position, item):
                    return 'vertical';
                case this._collides(position, item):
                    return 'horizontal';
            }
        }
        return false;
    }


}