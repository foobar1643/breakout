/* @flow */
import MovementProxy from './MovementProxy';
import Ball from '../Entity/Ball';

export default class BallMovementProxy extends MovementProxy {

    constructor(ball: Ball) {
        super(ball);
    }

}