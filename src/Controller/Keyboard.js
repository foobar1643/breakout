import PlatformMovementProxy from '../Proxy/PlatformMovementProxy';
import {DIRECTION_NONE, DIRECTION_RIGHT, DIRECTION_LEFT} from '../Entity/Item';

export default class KeyboardController {

    _proxy: PlatformMovementProxy;

    constructor(game, proxy: PlatformMovementProxy) {
        this._proxy = proxy;
        this._game = game;

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    keyDownEvent(event) {
        switch(event.code) {
            case 'KeyQ':
                this._game.stepAnimation();
                break;
            case 'KeyD':
                this._proxy.move(DIRECTION_RIGHT, DIRECTION_NONE);
                break;
            case 'KeyA':
                this._proxy.move(DIRECTION_LEFT, DIRECTION_NONE);
                break;
        }
    }

}