/* @flow */
import MovementProxy from './MovementProxy';
import Ball from '../Entity/Ball';

export default class ProxyBall extends MovementProxy {

    _ball: Ball;
    _hashMap: any;

    constructor(ball: Ball, map: any) {
        super(ball);
        this._hashMap = map;
    }

}