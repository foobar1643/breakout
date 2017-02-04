import Item from './Item';
import Platform from './Platform';

const STATE_PAUSED = 'paused';
const STATE_STICKED = 'sticked';
const STATE_FREE = 'free';

export default class Ball extends Item {

    _radius: number;
    _state: string;

    get radius() { return this._radius; };

    constructor() {
        let radius = 7;
        super('circle', 'green', [0, 0], [radius, radius], [0.5, 1]);
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
        this._state = STATE_FREE;
    }

}