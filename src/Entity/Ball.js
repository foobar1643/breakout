import Item from './Item';
import Platform from './Platform';
import * as Settings from '../Settings';
import {DIRECTION_NONE, DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP} from '../Entity/Item';

export const STATE_PAUSED = 'paused';
export const STATE_STICKED = 'sticked';
export const STATE_FREE = 'free';

export default class Ball extends Item {

    _radius: number;
    _state: string;
    _hDirection: string;
    _vDirection: string;

    get radius() { return this._radius; };
    get state() { return this._state; };

    get hDirection() { return this._hDirection; };
    get vDirection() { return this._vDirection; };

    constructor() {
        let radius = 7;
        super('circle', 'green', [0, 0], [radius, radius], [0.5, 1]);
        this._radius = radius;
        this._state = STATE_PAUSED;
        this._hDirection = DIRECTION_NONE;
        this._vDirection = DIRECTION_NONE;
    }

    bindToPlatform(platform: Platform) {
        this.hSpeed = platform.hSpeed;
        this._state = STATE_STICKED;
        this.x = platform.x + (platform.width / 2);
        this.y = platform.y - (platform.height / 2);
        platform.bindBall(this);
    }

    unbind() {
        this._hDirection = this.determineHorizontalDirection();
        this._vDirection = DIRECTION_UP;
        this._state = STATE_FREE;
    }

    determineHorizontalDirection() {
        return (this.x <= (Settings.SCREEN_WIDTH / 2) ) ?
            DIRECTION_RIGHT : DIRECTION_LEFT ;
    }

}