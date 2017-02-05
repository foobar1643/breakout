/* @flow */
import MovementProxy from './MovementProxy';
import Ball from '../Entity/Ball';
import {STATE_FREE} from '../Entity/Ball';

export default class ProxyBall extends MovementProxy {

    _ball: Ball;
    _hashMap: any;

    constructor(ball: Ball, map: any) {
        super(ball);
        this._ball = ball;
        this._hashMap = map;
    }

    freeStateMove() {
        if(this._ball.state === STATE_FREE) {
            super.move(this._ball.hDirection, this._ball.vDirection);
        }
    }

    setFreeState() {
        this._ball.unbind();
    }

}