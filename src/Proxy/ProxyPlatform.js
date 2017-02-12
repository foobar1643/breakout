/* @flow */
import Proxy from './Proxy';
import ProxyBall from './ProxyBall';
import Platform from '../Entity/Platform';
import CollisionManager from '../Collision/CollisionManager';

export default class ProxyPlatform extends Proxy {

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

    move() {
        let position = this._object.getNextPosition();
        let collision = this._detector.collision(position);
        if(collision !== false) {
            return;
        }

        super.move(position);

        if(this._platform.ballBound()) {
            this._proxyBall.move();
        }
    }

    unbindBall() {
        this._platform.releaseBall();
    }

    setDirections(horizontal: string, vertical: string) {
        super.setDirections(horizontal, vertical);
        if(this._platform.ballBound()) {
            this._proxyBall.setDirections(horizontal, vertical);
        }
    }
}