import CollisionManager from './CollisionManager';

export default class BallCollisionManager extends CollisionManager {

    constructor(ball, hashMap) {
        super(ball, hashMap);
        this._ball = ball;
    }

    _collides(position, item) {
        return ( (position.x >= item.x - this._ball.width - 1 && position.x <= item.x + item.width + this._ball.width + 1) &&
          (position.y >= item.y && position.y <= item.y + item.height) );
    }

    _collidesV(position, item) {
        return ((position.y >= item.y - this._ball.height && position.y <= item.y + item.height + this._ball.height) &&
            (position.x >= item.x - this._ball.width && position.x <= item.x + item.width + this._ball.width));
    }
}