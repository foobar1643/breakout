import ProxyPlatform from '../Proxy/ProxyPlatform';
import {DIRECTION_NONE, DIRECTION_UP, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_LEFT} from '../Entity/Item';

export default class KeyboardController {

    _proxy: ProxyPlatform;

    constructor(game, proxy: ProxyPlatform) {
        this._proxy = proxy;
        this._game = game;

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    keyDownEvent(event) {
        switch(event.keyCode) {
            case 80: // P
                this._game.togglePause();
                break;
            case 81: // Q
                if(this._game.paused()) {
                    this._game.stepAnimation();
                }
                break;

            case 87: // W
            case 65: // A
            case 83: // S
            case 68: // D
            case 32: // Space
                if(!this._game.paused()) {
                    this._moveProxy(event.keyCode);
                }
                break;
        }
    }

    _moveProxy(keyCode: number) {
        switch(keyCode) {
            case 68: // D
                this._proxy.setDirections(DIRECTION_RIGHT, DIRECTION_NONE);
                this._proxy.move();
                break;
            case 65: // A
                this._proxy.setDirections(DIRECTION_LEFT, DIRECTION_NONE);
                this._proxy.move();
                break;
            case 87: // W
                this._proxy.setDirections(DIRECTION_NONE, DIRECTION_UP);
                this._proxy.move();
                break;
            case 83: // S
                this._proxy.setDirections(DIRECTION_NONE, DIRECTION_DOWN);
                this._proxy.move();
                break;
            case 32: // Space
                this._proxy.unbindBall();
                break;
        }
    }
}
