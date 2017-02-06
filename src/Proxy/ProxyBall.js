/* @flow */
import MovementProxy from './MovementProxy';
import Ball from '../Entity/Ball';
import CollisionManager from '../Collision/CollisionManager';
import {STATE_FREE} from '../Entity/Ball';

export default class ProxyBall extends MovementProxy {

    _ball: Ball;
    _hashMap: any;
    _detector: CollisionManager;

    constructor(ball: Ball, map: any) {
        super(ball);
        this._ball = ball;
        this._hashMap = map;
        this._detector = new CollisionManager(this._ball, this._hashMap);
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
                        return this._ball.flipHorizontalDirection();
                    case 'horizontal':
                        return this._ball.flipVerticalDirection();
                }
                return;
            }

            super.move(position);
        }
    }

    setFreeState() {
        this._ball.unbind();
    }

}