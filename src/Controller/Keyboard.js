import PlatformMovementProxy from '../Proxy/PlatformMovementProxy';
import {DIRECTION_NONE, DIRECTION_RIGHT, DIRECTION_LEFT} from '../Entity/Item';

export default class KeyboardController {

    _proxy: PlatformMovementProxy;

    constructor(proxy: PlatformMovementProxy) {
        this._proxy = proxy;

        window.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    keyDownEvent(event) {
        switch(event.code) { // Check collisions here
            case 'KeyD':
                this._proxy.move(DIRECTION_RIGHT, DIRECTION_NONE);
                break;
            case 'KeyA':
                this._proxy.move(DIRECTION_LEFT, DIRECTION_NONE);
                break;
        }
    }

}