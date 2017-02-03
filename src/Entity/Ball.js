import Item from './Item';

export default class Ball extends Item {

    _radius: number;

    get radius() { return this._radius; };

    constructor() {
        let radius = 7;
        super('circle', 'green', [0, 0], [radius, radius], [0.5, 1]);
        this._radius = radius;
    }

}