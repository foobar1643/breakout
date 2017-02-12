/* @flow */
import Proxy from './Proxy';
import Ball from '../Entity/Ball';
import BallCollisionManager from '../Collision/BallCollisionManager';
import {STATE_FREE} from '../Entity/Ball';

export default class ProxyBall extends Proxy {

    _ball: Ball;
    _hashMap: any;
    _detector: BallCollisionManager;

    constructor(ball: Ball, map: any) {
        super(ball);
        this._ball = ball;
        this._hashMap = map;
        this._detector = new BallCollisionManager(this._ball, this._hashMap);
    }

    move() {
        console.log('move called');
        let position = this._ball.getNextPosition();
        super.move(position);
    }

    freeStateMove() {
        if(this._ball.state === STATE_FREE) {
            let position = this._ball.getNextPosition();
            let collision = this._detector.collision(position);
            if(collision !== false) {
                switch(collision) {
                    case 'vertical':
                        return this._ball.flipVerticalDirection();
                    case 'horizontal':
                        return this._ball.flipHorizontalDirection();
                }
                throw new TypeError('undefined collision type');
            }

            super.move(position);
        }
    }
}