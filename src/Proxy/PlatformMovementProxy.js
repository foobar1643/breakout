/* @flow */
import MovementProxy from './MovementProxy';
import BallMovementProxy from './BallMovementProxy';
import Platform from '../Entity/Platform';

export default class PlatformMovementProxy extends MovementProxy {

    _ballProxy: BallMovementProxy;
    _platform: Platform;

    constructor(platform: Platform, ballProxy: BallMovementProxy) {
        super(platform);
        this._platform = platform;
        this._ballProxy = ballProxy;
    }

    move(hDirection: string, vDirection: string) {
        super.move(hDirection, vDirection);
        if(this._platform.ballBound()) {
            this._ballProxy.move(hDirection, vDirection); // Move ball only if the platform moved
        }
    }

}