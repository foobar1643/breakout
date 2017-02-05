/* @flow */
import MovementProxy from './MovementProxy';
import ProxyBall from './ProxyBall';
import Platform from '../Entity/Platform';
import CollisionManager from '../Collision/CollisionManager';

export default class ProxyPlatform extends MovementProxy {

    _proxyBall: ProxyBall;
    _platform: Platform;
    _hashMap: any;
    _detector: CollisionManager;

    constructor(platform: Platform, proxyBall: ProxyBall, map: any) {
        super(platform);
        this._platform = platform;
        this._proxyBall = proxyBall;
        this._hashMap = map;
        this._detector = new CollisionManager(this._platform, this._hashMap);
    }

    move(hDirection: string, vDirection: string) {

        if(this._detector.collision(hDirection, vDirection)) {
            return;
        }

        super.move(hDirection, vDirection);

        if(this._platform.ballBound()) {
            this._proxyBall.move(hDirection, vDirection);
        }
    }

    unbindBall() {
        this._platform.releaseBall();
        this._proxyBall.setFreeState();
    }

}