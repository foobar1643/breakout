import Item from './Item';
import Platform from './Platform';
import * as Settings from '../Settings';
import {DIRECTION_NONE, DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN} from '../Entity/Item';

export const STATE_PAUSED = 'paused';
export const STATE_STICKED = 'sticked';
export const STATE_FREE = 'free';

const H_SPEED = 1.2;
const V_SPEED = 2;

export default class Ball extends Item {

    _radius: number;
    _state: string;

    get radius() { return this._radius; };
    get state() { return this._state; };

    constructor() {
        let radius = 7;
        super('circle', 'green', [0, 0], [radius, radius], [H_SPEED, V_SPEED]);
        this._radius = radius;
        this._state = STATE_PAUSED;
    }

    bindToPlatform(platform: Platform) {
        this.hSpeed = platform.hSpeed;
        this._state = STATE_STICKED;
        this.x = platform.x + (platform.width / 2);
        this.y = platform.y - (platform.height / 2);
        platform.bindBall(this);
    }

    unbind() {
        this.hDirection = this.determineHorizontalDirection();
        this.vDirection = DIRECTION_UP;
        this.hSpeed = H_SPEED;
        this.vSpeed = V_SPEED;
        this._state = STATE_FREE;
    }

    determineHorizontalDirection() {
        return (this.x <= (Settings.SCREEN_WIDTH / 2) ) ?
            DIRECTION_RIGHT : DIRECTION_LEFT ;
    }

    flipHorizontalDirection() {
        this.hDirection = (this.hDirection == DIRECTION_LEFT) ?
            DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    flipVerticalDirection() {
        this.vDirection = (this.vDirection == DIRECTION_UP) ?
            DIRECTION_DOWN : DIRECTION_UP;
    }

}