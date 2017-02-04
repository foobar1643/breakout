import Item from './Item';
import Ball from './Ball';
import * as Settings from '../Settings';

export default class Platform extends Item {

    _ball: mixed;

    constructor(width, height) {
        let x = (Settings.SCREEN_WIDTH / 2) - (width / 2);
        let y = Settings.SCREEN_HEIGHT - height - 15;
        super('rectangle', 'white', [x, y], [width, height], [10, 0]);
        this._ball = null;
    }

    bindBall(ball: Ball) {
        this._ball = ball;
    }

    releaseBall() {
        if(this.ballBound()) {
            this._ball.unbind();
            this._ball = null;
        }
    }

    ballBound() {
        return (this._ball != null);
    }

}